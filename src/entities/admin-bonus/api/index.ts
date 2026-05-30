import { adminBonusHttpService, type AdminBonusService } from '@/entities/admin-bonus/api/admin-bonus.service'
import { adminBonusMockService } from '@/entities/admin-bonus/api/admin-bonus.mock.service'
import { useMockApi } from '@/shared/config/api-mode'

export function getAdminBonusService(): AdminBonusService {
  return useMockApi ? adminBonusMockService : adminBonusHttpService
}

export const adminBonusQueryKeys = {
  all: ['admin-bonus'] as const,
  history: () => [...adminBonusQueryKeys.all, 'history'] as const,
}
