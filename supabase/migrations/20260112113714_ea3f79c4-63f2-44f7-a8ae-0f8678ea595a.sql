-- Tabela para marcas de carros personalizadas pelo admin
CREATE TABLE public.custom_car_brands (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  brand_name TEXT NOT NULL UNIQUE,
  models TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela para tipos de serviços personalizados pelo admin
CREATE TABLE public.custom_service_types (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  default_description TEXT,
  default_parts_used TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.custom_car_brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_service_types ENABLE ROW LEVEL SECURITY;

-- Políticas para custom_car_brands
CREATE POLICY "Anyone can view car brands"
  ON public.custom_car_brands FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert car brands"
  ON public.custom_car_brands FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update car brands"
  ON public.custom_car_brands FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete car brands"
  ON public.custom_car_brands FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Políticas para custom_service_types
CREATE POLICY "Anyone can view service types"
  ON public.custom_service_types FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert service types"
  ON public.custom_service_types FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update service types"
  ON public.custom_service_types FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete service types"
  ON public.custom_service_types FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Triggers para atualizar updated_at
CREATE TRIGGER update_custom_car_brands_updated_at
  BEFORE UPDATE ON public.custom_car_brands
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_custom_service_types_updated_at
  BEFORE UPDATE ON public.custom_service_types
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();