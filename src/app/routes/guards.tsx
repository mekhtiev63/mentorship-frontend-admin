import { Navigate, Outlet } from 'react-router-dom'
import { useSessionStore } from '@/shared/store/session-store'

export function ProtectedAdminRoute() {
  const session = useSessionStore((s) => s.session)
  if (!session) {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}

export function GuestRoute() {
  const session = useSessionStore((s) => s.session)
  if (session) {
    return <Navigate to="/admin" replace />
  }
  return <Outlet />
}
