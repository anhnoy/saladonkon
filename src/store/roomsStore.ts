import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useGlobalStore } from './globalStore';

export interface Room {
  id: string;
  roomNumber: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  price: number;
  size: number;
  capacity: number;
  beds: string;
  amenities: string[];
  customAmenities: string[];
  featured: boolean;
  images: string[];
  status: 'active' | 'inactive' | 'maintenance';
  createdAt: string;
  updatedAt: string;
}

interface RoomsState {
  rooms: Room[];
  addRoom: (room: Omit<Room, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateRoom: (id: string, room: Partial<Room>) => void;
  deleteRoom: (id: string) => void;
  toggleRoomStatus: (id: string) => void;
  toggleFeatured: (id: string) => void;
  getRoomsByType: (type: string) => Room[];
  getFeaturedRooms: () => Room[];
  getActiveRooms: () => Room[];
}

export const useRoomsStore = create<RoomsState>()(
  persist(
    (set, get) => ({
      rooms: [],

      addRoom: (roomData) => {
        const newRoom: Room = {
          ...roomData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        set((state) => ({
          rooms: [...state.rooms, newRoom]
        }));

        // Log activity
        const { addActivity } = useGlobalStore.getState();
        addActivity({
          type: 'room_update',
          description: `New room added: ${newRoom.name} (Room ${newRoom.roomNumber})`
        });
      },

      updateRoom: (id, updates) => {
        set((state) => ({
          rooms: state.rooms.map(room =>
            room.id === id
              ? { ...room, ...updates, updatedAt: new Date().toISOString() }
              : room
          )
        }));

        const room = get().rooms.find(r => r.id === id);
        if (room) {
          const { addActivity } = useGlobalStore.getState();
          addActivity({
            type: 'room_update',
            description: `Room updated: ${room.name} (Room ${room.roomNumber})`
          });
        }
      },

      deleteRoom: (id) => {
        const room = get().rooms.find(r => r.id === id);
        
        set((state) => ({
          rooms: state.rooms.filter(room => room.id !== id)
        }));

        if (room) {
          const { addActivity } = useGlobalStore.getState();
          addActivity({
            type: 'room_update',
            description: `Room deleted: ${room.name} (Room ${room.roomNumber})`
          });
        }
      },

      toggleRoomStatus: (id) => {
        const room = get().rooms.find(r => r.id === id);
        if (room) {
          const newStatus = room.status === 'active' ? 'inactive' : 'active';
          get().updateRoom(id, { status: newStatus });
        }
      },

      toggleFeatured: (id) => {
        const room = get().rooms.find(r => r.id === id);
        if (room) {
          get().updateRoom(id, { featured: !room.featured });
        }
      },

      getRoomsByType: (type) => {
        return get().rooms.filter(room => room.slug === type && room.status === 'active');
      },

      getFeaturedRooms: () => {
        return get().rooms.filter(room => room.featured && room.status === 'active');
      },

      getActiveRooms: () => {
        return get().rooms.filter(room => room.status === 'active');
      }
    }),
    {
      name: 'rooms-storage'
    }
  )
);