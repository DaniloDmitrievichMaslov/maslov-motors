-- Create availability slots table for managing workshop schedule
CREATE TABLE public.availability_slots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  max_bookings INTEGER NOT NULL DEFAULT 2,
  current_bookings INTEGER NOT NULL DEFAULT 0,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(date, start_time)
);

-- Enable RLS
ALTER TABLE public.availability_slots ENABLE ROW LEVEL SECURITY;

-- Everyone can view available slots
CREATE POLICY "Anyone can view availability slots"
ON public.availability_slots
FOR SELECT
USING (true);

-- Only admins can manage slots
CREATE POLICY "Admins can insert availability slots"
ON public.availability_slots
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update availability slots"
ON public.availability_slots
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete availability slots"
ON public.availability_slots
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add slot_id to quote_requests for linking bookings to slots
ALTER TABLE public.quote_requests 
ADD COLUMN slot_id UUID REFERENCES public.availability_slots(id),
ADD COLUMN preferred_date DATE,
ADD COLUMN preferred_time TIME;

-- Create trigger to update availability slot booking count
CREATE OR REPLACE FUNCTION public.update_slot_booking_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.slot_id IS NOT NULL THEN
    UPDATE public.availability_slots 
    SET current_bookings = current_bookings + 1,
        is_available = CASE WHEN current_bookings + 1 < max_bookings THEN true ELSE false END
    WHERE id = NEW.slot_id;
  ELSIF TG_OP = 'DELETE' AND OLD.slot_id IS NOT NULL THEN
    UPDATE public.availability_slots 
    SET current_bookings = GREATEST(current_bookings - 1, 0),
        is_available = true
    WHERE id = OLD.slot_id;
  ELSIF TG_OP = 'UPDATE' AND OLD.slot_id IS DISTINCT FROM NEW.slot_id THEN
    -- Decrement old slot
    IF OLD.slot_id IS NOT NULL THEN
      UPDATE public.availability_slots 
      SET current_bookings = GREATEST(current_bookings - 1, 0),
          is_available = true
      WHERE id = OLD.slot_id;
    END IF;
    -- Increment new slot
    IF NEW.slot_id IS NOT NULL THEN
      UPDATE public.availability_slots 
      SET current_bookings = current_bookings + 1,
          is_available = CASE WHEN current_bookings + 1 < max_bookings THEN true ELSE false END
      WHERE id = NEW.slot_id;
    END IF;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER update_slot_count_on_booking
AFTER INSERT OR UPDATE OR DELETE ON public.quote_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_slot_booking_count();

-- Create updated_at trigger for availability_slots
CREATE TRIGGER update_availability_slots_updated_at
BEFORE UPDATE ON public.availability_slots
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();