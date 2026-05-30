import { Box, Drawer, useMediaQuery, useTheme } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { AdminHeader } from '@/widgets/admin-shell/ui/AdminHeader'
import { AdminSidebar } from '@/widgets/admin-shell/ui/AdminSidebar'
import { NeonBackground, PageTransition } from '@/shared/ui'
import { useUiStore } from '@/shared/store/ui-store'

const drawerWidth = 280

export function AdminLayout() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const sidebarOpen = useUiStore((s) => s.sidebarOpen)
  const setSidebarOpen = useUiStore((s) => s.setSidebarOpen)
  const location = useLocation()

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
      <NeonBackground />
      <AdminHeader
        showMenuButton={isMobile}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
      />
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 }, position: 'relative', zIndex: 1 }}
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? sidebarOpen : true}
          onClose={() => setSidebarOpen(false)}
          slotProps={{
            paper: {
              sx: {
                width: drawerWidth,
                boxSizing: 'border-box',
                mt: { md: '64px' },
                height: { md: 'calc(100% - 64px)' },
                borderRight: '1px solid rgba(255,255,255,0.06)',
                bgcolor: 'rgba(5, 8, 22, 0.94)',
                backdropFilter: 'blur(16px)',
              },
            },
          }}
        >
          <AdminSidebar onNavigate={() => isMobile && setSidebarOpen(false)} />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          mt: '64px',
          width: { md: `calc(100% - ${drawerWidth}px)` },
          position: 'relative',
          zIndex: 1,
        }}
      >
        <AnimatePresence mode="wait">
          <PageTransition routeKey={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </Box>
    </Box>
  )
}
