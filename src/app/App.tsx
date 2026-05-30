import { RouterProvider } from 'react-router-dom'
import { AppThemeProvider } from '@/app/providers/ThemeProvider'
import { QueryProvider } from '@/app/providers/QueryProvider'
import { router } from '@/app/routes/router'

export function App() {
  return (
    <QueryProvider>
      <AppThemeProvider>
        <RouterProvider router={router} />
      </AppThemeProvider>
    </QueryProvider>
  )
}
