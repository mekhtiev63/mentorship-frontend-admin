import {
  adminUsersHttpService,
  type AdminUsersService,
} from '@/entities/admin-user/api/admin-users.service'
import { adminUsersMockService } from '@/entities/admin-user/api/admin-users.mock.service'
import { useMockApi } from '@/shared/config/api-mode'

export function getAdminUsersService(): AdminUsersService {
  return useMockApi ? adminUsersMockService : adminUsersHttpService
}

export const adminUsersQueryKeys = {
  all: ['admin-users'] as const,
  list: (filter: Record<string, unknown>) => [...adminUsersQueryKeys.all, 'list', filter] as const,
  detail: (id: string) => [...adminUsersQueryKeys.all, 'detail', id] as const,
}
