import {
  adminAchievementsHttpService,
  type AdminAchievementsService,
} from '@/entities/admin-achievement/api/admin-achievements.service'
import { adminAchievementsMockService } from '@/entities/admin-achievement/api/admin-achievements.mock.service'
import { useMockApi } from '@/shared/config/api-mode'

export function getAdminAchievementsService(): AdminAchievementsService {
  return useMockApi ? adminAchievementsMockService : adminAchievementsHttpService
}

export const adminAchievementsQueryKeys = {
  all: ['admin-achievements'] as const,
  list: () => [...adminAchievementsQueryKeys.all, 'list'] as const,
}
