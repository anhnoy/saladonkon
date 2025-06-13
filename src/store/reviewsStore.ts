import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  channel: null; // Removed RealtimeChannel
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
        // No-op (realtime removed)
        console.log('Realtime removed - no connection established.');
      },

      fetchReviews: async () => {
        try {
          // You can replace this with fetching from localStorage or a REST API later
          console.log('Fetching reviews... (no Supabase)');
        } catch (error) {
          console.error('Error fetching reviews:', error);
        }
      },

      addReview: async (review) => {
        try {
          const newReview: Review = {
            id: crypto.randomUUID(),
            ...review,
            status: 'pending',
            date: new Date().toISOString()
          };
          set((state) => ({ reviews: [newReview, ...state.reviews] }));
        } catch (error) {
          console.error('Error adding review:', error);
          throw error;
        }
      },

      updateReview: async (id, review) => {
        try {
          set((state) => ({
            reviews: state.reviews.map((r) =>
              r.id === id ? { ...r, ...review } : r
            )
          }));
        } catch (error) {
          console.error('Error updating review:', error);
          throw error;
        }
      },

      deleteReview: async (id) => {
        try {
          set((state) => ({
            reviews: state.reviews.filter((r) => r.id !== id)
          }));
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
