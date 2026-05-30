import type { AdminUser } from '@/entities/admin-user/model/types'

export const initialMockUsers: AdminUser[] = [
  {
    id: 'u1',
    email: 'anna.student@example.com',
    displayName: 'Анна Смирнова',
    role: 'student',
    status: 'active',
    registeredAt: '2025-11-02T10:00:00Z',
    bio: 'Go-разработчик, 2 курс',
  },
  {
    id: 'u2',
    email: 'ivan.buddy@example.com',
    displayName: 'Иван Петров',
    role: 'buddy',
    status: 'active',
    registeredAt: '2025-09-15T08:30:00Z',
  },
  {
    id: 'u3',
    email: 'blocked@example.com',
    displayName: 'Олег К.',
    role: 'student',
    status: 'blocked',
    registeredAt: '2026-01-10T12:00:00Z',
  },
  {
    id: 'u4',
    email: 'maria@example.com',
    displayName: 'Мария Волкова',
    role: 'student',
    status: 'active',
    registeredAt: '2026-02-20T09:00:00Z',
  },
  {
    id: 'u5',
    email: 'admin@go-mentorship.local',
    displayName: 'Администратор',
    role: 'admin',
    status: 'active',
    registeredAt: '2025-01-01T00:00:00Z',
  },
]

let users = [...initialMockUsers]

export function getMockUsersStore(): AdminUser[] {
  return users
}

export function setMockUsersStore(next: AdminUser[]) {
  users = next
}

export function resetMockUsersStore() {
  users = [...initialMockUsers]
}
