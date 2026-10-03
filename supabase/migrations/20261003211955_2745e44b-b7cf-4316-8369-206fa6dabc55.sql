DROP POLICY IF EXISTS "Anyone can view service types" ON public.custom_service_types;
CREATE POLICY "Signed-in users can view service types" ON public.custom_service_types FOR SELECT TO authenticated USING (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "Anyone can view car brands" ON public.custom_car_brands;
CREATE POLICY "Signed-in users can view car brands" ON public.custom_car_brands FOR SELECT TO authenticated USING (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "Anyone can view availability slots" ON public.availability_slots;
CREATE POLICY "Signed-in users can view availability slots" ON public.availability_slots FOR SELECT TO authenticated USING (auth.uid() IS NOT NULL);