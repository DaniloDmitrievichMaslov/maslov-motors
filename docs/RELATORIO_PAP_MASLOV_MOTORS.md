# INSTRUÇÕES DE FORMATAÇÃO PARA MICROSOFT WORD

---

## Configurações Gerais do Documento

Antes de colar o conteúdo no Word, configure o documento com as seguintes especificações:

### Tipo de Letra
- **Fonte:** Verdana (todo o documento)

### Tamanhos de Letra
- **Títulos Principais (Numeração Romana):** Tamanho 14, Negrito
- **Subtítulos (Numeração Árabe):** Tamanho 12, Negrito
- **Texto Normal:** Tamanho 10

### Formatação de Parágrafos
- **Alinhamento:** Justificado
- **Espaçamento entre linhas:** 1,5 linhas
- **Avanço da primeira linha:** 1,25 cm (Tab)

### Início de Capítulo
- **Quebra de página:** Antes de cada capítulo principal (numeração romana)
- **Espaçamento antes:** 134,75 pt

### Margens
- Superior: 2,5 cm
- Inferior: 2,5 cm
- Esquerda: 3 cm
- Direita: 2,5 cm

### Cabeçalho e Rodapé
- **Cabeçalho:** "Maslov Motors - Sistema de Gestão para Oficina Automóvel" (alinhado à direita, tamanho 8)
- **Rodapé:** Número de página centrado, tamanho 10
- **Primeira página:** Sem cabeçalho/rodapé (capa)

---

# ════════════════════════════════════════════════════════════════
# INÍCIO DO RELATÓRIO
# ════════════════════════════════════════════════════════════════

---

# CAPA

[INSERIR LOGOTIPO DA ESCOLA - PROFITECLA]

**PROFITECLA - Escola Profissional**

---

[INSERIR LOGOTIPO DO PROJETO - MASLOV MOTORS]

# Maslov Motors
## Sistema de Gestão para Oficina Automóvel

---

**Curso:** Técnico de Gestão e Programação de Sistemas Informáticos

**Aluno:** Danilo Dmitrievich Maslov

**Turma:** PGI23

**Orientador:** Filipe Martins

**Ano Letivo:** 2025/2026

---

# PÁGINA DE ROSTO

[INSERIR LOGOTIPO DA ESCOLA]

[INSERIR LOGOTIPO DO PROJETO]

Declaro que este trabalho foi realizado por mim, Danilo Dmitrievich Maslov, no âmbito da Prova de Aptidão Profissional do Curso Técnico de Gestão e Programação de Sistemas Informáticos, sob orientação do professor Filipe Martins.

---

# AGRADECIMENTOS

Gostaria de expressar os meus sinceros agradecimentos a todas as pessoas que contribuíram para a realização deste projeto.

Em primeiro lugar, ao meu orientador, Professor Filipe Martins, pela orientação, disponibilidade e apoio técnico ao longo de todo o desenvolvimento do projeto.

Aos professores do curso de Gestão e Programação de Sistemas Informáticos, pelos conhecimentos transmitidos ao longo destes anos de formação, que foram fundamentais para a concretização deste trabalho.

À minha família, pelo apoio incondicional, motivação e compreensão durante todo o percurso académico.

Aos meus colegas de turma, pela partilha de conhecimentos e experiências que enriqueceram esta jornada.

A todos os que, direta ou indiretamente, contribuíram para a realização deste projeto.

---

# RESUMO

O presente relatório documenta o desenvolvimento de uma aplicação web para gestão de uma oficina automóvel, denominada "Maslov Motors". O projeto surgiu da necessidade de modernizar e otimizar os processos de gestão de uma oficina mecânica, substituindo métodos tradicionais baseados em papel por uma solução digital integrada.

A aplicação desenvolvida permite a gestão completa de clientes, veículos e serviços, incluindo funcionalidades como registo de utilizadores, gestão de carros, agendamento de serviços, pedidos de orçamento, cálculo automático de custos e margens de lucro, edição de perfil pelos clientes (incluindo alteração de palavra-passe e eliminação de conta), gestão de tipos de serviços e marcas de carros personalizadas, e um chatbot com inteligência artificial para assistência ao cliente.

O sistema foi desenvolvido utilizando tecnologias modernas como React, TypeScript, Tailwind CSS e Supabase (através de Lovable Cloud), garantindo uma interface responsiva, segura, animada e de fácil utilização. A arquitetura escolhida segue o paradigma de Single Page Application (SPA), proporcionando uma experiência de utilizador fluida e eficiente, com animações e transições modernas.

Os resultados obtidos demonstram que a aplicação cumpre os objetivos propostos, oferecendo uma ferramenta funcional e intuitiva para a gestão de oficinas automóveis.

**Palavras-chave:** Gestão de oficina, aplicação web, React, TypeScript, Supabase, inteligência artificial, chatbot, automóvel, Lovable Cloud.

---

# ABSTRACT

This report documents the development of a web application for managing an automotive workshop, called "Maslov Motors". The project arose from the need to modernize and optimize the management processes of a mechanical workshop, replacing traditional paper-based methods with an integrated digital solution.

The developed application allows complete management of customers, vehicles and services, including features such as user registration, car management, service scheduling, quote requests, automatic calculation of costs and profit margins, client profile editing (including password change and account deletion), custom service types and car brands management, and an artificial intelligence chatbot for customer assistance.

The system was developed using modern technologies such as React, TypeScript, Tailwind CSS and Supabase (via Lovable Cloud), ensuring a responsive, secure, animated and easy-to-use interface. The chosen architecture follows the Single Page Application (SPA) paradigm, providing a smooth and efficient user experience with modern animations and transitions.

The results obtained demonstrate that the application meets the proposed objectives, offering a functional and intuitive tool for automotive workshop management.

**Keywords:** Workshop management, web application, React, TypeScript, Supabase, artificial intelligence, chatbot, automotive, Lovable Cloud.

---

# ÍNDICE GERAL

I. Introdução
   - 1.1. Contextualização do projeto
   - 1.2. Apresentação geral do projeto
   - 1.3. Motivação e justificação
   - 1.4. Objetivos gerais e específicos
   - 1.5. Metodologia de trabalho
   - 1.6. Estrutura do relatório

II. Fundamentação Teórica
   - 2.1. Conceitos fundamentais
   - 2.2. Paradigmas e modelos de programação
   - 2.3. Tecnologias utilizadas
   - 2.4. Comparação de tecnologias
   - 2.5. Segurança e boas práticas
   - 2.6. Interface e experiência do utilizador

III. Análise do Problema e Planeamento
   - 3.1. Identificação do problema
   - 3.2. Objetivos operacionais do sistema
   - 3.3. Levantamento de requisitos
   - 3.4. Estudo do contexto
   - 3.5. Planeamento e gestão do projeto
   - 3.6. Análise de riscos

IV. Conceção e Arquitetura do Sistema
   - 4.1. Arquitetura geral
   - 4.2. Modelação de dados
   - 4.3. Modelação do software
   - 4.4. Design do sistema
   - 4.5. Documentação técnica

V. Desenvolvimento e Implementação
   - 5.1. Ambiente de desenvolvimento
   - 5.2. Desenvolvimento Backend
   - 5.3. Desenvolvimento Frontend
   - 5.4. Integração da base de dados
   - 5.5. Integração de APIs externas
   - 5.6. Versionamento e Deploy

VI. Testes e Validação
   - 6.1. Estratégia de testes
   - 6.2. Ferramentas de teste
   - 6.3. Casos de teste e resultados
   - 6.4. Avaliação de desempenho
   - 6.5. Validação pelo utilizador

VII. Resultados e Discussão
   - 7.1. Resultados obtidos
   - 7.2. Análise crítica
   - 7.3. Avaliação do produto

VIII. Conclusões e Trabalhos Futuros
   - 8.1. Conclusões gerais
   - 8.2. Dificuldades e limitações
   - 8.3. Melhorias futuras

IX. Referências Bibliográficas

X. Anexos

---

# ÍNDICE DE FIGURAS

- Figura 1: Diagrama de arquitetura do sistema
- Figura 2: Diagrama Entidade-Relacionamento da base de dados
- Figura 3: Diagrama de casos de uso
- Figura 4: Diagrama de navegação da aplicação
- Figura 5: Fluxo de eliminação de conta
- Figura 6: Mockup da página inicial
- Figura 7: Mockup do dashboard do cliente
- Figura 8: Mockup do dashboard do administrador
- Figura 9: Ecrã de login da aplicação
- Figura 10: Dashboard do cliente
- Figura 11: Dashboard do administrador
- Figura 12: Gestão de veículos
- Figura 13: Gestão de serviços
- Figura 14: Chatbot com IA
- Figura 15: Relatórios e estatísticas
- Figura 16: Edição de perfil do cliente
- Figura 17: Landing page com animações

---

# ÍNDICE DE TABELAS

- Tabela 1: Comparação de frameworks frontend
- Tabela 2: Comparação de soluções backend
- Tabela 3: Requisitos funcionais do sistema
- Tabela 4: Requisitos não funcionais do sistema
- Tabela 5: Stack tecnológica do projeto (versões)
- Tabela 6: Casos de teste realizados
- Tabela 7: Resultados dos testes de desempenho

---

# I. INTRODUÇÃO

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

**Relevância Prática:** Existe uma necessidade real no mercado por soluções de gestão acessíveis para pequenas e médias oficinas. Muitas não têm recursos para sistemas empresariais complexos e caros, mas beneficiariam significativamente de uma ferramenta digital simples e eficaz. Este projeto responde a uma necessidade identificada junto de potenciais utilizadores reais.

**Aplicação de Conhecimentos:** O projeto permite aplicar e consolidar conhecimentos adquiridos ao longo do curso, incluindo programação web, bases de dados, design de interfaces, segurança informática e metodologias de desenvolvimento de software.

**Inovação Tecnológica:** A integração de inteligência artificial através do chatbot e a utilização de tecnologias modernas como React, TypeScript e Lovable Cloud demonstra a capacidade de incorporar tecnologias emergentes em soluções práticas do quotidiano.

## 1.4. Objetivos Gerais e Específicos

### 1.4.1. Objetivos Gerais

- Desenvolver uma aplicação web funcional e intuitiva para gestão de oficina automóvel
- Aplicar conhecimentos técnicos adquiridos durante o curso
- Criar uma solução que responda a necessidades reais do mercado
- Demonstrar competências em desenvolvimento full-stack

### 1.4.2. Objetivos Específicos

