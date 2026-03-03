import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, CheckCircle } from "lucide-react";

export default function ForgotPasswordSection() {
  const { toast } = useToast();
  const [showReset, setShowReset] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast({ variant: "destructive", title: "Erro", description: "Introduza o seu email." });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setSent(true);
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erro", description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  if (!showReset) {
    return (
      <button
        type="button"
        onClick={() => setShowReset(true)}
        className="w-full text-center text-sm text-muted-foreground hover:text-primary transition-smooth mt-2"
      >
        Esqueceu a palavra-passe?
      </button>
    );
  }

  if (sent) {
    return (
      <div className="mt-4 p-4 rounded-lg bg-success/10 border border-success/20 animate-fade-in space-y-2">
        <div className="flex items-center gap-2 text-success">
          <CheckCircle className="h-4 w-4" />
          <span className="text-sm font-medium">Email enviado!</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Verifique a sua caixa de correio para o link de recuperação.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 p-4 rounded-lg bg-muted/50 border border-border/30 animate-fade-in space-y-3">
      <p className="text-sm text-muted-foreground">
        Introduza o seu email para receber um link de recuperação:
      </p>
      <form onSubmit={handleResetRequest} className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="reset-email" className="text-xs">Email</Label>
          <Input
            id="reset-email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="transition-smooth focus:border-primary h-9 text-sm"
          />
        </div>
        <div className="flex gap-2">
          <Button type="submit" size="sm" className="flex-1 transition-smooth" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Mail className="h-3 w-3 mr-1" />
                Enviar
              </>
            )}
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => setShowReset(false)}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
