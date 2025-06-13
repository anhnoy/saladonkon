import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GlobalStats {
  totalBookings: number;
  totalRevenue: number;
  occupancyRate: number;
  averageRating: number;
  totalGuests: number;
  popularRooms: string[];
  popularActivities: string[];
  recentActivity: ActivityLog[];
}

interface ActivityLog {
  id: string;
  type: 'booking' | 'review' | 'cancellation' | 'payment' | 'room_update' | 'activity_update';
  description: string;
  timestamp: string;
  userId?: string;
  relatedId?: string;
}

interface GlobalState {
  stats: GlobalStats;
  activityLog: ActivityLog[];
  updateStats: (stats: Partial<GlobalStats>) => void;
  addActivity: (activity: Omit<ActivityLog, 'id' | 'timestamp'>) => void;
  getRelatedBookings: (roomId?: string, activityId?: string) => any[];
  getGuestHistory: (phone: string) => any[];
  getRoomPerformance: (roomId: string) => any;
  getActivityPerformance: (activityId: string) => any;
}

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set, get) => ({
      stats: {
        totalBookings: 0,
        totalRevenue: 0,
        occupancyRate: 0,
        averageRating: 0,
        totalGuests: 0,
        popularRooms: [],
        popularActivities: [],
        recentActivity: []
      },
      activityLog: [],

      updateStats: (newStats) =>
        set((state) => ({
          stats: { ...state.stats, ...newStats }
        })),

      addActivity: (activity) =>
        set((state) => ({
          activityLog: [
            {
              ...activity,
              id: Date.now().toString(),
              timestamp: new Date().toISOString()
            },
            ...state.activityLog.slice(0, 99) // Keep last 100 activities
          ]
        })),

      getRelatedBookings: (roomId, activityId) => {
        // This would integrate with booking store
        return [];
      },

      getGuestHistory: (phone) => {
        // This would integrate with booking store
        return [];
      },

      getRoomPerformance: (roomId) => {
        // This would integrate with booking and review stores
        return {
          totalBookings: 0,
          totalRevenue: 0,
          averageRating: 0,
          occupancyRate: 0
        };
      },

      getActivityPerformance: (activityId) => {
        // This would integrate with booking and review stores
        return {
          totalBookings: 0,
          totalRevenue: 0,
          averageRating: 0,
          popularityScore: 0
        };
      }
    }),
    {
      name: 'global-storage'
    }
  )
);