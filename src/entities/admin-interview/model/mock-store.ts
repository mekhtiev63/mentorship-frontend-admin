import type { AdminInterview } from '@/entities/admin-interview/model/types'

let interviews: AdminInterview[] = [
  {
    id: 'i1',
    title: 'Mock: алгоритмы',
    type: 'mock',
    scheduledAt: '2026-06-10T14:00:00Z',
    capacity: 8,
    enrolled: 5,
  },
  {
    id: 'i2',
    title: 'Реальное: backend',
    type: 'real',
    scheduledAt: '2026-06-18T11:00:00Z',
    capacity: 4,
    enrolled: 2,
  },
]

export function getMockInterviews() {
  return [...interviews]
}

export function setMockInterviews(next: AdminInterview[]) {
  interviews = next
}
