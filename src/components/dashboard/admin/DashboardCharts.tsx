import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, TrendingUp, Users, DollarSign, Wrench, Calendar, Car as CarIcon, Filter, BarChart3, ArrowUpDown } from "lucide-react";
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

type MonthlyRevenue = {
  month: string;
  revenue: number;
  margin: number;
  costs: number;
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

const COLORS = [
  'hsl(210, 100%, 56%)',
  'hsl(142, 76%, 36%)',
  'hsl(291, 64%, 42%)',
  'hsl(24, 100%, 50%)',
  'hsl(340, 82%, 52%)',
];

type TimeRange = '3' | '6' | '12' | 'all';
type TopClientSort = 'services' | 'revenue';
type TopClientCount = '5' | '10' | '15';

export default function DashboardCharts() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<TimeRange>('6');
  const [topClientSort, setTopClientSort] = useState<TopClientSort>('services');
  const [topClientCount, setTopClientCount] = useState<TopClientCount>('5');
  
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
  const [allServices, setAllServices] = useState<any[]>([]);
  const [allCars, setAllCars] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    if (allServices.length > 0) {
      updateMonthlyData();
      updateTopClients();
    }
  }, [timeRange, topClientSort, topClientCount, allServices]);

  const updateMonthlyData = () => {
    const months = timeRange === 'all' ? 24 : parseInt(timeRange);
    const monthlyData: MonthlyRevenue[] = [];
    
    for (let i = months - 1; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      const monthServices = allServices.filter(s => {
        const serviceDate = new Date(s.created_at);
        return serviceDate >= monthStart && serviceDate <= monthEnd;
      });

      const revenue = monthServices.reduce((sum, s) => sum + Number(s.final_price || 0), 0);
      const costs = monthServices.reduce((sum, s) => sum + Number(s.parts_cost || 0), 0);
      const margin = revenue - costs;

      monthlyData.push({
        month: monthStart.toLocaleDateString('pt-PT', { month: 'short', year: '2-digit' }),
        revenue,
        costs,
        margin,
      });
    }
    setMonthlyRevenue(monthlyData);
  };

  const updateTopClients = () => {
    const clientServiceCounts: { [key: string]: { services: number; revenue: number; name: string } } = {};
    
    for (const service of allServices) {
      const car = allCars.find(c => c.id === service.car_id);
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

    const count = parseInt(topClientCount);
    const sortedClients = Object.values(clientServiceCounts)
      .sort((a, b) => topClientSort === 'services' ? b.services - a.services : b.revenue - a.revenue)
      .slice(0, count);

    setTopClients(sortedClients);
  };

  const fetchDashboardData = async () => {
    try {
      const { data: adminRoles } = await supabase
        .from("user_roles")
        .select("user_id")
        .eq("role", "admin");

      const adminIds = adminRoles?.map(role => role.user_id) || [];

      const { data: allProfiles } = await supabase
        .from("profiles")
        .select("*");

      const clientsData = (allProfiles || []).filter(p => !adminIds.includes(p.id));
      setClients(clientsData);
      
      const now = new Date();
      const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      
      const newClientsThisMonth = clientsData.filter(
        c => new Date(c.created_at) >= currentMonthStart
      ).length;

      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

      const { data: recentServices } = await supabase
        .from("services")
        .select("car_id")
        .gte("created_at", threeMonthsAgo.toISOString());

      const { data: carsData } = await supabase
        .from("cars")
        .select("id, owner_id");

      setAllCars(carsData || []);

      const activeOwnerIds = new Set(
        (recentServices || []).map(s => {
          const car = (carsData || []).find(c => c.id === s.car_id);
          return car?.owner_id;
        }).filter(Boolean)
      );

      const { data: servicesData } = await supabase
        .from("services")
        .select("final_price, margin, created_at, service_name, car_id, parts_cost, work_hours, cost_per_hour");

      setAllServices(servicesData || []);

      const totalRevenue = (servicesData || []).reduce((sum, s) => sum + Number(s.final_price || 0), 0);
      
      const yearStart = new Date(now.getFullYear(), 0, 1);

      const monthServices = (servicesData || []).filter(s => new Date(s.created_at) >= currentMonthStart);
      const yearServices = (servicesData || []).filter(s => new Date(s.created_at) >= yearStart);

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
        totalClients: clientsData.length,
        newClientsThisMonth,
        activeClients: activeOwnerIds.size,
        totalRevenue,
        totalCars: (carsData || []).length,
        servicesThisMonth: monthServices.length,
        monthRevenue: monthStats.revenue,
        monthCosts: monthStats.costs,
        monthMargin: monthStats.margin,
        yearRevenue: yearStats.revenue,
        yearCosts: yearStats.costs,
        yearMargin: yearStats.margin,
      });

      // Count service types
      const serviceTypeCounts: { [key: string]: number } = {};
      (servicesData || []).forEach(s => {
        serviceTypeCounts[s.service_name] = (serviceTypeCounts[s.service_name] || 0) + 1;
      });

      const serviceTypeData = Object.entries(serviceTypeCounts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);

      setServiceTypes(serviceTypeData);

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

  const getTimeRangeLabel = () => {
    switch(timeRange) {
      case '3': return '3 meses';
      case '6': return '6 meses';
      case '12': return '12 meses';
      case 'all': return 'Todo o histórico';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Dashboard
          </h2>
          <p className="text-muted-foreground">
            Visão geral completa do desempenho da oficina
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            <BarChart3 className="h-3 w-3 mr-1" />
            Análise Avançada
          </Badge>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Users className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{stats.totalClients}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">+{stats.newClientsThisMonth}</span> este mês
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
            <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Users className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500">{stats.activeClients}</div>
            <p className="text-xs text-muted-foreground mt-1">Últimos 3 meses</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Carros</CardTitle>
            <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
              <CarIcon className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">{stats.totalCars}</div>
            <p className="text-xs text-muted-foreground mt-1">Registados no sistema</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20 hover:shadow-lg hover:shadow-green-500/5 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">
              {stats.totalRevenue.toFixed(2)}€
            </div>
            <p className="text-xs text-muted-foreground mt-1">Desde o início</p>
          </CardContent>
        </Card>
      </div>

      {/* Período Atual - Grid Compacto */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-primary/20">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Mês Atual</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Wrench className="h-3 w-3" /> Serviços
                </p>
                <p className="text-2xl font-bold">{stats.servicesThisMonth}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <DollarSign className="h-3 w-3" /> Receita
                </p>
                <p className="text-2xl font-bold text-blue-500">{stats.monthRevenue.toFixed(2)}€</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> Custos
                </p>
                <p className="text-2xl font-bold text-orange-500">{stats.monthCosts.toFixed(2)}€</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> Margem
                </p>
                <p className="text-2xl font-bold text-green-500">{stats.monthMargin.toFixed(2)}€</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-accent/20">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-accent" />
              <CardTitle className="text-lg">Ano Atual</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Receita</p>
                <p className="text-xl font-bold text-blue-500">{stats.yearRevenue.toFixed(2)}€</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Custos</p>
                <p className="text-xl font-bold text-orange-500">{stats.yearCosts.toFixed(2)}€</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Margem</p>
                <p className="text-xl font-bold text-green-500">{stats.yearMargin.toFixed(2)}€</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Evolução de Receitas com Filtro */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Evolução de Receitas
                </CardTitle>
                <CardDescription>{getTimeRangeLabel()}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={timeRange} onValueChange={(v) => setTimeRange(v as TimeRange)}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 meses</SelectItem>
                    <SelectItem value="6">6 meses</SelectItem>
                    <SelectItem value="12">12 meses</SelectItem>
                    <SelectItem value="all">Todo histórico</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={monthlyRevenue}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMargin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(210, 100%, 56%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(210, 100%, 56%)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCosts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(24, 100%, 50%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(24, 100%, 50%)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--foreground))" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  stroke="hsl(var(--foreground))" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${value}€`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => `${value.toFixed(2)}€`}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(142, 76%, 36%)" 
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  name="Receita" 
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="margin" 
                  stroke="hsl(210, 100%, 56%)" 
                  fillOpacity={1}
                  fill="url(#colorMargin)"
                  name="Margem" 
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="costs" 
                  stroke="hsl(24, 100%, 50%)" 
                  fillOpacity={1}
                  fill="url(#colorCosts)"
                  name="Custos" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Serviços Mais Comuns */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-accent" />
              Serviços Mais Comuns
            </CardTitle>
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

        {/* Top Clientes com Filtros */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Top Clientes
                </CardTitle>
                <CardDescription>Clientes ordenados por {topClientSort === 'services' ? 'serviços' : 'receita'}</CardDescription>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1">
                  <ArrowUpDown className="h-3 w-3 text-muted-foreground" />
                  <Select value={topClientSort} onValueChange={(v) => setTopClientSort(v as TopClientSort)}>
                    <SelectTrigger className="w-[120px] h-8 text-xs">
                      <SelectValue placeholder="Ordenar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="services">Nº Serviços</SelectItem>
                      <SelectItem value="revenue">Receita</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-1">
                  <Filter className="h-3 w-3 text-muted-foreground" />
                  <Select value={topClientCount} onValueChange={(v) => setTopClientCount(v as TopClientCount)}>
                    <SelectTrigger className="w-[90px] h-8 text-xs">
                      <SelectValue placeholder="Top" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">Top 5</SelectItem>
                      <SelectItem value="10">Top 10</SelectItem>
                      <SelectItem value="15">Top 15</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topClients} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                <XAxis type="number" stroke="hsl(var(--foreground))" tick={{ fontSize: 11 }} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="hsl(var(--foreground))" 
                  tick={{ fontSize: 11 }}
                  width={80}
                />
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
                  dataKey="services" 
                  fill="hsl(291, 64%, 42%)" 
                  name="Nº Serviços"
                  radius={[0, 4, 4, 0]}
                />
                <Bar 
                  dataKey="revenue" 
                  fill="hsl(24, 100%, 50%)" 
                  name="Receita (€)"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
