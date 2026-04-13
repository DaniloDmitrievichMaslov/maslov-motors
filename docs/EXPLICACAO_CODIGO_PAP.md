# Explicação de Código para a PAP — Maslov Motors

## Como usar este documento

Escolhe **2 ou 3 secções** deste documento para apresentar ao júri. Cada secção tem:
- O **código real** do projeto
- Uma **explicação linha a linha** em linguagem simples
- **Pontos-chave** para mencionares

---

## 🔐 SECÇÃO 1 — Edge Function: Alterar Password (Segurança no Servidor)

**Ficheiro:** `supabase/functions/update-password/index.ts`

**Porquê esta secção?** Mostra que percebes de segurança — operações sensíveis devem correr no servidor, não no browser do cliente.

### Código (simplificado para explicar):

```typescript
// 1. Receber o pedido e verificar se tem token de autenticação
const authHeader = req.headers.get('Authorization')
if (!authHeader) {
  return new Response(
    JSON.stringify({ error: 'Missing authorization header' }),
    { status: 401 }
  )
}

// 2. Criar um cliente com o token do utilizador para verificar quem é
const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL'),
  Deno.env.get('SUPABASE_ANON_KEY'),
  { global: { headers: { Authorization: authHeader } } }
)

// 3. Obter o utilizador atual a partir do token
const { data: { user: currentUser } } = await supabaseClient.auth.getUser()

// 4. Verificar se é administrador
const { data: roleData } = await supabaseClient
  .from('user_roles')
  .select('role')
  .eq('user_id', currentUser.id)
  .eq('role', 'admin')
  .maybeSingle()

if (!roleData) {
  return new Response(
    JSON.stringify({ error: 'Only admins can update passwords' }),
    { status: 403 }  // Forbidden
  )
}

// 5. Validar o formato do UUID do utilizador alvo
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
if (!userId || !uuidRegex.test(userId)) {
  return new Response(
    JSON.stringify({ error: 'Invalid userId format' }),
    { status: 400 }
  )
}

// 6. Criar cliente ADMIN com a service role key (privilégios elevados)
const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL'),
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')  // ← chave secreta, só no servidor!
)

// 7. Alterar a password do utilizador
await supabaseAdmin.auth.admin.updateUserById(userId, {
  password: newPassword
})
```

### O que dizer ao júri:

> "Esta é uma Edge Function — um pequeno programa que corre no servidor. Quando o administrador quer alterar a password de um cliente, o pedido passa por várias camadas de segurança:"
>
> 1. **Autenticação** (linha 1-5): Primeiro verifico se o pedido tem um token JWT válido. Se não tiver, devolvo erro 401 (Unauthorized).
>
> 2. **Verificação de identidade** (linha 8-14): Uso o token para criar um cliente e confirmar quem está a fazer o pedido.
>
> 3. **Verificação de permissão** (linha 17-24): Consulto a tabela `user_roles` para confirmar que o utilizador é admin. Se não for, devolvo erro 403 (Forbidden). Isto é **autorização** — não basta estar autenticado, tem de ter o papel correto.
>
> 4. **Validação de dados** (linha 27-31): Valido que o UUID recebido tem o formato correto com uma expressão regular. Isto previne ataques de **injeção**.
>
> 5. **Execução com privilégios** (linha 34-40): Só aqui é que uso a `SERVICE_ROLE_KEY`, que tem acesso total. Esta chave **nunca** está no frontend — só existe no servidor.
>
> "A razão pela qual isto não pode ser feito no frontend é simples: a `SERVICE_ROLE_KEY` daria acesso total à base de dados. Se estivesse no browser, qualquer pessoa podia inspecionar o código e roubar essa chave."

---

## 🛡️ SECÇÃO 2 — Row Level Security (RLS) e a função has_role()

**Porquê esta secção?** Mostra que percebes como proteger dados ao nível da base de dados.

### Código SQL:

```sql
-- Função que verifica se um utilizador tem um papel específico
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER        -- ← executa com privilégios do criador
SET search_path = public -- ← previne ataques de manipulação de path
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Exemplo de política RLS na tabela 'cars':
CREATE POLICY "Users can view their own cars"
ON public.cars
FOR SELECT
USING (auth.uid() = owner_id);

CREATE POLICY "Admins can view all cars"
ON public.cars
FOR SELECT
USING (has_role(auth.uid(), 'admin'));
```

