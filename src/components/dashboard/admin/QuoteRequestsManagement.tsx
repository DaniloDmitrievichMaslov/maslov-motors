import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Phone, MessageSquare, CheckCircle, Clock, Calendar, Trash2, FileText } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type QuoteRequest = {
  id: string;
  user_id: string;
  client_name: string;
  client_phone: string;
  message: string;
  status: "pendente" | "contactado" | "concluido";
  created_at: string;
};

const statusLabels = {
  pendente: "Pendente",
  contactado: "Contactado",
  concluido: "Concluído",
};

const statusColors = {
  pendente: "bg-yellow-500",
  contactado: "bg-blue-500",
  concluido: "bg-green-500",
};

const statusIcons = {
  pendente: Clock,
  contactado: Phone,
  concluido: CheckCircle,
};

export default function QuoteRequestsManagement() {
  const { toast } = useToast();
  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("marcacoes");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from("quote_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRequests((data || []) as QuoteRequest[]);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao carregar pedidos",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: "pendente" | "contactado" | "concluido") => {
    try {
      const { error } = await supabase
        .from("quote_requests")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Status atualizado",
        description: "O status do pedido foi atualizado com sucesso.",
      });

      fetchRequests();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar status",
        description: error.message,
      });
    }
  };

  const deleteRequest = async (id: string) => {
    try {
      const { error } = await supabase
        .from("quote_requests")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Pedido eliminado",
        description: "O pedido foi eliminado com sucesso.",
      });

      fetchRequests();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao eliminar pedido",
        description: error.message,
      });
    }
  };

  // Separar marcações de orçamentos baseado no conteúdo da mensagem
  const isBooking = (request: QuoteRequest) => request.message.includes("🚗 Marcação de Serviço");
  
  const bookings = requests.filter(isBooking);
  const quoteRequests = requests.filter(r => !isBooking(r));

  const getFilteredRequests = (list: QuoteRequest[]) => {
    return list.filter(
      (request) => filterStatus === "all" || request.status === filterStatus
    );
  };

  const filteredBookings = getFilteredRequests(bookings);
  const filteredQuotes = getFilteredRequests(quoteRequests);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const RequestCard = ({ request, type }: { request: QuoteRequest; type: "booking" | "quote" }) => {
    const StatusIcon = statusIcons[request.status];
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
            <div className="space-y-1 min-w-0 flex-1">
              <CardTitle className="text-lg sm:text-xl truncate">{request.client_name}</CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {new Date(request.created_at).toLocaleString("pt-PT")}
              </p>
            </div>
            <Badge className={`${statusColors[request.status]} gap-1 self-start shrink-0`}>
              <StatusIcon className="h-3 w-3" />
              <span className="hidden xs:inline">{statusLabels[request.status]}</span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          {/* Telefone */}
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
            <a
              href={`tel:${request.client_phone}`}
              className="text-primary font-semibold hover:underline text-sm sm:text-base truncate"
            >
              {request.client_phone}
            </a>
          </div>

          {/* Mensagem */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-xs sm:text-sm font-medium">
                {type === "booking" ? "Detalhes da Marcação:" : "Mensagem:"}
              </span>
            </div>
            <p className="text-xs sm:text-sm bg-muted p-2 sm:p-3 rounded-md whitespace-pre-line break-words">
              {request.message}
            </p>
          </div>

          {/* Ações */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Select
              value={request.status}
              onValueChange={(value) =>
                updateStatus(request.id, value as "pendente" | "contactado" | "concluido")
              }
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="contactado">Contactado</SelectItem>
                <SelectItem value="concluido">Concluído</SelectItem>
              </SelectContent>
            </Select>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" className="w-full sm:w-auto">
                  <Trash2 className="h-4 w-4 sm:mr-2" />
                  <span className="sm:inline">Eliminar</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="max-w-[90vw] sm:max-w-lg">
                <AlertDialogHeader>
                  <AlertDialogTitle>Eliminar pedido?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta ação não pode ser desfeita. O pedido de {request.client_name} será permanentemente eliminado.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                  <AlertDialogCancel className="w-full sm:w-auto">Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deleteRequest(request.id)}
                    className="w-full sm:w-auto bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Eliminar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    );
  };

  const EmptyState = ({ type }: { type: "booking" | "quote" }) => (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12">
        {type === "booking" ? (
          <Calendar className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-4" />
        ) : (
          <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-4" />
        )}
        <p className="text-muted-foreground text-center text-sm sm:text-base px-4">
          {filterStatus === "all"
            ? `Nenhuma ${type === "booking" ? "marcação" : "pedido de orçamento"} encontrada.`
            : `Nenhuma ${type === "booking" ? "marcação" : "pedido de orçamento"} ${statusLabels[filterStatus as keyof typeof statusLabels].toLowerCase()} encontrada.`}
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Pedidos</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Gerir marcações e pedidos de orçamento dos clientes
          </p>
        </div>
      </div>

      {/* Filtro de Status */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
        <label className="text-sm font-medium">Filtrar por status:</label>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="pendente">Pendentes</SelectItem>
            <SelectItem value="contactado">Contactados</SelectItem>
            <SelectItem value="concluido">Concluídos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs para Marcações e Orçamentos */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="marcacoes" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Marcações</span>
            {bookings.length > 0 && (
              <Badge variant="secondary" className="ml-1 hidden sm:inline-flex">
                {bookings.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="orcamentos" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Orçamentos</span>
            {quoteRequests.length > 0 && (
              <Badge variant="secondary" className="ml-1 hidden sm:inline-flex">
                {quoteRequests.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="marcacoes" className="mt-0">
          <div className="grid gap-3 sm:gap-4">
            {filteredBookings.length === 0 ? (
              <EmptyState type="booking" />
            ) : (
              filteredBookings.map((request) => (
                <RequestCard key={request.id} request={request} type="booking" />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="orcamentos" className="mt-0">
          <div className="grid gap-3 sm:gap-4">
            {filteredQuotes.length === 0 ? (
              <EmptyState type="quote" />
            ) : (
              filteredQuotes.map((request) => (
                <RequestCard key={request.id} request={request} type="quote" />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
