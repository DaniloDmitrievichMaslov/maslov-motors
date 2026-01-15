# RELATÓRIO DA PROVA DE APTIDÃO PROFISSIONAL

---

## CAPA

**PROFITECLA - Escola Profissional**

---

# Maslov Motors
## Sistema de Gestão para Oficina Automóvel

---

**Curso:** Técnico de Gestão e Programação de Sistemas Informáticos

**Aluno:** Danilo Dmitrievich Maslov

**Turma:** PGI23

**Orientador:** Filipe Martins

**Ano Letivo:** 2025/2026

---

## PÁGINA DE ROSTO

Declaro que este trabalho foi realizado por mim, Danilo Dmitrievich Maslov, no âmbito da Prova de Aptidão Profissional do Curso Técnico de Gestão e Programação de Sistemas Informáticos, sob orientação do professor Filipe Martins.

---

## AGRADECIMENTOS

Gostaria de expressar os meus sinceros agradecimentos a todas as pessoas que contribuíram para a realização deste projeto.

Em primeiro lugar, ao meu orientador, Professor Filipe Martins, pela orientação, disponibilidade e apoio técnico ao longo de todo o desenvolvimento do projeto.

Aos professores do curso de Gestão e Programação de Sistemas Informáticos, pelos conhecimentos transmitidos ao longo destes anos de formação, que foram fundamentais para a concretização deste trabalho.

À minha família, pelo apoio incondicional, motivação e compreensão durante todo o percurso académico.

Aos meus colegas de turma, pela partilha de conhecimentos e experiências que enriqueceram esta jornada.

A todos os que, direta ou indiretamente, contribuíram para a realização deste projeto.

---

## RESUMO

O presente relatório documenta o desenvolvimento de uma aplicação web para gestão de uma oficina automóvel, denominada "Maslov Motors". O projeto surgiu da necessidade de modernizar e otimizar os processos de gestão de uma oficina mecânica, substituindo métodos tradicionais baseados em papel por uma solução digital integrada.

A aplicação desenvolvida permite a gestão completa de clientes, veículos e serviços, incluindo funcionalidades como registo de utilizadores, gestão de carros, agendamento de serviços, pedidos de orçamento, cálculo automático de custos e margens de lucro, edição de perfil pelos clientes (incluindo alteração de palavra-passe e eliminação de conta), gestão de tipos de serviços e marcas de carros personalizadas, e um chatbot com inteligência artificial para assistência ao cliente.

O sistema foi desenvolvido utilizando tecnologias modernas como React, TypeScript, Tailwind CSS e Supabase (através de Lovable Cloud), garantindo uma interface responsiva, segura, animada e de fácil utilização. A arquitetura escolhida segue o paradigma de Single Page Application (SPA), proporcionando uma experiência de utilizador fluida e eficiente, com animações e transições modernas.

Os resultados obtidos demonstram que a aplicação cumpre os objetivos propostos, oferecendo uma ferramenta funcional e intuitiva para a gestão de oficinas automóveis.

**Palavras-chave:** Gestão de oficina, aplicação web, React, TypeScript, Supabase, inteligência artificial, chatbot, automóvel, Lovable Cloud.

---

## ABSTRACT

This report documents the development of a web application for managing an automotive workshop, called "Maslov Motors". The project arose from the need to modernize and optimize the management processes of a mechanical workshop, replacing traditional paper-based methods with an integrated digital solution.

The developed application allows complete management of customers, vehicles and services, including features such as user registration, car management, service scheduling, quote requests, automatic calculation of costs and profit margins, client profile editing (including password change and account deletion), custom service types and car brands management, and an artificial intelligence chatbot for customer assistance.

The system was developed using modern technologies such as React, TypeScript, Tailwind CSS and Supabase (via Lovable Cloud), ensuring a responsive, secure, animated and easy-to-use interface. The chosen architecture follows the Single Page Application (SPA) paradigm, providing a smooth and efficient user experience with modern animations and transitions.

The results obtained demonstrate that the application meets the proposed objectives, offering a functional and intuitive tool for automotive workshop management.

**Keywords:** Workshop management, web application, React, TypeScript, Supabase, artificial intelligence, chatbot, automotive, Lovable Cloud.

---

## ÍNDICE GERAL

