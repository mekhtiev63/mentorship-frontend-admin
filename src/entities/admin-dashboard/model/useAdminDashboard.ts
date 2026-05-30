import { useQuery } from '@tanstack/react-query'
import { adminDashboardQueryKeys, getAdminDashboardService } from '@/entities/admin-dashboard/api'

export function useAdminDashboardStats() {
  const service = getAdminDashboardService()
  return useQuery({
    queryKey: adminDashboardQueryKeys.stats,
    queryFn: () => service.getStats(),
  })
}
