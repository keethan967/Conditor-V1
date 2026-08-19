/**
 * Supabase schema types.
 *
 * This file is GENERATED, not hand-written:
 *
 *   npx supabase gen types typescript --project-id <id> > src/types/database.ts
 *
 * Until the schema lands (Phase 2 introduces `profiles` and role tables), this
 * placeholder provides the correct generic shape so every Supabase client in
 * the app is already typed as `SupabaseClient<Database>`. When the real file is
 * generated it drops in unchanged and every call site gains full inference
 * without a single import being edited.
 */

export type Json =
  string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: Record<
      string,
      {
        Row: Record<string, unknown>;
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
        Relationships: [];
      }
    >;
    Views: Record<string, { Row: Record<string, unknown>; Relationships: [] }>;
    Functions: Record<string, { Args: Record<string, unknown>; Returns: unknown }>;
    Enums: Record<string, string>;
    CompositeTypes: Record<string, Record<string, unknown>>;
  };
}

/** Convenience aliases so features never re-derive these long generics. */
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];

export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];
