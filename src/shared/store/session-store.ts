import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AdminSession = {
  email: string
  displayName: string
}

type SessionState = {
  session: AdminSession | null
  setSession: (session: AdminSession | null) => void
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      session: null,
      setSession: (session) => set({ session }),
    }),
    { name: 'admin-session' },
  ),
)