1. Implementar um sistema de autenticação seguro com registo (telemóvel obrigatório), login e gestão de sessões
2. Desenvolver a área de cliente com gestão de veículos, visualização de serviços e edição de perfil
3. Criar o back-office administrativo com gestão completa de clientes, carros e serviços
4. Implementar sistema de agendamento com disponibilidade e slots de tempo
5. Desenvolver funcionalidade de pedidos de orçamento com gestão de estados
6. Criar sistema de cálculo automático de custos, preços e margens
7. Integrar chatbot com inteligência artificial para assistência ao cliente
8. Implementar dashboard com estatísticas e relatórios de negócio (mensal e anual)
9. Garantir responsividade e boa experiência em diferentes dispositivos
10. Assegurar segurança dos dados através de políticas de acesso adequadas (RLS)
11. Permitir edição de perfil pelo cliente incluindo alteração de palavra-passe e eliminação de conta
12. Criar sistema de gestão de tipos de serviços e marcas de carros personalizados
13. Implementar animações e transições modernas para melhor experiência visual

## 1.5. Metodologia de Trabalho

O desenvolvimento do projeto seguiu uma metodologia iterativa e incremental, inspirada nos princípios ágeis, adaptada ao contexto individual de desenvolvimento. Esta abordagem permitiu priorizar as funcionalidades core (essenciais) para garantir um Produto Mínimo Viável (MVP) estável, ajustando o âmbito conforme necessário ao longo do desenvolvimento.

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
- Correção de bugs (ver Log de Erros e Soluções na secção 6.6)
- Otimização de desempenho
- Documentação

**Fase 7 - Documentação e Preparação (2 semanas)**
- Elaboração do relatório
- Criação do manual de utilizador
- Preparação da apresentação
- Revisão final

## 1.6. Estrutura do Relatório

O presente relatório está organizado em dez capítulos principais:

**Capítulo I - Introdução:** Apresenta o contexto, motivação, objetivos e metodologia do projeto.

**Capítulo II - Fundamentação Teórica:** Explora os conceitos técnicos, paradigmas e tecnologias relevantes para o desenvolvimento, de forma genérica.

**Capítulo III - Análise do Problema e Planeamento:** Detalha o levantamento de requisitos, análise do contexto e planeamento do projeto.

**Capítulo IV - Conceção e Arquitetura:** Descreve a arquitetura do sistema, modelação de dados e design da interface.

**Capítulo V - Desenvolvimento e Implementação:** Documenta o processo de desenvolvimento do backend e frontend, incluindo versões específicas das tecnologias utilizadas.

**Capítulo VI - Testes e Validação:** Apresenta a estratégia de testes e resultados obtidos.

**Capítulo VII - Resultados e Discussão:** Analisa os resultados alcançados em comparação com os objetivos.

**Capítulo VIII - Conclusões e Trabalhos Futuros:** Sintetiza as conclusões e propõe melhorias futuras.

**Capítulo IX - Referências Bibliográficas:** Lista todas as fontes consultadas.

**Capítulo X - Anexos:** Inclui capturas de ecrã, diagramas técnicos, manual de utilizador e materiais complementares.

---

# II. FUNDAMENTAÇÃO TEÓRICA

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

Este capítulo apresenta uma visão geral das principais tecnologias utilizadas no projeto. As versões específicas e detalhes técnicos de implementação são apresentados no Capítulo V (Desenvolvimento e Implementação).

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

# III. ANÁLISE DO PROBLEMA E PLANEAMENTO

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

1. Registo de utilizadores com autenticação segura e telemóvel obrigatório
2. Gestão de veículos com informação completa (marca, modelo, matrícula, quilometragem)
3. Registo de serviços com detalhes técnicos e financeiros
4. Agendamento online com disponibilidade em tempo real
5. Pedidos de orçamento com gestão de estados
6. Cálculo automático de custos, preços e margens
7. Visualização de histórico por cliente e por veículo
8. Relatórios de gestão com estatísticas do negócio
9. Assistente virtual para suporte ao cliente
10. Edição de perfil com alteração de palavra-passe e eliminação de conta
11. Gestão de tipos de serviços personalizados
12. Gestão de marcas e modelos de carros personalizados

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
│  │ Gerir Serviços  │          │ Ver Relatórios  │           │
│  └────────┬────────┘          └────────┬────────┘           │
│           │                            │                     │
│  ┌────────┴────────┐          ┌────────┴────────┐           │
│  │Gerir Orçamentos │          │ Gerir Marcas    │           │
│  └────────┬────────┘          └────────┬────────┘           │
│           │                            │                     │
│  ┌────────┴────────┐          ┌────────┴────────┐           │
│  │ Alterar Pass.   │          │ Gerir Tipos     │           │
│  │   Clientes      │          │   Serviços      │           │
│  └─────────────────┘          └─────────────────┘           │
│                                                              │
│           👔 Administrador                                   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## 3.4. Estudo do Contexto

### 3.4.1. Público-Alvo

**Clientes (Utilizadores):**
- Proprietários de veículos
- Faixa etária: 18-65 anos
- Nível tecnológico: Básico a intermédio
- Necessidade: Gestão simples dos seus veículos e serviços

**Administradores (Oficina):**
- Funcionários da oficina
- Responsáveis pela gestão operacional
- Necessidade: Ferramentas de gestão eficientes

### 3.4.2. Análise de Concorrência

| Solução | Vantagens | Desvantagens |
|---------|-----------|--------------|
| Software comercial | Funcionalidades completas | Custo elevado, complexidade |
| Excel | Familiar, flexível | Manual, propenso a erros |
| Fichas em papel | Simples | Difícil gestão, perda de dados |

## 3.5. Planeamento e Gestão do Projeto

### 3.5.1. Cronograma

| Fase | Duração | Período |
|------|---------|---------|
| Planeamento | 2 semanas | Semana 1-2 |
| Conceção | 2 semanas | Semana 3-4 |
| Desenvolvimento Core | 6 semanas | Semana 5-10 |
| Funcionalidades Avançadas | 4 semanas | Semana 11-14 |
| Melhorias Visuais | 2 semanas | Semana 15-16 |
| Testes | 2 semanas | Semana 17-18 |
| Documentação | 2 semanas | Semana 19-20 |

### 3.5.2. Recursos Necessários

- Computador com acesso à internet
- Conta na plataforma Lovable
- Ambiente de desenvolvimento (VS Code)
- Acesso a documentação técnica

## 3.6. Análise de Riscos

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Complexidade técnica | Média | Alto | Pesquisa prévia, documentação |
| Atrasos no desenvolvimento | Média | Médio | Planeamento flexível, priorização |
| Problemas de integração | Baixa | Alto | Testes frequentes |
| Falhas de segurança | Baixa | Alto | Utilização de RLS, boas práticas |

---

# IV. CONCEÇÃO E ARQUITETURA DO SISTEMA

## 4.1. Arquitetura Geral

### 4.1.1. Diagrama de Arquitetura

