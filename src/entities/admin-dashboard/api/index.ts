import {
  adminDashboardHttpService,
  type AdminDashboardService,
} from '@/entities/admin-dashboard/api/admin-dashboard.service'
import { adminDashboardMockService } from '@/entities/admin-dashboard/api/admin-dashboard.mock.service'
import { useMockApi } from '@/shared/config/api-mode'

export function getAdminDashboardService(): AdminDashboardService {
  return useMockApi ? adminDashboardMockService : adminDashboardHttpService
}

export const adminDashboardQueryKeys = {
  stats: ['admin-dashboard', 'stats'] as const,
}
