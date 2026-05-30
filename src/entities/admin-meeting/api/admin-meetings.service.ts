import type { AdminMeeting, AssignMeetingInput } from '@/entities/admin-meeting/model/types'

export interface AdminMeetingsService {
  list(): Promise<AdminMeeting[]>
  assign(input: AssignMeetingInput): Promise<AdminMeeting>
  cancel(id: string): Promise<AdminMeeting>
}

export const adminMeetingsHttpService: AdminMeetingsService = {
  async list() {
    throw new Error('HTTP meetings API не подключён')
  },
  async assign() {
    throw new Error('HTTP meetings API не подключён')
  },
  async cancel() {
    throw new Error('HTTP meetings API не подключён')
  },
}
