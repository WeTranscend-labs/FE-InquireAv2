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
      users: {
        Row: {
          id: string
          username: string
          email: string
          token_balance: number
          reputation: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          username: string
          email: string
          token_balance?: number
          reputation?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          email?: string
          token_balance?: number
          reputation?: number
          updated_at?: string
        }
      }
      questions: {
        Row: {
          id: string
          title: string
          content: string
          user_id: string
          bounty_amount: number
          is_solved: boolean
          created_at: string
          updated_at: string
          tags: string[]
        }
        Insert: {
          id?: string
          title: string
          content: string
          user_id: string
          bounty_amount: number
          is_solved?: boolean
          created_at?: string
          updated_at?: string
          tags?: string[]
        }
        Update: {
          id?: string
          title?: string
          content?: string
          user_id?: string
          bounty_amount?: number
          is_solved?: boolean
          updated_at?: string
          tags?: string[]
        }
      }
      answers: {
        Row: {
          id: string
          question_id: string
          user_id: string
          content: string
          is_accepted: boolean
          vote_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          question_id: string
          user_id: string
          content: string
          is_accepted?: boolean
          vote_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          question_id?: string
          user_id?: string
          content?: string
          is_accepted?: boolean
          vote_count?: number
          updated_at?: string
        }
      }
      votes: {
        Row: {
          id: string
          answer_id: string
          user_id: string
          vote_type: number
          created_at: string
        }
        Insert: {
          id?: string
          answer_id: string
          user_id: string
          vote_type: number
          created_at?: string
        }
        Update: {
          id?: string
          answer_id?: string
          user_id?: string
          vote_type?: number
        }
      }
      transactions: {
        Row: {
          id: string
          from_user_id: string | null
          to_user_id: string | null
          amount: number
          transaction_type: string
          question_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          from_user_id?: string | null
          to_user_id?: string | null
          amount: number
          transaction_type: string
          question_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          from_user_id?: string | null
          to_user_id?: string | null
          amount?: number
          transaction_type?: string
          question_id?: string | null
        }
      }
    }
  }
}