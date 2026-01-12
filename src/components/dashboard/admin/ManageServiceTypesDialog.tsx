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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, Edit2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

type ManageServiceTypesDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type ServiceType = {
  id: string;
  name: string;
  description: string | null;
  default_description: string | null;
  default_parts_used: string | null;
};

export default function ManageServiceTypesDialog({ open, onOpenChange }: ManageServiceTypesDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [editingType, setEditingType] = useState<ServiceType | null>(null);
  
  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [defaultDescription, setDefaultDescription] = useState("");
  const [defaultPartsUsed, setDefaultPartsUsed] = useState("");

  useEffect(() => {
    if (open) {
      fetchServiceTypes();
    }
  }, [open]);

  const fetchServiceTypes = async () => {
    const { data, error } = await supabase
      .from("custom_service_types")
      .select("*")
      .order("name");

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro ao carregar tipos de serviço",
        description: error.message,
      });
    } else {
      setServiceTypes(data || []);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setDefaultDescription("");
    setDefaultPartsUsed("");
    setEditingType(null);
  };

  const handleEdit = (type: ServiceType) => {
    setEditingType(type);
    setName(type.name);
    setDescription(type.description || "");
    setDefaultDescription(type.default_description || "");
    setDefaultPartsUsed(type.default_parts_used || "");
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast({
        variant: "destructive",
        title: "Nome obrigatório",
        description: "Por favor, insira o nome do tipo de serviço.",
      });
      return;
    }

    setIsLoading(true);
    try {
      if (editingType) {
        const { error } = await supabase
          .from("custom_service_types")
          .update({
            name: name.trim(),
            description: description.trim() || null,
            default_description: defaultDescription.trim() || null,
            default_parts_used: defaultPartsUsed.trim() || null,
          })
          .eq("id", editingType.id);

        if (error) throw error;
        toast({ title: "Tipo de serviço atualizado!" });
      } else {
        const { error } = await supabase
          .from("custom_service_types")
          .insert({
            name: name.trim(),
            description: description.trim() || null,
            default_description: defaultDescription.trim() || null,
            default_parts_used: defaultPartsUsed.trim() || null,
          });

        if (error) throw error;
        toast({ title: "Tipo de serviço adicionado!" });
      }

      resetForm();
      fetchServiceTypes();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("custom_service_types")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({ title: "Tipo de serviço eliminado!" });
      if (editingType?.id === id) resetForm();
      fetchServiceTypes();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao eliminar",
        description: error.message,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Gerir Tipos de Serviço</DialogTitle>
          <DialogDescription>
            Adicione tipos de serviço personalizados com descrições e peças padrão.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          {/* Lista de tipos */}
          <div className="space-y-3">
            <Label>Tipos Existentes</Label>
            <ScrollArea className="h-[350px]">
              <div className="space-y-2 pr-2">
                {serviceTypes.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Nenhum tipo personalizado
                  </p>
                ) : (
                  serviceTypes.map((type) => (
                    <Card
                      key={type.id}
                      className={`p-3 ${editingType?.id === type.id ? "border-primary bg-primary/5" : ""}`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{type.name}</p>
                          {type.description && (
                            <p className="text-xs text-muted-foreground truncate">{type.description}</p>
                          )}
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7"
                            onClick={() => handleEdit(type)}
                          >
                            <Edit2 className="h-3 w-3" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7"
                            onClick={() => handleDelete(type.id)}
                          >
                            <Trash2 className="h-3 w-3 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Formulário */}
          <div className="space-y-3">
            <Label>{editingType ? "Editar Tipo" : "Novo Tipo"}</Label>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="name" className="text-xs">Nome *</Label>
                <Input
                  id="name"
                  placeholder="Ex: Revisão Completa"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="description" className="text-xs">Descrição Curta</Label>
                <Input
                  id="description"
                  placeholder="Breve descrição do serviço"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="defaultDescription" className="text-xs">Descrição Padrão (auto-preenchimento)</Label>
                <Textarea
                  id="defaultDescription"
                  placeholder="Texto que será sugerido na descrição do serviço..."
                  value={defaultDescription}
                  onChange={(e) => setDefaultDescription(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="defaultPartsUsed" className="text-xs">Peças Padrão (auto-preenchimento)</Label>
                <Textarea
                  id="defaultPartsUsed"
                  placeholder="Lista de peças que serão sugeridas..."
                  value={defaultPartsUsed}
                  onChange={(e) => setDefaultPartsUsed(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                {editingType && (
                  <Button variant="outline" onClick={resetForm} className="flex-1">
                    Cancelar
                  </Button>
                )}
                <Button onClick={handleSubmit} disabled={isLoading} className="flex-1">
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : editingType ? (
                    "Guardar"
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-1" />
                      Adicionar
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}