### O que dizer ao júri:

> "Row Level Security é uma funcionalidade do PostgreSQL que filtra os dados automaticamente ao nível de cada linha. Em vez de confiar no frontend para filtrar os dados, a **própria base de dados** garante que cada utilizador só vê o que deve."
>
> "Por exemplo, quando um cliente faz `SELECT * FROM cars`, o PostgreSQL aplica automaticamente a política e adiciona `WHERE owner_id = [id do utilizador]`. O cliente **nunca** consegue ver carros de outros clientes, mesmo que tente manipular o código no browser."
>
> "A função `has_role()` usa `SECURITY DEFINER`, o que significa que executa com os privilégios de quem a criou, não de quem a chama. Isto resolve um problema chamado **recursão infinita** — se a política de uma tabela precisar consultar essa mesma tabela, entra em loop infinito. Com `SECURITY DEFINER`, a função bypassa o RLS e consulta diretamente a tabela `user_roles`."
>
> "O `SET search_path = public` é uma medida de segurança adicional que previne um tipo de ataque onde alguém cria um schema com o mesmo nome de uma função para interceptar chamadas."

---

## ✅ SECÇÃO 3 — Validação com Zod (Frontend)

**Ficheiro:** `src/lib/validations.ts` + `src/pages/Auth.tsx`

### Código:

```typescript
// validations.ts — Definição do schema
import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A password deve ter pelo menos 6 caracteres"),
  firstName: z.string().min(1, "O nome é obrigatório").max(50),
  lastName: z.string().min(1, "O apelido é obrigatório").max(50),
  phone: z.string().min(9, "Número de telemóvel inválido"),
});

// Auth.tsx — Utilização no formulário
const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();        // Impedir o comportamento padrão do formulário
  setIsLoading(true);
  setErrors({});              // Limpar erros anteriores

  // Recolher dados do formulário
  const formData = new FormData(e.currentTarget);
  const data = {
    email: (formData.get("email") as string)?.trim(),
    password: formData.get("password") as string,
    firstName: (formData.get("firstName") as string)?.trim(),
    lastName: (formData.get("lastName") as string)?.trim(),
    phone: (formData.get("phone") as string)?.trim() || "",
  };

  // Validar com Zod — se falhar, mostrar erros sem enviar ao servidor
  const result = signUpSchema.safeParse(data);
  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    result.error.errors.forEach((err) => {
      if (err.path[0]) {
        fieldErrors[err.path[0] as string] = err.message;
      }
    });
    setErrors(fieldErrors);   // Mostrar erros por campo
    setIsLoading(false);
    return;                   // ← NÃO envia ao servidor!
  }

  // Só chega aqui se os dados forem válidos
  await supabase.auth.signUp({ ... });
};
```

### O que dizer ao júri:

> "Zod é uma biblioteca de validação que permite definir **schemas** — ou seja, regras que os dados têm de cumprir. Aqui defino que o email tem de ser válido, a password mínimo 6 caracteres, e o telemóvel mínimo 9 dígitos."
>
> "O `safeParse()` tenta validar os dados sem lançar exceções. Se falhar, devolve os erros organizados por campo, que eu mostro debaixo de cada input no formulário."
>
> "Isto melhora a experiência do utilizador porque não precisa de enviar o formulário ao servidor para saber que tem um erro. Mas **não substitui** a validação no servidor — no backend, o Supabase também valida os dados. É o princípio de **defesa em profundidade**: validar em ambas as camadas."

---

## 🤖 SECÇÃO 4 — Chatbot com IA (Streaming em tempo real)

**Ficheiro:** `src/components/chat/ChatBot.tsx`

### Código:

```typescript
const streamChat = async (userMessages: Message[]) => {
  // 1. Enviar mensagens para a Edge Function
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages: userMessages }),
  });

  // 2. Ler a resposta como stream (Server-Sent Events)
  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let assistantContent = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    // 3. Descodificar cada chunk de bytes para texto
    textBuffer += decoder.decode(value, { stream: true });

    // 4. Processar cada linha do SSE
    while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
      let line = textBuffer.slice(0, newlineIndex);
      textBuffer = textBuffer.slice(newlineIndex + 1);

      if (!line.startsWith("data: ")) continue;
      const jsonStr = line.slice(6).trim();
      if (jsonStr === "[DONE]") break;

      // 5. Extrair o conteúdo parcial e atualizar a UI
      const parsed = JSON.parse(jsonStr);
      const content = parsed.choices?.[0]?.delta?.content;
      if (content) {
        assistantContent += content;
        setMessages(prev => /* atualizar última mensagem */);
      }
    }
  }
};
```

