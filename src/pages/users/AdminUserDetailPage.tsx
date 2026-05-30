import {
  Button,
  Chip,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useParams, Link as RouterLink } from 'react-router-dom'
import {
  useAdminUserDetail,
  useAdminUserSetBlocked,
  useAdminUserUpdateRole,
} from '@/entities/admin-user/model/useAdminUsers'
import type { UserRole } from '@/entities/admin-user/model/types'
import { ruAdmin } from '@/shared/i18n/ru-admin'
import { formatDate } from '@/shared/lib/formatDate'
import { GlassSurface, PageHeader, QueryWrapper } from '@/shared/ui'
import { useState } from 'react'

export function AdminUserDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: user, isLoading, isError, refetch } = useAdminUserDetail(id)
  const updateRole = useAdminUserUpdateRole()
  const setBlocked = useAdminUserSetBlocked()
  const [role, setRole] = useState<UserRole | ''>('')

  const effectiveRole = role || user?.role

  return (
    <>
      <PageHeader
        title={ruAdmin.users.profileTitle}
        action={
          <Button component={RouterLink} to="/admin/users" startIcon={<ArrowBackIcon />}>
            {ruAdmin.common.back}
          </Button>
        }
      />
      <QueryWrapper isLoading={isLoading} isError={isError} onRetry={() => refetch()} isEmpty={!user}>
        {user ? (
          <GlassSurface sx={{ p: 3, maxWidth: 560 }}>
            <Typography variant="h5" gutterBottom>
              {user.displayName}
            </Typography>
            <Typography color="text.secondary">{user.email}</Typography>
            {user.bio ? (
              <Typography sx={{ mt: 2 }} variant="body2">
                {user.bio}
              </Typography>
            ) : null}
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <Chip label={ruAdmin.users.roles[user.role]} />
              <Chip
                label={user.status === 'blocked' ? ruAdmin.common.blocked : ruAdmin.common.active}
                color={user.status === 'blocked' ? 'error' : 'success'}
              />
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              {ruAdmin.users.columns.registered}: {formatDate(user.registeredAt)}
            </Typography>
            <Stack spacing={2} sx={{ mt: 3 }}>
              <TextField
                select
                label={ruAdmin.users.changeRole}
                value={effectiveRole}
                onChange={(e) => setRole(e.target.value as UserRole)}
                size="small"
              >
                <MenuItem value="student">{ruAdmin.users.roles.student}</MenuItem>
                <MenuItem value="buddy">{ruAdmin.users.roles.buddy}</MenuItem>
                <MenuItem value="admin">{ruAdmin.users.roles.admin}</MenuItem>
              </TextField>
              <Button
                variant="contained"
                disabled={updateRole.isPending || effectiveRole === user.role}
                onClick={() => updateRole.mutate({ id: user.id, role: effectiveRole as UserRole })}
              >
                {ruAdmin.common.save}
              </Button>
              <Button
                variant="outlined"
                color={user.status === 'blocked' ? 'success' : 'error'}
                disabled={setBlocked.isPending}
                onClick={() =>
                  setBlocked.mutate({ id: user.id, blocked: user.status !== 'blocked' })
                }
              >
                {user.status === 'blocked' ? ruAdmin.users.unblock : ruAdmin.users.block}
              </Button>
            </Stack>
          </GlassSurface>
        ) : null}
      </QueryWrapper>
    </>
  )
}
