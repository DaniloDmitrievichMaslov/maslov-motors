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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Eye, EyeOff, Trash2, Save, KeyRound, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
};

type EditProfileDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: Profile;
  onProfileUpdated: () => void;
  onAccountDeleted: () => void;
};

export default function EditProfileDialog({
  open,
  onOpenChange,
  profile,
  onProfileUpdated,
  onAccountDeleted,
}: EditProfileDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  // Profile form
  const [firstName, setFirstName] = useState(profile.first_name);
  const [lastName, setLastName] = useState(profile.last_name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone || "");
  
  // Password form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Reset form when profile changes
  useEffect(() => {
    setFirstName(profile.first_name);
    setLastName(profile.last_name);
    setEmail(profile.email);
    setPhone(profile.phone || "");
  }, [profile]);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Update profile in database
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone || null,
        })
        .eq("id", profile.id);

      if (profileError) throw profileError;

      // Update email in auth if changed
      if (email !== profile.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: email,
        });
        
        if (emailError) throw emailError;
        
        toast({
          title: "Perfil atualizado!",
          description: "Verifique o seu novo email para confirmar a alteração.",
        });
      } else {
        toast({
          title: "Perfil atualizado com sucesso!",
        });
      }

      onProfileUpdated();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar perfil",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords não coincidem",
        description: "Por favor, confirme que as passwords são iguais.",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        variant: "destructive",
        title: "Password muito curta",
        description: "A password deve ter pelo menos 6 caracteres.",
      });
      return;
    }

    setIsPasswordLoading(true);

    try {
      // First verify current password by re-authenticating
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: profile.email,
        password: currentPassword,
      });

      if (signInError) {
        throw new Error("Password atual incorreta");
      }

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) throw updateError;

      toast({
        title: "Password alterada com sucesso!",
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao alterar password",
        description: error.message,
      });
    } finally {
      setIsPasswordLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleteLoading(true);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/delete-user`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionData.session?.access_token}`,
          },
          body: JSON.stringify({ userId: profile.id }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao eliminar conta');
      }

      toast({
        title: "Conta eliminada",
        description: "A sua conta foi eliminada permanentemente.",
      });

      onAccountDeleted();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao eliminar conta",
        description: error.message,
      });
    } finally {
      setIsDeleteLoading(false);
      setShowDeleteDialog(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset password fields when closing
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
    onOpenChange(open);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              O Meu Perfil
            </DialogTitle>
            <DialogDescription>
              Gerencie as suas informações pessoais e segurança da conta.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Dados Pessoais</TabsTrigger>
              <TabsTrigger value="security">Segurança</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4 pt-4">
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nome</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apelido</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telemóvel</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+351 912 345 678"
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      A guardar...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Guardar Alterações
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="security" className="space-y-4 pt-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <KeyRound className="h-4 w-4" />
                    Alterar Password
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Introduza a sua password atual e escolha uma nova.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Password Atual</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPassword ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nova Password</Label>
                      <Input
                        id="newPassword"
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Mínimo 6 caracteres"
                        required
                        minLength={6}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar Nova Password</Label>
                      <Input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repita a nova password"
                        required
                        minLength={6}
                      />
                    </div>

                    <Button type="submit" variant="secondary" className="w-full" disabled={isPasswordLoading}>
                      {isPasswordLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          A alterar...
                        </>
                      ) : (
                        "Alterar Password"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Separator />

              <Card className="border-destructive/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-destructive flex items-center gap-2">
                    <Trash2 className="h-4 w-4" />
                    Zona de Perigo
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Ações irreversíveis que afetam a sua conta.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Ao eliminar a sua conta, todos os seus dados serão permanentemente removidos, 
                    incluindo os seus carros e histórico de serviços.
                  </p>
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Eliminar Conta Permanentemente
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem a certeza absoluta?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação <strong>não pode ser desfeita</strong>. Isto irá eliminar permanentemente 
              a sua conta, todos os seus carros registados e o histórico completo de serviços.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleteLoading}>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteAccount} 
              disabled={isDeleteLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleteLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  A eliminar...
                </>
              ) : (
                "Sim, eliminar minha conta"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
