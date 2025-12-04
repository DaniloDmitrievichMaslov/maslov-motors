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
import { Loader2, Info } from "lucide-react";
import { brandsList, carBrands, carColors } from "@/lib/carData";

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
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [customBrand, setCustomBrand] = useState("");
  const [customModel, setCustomModel] = useState("");
  const [customColor, setCustomColor] = useState("");

  const availableModels = selectedBrand && selectedBrand !== "Outro" ? carBrands[selectedBrand] || [] : [];
  const isOtherBrand = selectedBrand === "Outro";
  const isOtherModel = selectedModel === "Outro";
  const isOtherColor = selectedColor === "Outro";

  useEffect(() => {
    if (open) {
      fetchClients();
    }
  }, [open]);

  // Reset model when brand changes
  useEffect(() => {
    setSelectedModel("");
    setCustomModel("");
  }, [selectedBrand]);

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

    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const { error } = await supabase.from("cars").insert({
        owner_id: selectedClient,
        marca: finalBrand,
        modelo: finalModel,
        matricula: formData.get("matricula") as string,
        ano: parseInt(formData.get("ano") as string),
        cor: finalColor,
        quilometragem: parseInt(formData.get("quilometragem") as string),
      });

      if (error) throw error;

      toast({
        title: "Carro adicionado com sucesso!",
      });

      // Reset form
      setSelectedBrand("");
      setSelectedModel("");
      setSelectedColor("");
      setCustomBrand("");
      setCustomModel("");
      setCustomColor("");
      setSelectedClient("");

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
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Carro</DialogTitle>
          <DialogDescription>
            Selecione o cliente e preencha os dados do carro. Escolha "Outro" se não encontrar na lista.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Cliente */}
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

            {/* Marca */}
            <div className="grid gap-2">
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
                />
              )}
            </div>

            {/* Modelo */}
            <div className="grid gap-2">
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
                    />
                  )}
                </>
              )}
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
              {/* Cor */}
              <div className="grid gap-2">
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
                  />
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quilometragem">Quilometragem</Label>
                <Input id="quilometragem" name="quilometragem" type="number" min="0" required />
              </div>
            </div>

            {/* Info Box */}
            <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
              <Info className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground">
                Se não encontrar a marca ou modelo na lista, selecione "Outro" e escreva manualmente.
              </p>
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
