import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, Phone, User, Pencil, Trash2, Eye, UserPlus } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EditClientDialog from "./EditClientDialog";
import AddClientDialog from "./AddClientDialog";

type Client = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  created_at: string;
  car_count?: number;
  cars?: any[];
};

export default function ClientsManagement() {
  const { toast } = useToast();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showCarsDialog, setShowCarsDialog] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchClients();
  }, []);

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setShowEditDialog(true);
  };

  const handleViewCars = async (client: Client) => {
    // Fetch cars for this client
    const { data: cars } = await supabase
      .from("cars")
      .select("*")
      .eq("owner_id", client.id)
      .order("created_at", { ascending: false });

    setSelectedClient({ ...client, cars: cars || [] });
    setShowCarsDialog(true);
  };

  const handleDeleteClick = (client: Client) => {
    setSelectedClient(client);
    setShowDeleteDialog(true);
  };

  const handleDelete = async () => {
    if (!selectedClient) return;

    try {
      // Call the Edge Function to delete the user (requires admin auth)
      const { data: sessionData } = await supabase.auth.getSession();
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/delete-user`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionData.session?.access_token}`,
          },
          body: JSON.stringify({ userId: selectedClient.id }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao apagar cliente');
      }

      toast({
        title: "Cliente apagado com sucesso!",
      });

      setShowDeleteDialog(false);
      setSelectedClient(null);
      fetchClients();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao apagar cliente",
        description: error.message,
      });
    }
  };

  const fetchClients = async () => {
    try {
      // First get all admin user IDs
      const { data: adminRoles } = await supabase
        .from("user_roles")
        .select("user_id")
        .eq("role", "admin");

      const adminIds = adminRoles?.map(role => role.user_id) || [];

      // Get profiles excluding admins
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (profilesError) throw profilesError;

      // Filter out admins and get car count for each client
      const clientsWithCars = await Promise.all(
        (profilesData || [])
          .filter(profile => !adminIds.includes(profile.id))
          .map(async (profile) => {
            const { count } = await supabase
              .from("cars")
              .select("*", { count: "exact", head: true })
              .eq("owner_id", profile.id);

            return {
              ...profile,
              car_count: count || 0,
            };
          })
      );

      setClients(clientsWithCars);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao carregar clientes",
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

  const filteredClients = clients.filter(
    (client) =>
      client.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (client.phone && client.phone.includes(searchTerm))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestão de Clientes</h2>
          <p className="text-muted-foreground">
            Lista de todos os clientes registados na oficina.
          </p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Adicionar Cliente
        </Button>
      </div>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Pesquisar por nome, email ou telefone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      <AddClientDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onClientAdded={fetchClients}
      />

      {filteredClients.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Nenhum cliente</CardTitle>
            <CardDescription>
              {clients.length === 0 
                ? "Ainda não existem clientes registados no sistema."
                : "Nenhum cliente encontrado com esses critérios de pesquisa."}
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredClients.map((client) => (
            <Card key={client.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {client.first_name} {client.last_name}
                      </CardTitle>
                    </div>
                  </div>
                  <Badge variant="outline">{client.car_count} carros</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{client.email}</span>
                </div>
                {client.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{client.phone}</span>
                  </div>
                )}
                <div className="text-xs text-muted-foreground pt-2">
                  Cliente desde {new Date(client.created_at).toLocaleDateString("pt-PT")}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewCars(client)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Carros
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditClient(client)}
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteClick(client)}
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

      {selectedClient && (
        <>
          <EditClientDialog
            open={showEditDialog}
            onOpenChange={setShowEditDialog}
            client={selectedClient}
            onClientUpdated={fetchClients}
          />

          <Dialog open={showCarsDialog} onOpenChange={setShowCarsDialog}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Carros de {selectedClient.first_name} {selectedClient.last_name}</DialogTitle>
                <DialogDescription>
                  {selectedClient.cars?.length || 0} carro(s) registado(s)
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 md:grid-cols-2 mt-4">
                {selectedClient.cars && selectedClient.cars.length > 0 ? (
                  selectedClient.cars.map((car) => (
                    <Card key={car.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{car.marca} {car.modelo}</CardTitle>
                        <CardDescription>{car.matricula}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Ano:</span>
                          <span className="font-medium">{car.ano}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Cor:</span>
                          <span className="font-medium">{car.cor}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Quilometragem:</span>
                          <span className="font-medium">{car.quilometragem.toLocaleString()} km</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-muted-foreground col-span-2 text-center py-8">
                    Este cliente ainda não tem carros registados.
                  </p>
                )}
              </div>
            </DialogContent>
          </Dialog>

          <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Tem a certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não pode ser desfeita. Isto irá apagar permanentemente o cliente{" "}
                  <strong>{selectedClient.first_name} {selectedClient.last_name}</strong> e todos os seus dados associados (carros e serviços).
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
