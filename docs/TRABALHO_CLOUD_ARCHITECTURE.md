# Trabalho Final — Arquitetura Cloud para a PAP Maslov Motors

**Aluno:** Danilo Dmitrievich Maslov  
**Projeto PAP:** Maslov Motors — Aplicação Web para Gestão de Oficina Automóvel  
**Tecnologias do Projeto:** React (TypeScript), PostgreSQL, Edge Functions (Deno), API de IA (Gemini)

---

## Fase I: Caracterização e Geografia da Solução

### 1. Escolha do Provider: Amazon Web Services (AWS)

**Justificação:**

A escolha da AWS como provider de cloud deve-se a vários fatores:

- **Líder de mercado**: A AWS detém ~31% do mercado global de cloud (2024), sendo o provider mais utilizado mundialmente, o que garante estabilidade e longevidade do serviço.
- **Serviços geridos para cada componente da PAP**:
  - **Frontend React** → Amazon S3 + CloudFront (hosting estático + CDN)
  - **Backend/API** → AWS Lambda (serverless, equivalente às Edge Functions usadas no projeto)
  - **Base de dados PostgreSQL** → Amazon RDS for PostgreSQL (serviço gerido)
  - **Autenticação** → Amazon Cognito (equivalente ao sistema de autenticação atual)
  - **IA/Chatbot** → Amazon Bedrock ou integração com API externa via Lambda
- **Modelo pay-as-you-go**: Paga-se apenas pelo que se usa, ideal para uma aplicação de uma oficina que terá tráfego variável.
- **Free Tier**: A AWS oferece 12 meses de utilização gratuita para muitos serviços, permitindo testes sem custos.
- **Presença em Portugal/Europa**: A região `eu-west-1` (Irlanda) oferece baixa latência para utilizadores em Portugal (~20-30ms).

**Alternativas consideradas:**

| Provider | Vantagem | Desvantagem para este projeto |
|----------|----------|-------------------------------|
| Azure | Forte integração com Microsoft | Menos serviços serverless maduros |
| Google Cloud | Melhor para IA/ML | Menor presença europeia, menos documentação em PT |
| Oracle Cloud | Free tier generoso | Ecossistema menor, menos comunidade |

### 2. Topologia Global: Região e Zonas de Disponibilidade

**Região escolhida:** `eu-west-1` (Irlanda)

**Justificação:**
- É a região AWS mais próxima de Portugal continental (~1.500 km).
- Latência estimada de 20-30ms para utilizadores em Lisboa/Porto.
- Possui **3 Zonas de Disponibilidade (AZs)**: `eu-west-1a`, `eu-west-1b`, `eu-west-1c`.
- Cumpre o RGPD (Regulamento Geral de Proteção de Dados) pois os dados permanecem na União Europeia.

**Utilização de múltiplas AZs:**

```
                    Região: eu-west-1 (Irlanda)
    ┌─────────────────────────────────────────────────┐
    │                                                   │
    │  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
    │  │  AZ 1a   │  │  AZ 1b   │  │  AZ 1c   │       │
    │  │          │  │          │  │          │       │
    │  │ Lambda   │  │ Lambda   │  │ (standby)│       │
    │  │ RDS      │  │ RDS      │  │          │       │
    │  │ (primary)│  │ (replica)│  │          │       │
    │  └──────────┘  └──────────┘  └──────────┘       │
    │                                                   │
    └─────────────────────────────────────────────────┘
```

**Porque usar mais do que uma AZ:**

Cada Zona de Disponibilidade é um datacenter fisicamente separado, com alimentação elétrica, rede e refrigeração independentes. Se uma AZ falhar (ex: incêndio, falha elétrica), as outras continuam a funcionar. Para a Maslov Motors:

- **RDS PostgreSQL** é configurado em **Multi-AZ**: a base de dados principal fica na `eu-west-1a` e uma réplica síncrona na `eu-west-1b`. Se o datacenter principal falhar, o failover automático ativa a réplica em ~60 segundos, sem perda de dados.
- **Lambda Functions** executam automaticamente em múltiplas AZs — a AWS distribui as invocações.
- **Disponibilidade alvo**: 99.95% (equivalente a ~4h de downtime por ano).

### 3. Edge Computing: CDN com Amazon CloudFront

