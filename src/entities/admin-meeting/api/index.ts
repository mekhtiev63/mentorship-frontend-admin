import {
  adminMeetingsHttpService,
  type AdminMeetingsService,
} from '@/entities/admin-meeting/api/admin-meetings.service'
import { adminMeetingsMockService } from '@/entities/admin-meeting/api/admin-meetings.mock.service'
import { useMockApi } from '@/shared/config/api-mode'

export function getAdminMeetingsService(): AdminMeetingsService {
  return useMockApi ? adminMeetingsMockService : adminMeetingsHttpService
}

export const adminMeetingsQueryKeys = {
  all: ['admin-meetings'] as const,
  list: () => [...adminMeetingsQueryKeys.all, 'list'] as const,
}
