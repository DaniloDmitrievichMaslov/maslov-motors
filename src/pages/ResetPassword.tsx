import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft, CheckCircle } from "lucide-react";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRecovery, setIsRecovery] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Check for recovery token in URL hash
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    if (hashParams.get("type") === "recovery") {
      setIsRecovery(true);
    }

    // Listen for password recovery event
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsRecovery(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.length < 6) {
      toast({ variant: "destructive", title: "Erro", description: "A password deve ter no mínimo 6 caracteres." });
      return;
    }
    if (password !== confirmPassword) {
      toast({ variant: "destructive", title: "Erro", description: "As passwords não coincidem." });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setSuccess(true);
      toast({ title: "Password alterada!", description: "A sua password foi atualizada com sucesso." });
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erro", description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isRecovery) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <Card className="w-full max-w-md relative z-10 glass border-border/30 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Link Inválido</CardTitle>
            <CardDescription>Este link de recuperação é inválido ou já expirou.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link to="/auth">
              <Button className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar ao Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-subtle"></div>
      
      <Card className="w-full max-w-md relative z-10 animate-scale-in glass border-border/30 shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-2xl w-fit">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center">
              <span className="text-2xl font-bold text-white">M</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Nova Password</CardTitle>
          <CardDescription>Introduza a sua nova password</CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="text-center space-y-4 animate-fade-in">
              <CheckCircle className="mx-auto h-12 w-12 text-success" />
              <p className="text-muted-foreground">Password alterada com sucesso! A redirecionar...</p>
            </div>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">Nova Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="transition-smooth focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="transition-smooth focus:border-primary"
                />
              </div>
              <Button type="submit" className="w-full transition-smooth hover-lift" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    A atualizar...
                  </>
                ) : (
                  "Alterar Password"
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
