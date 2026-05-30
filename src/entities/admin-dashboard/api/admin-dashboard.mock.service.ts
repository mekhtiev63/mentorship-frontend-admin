import type { AdminDashboardService } from '@/entities/admin-dashboard/api/admin-dashboard.service'
import { getMockBlocks } from '@/entities/admin-roadmap/model/mock-store'
import { getMockInterviews } from '@/entities/admin-interview/model/mock-store'
import { getMockMeetings } from '@/entities/admin-meeting/model/mock-store'
import { getMockUsersStore } from '@/entities/admin-user/model/mock-store'
import { mockDelay } from '@/shared/lib/mockDelay'

export const adminDashboardMockService: AdminDashboardService = {
  async getStats() {
    await mockDelay(320)
    return {
      usersTotal: getMockUsersStore().length,
      activeRoadmapBlocks: getMockBlocks().filter((b) => b.active).length,
      pendingMeetings: getMockMeetings().filter((m) => m.status === 'pending').length,
      interviewsTotal: getMockInterviews().length,
    }
  },
}
