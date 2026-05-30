import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { adminBonusQueryKeys, getAdminBonusService } from '@/entities/admin-bonus/api'

export function useAdminBonusHistory() {
  const service = getAdminBonusService()
  return useQuery({
    queryKey: adminBonusQueryKeys.history(),
    queryFn: () => service.listOperations(),
  })
}

export function useAdminBonusMutations() {
  const qc = useQueryClient()
  const service = getAdminBonusService()
  const invalidate = () => qc.invalidateQueries({ queryKey: adminBonusQueryKeys.all })
  return {
    credit: useMutation({
      mutationFn: service.credit.bind(service),
      onSuccess: invalidate,
    }),
    debit: useMutation({
      mutationFn: service.debit.bind(service),
      onSuccess: invalidate,
    }),
  }
}
