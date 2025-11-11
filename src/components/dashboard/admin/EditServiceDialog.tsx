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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash2 } from "lucide-react";
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

type ServiceWithDetails = {
  id: string;
  service_name: string;
  scheduled_date: string;
  status: "agendado" | "em_processo" | "concluido";
  description: string | null;
  parts_used: string | null;
  parts_cost: number;
  work_hours: number;
  cost_per_hour: number;
  final_price: number;
  profit: number;
  next_revision_date: string | null;
  recommendations: string | null;
  car_id: string;
  car_info?: string;
  owner_name?: string;
};

type EditServiceDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: ServiceWithDetails;
  onServiceUpdated: () => void;
};

export default function EditServiceDialog({
  open,
  onOpenChange,
  service,
  onServiceUpdated,
}: EditServiceDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const workHours = parseFloat(formData.get("work_hours") as string) || 0;
    const costPerHour = parseFloat(formData.get("cost_per_hour") as string) || 0;
    const partsCost = parseFloat(formData.get("parts_cost") as string) || 0;
    
    // Calcular preço final: (horas × custo/hora) + custo das peças
    const finalPrice = (workHours * costPerHour) + partsCost;
    
    // Calcular lucro: preço final - custo das peças
    const profit = finalPrice - partsCost;

    try {
      const { error } = await supabase
        .from("services")
        .update({
          service_name: formData.get("service_name") as string,
          scheduled_date: formData.get("scheduled_date") as string,
          status: formData.get("status") as "agendado" | "em_processo" | "concluido",
          description: formData.get("description") as string || null,
          parts_used: formData.get("parts_used") as string || null,
          parts_cost: partsCost,
          work_hours: workHours,
          cost_per_hour: costPerHour,
          final_price: finalPrice,
          profit: profit,
          next_revision_date: formData.get("next_revision_date") as string || null,
          recommendations: formData.get("recommendations") as string || null,
        })
        .eq("id", service.id);

      if (error) throw error;

      toast({
        title: "Serviço atualizado com sucesso!",
      });

      onServiceUpdated();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar serviço",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("services")
        .delete()
        .eq("id", service.id);

      if (error) throw error;

      toast({
        title: "Serviço apagado com sucesso!",
      });

      onServiceUpdated();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao apagar serviço",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
      setShowDeleteDialog(false);
    }
  };

  // Format date for datetime-local input
  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().slice(0, 16);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Serviço</DialogTitle>
          <DialogDescription>
            {service.car_info} - {service.owner_name}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="service_name">Nome do Serviço</Label>
              <Input
                id="service_name"
                name="service_name"
                defaultValue={service.service_name}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="scheduled_date">Data/Hora Agendada</Label>
                <Input
                  id="scheduled_date"
                  name="scheduled_date"
                  type="datetime-local"
                  defaultValue={formatDateForInput(service.scheduled_date)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select name="status" defaultValue={service.status} required>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agendado">Agendado</SelectItem>
                    <SelectItem value="em_processo">Em Processo</SelectItem>
                    <SelectItem value="concluido">Concluído</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={service.description || ""}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="parts_used">Peças Utilizadas</Label>
              <Textarea
                id="parts_used"
                name="parts_used"
                defaultValue={service.parts_used || ""}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="parts_cost">Custo das Peças (€)</Label>
                <Input
                  id="parts_cost"
                  name="parts_cost"
                  type="number"
                  step="0.01"
                  min="0"
                  defaultValue={service.parts_cost}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="work_hours">Horas de Trabalho</Label>
                <Input
                  id="work_hours"
                  name="work_hours"
                  type="number"
                  step="0.5"
                  min="0"
                  defaultValue={service.work_hours}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="cost_per_hour">Custo por Hora (€)</Label>
              <Input
                id="cost_per_hour"
                name="cost_per_hour"
                type="number"
                step="0.01"
                min="0"
                defaultValue={service.cost_per_hour}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="next_revision_date">Próxima Revisão Recomendada</Label>
              <Input
                id="next_revision_date"
                name="next_revision_date"
                type="date"
                defaultValue={service.next_revision_date || ""}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="recommendations">Recomendações</Label>
              <Textarea
                id="recommendations"
                name="recommendations"
                defaultValue={service.recommendations || ""}
              />
            </div>

            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm font-medium text-muted-foreground">
                O preço final e o lucro serão calculados automaticamente ao guardar:
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Preço Final = (Horas × Custo/Hora) + Custo das Peças
              </p>
              <p className="text-xs text-muted-foreground">
                Lucro = Preço Final - Custo das Peças
              </p>
            </div>
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button 
              type="button" 
              variant="destructive" 
              onClick={() => setShowDeleteDialog(true)}
              disabled={isLoading}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Apagar
            </Button>
            <div className="flex gap-2">
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
            </div>
          </DialogFooter>
        </form>
      </DialogContent>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem a certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser revertida. O serviço será permanentemente apagado.
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
    </Dialog>
  );
}
