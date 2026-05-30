import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  adminAchievementsQueryKeys,
  getAdminAchievementsService,
} from '@/entities/admin-achievement/api'
import type { GrantAchievementInput } from '@/entities/admin-achievement/model/types'

export function useAdminAchievementsList() {
  const service = getAdminAchievementsService()
  return useQuery({
    queryKey: adminAchievementsQueryKeys.list(),
    queryFn: () => service.list(),
  })
}

export function useAdminGrantAchievement() {
  const qc = useQueryClient()
  const service = getAdminAchievementsService()
  return useMutation({
    mutationFn: (input: GrantAchievementInput) => service.grant(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminAchievementsQueryKeys.all }),
  })
}
