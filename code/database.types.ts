export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      areasOfInterest: {
        Row: {
          center: unknown
          color: string | null
          created_at: string
          id: number
          isEnabled: boolean
          name: string
        }
        Insert: {
          center: unknown
          color?: string | null
          created_at?: string
          id?: number
          isEnabled?: boolean
          name: string
        }
        Update: {
          center?: unknown
          color?: string | null
          created_at?: string
          id?: number
          isEnabled?: boolean
          name?: string
        }
        Relationships: []
      }
      plants: {
        Row: {
          color: string | null
          created_at: string | null
          description_long: string | null
          description_short: string | null
          endangered_level: string | null
          family: string | null
          fun_fact: string | null
          id: string
          name_common: string | null
          name_latin: string | null
          native_habitat: string | null
          shiny: boolean | null
          type: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description_long?: string | null
          description_short?: string | null
          endangered_level?: string | null
          family?: string | null
          fun_fact?: string | null
          id: string
          name_common?: string | null
          name_latin?: string | null
          native_habitat?: string | null
          shiny?: boolean | null
          type?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description_long?: string | null
          description_short?: string | null
          endangered_level?: string | null
          family?: string | null
          fun_fact?: string | null
          id?: string
          name_common?: string | null
          name_latin?: string | null
          native_habitat?: string | null
          shiny?: boolean | null
          type?: string | null
        }
        Relationships: []
      }
      scans: {
        Row: {
          created_at: string
          id: number
          imageUrl: string
          location: unknown | null
          plantId: string
          userId: number
        }
        Insert: {
          created_at?: string
          id?: number
          imageUrl: string
          location?: unknown | null
          plantId: string
          userId: number
        }
        Update: {
          created_at?: string
          id?: number
          imageUrl?: string
          location?: unknown | null
          plantId?: string
          userId?: number
        }
        Relationships: [
          {
            foreignKeyName: "scans_plantId_fkey"
            columns: ["plantId"]
            isOneToOne: false
            referencedRelation: "plants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scans_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      "special-plants": {
        Row: {
          created_at: string
          id: string
          plant: string | null
          user_name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          plant?: string | null
          user_name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          plant?: string | null
          user_name?: string | null
        }
        Relationships: []
      }
      user: {
        Row: {
          created_at: string
          email: string
          firstName: string
          id: number
          lastName: string | null
        }
        Insert: {
          created_at?: string
          email: string
          firstName: string
          id?: number
          lastName?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          firstName?: string
          id?: number
          lastName?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
