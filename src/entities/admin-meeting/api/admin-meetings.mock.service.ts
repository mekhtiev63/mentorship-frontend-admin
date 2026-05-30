import type { AdminMeetingsService } from '@/entities/admin-meeting/api/admin-meetings.service'
import { getMockMeetings, setMockMeetings } from '@/entities/admin-meeting/model/mock-store'
import type { AssignMeetingInput } from '@/entities/admin-meeting/model/types'
import { mockDelay } from '@/shared/lib/mockDelay'

export const adminMeetingsMockService: AdminMeetingsService = {
  async list() {
    await mockDelay()
    return getMockMeetings()
  },
  async assign(input: AssignMeetingInput) {
    await mockDelay(400)
    const item = {
      id: `mt${Date.now()}`,
      status: 'scheduled' as const,
      ...input,
    }
    setMockMeetings([...getMockMeetings(), item])
    return item
  },
  async cancel(id: string) {
    await mockDelay(300)
    const next = getMockMeetings().map((m) =>
      m.id === id ? { ...m, status: 'cancelled' as const } : m,
    )
    setMockMeetings(next)
    const updated = next.find((m) => m.id === id)
    if (!updated) throw new Error('Встреча не найдена')
    return updated
  },
}
