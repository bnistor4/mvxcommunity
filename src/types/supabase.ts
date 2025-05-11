export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      communities: {
        Row: {
          id: string
          name: string
          description: string
          platforms: string[]
          invite_links: Json
          image_url: string
          submitter_email: string
          status: string
          badges: string[]
          click_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          platforms: string[]
          invite_links: Json
          image_url: string
          submitter_email: string
          status?: string
          badges?: string[]
          click_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          platforms?: string[]
          invite_links?: Json
          image_url?: string
          submitter_email?: string
          status?: string
          badges?: string[]
          click_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      admin_keys: {
        Row: {
          id: string
          api_key: string
          created_at: string
        }
        Insert: {
          id?: string
          api_key: string
          created_at?: string
        }
        Update: {
          id?: string
          api_key?: string
          created_at?: string
        }
      }
    }
  }
}
