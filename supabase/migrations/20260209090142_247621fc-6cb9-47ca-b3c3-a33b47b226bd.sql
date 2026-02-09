-- Fix 1: Add explicit policies to user_roles table for admin management
-- This provides defense-in-depth and makes security intent explicit

CREATE POLICY "Admins can insert roles"
  ON public.user_roles FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update roles"
  ON public.user_roles FOR UPDATE
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
  ON public.user_roles FOR DELETE
  USING (has_role(auth.uid(), 'admin'));

-- Fix 2: The profiles table already has proper RLS policies that restrict access to:
-- - Users viewing their own profile (auth.uid() = id)
-- - Admins viewing all profiles (has_role check)
-- The current policies are secure - there is no public/anonymous access policy.
-- Adding an explicit denial for extra safety:

CREATE POLICY "Deny anonymous access to profiles"
  ON public.profiles FOR SELECT
  TO anon
  USING (false);