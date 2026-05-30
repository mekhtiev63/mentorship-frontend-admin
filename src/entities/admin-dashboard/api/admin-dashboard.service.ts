export type AdminDashboardStats = {
  usersTotal: number
  activeRoadmapBlocks: number
  pendingMeetings: number
  interviewsTotal: number
}

export interface AdminDashboardService {
  getStats(): Promise<AdminDashboardStats>
}

export const adminDashboardHttpService: AdminDashboardService = {
  async getStats() {
    throw new Error('HTTP dashboard API не подключён')
  },
}
