import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Users, Car, Wrench, LayoutDashboard, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ClientsManagement from "./admin/ClientsManagement";
import CarsManagement from "./admin/CarsManagement";
import ServicesManagement from "./admin/ServicesManagement";
import DashboardCharts from "./admin/DashboardCharts";
import QuoteRequestsManagement from "./admin/QuoteRequestsManagement";

export default function AdminDashboard() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/80 backdrop-blur-lg sticky top-0 z-50 animate-fade-in-down">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl transition-smooth hover:bg-primary/20">
              <Wrench className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Maslov Motors</h1>
              <p className="text-sm text-muted-foreground">Painel de Administração</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleSignOut} className="transition-smooth hover-lift">
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 p-1 bg-muted/50 backdrop-blur-sm">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 transition-smooth data-[state=active]:shadow-md">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="clients" className="flex items-center gap-2 transition-smooth data-[state=active]:shadow-md">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Clientes</span>
            </TabsTrigger>
            <TabsTrigger value="cars" className="flex items-center gap-2 transition-smooth data-[state=active]:shadow-md">
              <Car className="h-4 w-4" />
              <span className="hidden sm:inline">Carros</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2 transition-smooth data-[state=active]:shadow-md">
              <Wrench className="h-4 w-4" />
              <span className="hidden sm:inline">Serviços</span>
            </TabsTrigger>
            <TabsTrigger value="quotes" className="flex items-center gap-2 transition-smooth data-[state=active]:shadow-md">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Pedidos</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="animate-fade-in">
            <DashboardCharts />
          </TabsContent>

          <TabsContent value="clients" className="animate-fade-in">
            <ClientsManagement />
          </TabsContent>

          <TabsContent value="cars" className="animate-fade-in">
            <CarsManagement />
          </TabsContent>

          <TabsContent value="services" className="animate-fade-in">
            <ServicesManagement />
          </TabsContent>

          <TabsContent value="quotes" className="animate-fade-in">
            <QuoteRequestsManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
