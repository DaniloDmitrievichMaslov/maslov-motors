DROP POLICY IF EXISTS "Users can insert their own quote requests" ON public.quote_requests;

CREATE POLICY "Users can insert their own quote requests"
ON public.quote_requests
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);