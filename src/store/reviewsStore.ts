import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from './supabaseClient';
import type { RealtimeChannel } from '@supabase/supabase-js';

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  image: string;
  status?: 'pending' | 'approved' | 'rejected';
  date?: string;
}

interface ReviewsState {
  reviews: Review[];
  channel: RealtimeChannel | null;
  addReview: (review: Omit<Review, 'id' | 'status' | 'date'>) => Promise<void>;
  updateReview: (id: string, review: Partial<Review>) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;
  initializeRealtime: () => void;
  fetchReviews: () => Promise<void>;
}

export const useReviewsStore = create<ReviewsState>()(
  persist(
    (set, get) => ({
      reviews: [],
      channel: null,

      initializeRealtime: () => {
        const channel = supabase
          .channel('reviews_channel')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'reviews'
            },
            async () => {
              // Fetch fresh data when changes occur
              await get().fetchReviews();
            }
          )
          .subscribe();

        set({ channel });
      },

      fetchReviews: async () => {
        try {
          const { data, error } = await supabase
            .from('reviews')
            .select('*')
            .order('created_at', { ascending: false });

          if (error) throw error;
          set({ reviews: data });
        } catch (error) {
          console.error('Error fetching reviews:', error);
        }
      },

      addReview: async (review) => {
        try {
          const { data, error } = await supabase
            .from('reviews')
            .insert([{
              ...review,
              status: 'pending',
              created_at: new Date().toISOString()
            }])
            .select();

          if (error) throw error;
          await get().fetchReviews();
        } catch (error) {
          console.error('Error adding review:', error);
          throw error;
        }
      },

      updateReview: async (id, review) => {
        try {
          const { error } = await supabase
            .from('reviews')
            .update(review)
            .eq('id', id);

          if (error) throw error;
          await get().fetchReviews();
        } catch (error) {
          console.error('Error updating review:', error);
          throw error;
        }
      },

      deleteReview: async (id) => {
        try {
          const { error } = await supabase
            .from('reviews')
            .delete()
            .eq('id', id);

          if (error) throw error;
          await get().fetchReviews();
        } catch (error) {
          console.error('Error deleting review:', error);
          throw error;
        }
      }
    }),
    {
      name: 'reviews-storage',
      partialize: (state) => ({ reviews: state.reviews })
    }
  )
);