import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  email: string;
  role: 'admin' | 'super_admin';
}

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const users = [
  { email: '99747127aa@gmail.com', password: '99747127aA@', role: 'super_admin' as const },
  { email: 'noyxayaphone66@gmail.com', password: '99747127aA@', role: 'admin' as const },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: async (email: string, password: string) => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          set({ user: { email: user.email, role: user.role } });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);