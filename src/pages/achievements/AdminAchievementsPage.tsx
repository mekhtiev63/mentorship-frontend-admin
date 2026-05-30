import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import {
  useAdminAchievementsList,
  useAdminGrantAchievement,
} from '@/entities/admin-achievement/model/useAdminAchievements'
import { getMockUsersStore } from '@/entities/admin-user/model/mock-store'
import { ruAdmin } from '@/shared/i18n/ru-admin'
import { GlassSurface, PageHeader, QueryWrapper } from '@/shared/ui'

export function AdminAchievementsPage() {
  const list = useAdminAchievementsList()
  const grant = useAdminGrantAchievement()
  const [open, setOpen] = useState(false)
  const [achievementId, setAchievementId] = useState('')
  const [userId, setUserId] = useState('')

  const users = getMockUsersStore().filter((u) => u.role === 'student')

  const submitGrant = () => {
    grant.mutate(
      { achievementId, userId },
      {
        onSuccess: () => {
          setOpen(false)
          setAchievementId('')
          setUserId('')
        },
      },
    )
  }

  return (
    <>
      <PageHeader
        title={ruAdmin.achievements.title}
        subtitle={ruAdmin.achievements.subtitle}
        action={
          <Button variant="contained" onClick={() => setOpen(true)}>
            {ruAdmin.achievements.grant}
          </Button>
        }
      />
      <QueryWrapper
        isLoading={list.isLoading}
        isError={list.isError}
        onRetry={() => list.refetch()}
        isEmpty={!list.data?.length}
        emptyTitle={ruAdmin.achievements.empty}
      >
        <GlassSurface sx={{ overflow: 'auto' }}>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>{ruAdmin.achievements.columns.code}</TableCell>
                  <TableCell>{ruAdmin.achievements.columns.title}</TableCell>
                  <TableCell>{ruAdmin.achievements.columns.description}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.data?.map((a) => (
                  <TableRow key={a.id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        {a.code}
                      </Typography>
                    </TableCell>
                    <TableCell>{a.title}</TableCell>
                    <TableCell>{a.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </GlassSurface>
      </QueryWrapper>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{ruAdmin.achievements.grant}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              select
              label={ruAdmin.achievements.columns.title}
              value={achievementId}
              onChange={(e) => setAchievementId(e.target.value)}
              fullWidth
            >
              {list.data?.map((a) => (
                <MenuItem key={a.id} value={a.id}>
                  {a.title}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label={ruAdmin.achievements.grantToUser}
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              fullWidth
            >
              {users.map((u) => (
                <MenuItem key={u.id} value={u.id}>
                  {u.displayName}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>{ruAdmin.common.cancel}</Button>
          <Button variant="contained" disabled={!achievementId || !userId} onClick={submitGrant}>
            {ruAdmin.common.confirm}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
