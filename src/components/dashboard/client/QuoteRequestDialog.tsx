import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Phone, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";

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
  const workshopPhone = "+351 912 345 678"; // Número da oficina

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userPhone) {
      toast({
        variant: "destructive",
        title: "Telefone não disponível",
        description: "Por favor, atualize o seu perfil com um número de telefone.",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("quote_requests").insert([
        {
          user_id: userId,
          client_name: userName,
          client_phone: userPhone,
          message: message,
          status: "pendente",
        },
      ]);

      if (error) throw error;

      toast({
        title: "Orçamento solicitado",
        description: "Receberá uma chamada em breve. Obrigado!",
      });

      setMessage("");
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
      <DialogContent className="sm:max-w-[500px]">
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
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="message">O que precisa?</Label>
                    <Textarea
                      id="message"
                      placeholder="Ex: Preciso de uma revisão completa ao meu carro..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={4}
                      className="resize-none"
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
                    <Button type="submit" disabled={loading || !userPhone}>
                      {loading ? "A enviar..." : "Enviar Pedido"}
                    </Button>
                  </div>
                </form>

                {!userPhone && (
                  <p className="text-sm text-destructive mt-2">
                    * Adicione um número de telefone ao seu perfil primeiro
                  </p>
                )}
              </div>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
