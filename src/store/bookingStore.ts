import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

      initializeRealtime: () => {
        // ไม่มีระบบ realtime เพราะไม่มี supabase
        console.log('Realtime not supported in mock mode.');
      },

      fetchBookings: async () => {
        console.log('Mock: fetchBookings');
        set({ bookings: [] }); // mock data หรือดึงจาก local
      },

      addBooking: async (booking) => {
        console.log('Mock: addBooking', booking);
        const newBooking: Booking = {
          ...booking,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        };
        set({ bookings: [newBooking, ...get().bookings] });
      },

      updateBooking: async (id, updates) => {
        console.log('Mock: updateBooking', id, updates);
        const updated = get().bookings.map((b) =>
          b.id === id ? { ...b, ...updates } : b
        );
        set({ bookings: updated });
      },

      fetchUserBookings: async (userId) => {
        console.log('Mock: fetchUserBookings for userId:', userId);
        const userBookings = get().bookings.filter((b) => b.userId === userId);
        set({ bookings: userBookings });
      },

      fetchAllBookings: async () => {
        console.log('Mock: fetchAllBookings');
        set({ bookings: get().bookings });
      },
    }),
    {
      name: 'booking-storage',
      partialize: (state) => ({ bookings: state.bookings }),
    }
  )
);
