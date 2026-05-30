import { Box } from '@mui/material'
import { brandColors } from '@/shared/theme/palette'

export function NeonBackground() {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: brandColors.background,
        backgroundImage: `
          radial-gradient(ellipse 80% 50% at 20% 20%, rgba(59, 130, 246, 0.15), transparent),
          radial-gradient(ellipse 60% 40% at 80% 70%, rgba(139, 92, 246, 0.12), transparent)
        `,
      }}
    />
  )
}
