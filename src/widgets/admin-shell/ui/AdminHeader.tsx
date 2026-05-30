import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/LogoutOutlined'
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import { ruAdmin } from '@/shared/i18n/ru-admin'
import { useSessionStore } from '@/shared/store/session-store'
import { brandColors } from '@/shared/theme/palette'
import { useNavigate } from 'react-router-dom'

type AdminHeaderProps = {
  showMenuButton?: boolean
  onMenuClick?: () => void
}

export function AdminHeader({ showMenuButton, onMenuClick }: AdminHeaderProps) {
  const session = useSessionStore((s) => s.session)
  const setSession = useSessionStore((s) => s.setSession)
  const navigate = useNavigate()

  const logout = () => {
    setSession(null)
    navigate('/login')
  }

  return (
    <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
      <Toolbar>
        {showMenuButton ? (
          <IconButton color="inherit" edge="start" onClick={onMenuClick} aria-label={ruAdmin.header.menu}>
            <MenuIcon />
          </IconButton>
        ) : null}
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
          {ruAdmin.appTitle}
        </Typography>
        {session ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {session.displayName}
            </Typography>
            <IconButton color="inherit" onClick={logout} aria-label={ruAdmin.header.logout}>
              <LogoutIcon />
            </IconButton>
          </Box>
        ) : null}
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            bottom: 0,
            left: '10%',
            right: '10%',
            height: 1,
            background: brandColors.heroGradient,
            opacity: 0.35,
          }}
        />
      </Toolbar>
    </AppBar>
  )
}
