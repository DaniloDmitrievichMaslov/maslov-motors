import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Info } from "lucide-react";
import { availableServices } from "@/lib/carData";
import { Card } from "@/components/ui/card";

type AddServiceDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onServiceAdded: () => void;
};

type Client = {
  id: string;
  first_name: string;
  last_name: string;
};

type Car = {
  id: string;
  marca: string;
  modelo: string;
  matricula: string;
  quilometragem: number;
};

export default function AddServiceDialog({ open, onOpenChange, onServiceAdded }: AddServiceDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedCar, setSelectedCar] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [customService, setCustomService] = useState("");

  const selectedServiceData = availableServices.find(s => s.id === selectedService);
  const isOtherService = selectedService === "outro";

  useEffect(() => {
    if (open) {
      fetchClients();
    }
  }, [open]);

  useEffect(() => {
    if (selectedClient) {
      fetchClientCars(selectedClient);
    } else {
      setCars([]);
      setSelectedCar("");
    }
  }, [selectedClient]);

  const fetchClients = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, first_name, last_name")
      .order("first_name");

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro ao carregar clientes",
        description: error.message,
      });
    } else {
      setClients(data || []);
    }
  };

  const fetchClientCars = async (clientId: string) => {
    const { data, error } = await supabase
      .from("cars")
      .select("id, marca, modelo, matricula, quilometragem")
      .eq("owner_id", clientId);

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro ao carregar carros",
        description: error.message,
      });
    } else {
      setCars(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const serviceName = isOtherService ? customService : selectedServiceData?.name;
    
    if (!serviceName) {
      toast({
        variant: "destructive",
        title: "Selecione um serviço",
        description: "Por favor, selecione ou descreva o tipo de serviço.",
      });
      return;
    }

    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const workHours = parseFloat(formData.get("work_hours") as string) || 0;
    const costPerHour = parseFloat(formData.get("cost_per_hour") as string) || 0;
    const partsCost = parseFloat(formData.get("parts_cost") as string) || 0;

    const mileageAtService = parseInt(formData.get("mileage_at_service") as string) || null;

    try {
      const { error } = await supabase.from("services").insert({
        car_id: selectedCar,
        service_name: serviceName,
        scheduled_date: formData.get("scheduled_date") as string,
        status: formData.get("status") as "agendado" | "em_processo" | "concluido",
        description: formData.get("description") as string || null,
        parts_used: formData.get("parts_used") as string || null,
        parts_cost: partsCost,
        work_hours: workHours,
        cost_per_hour: costPerHour,
        next_revision_date: formData.get("next_revision_date") as string || null,
        recommendations: formData.get("recommendations") as string || null,
        mileage_at_service: mileageAtService,
      });

      if (error) throw error;

      toast({
        title: "Serviço criado com sucesso!",
      });

      // Reset form
      setSelectedService("");
      setCustomService("");
      setSelectedClient("");
      setSelectedCar("");

      onServiceAdded();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao criar serviço",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Novo Serviço</DialogTitle>
          <DialogDescription>
            Preencha os detalhes do serviço a realizar. Escolha "Outro" se o serviço não estiver na lista.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="client">Cliente</Label>
              <Select value={selectedClient} onValueChange={setSelectedClient} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.first_name} {client.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="car">Carro</Label>
              <Select value={selectedCar} onValueChange={setSelectedCar} required disabled={!selectedClient}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o carro" />
                </SelectTrigger>
                <SelectContent>
                  {cars.map((car) => (
                    <SelectItem key={car.id} value={car.id}>
                      {car.marca} {car.modelo} ({car.matricula})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tipo de Serviço */}
            <div className="grid gap-2">
              <Label htmlFor="service_type">Tipo de Serviço</Label>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o serviço" />
                </SelectTrigger>
                <SelectContent className="max-h-[250px]">
                  {availableServices.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name}
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
                <Input
                  placeholder="Descreva o serviço"
                  value={customService}
                  onChange={(e) => setCustomService(e.target.value)}
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="scheduled_date">Data/Hora Agendada</Label>
                <Input id="scheduled_date" name="scheduled_date" type="datetime-local" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select name="status" defaultValue="agendado" required>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agendado">Agendado</SelectItem>
                    <SelectItem value="em_processo">Em Processo</SelectItem>
                    <SelectItem value="concluido">Concluído</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="mileage_at_service">Quilometragem Atual (km)</Label>
              <Input 
                id="mileage_at_service" 
                name="mileage_at_service" 
                type="number" 
                min="0"
                defaultValue={cars.find(c => c.id === selectedCar)?.quilometragem || ""}
                placeholder="Km do veículo no momento do serviço"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Descrição Adicional</Label>
              <Textarea id="description" name="description" placeholder="Detalhes adicionais do serviço..." />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="parts_used">Peças Utilizadas</Label>
              <Textarea id="parts_used" name="parts_used" placeholder="Lista de peças..." />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="parts_cost">Custo das Peças (€)</Label>
                <Input id="parts_cost" name="parts_cost" type="number" step="0.01" min="0" defaultValue="0" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="work_hours">Horas de Trabalho</Label>
                <Input id="work_hours" name="work_hours" type="number" step="0.5" min="0" defaultValue="0" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="cost_per_hour">Custo por Hora (€)</Label>
                <Input id="cost_per_hour" name="cost_per_hour" type="number" step="0.01" min="0" defaultValue="0" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="final_price">Preço Final (€)</Label>
                <Input id="final_price" name="final_price" type="number" step="0.01" min="0" required />
              </div>
            </div>

            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm font-medium text-muted-foreground">
                A margem será calculada automaticamente:
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Margem = Preço Final - Custo das Peças
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="next_revision_date">Próxima Revisão Recomendada</Label>
              <Input id="next_revision_date" name="next_revision_date" type="date" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="recommendations">Recomendações</Label>
              <Textarea id="recommendations" name="recommendations" placeholder="Recomendações para o cliente..." />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  A criar...
                </>
              ) : (
                "Criar Serviço"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