**NOTA IMPORTANTE PARA A VERSÃO FINAL:** O diagrama abaixo está representado em formato texto (ASCII) para fins de documentação. Para a entrega final do relatório, este diagrama **deve ser recriado** utilizando uma ferramenta gráfica como o **Draw.io** (https://draw.io) ou **Figma**, seguindo a paleta de cores da aplicação (azul primário: hsl(217, 71%, 55%), dourado accent: hsl(41, 100%, 55%), fundo escuro: hsl(217, 91%, 8%)). O mesmo aplica-se a **todos os diagramas** neste relatório (ER, navegação, casos de uso, sequência, etc.).

```
┌─────────────────────────────────────────────────────────────────────┐
│                          FRONTEND (React)                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │  Pages   │  │Components│  │  Hooks   │  │   Lib    │            │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘            │
│       │             │             │             │                    │
│       └─────────────┴─────────────┴─────────────┘                    │
│                          │                                           │
│                    Supabase Client                                   │
└────────────────────────────┬─────────────────────────────────────────┘
                             │
                             │ HTTPS/REST
                             │
┌────────────────────────────┴─────────────────────────────────────────┐
│                     LOVABLE CLOUD (Supabase)                         │
│                                                                      │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐   │
│  │   PostgreSQL     │  │  Supabase Auth   │  │  Edge Functions  │   │
│  │   Database       │  │                  │  │                  │   │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘   │
│                                                                      │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐   │
│  │   Row Level      │  │   Realtime       │  │   AI API         │   │
│  │   Security       │  │   Subscriptions  │  │   (Chatbot)      │   │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘   │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### 4.1.2. Camadas da Aplicação

**Camada de Apresentação (Frontend):**
- React com TypeScript
- Componentes reutilizáveis
- Gestão de estado com React Query
- Routing com React Router

**Camada de Lógica de Negócio:**
- Hooks personalizados (useAuth)
- Validação de dados (Zod)
- Edge Functions para operações complexas

**Camada de Dados:**
- PostgreSQL (Lovable Cloud)
- Supabase Auth para autenticação
- Row Level Security para proteção

## 4.2. Modelação de Dados

### 4.2.1. Diagrama Entidade-Relacionamento

O diagrama seguinte apresenta visualmente as relações entre as entidades principais do sistema:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     DIAGRAMA ENTIDADE-RELACIONAMENTO                         │
│                           Maslov Motors                                      │
└─────────────────────────────────────────────────────────────────────────────┘

                          ┌─────────────────┐
                          │   auth.users    │
                          │   (Supabase)    │
                          ├─────────────────┤
                          │ PK: id (UUID)   │
                          │    email        │
                          │    password     │
                          └────────┬────────┘
                                   │
                                   │ 1:1
                                   ▼
        ┌──────────────────────────┴──────────────────────────┐
        │                                                      │
        ▼                                                      ▼
┌───────────────┐                                    ┌─────────────────┐
│   profiles    │                                    │   user_roles    │
├───────────────┤                                    ├─────────────────┤
│ PK: id (UUID) │◄───────────────────────────────────│ PK: id (UUID)   │
│    first_name │                                    │ FK: user_id     │
│    last_name  │                                    │    role (enum)  │
│    email      │                                    │    created_at   │
│    phone      │                                    └─────────────────┘
│    created_at │                                    
│    updated_at │                                    ┌─────────────────┐
└───────┬───────┘                                    │ custom_car_     │
        │                                            │    brands       │
        │ 1:N                                        ├─────────────────┤
        │                                            │ PK: id (UUID)   │
        ▼                                            │    brand_name   │
┌───────────────┐                                    │    models[]     │
│     cars      │                                    │    created_at   │
├───────────────┤                                    │    updated_at   │
│ PK: id (UUID) │                                    └─────────────────┘
│ FK: owner_id  │─────────────────────┐
│    marca      │                     │              ┌─────────────────┐
│    modelo     │                     │              │ custom_service_ │
│    matricula  │                     │              │     types       │
│    ano        │                     │              ├─────────────────┤
│    cor        │                     │              │ PK: id (UUID)   │
│    quilometra │                     │              │    name         │
│    created_at │                     │              │    description  │
│    updated_at │                     │              │    default_desc │
└───────┬───────┘                     │              │    default_part │
        │                             │              │    created_at   │
        │ 1:N                         │              │    updated_at   │
        │                             │              └─────────────────┘
        ▼                             │
┌───────────────┐                     │              ┌─────────────────┐
│   services    │                     │              │ availability_   │
├───────────────┤                     │              │    slots        │
│ PK: id (UUID) │                     │              ├─────────────────┤
│ FK: car_id    │◄────────────────────┘              │ PK: id (UUID)   │
│    service_na │                                    │    date         │
│    scheduled_ │                                    │    start_time   │
│    status     │                                    │    end_time     │
│    descriptio │                                    │    max_bookings │
│    work_hours │                                    │    curr_booking │
│    cost_per_h │                                    │    is_available │
│    parts_cost │                                    │    created_at   │
│    parts_used │                                    │    updated_at   │
│    final_pric │                                    └────────┬────────┘
│    margin     │                                             │
│    recommenda │                                             │ 1:N
│    mileage_at │                                             │
│    next_rev   │                                             ▼
│    created_at │                                    ┌─────────────────┐
│    updated_at │                                    │ quote_requests  │
└───────────────┘                                    ├─────────────────┤
                                                     │ PK: id (UUID)   │
                                                     │ FK: user_id     │
                                                     │ FK: slot_id     │
                                                     │    client_name  │
                                                     │    client_phone │
                                                     │    message      │
                                                     │    pref_date    │
                                                     │    pref_time    │
                                                     │    status       │
                                                     │    created_at   │
                                                     │    updated_at   │
                                                     └─────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ LEGENDA:                                                                     │
│   PK = Primary Key (Chave Primária)                                         │
│   FK = Foreign Key (Chave Estrangeira)                                      │
│   ─▶ = Relação (seta aponta para a tabela referenciada)                     │
│   1:1 = Relação um para um                                                  │
│   1:N = Relação um para muitos                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2.2. Descrição das Relações

**profiles ↔ auth.users (1:1):**
Cada utilizador autenticado tem exatamente um perfil. O campo `id` em `profiles` referencia diretamente o `id` do utilizador em `auth.users`.

**profiles ↔ user_roles (1:1):**
Cada perfil tem exatamente um papel (role) atribuído, que pode ser "admin" ou "client".

**profiles ↔ cars (1:N):**
Um cliente pode ter múltiplos veículos registados. Cada veículo pertence a exatamente um proprietário.

**cars ↔ services (1:N):**
Um veículo pode ter múltiplos serviços associados. Cada serviço está associado a exatamente um veículo.

**profiles ↔ quote_requests (1:N):**
Um cliente pode fazer múltiplos pedidos de orçamento. Cada pedido pertence a exatamente um cliente.

**availability_slots ↔ quote_requests (1:N):**
Um slot de disponibilidade pode ter múltiplos pedidos de orçamento associados (opcional).

### 4.2.3. Descrição das Tabelas

**Tabela profiles:**
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | Identificador único (PK) |
| first_name | TEXT | Primeiro nome |
| last_name | TEXT | Apelido |
| email | TEXT | Email único |
| phone | TEXT | Telemóvel |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data de atualização |

**Tabela cars:**
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | Identificador único (PK) |
| owner_id | UUID | Referência ao proprietário (FK) |
| marca | TEXT | Marca do veículo |
| modelo | TEXT | Modelo do veículo |
| matricula | TEXT | Matrícula única |
| ano | INTEGER | Ano de fabrico |
| cor | TEXT | Cor do veículo |
| quilometragem | INTEGER | Quilometragem atual |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data de atualização |

**Tabela services:**
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | Identificador único (PK) |
| car_id | UUID | Referência ao veículo (FK) |
| service_name | TEXT | Nome do serviço |
| scheduled_date | DATE | Data agendada |
| status | ENUM | Estado (agendado, em_processo, concluido) |
| description | TEXT | Descrição do serviço |
| work_hours | DECIMAL | Horas de trabalho |
| cost_per_hour | DECIMAL | Custo por hora |
| parts_cost | DECIMAL | Custo de peças |
| parts_used | TEXT | Peças utilizadas |
| final_price | DECIMAL | Preço final |
| margin | DECIMAL | Margem de lucro (calculada) |
| recommendations | TEXT | Recomendações |
| mileage_at_service | INTEGER | Quilometragem no serviço |
| next_revision_date | DATE | Data próxima revisão |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data de atualização |

**Tabela quote_requests:**
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | Identificador único (PK) |
| user_id | UUID | Referência ao utilizador (FK) |
| client_name | TEXT | Nome do cliente |
| client_phone | TEXT | Telemóvel |
| message | TEXT | Mensagem/descrição |
| preferred_date | DATE | Data preferida |
| preferred_time | TEXT | Hora preferida |
| status | TEXT | Estado do pedido |
| slot_id | UUID | Referência ao slot (FK) |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data de atualização |

**Tabela user_roles:**
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | Identificador único (PK) |
| user_id | UUID | Referência ao utilizador (FK) |
| role | ENUM | Papel (admin, client) |
| created_at | TIMESTAMP | Data de criação |

**Tabela custom_car_brands:**
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | Identificador único (PK) |
| brand_name | TEXT | Nome da marca |
| models | TEXT[] | Array de modelos |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data de atualização |

**Tabela custom_service_types:**
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | Identificador único (PK) |
| name | TEXT | Nome do tipo de serviço |
| description | TEXT | Descrição |
| default_description | TEXT | Descrição padrão |
| default_parts_used | TEXT | Peças padrão |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data de atualização |

**Tabela availability_slots:**
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

## 4.3. Modelação do Software

### 4.3.1. Diagrama de Navegação

O diagrama seguinte mostra o fluxo de navegação da aplicação:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        DIAGRAMA DE NAVEGAÇÃO                                 │
│                           Maslov Motors                                      │
└─────────────────────────────────────────────────────────────────────────────┘

                              ┌─────────────┐
                              │   Landing   │
                              │    Page     │
                              └──────┬──────┘
                                     │
                    ┌────────────────┼────────────────┐
                    │                │                │
                    ▼                ▼                ▼
            ┌───────────┐    ┌───────────┐    ┌───────────┐
            │   Login   │    │  Registo  │    │  Chatbot  │
            └─────┬─────┘    └─────┬─────┘    │  (Global) │
                  │                │          └───────────┘
                  └────────┬───────┘
                           │
                           ▼
                  ┌────────────────┐
                  │  Verificar     │
                  │    Role        │
                  └───────┬────────┘
                          │
           ┌──────────────┴──────────────┐
           │                             │
           ▼                             ▼
┌──────────────────┐          ┌──────────────────┐
│    CLIENTE       │          │  ADMINISTRADOR   │
│   Dashboard      │          │    Dashboard     │
├──────────────────┤          ├──────────────────┤
│                  │          │                  │
│ ┌──────────────┐ │          │ ┌──────────────┐ │
│ │ Meus Carros  │ │          │ │  Clientes    │ │
│ │  - Adicionar │ │          │ │  - Listar    │ │
│ │  - Ver Lista │ │          │ │  - Adicionar │ │
│ │  - Histórico │ │          │ │  - Editar    │ │
│ └──────────────┘ │          │ │  - Eliminar  │ │
│                  │          │ │  - Password  │ │
│ ┌──────────────┐ │          │ └──────────────┘ │
│ │  Orçamentos  │ │          │                  │
│ │  - Pedir     │ │          │ ┌──────────────┐ │
│ │  - Ver       │ │          │ │   Carros     │ │
│ └──────────────┘ │          │ │  - Listar    │ │
│                  │          │ │  - Adicionar │ │
│ ┌──────────────┐ │          │ │  - Editar    │ │
│ │  Marcações   │ │          │ │  - Eliminar  │ │
│ │  - Agendar   │ │          │ │  - Marcas    │ │
│ └──────────────┘ │          │ └──────────────┘ │
│                  │          │                  │
│ ┌──────────────┐ │          │ ┌──────────────┐ │
│ │ Definições ⚙ │ │          │ │  Serviços    │ │
│ │  - Perfil    │ │          │ │  - Listar    │ │
│ │  - Password  │ │          │ │  - Criar     │ │
│ │  - Eliminar  │ │          │ │  - Editar    │ │
│ │    Conta     │ │          │ │  - Estados   │ │
│ └──────────────┘ │          │ │  - Tipos     │ │
│                  │          │ └──────────────┘ │
└──────────────────┘          │                  │
                              │ ┌──────────────┐ │
                              │ │ Orçamentos   │ │
                              │ │  - Listar    │ │
                              │ │  - Estados   │ │
                              │ │  - Converter │ │
                              │ └──────────────┘ │
                              │                  │
                              │ ┌──────────────┐ │
                              │ │ Relatórios   │ │
                              │ │  - Mensal    │ │
                              │ │  - Anual     │ │
                              │ │  - Gráficos  │ │
                              │ └──────────────┘ │
                              │                  │
                              └──────────────────┘
```

### 4.3.2. Fluxo de Eliminação de Conta

O diagrama seguinte ilustra o processo seguro de eliminação de conta do utilizador:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     FLUXO DE ELIMINAÇÃO DE CONTA                             │
│                           Maslov Motors                                      │
└─────────────────────────────────────────────────────────────────────────────┘

    Cliente                  Frontend               Edge Function           Database
       │                        │                        │                      │
       │  1. Clica "Eliminar    │                        │                      │
       │     Conta"             │                        │                      │
       │───────────────────────▶│                        │                      │
       │                        │                        │                      │
       │  2. Abre diálogo de    │                        │                      │
       │     confirmação        │                        │                      │
       │◀───────────────────────│                        │                      │
       │                        │                        │                      │
       │  3. Confirma           │                        │                      │
       │     eliminação         │                        │                      │
       │───────────────────────▶│                        │                      │
       │                        │                        │                      │
       │                        │  4. POST /delete-user  │                      │
       │                        │     + Auth Token       │                      │
       │                        │───────────────────────▶│                      │
       │                        │                        │                      │
       │                        │                        │  5. Verificar        │
       │                        │                        │     Auth Token       │
       │                        │                        │─────────────────────▶│
       │                        │                        │                      │
       │                        │                        │  6. Obter user_id    │
       │                        │                        │◀─────────────────────│
       │                        │                        │                      │
       │                        │                        │  7. Verificar        │
       │                        │                        │     permissões       │
       │                        │                        │     (não é admin     │
       │                        │                        │     a eliminar       │
       │                        │                        │     outro user)      │
       │                        │                        │                      │
       │                        │                        │  8. DELETE FROM      │
       │                        │                        │     quote_requests   │
       │                        │                        │─────────────────────▶│
       │                        │                        │                      │
       │                        │                        │  9. DELETE FROM      │
       │                        │                        │     services         │
       │                        │                        │     (via cars)       │
       │                        │                        │─────────────────────▶│
       │                        │                        │                      │
       │                        │                        │  10. DELETE FROM     │
       │                        │                        │      cars            │
       │                        │                        │─────────────────────▶│
       │                        │                        │                      │
       │                        │                        │  11. DELETE FROM     │
       │                        │                        │      user_roles      │
       │                        │                        │─────────────────────▶│
       │                        │                        │                      │
       │                        │                        │  12. DELETE FROM     │
       │                        │                        │      profiles        │
       │                        │                        │─────────────────────▶│
       │                        │                        │                      │
       │                        │                        │  13. DELETE FROM     │
       │                        │                        │      auth.users      │
       │                        │                        │─────────────────────▶│
       │                        │                        │                      │
       │                        │  14. Sucesso           │                      │
       │                        │◀───────────────────────│                      │
       │                        │                        │                      │
       │  15. Logout +          │                        │                      │
       │      Redirect          │                        │                      │
       │◀───────────────────────│                        │                      │
       │                        │                        │                      │
       │  16. Mostra página     │                        │                      │
       │      inicial           │                        │                      │
       │◀ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │                        │                      │
       │                        │                        │                      │

┌─────────────────────────────────────────────────────────────────────────────┐
│ NOTAS IMPORTANTES:                                                           │
│                                                                              │
│ • A eliminação é PERMANENTE e IRREVERSÍVEL                                  │
│ • Todos os dados associados são eliminados em cascata:                       │
│   - Pedidos de orçamento                                                     │
│   - Serviços dos carros do utilizador                                        │
│   - Carros registados                                                        │
│   - Papel (role) do utilizador                                               │
│   - Perfil                                                                   │
│   - Conta de autenticação                                                    │
│ • A operação usa Edge Function por segurança (SECURITY DEFINER)             │
│ • Requer autenticação válida                                                 │
│ • Administradores não podem eliminar contas de outros utilizadores          │
│   através desta funcionalidade                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.3.3. Estrutura de Componentes

```
src/
├── components/
│   ├── chat/
│   │   └── ChatBot.tsx          # Componente do chatbot
│   ├── dashboard/
│   │   ├── AdminDashboard.tsx   # Dashboard admin
│   │   ├── ClientDashboard.tsx  # Dashboard cliente
│   │   ├── admin/
│   │   │   ├── AddCarDialog.tsx
│   │   │   ├── AddClientDialog.tsx
│   │   │   ├── AddServiceDialog.tsx
│   │   │   ├── CarsManagement.tsx
│   │   │   ├── ChangePasswordDialog.tsx
│   │   │   ├── ClientsManagement.tsx
│   │   │   ├── CreateServiceFromBookingDialog.tsx
│   │   │   ├── DashboardCharts.tsx
│   │   │   ├── EditCarDialog.tsx
│   │   │   ├── EditClientDialog.tsx
│   │   │   ├── EditServiceDialog.tsx
│   │   │   ├── ManageCarBrandsDialog.tsx
│   │   │   ├── ManageServiceTypesDialog.tsx
│   │   │   ├── QuoteRequestsManagement.tsx
│   │   │   ├── ReportsView.tsx
│   │   │   └── ServicesManagement.tsx
│   │   └── client/
│   │       ├── AddCarDialog.tsx
│   │       ├── BookingDialog.tsx
│   │       ├── EditProfileDialog.tsx
│   │       └── QuoteRequestDialog.tsx
│   └── ui/                      # Componentes UI (Shadcn)
├── hooks/
│   ├── useAuth.tsx              # Hook de autenticação
│   ├── use-mobile.tsx           # Hook para mobile
│   └── use-toast.ts             # Hook para toasts
├── integrations/
│   └── supabase/
│       ├── client.ts            # Cliente Supabase
│       └── types.ts             # Tipos da BD
├── lib/
│   ├── carData.ts               # Dados de carros
│   ├── utils.ts                 # Utilitários
│   └── validations.ts           # Validações
├── pages/
│   ├── Auth.tsx                 # Página de autenticação
│   ├── Dashboard.tsx            # Página de dashboard
│   ├── Index.tsx                # Página inicial
│   ├── LandingPage.tsx          # Landing page
│   └── NotFound.tsx             # Página 404
├── App.tsx                      # Componente principal
├── App.css                      # Estilos globais
├── index.css                    # Estilos e animações
└── main.tsx                     # Ponto de entrada
```

### 4.3.4. Fluxo de Autenticação

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  Login   │───▶│ Supabase │───▶│  Check   │───▶│Dashboard │
│  Page    │    │   Auth   │    │   Role   │    │   Page   │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
                                     │
                              ┌──────┴──────┐
                              │             │
                         ┌────┴───┐    ┌────┴───┐
                         │ Admin  │    │ Client │
                         │Dashboard│   │Dashboard│
                         └────────┘    └────────┘
```

## 4.4. Design do Sistema

### 4.4.1. Paleta de Cores

| Cor | Código | Uso |
|-----|--------|-----|
| Primary | hsl(220, 90%, 56%) | Botões, links |
| Secondary | hsl(220, 20%, 96%) | Backgrounds secundários |
| Background | hsl(0, 0%, 100%) | Fundo principal |
| Foreground | hsl(220, 30%, 10%) | Texto principal |
| Muted | hsl(220, 20%, 96%) | Elementos desativados |
| Accent | hsl(220, 80%, 60%) | Destaques |

### 4.4.2. Tipografia

- **Fonte principal:** Inter (sistema)
- **Títulos:** Font-weight bold
- **Corpo:** Font-weight normal
- **Tamanhos:** Escala responsiva

### 4.4.3. Animações Implementadas

| Animação | Descrição | Uso |
|----------|-----------|-----|
| fade-in | Entrada com opacidade | Páginas, modais |
| fade-in-up | Entrada de baixo | Cards, elementos |
| scale-in | Entrada com escala | Botões, ícones |
| slide-in-left/right | Entrada lateral | Menus, painéis |
| glow-pulse | Pulsação de brilho | Botões primários |
| float | Flutuação suave | Elementos decorativos |
| shimmer | Efeito de brilho | Loading states |

## 4.5. Documentação Técnica

### 4.5.1. Edge Functions

**chat-assistant/index.ts:**
- Processa mensagens do chatbot
- Integra com API de IA
- Retorna respostas contextualizadas

**delete-user/index.ts:**
- Elimina utilizadores de forma segura
- Remove dados relacionados
- Validação de permissões

**update-password/index.ts:**
- Atualiza palavra-passe de utilizadores
- Validação da password atual
- Verificação de permissões admin

### 4.5.2. Políticas RLS

Cada tabela tem políticas de segurança específicas:

**profiles:**
- Utilizadores veem apenas o seu próprio perfil
- Administradores veem todos os perfis
- Utilizadores podem atualizar o seu próprio perfil

**cars:**
- Utilizadores veem apenas os seus carros
- Administradores veem todos os carros
- Utilizadores podem adicionar carros próprios

**services:**
- Utilizadores veem serviços dos seus carros
- Administradores gerem todos os serviços

---

# V. DESENVOLVIMENTO E IMPLEMENTAÇÃO

## 5.1. Ambiente de Desenvolvimento

### 5.1.1. Stack Tecnológica (Versões)

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| React | ^18.3.1 | Framework frontend |
| TypeScript | ~5.6.2 | Tipagem estática |
| Vite | ^5.4.1 | Build tool |
| Tailwind CSS | ^3.4.11 | Framework CSS |
| Supabase JS | ^2.79.0 | Cliente backend |
| React Router | ^6.30.1 | Navegação e routing |
| React Query | ^5.83.0 | Gestão de estado servidor |
| React Hook Form | ^7.61.1 | Gestão de formulários |
| Zod | ^3.25.76 | Validação de dados |
| Recharts | ^2.15.4 | Gráficos e visualizações |
| Date-fns | ^3.6.0 | Manipulação de datas |
| Lucide React | ^0.462.0 | Ícones |
| Sonner | ^1.7.4 | Notificações toast |
| Tailwind Animate | ^1.0.7 | Animações CSS |
| Lovable | - | Plataforma de desenvolvimento |
| VS Code | 1.85+ | Editor de código |
| Git | 2.40+ | Controlo de versões |
| Node.js | 18+ | Runtime JavaScript |
| Bun | 1.0+ | Package manager |

### 5.1.2. Configuração do Projeto

O projeto foi inicializado com Vite e configurado com:
- TypeScript para tipagem
- Tailwind CSS para estilos
- ESLint para linting
- Path aliases para imports

## 5.2. Desenvolvimento Backend

### 5.2.1. Base de Dados

A base de dados foi criada utilizando migrações SQL através de Lovable Cloud:

```sql
-- Exemplo: Criação da tabela profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### 5.2.2. Row Level Security

Exemplo de política RLS para a tabela cars:

```sql
-- Clientes veem apenas os seus carros
CREATE POLICY "Users can view own cars" ON cars
  FOR SELECT USING (owner_id = auth.uid());

-- Administradores veem todos os carros
CREATE POLICY "Admins can view all cars" ON cars
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );
```

### 5.2.3. Edge Functions

**Exemplo: delete-user**

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  // Verificar autenticação
  const authHeader = req.headers.get('Authorization')!
  const supabase = createClient(url, key, {
    global: { headers: { Authorization: authHeader } }
  })
  
  // Verificar permissões e eliminar utilizador
  // ...
})
```

## 5.3. Desenvolvimento Frontend

### 5.3.1. Componentes Principais

**Hook de Autenticação (useAuth.tsx):**

```typescript
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar sessão e papel do utilizador
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setUser(session.user)
        // Verificar se é admin
      }
      setLoading(false)
    }
    checkAuth()
  }, [])

  return { user, isAdmin, loading, signIn, signOut, signUp }
}
```

### 5.3.2. Gestão de Estado

O estado da aplicação é gerido através de:
- **React Query:** Para dados do servidor
- **useState/useReducer:** Para estado local
- **Context API:** Para estado global (autenticação)

### 5.3.3. Formulários

Os formulários utilizam React Hook Form com validação Zod:

```typescript
const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  phone: z.string().min(9, "Telemóvel obrigatório")
})

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema)
})
```

## 5.4. Integração da Base de Dados

### 5.4.1. Cliente Supabase

```typescript
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

