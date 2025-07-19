export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string
          price: number
          image: string
          category: string
          stock: number
          featured: boolean
          tag?: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description: string
          price: number
          image: string
          category: string
          stock: number
          featured?: boolean
          tag?: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string
          price?: number
          image?: string
          category?: string
          stock?: number
          featured?: boolean
          tag?: string
        }
      }
      orders: {
        Row: {
          id: string
          created_at: string
          user_id: string
          status: 'pending' | 'processing' | 'completed' | 'cancelled'
          total: number
          shipping_address: Json
          payment_method: string
          payment_status: 'pending' | 'paid' | 'failed'
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          status?: 'pending' | 'processing' | 'completed' | 'cancelled'
          total: number
          shipping_address: Json
          payment_method: string
          payment_status?: 'pending' | 'paid' | 'failed'
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          status?: 'pending' | 'processing' | 'completed' | 'cancelled'
          total?: number
          shipping_address?: Json
          payment_method?: string
          payment_status?: 'pending' | 'paid' | 'failed'
        }
      }
      order_items: {
        Row: {
          id: string
          created_at: string
          order_id: string
          product_id: string
          quantity: number
          price: number
        }
        Insert: {
          id?: string
          created_at?: string
          order_id: string
          product_id: string
          quantity: number
          price: number
        }
        Update: {
          id?: string
          created_at?: string
          order_id?: string
          product_id?: string
          quantity?: number
          price?: number
        }
      }
      users: {
        Row: {
          id: string
          created_at: string
          email: string
          name: string
          role: 'user' | 'admin'
          phone?: string
          address?: Json
        }
        Insert: {
          id?: string
          created_at?: string
          email: string
          name: string
          role?: 'user' | 'admin'
          phone?: string
          address?: Json
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          name?: string
          role?: 'user' | 'admin'
          phone?: string
          address?: Json
        }
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
  }
} 