import { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, isSameDay, isAfter, startOfDay, addDays } from "date-fns";
import { pt } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight, Plus, Trash2, Clock, Loader2, Calendar, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type AvailabilitySlot = {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  max_bookings: number;
  current_bookings: number;
  is_available: boolean;
};

const defaultTimeSlots = [
  { start: "09:00", end: "10:00" },
  { start: "10:00", end: "11:00" },
  { start: "11:00", end: "12:00" },
  { start: "14:00", end: "15:00" },
  { start: "15:00", end: "16:00" },
  { start: "16:00", end: "17:00" },
];

export default function AvailabilityManagement() {
  const { toast } = useToast();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [bulkDialogOpen, setBulkDialogOpen] = useState(false);
  const [newSlot, setNewSlot] = useState({
    start_time: "09:00",
    end_time: "10:00",
    max_bookings: 2,
  });
  const [bulkSettings, setBulkSettings] = useState({
    days: 7,
    weekdaysOnly: true,
    slots: defaultTimeSlots,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSlots();
  }, [currentMonth]);

  const fetchSlots = async () => {
    setLoading(true);
    const start = format(startOfMonth(currentMonth), "yyyy-MM-dd");
    const end = format(endOfMonth(currentMonth), "yyyy-MM-dd");

    const { data, error } = await supabase
      .from("availability_slots")
      .select("*")
      .gte("date", start)
      .lte("date", end)
      .order("date")
      .order("start_time");

    if (!error && data) {
      setSlots(data);
    }
    setLoading(false);
  };

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const getDaySlots = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return slots.filter((slot) => slot.date === dateStr);
  };

  const handleAddSlot = async () => {
    if (!selectedDate) return;
    
    setSaving(true);
    const { error } = await supabase.from("availability_slots").insert({
      date: format(selectedDate, "yyyy-MM-dd"),
      start_time: newSlot.start_time,
      end_time: newSlot.end_time,
      max_bookings: newSlot.max_bookings,
    });

    if (error) {
      if (error.code === "23505") {
        toast({
          variant: "destructive",
          title: "Horário já existe",
          description: "Este horário já está configurado para este dia.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erro ao adicionar horário",
          description: error.message,
        });
      }
    } else {
      toast({
        title: "Horário adicionado!",
        description: `Slot das ${newSlot.start_time} adicionado com sucesso.`,
      });
      fetchSlots();
      setAddDialogOpen(false);
    }
    setSaving(false);
  };

  const handleDeleteSlot = async (slotId: string) => {
    const { error } = await supabase
      .from("availability_slots")
      .delete()
      .eq("id", slotId);

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro ao remover",
        description: error.message,
      });
    } else {
      toast({
        title: "Horário removido",
      });
      fetchSlots();
    }
  };

  const handleBulkCreate = async () => {
    setSaving(true);
    const today = startOfDay(new Date());
    const slotsToInsert: Array<{
      date: string;
      start_time: string;
      end_time: string;
      max_bookings: number;
    }> = [];

    for (let i = 0; i < bulkSettings.days; i++) {
      const date = addDays(today, i);
      const dayOfWeek = date.getDay();
      
      // Skip weekends if weekdaysOnly
      if (bulkSettings.weekdaysOnly && (dayOfWeek === 0 || dayOfWeek === 6)) {
        continue;
      }

      for (const slot of bulkSettings.slots) {
        slotsToInsert.push({
          date: format(date, "yyyy-MM-dd"),
          start_time: slot.start,
          end_time: slot.end,
          max_bookings: 2,
        });
      }
    }

    if (slotsToInsert.length === 0) {
      toast({
        variant: "destructive",
        title: "Nenhum slot para criar",
        description: "Ajuste as configurações e tente novamente.",
      });
      setSaving(false);
      return;
    }

    // Use upsert to avoid duplicates
    const { error } = await supabase
      .from("availability_slots")
      .upsert(slotsToInsert, { 
        onConflict: "date,start_time",
        ignoreDuplicates: true 
      });

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro ao criar horários",
        description: error.message,
      });
    } else {
      toast({
        title: "Horários criados!",
        description: `${slotsToInsert.length} slots criados com sucesso.`,
      });
      fetchSlots();
      setBulkDialogOpen(false);
    }
    setSaving(false);
  };

  const today = startOfDay(new Date());
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const firstDayOfMonth = days[0];
  const startDayIndex = firstDayOfMonth.getDay();
  const emptyCells = Array(startDayIndex).fill(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gestão de Disponibilidade</h2>
          <p className="text-muted-foreground">
            Configure os horários disponíveis para marcações
          </p>
        </div>
        <Button onClick={() => setBulkDialogOpen(true)}>
          <Settings className="h-4 w-4 mr-2" />
          Criar Horários em Massa
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <CardTitle className="capitalize">
                {format(currentMonth, "MMMM yyyy", { locale: pt })}
              </CardTitle>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-7 gap-1">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-medium text-muted-foreground py-2"
                  >
                    {day}
                  </div>
                ))}

                {emptyCells.map((_, index) => (
                  <div key={`empty-${index}`} className="aspect-square" />
                ))}

                {days.map((day) => {
                  const daySlots = getDaySlots(day);
                  const hasSlots = daySlots.length > 0;
                  const totalBookings = daySlots.reduce((sum, s) => sum + s.current_bookings, 0);
                  const isSelected = selectedDate && isSameDay(day, selectedDate);
                  const isPast = !isAfter(day, today) && !isSameDay(day, today);

                  return (
                    <button
                      key={day.toISOString()}
                      onClick={() => setSelectedDate(day)}
                      className={cn(
                        "aspect-square p-1 rounded-lg relative flex flex-col items-center justify-center transition-all",
                        isPast && "opacity-40",
                        isSelected && "bg-primary text-primary-foreground",
                        !isSelected && hasSlots && "bg-success/10 border border-success/30",
                        !isSelected && !hasSlots && "hover:bg-muted"
                      )}
                    >
                      <span className="text-sm font-medium">{format(day, "d")}</span>
                      {hasSlots && (
                        <div className="flex items-center gap-0.5 mt-0.5">
                          <span className={cn(
                            "text-[10px]",
                            isSelected ? "text-primary-foreground" : "text-success"
                          )}>
                            {daySlots.length}
                          </span>
                          {totalBookings > 0 && (
                            <Badge 
                              variant="secondary" 
                              className={cn(
                                "text-[9px] px-1 h-3.5",
                                isSelected && "bg-primary-foreground/20"
                              )}
                            >
                              {totalBookings}
                            </Badge>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Day Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              {selectedDate
                ? format(selectedDate, "d 'de' MMMM", { locale: pt })
                : "Selecione um dia"}
            </CardTitle>
            <CardDescription>
              {selectedDate ? "Horários disponíveis" : "Clique num dia para ver detalhes"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDate ? (
              <div className="space-y-4">
                <Button
                  onClick={() => setAddDialogOpen(true)}
                  className="w-full"
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Horário
                </Button>

                {getDaySlots(selectedDate).length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Nenhum horário configurado</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {getDaySlots(selectedDate).map((slot) => (
                      <div
                        key={slot.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border"
                      >
                        <div>
                          <p className="font-medium">
                            {slot.start_time.slice(0, 5)} - {slot.end_time.slice(0, 5)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {slot.current_bookings}/{slot.max_bookings} reservas
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteSlot(slot.id)}
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Selecione um dia no calendário</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add Slot Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Horário</DialogTitle>
            <DialogDescription>
              {selectedDate && format(selectedDate, "EEEE, d 'de' MMMM", { locale: pt })}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Hora Início</Label>
                <Input
                  type="time"
                  value={newSlot.start_time}
                  onChange={(e) => setNewSlot({ ...newSlot, start_time: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Hora Fim</Label>
                <Input
                  type="time"
                  value={newSlot.end_time}
                  onChange={(e) => setNewSlot({ ...newSlot, end_time: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Máximo de Reservas</Label>
              <Input
                type="number"
                min={1}
                max={10}
                value={newSlot.max_bookings}
                onChange={(e) => setNewSlot({ ...newSlot, max_bookings: parseInt(e.target.value) || 1 })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddSlot} disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Adicionar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Create Dialog */}
      <Dialog open={bulkDialogOpen} onOpenChange={setBulkDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Horários em Massa</DialogTitle>
            <DialogDescription>
              Configure horários para os próximos dias automaticamente
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Número de Dias</Label>
              <Select
                value={bulkSettings.days.toString()}
                onValueChange={(v) => setBulkSettings({ ...bulkSettings, days: parseInt(v) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 dias</SelectItem>
                  <SelectItem value="14">14 dias</SelectItem>
                  <SelectItem value="30">30 dias</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="weekdaysOnly"
                checked={bulkSettings.weekdaysOnly}
                onChange={(e) => setBulkSettings({ ...bulkSettings, weekdaysOnly: e.target.checked })}
                className="rounded"
              />
              <Label htmlFor="weekdaysOnly">Apenas dias úteis (Seg-Sex)</Label>
            </div>

            <div className="space-y-2">
              <Label>Horários a Criar</Label>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {defaultTimeSlots.map((slot, i) => (
                  <div key={i} className="p-2 bg-muted rounded">
                    {slot.start} - {slot.end}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setBulkDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleBulkCreate} disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Criar Horários
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