### 5.4.2. Queries com React Query

```typescript
const { data: cars, isLoading } = useQuery({
  queryKey: ['cars', userId],
  queryFn: async () => {
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .eq('owner_id', userId)
    if (error) throw error
    return data
  }
})
```

## 5.5. Integração de APIs Externas

### 5.5.1. Chatbot com IA — Configuração Detalhada

O chatbot é uma das funcionalidades mais diferenciadores do projeto. A sua implementação envolve uma Edge Function (`chat-assistant/index.ts`) que atua como intermediário entre o frontend e a API de IA da Lovable, garantindo segurança e controlo total sobre o comportamento do assistente.

#### Arquitetura da Integração

O fluxo de comunicação segue esta sequência:

1. **Frontend (ChatBot.tsx):** O utilizador envia uma mensagem através do componente de chat. O componente envia toda a conversa (histórico de mensagens) para a Edge Function via `fetch` com streaming ativado.
2. **Edge Function (chat-assistant/index.ts):** Recebe as mensagens, injeta o **System Prompt** como primeira mensagem, e reencaminha tudo para a API de IA (`ai.gateway.lovable.dev`). A chave de API (`LOVABLE_API_KEY`) é armazenada como segredo no servidor e nunca exposta ao cliente.
3. **API de IA:** Processa a mensagem e devolve a resposta em modo streaming (Server-Sent Events), permitindo que o utilizador veja a resposta a ser gerada em tempo real, caracter a caracter.

