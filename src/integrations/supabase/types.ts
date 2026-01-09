export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      availability_slots: {
        Row: {
          created_at: string
          current_bookings: number
          date: string
          end_time: string
          id: string
          is_available: boolean
          max_bookings: number
          start_time: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_bookings?: number
          date: string
          end_time: string
          id?: string
          is_available?: boolean
          max_bookings?: number
          start_time: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_bookings?: number
          date?: string
          end_time?: string
          id?: string
          is_available?: boolean
          max_bookings?: number
          start_time?: string
          updated_at?: string
        }
        Relationships: []
      }
      cars: {
        Row: {
          ano: number
          cor: string
          created_at: string
          id: string
          marca: string
          matricula: string
          modelo: string
          owner_id: string
          quilometragem: number
          updated_at: string
        }
        Insert: {
          ano: number
          cor: string
          created_at?: string
          id?: string
          marca: string
          matricula: string
          modelo: string
          owner_id: string
          quilometragem?: number
          updated_at?: string
        }
        Update: {
          ano?: number
          cor?: string
          created_at?: string
          id?: string
          marca?: string
          matricula?: string
          modelo?: string
          owner_id?: string
          quilometragem?: number
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id: string
          last_name: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      quote_requests: {
        Row: {
          client_name: string
          client_phone: string
          created_at: string
          id: string
          message: string
          preferred_date: string | null
          preferred_time: string | null
          slot_id: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          client_name: string
          client_phone: string
          created_at?: string
          id?: string
          message: string
          preferred_date?: string | null
          preferred_time?: string | null
          slot_id?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          client_name?: string
          client_phone?: string
          created_at?: string
          id?: string
          message?: string
          preferred_date?: string | null
          preferred_time?: string | null
          slot_id?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quote_requests_slot_id_fkey"
            columns: ["slot_id"]
            isOneToOne: false
            referencedRelation: "availability_slots"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          car_id: string
          cost_per_hour: number | null
          created_at: string
          description: string | null
          final_price: number | null
          id: string
          margin: number | null
          mileage_at_service: number | null
          next_revision_date: string | null
          parts_cost: number | null
          parts_used: string | null
          recommendations: string | null
          scheduled_date: string
          service_name: string
          status: Database["public"]["Enums"]["service_status"]
          updated_at: string
          work_hours: number | null
        }
        Insert: {
          car_id: string
          cost_per_hour?: number | null
          created_at?: string
          description?: string | null
          final_price?: number | null
          id?: string
          margin?: number | null
          mileage_at_service?: number | null
          next_revision_date?: string | null
          parts_cost?: number | null
          parts_used?: string | null
          recommendations?: string | null
          scheduled_date: string
          service_name: string
          status?: Database["public"]["Enums"]["service_status"]
          updated_at?: string
          work_hours?: number | null
        }
        Update: {
          car_id?: string
          cost_per_hour?: number | null
          created_at?: string
          description?: string | null
          final_price?: number | null
          id?: string
          margin?: number | null
          mileage_at_service?: number | null
          next_revision_date?: string | null
          parts_cost?: number | null
          parts_used?: string | null
          recommendations?: string | null
          scheduled_date?: string
          service_name?: string
          status?: Database["public"]["Enums"]["service_status"]
          updated_at?: string
          work_hours?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "services_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "client"
      service_status: "agendado" | "em_processo" | "concluido"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "client"],
      service_status: ["agendado", "em_processo", "concluido"],
    },
  },
} as const
