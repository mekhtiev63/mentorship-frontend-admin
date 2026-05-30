import { Skeleton, Stack } from '@mui/material'

export function LoadingSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <Stack spacing={1}>
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} variant="rounded" height={48} />
      ))}
    </Stack>
  )
}

export function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <Stack spacing={0.5}>
      <Skeleton variant="rounded" height={40} />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} variant="rounded" height={52} />
      ))}
    </Stack>
  )
}
