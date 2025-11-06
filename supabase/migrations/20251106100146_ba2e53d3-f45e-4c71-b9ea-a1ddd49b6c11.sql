-- Adicionar política para clientes poderem inserir seus próprios carros
CREATE POLICY "Users can insert their own cars"
ON public.cars
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = owner_id);

-- Adicionar política para admin poder ver perfis dos clientes
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));