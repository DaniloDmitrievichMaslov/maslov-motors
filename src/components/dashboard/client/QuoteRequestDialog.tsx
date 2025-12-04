import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Phone, MessageSquare, User, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { availableServices } from "@/lib/carData";

type QuoteRequestDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  userName: string;
  userPhone: string | null;
};

export default function QuoteRequestDialog({ 
  open, 
  onOpenChange, 
  userId, 
  userName,
  userPhone 
}: QuoteRequestDialogProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editingPhone, setEditingPhone] = useState(false);
  const [newPhone, setNewPhone] = useState(userPhone || "");
  const [selectedService, setSelectedService] = useState("");
  const [customService, setCustomService] = useState("");
  const workshopPhone = "+351 933 468 899";

  const selectedServiceData = availableServices.find(s => s.id === selectedService);
  const isOtherService = selectedService === "outro";

  const handleUpdatePhone = async () => {
    if (!newPhone.trim()) {
      toast({
        variant: "destructive",
        title: "Telefone inválido",
        description: "Por favor, insira um número de telefone válido.",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ phone: newPhone })
        .eq("id", userId);

      if (error) throw error;

      toast({
        title: "Telefone atualizado",
        description: "O seu número de telefone foi atualizado com sucesso.",
      });

      setEditingPhone(false);
      window.location.reload();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar telefone",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userPhone && !newPhone) {
      toast({
        variant: "destructive",
        title: "Telefone não disponível",
        description: "Por favor, adicione um número de telefone primeiro.",
      });
      setEditingPhone(true);
      return;
    }

    setLoading(true);

    try {
      const serviceName = isOtherService ? customService : selectedServiceData?.name;
      
      const fullMessage = serviceName 
        ? `Serviço pretendido: ${serviceName}\n\n${message}`
        : message;

      const { error } = await supabase.from("quote_requests").insert([
        {
          user_id: userId,
          client_name: userName,
          client_phone: userPhone || newPhone,
          message: fullMessage,
          status: "pendente",
        },
      ]);

      if (error) throw error;

      toast({
        title: "Orçamento solicitado",
        description: "Receberá uma chamada em breve. Obrigado!",
      });

      setMessage("");
      setSelectedService("");
      setCustomService("");
      onOpenChange(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao solicitar orçamento",
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
          <DialogTitle className="text-2xl">Pedir Orçamento</DialogTitle>
          <DialogDescription>
            Escolha como prefere solicitar o seu orçamento
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Opção: Ligar diretamente */}
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:border-primary/40 transition-all">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">Ligar Agora</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Fale diretamente com a nossa equipa
                </p>
                <a
                  href={`tel:${workshopPhone}`}
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                >
                  <Phone className="h-4 w-4" />
                  {workshopPhone}
                </a>
              </div>
            </div>
          </Card>

          {/* Divisor */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-4 text-muted-foreground">ou</span>
            </div>
          </div>

          {/* Opção: Enviar mensagem */}
          <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-accent/10">
                <MessageSquare className="h-6 w-6 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">Enviar Pedido</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Descreva o que precisa e nós ligamos-lhe
                </p>

                {!userPhone && !editingPhone && (
                  <div className="mb-4 p-4 bg-muted/50 rounded-lg border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm font-medium">Telefone não disponível</p>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Para enviar um pedido de orçamento, precisa de adicionar um número de telefone.
                    </p>
                    <Button 
                      onClick={() => setEditingPhone(true)} 
                      variant="outline"
                      size="sm"
                    >
                      Adicionar Telefone
                    </Button>
                  </div>
                )}

                {editingPhone && (
                  <div className="mb-4 space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Número de Telefone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Ex: 933 468 899"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleUpdatePhone}
                        disabled={loading}
                        size="sm"
                      >
                        {loading ? "A guardar..." : "Guardar Telefone"}
                      </Button>
                      <Button 
                        onClick={() => setEditingPhone(false)}
                        variant="outline"
                        size="sm"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Seleção de Serviço */}
                  <div className="space-y-2">
                    <Label htmlFor="service">Tipo de Serviço (Opcional)</Label>
                    <Select value={selectedService} onValueChange={setSelectedService}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o serviço pretendido" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[200px]">
                        {availableServices.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Descrição do serviço selecionado */}
                    {selectedServiceData && !isOtherService && (
                      <div className="flex items-start gap-2 p-2 bg-primary/5 rounded-lg">
                        <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <p className="text-xs text-muted-foreground">{selectedServiceData.description}</p>
                      </div>
                    )}

                    {/* Campo para serviço personalizado */}
                    {isOtherService && (
                      <Input
                        placeholder="Descreva o serviço pretendido"
                        value={customService}
                        onChange={(e) => setCustomService(e.target.value)}
                      />
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Detalhes adicionais</Label>
                    <Textarea
                      id="message"
                      placeholder="Ex: Preciso de uma revisão completa ao meu carro..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={4}
                      className="resize-none"
                      disabled={!userPhone && !editingPhone}
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => onOpenChange(false)}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" disabled={loading || (!userPhone && !editingPhone)}>
                      {loading ? "A enviar..." : "Enviar Pedido"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