**Sim, o projeto beneficia de CDN.** A Maslov Motors é uma Single Page Application (SPA) em React, o que significa que:

- Os ficheiros estáticos (HTML, CSS, JavaScript, imagens) são servidos ao browser do cliente.
- Estes ficheiros são **imutáveis entre deploys** — o mesmo ficheiro é pedido por todos os utilizadores.
- Utilizar uma CDN reduz a latência porque os ficheiros são cacheados em servidores próximos do utilizador.

**Configuração do CloudFront:**

| Tipo de conteúdo | Origem | TTL (Cache) | Exemplo |
|------------------|--------|-------------|---------|
| HTML (index.html) | S3 Bucket | 5 minutos | Atualiza rapidamente após deploy |
| JS/CSS (bundles) | S3 Bucket | 1 ano | Ficheiros com hash no nome (ex: `app.a1b2c3.js`) |
| Imagens estáticas | S3 Bucket | 30 dias | Logos, ícones |
| API requests | API Gateway/Lambda | Sem cache | Dados dinâmicos (serviços, carros) |

**Edge Locations relevantes para Portugal:**
- Lisboa (edge location direta)
- Madrid (fallback)
- Paris, Londres (cobertura europeia)

**Benefício**: Um utilizador em Lisboa recebe os ficheiros estáticos da edge location local em ~5ms, em vez dos ~25ms que demoraria a ir buscar à Irlanda.

---

## Fase II: Design de Rede e Segurança

### VPC e Sub-redes

**VPC (Virtual Private Cloud):** Rede virtual isolada onde toda a infraestrutura é instalada.

**Endereçamento IP:** `10.0.0.0/16` (65.536 endereços disponíveis)

```
VPC: 10.0.0.0/16 (Maslov Motors)
│
├── Sub-rede Pública A (eu-west-1a): 10.0.1.0/24
│   └── NAT Gateway, ALB (Application Load Balancer)
│
├── Sub-rede Pública B (eu-west-1b): 10.0.2.0/24
│   └── ALB (redundância)
│
├── Sub-rede Privada A (eu-west-1a): 10.0.10.0/24
│   └── Lambda Functions, RDS Primary
│
├── Sub-rede Privada B (eu-west-1b): 10.0.20.0/24
│   └── Lambda Functions, RDS Replica
│
└── Sub-rede Isolada (eu-west-1a): 10.0.100.0/24
    └── Bastion Host (acesso de manutenção)
```

**Divisão Público/Privado:**

| Sub-rede | Tipo | Conteúdo | Acesso à Internet |
|----------|------|----------|-------------------|
| 10.0.1.0/24 | Pública | NAT Gateway, ALB | Direto (Internet Gateway) |
| 10.0.2.0/24 | Pública | ALB (redundância) | Direto (Internet Gateway) |
| 10.0.10.0/24 | Privada | Lambda, RDS Primary | Via NAT Gateway (só saída) |
| 10.0.20.0/24 | Privada | Lambda, RDS Replica | Via NAT Gateway (só saída) |
| 10.0.100.0/24 | Isolada | Bastion Host | Apenas SSH de IPs autorizados |

**Princípio:** A base de dados e as funções serverless **nunca** estão expostas diretamente à internet. Apenas o Load Balancer e o NAT Gateway têm IPs públicos.

### Segurança: Security Groups e Network ACLs

**Security Groups (Firewall ao nível da instância):**

| Security Group | Regra Inbound | Porta | Origem | Justificação |
|----------------|---------------|-------|--------|-------------|
| SG-ALB | HTTPS | 443 | 0.0.0.0/0 | Tráfego web dos utilizadores |
| SG-ALB | HTTP | 80 | 0.0.0.0/0 | Redireciona para HTTPS |
| SG-Lambda | HTTPS | 443 | SG-ALB | Só aceita tráfego do Load Balancer |
| SG-RDS | PostgreSQL | 5432 | SG-Lambda | Só aceita conexões das Lambda Functions |
| SG-RDS | PostgreSQL | 5432 | SG-Bastion | Acesso de manutenção |
| SG-Bastion | SSH | 22 | IP do admin | Apenas o IP fixo do administrador |

**Network ACLs (Firewall ao nível da sub-rede):**