1. [Introdução](#1-introdução)
   - 1.1. Contextualização do projeto
   - 1.2. Apresentação geral do projeto
   - 1.3. Motivação e justificação
   - 1.4. Objetivos gerais e específicos
   - 1.5. Metodologia de trabalho
   - 1.6. Estrutura do relatório

2. [Fundamentação Teórica](#2-fundamentação-teórica)
   - 2.1. Conceitos fundamentais
   - 2.2. Paradigmas e modelos de programação
   - 2.3. Tecnologias utilizadas
   - 2.4. Comparação de tecnologias
   - 2.5. Segurança e boas práticas
   - 2.6. Interface e experiência do utilizador

3. [Análise do Problema e Planeamento](#3-análise-do-problema-e-planeamento)
   - 3.1. Identificação do problema
   - 3.2. Objetivos operacionais do sistema
   - 3.3. Levantamento de requisitos
   - 3.4. Estudo do contexto
   - 3.5. Planeamento e gestão do projeto
   - 3.6. Análise de riscos

4. [Conceção e Arquitetura do Sistema](#4-conceção-e-arquitetura-do-sistema)
   - 4.1. Arquitetura geral
   - 4.2. Modelação de dados
   - 4.3. Modelação do software
   - 4.4. Design do sistema
   - 4.5. Documentação técnica

5. [Desenvolvimento e Implementação](#5-desenvolvimento-e-implementação)
   - 5.1. Ambiente de desenvolvimento
   - 5.2. Desenvolvimento Backend
   - 5.3. Desenvolvimento Frontend
   - 5.4. Integração da base de dados
   - 5.5. Integração de APIs externas
   - 5.6. Versionamento e Deploy

6. [Testes e Validação](#6-testes-e-validação)
   - 6.1. Estratégia de testes
   - 6.2. Ferramentas de teste
   - 6.3. Casos de teste e resultados
   - 6.4. Avaliação de desempenho
   - 6.5. Validação pelo utilizador

7. [Resultados e Discussão](#7-resultados-e-discussão)
   - 7.1. Resultados obtidos
   - 7.2. Análise crítica
   - 7.3. Avaliação do produto

8. [Conclusões e Trabalhos Futuros](#8-conclusões-e-trabalhos-futuros)
   - 8.1. Conclusões gerais
   - 8.2. Dificuldades e limitações
   - 8.3. Melhorias futuras

9. [Referências Bibliográficas](#9-referências-bibliográficas)

10. [Anexos](#10-anexos)

---

## ÍNDICE DE FIGURAS

- Figura 1: Diagrama de arquitetura do sistema
- Figura 2: Diagrama Entidade-Relacionamento da base de dados
- Figura 3: Diagrama de casos de uso
- Figura 4: Mockup da página inicial
- Figura 5: Mockup do dashboard do cliente
- Figura 6: Mockup do dashboard do administrador
- Figura 7: Ecrã de login da aplicação
- Figura 8: Dashboard do cliente
- Figura 9: Dashboard do administrador
- Figura 10: Gestão de veículos
- Figura 11: Gestão de serviços
- Figura 12: Chatbot com IA
- Figura 13: Relatórios e estatísticas
- Figura 14: Edição de perfil do cliente
- Figura 15: Landing page com animações

---

## ÍNDICE DE TABELAS

- Tabela 1: Comparação de frameworks frontend
- Tabela 2: Comparação de soluções backend
- Tabela 3: Requisitos funcionais do sistema
- Tabela 4: Requisitos não funcionais do sistema
- Tabela 5: Estrutura da tabela profiles
- Tabela 6: Estrutura da tabela cars
- Tabela 7: Estrutura da tabela services
- Tabela 8: Estrutura da tabela quote_requests
- Tabela 9: Estrutura da tabela user_roles
- Tabela 10: Estrutura da tabela custom_car_brands
- Tabela 11: Estrutura da tabela custom_service_types
- Tabela 12: Estrutura da tabela availability_slots
- Tabela 13: Casos de teste realizados
- Tabela 14: Resultados dos testes de desempenho

---

# 1. INTRODUÇÃO

## 1.1. Contextualização do Projeto

O setor automóvel continua a ser um dos pilares fundamentais da economia portuguesa e europeia. Com o aumento constante do parque automóvel e a crescente complexidade dos veículos modernos, as oficinas mecânicas enfrentam desafios significativos na gestão eficiente das suas operações diárias.

Tradicionalmente, muitas oficinas ainda dependem de métodos manuais para registar informações sobre clientes, veículos e serviços realizados. Esta abordagem, além de ser propensa a erros, dificulta o acesso rápido a informações cruciais, compromete a rastreabilidade dos serviços e limita a capacidade de análise do negócio.

A transformação digital tem vindo a revolucionar todos os setores de atividade, e o setor automóvel não é exceção. A adoção de sistemas de gestão informatizados permite às oficinas otimizar processos, melhorar a qualidade do serviço ao cliente e aumentar a competitividade no mercado.

Neste contexto, surge a necessidade de desenvolver uma solução tecnológica adaptada às necessidades específicas das oficinas automóveis portuguesas, que seja intuitiva, acessível e que incorpore as mais recentes tecnologias de desenvolvimento web.

## 1.2. Apresentação Geral do Projeto

O projeto "Maslov Motors" consiste no desenvolvimento de uma aplicação web completa para gestão de uma oficina automóvel. A aplicação foi concebida para servir dois tipos de utilizadores distintos: clientes e administradores.

**Área do Cliente:**
- Registo e autenticação de utilizadores com validação de telemóvel obrigatório
- Registo e gestão de veículos pessoais
- Visualização do histórico de serviços com timeline visual
- Pedidos de orçamento com seleção de data e hora
- Agendamento de serviços através de marcações
- Comunicação através de chatbot inteligente com IA
- Edição completa do perfil pessoal
- Alteração de palavra-passe com validação de segurança
- Eliminação permanente da conta

**Área do Administrador (Back-office):**
- Gestão completa de clientes (criar, editar, eliminar, alterar palavra-passe)
- Gestão de veículos registados
- Criação e gestão de serviços com estados (agendado, em processo, concluído)
- Controlo de custos, preços e horas de trabalho
- Cálculo automático de margens de lucro
- Relatórios e estatísticas mensais e anuais
- Gestão de pedidos de orçamento e agendamentos
- Gestão de tipos de serviços personalizados
- Gestão de marcas e modelos de carros personalizados
- Dashboard com gráficos interativos

A aplicação foi desenvolvida como uma Single Page Application (SPA) com animações modernas, garantindo uma experiência de utilizador fluida e responsiva, adaptada a diferentes dispositivos.

## 1.3. Motivação e Justificação

A escolha deste tema para a Prova de Aptidão Profissional foi motivada por diversos fatores:

**Interesse Pessoal:** O nome "Maslov Motors" reflete uma ligação pessoal ao projeto, tornando-o mais significativo e motivador. O interesse pelo setor automóvel, aliado à paixão pela programação, criou uma oportunidade ideal para desenvolver um projeto que combina ambas as áreas.

**Relevância Prática:** Existe uma necessidade real no mercado por soluções de gestão acessíveis para pequenas e médias oficinas. Muitas não têm recursos para sistemas empresariais complexos e caros, mas beneficiariam significativamente de uma ferramenta digital simples e eficaz.

**Aplicação de Conhecimentos:** O projeto permite aplicar e consolidar conhecimentos adquiridos ao longo do curso, incluindo programação web, bases de dados, design de interfaces, segurança informática e metodologias de desenvolvimento de software.

**Inovação Tecnológica:** A integração de inteligência artificial através do chatbot e a utilização de tecnologias modernas como React, TypeScript e Lovable Cloud demonstra a capacidade de incorporar tecnologias emergentes em soluções práticas do quotidiano.

## 1.4. Objetivos Gerais e Específicos

### Objetivos Gerais

- Desenvolver uma aplicação web funcional e intuitiva para gestão de oficina automóvel
- Aplicar conhecimentos técnicos adquiridos durante o curso
- Criar uma solução que responda a necessidades reais do mercado
- Demonstrar competências em desenvolvimento full-stack

### Objetivos Específicos

1. **Implementar um sistema de autenticação seguro** com registo (telemóvel obrigatório), login e gestão de sessões
2. **Desenvolver a área de cliente** com gestão de veículos, visualização de serviços e edição de perfil
3. **Criar o back-office administrativo** com gestão completa de clientes, carros e serviços
4. **Implementar sistema de agendamento** com disponibilidade e slots de tempo
5. **Desenvolver funcionalidade de pedidos de orçamento** com gestão de estados
6. **Criar sistema de cálculo automático** de custos, preços e margens
7. **Integrar chatbot com inteligência artificial** para assistência ao cliente
8. **Implementar dashboard com estatísticas** e relatórios de negócio (mensal e anual)
9. **Garantir responsividade** e boa experiência em diferentes dispositivos
10. **Assegurar segurança dos dados** através de políticas de acesso adequadas (RLS)
11. **Permitir edição de perfil pelo cliente** incluindo alteração de palavra-passe e eliminação de conta
12. **Criar sistema de gestão de tipos de serviços e marcas de carros** personalizados
13. **Implementar animações e transições modernas** para melhor experiência visual

## 1.5. Metodologia de Trabalho

O desenvolvimento do projeto seguiu uma metodologia iterativa e incremental, inspirada nos princípios ágeis, adaptada ao contexto individual de desenvolvimento:

**Fase 1 - Planeamento e Análise (2 semanas)**
- Definição do âmbito do projeto
- Levantamento de requisitos
- Pesquisa de tecnologias
- Criação de mockups iniciais

**Fase 2 - Conceção e Design (2 semanas)**
- Definição da arquitetura do sistema
- Modelação da base de dados
- Design da interface de utilizador
- Prototipagem

**Fase 3 - Desenvolvimento Core (6 semanas)**
- Implementação da autenticação
- Desenvolvimento das funcionalidades base
- Criação dos dashboards
- Integração com base de dados

**Fase 4 - Funcionalidades Avançadas (4 semanas)**
- Sistema de agendamentos
- Pedidos de orçamento
- Chatbot com IA
- Relatórios e estatísticas
- Edição de perfil e gestão de conta

**Fase 5 - Melhorias Visuais e UX (2 semanas)**
- Implementação de animações
- Transições suaves entre estados
- Efeitos visuais modernos
- Polimento da interface

**Fase 6 - Testes e Refinamento (2 semanas)**
- Testes funcionais
- Correção de bugs
- Otimização de desempenho
- Documentação

**Fase 7 - Documentação e Preparação (2 semanas)**
- Elaboração do relatório
- Criação do manual de utilizador
- Preparação da apresentação
- Revisão final

## 1.6. Estrutura do Relatório

O presente relatório está organizado em dez capítulos principais:

**Capítulo 1 - Introdução:** Apresenta o contexto, motivação, objetivos e metodologia do projeto.

**Capítulo 2 - Fundamentação Teórica:** Explora os conceitos técnicos, tecnologias e paradigmas relevantes para o desenvolvimento.

**Capítulo 3 - Análise do Problema e Planeamento:** Detalha o levantamento de requisitos, análise do contexto e planeamento do projeto.

**Capítulo 4 - Conceção e Arquitetura:** Descreve a arquitetura do sistema, modelação de dados e design da interface.

**Capítulo 5 - Desenvolvimento e Implementação:** Documenta o processo de desenvolvimento do backend e frontend.

**Capítulo 6 - Testes e Validação:** Apresenta a estratégia de testes e resultados obtidos.

**Capítulo 7 - Resultados e Discussão:** Analisa os resultados alcançados em comparação com os objetivos.

**Capítulo 8 - Conclusões e Trabalhos Futuros:** Sintetiza as conclusões e propõe melhorias futuras.

**Capítulo 9 - Referências Bibliográficas:** Lista todas as fontes consultadas.

**Capítulo 10 - Anexos:** Inclui código, diagramas, manual de utilizador e materiais complementares.

---

# 2. FUNDAMENTAÇÃO TEÓRICA

## 2.1. Conceitos Fundamentais

### 2.1.1. Aplicações Web

Uma aplicação web é um software que é executado num navegador web, em vez de ser instalado localmente no dispositivo do utilizador. As aplicações web modernas são caracterizadas pela sua interatividade, responsividade e capacidade de funcionar em múltiplas plataformas sem necessidade de adaptação específica.

### 2.1.2. Single Page Application (SPA)

Uma Single Page Application é uma aplicação web que carrega uma única página HTML e atualiza dinamicamente o conteúdo conforme o utilizador interage com a aplicação. Este paradigma oferece:

- **Experiência fluida:** Transições suaves sem recarregamento de página
- **Melhor desempenho:** Apenas os dados necessários são transferidos
- **Interatividade:** Resposta imediata às ações do utilizador
- **Animações:** Possibilidade de implementar transições e animações complexas

### 2.1.3. API (Application Programming Interface)

Uma API define um conjunto de regras e protocolos que permitem a comunicação entre diferentes componentes de software. No contexto deste projeto, as APIs REST são utilizadas para comunicação entre o frontend e o backend.

### 2.1.4. Base de Dados Relacional

Uma base de dados relacional organiza os dados em tabelas com relações definidas entre elas. Cada tabela contém registos (linhas) e campos (colunas), com chaves primárias e estrangeiras que estabelecem as relações.

### 2.1.5. Autenticação e Autorização

- **Autenticação:** Processo de verificar a identidade de um utilizador
- **Autorização:** Processo de determinar que ações um utilizador autenticado pode realizar
- **Roles (Papéis):** Sistema de permissões baseado em papéis (admin, cliente)

### 2.1.6. Row Level Security (RLS)

Row Level Security é um mecanismo de segurança ao nível da base de dados que restringe o acesso a linhas específicas de uma tabela com base em políticas definidas. Este mecanismo é fundamental para garantir que cada utilizador acede apenas aos seus próprios dados.

### 2.1.7. Edge Functions

Edge Functions são funções serverless que executam código no lado do servidor, próximas do utilizador. São utilizadas para:
- Processamento de lógica de negócio
- Integração com APIs externas (como IA)
- Operações que requerem segurança (como eliminação de contas)

## 2.2. Paradigmas e Modelos de Programação

### 2.2.1. Programação Orientada a Componentes

React, a framework utilizada neste projeto, segue o paradigma de programação orientada a componentes. Cada componente é uma unidade independente e reutilizável que encapsula:

- **Estrutura (JSX):** Define o que será renderizado
- **Lógica (JavaScript/TypeScript):** Define o comportamento
- **Estilo (CSS/Tailwind):** Define a aparência

### 2.2.2. Programação Funcional

O desenvolvimento moderno em React favorece a programação funcional através de:

- **Componentes funcionais:** Funções que retornam elementos React
- **Hooks:** Funções que permitem usar estado e outras funcionalidades
- **Imutabilidade:** Os dados não são modificados diretamente

### 2.2.3. Design Patterns Utilizados

**Component Pattern:** Divisão da interface em componentes reutilizáveis e independentes.

**Container/Presentational Pattern:** Separação entre componentes que gerem lógica e componentes que apenas apresentam dados.

**Custom Hooks Pattern:** Encapsulamento de lógica reutilizável em hooks personalizados (ex: useAuth, useToast).

**Provider Pattern:** Utilização de Context API para partilha de estado global.

## 2.3. Tecnologias Utilizadas

### 2.3.1. React

React é uma biblioteca JavaScript para construção de interfaces de utilizador, desenvolvida e mantida pela Meta (Facebook). Foi escolhida por:

- **Popularidade:** Uma das bibliotecas mais utilizadas no mercado
- **Ecossistema:** Vasta quantidade de bibliotecas e ferramentas complementares
- **Comunidade:** Grande comunidade ativa com abundante documentação
- **Performance:** Virtual DOM para atualizações eficientes
- **Reutilização:** Sistema de componentes promove código reutilizável

### 2.3.2. TypeScript

TypeScript é um superset de JavaScript que adiciona tipagem estática. Benefícios:

- **Deteção de erros:** Erros são identificados em tempo de compilação
- **Autocompletar:** Melhor suporte em IDEs
- **Documentação:** Os tipos servem como documentação do código
- **Manutenção:** Facilita a manutenção de projetos grandes
- **Refactoring:** Refatoração mais segura

### 2.3.3. Tailwind CSS

Tailwind CSS é uma framework de CSS utilitária que permite estilização rápida através de classes predefinidas:

- **Produtividade:** Desenvolvimento mais rápido
- **Consistência:** Design system integrado
- **Responsividade:** Classes para diferentes breakpoints
- **Customização:** Altamente configurável
- **Performance:** CSS otimizado em produção
- **Animações:** Suporte a animações e transições personalizadas

### 2.3.4. Supabase (Lovable Cloud)

Supabase é uma plataforma Backend-as-a-Service (BaaS) de código aberto, integrada através de Lovable Cloud:

- **Base de dados PostgreSQL:** Base de dados relacional robusta
- **Autenticação:** Sistema de autenticação completo
- **Tempo real:** Subscrições em tempo real
- **Storage:** Armazenamento de ficheiros
- **Edge Functions:** Funções serverless em Deno
- **Row Level Security:** Políticas de segurança ao nível da linha

### 2.3.5. Vite

Vite é uma ferramenta de build moderna para aplicações web:

- **Hot Module Replacement:** Atualizações instantâneas durante desenvolvimento
- **Build otimizado:** Produção otimizada com Rollup
- **Suporte TypeScript:** Suporte nativo a TypeScript
- **Rapidez:** Tempo de arranque extremamente rápido

### 2.3.6. Lovable

Lovable é uma plataforma de desenvolvimento assistida por IA que permite:

- **Desenvolvimento rápido:** Geração de código com assistência de IA
- **Integração Supabase:** Lovable Cloud para backend
- **Deploy automático:** Publicação instantânea
- **Preview em tempo real:** Visualização das alterações em tempo real

### 2.3.7. Outras Bibliotecas

| Biblioteca | Versão | Propósito |
|------------|--------|-----------|
| React Router | ^6.30.1 | Navegação e routing |
| React Query | ^5.83.0 | Gestão de estado servidor |
| React Hook Form | ^7.61.1 | Gestão de formulários |
| Zod | ^3.25.76 | Validação de dados |
| Shadcn/ui | - | Componentes de interface |
| Lucide React | ^0.462.0 | Ícones |
| Recharts | ^2.15.4 | Gráficos e visualizações |
| Date-fns | ^3.6.0 | Manipulação de datas |
| Framer Motion | - | Animações (via Tailwind) |
| Sonner | ^1.7.4 | Notificações toast |

## 2.4. Comparação de Tecnologias

### 2.4.1. Frameworks Frontend

| Critério | React | Vue.js | Angular |
|----------|-------|--------|---------|
| Curva de aprendizagem | Média | Baixa | Alta |
| Performance | Excelente | Excelente | Boa |
| Ecossistema | Muito vasto | Vasto | Completo |
| Flexibilidade | Alta | Média | Baixa |
| Mercado de trabalho | Muito alto | Alto | Alto |
| Tipagem | Opcional (TS) | Opcional (TS) | Nativa (TS) |

**Justificação da escolha:** React foi escolhido pela sua popularidade no mercado, vasto ecossistema de bibliotecas, e pela experiência prévia adquirida durante o curso. A integração com a plataforma Lovable também foi um fator determinante.

### 2.4.2. Soluções Backend

| Critério | Supabase/Lovable Cloud | Firebase | Backend próprio |
|----------|------------------------|----------|-----------------|
| Tempo de setup | Muito rápido | Rápido | Lento |
| Custo inicial | Gratuito | Gratuito | Variável |
| Escalabilidade | Alta | Muito alta | Depende |
| Controlo | Médio | Baixo | Total |
| PostgreSQL | Sim | Não | Opcional |
| Open Source | Sim | Não | Depende |
| Integração Lovable | Nativa | Manual | Manual |

**Justificação da escolha:** Lovable Cloud (baseado em Supabase) foi escolhido por oferecer PostgreSQL (base de dados relacional robusta), autenticação integrada, Edge Functions, e pela integração nativa com a plataforma de desenvolvimento utilizada.

## 2.5. Segurança e Boas Práticas

### 2.5.1. Autenticação Segura

O sistema implementa autenticação através de Supabase Auth, que oferece:

- **Hashing de passwords:** Passwords são armazenadas de forma segura com bcrypt
- **Tokens JWT:** Autenticação baseada em tokens
- **Sessões seguras:** Gestão automática de sessões
- **Recuperação de password:** Fluxo seguro de recuperação
- **Auto-confirm:** Confirmação automática de email para facilitar testes

### 2.5.2. Row Level Security (RLS)

Todas as tabelas da base de dados têm políticas RLS ativas que garantem:

- Utilizadores apenas acedem aos seus próprios dados
- Administradores têm acesso estendido conforme necessário
- Operações de escrita são validadas
- Dados sensíveis são protegidos

### 2.5.3. Validação de Dados

A validação de dados é realizada em múltiplas camadas:

- **Frontend:** Validação com Zod e React Hook Form (telemóvel obrigatório, formato de email, etc.)
- **Backend:** Validação nas Edge Functions
- **Base de dados:** Constraints e triggers

### 2.5.4. Edge Functions Seguras

As Edge Functions para operações sensíveis (como eliminação de conta e alteração de palavra-passe) incluem:

- Verificação de autenticação
- Validação de permissões
- Proteção contra operações não autorizadas

### 2.5.5. RGPD e Proteção de Dados

O sistema foi desenvolvido considerando os princípios do RGPD:

- **Minimização de dados:** Apenas dados necessários são recolhidos
- **Finalidade:** Dados são usados apenas para os fins declarados
- **Segurança:** Medidas técnicas de proteção implementadas
- **Direito ao esquecimento:** Possibilidade de eliminar conta permanentemente

## 2.6. Interface e Experiência do Utilizador

### 2.6.1. Princípios de Design

O design da interface segue princípios fundamentais de UX:

- **Consistência:** Elementos visuais consistentes em toda a aplicação
- **Feedback:** Resposta visual às ações do utilizador (animações, toasts)
- **Prevenção de erros:** Validações e confirmações
- **Flexibilidade:** Adaptação a diferentes contextos de uso
- **Estética:** Design moderno com gradientes e animações

### 2.6.2. Animações e Transições

O sistema implementa animações modernas para melhorar a experiência:

- **Fade-in:** Entrada suave de elementos
- **Scale-in:** Animação de escala para cards e botões
- **Slide:** Transições laterais para menus e diálogos
- **Hover effects:** Efeitos de hover com lift e glow
- **Loading states:** Indicadores animados de carregamento

### 2.6.3. Responsividade

A aplicação é totalmente responsiva, adaptando-se a:

- **Desktop:** Experiência completa com layout expandido
- **Tablet:** Layout adaptado com navegação otimizada
- **Mobile:** Interface compacta com navegação simplificada

### 2.6.4. Acessibilidade

Considerações de acessibilidade implementadas:

- Contraste adequado de cores
- Tamanhos de fonte legíveis
- Navegação por teclado
- Labels em formulários
- Mensagens de erro claras
- Ícones com descrições

---

# 3. ANÁLISE DO PROBLEMA E PLANEAMENTO

## 3.1. Identificação do Problema

### 3.1.1. Contexto Atual

As oficinas automóveis de pequena e média dimensão enfrentam diversos desafios na gestão das suas operações:

**Gestão Manual de Registos:**
- Fichas de cliente em papel facilmente perdidas ou danificadas
- Dificuldade em localizar histórico de serviços
- Erros de transcrição e informação incompleta

**Comunicação com Clientes:**
- Dificuldade em contactar clientes para atualizações
- Falta de sistema de agendamento online
- Impossibilidade de fornecer orçamentos rapidamente

**Controlo Financeiro:**
- Cálculos manuais de custos e margens
- Falta de visibilidade sobre rentabilidade
- Dificuldade em gerar relatórios

**Fidelização de Clientes:**
- Sem lembretes automáticos de manutenções
- Falta de histórico acessível para clientes
- Experiência de serviço antiquada

### 3.1.2. Impacto dos Problemas

Os problemas identificados resultam em:

- **Perda de tempo:** Tarefas administrativas consomem tempo excessivo
- **Perda de clientes:** Serviço menos eficiente que a concorrência
- **Perda financeira:** Erros de cálculo e falta de controlo
- **Perda de dados:** Informação importante perdida ou inacessível

## 3.2. Objetivos Operacionais do Sistema

O sistema deve permitir:

1. **Registo de utilizadores** com autenticação segura e telemóvel obrigatório
2. **Gestão de veículos** com informação completa (marca, modelo, matrícula, quilometragem)
3. **Registo de serviços** com detalhes técnicos e financeiros
4. **Agendamento online** com disponibilidade em tempo real
5. **Pedidos de orçamento** com gestão de estados
6. **Cálculo automático** de custos, preços e margens
7. **Visualização de histórico** por cliente e por veículo
8. **Relatórios de gestão** com estatísticas do negócio
9. **Assistente virtual** para suporte ao cliente
10. **Edição de perfil** com alteração de palavra-passe e eliminação de conta
11. **Gestão de tipos de serviços** personalizados
12. **Gestão de marcas e modelos** de carros personalizados

## 3.3. Levantamento de Requisitos

### 3.3.1. Requisitos Funcionais

| ID | Requisito | Prioridade | Estado |
|----|-----------|------------|--------|
| RF01 | O sistema deve permitir registo de novos utilizadores com telemóvel obrigatório | Alta | ✅ |
| RF02 | O sistema deve permitir login com email e password | Alta | ✅ |
| RF03 | O sistema deve distinguir entre clientes e administradores | Alta | ✅ |
| RF04 | Clientes devem poder registar os seus veículos | Alta | ✅ |
| RF05 | Clientes devem poder visualizar histórico de serviços | Alta | ✅ |
| RF06 | Clientes devem poder pedir orçamentos | Média | ✅ |
| RF07 | Clientes devem poder agendar serviços | Média | ✅ |
| RF08 | Administradores devem poder gerir todos os clientes | Alta | ✅ |
| RF09 | Administradores devem poder gerir todos os veículos | Alta | ✅ |
| RF10 | Administradores devem poder criar e editar serviços | Alta | ✅ |
| RF11 | O sistema deve calcular automaticamente custos e margens | Alta | ✅ |
| RF12 | O sistema deve gerar relatórios de gestão | Média | ✅ |
| RF13 | O sistema deve ter um chatbot para assistência | Média | ✅ |
| RF14 | O sistema deve permitir gestão de disponibilidades | Média | ✅ |
| RF15 | Clientes devem poder editar o seu perfil | Alta | ✅ |
| RF16 | Clientes devem poder alterar a sua palavra-passe | Alta | ✅ |
| RF17 | Clientes devem poder eliminar a sua conta permanentemente | Média | ✅ |
| RF18 | Administradores devem poder gerir tipos de serviços | Média | ✅ |
| RF19 | Administradores devem poder gerir marcas de carros | Média | ✅ |
| RF20 | O sistema deve ter animações e transições modernas | Baixa | ✅ |

### 3.3.2. Requisitos Não Funcionais

| ID | Requisito | Descrição | Estado |
|----|-----------|-----------|--------|
| RNF01 | Usabilidade | Interface intuitiva e fácil de usar | ✅ |
| RNF02 | Performance | Tempo de resposta inferior a 2 segundos | ✅ |
| RNF03 | Segurança | Dados protegidos com autenticação e RLS | ✅ |
| RNF04 | Responsividade | Adaptação a diferentes dispositivos | ✅ |
| RNF05 | Disponibilidade | Sistema disponível 24/7 | ✅ |
| RNF06 | Manutenibilidade | Código organizado e documentado | ✅ |
| RNF07 | Escalabilidade | Capacidade de crescer com o negócio | ✅ |
| RNF08 | Estética | Design moderno com animações | ✅ |

### 3.3.3. Diagrama de Casos de Uso

```
┌─────────────────────────────────────────────────────────────┐
│                    Sistema Maslov Motors                     │
│                                                              │
│  ┌─────────────────┐          ┌─────────────────┐           │
│  │    Registar     │          │    Fazer Login  │           │
│  └────────┬────────┘          └────────┬────────┘           │
│           │                            │                     │
│  ┌────────┴────────┐          ┌────────┴────────┐           │
│  │  Gerir Veículos │          │  Ver Histórico  │           │
│  └────────┬────────┘          └────────┬────────┘           │
│           │                            │                     │
│  ┌────────┴────────┐          ┌────────┴────────┐           │
│  │ Pedir Orçamento │          │ Agendar Serviço │           │
│  └────────┬────────┘          └────────┬────────┘           │
│           │                            │                     │
│  ┌────────┴────────┐          ┌────────┴────────┐           │
│  │  Usar Chatbot   │          │  Editar Perfil  │           │
│  └────────┬────────┘          └────────┬────────┘           │
│           │                            │                     │
│  ┌────────┴────────┐          ┌────────┴────────┐           │
│  │Alterar Password │          │ Eliminar Conta  │           │
│  └─────────────────┘          └─────────────────┘           │
│                                                              │
│           👤 Cliente                                         │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────┐          ┌─────────────────┐           │
│  │ Gerir Clientes  │          │  Gerir Carros   │           │
│  └────────┬────────┘          └────────┬────────┘           │
│           │                            │                     │
│  ┌────────┴────────┐          ┌────────┴────────┐           │
│  │ Gerir Serviços  │          │ Gerir Orçamentos│           │
│  └────────┬────────┘          └────────┬────────┘           │
│           │                            │                     │
│  ┌────────┴────────┐          ┌────────┴────────┐           │
│  │  Ver Relatórios │          │Gerir Agendamentos│          │
│  └────────┬────────┘          └────────┬────────┘           │
│           │                            │                     │
│  ┌────────┴────────┐          ┌────────┴────────┐           │
│  │ Gerir Tipos     │          │ Gerir Marcas    │           │
│  │ de Serviços     │          │ de Carros       │           │
│  └─────────────────┘          └─────────────────┘           │
│                                                              │
│           👤 Administrador                                   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## 3.4. Estudo do Contexto

### 3.4.1. Utilizadores Finais

**Clientes:**
- Proprietários de veículos
- Diversos níveis de literacia digital
- Acedem principalmente via smartphone
- Esperam interface simples e rápida
- Valorizam transparência no histórico e preços

**Administradores:**
- Funcionários da oficina
- Necessitam de visão completa do negócio
- Acedem principalmente via computador
- Necessitam de funcionalidades avançadas
- Valorizam eficiência e relatórios

### 3.4.2. Ambiente de Utilização

- Acesso via navegador web
- Necessidade de conexão à internet
- Ambiente de oficina (computador fixo)
- Mobilidade (smartphone dos clientes)

## 3.5. Planeamento e Gestão do Projeto

### 3.5.1. Metodologia de Desenvolvimento

Foi adotada uma abordagem ágil simplificada:

- **Iterações curtas:** Desenvolvimento em ciclos de 1-2 semanas
- **Entregas incrementais:** Funcionalidades entregues progressivamente
- **Feedback contínuo:** Ajustes baseados em testes
- **Documentação contínua:** Registo durante o desenvolvimento

### 3.5.2. Cronograma (Diagrama de Gantt Simplificado)

```
Semana    1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18
          |---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
Planeam.  ████████
Conceção          ████████
Auth                      ████
Dashboards                    ████████
Serviços                              ████████
Agendamento                                   ████████
Chatbot IA                                            ████
Perfil/Conta                                              ████
Animações                                                     ████
Testes                                                            ████████
Documentação                                                              ████████
```

### 3.5.3. Ferramentas de Gestão

- **Lovable:** Plataforma de desenvolvimento principal
- **Git/GitHub:** Controlo de versões integrado
- **VS Code:** Editor de código auxiliar
- **Navegador Chrome:** Testes e debugging

## 3.6. Análise de Riscos

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Atrasos no desenvolvimento | Média | Alto | Priorização de funcionalidades core |
| Bugs críticos | Média | Alto | Testes contínuos |
| Problemas de performance | Baixa | Médio | Otimização progressiva |
| Falhas de segurança | Baixa | Alto | Uso de RLS e autenticação robusta |
| Perda de dados | Baixa | Alto | Backups automáticos do Lovable Cloud |
| Complexidade excessiva | Média | Médio | Simplificação de funcionalidades |
| Problemas de integração IA | Média | Médio | Uso de fallbacks e retry logic |

---

# 4. CONCEÇÃO E ARQUITETURA DO SISTEMA

## 4.1. Arquitetura Geral

### 4.1.1. Visão Global

A aplicação segue uma arquitetura cliente-servidor moderna, com separação clara entre frontend e backend:

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTE                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Browser (React SPA)                     │    │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │    │
│  │  │  Pages  │ │Components│ │  Hooks  │ │  Utils  │   │    │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘   │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    SERVIDOR (Lovable Cloud)                  │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                  Supabase Backend                    │    │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │    │
│  │  │   Auth  │ │   API   │ │ Database│ │ Edge Fn │   │    │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘   │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### 4.1.2. Camadas da Aplicação

**Camada de Apresentação (Frontend):**
- Componentes React
- Páginas e rotas
- Formulários e validações
- Animações e transições

**Camada de Lógica (Backend):**
- Edge Functions para operações complexas
- Autenticação e autorização
- Processamento de IA

**Camada de Dados:**
- Base de dados PostgreSQL
- Políticas RLS
- Triggers e funções

## 4.2. Modelação de Dados

### 4.2.1. Diagrama Entidade-Relacionamento

```
┌─────────────────┐       ┌─────────────────┐
│    PROFILES     │       │   USER_ROLES    │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │◄──────│ id (PK)         │
│ email           │       │ user_id (FK)    │
│ first_name      │       │ role            │
│ last_name       │       │ created_at      │
│ phone           │       └─────────────────┘
│ created_at      │
│ updated_at      │
└────────┬────────┘
         │
         │ 1:N
         ▼
┌─────────────────┐       ┌─────────────────┐
│      CARS       │       │AVAILABILITY_SLOTS│
├─────────────────┤       ├─────────────────┤
│ id (PK)         │       │ id (PK)         │
│ owner_id (FK)   │       │ date            │
│ marca           │       │ start_time      │
│ modelo          │       │ end_time        │
│ ano             │       │ max_bookings    │
│ cor             │       │ current_bookings│
│ matricula       │       │ is_available    │
│ quilometragem   │       │ created_at      │
│ created_at      │       │ updated_at      │
│ updated_at      │       └────────┬────────┘
└────────┬────────┘                │
         │                         │
         │ 1:N                     │ 1:N
         ▼                         ▼
┌─────────────────┐       ┌─────────────────┐
│    SERVICES     │       │ QUOTE_REQUESTS  │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │       │ id (PK)         │
│ car_id (FK)     │       │ user_id (FK)    │
│ service_name    │       │ slot_id (FK)    │
│ description     │       │ client_name     │
│ scheduled_date  │       │ client_phone    │
│ status          │       │ message         │
│ work_hours      │       │ preferred_date  │
│ cost_per_hour   │       │ preferred_time  │
│ parts_cost      │       │ status          │
│ parts_used      │       │ created_at      │
│ final_price     │       │ updated_at      │
│ margin          │       └─────────────────┘
│ mileage_at_service│
│ recommendations │
│ next_revision_date│
│ created_at      │
│ updated_at      │
└─────────────────┘

┌─────────────────┐       ┌─────────────────┐
│CUSTOM_CAR_BRANDS│       │CUSTOM_SERVICE_TYPES│
├─────────────────┤       ├─────────────────┤
│ id (PK)         │       │ id (PK)         │
│ brand_name      │       │ name            │
│ models[]        │       │ description     │
│ created_at      │       │ default_description│
│ updated_at      │       │ default_parts_used│
└─────────────────┘       │ created_at      │
                          │ updated_at      │
                          └─────────────────┘
```

### 4.2.2. Descrição das Tabelas

**Tabela: profiles**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | Identificador único (PK), referência ao auth.users |
| email | VARCHAR | Email do utilizador |
| first_name | VARCHAR | Primeiro nome |
| last_name | VARCHAR | Apelido |
| phone | VARCHAR | Telefone (obrigatório no registo) |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data de atualização |

**Tabela: user_roles**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | Identificador único (PK) |
| user_id | UUID | ID do utilizador (FK) |
| role | ENUM | Papel: 'admin' ou 'client' |
| created_at | TIMESTAMP | Data de criação |

**Tabela: cars**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | Identificador único (PK) |
| owner_id | UUID | ID do proprietário (FK) |
| marca | VARCHAR | Marca do veículo |
| modelo | VARCHAR | Modelo do veículo |
| ano | INTEGER | Ano de fabrico |
| cor | VARCHAR | Cor do veículo |
| matricula | VARCHAR | Matrícula (única) |
| quilometragem | INTEGER | Quilometragem atual |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data de atualização |

**Tabela: services**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | Identificador único (PK) |
| car_id | UUID | ID do carro (FK) |
| service_name | VARCHAR | Nome do serviço |
| description | TEXT | Descrição do serviço |
| scheduled_date | DATE | Data agendada |
| status | ENUM | Estado: agendado, em_processo, concluido |
| work_hours | DECIMAL | Horas de trabalho |
| cost_per_hour | DECIMAL | Custo por hora |
| parts_cost | DECIMAL | Custo das peças |
| parts_used | TEXT | Peças utilizadas |
| final_price | DECIMAL | Preço final cobrado ao cliente |
| margin | DECIMAL | Margem de lucro calculada |
| mileage_at_service | INTEGER | Quilometragem no serviço |
| recommendations | TEXT | Recomendações para o cliente |
| next_revision_date | DATE | Data da próxima revisão |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data de atualização |

**Tabela: quote_requests**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | Identificador único (PK) |
| user_id | UUID | ID do utilizador (FK) |
| slot_id | UUID | ID do slot (FK, opcional) |
| client_name | VARCHAR | Nome do cliente |
| client_phone | VARCHAR | Telefone do cliente |
| message | TEXT | Mensagem/descrição |
| preferred_date | DATE | Data preferida |
| preferred_time | TIME | Hora preferida |
| status | VARCHAR | Estado do pedido |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data de atualização |

**Tabela: custom_car_brands**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | Identificador único (PK) |
| brand_name | VARCHAR | Nome da marca |
| models | TEXT[] | Array de modelos |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data de atualização |

**Tabela: custom_service_types**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | Identificador único (PK) |
| name | VARCHAR | Nome do tipo de serviço |
| description | TEXT | Descrição |
| default_description | TEXT | Descrição padrão |
| default_parts_used | TEXT | Peças padrão |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data de atualização |

**Tabela: availability_slots**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | Identificador único (PK) |
| date | DATE | Data do slot |
| start_time | TIME | Hora de início |
| end_time | TIME | Hora de fim |
| max_bookings | INTEGER | Máximo de marcações |
| current_bookings | INTEGER | Marcações atuais |
| is_available | BOOLEAN | Disponibilidade |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data de atualização |

### 4.2.3. Normalização

A base de dados segue a Terceira Forma Normal (3NF):

- **1NF:** Todos os atributos são atómicos
- **2NF:** Não existem dependências parciais
- **3NF:** Não existem dependências transitivas

## 4.3. Modelação do Software

### 4.3.1. Estrutura de Componentes

```
src/
├── components/
│   ├── ui/                    # Componentes de interface base (Shadcn)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── toast.tsx
│   │   └── ...
│   ├── chat/
│   │   └── ChatBot.tsx        # Componente do chatbot com IA
│   └── dashboard/
│       ├── AdminDashboard.tsx  # Dashboard do administrador
│       ├── ClientDashboard.tsx # Dashboard do cliente
│       ├── admin/
│       │   ├── CarsManagement.tsx
│       │   ├── ClientsManagement.tsx
│       │   ├── ServicesManagement.tsx
│       │   ├── QuoteRequestsManagement.tsx
│       │   ├── ReportsView.tsx
│       │   ├── DashboardCharts.tsx
│       │   ├── AddCarDialog.tsx
│       │   ├── EditCarDialog.tsx
│       │   ├── AddClientDialog.tsx
│       │   ├── EditClientDialog.tsx
│       │   ├── AddServiceDialog.tsx
│       │   ├── EditServiceDialog.tsx
│       │   ├── ChangePasswordDialog.tsx
│       │   ├── ManageCarBrandsDialog.tsx
│       │   ├── ManageServiceTypesDialog.tsx
│       │   └── CreateServiceFromBookingDialog.tsx
│       └── client/
│           ├── AddCarDialog.tsx
│           ├── BookingDialog.tsx
│           ├── QuoteRequestDialog.tsx
│           └── EditProfileDialog.tsx
├── pages/
│   ├── Index.tsx              # Página inicial (redirect)
│   ├── Auth.tsx               # Autenticação (login/registo)
│   ├── Dashboard.tsx          # Dashboard principal (routing)
│   ├── LandingPage.tsx        # Landing page pública
│   └── NotFound.tsx           # Página 404
├── hooks/
│   ├── useAuth.tsx            # Hook de autenticação
│   ├── use-toast.ts           # Hook de notificações
│   └── use-mobile.tsx         # Hook de deteção mobile
├── lib/
│   ├── utils.ts               # Funções utilitárias
│   ├── validations.ts         # Validações com Zod
│   └── carData.ts             # Dados estáticos de carros
└── integrations/
    └── supabase/
        ├── client.ts          # Cliente Supabase (auto-gerado)
        └── types.ts           # Tipos gerados da BD
```

### 4.3.2. Fluxo de Dados

```
┌─────────────────────────────────────────────────────────────┐
│                     Componente React                         │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │   Estado    │◄──▶│    Hooks    │◄──▶│   Props     │     │
│  │   Local     │    │ (useAuth,   │    │             │     │
│  │ (useState)  │    │  useToast)  │    │             │     │
│  └─────────────┘    └──────┬──────┘    └─────────────┘     │
│                            │                                 │
└────────────────────────────┼─────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                    Supabase Client                           │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │    Auth     │    │   Query     │    │  Functions  │     │
│  │  (login,    │    │  (select,   │    │  (invoke)   │     │
│  │  logout)    │    │  insert)    │    │             │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
└────────────────────────────┼─────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                  Lovable Cloud Backend                       │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │   Auth      │    │  Database   │    │ Edge        │     │
│  │  Service    │    │ PostgreSQL  │    │ Functions   │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

## 4.4. Design do Sistema

### 4.4.1. Identidade Visual

A identidade visual da Maslov Motors foi desenvolvida com foco em:

- **Cores principais:** Tons escuros (slate/zinc) com acentos vibrantes (primary)
- **Tipografia:** Fontes modernas do sistema (Inter, Geist)
- **Estilo:** Profissional, tecnológico e moderno
- **Consistência:** Padrões visuais uniformes
- **Animações:** Transições suaves e efeitos de hover

### 4.4.2. Sistema de Design

O sistema de design utiliza Shadcn/ui como base, com customizações:

- Componentes pré-estilizados com Radix UI
- Variáveis CSS para temas (dark mode)
- Animações personalizadas no Tailwind
- Design tokens semânticos

### 4.4.3. Animações Implementadas

| Animação | Uso | Propriedades |
|----------|-----|--------------|
| fade-in | Entrada de elementos | opacity 0→1 |
| fade-in-up | Cards e conteúdo | opacity + translateY |
| scale-in | Botões e modais | scale 0.95→1 |
| slide-in-left/right | Menus laterais | translateX |
| hover-lift | Cards interativos | translateY + shadow |
| hover-glow | Botões destacados | box-shadow animado |
| pulse-subtle | Indicadores | scale suave |

## 4.5. Documentação Técnica

### 4.5.1. Estrutura de Diretórios

```
maslov-motors/
├── public/                 # Ficheiros estáticos
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── assets/            # Imagens e recursos
│   ├── components/        # Componentes React
│   ├── hooks/             # Hooks personalizados
│   ├── integrations/      # Integrações (Supabase)
│   ├── lib/               # Utilitários
│   ├── pages/             # Páginas da aplicação
│   ├── App.tsx            # Componente principal
│   ├── App.css            # Estilos globais
│   ├── index.css          # CSS base + animações
│   └── main.tsx           # Ponto de entrada
├── supabase/
│   ├── functions/         # Edge Functions
│   │   ├── chat-assistant/
│   │   ├── delete-user/
│   │   └── update-password/
│   └── config.toml        # Configuração
├── docs/                  # Documentação
├── package.json           # Dependências
├── tailwind.config.ts     # Configuração Tailwind + animações
├── tsconfig.json          # Configuração TypeScript
└── vite.config.ts         # Configuração Vite
```

### 4.5.2. Dependências Principais

| Dependência | Versão | Propósito |
|-------------|--------|-----------|
| react | ^18.3.1 | Framework UI |
| typescript | - | Tipagem |
| tailwindcss | - | Estilização |
| @supabase/supabase-js | ^2.79.0 | Cliente Supabase |
| react-router-dom | ^6.30.1 | Routing |
| @tanstack/react-query | ^5.83.0 | Gestão de estado |
| react-hook-form | ^7.61.1 | Formulários |
| zod | ^3.25.76 | Validação |
| recharts | ^2.15.4 | Gráficos |
| lucide-react | ^0.462.0 | Ícones |
| date-fns | ^3.6.0 | Datas |
| sonner | ^1.7.4 | Toasts |
| tailwindcss-animate | ^1.0.7 | Animações |

### 4.5.3. Convenções de Código

- **Nomenclatura:** PascalCase para componentes, camelCase para variáveis e funções
- **Ficheiros:** Um componente por ficheiro
- **Imports:** Organizados por tipo (React, libs externas, componentes locais)
- **Tipagem:** Tipos explícitos com TypeScript
- **Comentários:** Em português para facilitar a manutenção
- **Componentes:** Funcionais com hooks

---

# 5. DESENVOLVIMENTO E IMPLEMENTAÇÃO

## 5.1. Ambiente de Desenvolvimento

### 5.1.1. Hardware

O desenvolvimento foi realizado num computador pessoal com as seguintes especificações mínimas recomendadas:

- Processador: Intel Core i5 ou equivalente
- Memória RAM: 8GB ou superior
- Armazenamento: SSD com espaço disponível
- Conexão à internet: Necessária para desenvolvimento

### 5.1.2. Software

| Ferramenta | Versão | Propósito |
|------------|--------|-----------|
| Lovable | - | Plataforma de desenvolvimento principal |
| Node.js | 18+ | Runtime JavaScript |
| Navegador Chrome | Última | Testes e debugging |
| VS Code | Última | Editor auxiliar |
| Git | Última | Controlo de versões (integrado) |

### 5.1.3. Configuração do Projeto

O projeto foi inicializado através da plataforma Lovable, que configura automaticamente:

- Estrutura do projeto React + TypeScript
- Tailwind CSS com animações
- Vite como bundler
- ESLint para linting
- Integração com Lovable Cloud (Supabase)
- Deploy automático

## 5.2. Desenvolvimento Backend

### 5.2.1. Configuração da Base de Dados

A base de dados foi configurada através de migrações SQL executadas via Lovable:

```sql
-- Exemplo: Criação da tabela profiles
CREATE TABLE public.profiles (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR NOT NULL,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  phone VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Ativação de Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Política para visualização do próprio perfil
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);
```

### 5.2.2. Políticas de Segurança (RLS)

Foram implementadas políticas RLS para todas as tabelas:

```sql
-- Clientes veem apenas os seus carros
CREATE POLICY "Users can view own cars" 
ON public.cars 
FOR SELECT 
USING (auth.uid() = owner_id);

-- Administradores veem todos os carros
CREATE POLICY "Admins can view all cars" 
ON public.cars 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Clientes veem serviços dos seus carros
CREATE POLICY "Clients can view own services"
ON public.services
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM cars
    WHERE cars.id = services.car_id
    AND cars.owner_id = auth.uid()
  )
);
```

### 5.2.3. Edge Functions

Foram desenvolvidas três Edge Functions:

**1. chat-assistant** - Chatbot com IA:
```typescript
// supabase/functions/chat-assistant/index.ts
Deno.serve(async (req) => {
  const { message } = await req.json();
  
  const response = await fetch(
    'https://api.lovable.dev/v1/ai/chat',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'openai/gpt-5-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ]
      })
    }
  );
  
  return new Response(JSON.stringify({ reply: response }));
});
```

**2. delete-user** - Eliminação de conta:
```typescript
// supabase/functions/delete-user/index.ts
Deno.serve(async (req) => {
  const { userId, requesterId } = await req.json();
  
  // Verificar permissões
  if (requesterId !== userId) {
    // Verificar se é admin
    const isAdmin = await checkAdminRole(requesterId);
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: 'Não autorizado' }), { status: 403 });
    }
  }
  
  // Eliminar utilizador
  await supabaseAdmin.auth.admin.deleteUser(userId);
  
  return new Response(JSON.stringify({ success: true }));
});
```

**3. update-password** - Alteração de palavra-passe:
```typescript
// supabase/functions/update-password/index.ts
Deno.serve(async (req) => {
  const { userId, currentPassword, newPassword } = await req.json();
  
  // Verificar password atual
  const verified = await verifyCurrentPassword(userId, currentPassword);
  if (!verified) {
    return new Response(JSON.stringify({ error: 'Palavra-passe atual incorreta' }));
  }
  
  // Atualizar password
  await supabaseAdmin.auth.admin.updateUserById(userId, { password: newPassword });
  
  return new Response(JSON.stringify({ success: true }));
});
```

## 5.3. Desenvolvimento Frontend

### 5.3.1. Sistema de Autenticação

O hook useAuth gere toda a lógica de autenticação:

```typescript
// src/hooks/useAuth.tsx
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkRole(session.user.id);
      }
    });

    // Subscrever alterações de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          checkRole(session.user.id);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const checkRole = async (userId: string) => {
    const { data } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .single();
    
    setIsAdmin(data?.role === 'admin');
  };

  return { user, isAdmin, loading, signIn, signUp, signOut };
};
```

### 5.3.2. Dashboard do Cliente

O dashboard do cliente apresenta:

- Resumo estatístico (carros, serviços agendados, concluídos)
- Lista de veículos com histórico expansível
- Timeline visual de serviços
- Ações rápidas (adicionar carro, marcação, orçamento)
- Botão de definições para edição de perfil

### 5.3.3. Dashboard do Administrador

O dashboard do administrador inclui tabs para:

- **Dashboard:** Gráficos e estatísticas
- **Clientes:** CRUD completo de clientes
- **Carros:** Gestão de todos os veículos
- **Serviços:** Criação e gestão de serviços
- **Pedidos:** Gestão de orçamentos e marcações

### 5.3.4. Edição de Perfil do Cliente

Componente com tabs para:

- **Dados Pessoais:** Nome, apelido, email, telemóvel
- **Segurança:** Alteração de palavra-passe, eliminação de conta

```typescript
// src/components/dashboard/client/EditProfileDialog.tsx
const EditProfileDialog = () => {
  return (
    <Dialog>
      <Tabs defaultValue="personal">
        <TabsList>
          <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal">
          {/* Formulário de edição de perfil */}
        </TabsContent>
        
        <TabsContent value="security">
          {/* Alteração de password e eliminação de conta */}
        </TabsContent>
      </Tabs>
    </Dialog>
  );
};
```

### 5.3.5. Componente Chatbot

O chatbot foi implementado como componente flutuante com animações:

```typescript
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = async (input: string) => {
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    
    const { data } = await supabase.functions.invoke('chat-assistant', {
      body: { message: input }
    });

    setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <ChatWindow messages={messages} onSend={sendMessage} onClose={() => setIsOpen(false)} />
      ) : (
        <Button onClick={() => setIsOpen(true)} className="rounded-full animate-pulse-subtle">
          <MessageSquare />
        </Button>
      )}
    </div>
  );
};
```

### 5.3.6. Animações e Transições

As animações foram implementadas via Tailwind CSS:

```typescript
// tailwind.config.ts
animation: {
  'fade-in': 'fadeIn 0.3s ease-out',
  'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
  'scale-in': 'scaleIn 0.3s ease-out',
  'slide-in-left': 'slideInLeft 0.4s ease-out',
  'hover-lift': 'hover:translate-y-[-4px] hover:shadow-xl',
  'glow-pulse': 'glowPulse 2s ease-in-out infinite',
}

// index.css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

## 5.4. Integração da Base de Dados

### 5.4.1. Queries com Supabase

Exemplos de operações com a base de dados:

```typescript
// Buscar carros do utilizador
const fetchCars = async (userId: string) => {
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .eq('owner_id', userId)
    .order('created_at', { ascending: false });
  
  return data;
};

// Criar novo serviço com cálculo de margem
const createService = async (service: ServiceData) => {
  const laborCost = service.work_hours * service.cost_per_hour;
  const totalCost = laborCost + service.parts_cost;
  const margin = service.final_price - totalCost;
  
  const { data, error } = await supabase
    .from('services')
    .insert({ ...service, margin })
    .select()
    .single();
  
  return data;
};
```

### 5.4.2. Joins e Relações

Para obter dados relacionados:

```typescript
// Buscar serviços com informação do carro e proprietário
const fetchServicesWithDetails = async () => {
  const { data } = await supabase
    .from('services')
    .select(`
      *,
      cars (
        id, marca, modelo, matricula, owner_id,
        profiles:owner_id (first_name, last_name, phone)
      )
    `)
    .order('scheduled_date', { ascending: false });
  
  return data;
};
```

## 5.5. Integração de APIs Externas

### 5.5.1. Lovable AI

O chatbot utiliza a API Lovable AI para processamento de linguagem natural:

```typescript
const response = await fetch('https://api.lovable.dev/v1/ai/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'openai/gpt-5-mini',
    messages: [
      { role: 'system', content: 'És um assistente da oficina Maslov Motors...' },
      ...conversationHistory
    ]
  })
});
```

## 5.6. Versionamento e Deploy

### 5.6.1. Controlo de Versões

O projeto utiliza Git integrado na plataforma Lovable:

- Commits automáticos a cada alteração
- Histórico completo de alterações
- Possibilidade de reverter alterações

### 5.6.2. Deploy

O deploy é automático através da plataforma Lovable:

- Deploy contínuo a cada alteração
- Ambiente de preview em tempo real
- Publicação para produção com um clique
- Edge Functions deployadas automaticamente
- URL de produção: https://maslov-motors.lovable.app

---

# 6. TESTES E VALIDAÇÃO

## 6.1. Estratégia de Testes

A estratégia de testes adotada focou-se em:

- **Testes manuais:** Verificação de funcionalidades durante o desenvolvimento
- **Testes de interface:** Validação da experiência do utilizador
- **Testes de integração:** Verificação da comunicação com backend
- **Testes de segurança:** Validação das políticas RLS

## 6.2. Ferramentas de Teste

| Ferramenta | Propósito |
|------------|-----------|
| Chrome DevTools | Debugging e performance |
| Console do navegador | Logs e erros |
| Preview do Lovable | Testes em tempo real |
| Network tab | Verificação de requests |

## 6.3. Casos de Teste e Resultados

### 6.3.1. Testes de Autenticação

| ID | Caso de Teste | Resultado |
|----|---------------|-----------|
| T01 | Registo com dados válidos (incluindo telemóvel) | ✅ Passou |
| T02 | Registo com email já existente | ✅ Passou |
| T03 | Registo sem telemóvel (campo obrigatório) | ✅ Passou (bloqueado) |
| T04 | Login com credenciais válidas | ✅ Passou |
| T05 | Login com credenciais inválidas | ✅ Passou |
| T06 | Logout | ✅ Passou |
| T07 | Persistência de sessão | ✅ Passou |
| T08 | Redirect baseado em role | ✅ Passou |

### 6.3.2. Testes de Gestão de Carros

| ID | Caso de Teste | Resultado |
|----|---------------|-----------|
| T09 | Adicionar carro com dados válidos | ✅ Passou |
| T10 | Adicionar carro com matrícula duplicada | ✅ Passou |
| T11 | Editar informações do carro | ✅ Passou |
| T12 | Visualizar lista de carros | ✅ Passou |
| T13 | Cliente vê apenas os seus carros | ✅ Passou |
| T14 | Admin vê todos os carros | ✅ Passou |

### 6.3.3. Testes de Serviços

| ID | Caso de Teste | Resultado |
|----|---------------|-----------|
| T15 | Criar novo serviço | ✅ Passou |
| T16 | Atualizar estado do serviço | ✅ Passou |
| T17 | Cálculo automático de margem | ✅ Passou |
| T18 | Filtrar serviços por estado | ✅ Passou |
| T19 | Ver timeline de serviços | ✅ Passou |

### 6.3.4. Testes de Perfil e Conta

| ID | Caso de Teste | Resultado |
|----|---------------|-----------|
| T20 | Editar dados pessoais | ✅ Passou |
| T21 | Alterar palavra-passe com verificação | ✅ Passou |
| T22 | Alterar palavra-passe com password errada | ✅ Passou (erro) |
| T23 | Eliminar conta permanentemente | ✅ Passou |
| T24 | Confirmar eliminação de conta | ✅ Passou |

### 6.3.5. Testes de Segurança

| ID | Caso de Teste | Resultado |
|----|---------------|-----------|
| T25 | Cliente não acede a dados de outros | ✅ Passou |
| T26 | Não autenticado não acede a dados | ✅ Passou |
| T27 | Admin acede a todos os dados | ✅ Passou |
| T28 | Cliente não pode eliminar conta de outro | ✅ Passou |

### 6.3.6. Testes de Interface

| ID | Caso de Teste | Resultado |
|----|---------------|-----------|
| T29 | Animações executam corretamente | ✅ Passou |
| T30 | Responsividade em mobile | ✅ Passou |
| T31 | Transições entre estados | ✅ Passou |
| T32 | Notificações toast aparecem | ✅ Passou |

## 6.4. Avaliação de Desempenho

### 6.4.1. Métricas de Performance

| Métrica | Valor Obtido | Objetivo |
|---------|--------------|----------|
| Tempo de carregamento inicial | ~2s | < 3s |
| Tempo de resposta da API | ~200ms | < 500ms |
| First Contentful Paint | ~1.5s | < 2s |
| Time to Interactive | ~2.5s | < 3s |
| Performance score (Lighthouse) | ~85 | > 80 |

### 6.4.2. Otimizações Implementadas

- Lazy loading de componentes
- Animações com CSS (não JS) para performance
- Caching de dados com React Query
- Minimização de re-renders
- Imagens otimizadas

## 6.5. Validação pelo Utilizador

### 6.5.1. Feedback Obtido

Durante o desenvolvimento, foi recolhido feedback sobre:

- Facilidade de navegação: Positivo
- Clareza das funcionalidades: Positivo
- Experiência visual: Muito positivo (animações apreciadas)
- Velocidade: Positivo

### 6.5.2. Ajustes Realizados

Com base no feedback:

- Melhorias na organização do dashboard
- Adição de mensagens de confirmação
- Ajustes de responsividade
- Animações mais subtis em algumas áreas
- Campo de telemóvel tornado obrigatório

---

# 7. RESULTADOS E DISCUSSÃO

## 7.1. Resultados Obtidos

### 7.1.1. Funcionalidades Implementadas

| Funcionalidade | Estado | Observações |
|----------------|--------|-------------|
| Sistema de autenticação | ✅ Completo | Login, registo com telemóvel obrigatório |
| Gestão de perfis | ✅ Completo | Visualização, edição, alteração de password |
| Eliminação de conta | ✅ Completo | Com confirmação e Edge Function segura |
| Gestão de carros (cliente) | ✅ Completo | CRUD completo |
| Gestão de carros (admin) | ✅ Completo | Visão de todos os carros |
| Gestão de serviços | ✅ Completo | Criação, edição, estados |
| Pedidos de orçamento | ✅ Completo | Submissão e gestão |
| Sistema de agendamento | ✅ Completo | Marcações com slots |
| Cálculo de custos/margens | ✅ Completo | Automático |
| Dashboard com estatísticas | ✅ Completo | Gráficos mensal e anual |
| Chatbot com IA | ✅ Completo | Assistente virtual |
| Gestão de tipos de serviços | ✅ Completo | Personalizáveis |
| Gestão de marcas de carros | ✅ Completo | Personalizáveis |
| Animações e transições | ✅ Completo | Modernas e fluidas |
| Responsividade | ✅ Completo | Mobile, tablet, desktop |

### 7.1.2. Métricas do Projeto

- **Linhas de código:** ~20.000+
- **Componentes React:** 60+
- **Tabelas na base de dados:** 8
- **Edge Functions:** 3
- **Tempo de desenvolvimento:** ~18 semanas
- **Políticas RLS:** 20+

## 7.2. Análise Crítica

### 7.2.1. Comparação Planeado vs Realizado

| Objetivo | Planeado | Realizado | Desvio |
|----------|----------|-----------|--------|
| Sistema de autenticação | Sim | Sim | Nenhum |
| Gestão de veículos | Sim | Sim | Nenhum |
| Gestão de serviços | Sim | Sim | Nenhum |
| Agendamento | Sim | Sim | Nenhum |
| Chatbot com IA | Sim | Sim | Nenhum |
| Edição de perfil | Sim | Sim | Nenhum |
| Eliminação de conta | Sim | Sim | Nenhum |
| Animações | Opcional | Sim | Excedido |
| Relatórios financeiros | Sim | Sim | Nenhum |
| Lembretes automáticos | Sim | Não | Por implementar |
| Integração pagamentos | Não | Não | N/A |

### 7.2.2. Pontos Fortes

1. **Interface intuitiva:** Design moderno, animado e fácil de usar
2. **Segurança robusta:** RLS em todas as tabelas, Edge Functions seguras
3. **Tecnologias modernas:** Stack atualizado e bem suportado
4. **Chatbot inovador:** Diferenciador com IA integrada
5. **Código organizado:** Estrutura clara e manutenível
6. **Experiência visual:** Animações profissionais
7. **Funcionalidades completas:** Edição de perfil, gestão de conta
8. **Autonomia do cliente:** Pode gerir perfil e eliminar conta

### 7.2.3. Pontos a Melhorar

1. **Testes automatizados:** Falta de testes unitários e E2E
2. **Documentação inline:** Poderia ter mais comentários
3. **Lembretes automáticos:** Funcionalidade não implementada
4. **PWA:** Não foi implementada versão offline

## 7.3. Avaliação do Produto

### 7.3.1. Cumprimento de Requisitos

- **Requisitos funcionais:** 95% cumpridos
- **Requisitos não funcionais:** 98% cumpridos
- **Objetivos gerais:** Totalmente alcançados
- **Objetivos específicos:** 95% alcançados

### 7.3.2. Qualidade do Software

| Critério | Avaliação |
|----------|-----------|
| Usabilidade | Excelente |
| Performance | Muito boa |
| Segurança | Excelente |
| Manutenibilidade | Muito boa |
| Escalabilidade | Muito boa |
| Estética | Excelente |

---

# 8. CONCLUSÕES E TRABALHOS FUTUROS

## 8.1. Conclusões Gerais

O desenvolvimento do projeto "Maslov Motors" permitiu atingir os objetivos propostos, resultando numa aplicação web funcional, completa e visualmente moderna para gestão de oficina automóvel.

### 8.1.1. Principais Contributos

1. **Solução prática:** Uma ferramenta utilizável no mundo real
2. **Aplicação de conhecimentos:** Consolidação de competências técnicas
3. **Inovação:** Integração de IA e animações modernas
4. **Qualidade:** Código bem estruturado e seguro
5. **Autonomia do utilizador:** Gestão completa do próprio perfil e conta

### 8.1.2. Aprendizagens

Durante o desenvolvimento deste projeto, foram adquiridas e consolidadas competências em:

- Desenvolvimento frontend com React e TypeScript
- Utilização de CSS frameworks (Tailwind) com animações
- Gestão de base de dados relacionais (PostgreSQL)
- Implementação de autenticação e segurança (RLS)
- Desenvolvimento de Edge Functions (Deno)
- Integração de serviços de IA
- Metodologias de desenvolvimento de software
- Documentação técnica e manual de utilizador
- Design de interfaces modernas

## 8.2. Dificuldades e Limitações

### 8.2.1. Dificuldades Encontradas

1. **Gestão de estado:** Complexidade na gestão de estado entre componentes
2. **Políticas RLS:** Configuração inicial das políticas de segurança
3. **Tipagem TypeScript:** Adaptação a tipagem estrita
4. **Design responsivo:** Adaptação a múltiplos dispositivos
5. **Edge Functions:** Compreensão do ambiente Deno
6. **Animações:** Balancear performance e efeitos visuais

### 8.2.2. Limitações do Sistema

1. **Sem modo offline:** Requer conexão à internet
2. **Sem notificações push:** Apenas notificações in-app
3. **Sem integração de pagamentos:** Funcionalidade não implementada
4. **Sem aplicação mobile nativa:** Apenas web responsivo
5. **Sem lembretes automáticos:** Por implementar

## 8.3. Melhorias Futuras

### 8.3.1. Funcionalidades Adicionais

1. **Sistema de lembretes automáticos**
   - Emails antes de revisões agendadas
   - Alertas de quilometragem
   - Notificações de serviço concluído

2. **Galeria de fotos dos serviços**
   - Upload de fotos antes/depois
   - Documentação visual do trabalho

3. **Integração de pagamentos**
   - Pagamentos online (Stripe)
   - Faturação automática

4. **Aplicação mobile (PWA)**
   - Instalação no dispositivo
   - Notificações push
   - Modo offline básico

5. **Chat em tempo real**
   - Comunicação direta cliente-oficina
   - Histórico de conversas

6. **Exportação de relatórios**
   - PDF dos relatórios financeiros
   - Exportação de dados

### 8.3.2. Melhorias Técnicas

1. **Testes automatizados**
   - Testes unitários com Vitest
   - Testes de integração
   - Testes end-to-end com Playwright

2. **Otimização de performance**
   - Code splitting avançado
   - Service Worker para cache
   - Lazy loading de imagens

3. **Monitorização**
   - Logging centralizado
   - Métricas de uso
   - Alertas de erros (Sentry)

4. **Internacionalização**
   - Suporte a múltiplos idiomas
   - Formatação de moeda/datas

---

# 9. REFERÊNCIAS BIBLIOGRÁFICAS

## Documentação Oficial

- React Documentation. (2024). React – A JavaScript library for building user interfaces. https://react.dev/

- TypeScript Documentation. (2024). TypeScript: JavaScript With Syntax For Types. https://www.typescriptlang.org/docs/

- Tailwind CSS Documentation. (2024). Tailwind CSS - Rapidly build modern websites without ever leaving your HTML. https://tailwindcss.com/docs

- Supabase Documentation. (2024). Supabase Docs. https://supabase.com/docs

- Vite Documentation. (2024). Vite | Next Generation Frontend Tooling. https://vitejs.dev/guide/

- Lovable Documentation. (2024). Lovable - Build software with AI. https://docs.lovable.dev/

## Bibliotecas Utilizadas

- React Router. (2024). React Router: Declarative Routing for React.js. https://reactrouter.com/

- TanStack Query. (2024). TanStack Query - Powerful asynchronous state management. https://tanstack.com/query/latest

- React Hook Form. (2024). React Hook Form - Simple React forms validation. https://react-hook-form.com/

- Zod. (2024). Zod | TypeScript-first schema validation. https://zod.dev/

- Shadcn/ui. (2024). shadcn/ui - Beautifully designed components. https://ui.shadcn.com/

- Lucide Icons. (2024). Lucide - Beautiful & consistent icon toolkit. https://lucide.dev/

- Recharts. (2024). Recharts - A composable charting library built on React components. https://recharts.org/

- Date-fns. (2024). date-fns - Modern JavaScript date utility library. https://date-fns.org/

- Radix UI. (2024). Radix UI - Unstyled, accessible components. https://www.radix-ui.com/

## Recursos de Aprendizagem

- MDN Web Docs. (2024). Mozilla Developer Network. https://developer.mozilla.org/

- freeCodeCamp. (2024). Learn to Code — For Free. https://www.freecodecamp.org/

- W3Schools. (2024). W3Schools Online Web Tutorials. https://www.w3schools.com/

## Artigos e Tutoriais

- Abramov, D. (2024). Thinking in React. React Documentation. https://react.dev/learn/thinking-in-react

- PostgreSQL Documentation. (2024). Row Security Policies. https://www.postgresql.org/docs/current/ddl-rowsecurity.html

- Deno Documentation. (2024). Deno Manual. https://deno.land/manual

---

# 10. ANEXOS

## Anexo A - Capturas de Ecrã

[Incluir capturas de ecrã das principais páginas da aplicação]

1. Landing Page com animações
2. Página de Login
3. Página de Registo (com telemóvel obrigatório)
4. Dashboard do Cliente
5. Dashboard do Administrador
6. Gestão de Carros
7. Gestão de Serviços
8. Pedidos de Orçamento
9. Relatórios
10. Chatbot
11. Edição de Perfil
12. Alteração de Palavra-passe
13. Confirmação de Eliminação de Conta

## Anexo B - Diagramas

[Incluir diagramas técnicos adicionais]

1. Diagrama de navegação
2. Diagrama de fluxo de autenticação
3. Diagrama de fluxo de criação de serviço
4. Diagrama de fluxo de edição de perfil
5. Diagrama de fluxo de eliminação de conta

## Anexo C - URL da Aplicação

A aplicação está disponível em:
- **Produção:** https://maslov-motors.lovable.app
- **Preview:** https://id-preview--9bf86d85-cec5-4b91-bd2f-747446aeedd5.lovable.app

## Anexo D - Manual do Utilizador

Ver documento separado: `docs/MANUAL_UTILIZADOR_MASLOV_MOTORS.md`

---

**FIM DO RELATÓRIO**

---

*Documento elaborado por Danilo Dmitrievich Maslov*
*Turma PGI23 - Ano Letivo 2025/2026*
*Profitecla - Escola Profissional*
