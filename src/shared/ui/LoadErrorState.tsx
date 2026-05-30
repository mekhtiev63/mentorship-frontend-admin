import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlineOutlined'
import RefreshIcon from '@mui/icons-material/Refresh'
import { Box, Button, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { ruAdmin } from '@/shared/i18n/ru-admin'
import { GlassSurface } from '@/shared/ui/GlassSurface'

type LoadErrorStateProps = {
  title?: string
  message?: string
  onRetry?: () => void
}

export function LoadErrorState({
  title = ruAdmin.errors.loadFailed,
  message = ruAdmin.errors.loadFailedHint,
  onRetry,
}: LoadErrorStateProps) {
  return (
    <Box component={motion.div} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <GlassSurface sx={{ p: 3, textAlign: 'center' }}>
        <ErrorOutlineIcon sx={{ fontSize: 48, color: 'error.main', mb: 1 }} />
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>
          {message}
        </Typography>
        {onRetry ? (
          <Button variant="contained" startIcon={<RefreshIcon />} onClick={onRetry}>
            {ruAdmin.errors.retry}
          </Button>
        ) : null}
      </GlassSurface>
    </Box>
  )
}
