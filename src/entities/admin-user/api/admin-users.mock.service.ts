import type { AdminUsersService } from '@/entities/admin-user/api/admin-users.service'
import { getMockUsersStore, setMockUsersStore } from '@/entities/admin-user/model/mock-store'
import type { AdminUser, AdminUsersFilter, UserRole } from '@/entities/admin-user/model/types'
import { mockDelay } from '@/shared/lib/mockDelay'

export const adminUsersMockService: AdminUsersService = {
  async list(filter: AdminUsersFilter) {
    await mockDelay()
    let items = [...getMockUsersStore()]
    const q = filter.search?.trim().toLowerCase()
    if (q) {
      items = items.filter(
        (u) =>
          u.email.toLowerCase().includes(q) ||
          u.displayName.toLowerCase().includes(q),
      )
    }
    if (filter.role && filter.role !== 'all') {
      items = items.filter((u) => u.role === filter.role)
    }
    if (filter.status && filter.status !== 'all') {
      items = items.filter((u) => u.status === filter.status)
    }
    return { items, total: items.length }
  },

  async getById(id: string) {
    await mockDelay(250)
    return getMockUsersStore().find((u) => u.id === id) ?? null
  },

  async updateRole(id: string, role: UserRole) {
    await mockDelay(300)
    const store = getMockUsersStore()
    const idx = store.findIndex((u) => u.id === id)
    if (idx < 0) throw new Error('Пользователь не найден')
    const updated = { ...store[idx], role }
    const next = [...store]
    next[idx] = updated
    setMockUsersStore(next)
    return updated
  },

  async setBlocked(id: string, blocked: boolean) {
    await mockDelay(300)
    const store = getMockUsersStore()
    const idx = store.findIndex((u) => u.id === id)
    if (idx < 0) throw new Error('Пользователь не найден')
    const updated: AdminUser = {
      ...store[idx],
      status: blocked ? 'blocked' : 'active',
    }
    const next = [...store]
    next[idx] = updated
    setMockUsersStore(next)
    return updated
  },
}