| ACL | Regra | Ação | Justificação |
|-----|-------|------|-------------|
| Public Subnet | Inbound 443, 80 | ALLOW | Tráfego web |
| Public Subnet | Inbound 22 de IP admin | ALLOW | SSH para bastion |
| Public Subnet | Tudo o resto inbound | DENY | Bloquear acessos não autorizados |
| Private Subnet | Inbound 5432 de sub-rede Lambda | ALLOW | Conexões à BD |
| Private Subnet | Inbound direto da internet | DENY | BD nunca exposta |

**Princípio de defesa em profundidade:** Duas camadas de firewall (Security Groups + Network ACLs) garantem que mesmo que uma camada seja mal configurada, a outra protege.

### Acesso: NAT Gateway e Bastion Host

**NAT Gateway:**
- Instalado na sub-rede pública (`10.0.1.0/24`).
- Permite que as Lambda Functions e o RDS façam pedidos de **saída** à internet (ex: chamar a API do Gemini para o chatbot, descarregar atualizações).
- **Não permite** ligações de entrada — ninguém na internet consegue iniciar uma conexão com os recursos privados.

**Bastion Host:**
- Instância EC2 mínima (t3.micro) na sub-rede isolada.
- Único ponto de acesso SSH à infraestrutura privada.
- Acesso limitado ao IP do administrador da oficina.
- Utilizado apenas para manutenção de emergência da base de dados.

```
Utilizador ──HTTPS──▶ CloudFront ──▶ ALB ──▶ Lambda ──▶ RDS
                                                │
Admin ──SSH──▶ Bastion Host ──────────────────▶ RDS
(IP fixo)      (sub-rede isolada)      (sub-rede privada)
```

---

## Fase III: Computação e Armazenamento

### 1. Modelo de Computação: Serverless (AWS Lambda)

**Escolha: Serverless (AWS Lambda)**

**Justificação com base nos requisitos da PAP:**

A Maslov Motors é uma aplicação de uma oficina automóvel com tráfego previsível e intermitente:
- **Horário ativo**: maioritariamente durante o horário de expediente da oficina (8h-18h).
- **Picos**: quando clientes consultam serviços ou usam o chatbot.
- **Noites/fins-de-semana**: tráfego mínimo.

| Modelo | Custo quando parado | Escalabilidade | Manutenção | Adequação |
|--------|---------------------|----------------|------------|-----------|
| VMs (EC2) | ~€30-50/mês mesmo parado | Manual ou Auto-Scaling Groups | Patches de SO, atualizações | ❌ Demasiado para este projeto |
| Contentores (ECS/EKS) | ~€15-30/mês (Fargate) | Automática mas complexa | Dockerfiles, orquestração | ❌ Complexidade desnecessária |
| **Serverless (Lambda)** | **€0 quando parado** | **Automática e instantânea** | **Zero** | **✅ Ideal** |

**Mapeamento das Edge Functions atuais para Lambda:**

| Edge Function atual | Lambda equivalente | Trigger |
|--------------------|--------------------|---------|
| `chat-assistant` | `maslov-chat-assistant` | API Gateway POST /chat |
| `update-password` | `maslov-update-password` | API Gateway POST /admin/password |
| `delete-user` | `maslov-delete-user` | API Gateway DELETE /admin/user |

**Configuração Lambda:**
- **Runtime**: Node.js 20.x (compatível com o TypeScript do projeto)
- **Memória**: 256 MB (suficiente para operações CRUD e chamadas API)
- **Timeout**: 30 segundos (o chatbot com streaming pode demorar)
- **Concorrência reservada**: 10 (limita custos inesperados)

### 2. Estratégia de Storage

**Ficheiros Estáticos — Amazon S3 (Object Storage):**

| Bucket | Conteúdo | Acesso |
|--------|----------|--------|
| `maslov-motors-frontend` | Build React (HTML, JS, CSS, imagens) | Público via CloudFront (OAI) |
| `maslov-motors-backups` | Backups da base de dados | Privado, apenas IAM roles |

**Configuração do bucket frontend:**
- **Versionamento**: Ativado (permite rollback a versões anteriores do site).
- **Lifecycle rules**: Versões antigas eliminadas após 30 dias (reduz custos).
- **Encryption**: AES-256 (Server-Side Encryption ativa por defeito).
- **Block Public Access**: Ativado — o acesso é feito exclusivamente via CloudFront com Origin Access Identity (OAI), nunca diretamente ao bucket.

