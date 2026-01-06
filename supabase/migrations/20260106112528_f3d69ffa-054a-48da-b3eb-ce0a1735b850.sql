-- Add mileage_at_service column to track km when service was performed
ALTER TABLE public.services 
ADD COLUMN mileage_at_service integer;