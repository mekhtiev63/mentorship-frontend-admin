import {
  adminInterviewsHttpService,
  type AdminInterviewsService,
} from '@/entities/admin-interview/api/admin-interviews.service'
import { adminInterviewsMockService } from '@/entities/admin-interview/api/admin-interviews.mock.service'
import { useMockApi } from '@/shared/config/api-mode'

export function getAdminInterviewsService(): AdminInterviewsService {
  return useMockApi ? adminInterviewsMockService : adminInterviewsHttpService
}

export const adminInterviewsQueryKeys = {
  all: ['admin-interviews'] as const,
  list: () => [...adminInterviewsQueryKeys.all, 'list'] as const,
}
