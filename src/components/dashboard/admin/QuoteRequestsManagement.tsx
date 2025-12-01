import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Phone, MessageSquare, CheckCircle, Clock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  const filteredRequests = requests.filter(
    (request) => filterStatus === "all" || request.status === filterStatus
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Pedidos de Orçamento</h2>
          <p className="text-muted-foreground">
            Gerir pedidos de orçamento dos clientes
          </p>
        </div>
      </div>

      {/* Filtro de Status */}
      <div className="flex gap-4 items-center">
        <label className="text-sm font-medium">Filtrar por status:</label>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[200px]">
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

      {/* Lista de Pedidos */}
      <div className="grid gap-4">
        {filteredRequests.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                {filterStatus === "all"
                  ? "Nenhum pedido de orçamento encontrado."
                  : `Nenhum pedido ${statusLabels[filterStatus as keyof typeof statusLabels].toLowerCase()} encontrado.`}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredRequests.map((request) => {
            const StatusIcon = statusIcons[request.status];
            return (
              <Card key={request.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-xl">{request.client_name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {new Date(request.created_at).toLocaleString("pt-PT")}
                      </p>
                    </div>
                    <Badge className={`${statusColors[request.status]} gap-1`}>
                      <StatusIcon className="h-3 w-3" />
                      {statusLabels[request.status]}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Telefone */}
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={`tel:${request.client_phone}`}
                      className="text-primary font-semibold hover:underline"
                    >
                      {request.client_phone}
                    </a>
                  </div>

                  {/* Mensagem */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Mensagem:</span>
                    </div>
                    <p className="text-sm bg-muted p-3 rounded-md">{request.message}</p>
                  </div>

                  {/* Atualizar Status */}
                  <div className="flex gap-2 pt-2">
                    <Select
                      value={request.status}
                      onValueChange={(value) =>
                        updateStatus(request.id, value as "pendente" | "contactado" | "concluido")
                      }
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pendente">Pendente</SelectItem>
                        <SelectItem value="contactado">Contactado</SelectItem>
                        <SelectItem value="concluido">Concluído</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
