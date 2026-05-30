import type { AdminAchievementsService } from '@/entities/admin-achievement/api/admin-achievements.service'
import { getMockAchievements, grantMockAchievement } from '@/entities/admin-achievement/model/mock-store'
import type { GrantAchievementInput } from '@/entities/admin-achievement/model/types'
import { mockDelay } from '@/shared/lib/mockDelay'

export const adminAchievementsMockService: AdminAchievementsService = {
  async list() {
    await mockDelay()
    return getMockAchievements()
  },
  async grant(input: GrantAchievementInput) {
    await mockDelay(300)
    grantMockAchievement(input.userId, input.achievementId)
  },
}
