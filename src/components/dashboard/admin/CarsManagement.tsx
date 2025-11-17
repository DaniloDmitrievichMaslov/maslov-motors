import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Car, Plus, Pencil, Trash2, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import AddCarDialog from "./AddCarDialog";
import EditCarDialog from "./EditCarDialog";

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
  const [filteredCars, setFilteredCars] = useState<CarWithOwner[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedCar, setSelectedCar] = useState<CarWithOwner | null>(null);

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = cars.filter(car => 
        car.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.matricula.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.owner_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCars(filtered);
    } else {
      setFilteredCars(cars);
    }
  }, [searchTerm, cars]);

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
      setFilteredCars(carsWithOwners);
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

  const handleCarUpdated = () => {
    setShowEditDialog(false);
    setSelectedCar(null);
    fetchCars();
  };

  const handleEditCar = (car: CarWithOwner) => {
    setSelectedCar(car);
    setShowEditDialog(true);
  };

  const handleDeleteClick = (car: CarWithOwner) => {
    setSelectedCar(car);
    setShowDeleteDialog(true);
  };

  const handleDelete = async () => {
    if (!selectedCar) return;

    try {
      const { error } = await supabase
        .from("cars")
        .delete()
        .eq("id", selectedCar.id);

      if (error) throw error;

      toast({
        title: "Carro apagado com sucesso!",
      });

      setShowDeleteDialog(false);
      setSelectedCar(null);
      fetchCars();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao apagar carro",
        description: error.message,
      });
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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestão de Carros</h2>
          <p className="text-muted-foreground">
            Lista de todos os carros registados na oficina.
          </p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Carro
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Pesquisar por marca, modelo, matrícula ou proprietário..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {filteredCars.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Nenhum carro encontrado</CardTitle>
            <CardDescription>
              {searchTerm ? "Não foram encontrados carros com esse critério de pesquisa." : "Ainda não existem carros registados no sistema."}
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCars.map((car) => (
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
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditCar(car)}
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteClick(car)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Apagar
                  </Button>
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

      {selectedCar && (
        <>
          <EditCarDialog
            open={showEditDialog}
            onOpenChange={setShowEditDialog}
            car={selectedCar}
            onCarUpdated={handleCarUpdated}
          />

          <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Tem a certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não pode ser desfeita. Isto irá apagar permanentemente o carro{" "}
                  <strong>{selectedCar.marca} {selectedCar.modelo}</strong> (matrícula: {selectedCar.matricula}) e todos os seus serviços associados.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Apagar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </div>
  );
}
