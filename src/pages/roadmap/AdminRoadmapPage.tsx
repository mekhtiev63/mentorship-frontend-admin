import { Button, Chip, Grid, IconButton, List, ListItem, ListItemText, Stack, Typography } from '@mui/material'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { useState } from 'react'
import {
  useAdminRoadmapBlocks,
  useAdminRoadmapMaterials,
  useAdminRoadmapMutations,
} from '@/entities/admin-roadmap/model/useAdminRoadmap'
import { ruAdmin } from '@/shared/i18n/ru-admin'
import { GlassSurface, PageHeader, QueryWrapper } from '@/shared/ui'

export function AdminRoadmapPage() {
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)
  const blocksQuery = useAdminRoadmapBlocks()
  const materialsQuery = useAdminRoadmapMaterials(selectedBlockId)
  const mutations = useAdminRoadmapMutations()

  const activeBlockId = selectedBlockId ?? blocksQuery.data?.[0]?.id ?? null

  return (
    <>
      <PageHeader title={ruAdmin.roadmap.title} subtitle={ruAdmin.roadmap.subtitle} />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            {ruAdmin.roadmap.blocks}
          </Typography>
          <QueryWrapper
            isLoading={blocksQuery.isLoading}
            isError={blocksQuery.isError}
            onRetry={() => blocksQuery.refetch()}
            isEmpty={!blocksQuery.data?.length}
            emptyTitle={ruAdmin.roadmap.emptyBlocks}
          >
            <GlassSurface>
              <List dense>
                {blocksQuery.data?.map((block) => (
                  <ListItem
                    key={block.id}
                    sx={{
                      bgcolor: activeBlockId === block.id ? 'rgba(59,130,246,0.12)' : undefined,
                      cursor: 'pointer',
                      flexWrap: 'wrap',
                      gap: 1,
                    }}
                    onClick={() => setSelectedBlockId(block.id)}
                  >
                    <ListItemText
                      primary={
                        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                          <Typography variant="body2">{block.title}</Typography>
                          <Chip size="small" label={`#${block.order}`} />
                        </Stack>
                      }
                    />
                    <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                      <Button
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation()
                          mutations.setBlockActive.mutate({ id: block.id, active: !block.active })
                        }}
                      >
                        {block.active ? ruAdmin.roadmap.deactivate : ruAdmin.roadmap.activate}
                      </Button>
                      <IconButton
                        size="small"
                        aria-label={ruAdmin.roadmap.moveUp}
                        onClick={(e) => {
                          e.stopPropagation()
                          mutations.reorderBlock.mutate({ id: block.id, direction: 'up' })
                        }}
                      >
                        <ArrowUpwardIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        aria-label={ruAdmin.roadmap.moveDown}
                        onClick={(e) => {
                          e.stopPropagation()
                          mutations.reorderBlock.mutate({ id: block.id, direction: 'down' })
                        }}
                      >
                        <ArrowDownwardIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </ListItem>
                ))}
              </List>
            </GlassSurface>
          </QueryWrapper>
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            {ruAdmin.roadmap.materials}
          </Typography>
          {!activeBlockId ? (
            <Typography color="text.secondary">{ruAdmin.roadmap.selectBlock}</Typography>
          ) : (
            <QueryWrapper
              isLoading={materialsQuery.isLoading}
              isError={materialsQuery.isError}
              onRetry={() => materialsQuery.refetch()}
              isEmpty={!materialsQuery.data?.length}
              emptyTitle={ruAdmin.roadmap.emptyMaterials}
            >
              <GlassSurface>
                <List dense>
                  {materialsQuery.data?.map((mat) => (
                    <ListItem
                      key={mat.id}
                      secondaryAction={
                        <Stack direction="row" spacing={0.5}>
                          <IconButton
                            size="small"
                            onClick={() =>
                              mutations.reorderMaterial.mutate({ id: mat.id, direction: 'up' })
                            }
                          >
                            <ArrowUpwardIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() =>
                              mutations.reorderMaterial.mutate({ id: mat.id, direction: 'down' })
                            }
                          >
                            <ArrowDownwardIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      }
                    >
                      <ListItemText
                        primary={mat.title}
                        secondary={mat.active ? ruAdmin.common.active : ruAdmin.common.inactive}
                      />
                      <Button
                        size="small"
                        onClick={() =>
                          mutations.setMaterialActive.mutate({ id: mat.id, active: !mat.active })
                        }
                      >
                        {mat.active ? ruAdmin.roadmap.deactivate : ruAdmin.roadmap.activate}
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </GlassSurface>
            </QueryWrapper>
          )}
        </Grid>
      </Grid>
    </>
  )
}
