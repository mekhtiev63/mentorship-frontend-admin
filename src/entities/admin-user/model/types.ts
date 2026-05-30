export type UserRole = 'student' | 'buddy' | 'admin'
export type UserStatus = 'active' | 'blocked'

export type AdminUser = {
  id: string
  email: string
  displayName: string
  role: UserRole
  status: UserStatus
  registeredAt: string
  bio?: string
}

export type AdminUsersFilter = {
  search?: string
  role?: UserRole | 'all'
  status?: UserStatus | 'all'
}

export type AdminUsersListResult = {
  items: AdminUser[]
  total: number
}
