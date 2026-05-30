export type AdminAchievement = {
  id: string
  code: string
  title: string
  description: string
}

export type GrantAchievementInput = {
  achievementId: string
  userId: string
}