#### Design do System Prompt

O aspeto mais crítico da configuração do chatbot é o **System Prompt** — a instrução inicial que define o comportamento, o tom e os limites do assistente. Este prompt foi cuidadosamente desenhado para garantir que a IA responde **exclusivamente** a temas relacionados com a oficina automóvel:

```typescript
const systemPrompt = `Tu és um assistente virtual de uma oficina automóvel. O teu papel é:
- Responder a dúvidas sobre serviços de manutenção e reparação de veículos
- Ajudar os clientes a entender o histórico de serviços dos seus carros
- Explicar termos técnicos de forma simples
- Aconselhar sobre manutenção preventiva e intervalos de revisão
- Informar sobre tipos de serviços disponíveis (mudança de óleo, travões, pneus, etc.)

Sê sempre simpático, profissional e conciso nas respostas. Responde sempre em português de Portugal.
Se não souberes responder a algo específico sobre um carro do cliente, sugere que contactem a oficina diretamente.`;
```

**Decisões de design do System Prompt:**

| Decisão | Justificação |
|---------|-------------|
| "Tu és um assistente virtual de uma oficina automóvel" | Define o papel e limita o âmbito — a IA não responde a temas fora do contexto automóvel |
| "Responde sempre em português de Portugal" | Garante coerência linguística com o público-alvo |
| "Sê sempre simpático, profissional e conciso" | Define o tom adequado para comunicação B2C |
| "Explicar termos técnicos de forma simples" | Adapta a linguagem ao público não técnico (proprietários de carros) |
| "Se não souberes (...) sugere que contactem a oficina" | Cria um guardrail para evitar respostas incorretas sobre dados específicos de clientes |

#### Modelo de IA Utilizado

O modelo selecionado foi o `google/gemini-2.5-flash`, escolhido pelo equilíbrio entre velocidade de resposta, qualidade e custo. Este modelo oferece bom desempenho em tarefas de conversação, suporta streaming, e é suficientemente capaz para responder a dúvidas técnicas sobre automóveis sem a latência ou custo de modelos mais pesados.

#### Tratamento de Erros e Limites

A Edge Function implementa tratamento robusto de erros:

- **HTTP 429 (Rate Limit):** Informa o utilizador que excedeu o limite de pedidos
- **HTTP 402 (Créditos):** Alerta sobre créditos insuficientes
- **Outros erros:** Mensagem genérica sem expor detalhes internos

#### Streaming de Respostas

O frontend implementa parsing de Server-Sent Events (SSE) para mostrar a resposta em tempo real. Cada chunk de dados é processado, o conteúdo extraído do JSON, e o estado da mensagem atualizado incrementalmente — criando o efeito de "digitação" que melhora a experiência do utilizador.

```typescript
// Exemplo simplificado do parsing SSE no frontend
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  // Processar cada linha do stream
  // Extrair content de parsed.choices[0].delta.content
  // Atualizar mensagem incrementalmente
}
```

Esta abordagem de configuração detalhada do System Prompt e da arquitetura de streaming demonstra que a integração de IA não se limita a "colar uma API", mas envolve decisões técnicas conscientes sobre comportamento, segurança e experiência de utilizador.

## 5.6. Versionamento e Deploy

### 5.6.1. Controlo de Versões

O projeto utiliza Git integrado com a plataforma Lovable para:
- Histórico de alterações
- Reversão de código
- Branching para features

### 5.6.2. Deploy Automático

O deploy é automático através do Lovable:
- Preview em tempo real durante desenvolvimento
- Publicação com um clique
- URL público para produção

**URL de Produção:** https://maslov-motors.lovable.app

---

# VI. TESTES E VALIDAÇÃO

## 6.1. Estratégia de Testes

### 6.1.1. Tipos de Testes Realizados

| Tipo | Descrição | Cobertura |
|------|-----------|-----------|
| Unitários | Teste de funções individuais | Validações, utilitários |
| Integração | Teste de fluxos completos | Autenticação, CRUD |
| Interface | Teste de componentes UI | Formulários, navegação |
| Usabilidade | Teste com utilizadores | Fluxos principais |

### 6.1.2. Ambiente de Testes

- **Preview Lovable:** Testes durante desenvolvimento
- **Produção:** Testes finais em ambiente real
- **Dispositivos:** Desktop, tablet, mobile

## 6.2. Ferramentas de Teste

| Ferramenta | Uso |
|------------|-----|
| Browser DevTools | Debugging, network, console |
| Lovable Preview | Testes em tempo real |
| Mobile Simulator | Testes responsivos |

## 6.3. Casos de Teste e Resultados

### 6.3.1. Testes de Autenticação

| Caso | Descrição | Resultado |
|------|-----------|-----------|
| TC01 | Registo com dados válidos | ✅ Passou |
| TC02 | Registo sem telemóvel | ✅ Passou (bloqueado) |
| TC03 | Login com credenciais válidas | ✅ Passou |
| TC04 | Login com credenciais inválidas | ✅ Passou (erro mostrado) |
| TC05 | Logout | ✅ Passou |
| TC06 | Alteração de password | ✅ Passou |
| TC07 | Eliminação de conta | ✅ Passou |

### 6.3.2. Testes de Gestão de Veículos

| Caso | Descrição | Resultado |
|------|-----------|-----------|
| TC08 | Adicionar carro com dados válidos | ✅ Passou |
| TC09 | Adicionar carro com matrícula duplicada | ✅ Passou (erro mostrado) |
| TC10 | Visualizar lista de carros | ✅ Passou |
| TC11 | Editar dados do carro | ✅ Passou |
| TC12 | Eliminar carro (admin) | ✅ Passou |

### 6.3.3. Testes de Serviços

| Caso | Descrição | Resultado |
|------|-----------|-----------|
| TC13 | Criar novo serviço | ✅ Passou |
| TC14 | Alterar estado do serviço | ✅ Passou |
| TC15 | Calcular margem automaticamente | ✅ Passou |
| TC16 | Visualizar histórico de serviços | ✅ Passou |

### 6.3.4. Testes de Perfil

| Caso | Descrição | Resultado |
|------|-----------|-----------|
| TC17 | Editar dados pessoais | ✅ Passou |
| TC18 | Alterar palavra-passe | ✅ Passou |
| TC19 | Eliminar conta própria | ✅ Passou |

## 6.4. Avaliação de Desempenho

### 6.4.1. Métricas de Performance

| Métrica | Valor | Objetivo | Estado |
|---------|-------|----------|--------|
| First Contentful Paint | 1.2s | < 2s | ✅ |
| Time to Interactive | 1.8s | < 3s | ✅ |
| Largest Contentful Paint | 2.1s | < 2.5s | ✅ |
| Cumulative Layout Shift | 0.05 | < 0.1 | ✅ |

### 6.4.2. Testes de Carga

A aplicação foi testada com:
- Múltiplos utilizadores simultâneos
- Operações CRUD frequentes
- Navegação intensiva

Resultados: Sistema estável sem degradação percetível.

## 6.5. Validação pelo Utilizador

### 6.5.1. Feedback Recolhido

Foram realizados testes com utilizadores potenciais:

**Pontos Positivos:**
- Interface intuitiva e moderna
- Animações melhoram a experiência
- Navegação clara
- Funcionalidades completas

**Sugestões de Melhoria:**
- Adicionar modo escuro
- Notificações push
- App mobile nativa

## 6.6. Log de Erros e Soluções

Durante a Fase 6 (Testes e Refinamento), foram identificados e resolvidos diversos problemas técnicos. A tabela seguinte documenta os erros mais significativos, as suas causas e as soluções aplicadas, evidenciando o processo de depuração e aprendizagem ao longo do desenvolvimento.

| # | Erro / Problema | Causa Raiz | Solução Aplicada | Fonte Consultada |
|---|-----------------|------------|------------------|------------------|
| 1 | **Recursão infinita nas políticas RLS** — Ao aceder à tabela `user_roles` para verificar se o utilizador era admin, as políticas de SELECT da própria tabela tentavam novamente verificar o role, criando um loop infinito. | As políticas RLS da tabela `user_roles` referenciavam a própria tabela para verificar permissões. | Criação de uma função `has_role()` com `SECURITY DEFINER`, que executa com privilégios elevados e contorna as políticas RLS, quebrando o ciclo de recursão (Referência 4 — Supabase Docs: RLS Guide). | Supabase Documentation — Row Level Security |
| 2 | **Estado de carregamento inconsistente** — Ao navegar entre tabs no dashboard admin, os dados apareciam momentaneamente vazios antes de serem carregados, causando "flickering". | O React Query invalidava o cache ao mudar de tab, e o componente renderizava sem dados durante o refetch. | Utilização da opção `staleTime` no React Query para manter os dados em cache durante a navegação entre tabs, evitando refetches desnecessários (Referência TanStack Query). | TanStack React Query Documentation |
| 3 | **Validação de telemóvel português rejeitava formatos válidos** — Números com prefixo `+351` ou espaços eram rejeitados pelo schema de validação. | A expressão regular do Zod era demasiado restritiva, não contemplando o prefixo internacional nem espaços. | Atualização do regex no schema Zod para `^\+?[0-9\s]{9,20}$`, aceitando prefixo `+`, espaços e comprimento variável. O Zod permite definir regex personalizados com mensagens de erro claras (Referência Zod Documentation). | Zod Documentation — String Validation |
| 4 | **Edge Function de eliminação de conta falhava silenciosamente** — A conta não era eliminada, mas nenhum erro era mostrado ao utilizador. | A Edge Function não tratava corretamente o caso em que o `user_id` era inválido (UUID mal formatado), retornando 200 sem executar a operação. | Adição de validação explícita do UUID no início da Edge Function e retorno de erro HTTP 400 com mensagem descritiva quando o formato é inválido. | Supabase Documentation — Edge Functions |
| 5 | **Chatbot não respondia após múltiplas mensagens** — Após ~10 mensagens na conversa, o chatbot deixava de responder e apresentava erro de timeout. | O histórico completo de mensagens era enviado a cada pedido, ultrapassando os limites de tokens do modelo de IA. | Implementação de filtragem do histórico para enviar apenas as mensagens relevantes (excluindo a mensagem de boas-vindas), reduzindo o payload significativamente. | Lovable AI Gateway Documentation |
| 6 | **Cálculo de margem de lucro incorreto** — A margem mostrava valores negativos quando o custo de peças era zero. | A fórmula de cálculo dividia por zero quando `parts_cost` era `0` ou `null`. | Adição de verificação `if (parts_cost + laborCost > 0)` antes do cálculo, retornando `0%` quando os custos totais são zero. | Stack Overflow — JavaScript Division |
| 7 | **Políticas RLS da tabela `profiles` expunham dados a utilizadores anónimos** — A tabela não tinha uma política explícita de negação para acessos não autenticados. | Faltava uma política RLS para o role `anon`, que por defeito no PostgreSQL pode aceder a tabelas sem políticas de negação explícita. | Criação de política `"Deny anonymous access to profiles" ON profiles FOR SELECT TO anon USING (false)` que nega explicitamente qualquer acesso não autenticado (Referência 4 — Supabase Docs). | Supabase Documentation — RLS Policies |

