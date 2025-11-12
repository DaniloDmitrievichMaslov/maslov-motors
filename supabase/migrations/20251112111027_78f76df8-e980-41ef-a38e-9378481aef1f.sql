-- Remover a coluna profit gerada automaticamente
ALTER TABLE services DROP COLUMN profit;

-- Adicionar a coluna profit com a fórmula correta: final_price - parts_cost
ALTER TABLE services 
ADD COLUMN profit numeric GENERATED ALWAYS AS (final_price - parts_cost) STORED;