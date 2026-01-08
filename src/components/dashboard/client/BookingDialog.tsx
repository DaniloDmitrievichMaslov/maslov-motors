import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Wrench, Info, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { availableServices } from "@/lib/carData";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import SchedulingCalendar from "./SchedulingCalendar";

type Car = {
  id: string;
  marca: string;
  modelo: string;
  matricula: string;
};

type AvailabilitySlot = {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  max_bookings: number;
  current_bookings: number;
  is_available: boolean;
};

type BookingDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  userName: string;
  userPhone: string | null;
  cars: Car[];
};

export default function BookingDialog({ 
  open, 
  onOpenChange, 
  userId, 
  userName,
  userPhone,
  cars 
}: BookingDialogProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [selectedCar, setSelectedCar] = useState("");
  const [customService, setCustomService] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState("");
  const [step, setStep] = useState<"service" | "schedule">("service");

  const selectedServiceData = availableServices.find(s => s.id === selectedService);
  const isOtherService = selectedService === "outro";

  const handleSlotSelect = (slot: AvailabilitySlot, date: Date) => {
    setSelectedSlot(slot);
    setSelectedDate(date);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCar) {
      toast({
        variant: "destructive",
        title: "Selecione um carro",
        description: "Por favor, selecione o carro para a marcação.",
      });
      return;
    }

    if (!selectedService) {
      toast({
        variant: "destructive",
        title: "Selecione um serviço",
        description: "Por favor, selecione o tipo de serviço desejado.",
      });
      return;
    }

    if (isOtherService && !customService.trim()) {
      toast({
        variant: "destructive",
        title: "Descreva o serviço",
        description: "Por favor, descreva o serviço que precisa.",
      });
      return;
    }

    if (!selectedSlot || !selectedDate) {
      toast({
        variant: "destructive",
        title: "Selecione um horário",
        description: "Por favor, escolha uma data e horário disponível.",
      });
      return;
    }

    setLoading(true);

    try {
      const serviceName = isOtherService ? customService : selectedServiceData?.name;
      const car = cars.find(c => c.id === selectedCar);
      
      const message = `
🚗 Marcação de Serviço

Carro: ${car?.marca} ${car?.modelo} (${car?.matricula})
Serviço: ${serviceName}
Data: ${format(selectedDate, "d 'de' MMMM 'de' yyyy", { locale: pt })}
Horário: ${selectedSlot.start_time.slice(0, 5)}
${notes ? `Notas: ${notes}` : ''}
      `.trim();

      const { error } = await supabase.from("quote_requests").insert([
        {
          user_id: userId,
          client_name: userName,
          client_phone: userPhone || "Não disponível",
          message: message,
          status: "pendente",
          slot_id: selectedSlot.id,
          preferred_date: selectedSlot.date,
          preferred_time: selectedSlot.start_time,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Marcação confirmada!",
        description: `Agendado para ${format(selectedDate, "d 'de' MMMM", { locale: pt })} às ${selectedSlot.start_time.slice(0, 5)}`,
      });

      // Reset form
      setSelectedService("");
      setSelectedCar("");
      setCustomService("");
      setSelectedSlot(null);
      setSelectedDate(null);
      setNotes("");
      setStep("service");
      onOpenChange(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao enviar marcação",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setStep("service");
      setSelectedSlot(null);
      setSelectedDate(null);
    }
    onOpenChange(open);
  };

  const canProceedToSchedule = selectedCar && selectedService && (!isOtherService || customService.trim());

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            Fazer Marcação
          </DialogTitle>
          <DialogDescription>
            {step === "service" 
              ? "Escolha o serviço desejado" 
              : "Selecione a data e horário"}
          </DialogDescription>
        </DialogHeader>

        {step === "service" ? (
          <div className="space-y-6">
            {/* Seleção de Carro */}
            <div className="space-y-2">
              <Label htmlFor="car" className="text-base font-medium">Selecione o Carro</Label>
              {cars.length === 0 ? (
                <Card className="p-4 bg-muted/50 border-dashed">
                  <p className="text-sm text-muted-foreground">
                    Ainda não tem carros registados. Adicione um carro primeiro.
                  </p>
                </Card>
              ) : (
                <Select value={selectedCar} onValueChange={setSelectedCar}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Escolha o seu carro" />
                  </SelectTrigger>
                  <SelectContent>
                    {cars.map((car) => (
                      <SelectItem key={car.id} value={car.id}>
                        {car.marca} {car.modelo} - {car.matricula}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Seleção de Serviço */}
            <div className="space-y-2">
              <Label htmlFor="service" className="text-base font-medium">Tipo de Serviço</Label>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Escolha o serviço" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {availableServices.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{service.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedServiceData && !isOtherService && (
                <Card className="p-3 bg-primary/5 border-primary/20">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">{selectedServiceData.name}</p>
                      <p className="text-xs text-muted-foreground">{selectedServiceData.description}</p>
                    </div>
                  </div>
                </Card>
              )}

              {isOtherService && (
                <div className="space-y-2 animate-fade-in">
                  <Label htmlFor="customService">Descreva o serviço que precisa</Label>
                  <Textarea
                    id="customService"
                    value={customService}
                    onChange={(e) => setCustomService(e.target.value)}
                    placeholder="Ex: Tenho um barulho estranho no motor..."
                    rows={3}
                    className="resize-none"
                  />
                </div>
              )}
            </div>

            {/* Notas Adicionais */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-base font-medium">
                Notas Adicionais <Badge variant="secondary" className="ml-2 text-xs">Opcional</Badge>
              </Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Informações adicionais que possam ser úteis..."
                rows={2}
                className="resize-none"
              />
            </div>

            {/* Botões */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => handleClose(false)}>
                Cancelar
              </Button>
              <Button 
                onClick={() => setStep("schedule")}
                disabled={!canProceedToSchedule || cars.length === 0}
              >
                <Clock className="mr-2 h-4 w-4" />
                Escolher Horário
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Summary */}
            <Card className="p-4 bg-muted/30">
              <div className="text-sm space-y-1">
                <p><span className="text-muted-foreground">Carro:</span> {cars.find(c => c.id === selectedCar)?.marca} {cars.find(c => c.id === selectedCar)?.modelo}</p>
                <p><span className="text-muted-foreground">Serviço:</span> {isOtherService ? customService : selectedServiceData?.name}</p>
              </div>
            </Card>

            {/* Calendar */}
            <SchedulingCalendar
              onSlotSelect={handleSlotSelect}
              selectedSlotId={selectedSlot?.id}
            />

            {/* Selected Slot Display */}
            {selectedSlot && selectedDate && (
              <Card className="p-4 bg-success/10 border-success/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-success/20 rounded-full">
                    <Clock className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {format(selectedDate, "EEEE, d 'de' MMMM", { locale: pt })}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      às {selectedSlot.start_time.slice(0, 5)}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Botões */}
            <div className="flex justify-between gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => setStep("service")}>
                Voltar
              </Button>
              <Button 
                type="submit" 
                disabled={loading || !selectedSlot}
              >
                {loading ? (
                  <>
                    <Wrench className="mr-2 h-4 w-4 animate-spin" />
                    A enviar...
                  </>
                ) : (
                  <>
                    <Calendar className="mr-2 h-4 w-4" />
                    Confirmar Marcação
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
