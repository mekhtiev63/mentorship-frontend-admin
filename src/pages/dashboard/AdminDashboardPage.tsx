import { Card, CardContent, Grid, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { useAdminDashboardStats } from '@/entities/admin-dashboard/model/useAdminDashboard'
import { ruAdmin } from '@/shared/i18n/ru-admin'
import { brandColors } from '@/shared/theme/palette'
import { GlassSurface, PageHeader, QueryWrapper } from '@/shared/ui'

const cards = [
  { key: 'users' as const, label: ruAdmin.dashboard.cards.users, field: 'usersTotal' as const },
  { key: 'roadmap', label: ruAdmin.dashboard.cards.activeRoadmap, field: 'activeRoadmapBlocks' as const },
  { key: 'meetings', label: ruAdmin.dashboard.cards.pendingMeetings, field: 'pendingMeetings' as const },
  { key: 'interviews', label: ruAdmin.dashboard.cards.interviews, field: 'interviewsTotal' as const },
]

export function AdminDashboardPage() {
  const { data, isLoading, isError, refetch } = useAdminDashboardStats()

  return (
    <>
      <PageHeader title={ruAdmin.dashboard.title} subtitle={ruAdmin.dashboard.subtitle} />
      <QueryWrapper isLoading={isLoading} isError={isError} onRetry={() => refetch()}>
        <Grid container spacing={2}>
          {cards.map((c, i) => (
            <Grid key={c.key} size={{ xs: 12, sm: 6, md: 3 }}>
              <Card
                component={motion.div}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                sx={{
                  borderColor: 'rgba(255,255,255,0.08)',
                  background: 'rgba(17, 24, 39, 0.55)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: i % 2 === 0 ? brandColors.neonBlue : brandColors.neonViolet,
                }}
              >
                <CardContent>
                  <Typography color="text.secondary" variant="body2">
                    {c.label}
                  </Typography>
                  <Typography variant="h3" sx={{ mt: 1, fontWeight: 700 }}>
                    {data?.[c.field] ?? '—'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <GlassSurface sx={{ mt: 3, p: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Данные на mock-этапе. После подключения API сводка будет обновляться в реальном времени.
          </Typography>
        </GlassSurface>
      </QueryWrapper>
    </>
  )
}