### O que dizer ao júri:

> "O chatbot usa **streaming** — em vez de esperar pela resposta completa, recebe a resposta palavra a palavra, como o ChatGPT faz."
>
> "Funciona assim: o frontend envia as mensagens para uma Edge Function no servidor. Essa função reencaminha o pedido para a API do Gemini (modelo de IA da Google) e devolve a resposta como **Server-Sent Events (SSE)**."
>
> "No frontend, uso a **Streams API** do browser — o `getReader()` permite ler os dados à medida que chegam. Cada chunk é descodificado de bytes para texto, e cada linha que começa com `data:` contém um pedaço da resposta em JSON."
>
> "À medida que cada pedaço chega, concateno ao texto já recebido e atualizo o React state com `setMessages()`. Isto faz o React re-renderizar o componente e o utilizador vê o texto a aparecer em tempo real."
>
> "A razão pela qual uso uma Edge Function em vez de chamar a API diretamente do browser é **segurança** — a chave da API está guardada como variável de ambiente no servidor, nunca exposta ao cliente."

---

## 🔄 SECÇÃO 5 — Hook useAuth (Gestão de Estado de Autenticação)

**Ficheiro:** `src/hooks/useAuth.tsx`

### Código:

```typescript
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Ouvir mudanças de autenticação em tempo real
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // 2. Verificar se é admin (com setTimeout para evitar deadlock)
          setTimeout(() => checkAdminRole(session.user.id), 0);
        } else {
          setIsAdmin(false);
        }
      }
    );

    // 3. Verificar se já existe uma sessão guardada
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminRole(session.user.id);
      }
    });

    // 4. Cleanup: remover listener quando o componente desmonta
    return () => subscription.unsubscribe();
  }, []);

  const checkAdminRole = async (userId: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    
    setIsAdmin(!!data);  // true se encontrou, false se não
  };

  return { user, isAdmin, loading, signOut };
}
```

### O que dizer ao júri:

> "Este é um **custom hook** do React — uma função reutilizável que encapsula lógica de autenticação. Qualquer componente da aplicação pode chamar `useAuth()` para saber se o utilizador está autenticado e se é admin."
>
> "O `useEffect` corre quando o componente monta e faz duas coisas:"
>
> 1. **`onAuthStateChange`**: Regista um **listener** que é chamado sempre que o estado de autenticação muda — login, logout, expiração do token, etc. É como um observador que reage a eventos.
>
> 2. **`getSession`**: Verifica imediatamente se já existe uma sessão guardada no `localStorage` do browser. Isto permite que o utilizador não perca a sessão quando fecha e reabre o browser.
>
> "O `setTimeout(..., 0)` parece estranho mas resolve um problema técnico: o Supabase não permite fazer queries dentro do callback do `onAuthStateChange` diretamente, porque pode causar um **deadlock**. O `setTimeout` coloca a verificação no próximo ciclo do event loop, resolvendo o problema."
>
> "O `return () => subscription.unsubscribe()` é o **cleanup function** — quando o componente desmonta, remove o listener para evitar **memory leaks**."
>
> "No Dashboard, uso isto assim: `const { user, isAdmin } = useAuth()` — se `isAdmin` for true, mostro o painel de administração; se não, mostro o painel de cliente."

---

## 💡 Dicas para a apresentação

1. **Escolhe 2-3 secções** — não tentes explicar tudo, foca no que dominas melhor
2. **Recomendação**: Secção 1 (Edge Function) + Secção 2 (RLS) + Secção 3 (Zod) cobrem frontend, backend e base de dados
3. **Usa termos técnicos** mas explica-os logo a seguir em linguagem simples
4. **Se o júri perguntar algo que não sabes**: "Essa é uma boa questão — seria um ponto a investigar para uma versão futura"
5. **Mostra o código no ecrã** enquanto explicas — aponta para as linhas específicas
