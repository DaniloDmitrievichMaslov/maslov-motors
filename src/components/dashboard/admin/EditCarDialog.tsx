import { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

type CarWithOwner = {
  id: string;
  marca: string;
  modelo: string;
  matricula: string;
  ano: number;
  cor: string;
  quilometragem: number;
  owner_id: string;
  owner_name?: string;
};

type EditCarDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  car: CarWithOwner;
  onCarUpdated: () => void;
};

export default function EditCarDialog({
  open,
  onOpenChange,
  car,
  onCarUpdated,
}: EditCarDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const ano = parseInt(formData.get("ano") as string);
    const quilometragem = parseInt(formData.get("quilometragem") as string);

    try {
      const { error } = await supabase
        .from("cars")
        .update({
          marca: formData.get("marca") as string,
          modelo: formData.get("modelo") as string,
          matricula: formData.get("matricula") as string,
          ano: ano,
          cor: formData.get("cor") as string,
          quilometragem: quilometragem,
        })
        .eq("id", car.id);

      if (error) throw error;

      toast({
        title: "Carro atualizado com sucesso!",
      });

      onCarUpdated();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar carro",
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
          <DialogTitle>Editar Carro</DialogTitle>
          <DialogDescription>
            Proprietário: {car.owner_name}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="marca">Marca</Label>
                <Input
                  id="marca"
                  name="marca"
                  defaultValue={car.marca}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="modelo">Modelo</Label>
                <Input
                  id="modelo"
                  name="modelo"
                  defaultValue={car.modelo}
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="matricula">Matrícula</Label>
              <Input
                id="matricula"
                name="matricula"
                defaultValue={car.matricula}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="ano">Ano</Label>
                <Input
                  id="ano"
                  name="ano"
                  type="number"
                  defaultValue={car.ano}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cor">Cor</Label>
                <Input
                  id="cor"
                  name="cor"
                  defaultValue={car.cor}
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="quilometragem">Quilometragem (km)</Label>
              <Input
                id="quilometragem"
                name="quilometragem"
                type="number"
                defaultValue={car.quilometragem}
                required
              />
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
                "Guardar Alterações"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
