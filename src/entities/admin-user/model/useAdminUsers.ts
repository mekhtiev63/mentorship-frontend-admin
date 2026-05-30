import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  adminUsersQueryKeys,
  getAdminUsersService,
} from '@/entities/admin-user/api'
import type { AdminUsersFilter, UserRole } from '@/entities/admin-user/model/types'

export function useAdminUsersList(filter: AdminUsersFilter) {
  const service = getAdminUsersService()
  return useQuery({
    queryKey: adminUsersQueryKeys.list(filter),
    queryFn: () => service.list(filter),
  })
}

export function useAdminUserDetail(id: string | undefined) {
  const service = getAdminUsersService()
  return useQuery({
    queryKey: adminUsersQueryKeys.detail(id ?? ''),
    queryFn: () => service.getById(id!),
    enabled: Boolean(id),
  })
}

export function useAdminUserUpdateRole() {
  const qc = useQueryClient()
  const service = getAdminUsersService()
  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: UserRole }) => service.updateRole(id, role),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminUsersQueryKeys.all }),
  })
}

export function useAdminUserSetBlocked() {
  const qc = useQueryClient()
  const service = getAdminUsersService()
  return useMutation({
    mutationFn: ({ id, blocked }: { id: string; blocked: boolean }) =>
      service.setBlocked(id, blocked),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminUsersQueryKeys.all }),
  })
}
