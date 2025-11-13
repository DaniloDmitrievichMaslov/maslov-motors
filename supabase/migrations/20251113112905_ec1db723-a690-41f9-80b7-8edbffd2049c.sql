-- Primeiro, remover a coluna profit gerada e recriar final_price como coluna gerada
ALTER TABLE public.services 
DROP COLUMN IF EXISTS profit;

-- Remover a coluna final_price atual e recriá-la como coluna gerada
ALTER TABLE public.services 
DROP COLUMN final_price;

ALTER TABLE public.services 
ADD COLUMN final_price numeric GENERATED ALWAYS AS (
  COALESCE(work_hours, 0) * COALESCE(cost_per_hour, 0) + COALESCE(parts_cost, 0)
) STORED;

-- Recriar a coluna profit como antes
ALTER TABLE public.services 
ADD COLUMN profit numeric GENERATED ALWAYS AS (
  (COALESCE(work_hours, 0) * COALESCE(cost_per_hour, 0) + COALESCE(parts_cost, 0)) - COALESCE(parts_cost, 0)
) STORED;