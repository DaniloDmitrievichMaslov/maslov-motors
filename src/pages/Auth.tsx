import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft } from "lucide-react";
import { signUpSchema, signInSchema } from "@/lib/validations";
import ForgotPasswordSection from "@/components/auth/ForgotPasswordSection";

export default function Auth() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") === "signup" ? "signup" : "signin";
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = {
      email: (formData.get("email") as string)?.trim(),
      password: formData.get("password") as string,
      firstName: (formData.get("firstName") as string)?.trim(),
      lastName: (formData.get("lastName") as string)?.trim(),
      phone: (formData.get("phone") as string)?.trim() || "",
    };

    // Validate with zod
    const result = signUpSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            phone: data.phone || null,
          },
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (error) throw error;

      toast({
        title: "Conta criada com sucesso!",
        description: "Bem-vindo à Maslov Motors.",
      });

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao criar conta",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = {
      email: (formData.get("email") as string)?.trim(),
      password: formData.get("password") as string,
    };

    // Validate with zod
    const result = signInSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      toast({
        title: "Login efetuado com sucesso!",
        description: "Bem-vindo de volta.",
      });

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao fazer login",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-subtle"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-subtle" style={{ animationDelay: '1s' }}></div>
      
      <Link to="/" className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
        <Button variant="ghost" size="sm" className="gap-2 hover-lift">
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Voltar</span>
        </Button>
      </Link>
      
      <Card className="w-full max-w-md relative z-10 animate-scale-in glass border-border/30 shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-2xl w-fit animate-fade-in">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center">
              <span className="text-2xl font-bold text-white">M</span>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold animate-fade-in" style={{ animationDelay: '0.1s' }}>Maslov Motors</CardTitle>
          <CardDescription className="animate-fade-in" style={{ animationDelay: '0.2s' }}>Gestão de Oficina</CardDescription>
        </CardHeader>
        <CardContent className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin" className="transition-smooth">Entrar</TabsTrigger>
              <TabsTrigger value="signup" className="transition-smooth">Registar</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="animate-fade-in">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    className={`transition-smooth ${errors.email ? "border-destructive" : "focus:border-primary"}`}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive animate-fade-in">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input
                    id="signin-password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className={`transition-smooth ${errors.password ? "border-destructive" : "focus:border-primary"}`}
                  />
                  {errors.password && (
                    <p className="text-sm text-destructive animate-fade-in">{errors.password}</p>
                  )}
                </div>
                <Button type="submit" className="w-full transition-smooth hover-lift" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      A entrar...
                    </>
                  ) : (
                    "Entrar"
                  )}
                </Button>
                <ForgotPasswordSection />
              </form>
            </TabsContent>

            <TabsContent value="signup" className="animate-fade-in">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nome</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="João"
                      maxLength={50}
                      className={`transition-smooth ${errors.firstName ? "border-destructive" : "focus:border-primary"}`}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-destructive animate-fade-in">{errors.firstName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apelido</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Silva"
                      maxLength={50}
                      className={`transition-smooth ${errors.lastName ? "border-destructive" : "focus:border-primary"}`}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-destructive animate-fade-in">{errors.lastName}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    maxLength={255}
                    className={`transition-smooth ${errors.email ? "border-destructive" : "focus:border-primary"}`}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive animate-fade-in">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telemóvel *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+351 912 345 678"
                    maxLength={20}
                    required
                    className={`transition-smooth ${errors.phone ? "border-destructive" : "focus:border-primary"}`}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive animate-fade-in">{errors.phone}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    maxLength={72}
                    className={`transition-smooth ${errors.password ? "border-destructive" : "focus:border-primary"}`}
                  />
                  {errors.password && (
                    <p className="text-sm text-destructive animate-fade-in">{errors.password}</p>
                  )}
                </div>
                <Button type="submit" className="w-full transition-smooth hover-lift" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      A criar conta...
                    </>
                  ) : (
                    "Criar Conta"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
