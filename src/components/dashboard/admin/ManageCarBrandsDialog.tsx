import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

type ManageCarBrandsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type CarBrand = {
  id: string;
  brand_name: string;
  models: string[];
};

export default function ManageCarBrandsDialog({ open, onOpenChange }: ManageCarBrandsDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [brands, setBrands] = useState<CarBrand[]>([]);
  const [newBrand, setNewBrand] = useState("");
  const [newModel, setNewModel] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<CarBrand | null>(null);

  useEffect(() => {
    if (open) {
      fetchBrands();
    }
  }, [open]);

  const fetchBrands = async () => {
    const { data, error } = await supabase
      .from("custom_car_brands")
      .select("*")
      .order("brand_name");

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro ao carregar marcas",
        description: error.message,
      });
    } else {
      setBrands(data || []);
    }
  };

  const handleAddBrand = async () => {
    if (!newBrand.trim()) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("custom_car_brands")
        .insert({ brand_name: newBrand.trim(), models: [] });

      if (error) throw error;

      toast({ title: "Marca adicionada com sucesso!" });
      setNewBrand("");
      fetchBrands();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao adicionar marca",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBrand = async (id: string) => {
    try {
      const { error } = await supabase
        .from("custom_car_brands")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({ title: "Marca eliminada com sucesso!" });
      if (selectedBrand?.id === id) setSelectedBrand(null);
      fetchBrands();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao eliminar marca",
        description: error.message,
      });
    }
  };

  const handleAddModel = async () => {
    if (!selectedBrand || !newModel.trim()) return;

    setIsLoading(true);
    try {
      const updatedModels = [...selectedBrand.models, newModel.trim()];
      const { error } = await supabase
        .from("custom_car_brands")
        .update({ models: updatedModels })
        .eq("id", selectedBrand.id);

      if (error) throw error;

      toast({ title: "Modelo adicionado com sucesso!" });
      setNewModel("");
      setSelectedBrand({ ...selectedBrand, models: updatedModels });
      fetchBrands();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao adicionar modelo",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveModel = async (model: string) => {
    if (!selectedBrand) return;

    try {
      const updatedModels = selectedBrand.models.filter(m => m !== model);
      const { error } = await supabase
        .from("custom_car_brands")
        .update({ models: updatedModels })
        .eq("id", selectedBrand.id);

      if (error) throw error;

      toast({ title: "Modelo removido com sucesso!" });
      setSelectedBrand({ ...selectedBrand, models: updatedModels });
      fetchBrands();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao remover modelo",
        description: error.message,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Gerir Marcas e Modelos</DialogTitle>
          <DialogDescription>
            Adicione marcas e modelos personalizados à lista de carros.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          {/* Coluna das Marcas */}
          <div className="space-y-3">
            <Label>Marcas Personalizadas</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Nova marca..."
                value={newBrand}
                onChange={(e) => setNewBrand(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddBrand()}
              />
              <Button size="icon" onClick={handleAddBrand} disabled={isLoading}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="h-[250px]">
              <div className="space-y-2 pr-2">
                {brands.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Nenhuma marca personalizada
                  </p>
                ) : (
                  brands.map((brand) => (
                    <Card
                      key={brand.id}
                      className={`p-2 cursor-pointer flex justify-between items-center ${
                        selectedBrand?.id === brand.id ? "border-primary bg-primary/5" : ""
                      }`}
                      onClick={() => setSelectedBrand(brand)}
                    >
                      <span className="text-sm font-medium">{brand.brand_name}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{brand.models.length}</Badge>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteBrand(brand.id);
                          }}
                        >
                          <Trash2 className="h-3 w-3 text-destructive" />
                        </Button>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Coluna dos Modelos */}
          <div className="space-y-3">
            <Label>
              Modelos {selectedBrand ? `(${selectedBrand.brand_name})` : ""}
            </Label>
            {selectedBrand ? (
              <>
                <div className="flex gap-2">
                  <Input
                    placeholder="Novo modelo..."
                    value={newModel}
                    onChange={(e) => setNewModel(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddModel()}
                  />
                  <Button size="icon" onClick={handleAddModel} disabled={isLoading}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <ScrollArea className="h-[250px]">
                  <div className="flex flex-wrap gap-2 pr-2">
                    {selectedBrand.models.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4 w-full">
                        Nenhum modelo adicionado
                      </p>
                    ) : (
                      selectedBrand.models.map((model) => (
                        <Badge key={model} variant="secondary" className="gap-1">
                          {model}
                          <button
                            onClick={() => handleRemoveModel(model)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </>
            ) : (
              <div className="flex items-center justify-center h-[290px] text-sm text-muted-foreground">
                Selecione uma marca para ver os modelos
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}