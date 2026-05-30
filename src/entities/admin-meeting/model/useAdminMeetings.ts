import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { adminMeetingsQueryKeys, getAdminMeetingsService } from '@/entities/admin-meeting/api'
import type { AssignMeetingInput } from '@/entities/admin-meeting/model/types'

export function useAdminMeetingsList() {
  const service = getAdminMeetingsService()
  return useQuery({
    queryKey: adminMeetingsQueryKeys.list(),
    queryFn: () => service.list(),
  })
}

export function useAdminMeetingMutations() {
  const qc = useQueryClient()
  const service = getAdminMeetingsService()
  return {
    assign: useMutation({
      mutationFn: (input: AssignMeetingInput) => service.assign(input),
      onSuccess: () => qc.invalidateQueries({ queryKey: adminMeetingsQueryKeys.all }),
    }),
    cancel: useMutation({
      mutationFn: (id: string) => service.cancel(id),
      onSuccess: () => qc.invalidateQueries({ queryKey: adminMeetingsQueryKeys.all }),
    }),
  }
}
