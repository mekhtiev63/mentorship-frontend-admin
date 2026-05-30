import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ruAdmin } from '@/shared/i18n/ru-admin'
import { useSessionStore } from '@/shared/store/session-store'
import { GlassSurface, NeonBackground } from '@/shared/ui'

export function LoginPage() {
  const [email, setEmail] = useState('admin@go-mentorship.local')
  const [password, setPassword] = useState('')
  const setSession = useSessionStore((s) => s.setSession)
  const navigate = useNavigate()

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setSession({
      email: email.trim() || 'admin@local',
      displayName: 'Администратор',
    })
    navigate('/admin')
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        position: 'relative',
      }}
    >
      <NeonBackground />
      <Box component={motion.div} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} sx={{ width: '100%', maxWidth: 420, zIndex: 1 }}>
        <GlassSurface sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            {ruAdmin.login.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {ruAdmin.login.hint}
          </Typography>
          <Box component="form" onSubmit={submit}>
            <Stack spacing={2}>
              <TextField
                label={ruAdmin.login.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                autoComplete="username"
              />
              <TextField
                label={ruAdmin.login.password}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                autoComplete="current-password"
              />
              <Button type="submit" variant="contained" size="large">
                {ruAdmin.login.submit}
              </Button>
            </Stack>
          </Box>
        </GlassSurface>
      </Box>
    </Box>
  )
}
