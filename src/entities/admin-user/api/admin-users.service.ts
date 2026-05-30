import type {
  AdminUser,
  AdminUsersFilter,
  AdminUsersListResult,
  UserRole,
} from '@/entities/admin-user/model/types'

export interface AdminUsersService {
  list(filter: AdminUsersFilter): Promise<AdminUsersListResult>
  getById(id: string): Promise<AdminUser | null>
  updateRole(id: string, role: UserRole): Promise<AdminUser>
  setBlocked(id: string, blocked: boolean): Promise<AdminUser>
}

/** Future: GET /admin/users, PATCH /admin/users/:id/role, etc. */
export const adminUsersHttpService: AdminUsersService = {
  async list() {
    throw new Error('HTTP admin users API не подключён')
  },
  async getById() {
    throw new Error('HTTP admin users API не подключён')
  },
  async updateRole() {
    throw new Error('HTTP admin users API не подключён')
  },
  async setBlocked() {
    throw new Error('HTTP admin users API не подключён')
  },
}
