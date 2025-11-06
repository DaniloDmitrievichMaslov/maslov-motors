import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Car, Calendar, Wrench, LogOut, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import AddCarDialog from "./client/AddCarDialog";

type Car = {
  id: string;
  marca: string;
  modelo: string;
  matricula: string;
  ano: number;
  cor: string;
  quilometragem: number;
};

type Service = {
  id: string;
  service_name: string;
  scheduled_date: string;
  status: "agendado" | "em_processo" | "concluido";
  description: string | null;
  parts_used: string | null;
  final_price: number;
  next_revision_date: string | null;
  recommendations: string | null;
  created_at: string;
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

export default function ClientDashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cars, setCars] = useState<Car[]>([]);
  const [services, setServices] = useState<{ [carId: string]: Service[] }>({});
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);

  useEffect(() => {
    if (user) {
      fetchCarsAndServices();
    }
  }, [user]);

  const fetchCarsAndServices = async () => {
    try {
      // Fetch cars
      const { data: carsData, error: carsError } = await supabase
        .from("cars")
        .select("*")
        .eq("owner_id", user?.id)
        .order("created_at", { ascending: false });

      if (carsError) throw carsError;

      setCars(carsData || []);

      // Fetch services for each car
      if (carsData && carsData.length > 0) {
        const carIds = carsData.map((car) => car.id);
        const { data: servicesData, error: servicesError } = await supabase
          .from("services")
          .select("*")
          .in("car_id", carIds)
          .order("scheduled_date", { ascending: false });

        if (servicesError) throw servicesError;

        // Group services by car_id
        const groupedServices: { [carId: string]: Service[] } = {};
        servicesData?.forEach((service) => {
          if (!groupedServices[service.car_id]) {
            groupedServices[service.car_id] = [];
          }
          groupedServices[service.car_id].push(service);
        });

        setServices(groupedServices);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao carregar dados",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  const handleCarAdded = () => {
    setShowAddDialog(false);
    fetchCarsAndServices();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Maslov Motors</h1>
            <p className="text-sm text-muted-foreground">Área do Cliente</p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Os Meus Carros</h2>
            <p className="text-muted-foreground">
              Gerencie os seus veículos e veja o histórico de serviços.
            </p>
          </div>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Carro
          </Button>
        </div>

        {cars.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Nenhum carro registado</CardTitle>
              <CardDescription>
                Ainda não tem carros registados. Contacte a oficina para adicionar o seu primeiro carro.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="space-y-6">
            {cars.map((car) => (
              <Card key={car.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <Car className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle>
                          {car.marca} {car.modelo}
                        </CardTitle>
                        <CardDescription>
                          {car.matricula} • {car.ano} • {car.cor}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">{car.quilometragem} km</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Wrench className="h-4 w-4" />
                    Histórico de Serviços
                  </h3>
                  {!services[car.id] || services[car.id].length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      Ainda não há serviços registados para este carro.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {services[car.id].map((service) => (
                        <div
                          key={service.id}
                          className="border rounded-lg p-4 space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{service.service_name}</h4>
                            <Badge className={statusColors[service.status]}>
                              {statusLabels[service.status]}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {new Date(service.scheduled_date).toLocaleDateString("pt-PT")}
                          </div>
                          {service.description && (
                            <p className="text-sm">{service.description}</p>
                          )}
                          {service.parts_used && (
                            <div className="text-sm">
                              <span className="font-medium">Peças: </span>
                              {service.parts_used}
                            </div>
                          )}
                          <div className="text-sm font-medium">
                            Valor: {service.final_price.toFixed(2)}€
                          </div>
                          {service.next_revision_date && (
                            <div className="text-sm bg-muted p-2 rounded">
                              <span className="font-medium">Próxima revisão recomendada: </span>
                              {new Date(service.next_revision_date).toLocaleDateString("pt-PT")}
                            </div>
                          )}
                          {service.recommendations && (
                            <div className="text-sm bg-muted p-2 rounded">
                              <span className="font-medium">Recomendações: </span>
                              {service.recommendations}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <AddCarDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onCarAdded={handleCarAdded}
        userId={user?.id || ""}
      />
    </div>
  );
}
