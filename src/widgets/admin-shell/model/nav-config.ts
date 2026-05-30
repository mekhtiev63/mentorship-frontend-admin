import DashboardIcon from '@mui/icons-material/DashboardOutlined'
import PeopleIcon from '@mui/icons-material/PeopleOutlined'
import MapIcon from '@mui/icons-material/MapOutlined'
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOverOutlined'
import GroupsIcon from '@mui/icons-material/GroupsOutlined'
import StarsIcon from '@mui/icons-material/StarsOutlined'
import EmojiEventsIcon from '@mui/icons-material/EmojiEventsOutlined'
import type { SvgIconComponent } from '@mui/icons-material'
import { ruAdmin } from '@/shared/i18n/ru-admin'

export type AdminNavItem = {
  label: string
  path: string
  icon: SvgIconComponent
}

export const adminNavItems: AdminNavItem[] = [
  { label: ruAdmin.nav.dashboard, path: '/admin', icon: DashboardIcon },
  { label: ruAdmin.nav.users, path: '/admin/users', icon: PeopleIcon },
  { label: ruAdmin.nav.roadmap, path: '/admin/roadmap', icon: MapIcon },
  { label: ruAdmin.nav.interviews, path: '/admin/interviews', icon: RecordVoiceOverIcon },
  { label: ruAdmin.nav.meetings, path: '/admin/meetings', icon: GroupsIcon },
  { label: ruAdmin.nav.bonuses, path: '/admin/bonuses', icon: StarsIcon },
  { label: ruAdmin.nav.achievements, path: '/admin/achievements', icon: EmojiEventsIcon },
]
