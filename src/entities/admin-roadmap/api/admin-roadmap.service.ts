import type { RoadmapBlock, RoadmapMaterial } from '@/entities/admin-roadmap/model/types'

export interface AdminRoadmapService {
  listBlocks(): Promise<RoadmapBlock[]>
  listMaterials(blockId: string): Promise<RoadmapMaterial[]>
  reorderBlock(id: string, direction: 'up' | 'down'): Promise<RoadmapBlock[]>
  reorderMaterial(id: string, direction: 'up' | 'down'): Promise<RoadmapMaterial[]>
  setBlockActive(id: string, active: boolean): Promise<RoadmapBlock>
  setMaterialActive(id: string, active: boolean): Promise<RoadmapMaterial>
}

export const adminRoadmapHttpService: AdminRoadmapService = {
  async listBlocks() {
    throw new Error('HTTP roadmap API не подключён')
  },
  async listMaterials() {
    throw new Error('HTTP roadmap API не подключён')
  },
  async reorderBlock() {
    throw new Error('HTTP roadmap API не подключён')
  },
  async reorderMaterial() {
    throw new Error('HTTP roadmap API не подключён')
  },
  async setBlockActive() {
    throw new Error('HTTP roadmap API не подключён')
  },
  async setMaterialActive() {
    throw new Error('HTTP roadmap API не подключён')
  },
}
