import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { adminInterviewsQueryKeys, getAdminInterviewsService } from '@/entities/admin-interview/api'
import type { AdminInterviewInput } from '@/entities/admin-interview/model/types'

export function useAdminInterviewsList() {
  const service = getAdminInterviewsService()
  return useQuery({
    queryKey: adminInterviewsQueryKeys.list(),
    queryFn: () => service.list(),
  })
}

export function useAdminInterviewMutations() {
  const qc = useQueryClient()
  const service = getAdminInterviewsService()
  const invalidate = () => qc.invalidateQueries({ queryKey: adminInterviewsQueryKeys.all })

  return {
    create: useMutation({
      mutationFn: (input: AdminInterviewInput) => service.create(input),
      onSuccess: invalidate,
    }),
    update: useMutation({
      mutationFn: ({ id, input }: { id: string; input: AdminInterviewInput }) =>
        service.update(id, input),
      onSuccess: invalidate,
    }),
    remove: useMutation({
      mutationFn: (id: string) => service.remove(id),
      onSuccess: invalidate,
    }),
  }
}
