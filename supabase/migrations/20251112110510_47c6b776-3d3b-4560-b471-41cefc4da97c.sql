-- Update the handle_new_user function to include phone number
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Insert into profiles
  INSERT INTO public.profiles (id, first_name, last_name, email, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', 'Utilizador'),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'phone', NULL)
  );
  
  -- Assign client role by default
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'client');
  
  RETURN NEW;
END;
$function$;