import { Box } from '@mui/material'
import type { BoxProps } from '@mui/material'
import { glassSurface } from '@/shared/theme/palette'

export function GlassSurface({ sx, children, ...rest }: BoxProps) {
  return (
    <Box sx={{ ...glassSurface, borderRadius: 2, ...sx }} {...rest}>
      {children}
    </Box>
  )
}
