import type { AdminAchievement, GrantAchievementInput } from '@/entities/admin-achievement/model/types'

export interface AdminAchievementsService {
  list(): Promise<AdminAchievement[]>
  grant(input: GrantAchievementInput): Promise<void>
}

export const adminAchievementsHttpService: AdminAchievementsService = {
  async list() {
    throw new Error('HTTP achievements API не подключён')
  },
  async grant() {
    throw new Error('HTTP achievements API не подключён')
  },
}
