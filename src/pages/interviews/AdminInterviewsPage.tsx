import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import EditIcon from '@mui/icons-material/EditOutlined'
import { useState } from 'react'
import {
  useAdminInterviewMutations,
  useAdminInterviewsList,
} from '@/entities/admin-interview/model/useAdminInterviews'
import type { AdminInterviewInput, InterviewType } from '@/entities/admin-interview/model/types'
import { ruAdmin } from '@/shared/i18n/ru-admin'
import { formatDateTime } from '@/shared/lib/formatDate'
import { GlassSurface, PageHeader, QueryWrapper } from '@/shared/ui'

const emptyForm = (): AdminInterviewInput => ({
  title: '',
  type: 'mock',
  scheduledAt: new Date().toISOString().slice(0, 16),
  capacity: 8,
})

export function AdminInterviewsPage() {
  const list = useAdminInterviewsList()
  const { create, update, remove } = useAdminInterviewMutations()
  const [open, setOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState<AdminInterviewInput>(emptyForm)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const openCreate = () => {
    setEditId(null)
    setForm(emptyForm())
    setOpen(true)
  }

  const openEdit = (row: AdminInterviewInput & { id: string }) => {
    setEditId(row.id)
    setForm({
      title: row.title,
      type: row.type,
      scheduledAt: row.scheduledAt.slice(0, 16),
      capacity: row.capacity,
    })
    setOpen(true)
  }

  const save = () => {
    const payload = {
      ...form,
      scheduledAt: new Date(form.scheduledAt).toISOString(),
    }
    if (editId) {
      update.mutate({ id: editId, input: payload }, { onSuccess: () => setOpen(false) })
    } else {
      create.mutate(payload, { onSuccess: () => setOpen(false) })
    }
  }

  return (
    <>
      <PageHeader
        title={ruAdmin.interviews.title}
        subtitle={ruAdmin.interviews.subtitle}
        action={
          <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
            {ruAdmin.interviews.create}
          </Button>
        }
      />
      <QueryWrapper
        isLoading={list.isLoading}
        isError={list.isError}
        onRetry={() => list.refetch()}
        isEmpty={!list.data?.length}
        emptyTitle={ruAdmin.interviews.empty}
      >
        <GlassSurface sx={{ overflow: 'auto' }}>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>{ruAdmin.interviews.columns.title}</TableCell>
                  <TableCell>{ruAdmin.interviews.columns.type}</TableCell>
                  <TableCell>{ruAdmin.interviews.columns.date}</TableCell>
                  <TableCell>{ruAdmin.interviews.columns.capacity}</TableCell>
                  <TableCell align="right">{ruAdmin.common.actions}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.data?.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{ruAdmin.interviews.types[row.type]}</TableCell>
                    <TableCell>{formatDateTime(row.scheduledAt)}</TableCell>
                    <TableCell>
                      {row.enrolled}/{row.capacity}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => openEdit(row)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={() => setDeleteId(row.id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </GlassSurface>
      </QueryWrapper>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editId ? ruAdmin.interviews.edit : ruAdmin.interviews.create}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label={ruAdmin.interviews.columns.title}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              fullWidth
            />
            <TextField
              select
              label={ruAdmin.interviews.columns.type}
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as InterviewType })}
              fullWidth
            >
              <MenuItem value="mock">{ruAdmin.interviews.types.mock}</MenuItem>
              <MenuItem value="real">{ruAdmin.interviews.types.real}</MenuItem>
            </TextField>
            <TextField
              label={ruAdmin.interviews.columns.date}
              type="datetime-local"
              value={form.scheduledAt}
              onChange={(e) => setForm({ ...form, scheduledAt: e.target.value })}
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              label={ruAdmin.interviews.columns.capacity}
              type="number"
              value={form.capacity}
              onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>{ruAdmin.common.cancel}</Button>
          <Button variant="contained" onClick={save} disabled={!form.title.trim()}>
            {ruAdmin.common.save}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={Boolean(deleteId)} onClose={() => setDeleteId(null)}>
        <DialogTitle>{ruAdmin.interviews.deleteConfirm}</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>{ruAdmin.common.cancel}</Button>
          <Button
            color="error"
            variant="contained"
            onClick={() =>
              deleteId &&
              remove.mutate(deleteId, { onSuccess: () => setDeleteId(null) })
            }
          >
            {ruAdmin.common.delete}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
