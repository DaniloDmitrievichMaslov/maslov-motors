import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, TrendingUp, DollarSign, Wrench, Calendar } from "lucide-react";

type MonthlyStats = {
  total_services: number;
  total_revenue: number;
  total_costs: number;
  total_profit: number;
};

export default function ReportsView() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [currentMonthStats, setCurrentMonthStats] = useState<MonthlyStats>({
    total_services: 0,
    total_revenue: 0,
    total_costs: 0,
    total_profit: 0,
  });
  const [yearStats, setYearStats] = useState<MonthlyStats>({
    total_services: 0,
    total_revenue: 0,
    total_costs: 0,
    total_profit: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const now = new Date();
      const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const yearStart = new Date(now.getFullYear(), 0, 1);

      // Fetch current month services
      const { data: monthServices, error: monthError } = await supabase
        .from("services")
        .select("final_price, parts_cost, work_hours, cost_per_hour, profit")
        .gte("created_at", currentMonthStart.toISOString());

      if (monthError) throw monthError;

      // Fetch year services
      const { data: yearServices, error: yearError } = await supabase
        .from("services")
        .select("final_price, parts_cost, work_hours, cost_per_hour, profit")
        .gte("created_at", yearStart.toISOString());

      if (yearError) throw yearError;

      // Calculate month stats
      const monthStats = (monthServices || []).reduce(
        (acc, service) => ({
          total_services: acc.total_services + 1,
          total_revenue: acc.total_revenue + Number(service.final_price),
          total_costs:
            acc.total_costs +
            Number(service.parts_cost) +
            Number(service.work_hours) * Number(service.cost_per_hour),
          total_profit: acc.total_profit + Number(service.profit),
        }),
        {
          total_services: 0,
          total_revenue: 0,
          total_costs: 0,
          total_profit: 0,
        }
      );

      // Calculate year stats
      const yearStatsCalc = (yearServices || []).reduce(
        (acc, service) => ({
          total_services: acc.total_services + 1,
          total_revenue: acc.total_revenue + Number(service.final_price),
          total_costs:
            acc.total_costs +
            Number(service.parts_cost) +
            Number(service.work_hours) * Number(service.cost_per_hour),
          total_profit: acc.total_profit + Number(service.profit),
        }),
        {
          total_services: 0,
          total_revenue: 0,
          total_costs: 0,
          total_profit: 0,
        }
      );

      setCurrentMonthStats(monthStats);
      setYearStats(yearStatsCalc);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao carregar estatísticas",
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
        <h2 className="text-3xl font-bold tracking-tight">Relatórios</h2>
        <p className="text-muted-foreground">
          Estatísticas e resumos de desempenho da oficina.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Mês Atual
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Serviços</CardTitle>
                <Wrench className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentMonthStats.total_services}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {currentMonthStats.total_revenue.toFixed(2)}€
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Custos Totais</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {currentMonthStats.total_costs.toFixed(2)}€
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lucro Total</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {currentMonthStats.total_profit.toFixed(2)}€
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Ano Atual
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Serviços</CardTitle>
                <Wrench className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{yearStats.total_services}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{yearStats.total_revenue.toFixed(2)}€</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Custos Totais</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{yearStats.total_costs.toFixed(2)}€</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lucro Total</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {yearStats.total_profit.toFixed(2)}€
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
