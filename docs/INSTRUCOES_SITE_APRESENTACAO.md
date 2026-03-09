# INSTRUÇÕES PARA CRIAR O SITE DE APRESENTAÇÃO PAP
## Maslov Motors - Danilo Dmitrievich Maslov

---

## 📋 REGRAS OBRIGATÓRIAS (do Professor Filipe Martins)

### Tempo
- **Apresentação**: Máximo **12 minutos** (haverá cronómetro na sala)
- **Discussão (Q&A)**: ~5 minutos para perguntas do júri
- **Total**: Tudo deve terminar antes dos **20 minutos**

### Design dos Slides
- **Regra "Menos é Mais"**: slides são apoio visual, não documento
- Máximo **6 linhas por slide**, máximo **6 palavras por linha**
- Tamanho mínimo: **24pt** para texto, **32pt** para títulos
- **Nada de blocos de código gigantes** — só excertos pequenos se necessário
- Prioridade ao **visual**: screenshots e diagramas em vez de texto

---

## 🎯 ESTRUTURA OBRIGATÓRIA DOS SLIDES

### Slide 1 — CAPA
- Nome do projeto: **Maslov Motors**
- Nome: **Danilo Dmitrievich Maslov**
- Curso: **PGI23 - Programação e Gestão de Sistemas Informáticos**
- Escola: **Profitecla**
- Ano letivo: **2025/26**
- Orientador: **Filipe Martins**

---

### Slide 2 — INTRODUÇÃO E MOTIVAÇÃO
**Problema real:**
- Oficinas usam papel e métodos manuais
- Perda de informação de clientes e serviços
- Difícil gestão e acompanhamento

**Solução:**
- Aplicação web moderna para digitalizar a gestão de oficinas
- Plataforma para clientes e administradores

---

### Slide 3 — OBJETIVOS
**Objetivo geral:**
- Criar sistema web de gestão para oficina automóvel

**Objetivos específicos:**
- Sistema de autenticação seguro
- Gestão de clientes, carros e serviços
- Chatbot com inteligência artificial
- Relatórios e estatísticas
- Interface responsiva e moderna

---

### Slide 4 — TECNOLOGIAS
| Tecnologia | Função |
|---|---|
| React + TypeScript | Frontend moderno e tipado |
| Tailwind CSS | Design responsivo |
| Lovable Cloud (Supabase) | Base de dados, autenticação, Edge Functions |
| IA (Gemini) | Chatbot inteligente |
| Zod | Validação de dados |
| Recharts | Gráficos e estatísticas |

**Justificação**: Tecnologias atuais usadas no mercado profissional

---

### Slide 5 — ARQUITETURA DO SISTEMA
**Usar o diagrama de arquitetura** (`public/diagrams/diagrama-arquitetura.png`)

**Pontos-chave a mencionar:**
- Frontend (React) → Cliente Supabase → Backend
- Backend: PostgreSQL + Auth + Edge Functions + API IA
- Row Level Security (RLS) em todas as tabelas
- Separação clara entre interface e lógica

---

### Slide 6 — BASE DE DADOS / DIAGRAMA
**Usar o diagrama ER** (`public/diagrams/diagrama-er.png`)

**Tabelas principais (8):**
1. `profiles` — dados dos utilizadores
2. `user_roles` — papéis (admin/client)
3. `cars` — veículos registados
4. `services` — serviços realizados
5. `quote_requests` — pedidos de orçamento
6. `availability_slots` — slots de agendamento
7. `custom_car_brands` — marcas personalizadas
8. `custom_service_types` — tipos de serviço personalizados

**Relações:** profiles → cars → services (1:N)

---

### Slide 7 — DEMONSTRAÇÃO PRÁTICA (Live Demo)
**⚠️ TER VÍDEO DE BACKUP gravado no computador!**

**Fluxo a demonstrar:**

**Como Cliente:**
1. Registo e Login
2. Dashboard com carros
3. Adicionar carro (com marcas/modelos reais)
4. Ver histórico de serviços
5. Pedir orçamento
6. Usar chatbot IA
7. Editar perfil

**Como Admin:**
1. Dashboard com estatísticas/gráficos
2. Gestão de clientes
3. Gestão de carros
4. Criar/editar serviços (com cálculo de margens)
5. Gerir pedidos de orçamento
6. Relatórios

**URL da app:** https://maslov-motors.lovable.app

---

### Slide 8 — DIFICULDADES E SOLUÇÕES

| Dificuldade | Solução |
|---|---|
| Recursão infinita em políticas RLS | Função `has_role()` com `SECURITY DEFINER` |
| Flickering de UI no carregamento | Loading states e skeleton components |
| Validação de dados complexos | Biblioteca Zod com schemas tipados |
| Integração com IA | Edge Functions com tratamento de erros |
| Gestão de estados complexos | React Query para cache e sincronização |

---

### Slide 9 — CONCLUSÕES E TRABALHO FUTURO

**Conclusões:**
- Todos os objetivos cumpridos
- Aplicação funcional e segura
- Interface moderna e responsiva
- Demonstra competências do curso

**Trabalho Futuro:**
- Faturação certificada AT (SAF-T)
- Notificações push
- App mobile nativa
- Integração com pagamentos
- Modo escuro

---

### Slide 10 — AGRADECIMENTOS
- Ao orientador **Filipe Martins**
- Aos professores do curso
- À escola **Profitecla**
- À família pelo apoio
- "Obrigado. Estou disponível para responder a perguntas."

---

## 📁 RECURSOS DISPONÍVEIS NO PROJETO

### Diagramas (já gerados em PNG)
- `public/diagrams/diagrama-arquitetura.png` — Arquitetura do sistema
- `public/diagrams/diagrama-er.png` — Entidade-Relacionamento
- `public/diagrams/diagrama-casos-uso.png` — Casos de uso UML
- `public/diagrams/diagrama-navegacao.png` — Fluxo de navegação
- `public/diagrams/diagrama-fluxo-eliminacao.png` — Sequência de eliminação de conta

### Screenshots a tirar da app
- Landing page
- Página de login/registo
- Dashboard cliente (com carros)
- Formulário adicionar carro
- Chatbot em funcionamento
- Dashboard admin (com gráficos)
- Gestão de serviços
- Relatórios

### URL publicada
- **https://maslov-motors.lovable.app**

---

## 💡 DICAS PARA O DIA

### Antes
- [ ] Testar app no dia anterior
- [ ] Preparar conta demo (cliente + admin)
- [ ] Gravar vídeo de backup da demo
- [ ] Verificar internet no local
- [ ] Ter screenshots impressos como último recurso

### Durante
- Falar devagar e com calma
- Olhar para o júri, não para os slides
- Se der erro na demo, usar vídeo de backup
- Não ler dos slides — são apoio visual
- Mostrar confiança no projeto

### Perguntas prováveis do júri
- "Porque escolheste React?" → Tecnologia moderna, componentes reutilizáveis, grande comunidade
- "Como funciona a segurança?" → RLS em todas as tabelas, autenticação com hash, Edge Functions para operações sensíveis
- "Que dificuldades tiveste?" → Ver slide de dificuldades
- "Quanto custaria implementar?" → Custo reduzido com Lovable Cloud, escalável
- "O que aprendeste?" → Planeamento, segurança, integração de sistemas
