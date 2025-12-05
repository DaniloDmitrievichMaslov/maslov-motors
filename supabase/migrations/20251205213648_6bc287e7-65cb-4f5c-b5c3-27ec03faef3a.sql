-- Allow admins to delete quote requests
CREATE POLICY "Admins can delete quote requests"
ON public.quote_requests
FOR DELETE
USING (EXISTS (
  SELECT 1 FROM user_roles
  WHERE user_roles.user_id = auth.uid()
  AND user_roles.role = 'admin'::app_role
));