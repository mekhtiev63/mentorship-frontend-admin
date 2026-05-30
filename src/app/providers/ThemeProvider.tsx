import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import type { ReactNode } from 'react'
import { brandColors } from '@/shared/theme/palette'

const theme = createTheme({
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 700, letterSpacing: '-0.02em' },
    h5: { fontWeight: 600, letterSpacing: '-0.01em' },
    h6: { fontWeight: 600 },
  },
  palette: {
    mode: 'dark',
    primary: { main: brandColors.primary, light: '#60A5FA', dark: '#2563EB' },
    secondary: { main: brandColors.secondary, light: '#A78BFA', dark: '#6D28D9' },
    success: { main: brandColors.success },
    warning: { main: brandColors.warning },
    error: { main: brandColors.error },
    background: { default: brandColors.background, paper: brandColors.card },
    text: { primary: brandColors.textPrimary, secondary: brandColors.textSecondary },
    divider: 'rgba(148, 163, 184, 0.12)',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: { body: { backgroundColor: brandColors.background } },
    },
    MuiCard: { defaultProps: { elevation: 0, variant: 'outlined' } },
    MuiAppBar: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(5, 8, 22, 0.85)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        },
      },
    },
  },
})

type AppThemeProviderProps = { children: ReactNode }

export function AppThemeProvider({ children }: AppThemeProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