**Volumes de Disco (Block Storage):**

Para este projeto serverless, não existem instâncias EC2 permanentes que precisem de volumes EBS. A única exceção é:
- **Bastion Host**: Volume EBS `gp3` de 8 GB (mínimo necessário para Amazon Linux 2).
- **RDS**: Utiliza volumes EBS `gp3` geridos automaticamente pelo serviço (ver secção de Base de Dados).

### 3. Base de Dados: Amazon RDS for PostgreSQL

**Escolha: Amazon RDS for PostgreSQL 16**

**Justificação:**

A PAP Maslov Motors já utiliza PostgreSQL com funcionalidades avançadas:
- **Row Level Security (RLS)** — políticas de segurança ao nível da linha.
- **Funções com SECURITY DEFINER** — a função `has_role()`.
- **Enums personalizados** — `app_role`, `service_status`.
- **Triggers** — criação automática de perfis.

Estas funcionalidades são específicas do PostgreSQL e não existem em bases de dados NoSQL (DynamoDB) ou noutros motores SQL (MySQL). Por isso, a migração para RDS PostgreSQL é direta e sem alterações de código.

**Alternativas descartadas:**

| Serviço | Tipo | Razão da exclusão |
|---------|------|-------------------|
| DynamoDB | NoSQL | Não suporta RLS, JOINs, nem funções SQL |
| Aurora MySQL | SQL gerido | Não suporta RLS nem SECURITY DEFINER |
| Aurora PostgreSQL | SQL gerido | Viável mas mais caro para este volume |
| DocumentDB | MongoDB-compatible | Modelo relacional do projeto não se adequa |

**Configuração RDS:**

| Parâmetro | Valor | Justificação |
|-----------|-------|-------------|
| Engine | PostgreSQL 16 | Versão usada no desenvolvimento |
| Instance class | db.t3.micro | Suficiente para oficina (~100 clientes) |
| Storage | 20 GB gp3 | 8 tabelas, crescimento lento |
| Multi-AZ | Sim | Failover automático para alta disponibilidade |
| Backup | Automático, retenção 7 dias | Recuperação point-in-time |
| Encryption | AES-256 (KMS) | Dados em repouso encriptados |
| Public access | Não | Apenas acessível via sub-redes privadas |

**Schema da base de dados (8 tabelas):**

```
profiles ←──── user_roles
    │
    ├──── cars ←──── services
    │
    ├──── quote_requests ───▶ availability_slots
    │
    └──── (custom_car_brands, custom_service_types)
```

---

## Fase IV: Identidade e Gestão (IAM)

### Princípio do Privilégio Mínimo

Cada utilizador/serviço recebe **apenas** as permissões necessárias para a sua função — nada mais.

### Tabela de Utilizadores/Serviços e Permissões IAM

| Utilizador/Serviço | Tipo IAM | Permissões | Justificação |
|---------------------|----------|------------|-------------|
| **Admin Oficina (Danilo)** | IAM User + MFA | `AdministratorAccess` (com MFA obrigatório) | Gestão total da infraestrutura |
| **CI/CD Pipeline** | IAM Role | `s3:PutObject` no bucket frontend, `lambda:UpdateFunction`, `cloudfront:CreateInvalidation` | Deploy automático do frontend e funções |
| **Lambda - chat-assistant** | IAM Role | `rds-db:connect` (BD), `bedrock:InvokeModel` (IA) | Ler BD + chamar API de IA |
| **Lambda - update-password** | IAM Role | `rds-db:connect`, `cognito-idp:AdminSetUserPassword` | Alterar passwords de utilizadores |
| **Lambda - delete-user** | IAM Role | `rds-db:connect`, `cognito-idp:AdminDeleteUser` | Eliminar contas de utilizadores |
| **RDS PostgreSQL** | Service-linked Role | Gerido pela AWS | Backups automáticos, failover Multi-AZ |
| **CloudFront** | OAI (Origin Access Identity) | `s3:GetObject` no bucket frontend | Servir ficheiros estáticos sem expor o bucket |
| **CloudWatch** | Service Role | `logs:CreateLogGroup`, `logs:PutLogEvents` | Recolher logs de todas as funções |

