import { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, isAfter, startOfDay } from "date-fns";
import { pt } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Clock, Calendar, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type AvailabilitySlot = {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  max_bookings: number;
  current_bookings: number;
  is_available: boolean;
};

type SchedulingCalendarProps = {
  onSlotSelect: (slot: AvailabilitySlot, date: Date) => void;
  selectedSlotId?: string;
};

export default function SchedulingCalendar({ onSlotSelect, selectedSlotId }: SchedulingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);

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
      .eq("is_available", true)
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

  const hasAvailableSlots = (date: Date) => {
    return getDaySlots(date).length > 0;
  };

  const formatTime = (time: string) => {
    return time.slice(0, 5);
  };

  const today = startOfDay(new Date());
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  // Calculate empty cells before first day
  const firstDayOfMonth = days[0];
  const startDayIndex = firstDayOfMonth.getDay();
  const emptyCells = Array(startDayIndex).fill(null);

  return (
    <div className="space-y-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h3 className="text-lg font-semibold capitalize">
          {format(currentMonth, "MMMM yyyy", { locale: pt })}
        </h3>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Week days header */}
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-muted-foreground py-2"
          >
            {day}
          </div>
        ))}

        {/* Empty cells */}
        {emptyCells.map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}

        {/* Days */}
        {days.map((day) => {
          const daySlots = getDaySlots(day);
          const hasSlots = daySlots.length > 0;
          const isPast = !isAfter(day, today) && !isSameDay(day, today);
          const isSelected = selectedDate && isSameDay(day, selectedDate);

          return (
            <button
              key={day.toISOString()}
              disabled={isPast || !hasSlots}
              onClick={() => setSelectedDate(day)}
              className={cn(
                "aspect-square p-1 rounded-lg relative flex flex-col items-center justify-center transition-all",
                !isSameMonth(day, currentMonth) && "opacity-30",
                isPast && "opacity-30 cursor-not-allowed",
                hasSlots && !isPast && "hover:bg-primary/10 cursor-pointer",
                isSelected && "bg-primary text-primary-foreground",
                !isSelected && hasSlots && "border border-success/50 bg-success/10"
              )}
            >
              <span className={cn("text-sm font-medium", isSelected && "text-primary-foreground")}>
                {format(day, "d")}
              </span>
              {hasSlots && !isPast && (
                <div className={cn(
                  "w-1.5 h-1.5 rounded-full mt-0.5",
                  isSelected ? "bg-primary-foreground" : "bg-success"
                )} />
              )}
            </button>
          );
        })}
      </div>

      {/* Time Slots for Selected Date */}
      {selectedDate && (
        <Card className="mt-4 animate-fade-in">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              {format(selectedDate, "EEEE, d 'de' MMMM", { locale: pt })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : getDaySlots(selectedDate).length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                Não há horários disponíveis para este dia.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {getDaySlots(selectedDate).map((slot) => {
                  const spotsLeft = slot.max_bookings - slot.current_bookings;
                  const isSelectedSlot = selectedSlotId === slot.id;
                  
                  return (
                    <Button
                      key={slot.id}
                      variant={isSelectedSlot ? "default" : "outline"}
                      className={cn(
                        "flex flex-col h-auto py-3 gap-1",
                        isSelectedSlot && "ring-2 ring-primary ring-offset-2"
                      )}
                      onClick={() => onSlotSelect(slot, selectedDate)}
                    >
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span className="font-medium">
                          {formatTime(slot.start_time)}
                        </span>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={cn(
                          "text-xs",
                          spotsLeft <= 1 && "bg-warning/20 text-warning"
                        )}
                      >
                        {spotsLeft} {spotsLeft === 1 ? "vaga" : "vagas"}
                      </Badge>
                    </Button>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
