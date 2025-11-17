import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, TrendingUp, Users, DollarSign, Wrench } from "lucide-react";
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

type MonthlyRevenue = {
  month: string;
  revenue: number;
  margin: number;
};

type ServiceTypeCount = {
  name: string;
  value: number;
};

type TopClient = {
  name: string;
  services: number;
  revenue: number;
};

type Stats = {
  totalClients: number;
  newClientsThisMonth: number;
  activeClients: number;
  totalRevenue: number;
};

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

export default function DashboardCharts() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    totalClients: 0,
    newClientsThisMonth: 0,
    activeClients: 0,
    totalRevenue: 0,
  });
  const [monthlyRevenue, setMonthlyRevenue] = useState<MonthlyRevenue[]>([]);
  const [serviceTypes, setServiceTypes] = useState<ServiceTypeCount[]>([]);
  const [topClients, setTopClients] = useState<TopClient[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch client stats
      const { data: adminRoles } = await supabase
        .from("user_roles")
        .select("user_id")
        .eq("role", "admin");

      const adminIds = adminRoles?.map(role => role.user_id) || [];

      const { data: allProfiles } = await supabase
        .from("profiles")
        .select("*");

      const clients = (allProfiles || []).filter(p => !adminIds.includes(p.id));
      
      const now = new Date();
      const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      
      const newClientsThisMonth = clients.filter(
        c => new Date(c.created_at) >= currentMonthStart
      ).length;

      // Get active clients (with services in last 3 months)
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

      const { data: recentServices } = await supabase
        .from("services")
        .select("car_id")
        .gte("created_at", threeMonthsAgo.toISOString());

      const { data: allCars } = await supabase
        .from("cars")
        .select("id, owner_id");

      const activeOwnerIds = new Set(
        (recentServices || []).map(s => {
          const car = (allCars || []).find(c => c.id === s.car_id);
          return car?.owner_id;
        }).filter(Boolean)
      );

      // Fetch all services for revenue calculation
      const { data: allServices } = await supabase
        .from("services")
        .select("final_price, margin, created_at, service_name, car_id");

      const totalRevenue = (allServices || []).reduce((sum, s) => sum + Number(s.final_price || 0), 0);

      setStats({
        totalClients: clients.length,
        newClientsThisMonth,
        activeClients: activeOwnerIds.size,
        totalRevenue,
      });

      // Calculate monthly revenue for last 6 months
      const monthlyData: MonthlyRevenue[] = [];
      for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
        const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        const monthServices = (allServices || []).filter(s => {
          const serviceDate = new Date(s.created_at);
          return serviceDate >= monthStart && serviceDate <= monthEnd;
        });

        const revenue = monthServices.reduce((sum, s) => sum + Number(s.final_price || 0), 0);
        const margin = monthServices.reduce((sum, s) => sum + Number(s.margin || 0), 0);

        monthlyData.push({
          month: monthStart.toLocaleDateString('pt-PT', { month: 'short', year: '2-digit' }),
          revenue,
          margin,
        });
      }
      setMonthlyRevenue(monthlyData);

      // Count service types
      const serviceTypeCounts: { [key: string]: number } = {};
      (allServices || []).forEach(s => {
        serviceTypeCounts[s.service_name] = (serviceTypeCounts[s.service_name] || 0) + 1;
      });

      const serviceTypeData = Object.entries(serviceTypeCounts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);

      setServiceTypes(serviceTypeData);

      // Calculate top clients
      const clientServiceCounts: { [key: string]: { services: number; revenue: number; name: string } } = {};
      
      for (const service of (allServices || [])) {
        const car = (allCars || []).find(c => c.id === service.car_id);
        if (car) {
          const profile = clients.find(p => p.id === car.owner_id);
          if (profile) {
            const clientName = `${profile.first_name} ${profile.last_name}`;
            if (!clientServiceCounts[car.owner_id]) {
              clientServiceCounts[car.owner_id] = { services: 0, revenue: 0, name: clientName };
            }
            clientServiceCounts[car.owner_id].services++;
            clientServiceCounts[car.owner_id].revenue += Number(service.final_price || 0);
          }
        }
      }

      const topClientData = Object.values(clientServiceCounts)
        .sort((a, b) => b.services - a.services)
        .slice(0, 5);

      setTopClients(topClientData);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Visão geral do desempenho da oficina
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClients}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.newClientsThisMonth} este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeClients}</div>
            <p className="text-xs text-muted-foreground">
              Últimos 3 meses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRevenue.toFixed(2)}€</div>
            <p className="text-xs text-muted-foreground">
              Todos os serviços
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novos Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newClientsThisMonth}</div>
            <p className="text-xs text-muted-foreground">
              Este mês
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Evolução de Receitas</CardTitle>
            <CardDescription>Últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" name="Receita" strokeWidth={2} />
                <Line type="monotone" dataKey="margin" stroke="hsl(var(--chart-2))" name="Margem" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Serviços Mais Comuns</CardTitle>
            <CardDescription>Top 5 serviços realizados</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {serviceTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Top 5 Clientes</CardTitle>
            <CardDescription>Clientes com mais serviços realizados</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topClients}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-2))" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="services" fill="hsl(var(--primary))" name="Nº Serviços" />
                <Bar yAxisId="right" dataKey="revenue" fill="hsl(var(--chart-2))" name="Receita (€)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
