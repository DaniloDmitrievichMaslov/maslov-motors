import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

type AddCarDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCarAdded: () => void;
};

type Client = {
  id: string;
  first_name: string;
  last_name: string;
};

export default function AddCarDialog({ open, onOpenChange, onCarAdded }: AddCarDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState("");

  useEffect(() => {
    if (open) {
      fetchClients();
    }
  }, [open]);

  const fetchClients = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, first_name, last_name")
      .order("first_name");

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro ao carregar clientes",
        description: error.message,
      });
    } else {
      setClients(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const { error } = await supabase.from("cars").insert({
        owner_id: selectedClient,
        marca: formData.get("marca") as string,
        modelo: formData.get("modelo") as string,
        matricula: formData.get("matricula") as string,
        ano: parseInt(formData.get("ano") as string),
        cor: formData.get("cor") as string,
        quilometragem: parseInt(formData.get("quilometragem") as string),
      });

      if (error) throw error;

      toast({
        title: "Carro adicionado com sucesso!",
      });

      onCarAdded();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao adicionar carro",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Carro</DialogTitle>
          <DialogDescription>
            Preencha os dados do carro e selecione o proprietário.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="client">Cliente</Label>
              <Select value={selectedClient} onValueChange={setSelectedClient} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.first_name} {client.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="marca">Marca</Label>
                <Input id="marca" name="marca" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="modelo">Modelo</Label>
                <Input id="modelo" name="modelo" required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="matricula">Matrícula</Label>
                <Input id="matricula" name="matricula" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ano">Ano</Label>
                <Input id="ano" name="ano" type="number" min="1900" max={new Date().getFullYear() + 1} required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="cor">Cor</Label>
                <Input id="cor" name="cor" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quilometragem">Quilometragem</Label>
                <Input id="quilometragem" name="quilometragem" type="number" min="0" required />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  A guardar...
                </>
              ) : (
                "Adicionar Carro"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
