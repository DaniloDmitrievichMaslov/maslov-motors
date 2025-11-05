import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Car, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AddCarDialog from "./AddCarDialog";

type CarWithOwner = {
  id: string;
  marca: string;
  modelo: string;
  matricula: string;
  ano: number;
  cor: string;
  quilometragem: number;
  owner_id: string;
  created_at: string;
  owner_name?: string;
};

export default function CarsManagement() {
  const { toast } = useToast();
  const [cars, setCars] = useState<CarWithOwner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const { data: carsData, error: carsError } = await supabase
        .from("cars")
        .select("*")
        .order("created_at", { ascending: false });

      if (carsError) throw carsError;

      // Get owner names
      const carsWithOwners = await Promise.all(
        (carsData || []).map(async (car) => {
          const { data: profile } = await supabase
            .from("profiles")
            .select("first_name, last_name")
            .eq("id", car.owner_id)
            .single();

          return {
            ...car,
            owner_name: profile
              ? `${profile.first_name} ${profile.last_name}`
              : "Desconhecido",
          };
        })
      );

      setCars(carsWithOwners);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao carregar carros",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCarAdded = () => {
    setShowAddDialog(false);
    fetchCars();
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestão de Carros</h2>
          <p className="text-muted-foreground">
            Todos os carros registados dos clientes.
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
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <Card key={car.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Car className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {car.marca} {car.modelo}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{car.matricula}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Ano:</span> {car.ano}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Cor:</span> {car.cor}
                  </div>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Quilometragem:</span>{" "}
                  {car.quilometragem} km
                </div>
                <div className="pt-2">
                  <Badge variant="secondary">{car.owner_name}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AddCarDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onCarAdded={handleCarAdded}
      />
    </div>
  );
}
