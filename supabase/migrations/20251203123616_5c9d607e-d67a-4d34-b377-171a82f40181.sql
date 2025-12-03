-- Add UPDATE policy for users to update their own cars
CREATE POLICY "Users can update their own cars" 
ON public.cars 
FOR UPDATE 
USING (auth.uid() = owner_id) 
WITH CHECK (auth.uid() = owner_id);