import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Wrench, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { availableServices } from "@/lib/carData";
import { Badge } from "@/components/ui/badge";

type Car = {
  id: string;
  marca: string;
  modelo: string;
  matricula: string;
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
  const [preferredDate, setPreferredDate] = useState("");
  const [notes, setNotes] = useState("");

  const selectedServiceData = availableServices.find(s => s.id === selectedService);
  const isOtherService = selectedService === "outro";

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

    if (!preferredDate) {
      toast({
        variant: "destructive",
        title: "Selecione uma data",
        description: "Por favor, selecione a data preferida para a marcação.",
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
${preferredDate ? `Data Preferida: ${new Date(preferredDate).toLocaleDateString('pt-PT')}` : ''}
${notes ? `Notas: ${notes}` : ''}
      `.trim();

      const { error } = await supabase.from("quote_requests").insert([
        {
          user_id: userId,
          client_name: userName,
          client_phone: userPhone || "Não disponível",
          message: message,
          status: "pendente",
        },
      ]);

      if (error) throw error;

      toast({
        title: "Marcação enviada!",
        description: "Entraremos em contacto em breve para confirmar a sua marcação.",
      });

      // Reset form
      setSelectedService("");
      setSelectedCar("");
      setCustomService("");
      setPreferredDate("");
      setNotes("");
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            Fazer Marcação
          </DialogTitle>
          <DialogDescription>
            Escolha o serviço desejado e agende a sua visita à oficina
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
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

            {/* Descrição do serviço selecionado */}
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

            {/* Campo para serviço personalizado */}
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

          {/* Data Preferida */}
          <div className="space-y-2">
            <Label htmlFor="date" className="text-base font-medium">Data Preferida</Label>
            <Input
              id="date"
              type="date"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="h-12"
              required
            />
            <p className="text-xs text-muted-foreground">
              Iremos confirmar a disponibilidade e contactá-lo
            </p>
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
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={loading || cars.length === 0}
              className="min-w-[140px]"
            >
              {loading ? (
                <>
                  <Wrench className="mr-2 h-4 w-4 animate-spin" />
                  A enviar...
                </>
              ) : (
                <>
                  <Calendar className="mr-2 h-4 w-4" />
                  Fazer Marcação
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
