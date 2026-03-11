# Memória Descritiva – Aplicação Web da Oficina Maslov Motors

## 1. Introdução

O projeto tem como objetivo o desenvolvimento de uma aplicação web para a oficina Maslov Motors, que permite modernizar a comunicação com os clientes e melhorar a gestão interna.

A **área Cliente** disponibiliza registo/login, registo de veículos, consulta do histórico de serviços, pedidos de orçamento, marcação de serviços, chatbot com inteligência artificial e gestão de perfil.

A **área Administrador** (Back-Office) oferece gestão de clientes e veículos, criação e gestão de serviços com cálculo automático de margens/lucros, gestão de pedidos de orçamento, dashboard com estatísticas e gráficos, e geração de relatórios.

O objetivo principal é digitalizar os serviços da oficina, melhorar a experiência dos clientes e oferecer uma ferramenta de gestão prática ao proprietário.

---

## 2. Arquitetura da Aplicação

**Modelo:** Cliente/Servidor (modelo onde o browser do utilizador comunica com um servidor que guarda e processa os dados).

**Lovable Cloud (Supabase)** – Backend as a Service (BaaS): serviço que fornece autenticação, base de dados PostgreSQL, Edge Functions e outras funcionalidades já prontas, evitando criar tudo do zero.

### Camadas:

- **Frontend (React):** Interface da aplicação, o que o utilizador vê e interage no browser.
- **Cliente Supabase:** Biblioteca JavaScript que faz a comunicação entre o frontend e o backend.
- **Backend (Lovable Cloud):** PostgreSQL (base de dados relacional), Authentication (sistema de autenticação), Edge Functions (funções serverless para lógica no servidor), API de IA (chatbot).

---

## 3. Tecnologias Utilizadas

### Frontend

- **Linguagem TypeScript:** linguagem de programação tipada baseada em JavaScript, que previne erros em tempo de desenvolvimento.
- **Framework React:** biblioteca para criar interfaces de utilizador modernas com componentes reutilizáveis.
- **Tailwind CSS:** framework de CSS utilitário para design responsivo e estilização rápida.
- **shadcn/ui:** biblioteca de componentes de interface pré-construídos e personalizáveis.
- **Recharts:** biblioteca para criação de gráficos e visualização de dados estatísticos.
- **Zod:** biblioteca de validação de dados com schemas tipados.

### Backend

- **Lovable Cloud (Supabase):** plataforma que fornece base de dados, autenticação e funções serverless.
- **Edge Functions (Deno/TypeScript):** pequenos programas em TypeScript que executam lógica no servidor (ex: chatbot IA, gestão de passwords, eliminação de contas).
- **Authentication:** serviço para gerir utilizadores e permissões de acesso com hash seguro de passwords.

### Base de Dados

- **PostgreSQL (relacional):** armazena dados em tabelas estruturadas com relações entre elas:
  - `profiles` — dados dos utilizadores
  - `user_roles` — papéis (admin/client)
  - `cars` — veículos registados
  - `services` — serviços realizados
  - `quote_requests` — pedidos de orçamento
  - `availability_slots` — slots de agendamento
  - `custom_car_brands` — marcas personalizadas
  - `custom_service_types` — tipos de serviço personalizados

### APIs e Integrações

- **Supabase SDK:** comunicação entre o frontend e o backend (autenticação, base de dados, Edge Functions).
- **API de IA (Gemini via Lovable AI Gateway):** chatbot inteligente para assistência aos clientes.
- **React Query (@tanstack/react-query):** gestão de cache e sincronização de dados com o servidor.

### Ambiente de Desenvolvimento

- **IDE:** Visual Studio Code / Lovable (editor online com IA integrada).
- **Controlo de versões:** Git/GitHub (sistema que guarda várias versões do código e facilita o trabalho).
- **Deploy:** publicação da aplicação via Lovable (URL: https://maslov-motors.lovable.app).

---

## 4. Segurança

**Autenticação:** confirmar a identidade do utilizador (login com email/palavra-passe).

**Autorização:** definir o que cada utilizador pode fazer, usando papéis (roles) separados numa tabela dedicada (`user_roles`).

**Row Level Security (RLS):** políticas de segurança ao nível de cada linha da base de dados — cada utilizador só pode aceder aos seus próprios dados.

**Função `has_role()` com SECURITY DEFINER:** função de base de dados que verifica papéis sem causar recursão infinita nas políticas RLS.

**Edge Functions protegidas:** operações sensíveis (alteração de password, eliminação de conta) são executadas no servidor com privilégios elevados (service role key).

### Proteções

- Políticas RLS em todas as tabelas (definem quem pode aceder a que dados).
- Edge Functions com autenticação obrigatória.
- Validação de dados no frontend com Zod (previne dados inválidos).
- Comunicação encriptada via HTTPS/TLS.

---

## 5. Desempenho e Escalabilidade

- **React Query:** cache inteligente de dados, evitando pedidos desnecessários ao servidor e melhorando a rapidez da interface.
- **Skeleton components:** mostram uma pré-visualização da interface enquanto os dados carregam, evitando flickering (piscar) do ecrã.
- **Lazy loading:** carregamento de componentes apenas quando necessário.
- **Design responsivo:** a aplicação adapta-se automaticamente a qualquer tamanho de ecrã (desktop, tablet, telemóvel).
- **PostgreSQL otimizado:** índices e consultas eficientes para rápido acesso aos dados.
- **CDN (Content Delivery Network):** entrega rápida dos ficheiros estáticos da aplicação.

---

## 6. Testes e Deploy

### Testes

- Testes funcionais de todas as funcionalidades (registo, login, CRUD de carros/serviços, chatbot).
- Testes em múltiplos browsers (Chrome, Firefox, Edge, Safari).
- Testes de responsividade em diferentes dispositivos.
- Testes de segurança das políticas RLS.

### Deploy

- Publicação da aplicação web via Lovable (URL: https://maslov-motors.lovable.app).
- Edge Functions deployadas automaticamente pelo Lovable Cloud.
- Base de dados gerida pelo Lovable Cloud.

### Monitorização

- Logs de Edge Functions para diagnóstico de erros.
- Métricas de utilização da base de dados.

---

## 7. Conclusão Técnica

A aplicação web do Maslov Motors foi desenvolvida em React com TypeScript e tem como base o Lovable Cloud (Supabase), garantindo rapidez no desenvolvimento, escalabilidade e segurança. O sistema permite uma gestão centralizada da oficina e melhora a experiência do cliente com chatbot IA, histórico digital de serviços e pedidos de orçamento online.

### Evoluções futuras incluem:

- Faturação certificada AT (SAF-T).
- Notificações push para clientes.
- Aplicação mobile nativa.
- Integração com pagamentos online.
- Modo escuro na interface.
