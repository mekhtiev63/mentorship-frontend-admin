import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import {
  useAdminMeetingMutations,
  useAdminMeetingsList,
} from '@/entities/admin-meeting/model/useAdminMeetings'
import { ruAdmin } from '@/shared/i18n/ru-admin'
import { formatDateTime } from '@/shared/lib/formatDate'
import { GlassSurface, PageHeader, QueryWrapper } from '@/shared/ui'
import { useState } from 'react'

export function AdminMeetingsPage() {
  const list = useAdminMeetingsList()
  const { assign, cancel } = useAdminMeetingMutations()
  const [open, setOpen] = useState(false)
  const [studentName, setStudentName] = useState('')
  const [buddyName, setBuddyName] = useState('')
  const [slotAt, setSlotAt] = useState('')

  const submitAssign = () => {
    assign.mutate(
      {
        studentName,
        buddyName,
        slotAt: new Date(slotAt).toISOString(),
      },
      {
        onSuccess: () => {
          setOpen(false)
          setStudentName('')
          setBuddyName('')
          setSlotAt('')
        },
      },
    )
  }

  return (
    <>
      <PageHeader
        title={ruAdmin.meetings.title}
        subtitle={ruAdmin.meetings.subtitle}
        action={
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
            {ruAdmin.meetings.assign}
          </Button>
        }
      />
      <QueryWrapper
        isLoading={list.isLoading}
        isError={list.isError}
        onRetry={() => list.refetch()}
        isEmpty={!list.data?.length}
        emptyTitle={ruAdmin.meetings.empty}
      >
        <GlassSurface sx={{ overflow: 'auto' }}>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>{ruAdmin.meetings.columns.student}</TableCell>
                  <TableCell>{ruAdmin.meetings.columns.buddy}</TableCell>
                  <TableCell>{ruAdmin.meetings.columns.slot}</TableCell>
                  <TableCell>{ruAdmin.meetings.columns.status}</TableCell>
                  <TableCell align="right">{ruAdmin.common.actions}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.data?.map((m) => (
                  <TableRow key={m.id} hover>
                    <TableCell>{m.studentName}</TableCell>
                    <TableCell>{m.buddyName}</TableCell>
                    <TableCell>{formatDateTime(m.slotAt)}</TableCell>
                    <TableCell>
                      <Chip size="small" label={ruAdmin.meetings.statuses[m.status]} />
                    </TableCell>
                    <TableCell align="right">
                      {m.status !== 'cancelled' && m.status !== 'completed' ? (
                        <Button size="small" color="warning" onClick={() => cancel.mutate(m.id)}>
                          {ruAdmin.meetings.cancel}
                        </Button>
                      ) : null}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </GlassSurface>
      </QueryWrapper>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{ruAdmin.meetings.assign}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label={ruAdmin.meetings.columns.student}
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              fullWidth
            />
            <TextField
              label={ruAdmin.meetings.columns.buddy}
              value={buddyName}
              onChange={(e) => setBuddyName(e.target.value)}
              fullWidth
            />
            <TextField
              label={ruAdmin.meetings.columns.slot}
              type="datetime-local"
              value={slotAt}
              onChange={(e) => setSlotAt(e.target.value)}
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>{ruAdmin.common.cancel}</Button>
          <Button
            variant="contained"
            disabled={!studentName || !buddyName || !slotAt}
            onClick={submitAssign}
          >
            {ruAdmin.common.confirm}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
