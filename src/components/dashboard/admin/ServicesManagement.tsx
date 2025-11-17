import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Wrench, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AddServiceDialog from "./AddServiceDialog";
import EditServiceDialog from "./EditServiceDialog";

type ServiceWithDetails = {
  id: string;
  service_name: string;
  scheduled_date: string;
  status: "agendado" | "em_processo" | "concluido";
  description: string | null;
  parts_used: string | null;
  parts_cost: number;
  work_hours: number;
  cost_per_hour: number;
  final_price: number;
  margin: number;
  next_revision_date: string | null;
  recommendations: string | null;
  car_id: string;
  car_info?: string;
  owner_name?: string;
};

const statusLabels = {
  agendado: "Agendado",
  em_processo: "Em Processo",
  concluido: "Concluído",
};

const statusColors = {
  agendado: "bg-blue-500",
  em_processo: "bg-yellow-500",
  concluido: "bg-green-500",
};

export default function ServicesManagement() {
  const { toast } = useToast();
  const [services, setServices] = useState<ServiceWithDetails[]>([]);
  const [filteredServices, setFilteredServices] = useState<ServiceWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingService, setEditingService] = useState<ServiceWithDetails | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    let filtered = services;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(service => 
        service.service_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.car_info.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.owner_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(service => service.status === statusFilter);
    }

    setFilteredServices(filtered);
  }, [searchTerm, statusFilter, services]);

  const fetchServices = async () => {
    try {
      const { data: servicesData, error: servicesError } = await supabase
        .from("services")
        .select("*")
        .order("scheduled_date", { ascending: false });

      if (servicesError) throw servicesError;

      // Get car and owner info
      const servicesWithDetails = await Promise.all(
        (servicesData || []).map(async (service) => {
          const { data: car } = await supabase
            .from("cars")
            .select("marca, modelo, matricula, owner_id")
            .eq("id", service.car_id)
            .single();

          let ownerName = "Desconhecido";
          if (car) {
            const { data: profile } = await supabase
              .from("profiles")
              .select("first_name, last_name")
              .eq("id", car.owner_id)
              .single();

            if (profile) {
              ownerName = `${profile.first_name} ${profile.last_name}`;
            }
          }

          return {
            ...service,
            margin: service.margin || 0, // Ensure margin exists
            car_info: car ? `${car.marca} ${car.modelo} (${car.matricula})` : "Desconhecido",
            owner_name: ownerName,
          };
        })
      );

      setServices(servicesWithDetails);
      setFilteredServices(servicesWithDetails);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao carregar serviços",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleServiceAdded = () => {
    setShowAddDialog(false);
    fetchServices();
  };

  const handleServiceUpdated = () => {
    setEditingService(null);
    fetchServices();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestão de Serviços</h2>
          <p className="text-muted-foreground">
            Lista de todos os serviços agendados e realizados.
          </p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Serviço
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar por serviço, carro ou cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="agendado">Agendado</SelectItem>
            <SelectItem value="em_processo">Em Processo</SelectItem>
            <SelectItem value="concluido">Concluído</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredServices.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Nenhum serviço encontrado</CardTitle>
            <CardDescription>
              {searchTerm || statusFilter !== "all" ? "Não foram encontrados serviços com esse critério." : "Ainda não existem serviços registados no sistema."}
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
          {filteredServices.map((service) => (
            <Card key={service.id} className="cursor-pointer hover:bg-accent/5" onClick={() => setEditingService(service)}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Wrench className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{service.service_name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{service.car_info}</p>
                      <p className="text-xs text-muted-foreground">{service.owner_name}</p>
                    </div>
                  </div>
                  <Badge className={statusColors[service.status]}>
                    {statusLabels[service.status]}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Data:</span>{" "}
                    {new Date(service.scheduled_date).toLocaleDateString("pt-PT")}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Preço final:</span> {service.final_price.toFixed(2)}€
                  </div>
                  <div>
                    <span className="text-muted-foreground">Custo das peças:</span> {service.parts_cost.toFixed(2)}€
                  </div>
                  <div className="font-semibold text-green-600">
                    <span className="text-muted-foreground font-normal">Margem:</span> {service.margin.toFixed(2)}€
                  </div>
                </div>
                {service.description && (
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AddServiceDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onServiceAdded={handleServiceAdded}
      />

      {editingService && (
        <EditServiceDialog
          open={!!editingService}
          onOpenChange={(open) => !open && setEditingService(null)}
          service={editingService}
          onServiceUpdated={handleServiceUpdated}
        />
      )}
    </div>
  );
}
