import type { AdminInterviewsService } from '@/entities/admin-interview/api/admin-interviews.service'
import { getMockInterviews, setMockInterviews } from '@/entities/admin-interview/model/mock-store'
import type { AdminInterviewInput } from '@/entities/admin-interview/model/types'
import { mockDelay } from '@/shared/lib/mockDelay'

export const adminInterviewsMockService: AdminInterviewsService = {
  async list() {
    await mockDelay()
    return getMockInterviews()
  },
  async create(input: AdminInterviewInput) {
    await mockDelay(350)
    const item = {
      id: `i${Date.now()}`,
      enrolled: 0,
      ...input,
    }
    setMockInterviews([...getMockInterviews(), item])
    return item
  },
  async update(id: string, input: AdminInterviewInput) {
    await mockDelay(350)
    const list = getMockInterviews()
    const idx = list.findIndex((x) => x.id === id)
    if (idx < 0) throw new Error('Собеседование не найдено')
    const updated = { ...list[idx], ...input }
    const next = [...list]
    next[idx] = updated
    setMockInterviews(next)
    return updated
  },
  async remove(id: string) {
    await mockDelay(300)
    setMockInterviews(getMockInterviews().filter((x) => x.id !== id))
  },
}
