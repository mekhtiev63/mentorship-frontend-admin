import type { RoadmapBlock, RoadmapMaterial } from '@/entities/admin-roadmap/model/types'

const blocks: RoadmapBlock[] = [
  { id: 'b1', title: 'Основы Go', order: 1, active: true },
  { id: 'b2', title: 'Конкурентность', order: 2, active: true },
  { id: 'b3', title: 'HTTP и API', order: 3, active: false },
]

const materials: RoadmapMaterial[] = [
  { id: 'm1', blockId: 'b1', title: 'Синтаксис и типы', order: 1, active: true },
  { id: 'm2', blockId: 'b1', title: 'Структуры и интерфейсы', order: 2, active: true },
  { id: 'm3', blockId: 'b2', title: 'Goroutines', order: 1, active: true },
  { id: 'm4', blockId: 'b2', title: 'Channels', order: 2, active: false },
]

export function getMockBlocks(): RoadmapBlock[] {
  return [...blocks].sort((a, b) => a.order - b.order)
}

export function getMockMaterials(): RoadmapMaterial[] {
  return [...materials].sort((a, b) => a.order - b.order)
}

export function setMockBlocks(next: RoadmapBlock[]) {
  blocks.length = 0
  blocks.push(...next)
}

export function setMockMaterials(next: RoadmapMaterial[]) {
  materials.length = 0
  materials.push(...next)
}
