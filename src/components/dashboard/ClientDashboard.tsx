import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Car, Calendar, Wrench, LogOut, Plus, TrendingUp, Clock, CheckCircle2, AlertCircle, MessageSquare, CalendarPlus, ChevronDown, ChevronUp, History, CalendarCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import AddCarDialog from "./client/AddCarDialog";
import QuoteRequestDialog from "./client/QuoteRequestDialog";
import BookingDialog from "./client/BookingDialog";
import MyBookingsDialog from "./client/MyBookingsDialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
  mileage_at_service: number | null;
};

const statusLabels = {
  agendado: "Agendado",
  em_processo: "Em Processo",
  concluido: "Concluído",
};

const statusConfig = {
  agendado: {
    color: "bg-info text-info-foreground",
    icon: Clock,
  },
  em_processo: {
    color: "bg-warning text-warning-foreground",
    icon: AlertCircle,
  },
  concluido: {
    color: "bg-success text-success-foreground",
    icon: CheckCircle2,
  },
};

export default function ClientDashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cars, setCars] = useState<Car[]>([]);
  const [services, setServices] = useState<{ [carId: string]: Service[] }>({});
  const [loading, setLoading] = useState(true);
  const [addCarOpen, setAddCarOpen] = useState(false);
  const [quoteRequestOpen, setQuoteRequestOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [myBookingsOpen, setMyBookingsOpen] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [expandedCars, setExpandedCars] = useState<{ [carId: string]: boolean }>({});

  const toggleCarExpanded = (carId: string) => {
    setExpandedCars(prev => ({ ...prev, [carId]: !prev[carId] }));
  };

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchCarsAndServices();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error: any) {
      console.error("Error fetching profile:", error);
    }
  };

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
    navigate("/");
  };

  const handleCarAdded = () => {
    setAddCarOpen(false);
    fetchCarsAndServices();
  };

  // Calculate stats
  const totalServices = Object.values(services).flat().length;
  const upcomingServices = Object.values(services)
    .flat()
    .filter((s) => s.status === "agendado").length;
  const completedServices = Object.values(services)
    .flat()
    .filter((s) => s.status === "concluido").length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header with Gradient */}
      <div className="relative bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="container mx-auto px-4 py-8 relative">
          <div className="flex justify-between items-start mb-8">
            <div className="animate-fade-in">
              <h1 className="text-4xl font-bold text-white mb-2">Maslov Motors</h1>
              <p className="text-white/80 text-lg">
                Bem-vindo, {profile?.first_name || "Cliente"}!
              </p>
            </div>
            <Button variant="secondary" onClick={handleSignOut} className="shadow-lg">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-scale-in">
            <Card className="bg-card/80 backdrop-blur-sm border-primary/20 shadow-lg hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Meus Carros</p>
                    <p className="text-3xl font-bold text-primary">{cars.length}</p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Car className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-info/20 shadow-lg hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Serviços Agendados</p>
                    <p className="text-3xl font-bold text-info">{upcomingServices}</p>
                  </div>
                  <div className="p-3 bg-info/10 rounded-full">
                    <Clock className="h-6 w-6 text-info" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-success/20 shadow-lg hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Serviços Concluídos</p>
                    <p className="text-3xl font-bold text-success">{completedServices}</p>
                  </div>
                  <div className="p-3 bg-success/10 rounded-full">
                    <CheckCircle2 className="h-6 w-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-accent/20 shadow-lg hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Serviços</p>
                    <p className="text-3xl font-bold text-accent">{totalServices}</p>
                  </div>
                  <div className="p-3 bg-accent/10 rounded-full">
                    <TrendingUp className="h-6 w-6 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between animate-fade-in">
          <div>
            <h2 className="text-3xl font-bold mb-2">Os Meus Carros</h2>
            <p className="text-muted-foreground">
              Gerencie os seus veículos e veja o histórico de serviços.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setAddCarOpen(true)} size="lg" className="shadow-lg">
              <Plus className="mr-2 h-5 w-5" />
              Adicionar Carro
            </Button>
            <Button 
              onClick={() => setBookingOpen(true)}
              size="lg"
              variant="secondary"
              className="shadow-lg"
            >
              <CalendarPlus className="mr-2 h-5 w-5" />
              Fazer Marcação
            </Button>
            <Button 
              onClick={() => setQuoteRequestOpen(true)}
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-lg"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Pedir Orçamento
            </Button>
          </div>
        </div>

        {cars.length === 0 ? (
          <Card className="animate-scale-in shadow-xl">
            <CardHeader>
              <CardTitle>Nenhum carro registado</CardTitle>
              <CardDescription>
                Ainda não tem carros registados. Adicione o seu primeiro carro para começar.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car, index) => {
              const carServices = services[car.id] || [];
              const isExpanded = expandedCars[car.id];
              
              return (
                <Collapsible
                  key={car.id}
                  open={isExpanded}
                  onOpenChange={() => toggleCarExpanded(car.id)}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 border-border/50 overflow-hidden group h-full">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary-glow"></div>
                    
                    <CardHeader className="bg-gradient-card pb-4">
                      <div className="flex items-center gap-4">
                        <div className="p-4 bg-primary/10 rounded-2xl shadow-lg group-hover:shadow-glow transition-all duration-300 group-hover:scale-105">
                          <Car className="h-8 w-8 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-xl mb-1 truncate">
                            {car.marca} {car.modelo}
                          </CardTitle>
                          <Badge variant="outline" className="font-mono">{car.matricula}</Badge>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-4 space-y-4">
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Ano</p>
                          <p className="font-semibold">{car.ano}</p>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Cor</p>
                          <p className="font-semibold text-sm">{car.cor}</p>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Km</p>
                          <p className="font-semibold text-sm">{car.quilometragem.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Total de serviços:</span>
                        <Badge variant="secondary">{carServices.length}</Badge>
                      </div>

                      <CollapsibleTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="w-full border-primary/30 hover:bg-primary/10 hover:border-primary"
                        >
                          <History className="h-4 w-4 mr-2" />
                          {isExpanded ? "Ocultar Histórico" : "Ver Histórico"}
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4 ml-2" />
                          ) : (
                            <ChevronDown className="h-4 w-4 ml-2" />
                          )}
                        </Button>
                      </CollapsibleTrigger>

                      <CollapsibleContent className="space-y-4 pt-2">
                        {carServices.length === 0 ? (
                          <div className="text-center py-6 px-4 bg-muted/30 rounded-lg border border-dashed border-border">
                            <Wrench className="h-10 w-10 text-muted-foreground mx-auto mb-2 opacity-50" />
                            <p className="text-sm text-muted-foreground">
                              Ainda não há serviços registados.
                            </p>
                          </div>
                        ) : (
                          <div className="relative">
                            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary-glow"></div>
                            
                            <div className="space-y-4">
                              {carServices.map((service, idx) => {
                                const StatusIcon = statusConfig[service.status].icon;
                                return (
                                  <div
                                    key={service.id}
                                    className="relative pl-10 animate-scale-in"
                                    style={{ animationDelay: `${idx * 0.05}s` }}
                                  >
                                    <div className="absolute left-2 top-3 w-4 h-4 rounded-full bg-background border-2 border-primary shadow-md flex items-center justify-center">
                                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                    </div>

                                    <Card className="border-l-2 shadow-md hover:shadow-lg transition-all duration-300"
                                          style={{ borderLeftColor: `hsl(var(--${service.status === 'concluido' ? 'success' : service.status === 'em_processo' ? 'warning' : 'info'}))` }}>
                                      <CardContent className="p-4">
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                          <div className="flex items-center gap-2 min-w-0">
                                            <StatusIcon className={`h-4 w-4 flex-shrink-0 ${service.status === 'concluido' ? 'text-success' : service.status === 'em_processo' ? 'text-warning' : 'text-info'}`} />
                                            <h4 className="font-semibold text-sm truncate">{service.service_name}</h4>
                                          </div>
                                          <Badge className={`${statusConfig[service.status].color} text-xs flex-shrink-0`}>
                                            {statusLabels[service.status]}
                                          </Badge>
                                        </div>

                                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                                          <div className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(service.scheduled_date).toLocaleDateString("pt-PT", {
                                              day: "2-digit",
                                              month: "short",
                                              year: "numeric"
                                            })}
                                          </div>
                                          {service.mileage_at_service && (
                                            <div className="flex items-center gap-1 bg-muted/50 px-2 py-0.5 rounded">
                                              <span className="font-medium">{service.mileage_at_service.toLocaleString()} km</span>
                                            </div>
                                          )}
                                        </div>

                                        {service.description && (
                                          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{service.description}</p>
                                        )}

                                        <div className="flex items-center justify-between pt-2 border-t border-border/50">
                                          <span className="text-xs text-muted-foreground">Valor:</span>
                                          <span className="font-bold text-sm">€{service.final_price?.toFixed(2) || "0.00"}</span>
                                        </div>

                                        {service.next_revision_date && (
                                          <div className="mt-2 text-xs">
                                            <span className="text-muted-foreground">Próxima Revisão: </span>
                                            <span className="font-medium text-accent">
                                              {new Date(service.next_revision_date).toLocaleDateString("pt-PT")}
                                            </span>
                                          </div>
                                        )}

                                        {service.recommendations && (
                                          <div className="mt-2 p-2 bg-accent/10 border border-accent/20 rounded text-xs">
                                            <p className="font-medium text-accent-foreground flex items-center gap-1 mb-1">
                                              <AlertCircle className="h-3 w-3" />
                                              Recomendações
                                            </p>
                                            <p className="text-muted-foreground line-clamp-2">{service.recommendations}</p>
                                          </div>
                                        )}
                                      </CardContent>
                                    </Card>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </CollapsibleContent>
                    </CardContent>
                  </Card>
                </Collapsible>
              );
            })}
          </div>
        )}
      </main>

      {user && (
        <>
          <AddCarDialog
            open={addCarOpen}
            onOpenChange={setAddCarOpen}
            onCarAdded={handleCarAdded}
            userId={user.id}
          />
          
          <QuoteRequestDialog
            open={quoteRequestOpen}
            onOpenChange={setQuoteRequestOpen}
            userId={user.id}
            userName={`${profile?.first_name || ''} ${profile?.last_name || ''}`.trim() || user.email || ''}
            userPhone={profile?.phone || null}
          />

          <BookingDialog
            open={bookingOpen}
            onOpenChange={setBookingOpen}
            userId={user.id}
            userName={`${profile?.first_name || ''} ${profile?.last_name || ''}`.trim() || user.email || ''}
            userPhone={profile?.phone || null}
            cars={cars}
          />
        </>
      )}
    </div>
  );
}

