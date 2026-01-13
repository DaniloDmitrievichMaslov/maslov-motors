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
import { Loader2, Info, Calculator } from "lucide-react";
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

type CustomServiceType = {
  id: string;
  name: string;
  description: string | null;
  default_description: string | null;
  default_parts_used: string | null;
};

export default function AddServiceDialog({ open, onOpenChange, onServiceAdded }: AddServiceDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [customServiceTypes, setCustomServiceTypes] = useState<CustomServiceType[]>([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedCar, setSelectedCar] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [customService, setCustomService] = useState("");

  // Form values for controlled inputs
  const [description, setDescription] = useState("");
  const [partsUsed, setPartsUsed] = useState("");
  const [mileageAtService, setMileageAtService] = useState<number | "">("");
  const [partsCost, setPartsCost] = useState(0);
  const [workHours, setWorkHours] = useState(0);
  const [costPerHour, setCostPerHour] = useState(0);

  // Auto-calculated final price
  const finalPrice = partsCost + (workHours * costPerHour);

  type ServiceOption = {
    id: string;
    name: string;
    description: string;
    default_description?: string | null;
    default_parts_used?: string | null;
  };

  const allServices: ServiceOption[] = [
    ...availableServices.map(s => ({ ...s, default_description: null, default_parts_used: null })),
    ...customServiceTypes.map(ct => ({
      id: `custom_${ct.id}`,
      name: ct.name,
      description: ct.description || "",
      default_description: ct.default_description,
      default_parts_used: ct.default_parts_used,
    })),
  ];

  const selectedServiceData = allServices.find(s => s.id === selectedService);
  const isOtherService = selectedService === "outro";

  useEffect(() => {
    if (open) {
      fetchClients();
      fetchCustomServiceTypes();
      // Reset form
      setSelectedClient("");
      setSelectedCar("");
      setSelectedService("");
      setCustomService("");
      setDescription("");
      setPartsUsed("");
      setMileageAtService("");
      setPartsCost(0);
      setWorkHours(0);
      setCostPerHour(0);
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

  // Auto-fill mileage when car is selected
  useEffect(() => {
    if (selectedCar) {
      const car = cars.find(c => c.id === selectedCar);
      if (car) {
        setMileageAtService(car.quilometragem);
      }
    } else {
      setMileageAtService("");
    }
  }, [selectedCar, cars]);

  // Auto-fill description and parts when service is selected
  useEffect(() => {
    if (selectedServiceData) {
      if (selectedServiceData.default_description) {
        setDescription(selectedServiceData.default_description);
      } else {
        setDescription("");
      }
      if (selectedServiceData.default_parts_used) {
        setPartsUsed(selectedServiceData.default_parts_used);
      } else {
        setPartsUsed("");
      }
    }
  }, [selectedService]);

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

  const fetchCustomServiceTypes = async () => {
    const { data, error } = await supabase
      .from("custom_service_types")
      .select("*")
      .order("name");

    if (!error && data) {
      setCustomServiceTypes(data);
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
    const mileage = typeof mileageAtService === "number" ? mileageAtService : null;

    try {
      // Insert the service
      const { error } = await supabase.from("services").insert({
        car_id: selectedCar,
        service_name: serviceName,
        scheduled_date: formData.get("scheduled_date") as string,
        status: formData.get("status") as "agendado" | "em_processo" | "concluido",
        description: description || null,
        parts_used: partsUsed || null,
        parts_cost: partsCost,
        work_hours: workHours,
        cost_per_hour: costPerHour,
        final_price: finalPrice,
        next_revision_date: formData.get("next_revision_date") as string || null,
        recommendations: formData.get("recommendations") as string || null,
        mileage_at_service: mileage,
      });

      if (error) throw error;

      // Update the car's mileage if it was changed
      if (mileage !== null) {
        const { error: carError } = await supabase
          .from("cars")
          .update({ quilometragem: mileage })
          .eq("id", selectedCar);

        if (carError) {
          console.error("Erro ao atualizar quilometragem do carro:", carError);
        }
      }

      toast({
        title: "Serviço criado com sucesso!",
        description: mileage !== null ? "A quilometragem do carro foi atualizada." : undefined,
      });

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
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
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
                      {car.marca} {car.modelo} ({car.matricula}) - {car.quilometragem} km
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
                  {allServices.map((service) => (
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
                value={mileageAtService}
                onChange={(e) => setMileageAtService(e.target.value ? parseInt(e.target.value) : "")}
                placeholder="Km do veículo no momento do serviço"
              />
              <p className="text-xs text-muted-foreground">
                💡 A quilometragem do carro será atualizada automaticamente ao guardar.
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Descrição Adicional</Label>
              <Textarea 
                id="description" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detalhes adicionais do serviço..." 
              />
              {selectedServiceData?.default_description && (
                <p className="text-xs text-muted-foreground">
                  ✓ Pré-preenchido com descrição padrão do tipo de serviço
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="parts_used">Peças Utilizadas</Label>
              <Textarea 
                id="parts_used" 
                value={partsUsed}
                onChange={(e) => setPartsUsed(e.target.value)}
                placeholder="Lista de peças..." 
              />
              {selectedServiceData?.default_parts_used && (
                <p className="text-xs text-muted-foreground">
                  ✓ Pré-preenchido com peças padrão do tipo de serviço
                </p>
              )}
            </div>

            {/* Custos com cálculo automático */}
            <Card className="p-4 space-y-4 bg-muted/30">
              <div className="flex items-center gap-2">
                <Calculator className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Cálculo Automático do Preço</span>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="parts_cost" className="text-xs">Custo das Peças (€)</Label>
                  <Input
                    id="parts_cost"
                    type="number"
                    step="0.01"
                    min="0"
                    value={partsCost}
                    onChange={(e) => setPartsCost(parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="work_hours" className="text-xs">Horas de Trabalho</Label>
                  <Input
                    id="work_hours"
                    type="number"
                    step="0.5"
                    min="0"
                    value={workHours}
                    onChange={(e) => setWorkHours(parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="cost_per_hour" className="text-xs">€/Hora</Label>
                  <Input
                    id="cost_per_hour"
                    type="number"
                    step="0.01"
                    min="0"
                    value={costPerHour}
                    onChange={(e) => setCostPerHour(parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {partsCost}€ + ({workHours}h × {costPerHour}€/h)
                  </span>
                  <span className="text-lg font-bold text-primary">
                    = {finalPrice.toFixed(2)}€
                  </span>
                </div>
              </div>
            </Card>

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