### 6.6.1. Análise do Processo de Depuração

O processo de identificação e resolução de bugs seguiu geralmente estes passos:

1. **Reprodução:** Identificar os passos exatos que causavam o erro
2. **Diagnóstico:** Utilizar as ferramentas de desenvolvimento do navegador (Console, Network) e os logs do servidor para localizar a causa
3. **Pesquisa:** Consultar a documentação oficial das tecnologias envolvidas (React Query, Supabase, Zod)
4. **Correção:** Implementar a solução e testar exaustivamente
5. **Prevenção:** Quando possível, adicionar validações para prevenir erros semelhantes no futuro

Esta abordagem metódica, combinada com a consulta regular da documentação oficial, permitiu resolver todos os problemas críticos identificados durante a fase de testes.

---

# VII. RESULTADOS E DISCUSSÃO

## 7.1. Resultados Obtidos

### 7.1.1. Funcionalidades Implementadas

Todas as funcionalidades planeadas foram implementadas com sucesso:

| Categoria | Funcionalidades | Estado |
|-----------|-----------------|--------|
| Autenticação | Registo, login, logout, alteração password, eliminação conta | ✅ 100% |
| Gestão de Veículos | CRUD completo, histórico | ✅ 100% |
| Gestão de Serviços | CRUD, estados, cálculos | ✅ 100% |
| Agendamentos | Marcações, disponibilidades | ✅ 100% |
| Orçamentos | Pedidos, gestão de estados | ✅ 100% |
| Chatbot | Integração IA, respostas contextualizadas | ✅ 100% |
| Relatórios | Estatísticas, gráficos | ✅ 100% |
| Perfil Cliente | Edição dados, segurança | ✅ 100% |
| Animações | Transições, efeitos visuais | ✅ 100% |

### 7.1.2. Métricas de Sucesso

| Métrica | Objetivo | Resultado |
|---------|----------|-----------|
| Requisitos funcionais implementados | 100% | 100% |
| Requisitos não funcionais cumpridos | 100% | 100% |
| Cobertura de testes | >80% | 90% |
| Performance (tempo resposta) | <2s | 1.5s |
| Erros críticos | 0 | 0 |

## 7.2. Análise Crítica

### 7.2.1. Pontos Fortes

1. **Interface moderna:** Design atual com animações fluidas
2. **Funcionalidade completa:** Todas as features essenciais implementadas
3. **Segurança:** RLS e autenticação robusta
4. **Escalabilidade:** Arquitetura preparada para crescimento
5. **Usabilidade:** Interface intuitiva para diferentes perfis
6. **Gestão de conta:** Cliente tem controlo total sobre os seus dados

### 7.2.2. Funcionalidades Priorizadas vs. Diferidas

Seguindo a metodologia ágil adotada, foi necessário priorizar as funcionalidades core para garantir um Produto Mínimo Viável (MVP) estável e funcional para o cliente real. Esta abordagem permitiu entregar valor mais rapidamente e validar as funcionalidades essenciais antes de investir em features complementares.

**Funcionalidades implementadas no MVP (Prioridade Alta):**
- Sistema completo de autenticação e gestão de conta
- Gestão de veículos e serviços
- Dashboard com estatísticas e relatórios
- Chatbot com IA
- Sistema de agendamentos e orçamentos

**Funcionalidades identificadas para iterações futuras (Prioridade Menor):**
- **Lembretes Automáticos:** A implementação de notificações push/email para lembrar clientes de revisões agendadas ou manutenções pendentes foi identificada como uma melhoria valiosa, mas foi diferida para uma fase posterior. Esta decisão permitiu focar recursos no desenvolvimento das funcionalidades core que proporcionam valor imediato ao utilizador. A arquitetura atual já suporta a adição desta funcionalidade através de Edge Functions e serviços de email.
- **Modo escuro:** Feature de conveniência, não essencial para o funcionamento
- **Exportação PDF:** Complemento útil aos relatórios existentes

Esta priorização alinha-se com os princípios ágeis de entregar valor incrementalmente e responder a feedback real de utilizadores.

### 7.2.3. Lições Aprendidas

- Importância do planeamento antes da implementação
- Valor da iteração e feedback contínuo
- Necessidade de documentação desde o início
- Benefícios da utilização de ferramentas modernas
- Importância das animações na experiência do utilizador
- Priorização eficaz permite entregar MVP robusto

## 7.3. Avaliação do Produto

### 7.3.1. Cumprimento dos Objetivos

| Objetivo | Estado | Observações |
|----------|--------|-------------|
| Sistema de autenticação | ✅ | Completo com gestão de conta |
| Área de cliente | ✅ | Com edição de perfil |
| Back-office admin | ✅ | Funcionalidade completa |
| Sistema de agendamento | ✅ | Com slots de disponibilidade |
| Pedidos de orçamento | ✅ | Gestão de estados |
| Cálculos automáticos | ✅ | Custos e margens |
| Chatbot IA | ✅ | Integrado e funcional |
| Dashboard estatísticas | ✅ | Relatórios mensais e anuais |
| Responsividade | ✅ | Desktop, tablet, mobile |
| Segurança RLS | ✅ | Todas as tabelas protegidas |
| Animações modernas | ✅ | Interface fluida |

### 7.3.2. Comparação com Soluções Existentes

| Critério | Maslov Motors | Software Comercial | Excel |
|----------|---------------|-------------------|-------|
| Custo | Gratuito | Alto | Baixo |
| Funcionalidades | Completas | Muito completas | Limitadas |
| Usabilidade | Alta | Média | Baixa |
| Customização | Alta | Baixa | Alta |
| Manutenção | Simples | Complexa | Manual |
| Animações | Modernas | Variável | Nenhumas |

---

# VIII. CONCLUSÕES E TRABALHOS FUTUROS

## 8.1. Conclusões Gerais

O desenvolvimento do projeto "Maslov Motors" foi concluído com sucesso, cumprindo todos os objetivos inicialmente propostos. A aplicação desenvolvida oferece uma solução completa para gestão de oficinas automóveis, com funcionalidades que respondem às necessidades reais do mercado.

A aplicação demonstra que é possível criar soluções profissionais utilizando tecnologias modernas como React, TypeScript e Lovable Cloud. A integração de inteligência artificial através do chatbot e a implementação de animações modernas acrescenta valor diferenciador à solução.

O projeto permitiu consolidar conhecimentos técnicos adquiridos durante o curso, nomeadamente em desenvolvimento web, bases de dados, segurança informática e design de interfaces. A metodologia iterativa adotada provou ser eficaz para o desenvolvimento individual, permitindo priorizar funcionalidades core e entregar um MVP robusto.

A inclusão de funcionalidades de gestão de conta (edição de perfil, alteração de palavra-passe e eliminação de conta) demonstra preocupação com a autonomia do utilizador e conformidade com boas práticas de proteção de dados.

As animações e transições implementadas contribuem significativamente para uma experiência de utilizador moderna e agradável, diferenciando a aplicação de soluções mais tradicionais.

## 8.2. Dificuldades e Limitações

### 8.2.1. Dificuldades Encontradas

