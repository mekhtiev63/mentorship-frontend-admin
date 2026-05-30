import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import { useState } from 'react'
import { useAdminBonusHistory, useAdminBonusMutations } from '@/entities/admin-bonus/model/useAdminBonus'
import { getMockUsersStore } from '@/entities/admin-user/model/mock-store'
import { ruAdmin } from '@/shared/i18n/ru-admin'
import { formatDateTime } from '@/shared/lib/formatDate'
import { GlassSurface, PageHeader, QueryWrapper } from '@/shared/ui'

export function AdminBonusesPage() {
  const history = useAdminBonusHistory()
  const { credit, debit } = useAdminBonusMutations()
  const [tab, setTab] = useState(0)
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<'credit' | 'debit'>('credit')
  const [userId, setUserId] = useState('')
  const [amount, setAmount] = useState(10)
  const [reason, setReason] = useState('')

  const users = getMockUsersStore().filter((u) => u.role !== 'admin')

  const openDialog = (m: 'credit' | 'debit') => {
    setMode(m)
    setOpen(true)
  }

  const submit = () => {
    const user = users.find((u) => u.id === userId)
    if (!user) return
    const payload = { userId, userDisplayName: user.displayName, amount, reason }
    const mutation = mode === 'credit' ? credit : debit
    mutation.mutate(payload, { onSuccess: () => setOpen(false) })
  }

  return (
    <>
      <PageHeader title={ruAdmin.bonuses.title} subtitle={ruAdmin.bonuses.subtitle} />
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
        <Button variant="contained" onClick={() => openDialog('credit')}>
          {ruAdmin.bonuses.credit}
        </Button>
        <Button variant="outlined" onClick={() => openDialog('debit')}>
          {ruAdmin.bonuses.debit}
        </Button>
      </Stack>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label={ruAdmin.bonuses.history} />
      </Tabs>
      {tab === 0 ? (
        <QueryWrapper
          isLoading={history.isLoading}
          isError={history.isError}
          onRetry={() => history.refetch()}
          isEmpty={!history.data?.length}
          emptyTitle={ruAdmin.bonuses.empty}
        >
          <GlassSurface sx={{ overflow: 'auto' }}>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>{ruAdmin.bonuses.columns.date}</TableCell>
                    <TableCell>{ruAdmin.bonuses.user}</TableCell>
                    <TableCell>{ruAdmin.bonuses.columns.type}</TableCell>
                    <TableCell>{ruAdmin.bonuses.columns.amount}</TableCell>
                    <TableCell>{ruAdmin.bonuses.columns.balance}</TableCell>
                    <TableCell>{ruAdmin.bonuses.columns.reason}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {history.data?.map((op) => (
                    <TableRow key={op.id}>
                      <TableCell>{formatDateTime(op.createdAt)}</TableCell>
                      <TableCell>{op.userDisplayName}</TableCell>
                      <TableCell>
                        {op.type === 'credit' ? ruAdmin.bonuses.opCredit : ruAdmin.bonuses.opDebit}
                      </TableCell>
                      <TableCell>{op.amount}</TableCell>
                      <TableCell>{op.balanceAfter}</TableCell>
                      <TableCell>{op.reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </GlassSurface>
        </QueryWrapper>
      ) : null}

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{mode === 'credit' ? ruAdmin.bonuses.credit : ruAdmin.bonuses.debit}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              select
              label={ruAdmin.bonuses.user}
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
            <TextField
              label={ruAdmin.bonuses.amount}
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              fullWidth
            />
            <TextField
              label={ruAdmin.bonuses.reason}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              fullWidth
              multiline
              minRows={2}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>{ruAdmin.common.cancel}</Button>
          <Button variant="contained" disabled={!userId || !reason} onClick={submit}>
            {ruAdmin.common.confirm}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
