import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { brandsList, carBrands, carColors } from "@/lib/carData";
import { Car, Info } from "lucide-react";

type AddCarDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCarAdded: () => void;
  userId: string;
};

export default function AddCarDialog({ open, onOpenChange, onCarAdded, userId }: AddCarDialogProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [customBrand, setCustomBrand] = useState("");
  const [customModel, setCustomModel] = useState("");
  const [customColor, setCustomColor] = useState("");
  const [formData, setFormData] = useState({
    matricula: "",
    ano: new Date().getFullYear().toString(),
    quilometragem: "0",
  });

  const availableModels = selectedBrand && selectedBrand !== "Outro" ? carBrands[selectedBrand] || [] : [];
  const isOtherBrand = selectedBrand === "Outro";
  const isOtherModel = selectedModel === "Outro";
  const isOtherColor = selectedColor === "Outro";

  // Reset model when brand changes
  useEffect(() => {
    setSelectedModel("");
    setCustomModel("");
  }, [selectedBrand]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalBrand = isOtherBrand ? customBrand : selectedBrand;
    const finalModel = isOtherModel ? customModel : selectedModel;
    const finalColor = isOtherColor ? customColor : selectedColor;

    if (!finalBrand || !finalModel || !finalColor) {
      toast({
        variant: "destructive",
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("cars").insert([
        {
          marca: finalBrand,
          modelo: finalModel,
          matricula: formData.matricula,
          ano: parseInt(formData.ano),
          cor: finalColor,
          quilometragem: parseInt(formData.quilometragem),
          owner_id: userId,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Carro adicionado",
        description: "O carro foi adicionado com sucesso.",
      });

      // Reset form
      setSelectedBrand("");
      setSelectedModel("");
      setSelectedColor("");
      setCustomBrand("");
      setCustomModel("");
      setCustomColor("");
      setFormData({
        matricula: "",
        ano: new Date().getFullYear().toString(),
        quilometragem: "0",
      });

      onCarAdded();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao adicionar carro",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Car className="h-5 w-5 text-primary" />
            Adicionar Novo Carro
          </DialogTitle>
          <DialogDescription>
            Selecione a marca e modelo do seu carro ou escolha "Outro" se não encontrar na lista.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Marca */}
          <div className="space-y-2">
            <Label htmlFor="marca">Marca</Label>
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a marca" />
              </SelectTrigger>
              <SelectContent className="max-h-[250px]">
                {brandsList.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
                <SelectItem value="Outro">Outro (não está na lista)</SelectItem>
              </SelectContent>
            </Select>
            {isOtherBrand && (
              <Input
                placeholder="Digite a marca do carro"
                value={customBrand}
                onChange={(e) => setCustomBrand(e.target.value)}
                className="mt-2"
              />
            )}
          </div>

          {/* Modelo */}
          <div className="space-y-2">
            <Label htmlFor="modelo">Modelo</Label>
            {isOtherBrand ? (
              <Input
                placeholder="Digite o modelo do carro"
                value={customModel}
                onChange={(e) => setCustomModel(e.target.value)}
              />
            ) : (
              <>
                <Select 
                  value={selectedModel} 
                  onValueChange={setSelectedModel}
                  disabled={!selectedBrand}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={selectedBrand ? "Selecione o modelo" : "Primeiro selecione a marca"} />
                  </SelectTrigger>
                  <SelectContent className="max-h-[250px]">
                    {availableModels.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {isOtherModel && (
                  <Input
                    placeholder="Digite o modelo do carro"
                    value={customModel}
                    onChange={(e) => setCustomModel(e.target.value)}
                    className="mt-2"
                  />
                )}
              </>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="matricula">Matrícula</Label>
              <Input
                id="matricula"
                value={formData.matricula}
                onChange={(e) => setFormData({ ...formData, matricula: e.target.value.toUpperCase() })}
                placeholder="AA-00-AA"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ano">Ano</Label>
              <Input
                id="ano"
                type="number"
                value={formData.ano}
                onChange={(e) => setFormData({ ...formData, ano: e.target.value })}
                min="1900"
                max={new Date().getFullYear() + 1}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Cor */}
            <div className="space-y-2">
              <Label htmlFor="cor">Cor</Label>
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a cor" />
                </SelectTrigger>
                <SelectContent>
                  {carColors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {isOtherColor && (
                <Input
                  placeholder="Digite a cor"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="mt-2"
                />
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="quilometragem">Quilometragem</Label>
              <Input
                id="quilometragem"
                type="number"
                value={formData.quilometragem}
                onChange={(e) => setFormData({ ...formData, quilometragem: e.target.value })}
                min="0"
                required
              />
            </div>
          </div>

          {/* Info Box */}
          <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
            <Info className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground">
              Se não encontrar a sua marca ou modelo na lista, selecione "Outro" e escreva manualmente.
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "A adicionar..." : "Adicionar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
