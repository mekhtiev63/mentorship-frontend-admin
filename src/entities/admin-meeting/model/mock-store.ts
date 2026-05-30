import type { AdminMeeting } from '@/entities/admin-meeting/model/types'

let meetings: AdminMeeting[] = [
  {
    id: 'mt1',
    studentName: 'Анна Смирнова',
    buddyName: 'Иван Петров',
    slotAt: '2026-06-05T16:00:00Z',
    status: 'scheduled',
  },
  {
    id: 'mt2',
    studentName: 'Мария Волкова',
    buddyName: '—',
    slotAt: '2026-06-08T10:00:00Z',
    status: 'pending',
  },
]

export function getMockMeetings() {
  return [...meetings]
}

export function setMockMeetings(next: AdminMeeting[]) {
  meetings = next
}
