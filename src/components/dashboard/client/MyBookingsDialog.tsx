import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Clock, Car, Loader2, RefreshCw, X, AlertTriangle } from "lucide-react";
import { format, parseISO } from "date-fns";
import { pt } from "date-fns/locale";
import { cn } from "@/lib/utils";
import RescheduleDialog from "./RescheduleDialog";
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

type Booking = {
  id: string;
  message: string;
  status: string;
  created_at: string;
  preferred_date: string | null;
  preferred_time: string | null;
  slot_id: string | null;
};

type MyBookingsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
};

const statusLabels: Record<string, string> = {
  pendente: "Pendente",
  confirmado: "Confirmado",
  cancelado: "Cancelado",
  concluido: "Concluído",
};

const statusColors: Record<string, string> = {
  pendente: "bg-warning/20 text-warning border-warning/30",
  confirmado: "bg-success/20 text-success border-success/30",
  cancelado: "bg-destructive/20 text-destructive border-destructive/30",
  concluido: "bg-info/20 text-info border-info/30",
};

export default function MyBookingsDialog({ open, onOpenChange, userId }: MyBookingsDialogProps) {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    if (open) {
      fetchBookings();
    }
  }, [open, userId]);

  const fetchBookings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("quote_requests")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setBookings(data);
    }
    setLoading(false);
  };

  const handleReschedule = (booking: Booking) => {
    setSelectedBooking(booking);
    setRescheduleOpen(true);
  };

  const handleCancelClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setCancelDialogOpen(true);
  };

  const handleCancelConfirm = async () => {
    if (!selectedBooking) return;
    
    setCancelling(true);
    const { error } = await supabase
      .from("quote_requests")
      .update({ status: "cancelado", slot_id: null })
      .eq("id", selectedBooking.id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro ao cancelar",
        description: error.message,
      });
    } else {
      toast({
        title: "Marcação cancelada",
        description: "A sua marcação foi cancelada com sucesso.",
      });
      fetchBookings();
    }
    setCancelling(false);
    setCancelDialogOpen(false);
    setSelectedBooking(null);
  };

  const handleRescheduleComplete = () => {
    setRescheduleOpen(false);
    setSelectedBooking(null);
    fetchBookings();
  };

  const parseBookingInfo = (message: string) => {
    const lines = message.split('\n');
    const info: Record<string, string> = {};
    
    for (const line of lines) {
      if (line.includes('Carro:')) {
        info.car = line.replace('Carro:', '').trim();
      } else if (line.includes('Serviço:')) {
        info.service = line.replace('Serviço:', '').trim();
      } else if (line.includes('Data Preferida:')) {
        info.date = line.replace('Data Preferida:', '').trim();
      }
    }
    
    return info;
  };

  const formatTime = (time: string | null) => {
    if (!time) return null;
    return time.slice(0, 5);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              As Minhas Marcações
            </DialogTitle>
            <DialogDescription>
              Veja e gerencie as suas marcações de serviços
            </DialogDescription>
          </DialogHeader>

          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">
                Ainda não tem marcações registadas.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {bookings.map((booking) => {
                const info = parseBookingInfo(booking.message);
                const canModify = booking.status === "pendente" || booking.status === "confirmado";
                
                return (
                  <Card key={booking.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Car className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="font-medium truncate">
                              {info.car || "Veículo"}
                            </span>
                          </div>
                          {info.service && (
                            <p className="text-sm text-muted-foreground truncate">
                              {info.service}
                            </p>
                          )}
                        </div>
                        <Badge className={cn("flex-shrink-0", statusColors[booking.status])}>
                          {statusLabels[booking.status] || booking.status}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        {booking.preferred_date && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>
                              {format(parseISO(booking.preferred_date), "d MMM yyyy", { locale: pt })}
                            </span>
                          </div>
                        )}
                        {booking.preferred_time && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{formatTime(booking.preferred_time)}</span>
                          </div>
                        )}
                        {!booking.preferred_date && info.date && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{info.date}</span>
                          </div>
                        )}
                      </div>

                      {canModify && (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReschedule(booking)}
                            className="flex-1"
                          >
                            <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                            Reagendar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCancelClick(booking)}
                            className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                          >
                            <X className="h-3.5 w-3.5 mr-1.5" />
                            Cancelar
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reschedule Dialog */}
      {selectedBooking && (
        <RescheduleDialog
          open={rescheduleOpen}
          onOpenChange={setRescheduleOpen}
          booking={selectedBooking}
          onComplete={handleRescheduleComplete}
        />
      )}

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Cancelar Marcação
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tem a certeza que deseja cancelar esta marcação? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={cancelling}>Voltar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelConfirm}
              disabled={cancelling}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {cancelling ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <X className="h-4 w-4 mr-2" />
              )}
              Cancelar Marcação
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
