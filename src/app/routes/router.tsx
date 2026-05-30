import { GuestRoute, ProtectedAdminRoute } from '@/app/routes/guards'
import { AdminLayout } from '@/widgets/admin-shell'
import { AdminAchievementsPage } from '@/pages/achievements/AdminAchievementsPage'
import { AdminBonusesPage } from '@/pages/bonuses/AdminBonusesPage'
import { AdminDashboardPage } from '@/pages/dashboard/AdminDashboardPage'
import { AdminInterviewsPage } from '@/pages/interviews/AdminInterviewsPage'
import { LoginPage } from '@/pages/login/LoginPage'
import { AdminMeetingsPage } from '@/pages/meetings/AdminMeetingsPage'
import { NotFoundPage } from '@/pages/not-found/NotFoundPage'
import { AdminRoadmapPage } from '@/pages/roadmap/AdminRoadmapPage'
import { AdminUserDetailPage } from '@/pages/users/AdminUserDetailPage'
import { AdminUsersPage } from '@/pages/users/AdminUsersPage'
import { createBrowserRouter, Navigate } from 'react-router-dom'

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/admin" replace /> },
  {
    element: <GuestRoute />,
    children: [{ path: '/login', element: <LoginPage /> }],
  },
  {
    element: <ProtectedAdminRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: '/admin', element: <AdminDashboardPage /> },
          { path: '/admin/users', element: <AdminUsersPage /> },
          { path: '/admin/users/:id', element: <AdminUserDetailPage /> },
          { path: '/admin/roadmap', element: <AdminRoadmapPage /> },
          { path: '/admin/interviews', element: <AdminInterviewsPage /> },
          { path: '/admin/meetings', element: <AdminMeetingsPage /> },
          { path: '/admin/bonuses', element: <AdminBonusesPage /> },
          { path: '/admin/achievements', element: <AdminAchievementsPage /> },
        ],
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])
