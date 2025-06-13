import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from './supabaseClient';
import type { RealtimeChannel } from '@supabase/supabase-js';

interface Booking {
  id: string;
  userId: string;
  type: 'room' | 'activity';
  itemId: string;
  checkIn?: string;
  checkOut?: string;
  date?: string;
  time?: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalAmount: number;
  paymentStatus: 'pending' | 'paid';
  paymentMethod: 'card' | 'hotel';
  createdAt: string;
}

interface BookingStore {
  bookings: Booking[];
  channel: RealtimeChannel | null;
  initializeRealtime: () => void;
  fetchBookings: () => Promise<void>;
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => Promise<void>;
  updateBooking: (id: string, updates: Partial<Booking>) => Promise<void>;
  fetchUserBookings: (userId: string) => Promise<void>;
  fetchAllBookings: () => Promise<void>;
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      bookings: [],
      channel: null,

      initializeRealtime: () => {
        const channel = supabase
          .channel('bookings_channel')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'bookings'
            },
            async () => {
              // Fetch fresh data when changes occur
              await get().fetchBookings();
            }
          )
          .subscribe();

        set({ channel });
      },

      fetchBookings: async () => {
        try {
          const { data, error } = await supabase
            .from('bookings')
            .select('*')
            .order('created_at', { ascending: false });

          if (error) throw error;
          set({ bookings: data });
        } catch (error) {
          console.error('Error fetching bookings:', error);
        }
      },
      
      addBooking: async (booking) => {
        try {
          const { data, error } = await supabase
            .from('bookings')
            .insert([{
              ...booking,
              createdAt: new Date().toISOString()
            }])
            .select();

          if (error) throw error;
          await get().fetchBookings();
        } catch (error) {
          console.error('Error adding booking:', error);
          throw error;
        }
      },

      updateBooking: async (id, updates) => {
        try {
          const { error } = await supabase
            .from('bookings')
            .update(updates)
            .eq('id', id);

          if (error) throw error;
          await get().fetchBookings();
        } catch (error) {
          console.error('Error updating booking:', error);
          throw error;
        }
      },

      fetchUserBookings: async (userId) => {
        try {
          const { data, error } = await supabase
            .from('bookings')
            .select('*')
            .eq('userId', userId)
            .order('created_at', { ascending: false });

          if (error) throw error;
          set({ bookings: data });
        } catch (error) {
          console.error('Error fetching user bookings:', error);
          throw error;
        }
      },

      fetchAllBookings: async () => {
        try {
          const { data, error } = await supabase
            .from('bookings')
            .select('*')
            .order('created_at', { ascending: false });

          if (error) throw error;
          set({ bookings: data });
        } catch (error) {
          console.error('Error fetching all bookings:', error);
          throw error;
        }
      }
    }),
    {
      name: 'booking-storage',
      partialize: (state) => ({ bookings: state.bookings })
    }
  )
);