**Políticas IAM detalhadas (exemplo para Lambda chat-assistant):**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "rds-db:connect",
      "Resource": "arn:aws:rds-db:eu-west-1:ACCOUNT:dbuser:maslov-db/lambda_user"
    },
    {
      "Effect": "Allow",
      "Action": "bedrock:InvokeModel",
      "Resource": "arn:aws:bedrock:eu-west-1::foundation-model/anthropic.claude-*"
    }
  ]
}
```

**Nota:** Cada Lambda Function tem a sua própria IAM Role com permissões mínimas. A função `chat-assistant` não pode eliminar utilizadores, e a função `delete-user` não pode invocar modelos de IA.

### Single Sign-On (SSO) para Múltiplos Administradores

Se a Maslov Motors crescesse e tivesse múltiplos administradores (ex: gerente, mecânico-chefe, rececionista), a solução seria:

**AWS IAM Identity Center (antigo AWS SSO):**

1. **Identity Provider (IdP)**: Configurar o IAM Identity Center como IdP central.
2. **Permission Sets**: Criar conjuntos de permissões por função:
   - `AdminFullAccess` — gerente (acesso total ao painel admin)
   - `AdminReadOnly` — mecânico-chefe (consultar serviços, sem eliminar)
   - `BillingOnly` — contabilista (apenas custos AWS)
3. **Multi-Factor Authentication (MFA)**: Obrigatório para todos os administradores.
4. **Fluxo SSO**: O administrador acede ao portal SSO → autentica-se uma vez → obtém acesso temporário à consola AWS e à aplicação admin.

**Na aplicação Maslov Motors**, o SSO funcionaria assim:
- Login via Amazon Cognito com federação ao IAM Identity Center.
- A tabela `user_roles` continua a controlar permissões dentro da aplicação (admin vs client).
- O IAM Identity Center controla quem pode aceder à infraestrutura AWS.

---

## Fase V: Escalabilidade e Alta Disponibilidade

### Load Balancer: Application Load Balancer (ALB)

**Tipo:** Application Load Balancer (Layer 7 — HTTP/HTTPS)

**Configuração:**

```
Internet ──▶ CloudFront ──▶ ALB ──▶ Lambda Functions
                              │
                              ├──▶ /api/chat    → Lambda chat-assistant
                              ├──▶ /api/password → Lambda update-password
                              └──▶ /api/user     → Lambda delete-user
