import { Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { ruAdmin } from '@/shared/i18n/ru-admin'
import { GlassSurface } from '@/shared/ui'

export function NotFoundPage() {
  return (
    <GlassSurface sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Страница не найдена
      </Typography>
      <Typography component={RouterLink} to="/admin" color="primary">
        {ruAdmin.nav.dashboard}
      </Typography>
    </GlassSurface>
  )
}
