import {
  Chip,
  IconButton,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined'
import { useMemo, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  useAdminUsersList,
} from '@/entities/admin-user/model/useAdminUsers'
import type { UserRole, UserStatus } from '@/entities/admin-user/model/types'
import { ruAdmin } from '@/shared/i18n/ru-admin'
import { formatDate } from '@/shared/lib/formatDate'
import { GlassSurface, PageHeader, QueryWrapper } from '@/shared/ui'

export function AdminUsersPage() {
  const [search, setSearch] = useState('')
  const [role, setRole] = useState<UserRole | 'all'>('all')
  const [status, setStatus] = useState<UserStatus | 'all'>('all')

  const filter = useMemo(
    () => ({ search, role, status }),
    [search, role, status],
  )

  const { data, isLoading, isError, refetch } = useAdminUsersList(filter)

  return (
    <>
      <PageHeader title={ruAdmin.users.title} subtitle={ruAdmin.users.subtitle} />
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 2 }}>
        <TextField
          label={ruAdmin.common.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          size="small"
        />
        <TextField
          select
          label={ruAdmin.users.filterRole}
          value={role}
          onChange={(e) => setRole(e.target.value as UserRole | 'all')}
          size="small"
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="all">{ruAdmin.common.all}</MenuItem>
          <MenuItem value="student">{ruAdmin.users.roles.student}</MenuItem>
          <MenuItem value="buddy">{ruAdmin.users.roles.buddy}</MenuItem>
          <MenuItem value="admin">{ruAdmin.users.roles.admin}</MenuItem>
        </TextField>
        <TextField
          select
          label={ruAdmin.users.filterStatus}
          value={status}
          onChange={(e) => setStatus(e.target.value as UserStatus | 'all')}
          size="small"
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="all">{ruAdmin.common.all}</MenuItem>
          <MenuItem value="active">{ruAdmin.common.active}</MenuItem>
          <MenuItem value="blocked">{ruAdmin.common.blocked}</MenuItem>
        </TextField>
      </Stack>
      <QueryWrapper
        isLoading={isLoading}
        isError={isError}
        onRetry={() => refetch()}
        isEmpty={!data?.items.length}
        emptyTitle={ruAdmin.users.empty}
      >
        <GlassSurface sx={{ overflow: 'auto' }}>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>{ruAdmin.users.columns.name}</TableCell>
                  <TableCell>{ruAdmin.users.columns.email}</TableCell>
                  <TableCell>{ruAdmin.users.columns.role}</TableCell>
                  <TableCell>{ruAdmin.users.columns.status}</TableCell>
                  <TableCell>{ruAdmin.users.columns.registered}</TableCell>
                  <TableCell align="right">{ruAdmin.common.actions}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.items.map((u) => (
                  <TableRow key={u.id} hover>
                    <TableCell>{u.displayName}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{ruAdmin.users.roles[u.role]}</TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={u.status === 'blocked' ? ruAdmin.common.blocked : ruAdmin.common.active}
                        color={u.status === 'blocked' ? 'error' : 'success'}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>{formatDate(u.registeredAt)}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={RouterLink}
                        to={`/admin/users/${u.id}`}
                        aria-label={ruAdmin.users.viewProfile}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </GlassSurface>
      </QueryWrapper>
    </>
  )
}
