import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, TrendingUp, Users, DollarSign, Wrench, Calendar, Car as CarIcon } from "lucide-react";
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
  totalCars: number;
  servicesThisMonth: number;
  monthRevenue: number;
  monthCosts: number;
  monthMargin: number;
  yearRevenue: number;
  yearCosts: number;
  yearMargin: number;
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
    totalCars: 0,
    servicesThisMonth: 0,
    monthRevenue: 0,
    monthCosts: 0,
    monthMargin: 0,
    yearRevenue: 0,
    yearCosts: 0,
    yearMargin: 0,
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
        .select("final_price, margin, created_at, service_name, car_id, parts_cost, work_hours, cost_per_hour");

      const totalRevenue = (allServices || []).reduce((sum, s) => sum + Number(s.final_price || 0), 0);
      
      // Calculate month and year stats
      const yearStart = new Date(now.getFullYear(), 0, 1);

      const monthServices = (allServices || []).filter(s => new Date(s.created_at) >= currentMonthStart);
      const yearServices = (allServices || []).filter(s => new Date(s.created_at) >= yearStart);

      const monthStats = monthServices.reduce(
        (acc, service) => {
          const revenue = Number(service.final_price || 0);
          const costs = Number(service.parts_cost || 0);
          return {
            revenue: acc.revenue + revenue,
            costs: acc.costs + costs,
            margin: acc.margin + (revenue - costs),
          };
        },
        { revenue: 0, costs: 0, margin: 0 }
      );

      const yearStats = yearServices.reduce(
        (acc, service) => {
          const revenue = Number(service.final_price || 0);
          const costs = Number(service.parts_cost || 0);
          return {
            revenue: acc.revenue + revenue,
            costs: acc.costs + costs,
            margin: acc.margin + (revenue - costs),
          };
        },
        { revenue: 0, costs: 0, margin: 0 }
      );

      setStats({
        totalClients: clients.length,
        newClientsThisMonth,
        activeClients: activeOwnerIds.size,
        totalRevenue,
        totalCars: (allCars || []).length,
        servicesThisMonth: monthServices.length,
        monthRevenue: monthStats.revenue,
        monthCosts: monthStats.costs,
        monthMargin: monthStats.margin,
        yearRevenue: yearStats.revenue,
        yearCosts: yearStats.costs,
        yearMargin: yearStats.margin,
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
        const costs = monthServices.reduce((sum, s) => sum + Number(s.parts_cost || 0), 0);
        const margin = revenue - costs;

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
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Dashboard
        </h2>
        <p className="text-muted-foreground">
          Visão geral completa do desempenho da oficina
        </p>
      </div>

      {/* Stats Overview - Primeiro Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalClients}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.newClientsThisMonth} este mês
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20 hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.activeClients}</div>
            <p className="text-xs text-muted-foreground">Últimos 3 meses</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20 hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Carros</CardTitle>
            <CarIcon className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{stats.totalCars}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20 hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.totalRevenue.toFixed(2)}€
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Relatórios - Mês Atual */}
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Mês Atual
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Serviços</CardTitle>
              <Wrench className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.servicesThisMonth}</div>
            </CardContent>
          </Card>
          <Card className="border-blue-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {stats.monthRevenue.toFixed(2)}€
              </div>
            </CardContent>
          </Card>
          <Card className="border-orange-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Custos</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {stats.monthCosts.toFixed(2)}€
              </div>
            </CardContent>
          </Card>
          <Card className="border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Margem</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stats.monthMargin.toFixed(2)}€
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Relatórios - Ano Atual */}
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-accent" />
          Ano Atual
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-blue-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Anual</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {stats.yearRevenue.toFixed(2)}€
              </div>
            </CardContent>
          </Card>
          <Card className="border-orange-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Custos Anuais</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {stats.yearCosts.toFixed(2)}€
              </div>
            </CardContent>
          </Card>
          <Card className="border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Margem Anual</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stats.yearMargin.toFixed(2)}€
              </div>
            </CardContent>
          </Card>
        </div>
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
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
                <YAxis stroke="hsl(var(--foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => `${value.toFixed(2)}€`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  name="Receita" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="margin" 
                  stroke="hsl(var(--chart-2))" 
                  name="Margem" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--chart-2))', r: 4 }}
                  activeDot={{ r: 6 }}
                />
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
                  outerRadius={100}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  paddingAngle={2}
                >
                  {serviceTypes.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                      stroke="hsl(var(--background))"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
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
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                <XAxis dataKey="name" stroke="hsl(var(--foreground))" />
                <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-2))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number, name: string) => {
                    if (name === "Receita (€)") return `${value.toFixed(2)}€`;
                    return value;
                  }}
                />
                <Legend />
                <Bar 
                  yAxisId="left" 
                  dataKey="services" 
                  fill="hsl(var(--primary))" 
                  name="Nº Serviços"
                  radius={[8, 8, 0, 0]}
                />
                <Bar 
                  yAxisId="right" 
                  dataKey="revenue" 
                  fill="hsl(var(--chart-2))" 
                  name="Receita (€)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