```

**Regras de routing:**

| Condição | Destino | Peso |
|----------|---------|------|
| Path: `/api/chat/*` | Target Group: chat-assistant | 100% |
| Path: `/api/admin/password` | Target Group: update-password | 100% |
| Path: `/api/admin/user` | Target Group: delete-user | 100% |
| Default | Resposta 404 | — |

**Distribuição do tráfego:**
- O ALB distribui automaticamente os pedidos entre as instâncias Lambda disponíveis em múltiplas AZs.
- Se uma AZ falhar, o ALB redireciona todo o tráfego para a(s) AZ(s) restante(s).

**Nota:** Para os ficheiros estáticos (frontend React), o CloudFront serve diretamente do S3 sem passar pelo ALB, reduzindo latência e custos.

### Auto-Scaling

**Lambda Auto-Scaling (automático):**

O AWS Lambda escala automaticamente — cada pedido cria uma nova instância da função se necessário. Não é preciso configurar Auto-Scaling Groups.

| Parâmetro | Valor | Justificação |
|-----------|-------|-------------|
| Concorrência mínima | 0 | Sem custos quando não há tráfego |
| Concorrência reservada | 10 por função | Evitar custos inesperados |
| Concorrência máxima (conta) | 1.000 (default AWS) | Suficiente para picos |
| Provisioned concurrency | 2 (chat-assistant) | Evitar cold starts no chatbot |

**Métricas de escalonamento (se usássemos EC2):**

Embora Lambda escale automaticamente, se a aplicação usasse EC2, as métricas seriam:

| Métrica | Threshold Scale-Up | Threshold Scale-Down | Justificação |
|---------|-------------------|---------------------|-------------|
| CPU | > 70% por 3 min | < 30% por 10 min | Processamento de pedidos |
| RAM | > 80% por 5 min | < 40% por 10 min | Cache de conexões BD |
| Request Count | > 1000 req/min | < 200 req/min | Volume de tráfego |
| Response Time | > 2 segundos p95 | — | Experiência do utilizador |

**RDS Auto-Scaling de Storage:**
- O armazenamento do RDS cresce automaticamente quando atinge 90% da capacidade.
- Crescimento máximo configurado: 100 GB (mais que suficiente para décadas de dados da oficina).

### Health Checks

**Health Check do ALB:**

| Parâmetro | Valor | Significado |
|-----------|-------|-------------|
| Path | `/api/health` | Endpoint dedicado que verifica se a aplicação está operacional |
| Interval | 30 segundos | Verifica a cada 30 segundos |
| Timeout | 5 segundos | Se não responder em 5s, considera falha |
| Unhealthy threshold | 3 | Após 3 falhas consecutivas, remove do target group |
| Healthy threshold | 2 | Após 2 respostas OK, volta a receber tráfego |

**Implementação do health check (Lambda):**

```javascript
// Endpoint /api/health
export async function handler() {
  try {
    // 1. Verificar conexão à base de dados
    await db.query('SELECT 1');
    
    // 2. Retornar status OK
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: 'healthy',
        database: 'connected',
        timestamp: new Date().toISOString()
      })
    };
  } catch (error) {
    return {
      statusCode: 503,  // Service Unavailable
      body: JSON.stringify({
        status: 'unhealthy',
        error: error.message
      })
    };
  }
}
```

**Recuperação automática:**

| Cenário de falha | Deteção | Recuperação |
|------------------|---------|-------------|
| Lambda timeout | ALB health check (30s) | Invocação seguinte cria nova instância |
| RDS Primary down | Multi-AZ monitoring (~60s) | Failover automático para réplica |
| AZ inteira down | ALB cross-zone health check | Tráfego redirecionado para AZ saudável |
| Deploy com bugs | CloudWatch alarms + rollback | Rollback automático para versão anterior |

---

## Fase VI: Serviços de Apoio e Mensagens

### Notificações: Amazon SES + Amazon SNS

**Amazon SES (Simple Email Service) — Emails transacionais:**

A Maslov Motors precisa de enviar emails para:

| Tipo de email | Quando | Template |
|---------------|--------|----------|
| Confirmação de registo | Novo cliente regista-se | "Bem-vindo à Maslov Motors" |
| Reset de password | Cliente pede recuperação | "Redefinir a sua password" |
| Confirmação de orçamento | Cliente submete pedido de orçamento | "Recebemos o seu pedido" |
| Serviço concluído | Admin marca serviço como concluído | "O seu veículo está pronto" |

**Configuração SES:**
- **Domínio verificado**: `maslovmotors.pt`
- **DKIM + SPF**: Configurados para evitar que os emails sejam marcados como spam.
- **Região**: `eu-west-1` (mesmo da infraestrutura principal).

**Amazon SNS (Simple Notification Service) — Alertas operacionais:**

| Tópico SNS | Subscritor | Quando dispara |
|------------|------------|----------------|
| `maslov-alarms-critical` | Email + SMS admin | BD down, Lambda errors > 10/min |
| `maslov-alarms-warning` | Email admin | CPU > 70%, storage > 80% |
| `maslov-new-quote` | Email admin | Novo pedido de orçamento submetido |

**Integração com CloudWatch Alarms:**

```
CloudWatch detecta anomalia 
    → Dispara Alarm 
    → Publica no tópico SNS 
    → Admin recebe SMS/Email
```

### Messaging: Amazon SQS (Filas de Espera)

**Sim, existe processamento assíncrono** na Maslov Motors:

**Fila 1: Processamento do Chatbot (`maslov-chat-queue`)**

O chatbot com IA pode demorar 5-15 segundos a gerar uma resposta. Em vez de bloquear o utilizador:

```
Cliente envia mensagem
    → API Gateway recebe
    → Lambda enfileira na SQS
    → Lambda consumidor processa com API de IA
    → Resposta enviada via WebSocket/SSE
```

| Parâmetro | Valor | Justificação |
|-----------|-------|-------------|
| Tipo | Standard Queue | Ordem não é crítica para chat |
| Visibility timeout | 30 segundos | Tempo máximo para processar com IA |
| Message retention | 4 horas | Mensagens não processadas são eliminadas |
| Dead Letter Queue | `maslov-chat-dlq` | Mensagens que falham 3x são isoladas |
| Max receive count | 3 | Após 3 tentativas, move para DLQ |

**Fila 2: Envio de Emails (`maslov-email-queue`)**

Emails não devem bloquear a resposta ao utilizador:

```
Admin marca serviço como concluído
    → Lambda enfileira email na SQS
    → Lambda consumidor envia via SES
    → Se SES falhar, a mensagem volta à fila automaticamente
```

**Fila 3: Backups agendados (`maslov-backup-queue`)**

```
EventBridge (cron diário às 03:00)
    → Publica mensagem na SQS
    → Lambda executa pg_dump do RDS
    → Upload do backup para S3 (bucket de backups)
```

**Diagrama de arquitetura completo:**

```
┌─────────────────────────────────────────────────────────────┐
│                     UTILIZADORES                             │
│              (Clientes + Admin da Oficina)                    │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTPS
                       ▼
              ┌─────────────────┐
              │   CloudFront    │ ← Edge Locations (Lisboa, Madrid)
              │   (CDN)         │
              └────┬───────┬────┘
                   │       │
          Estático │       │ API
                   ▼       ▼
              ┌────────┐ ┌──────────────┐
              │   S3   │ │     ALB      │
              │Frontend│ │ Load Balancer│
              └────────┘ └──────┬───────┘
                                │
                    ┌───────────┼───────────┐
                    ▼           ▼           ▼
              ┌──────────┐ ┌──────────┐ ┌──────────┐
              │  Lambda  │ │  Lambda  │ │  Lambda  │
              │  Chat    │ │ Password │ │  Delete  │
              └────┬─────┘ └────┬─────┘ └────┬─────┘
                   │            │            │
                   │     ┌──────┴──────┐     │
                   │     ▼             ▼     │
                   │  ┌─────┐     ┌──────┐   │
                   │  │ SQS │     │Cognito│   │
                   │  │Email│     │ Auth  │   │
                   │  └──┬──┘     └──────┘   │
                   │     ▼                   │
                   │  ┌─────┐               │
                   │  │ SES │               │
                   │  │Email│               │
                   │  └─────┘               │
                   │                         │
                   └────────┬────────────────┘
                            ▼
                    ┌──────────────┐
                    │  RDS         │
                    │  PostgreSQL  │
                    │  (Multi-AZ)  │
                    └──────────────┘
                            │
                    ┌───────┴───────┐
                    ▼               ▼
              ┌──────────┐   ┌──────────┐
              │  AZ 1a   │   │  AZ 1b   │
              │ (Primary)│   │ (Replica)│
              └──────────┘   └──────────┘
```

---

## Resumo da Arquitetura

| Componente PAP | Serviço AWS | Tipo |
|----------------|-------------|------|
| Frontend React | S3 + CloudFront | Object Storage + CDN |
| Edge Functions | Lambda | Serverless Compute |
| PostgreSQL | RDS for PostgreSQL | Managed Database |
| Autenticação | Cognito | Identity Service |
| Chatbot IA | Lambda + Bedrock/API externa | AI + Serverless |
| Emails | SES | Email Service |
| Alertas | SNS + CloudWatch | Monitoring |
| Filas assíncronas | SQS | Message Queue |
| Rede | VPC + ALB + NAT Gateway | Networking |
| Segurança | IAM + Security Groups + KMS | Security |
| DNS | Route 53 | DNS Management |

**Custo estimado mensal (utilização leve de oficina):**

| Serviço | Estimativa | Nota |
|---------|-----------|------|
| S3 | ~€1 | Poucos GB de ficheiros estáticos |
| CloudFront | ~€2 | Tráfego reduzido |
| Lambda | ~€0-5 | Pay-per-use, free tier cobre muito |
| RDS (db.t3.micro Multi-AZ) | ~€25 | Maior custo fixo |
| SES | ~€1 | <1000 emails/mês |
| NAT Gateway | ~€35 | Custo fixo + dados processados |
| **Total estimado** | **~€65-70/mês** | |

**Nota:** O NAT Gateway é o componente mais caro. Uma alternativa para reduzir custos seria usar **VPC Endpoints** para serviços AWS (S3, RDS) em vez do NAT Gateway, eliminando esse custo para tráfego interno AWS.
