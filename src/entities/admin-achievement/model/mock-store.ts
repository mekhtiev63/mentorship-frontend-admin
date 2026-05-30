import type { AdminAchievement } from '@/entities/admin-achievement/model/types'

const achievements: AdminAchievement[] = [
  {
    id: 'a1',
    code: 'first_block',
    title: 'Первый блок',
    description: 'Завершён первый блок дорожной карты',
  },
  {
    id: 'a2',
    code: 'mock_interview',
    title: 'Mock пройден',
    description: 'Успешное mock-собеседование',
  },
  {
    id: 'a3',
    code: 'finalist',
    title: 'Финалист',
    description: 'Допуск к финальной проверке',
  },
]

const grants: { userId: string; achievementId: string; at: string }[] = []

export function getMockAchievements() {
  return [...achievements]
}

export function grantMockAchievement(userId: string, achievementId: string) {
  grants.push({ userId, achievementId, at: new Date().toISOString() })
}

export function getMockGrants() {
  return [...grants]
}
