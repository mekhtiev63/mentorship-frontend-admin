import type { AdminRoadmapService } from '@/entities/admin-roadmap/api/admin-roadmap.service'
import {
  getMockBlocks,
  getMockMaterials,
  setMockBlocks,
  setMockMaterials,
} from '@/entities/admin-roadmap/model/mock-store'
import { mockDelay } from '@/shared/lib/mockDelay'

function swapOrder<T extends { id: string; order: number }>(items: T[], id: string, dir: 'up' | 'down') {
  const sorted = [...items].sort((a, b) => a.order - b.order)
  const idx = sorted.findIndex((x) => x.id === id)
  if (idx < 0) return sorted
  const swapIdx = dir === 'up' ? idx - 1 : idx + 1
  if (swapIdx < 0 || swapIdx >= sorted.length) return sorted
  const a = sorted[idx]
  const b = sorted[swapIdx]
  const next = sorted.map((item) => {
    if (item.id === a.id) return { ...item, order: b.order }
    if (item.id === b.id) return { ...item, order: a.order }
    return item
  })
  return next.sort((x, y) => x.order - y.order)
}

export const adminRoadmapMockService: AdminRoadmapService = {
  async listBlocks() {
    await mockDelay()
    return getMockBlocks()
  },
  async listMaterials(blockId: string) {
    await mockDelay(280)
    return getMockMaterials().filter((m) => m.blockId === blockId)
  },
  async reorderBlock(id, direction) {
    await mockDelay(200)
    const next = swapOrder(getMockBlocks(), id, direction)
    setMockBlocks(next)
    return next
  },
  async reorderMaterial(id, direction) {
    await mockDelay(200)
    const all = getMockMaterials()
    const target = all.find((m) => m.id === id)
    if (!target) throw new Error('Материал не найден')
    const blockItems = all.filter((m) => m.blockId === target.blockId)
    const reordered = swapOrder(blockItems, id, direction)
    const rest = all.filter((m) => m.blockId !== target.blockId)
    setMockMaterials([...rest, ...reordered])
    return reordered
  },
  async setBlockActive(id, active) {
    await mockDelay(200)
    const next = getMockBlocks().map((b) => (b.id === id ? { ...b, active } : b))
    setMockBlocks(next)
    const block = next.find((b) => b.id === id)
    if (!block) throw new Error('Блок не найден')
    return block
  },
  async setMaterialActive(id, active) {
    await mockDelay(200)
    const next = getMockMaterials().map((m) => (m.id === id ? { ...m, active } : m))
    setMockMaterials(next)
    const mat = next.find((m) => m.id === id)
    if (!mat) throw new Error('Материал не найден')
    return mat
  },
}
