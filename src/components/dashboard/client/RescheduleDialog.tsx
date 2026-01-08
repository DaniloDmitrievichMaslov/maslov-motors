import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Loader2, Check } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import SchedulingCalendar from "./SchedulingCalendar";

type AvailabilitySlot = {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  max_bookings: number;
  current_bookings: number;
  is_available: boolean;
};

type Booking = {
  id: string;
  message: string;
  slot_id: string | null;
};

type RescheduleDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  booking: Booking;
  onComplete: () => void;
};

export default function RescheduleDialog({ 
  open, 
  onOpenChange, 
  booking, 
  onComplete 
}: RescheduleDialogProps) {
  const { toast } = useToast();
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSlotSelect = (slot: AvailabilitySlot, date: Date) => {
    setSelectedSlot(slot);
    setSelectedDate(date);
  };

  const handleConfirm = async () => {
    if (!selectedSlot || !selectedDate) return;

    setLoading(true);
    
    const { error } = await supabase
      .from("quote_requests")
      .update({
        slot_id: selectedSlot.id,
        preferred_date: selectedSlot.date,
        preferred_time: selectedSlot.start_time,
        status: "pendente",
      })
      .eq("id", booking.id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro ao reagendar",
        description: error.message,
      });
    } else {
      toast({
        title: "Marcação reagendada!",
        description: `Nova data: ${format(selectedDate, "d 'de' MMMM", { locale: pt })} às ${selectedSlot.start_time.slice(0, 5)}`,
      });
      onComplete();
    }

    setLoading(false);
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setSelectedSlot(null);
      setSelectedDate(null);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Reagendar Marcação
          </DialogTitle>
          <DialogDescription>
            Escolha uma nova data e horário para a sua marcação
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <SchedulingCalendar
            onSlotSelect={handleSlotSelect}
            selectedSlotId={selectedSlot?.id}
          />
        </div>

        {selectedSlot && selectedDate && (
          <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
            <p className="text-sm font-medium mb-1">Nova data selecionada:</p>
            <p className="text-lg font-semibold text-primary">
              {format(selectedDate, "EEEE, d 'de' MMMM", { locale: pt })} às {selectedSlot.start_time.slice(0, 5)}
            </p>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => handleClose(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedSlot || loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Check className="h-4 w-4 mr-2" />
            )}
            Confirmar Reagendamento
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
