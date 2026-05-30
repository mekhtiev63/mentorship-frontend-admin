import {
  adminRoadmapHttpService,
  type AdminRoadmapService,
} from '@/entities/admin-roadmap/api/admin-roadmap.service'
import { adminRoadmapMockService } from '@/entities/admin-roadmap/api/admin-roadmap.mock.service'
import { useMockApi } from '@/shared/config/api-mode'

export function getAdminRoadmapService(): AdminRoadmapService {
  return useMockApi ? adminRoadmapMockService : adminRoadmapHttpService
}

export const adminRoadmapQueryKeys = {
  all: ['admin-roadmap'] as const,
  blocks: () => [...adminRoadmapQueryKeys.all, 'blocks'] as const,
  materials: (blockId: string) => [...adminRoadmapQueryKeys.all, 'materials', blockId] as const,
}
