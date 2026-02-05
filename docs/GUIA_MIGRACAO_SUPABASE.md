# GUIA DE MIGRAÇÃO COMPLETA PARA SUPABASE PRÓPRIO

Este guia explica como tornar o projeto Maslov Motors **100% independente** do Lovable Cloud, migrando para uma conta Supabase pessoal.

---

## ÍNDICE

1. [Criar Conta Supabase](#1-criar-conta-supabase)
2. [Criar Novo Projeto](#2-criar-novo-projeto)
3. [Configurar Base de Dados](#3-configurar-base-de-dados)
4. [Migrar Edge Functions](#4-migrar-edge-functions)
5. [Exportar Código do Lovable](#5-exportar-código-do-lovable)
6. [Configurar Variáveis de Ambiente](#6-configurar-variáveis-de-ambiente)
7. [Executar Localmente](#7-executar-localmente)
8. [Verificar Funcionamento](#8-verificar-funcionamento)

---

## 1. CRIAR CONTA SUPABASE

1. Acede a **https://supabase.com**
2. Clica em **"Start your project"** ou **"Sign Up"**
3. Podes criar conta com:
   - GitHub (recomendado)
   - Email e password
4. Confirma o email se necessário

---

## 2. CRIAR NOVO PROJETO

1. No dashboard do Supabase, clica em **"New Project"**
2. Preenche os dados:
   - **Name:** `maslov-motors` (ou outro nome)
   - **Database Password:** Escolhe uma password forte (GUARDA-A!)
   - **Region:** Escolhe `West EU (Ireland)` para menor latência em Portugal
3. Clica em **"Create new project"**
4. Aguarda ~2 minutos enquanto o projeto é criado

---

## 3. CONFIGURAR BASE DE DADOS

### 3.1. Aceder ao SQL Editor

1. No menu lateral, clica em **"SQL Editor"**
2. Clica em **"New query"**

### 3.2. Criar Tipos Personalizados

Cola e executa este SQL primeiro:

```sql
-- Criar tipos enum
CREATE TYPE public.app_role AS ENUM ('admin', 'client');
CREATE TYPE public.service_status AS ENUM ('agendado', 'em_processo', 'concluido');
```

### 3.3. Criar Tabelas

Cola e executa este SQL:

```sql
-- Tabela de perfis
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Tabela de roles
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'client',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(user_id)
);

-- Tabela de carros
CREATE TABLE public.cars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  marca TEXT NOT NULL,
  modelo TEXT NOT NULL,
  matricula TEXT NOT NULL UNIQUE,
  ano INTEGER NOT NULL,
  cor TEXT NOT NULL,
  quilometragem INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Tabela de serviços
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  car_id UUID NOT NULL REFERENCES public.cars(id) ON DELETE CASCADE,
  service_name TEXT NOT NULL,
  description TEXT,
  scheduled_date TIMESTAMPTZ NOT NULL,
  status service_status NOT NULL DEFAULT 'agendado',
  work_hours NUMERIC DEFAULT 0,
  cost_per_hour NUMERIC DEFAULT 0,
  parts_cost NUMERIC DEFAULT 0,
  parts_used TEXT,
  final_price NUMERIC,
  margin NUMERIC,
  mileage_at_service INTEGER,
  recommendations TEXT,
  next_revision_date DATE,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Tabela de pedidos de orçamento
CREATE TABLE public.quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  client_name TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  message TEXT NOT NULL,
  preferred_date DATE,
  preferred_time TIME,
  status TEXT NOT NULL DEFAULT 'pendente',
  slot_id UUID,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Tabela de disponibilidade
CREATE TABLE public.availability_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  max_bookings INTEGER NOT NULL DEFAULT 2,
  current_bookings INTEGER NOT NULL DEFAULT 0,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Tabela de marcas personalizadas
CREATE TABLE public.custom_car_brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_name TEXT NOT NULL UNIQUE,
  models TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Tabela de tipos de serviço
CREATE TABLE public.custom_service_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  default_description TEXT,
  default_parts_used TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
```

### 3.4. Criar Funções

```sql
-- Função para verificar role
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Função para criar perfil automaticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, email, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', 'Utilizador'),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'phone', NULL)
  );
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'client');
  
  RETURN NEW;
END;
$$;

-- Função para atualizar contagem de slots
CREATE OR REPLACE FUNCTION public.update_slot_booking_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.slot_id IS NOT NULL THEN
    UPDATE public.availability_slots 
    SET current_bookings = current_bookings + 1,
        is_available = CASE WHEN current_bookings + 1 < max_bookings THEN true ELSE false END
    WHERE id = NEW.slot_id;
  ELSIF TG_OP = 'DELETE' AND OLD.slot_id IS NOT NULL THEN
    UPDATE public.availability_slots 
    SET current_bookings = GREATEST(current_bookings - 1, 0),
        is_available = true
    WHERE id = OLD.slot_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$;
```

### 3.5. Criar Triggers

```sql
-- Trigger para novos utilizadores
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Triggers para updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cars_updated_at
  BEFORE UPDATE ON public.cars
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_quote_requests_updated_at
  BEFORE UPDATE ON public.quote_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger para slots
CREATE TRIGGER update_slot_on_quote_change
  AFTER INSERT OR UPDATE OR DELETE ON public.quote_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_slot_booking_count();
```

### 3.6. Configurar Row Level Security (RLS)

```sql
-- Ativar RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.availability_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_car_brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_service_types ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (has_role(auth.uid(), 'admin'));

-- Políticas para user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- Políticas para cars
CREATE POLICY "Users can view their own cars" ON public.cars
  FOR SELECT USING (auth.uid() = owner_id);
CREATE POLICY "Users can insert their own cars" ON public.cars
  FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Users can update their own cars" ON public.cars
  FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Admins can view all cars" ON public.cars
  FOR SELECT USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert cars" ON public.cars
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update cars" ON public.cars
  FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete cars" ON public.cars
  FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- Políticas para services
CREATE POLICY "Users can view services for their cars" ON public.services
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM cars WHERE cars.id = services.car_id AND cars.owner_id = auth.uid()
  ));
CREATE POLICY "Admins can view all services" ON public.services
  FOR SELECT USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert services" ON public.services
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update services" ON public.services
  FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete services" ON public.services
  FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- Políticas para quote_requests
CREATE POLICY "Users can view their own quote requests" ON public.quote_requests
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own quote requests" ON public.quote_requests
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all quote requests" ON public.quote_requests
  FOR SELECT USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update quote requests" ON public.quote_requests
  FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete quote requests" ON public.quote_requests
  FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- Políticas para availability_slots
CREATE POLICY "Anyone can view availability slots" ON public.availability_slots
  FOR SELECT USING (true);
CREATE POLICY "Admins can insert availability slots" ON public.availability_slots
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update availability slots" ON public.availability_slots
  FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete availability slots" ON public.availability_slots
  FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- Políticas para custom_car_brands
CREATE POLICY "Anyone can view car brands" ON public.custom_car_brands
  FOR SELECT USING (true);
CREATE POLICY "Admins can insert car brands" ON public.custom_car_brands
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update car brands" ON public.custom_car_brands
  FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete car brands" ON public.custom_car_brands
  FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- Políticas para custom_service_types
CREATE POLICY "Anyone can view service types" ON public.custom_service_types
  FOR SELECT USING (true);
CREATE POLICY "Admins can insert service types" ON public.custom_service_types
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update service types" ON public.custom_service_types
  FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete service types" ON public.custom_service_types
  FOR DELETE USING (has_role(auth.uid(), 'admin'));
```

---

## 4. MIGRAR EDGE FUNCTIONS

### 4.1. Instalar Supabase CLI

No teu computador, abre o terminal e executa:

```bash
# Windows (PowerShell como Admin)
scoop install supabase

# macOS
brew install supabase/tap/supabase

# Linux
brew install supabase/tap/supabase
```

### 4.2. Fazer Login no Supabase

```bash
supabase login
```

Isto abre o browser para autenticares.

### 4.3. Inicializar Projeto Local

Na pasta do projeto:

```bash
supabase init
```

### 4.4. Linkar ao Projeto Remoto

```bash
supabase link --project-ref SEU_PROJECT_ID
```

O `PROJECT_ID` encontra-se em **Project Settings > General** no dashboard do Supabase.

### 4.5. Criar Edge Functions

O projeto tem 3 edge functions. Cria-as:

```bash
supabase functions new chat-assistant
supabase functions new delete-user
supabase functions new update-password
```

### 4.6. Copiar Código das Edge Functions

Copia o conteúdo dos ficheiros em `supabase/functions/` do projeto Lovable para as novas pastas criadas.

### 4.7. Configurar Secrets

```bash
# Se usares a API da Lovable para o chatbot
supabase secrets set LOVABLE_API_KEY=your_api_key
```

### 4.8. Deploy das Edge Functions

```bash
supabase functions deploy chat-assistant
supabase functions deploy delete-user
supabase functions deploy update-password
```

---

## 5. EXPORTAR CÓDIGO DO LOVABLE

### 5.1. Conectar ao GitHub

1. No Lovable, vai a **Settings** (ícone de engrenagem)
2. Clica em **GitHub**
3. Autoriza o Lovable a aceder à tua conta GitHub
4. Cria um novo repositório (ex: `maslov-motors`)
5. O código será automaticamente enviado

### 5.2. Clonar o Repositório

```bash
git clone https://github.com/SEU_USERNAME/maslov-motors.git
cd maslov-motors
```

---

## 6. CONFIGURAR VARIÁVEIS DE AMBIENTE

### 6.1. Obter Credenciais do Supabase

No dashboard do Supabase:
1. Vai a **Project Settings** (ícone de engrenagem)
2. Clica em **API**
3. Copia:
   - **Project URL** (ex: `https://xxxxx.supabase.co`)
   - **anon public key** (chave longa começando com `eyJ...`)

### 6.2. Criar Ficheiro .env

Na raiz do projeto, cria um ficheiro `.env`:

```env
VITE_SUPABASE_URL=https://SEU_PROJECT_ID.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SUPABASE_PROJECT_ID=SEU_PROJECT_ID
```

**IMPORTANTE:** Substitui pelos teus valores reais!

### 6.3. Atualizar Cliente Supabase (se necessário)

Verifica que o ficheiro `src/integrations/supabase/client.ts` usa as variáveis de ambiente:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

---

## 7. EXECUTAR LOCALMENTE

### 7.1. Instalar Dependências

```bash
npm install
```

### 7.2. Iniciar Servidor de Desenvolvimento

```bash
npm run dev
```

### 7.3. Aceder à Aplicação

Abre o browser em: **http://localhost:5173**

---

## 8. VERIFICAR FUNCIONAMENTO

### 8.1. Testar Registo

1. Acede à página de login
2. Cria uma nova conta
3. Verifica se o utilizador aparece no dashboard do Supabase (Authentication > Users)

### 8.2. Testar Funcionalidades

- [ ] Registo de utilizador
- [ ] Login/Logout
- [ ] Adicionar carro
- [ ] Ver histórico de serviços
- [ ] Pedir orçamento
- [ ] Chatbot (se configuraste a API key)

### 8.3. Criar Utilizador Admin (IMPORTANTE!)

Para teres acesso ao painel de administração, executa este SQL no Supabase:

```sql
-- Substitui 'EMAIL_DO_UTILIZADOR' pelo email da conta que queres tornar admin
UPDATE public.user_roles 
SET role = 'admin' 
WHERE user_id = (
  SELECT id FROM auth.users WHERE email = 'EMAIL_DO_UTILIZADOR'
);
```

---

## CHECKLIST FINAL

- [ ] Conta Supabase criada
- [ ] Projeto criado no Supabase
- [ ] Todas as tabelas criadas
- [ ] Funções e triggers criados
- [ ] Políticas RLS configuradas
- [ ] Edge Functions deployadas (opcional)
- [ ] Código exportado para GitHub
- [ ] Repositório clonado localmente
- [ ] Ficheiro .env configurado
- [ ] Aplicação a correr localmente
- [ ] Utilizador admin criado

---

## PROBLEMAS COMUNS

### "Invalid API key"
- Verifica se copiaste a chave corretamente
- Verifica se o ficheiro .env está na raiz do projeto
- Reinicia o servidor (`npm run dev`)

### "Permission denied" (RLS)
- Verifica se as políticas RLS estão corretas
- Verifica se o utilizador está autenticado

### Edge Functions não funcionam
- Verifica se foram deployadas: `supabase functions list`
- Verifica os logs: `supabase functions logs chat-assistant`

### Chatbot não responde
- Verifica se a LOVABLE_API_KEY está configurada
- Ou configura outra API de IA (OpenAI, etc.)

---

## NOTAS PARA A APRESENTAÇÃO

1. **Antes da apresentação:**
   - Testa tudo no dia anterior
   - Cria contas de teste (1 cliente + 1 admin)
   - Verifica a internet no local

2. **Backup:**
   - Guarda screenshots de todas as funcionalidades
   - Grava um vídeo de demonstração como backup
   - Leva os dados de acesso escritos

3. **Durante a apresentação:**
   - Se algo falhar, mostra os screenshots/vídeo
   - Explica que tens a versão local como demonstração

---

**Boa sorte com a apresentação! 🚀**