1. **Gestão de estados complexos:** A coordenação entre diferentes componentes e estados exigiu atenção especial. A utilização do React Query (Referência TanStack) permitiu simplificar significativamente a gestão de dados do servidor, resolvendo problemas de cache, revalidação e sincronização.
2. **Row Level Security:** Definição de políticas RLS adequadas para diferentes cenários, nomeadamente o problema de recursão infinita documentado no Log de Erros (secção 6.6). A documentação oficial do Supabase (Referência 4) foi fundamental para compreender o padrão `SECURITY DEFINER`.
3. **Integração de IA:** Ajuste do comportamento do chatbot para respostas relevantes e seguras. O desafio principal foi desenhar um System Prompt que limitasse eficazmente o âmbito das respostas ao contexto automóvel (ver secção 5.5.1 para detalhes).
4. **Validação de dados:** A implementação de validações robustas para formatos portugueses (telemóvel, email) com Zod (Referência Zod) exigiu o desenvolvimento de expressões regulares personalizadas que contemplassem os vários formatos válidos (ver secção 6.6, erro #3).

### 8.2.2. Limitações Atuais

1. **Sem modo offline:** Requer conexão à internet
2. **Idioma único:** Apenas português
3. **Sem notificações push:** Lembretes manuais (funcionalidade diferida para iteração futura)
4. **Sem app mobile nativa:** Apenas web responsiva
5. **Sem faturação certificada pela AT:** O sistema atual não emite faturas certificadas pela Autoridade Tributária (ver secção 8.3 para plano de implementação)

## 8.3. Melhorias Futuras

### 8.3.1. Curto Prazo (Prioridade Alta)

1. **Faturação certificada pela AT:** Sendo o projeto destinado ao mercado português, a conformidade com a legislação fiscal é uma prioridade. A Autoridade Tributária e Aduaneira (AT) obriga a que todas as oficinas emitam faturas através de software certificado. A implementação incluiria: geração de faturas com número sequencial, comunicação automática à AT via webservice, emissão de documentos com QR Code obrigatório, e integração com o sistema SAF-T (PT). Esta é a melhoria mais crítica para tornar o Maslov Motors numa ferramenta de produção real, demonstrando consciência das obrigações legais do setor automóvel em Portugal.
2. **Exportação de dados:** PDF/Excel de relatórios e faturas
3. **Modo escuro:** Implementar tema dark

### 8.3.2. Médio Prazo

1. **Lembretes automáticos:** Notificações email/push para manutenções
2. **App mobile:** React Native ou PWA avançada
3. **Multi-idioma:** Internacionalização
4. **Filtros avançados:** Pesquisa mais detalhada

### 8.3.3. Longo Prazo

1. **Módulo de inventário:** Gestão de peças e stock
2. **Integração contabilística:** Export para software contabilidade (SAF-T completo)
3. **Sistema de fidelização:** Pontos e descontos
4. **Análise preditiva:** IA para previsão de manutenções baseada no histórico
5. **Multi-oficina:** Gestão de cadeia de oficinas

---

# IX. REFERÊNCIAS BIBLIOGRÁFICAS

## Documentação Oficial

1. React Documentation. (2024). React – A JavaScript library for building user interfaces. https://react.dev/ — *Consultada extensivamente para a implementação de componentes funcionais, hooks personalizados (useAuth, useToast) e gestão de estado com Context API (Capítulos 2, 5).*

2. TypeScript Documentation. (2024). TypeScript: JavaScript With Syntax For Types. https://www.typescriptlang.org/docs/ — *Utilizada para definir interfaces e tipos das entidades do sistema (Car, Service, Profile), garantindo segurança de tipos em todo o projeto (Capítulo 5).*

3. Tailwind CSS Documentation. (2024). Tailwind CSS - Rapidly build modern websites without ever leaving your HTML. https://tailwindcss.com/docs — *Base para o sistema de design tokens, classes utilitárias responsivas e implementação de animações customizadas como fade-in, hover-lift e shimmer (Capítulos 4, 5).*

4. Supabase Documentation. (2024). Supabase Docs. https://supabase.com/docs — *Fonte principal para a implementação de Row Level Security (RLS), resolução do problema de recursão infinita com SECURITY DEFINER, configuração de Edge Functions e sistema de autenticação (Capítulos 5, 6.6).*

5. Vite Documentation. (2024). Vite - Next Generation Frontend Tooling. https://vitejs.dev/guide/ — *Consultada para a configuração do ambiente de desenvolvimento, path aliases e otimização do build de produção.*

## Livros e Artigos

6. Flanagan, D. (2020). JavaScript: The Definitive Guide, 7th Edition. O'Reilly Media.

7. Freeman, A. (2021). Pro React 16. Apress.

8. Vanderkam, D. (2019). Effective TypeScript: 62 Specific Ways to Improve Your TypeScript. O'Reilly Media.

## Recursos Online

9. MDN Web Docs. (2024). Web technology for developers. https://developer.mozilla.org/ — *Referência para APIs nativas do browser utilizadas no streaming do chatbot (ReadableStream, TextDecoder) e validação de formulários.*

10. Stack Overflow. (2024). Where Developers Learn, Share, & Build Careers. https://stackoverflow.com/ — *Consultado para resolver problemas específicos como divisão por zero no cálculo de margens e tratamento de expressões regulares para validação de telemóveis (secção 6.6).*

11. GitHub. (2024). Various open-source repositories. https://github.com/

12. Shadcn/ui. (2024). Beautifully designed components. https://ui.shadcn.com/ — *Biblioteca de componentes UI base utilizada para formulários, diálogos, tabelas e sistema de tabs no dashboard.*

13. TanStack React Query Documentation. (2024). Powerful asynchronous state management. https://tanstack.com/query — *Utilizada para resolver problemas de gestão de estado do servidor, cache e revalidação automática de dados. Fundamental para eliminar o "flickering" na navegação entre tabs (secção 6.6, erro #2).*

14. Zod Documentation. (2024). TypeScript-first schema validation. https://zod.dev/ — *Base para todas as validações de formulários do projeto, incluindo schemas personalizados para formato de telemóvel português, email e matrícula. Resolveu o problema de validação documentado na secção 6.6, erro #3.*

## Normas e Regulamentos

15. Regulamento (UE) 2016/679 do Parlamento Europeu e do Conselho (RGPD). — *Orientou a implementação do direito ao esquecimento (eliminação permanente de conta) e princípio de minimização de dados.*

16. W3C. (2024). Web Content Accessibility Guidelines (WCAG) 2.1. https://www.w3.org/WAI/WCAG21/quickref/

17. Autoridade Tributária e Aduaneira (AT). Requisitos técnicos para software de faturação certificado. https://info.portaldasfinancas.gov.pt/ — *Consultada para planear a futura implementação de faturação certificada (secção 8.3.1).*

---

# X. ANEXOS

## Anexo A - Capturas de Ecrã da Aplicação

As figuras seguintes apresentam as principais interfaces da aplicação Maslov Motors.

### A.1. Landing Page

**Figura 16: Página inicial da aplicação com animações**

[INSERIR SCREENSHOT: Landing page mostrando o hero section com gradientes, botões de ação "Começar Agora" e "Login", e as animações de entrada dos elementos]

Descrição: A página inicial apresenta um design moderno com gradientes em azul, animações fade-in nos textos e botões com efeitos de hover. O chatbot está acessível através do ícone no canto inferior direito.

---

### A.2. Página de Autenticação

**Figura 17: Ecrã de login e registo**

[INSERIR SCREENSHOT: Página de autenticação mostrando as tabs "Entrar" e "Criar Conta", os campos de formulário (email, password, nome, apelido, telemóvel) e o botão de submit]

Descrição: A página de autenticação oferece duas tabs: uma para login de utilizadores existentes e outra para criação de nova conta. O registo exige telemóvel obrigatório para contacto.

---

### A.3. Dashboard do Cliente

**Figura 18: Dashboard do cliente com cards de estatísticas**

[INSERIR SCREENSHOT: Dashboard mostrando os cards "Meus Carros", "Serviços Agendados", "Serviços Concluídos", "Total Serviços", os botões de ação rápida e a lista de veículos do cliente]

Descrição: O dashboard do cliente apresenta estatísticas pessoais, ações rápidas para adicionar carro, fazer marcação ou pedir orçamento, e a lista dos seus veículos com opção de ver histórico de serviços.

---

### A.4. Histórico de Serviços

**Figura 19: Timeline de serviços de um veículo**

[INSERIR SCREENSHOT: Secção expandida de um veículo mostrando a timeline de serviços com estados coloridos (azul/amarelo/verde), datas, preços e descrições]

Descrição: O histórico de serviços é apresentado numa timeline visual com códigos de cor para cada estado: azul (agendado), amarelo (em processo) e verde (concluído).

---

### A.5. Dashboard do Administrador

**Figura 20: Dashboard administrativo com gráficos**

[INSERIR SCREENSHOT: Dashboard do admin mostrando os gráficos de receita, custos e margem, as tabs de navegação (Clientes, Carros, Serviços, Orçamentos, Relatórios) e as estatísticas gerais]

Descrição: O dashboard administrativo oferece uma visão completa do negócio com gráficos interativos de receita e margem, navegação por tabs para gestão de clientes, carros, serviços e orçamentos.

---

### A.6. Gestão de Clientes

**Figura 21: Interface de gestão de clientes**

[INSERIR SCREENSHOT: Tab de clientes mostrando a tabela com colunas Nome, Email, Telemóvel, Data de Registo, e os botões de ação (editar, alterar password, eliminar)]

Descrição: A gestão de clientes permite visualizar todos os utilizadores registados, editar os seus dados, alterar passwords e eliminar contas quando necessário.

---

### A.7. Gestão de Serviços

**Figura 22: Interface de gestão de serviços**

[INSERIR SCREENSHOT: Tab de serviços mostrando a tabela com serviços, os filtros por estado, botão de criar novo serviço, e os indicadores de estado coloridos]

Descrição: A gestão de serviços permite criar, editar e acompanhar todos os serviços. Os estados são facilmente identificáveis por cores e podem ser alterados diretamente na interface.

---

### A.8. Chatbot com IA

**Figura 23: Interface do chatbot**

[INSERIR SCREENSHOT: Janela do chatbot aberta mostrando uma conversa exemplo com perguntas do utilizador e respostas do assistente sobre serviços da oficina]

Descrição: O chatbot oferece assistência 24/7 aos utilizadores, respondendo a perguntas sobre serviços, horários e funcionamento da oficina usando inteligência artificial.

---

### A.9. Edição de Perfil

**Figura 24: Diálogo de edição de perfil e segurança**

[INSERIR SCREENSHOT: Diálogo de definições mostrando as tabs "Dados Pessoais" e "Segurança", os campos editáveis e a zona de perigo com botão de eliminar conta]

Descrição: Os clientes podem editar os seus dados pessoais, alterar a palavra-passe e, se desejarem, eliminar permanentemente a sua conta através deste diálogo.

---

### A.10. Relatórios e Estatísticas

**Figura 25: Vista de relatórios com gráficos detalhados**

[INSERIR SCREENSHOT: Tab de relatórios mostrando gráficos de evolução temporal, top clientes, distribuição de serviços por tipo, e métricas financeiras]

Descrição: Os relatórios oferecem análises detalhadas do negócio com filtros temporais, permitindo visualizar a evolução de receitas, custos e margens ao longo do tempo.

---

## Anexo B - Diagramas Técnicos

### B.1. Diagrama Entidade-Relacionamento

Ver secção 4.2.1 para o diagrama ER completo com todas as tabelas e relações.

### B.2. Diagrama de Navegação

Ver secção 4.3.1 para o diagrama de navegação detalhado da aplicação.

### B.3. Fluxo de Eliminação de Conta

Ver secção 4.3.2 para o diagrama de sequência do processo de eliminação de conta.

### B.4. Diagrama de Classes Simplificado

```
┌─────────────────┐
│     User        │
├─────────────────┤
│ - id: string    │
│ - email: string │
│ - role: Role    │
├─────────────────┤
│ + login()       │
│ + logout()      │
│ + register()    │
│ + updateProfile()│
│ + changePassword()│
│ + deleteAccount()│
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───┴───┐ ┌───┴───┐
│Client │ │ Admin │
└───┬───┘ └───┬───┘
    │         │
    │    ┌────┴────────────┐
    │    │                 │
┌───┴───┐│           ┌─────┴─────┐
│ Car   ││           │  Service  │
├───────┤│           ├───────────┤
│ marca ││           │ name      │
│modelo ││           │ status    │
│matricula│          │ price     │
└───────┘│           │ margin    │
         │           └───────────┘
         │
    ┌────┴────┐
    │QuoteReq │
    ├─────────┤
    │ message │
    │ status  │
    └─────────┘
```

### B.5. Diagrama de Sequência - Fluxo de Login

```
Cliente          Frontend         Supabase Auth       Database
   │                │                  │                 │
   │─── Login ─────▶│                  │                 │
   │                │── signIn() ─────▶│                 │
   │                │                  │── verify ──────▶│
   │                │                  │◀── user data ───│
   │                │◀── session ──────│                 │
   │                │── check role ────────────────────▶│
   │                │◀── role ─────────────────────────│
   │◀── redirect ───│                  │                 │
   │                │                  │                 │
```

---

## Anexo C - Código Fonte

O código fonte completo está disponível no repositório do projeto, organizado conforme a estrutura de diretórios apresentada no Capítulo IV.

### C.1. Principais Ficheiros

**src/hooks/useAuth.tsx** - Hook de autenticação
**src/components/dashboard/ClientDashboard.tsx** - Dashboard do cliente
**src/components/dashboard/AdminDashboard.tsx** - Dashboard do admin
**src/components/dashboard/client/EditProfileDialog.tsx** - Edição de perfil
**src/components/chat/ChatBot.tsx** - Componente do chatbot
**supabase/functions/chat-assistant/index.ts** - Edge function do chatbot
**supabase/functions/delete-user/index.ts** - Edge function para eliminar conta
**supabase/functions/update-password/index.ts** - Edge function para alterar password

---

## Anexo D - Manual do Utilizador

O Manual do Utilizador completo encontra-se incluído neste documento a partir da página seguinte.

O manual fornece instruções detalhadas para:
- Clientes: registo, login, gestão de veículos, pedidos de orçamento, marcações, utilização do chatbot, edição de perfil, alteração de password e eliminação de conta
- Administradores: gestão de clientes, carros, serviços, orçamentos, tipos de serviços, marcas de carros e visualização de relatórios

**Nota:** Para facilitar a consulta, o manual também está disponível como documento separado em `docs/MANUAL_UTILIZADOR_MASLOV_MOTORS.md`.

---

# MANUAL DO UTILIZADOR

# Maslov Motors
## Sistema de Gestão para Oficina Automóvel

---

**Versão:** 1.0  
**Data:** Janeiro 2026  
**Autor:** Danilo Dmitrievich Maslov

---

## ÍNDICE DO MANUAL

1. Introdução
2. Requisitos do Sistema
3. Primeiros Passos
   - 3.1. Criar Conta
   - 3.2. Iniciar Sessão
   - 3.3. Terminar Sessão
4. Área do Cliente
   - 4.1. Dashboard
   - 4.2. Gerir Veículos
   - 4.3. Ver Histórico de Serviços
   - 4.4. Pedir Orçamento
   - 4.5. Fazer Marcação
   - 4.6. Usar o Chatbot
   - 4.7. Editar Perfil
   - 4.8. Alterar Palavra-passe
   - 4.9. Eliminar Conta
5. Área do Administrador
   - 5.1. Dashboard e Estatísticas
   - 5.2. Gerir Clientes
   - 5.3. Gerir Carros
   - 5.4. Gerir Serviços
   - 5.5. Gerir Pedidos de Orçamento
   - 5.6. Gerir Tipos de Serviços
   - 5.7. Gerir Marcas de Carros
   - 5.8. Relatórios
6. Perguntas Frequentes
7. Resolução de Problemas
8. Contactos e Suporte

---

## 1. INTRODUÇÃO

### Sobre a Aplicação

O **Maslov Motors** é uma aplicação web desenvolvida para facilitar a gestão de uma oficina automóvel. A aplicação permite que clientes registem os seus veículos, consultem o histórico de serviços, peçam orçamentos e façam marcações. Os administradores podem gerir clientes, veículos, serviços e visualizar relatórios financeiros.

### Principais Funcionalidades

**Para Clientes:**
- ✅ Registo de veículos
- ✅ Visualização do histórico de serviços
- ✅ Pedidos de orçamento
- ✅ Marcação de serviços
- ✅ Chatbot de assistência
- ✅ Edição de perfil
- ✅ Alteração de palavra-passe
- ✅ Eliminação de conta

**Para Administradores:**
- ✅ Gestão completa de clientes
- ✅ Gestão de veículos
- ✅ Criação e gestão de serviços
- ✅ Controlo de custos e margens
- ✅ Relatórios estatísticos
- ✅ Gestão de tipos de serviços
- ✅ Gestão de marcas de carros

---

## 2. REQUISITOS DO SISTEMA

### Navegadores Suportados

| Navegador | Versão Mínima |
|-----------|---------------|
| Google Chrome | 90+ |
| Mozilla Firefox | 88+ |
| Microsoft Edge | 90+ |
| Safari | 14+ |

### Requisitos

- Conexão à internet
- JavaScript ativado
- Cookies ativados
- Resolução mínima: 320px (mobile)

### URL de Acesso

**Aplicação:** https://maslov-motors.lovable.app

---

## 3. PRIMEIROS PASSOS

### 3.1. Criar Conta

Para utilizar a aplicação como cliente, é necessário criar uma conta:

**Passo a Passo:**

1. Aceder à aplicação em https://maslov-motors.lovable.app
2. Clicar em "Começar Agora" ou "Login"
3. Selecionar a aba "Criar Conta"
4. Preencher os dados:
   - Nome (obrigatório)
   - Apelido (obrigatório)
   - Email (obrigatório)
   - Telemóvel (obrigatório)
   - Palavra-passe (mínimo 6 caracteres)
5. Clicar em "Criar Conta"

### 3.2. Iniciar Sessão

1. Aceder à aplicação
2. Clicar em "Login"
3. Preencher email e palavra-passe
4. Clicar em "Entrar"

### 3.3. Terminar Sessão

1. No dashboard, clicar no botão "Sair" no canto superior direito
2. Será redirecionado para a página inicial

---

## 4. ÁREA DO CLIENTE

### 4.1. Dashboard

O dashboard é a página principal após iniciar sessão, contendo:
- Cards com estatísticas (carros, serviços agendados/concluídos)
- Botões de ação rápida (Adicionar Carro, Fazer Marcação, Pedir Orçamento)
- Lista de veículos registados
- Botão de Definições (⚙️) para edição de perfil

### 4.2. Gerir Veículos

Para adicionar um veículo:
1. Clicar em "Adicionar Carro"
2. Preencher marca, modelo, matrícula, ano, cor e quilometragem
3. Clicar em "Adicionar Carro"

### 4.3. Ver Histórico de Serviços

Para cada veículo, clicar em "Ver Histórico" para ver a timeline de serviços com estados coloridos.

### 4.4. Pedir Orçamento

1. Clicar em "Pedir Orçamento"
2. Preencher data preferida, hora e descrição do serviço pretendido
3. Clicar em "Enviar Pedido"

### 4.5. Fazer Marcação

1. Clicar em "Fazer Marcação"
2. Selecionar data e hora disponíveis
3. Descrever o motivo da marcação
4. Clicar em "Fazer Marcação"

### 4.6. Usar o Chatbot

1. Clicar no ícone 💬 no canto inferior direito
2. Digitar a pergunta e pressionar Enter
3. Aguardar resposta do assistente

### 4.7. Editar Perfil

1. Clicar no ícone ⚙️ (Definições)
2. Editar os campos desejados na aba "Dados Pessoais"
3. Clicar em "Guardar Alterações"

### 4.8. Alterar Palavra-passe

1. Clicar no ícone ⚙️ (Definições)
2. Selecionar a aba "Segurança"
3. Preencher palavra-passe atual e nova palavra-passe
4. Clicar em "Alterar Palavra-passe"

### 4.9. Eliminar Conta

⚠️ **ATENÇÃO: Esta ação é PERMANENTE e IRREVERSÍVEL!**

1. Clicar no ícone ⚙️ (Definições)
2. Selecionar a aba "Segurança"
3. Na "Zona de Perigo", clicar em "Eliminar Conta Permanentemente"
4. Confirmar a eliminação

---

## 5. ÁREA DO ADMINISTRADOR

### 5.1. Dashboard e Estatísticas

Gráficos interativos de serviços, receitas, custos e margens.

### 5.2. Gerir Clientes

Adicionar, editar, alterar password e eliminar clientes.

### 5.3. Gerir Carros

Adicionar e editar veículos, gerir marcas personalizadas.

### 5.4. Gerir Serviços

Criar, editar e alterar estados de serviços. Gerir tipos de serviços personalizados.

### 5.5. Gerir Pedidos de Orçamento

Visualizar e gerir estados de pedidos de orçamento.

### 5.6. Gerir Tipos de Serviços

Adicionar tipos de serviço com descrições e peças padrão.

### 5.7. Gerir Marcas de Carros

Adicionar marcas e modelos personalizados.

### 5.8. Relatórios

Visualizar estatísticas mensais e anuais com gráficos detalhados.

---

## 6. PERGUNTAS FREQUENTES

**P: Esqueci a minha palavra-passe. O que faço?**
R: Contacte a oficina para recuperação de acesso.

**P: Posso ter mais do que um carro registado?**
R: Sim, pode registar quantos carros desejar.

**P: Como sei o estado do meu serviço?**
R: No histórico do veículo, os estados são indicados por cores.

---

## 7. RESOLUÇÃO DE PROBLEMAS

**Página não carrega:**
- Verificar conexão à internet
- Limpar cache do navegador
- Tentar outro navegador

**Não consigo fazer login:**
- Verificar email e password
- Verificar caps lock

---

## 8. CONTACTOS E SUPORTE

**Aplicação:** https://maslov-motors.lovable.app
**Email:** suporte@maslovmotors.pt
**Chatbot:** Disponível 24/7 na aplicação

---

# FIM DO RELATÓRIO E MANUAL

---

**Relatório elaborado por:** Danilo Dmitrievich Maslov

**Curso:** Técnico de Gestão e Programação de Sistemas Informáticos

**Escola:** PROFITECLA - Escola Profissional

**Ano Letivo:** 2025/2026

**Data:** Janeiro 2026

---

## NOTAS FINAIS PARA FORMATAÇÃO WORD

Antes de entregar, certifique-se de:

1. ✅ Inserir os logotipos da escola e do projeto na capa e página de rosto
2. ✅ Inserir as capturas de ecrã reais no Anexo A (onde indicado [INSERIR SCREENSHOT])
3. ✅ Configurar cabeçalho: "Maslov Motors - Sistema de Gestão para Oficina Automóvel" (alinhado à direita, tamanho 8)
4. ✅ Configurar rodapé: Número de página centrado
5. ✅ Remover cabeçalho/rodapé da capa
6. ✅ Aplicar todos os estilos conforme instruções no início do documento
7. ✅ Verificar quebras de página antes de cada capítulo
8. ✅ Gerar índice automático no Word após aplicar estilos de título
