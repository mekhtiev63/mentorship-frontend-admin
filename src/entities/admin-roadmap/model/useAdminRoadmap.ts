import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { adminRoadmapQueryKeys, getAdminRoadmapService } from '@/entities/admin-roadmap/api'

export function useAdminRoadmapBlocks() {
  const service = getAdminRoadmapService()
  return useQuery({
    queryKey: adminRoadmapQueryKeys.blocks(),
    queryFn: () => service.listBlocks(),
  })
}

export function useAdminRoadmapMaterials(blockId: string | null) {
  const service = getAdminRoadmapService()
  return useQuery({
    queryKey: adminRoadmapQueryKeys.materials(blockId ?? ''),
    queryFn: () => service.listMaterials(blockId!),
    enabled: Boolean(blockId),
  })
}

export function useAdminRoadmapMutations() {
  const qc = useQueryClient()
  const service = getAdminRoadmapService()
  const invalidate = () => qc.invalidateQueries({ queryKey: adminRoadmapQueryKeys.all })

  return {
    reorderBlock: useMutation({
      mutationFn: (p: { id: string; direction: 'up' | 'down' }) =>
        service.reorderBlock(p.id, p.direction),
      onSuccess: invalidate,
    }),
    reorderMaterial: useMutation({
      mutationFn: (p: { id: string; direction: 'up' | 'down' }) =>
        service.reorderMaterial(p.id, p.direction),
      onSuccess: invalidate,
    }),
    setBlockActive: useMutation({
      mutationFn: (p: { id: string; active: boolean }) => service.setBlockActive(p.id, p.active),
      onSuccess: invalidate,
    }),
    setMaterialActive: useMutation({
      mutationFn: (p: { id: string; active: boolean }) => service.setMaterialActive(p.id, p.active),
      onSuccess: invalidate,
    }),
  }
}
