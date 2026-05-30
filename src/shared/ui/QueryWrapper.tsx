import { Box } from '@mui/material'
import type { ReactNode } from 'react'
import { EmptyState } from '@/shared/ui/EmptyState'
import { LoadErrorState } from '@/shared/ui/LoadErrorState'
import { TableSkeleton } from '@/shared/ui/LoadingSkeleton'
import { ruAdmin } from '@/shared/i18n/ru-admin'

type QueryWrapperProps = {
  isLoading: boolean
  isError: boolean
  errorMessage?: string
  isEmpty?: boolean
  emptyTitle?: string
  onRetry?: () => void
  children: ReactNode
}

export function QueryWrapper({
  isLoading,
  isError,
  errorMessage,
  isEmpty,
  emptyTitle = ruAdmin.errors.noData,
  onRetry,
  children,
}: QueryWrapperProps) {
  if (isLoading) return <TableSkeleton />
  if (isError) {
    return <LoadErrorState message={errorMessage ?? ruAdmin.errors.failedToLoad} onRetry={onRetry} />
  }
  if (isEmpty) return <EmptyState title={emptyTitle} />
  return <Box>{children}</Box>
}
