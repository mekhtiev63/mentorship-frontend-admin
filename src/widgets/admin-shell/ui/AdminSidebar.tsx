import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import { NavLink } from 'react-router-dom'
import { adminNavItems } from '@/widgets/admin-shell/model/nav-config'
import { ruAdmin } from '@/shared/i18n/ru-admin'
import { brandColors } from '@/shared/theme/palette'

type AdminSidebarProps = {
  onNavigate?: () => void
}

export function AdminSidebar({ onNavigate }: AdminSidebarProps) {
  return (
    <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography
        variant="overline"
        sx={{
          mb: 2,
          background: brandColors.heroGradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 700,
        }}
      >
        {ruAdmin.roleLabel}
      </Typography>
      <List sx={{ flex: 1 }}>
        {adminNavItems.map(({ path, label, icon: Icon }) => (
          <ListItemButton
            key={path}
            component={NavLink}
            to={path}
            end={path === '/admin'}
            onClick={onNavigate}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              '&.active': {
                bgcolor: 'rgba(59, 130, 246, 0.15)',
                boxShadow: brandColors.neonBlue,
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>
              <Icon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )
}
