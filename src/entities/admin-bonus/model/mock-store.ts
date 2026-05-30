import type { BonusOperation } from '@/entities/admin-bonus/model/types'

const balances: Record<string, number> = {
  u1: 120,
  u4: 45,
}

let operations: BonusOperation[] = [
  {
    id: 'bo1',
    userId: 'u1',
    userDisplayName: 'Анна Смирнова',
    type: 'credit',
    amount: 50,
    balanceAfter: 120,
    reason: 'Завершение блока',
    createdAt: '2026-05-01T12:00:00Z',
  },
  {
    id: 'bo2',
    userId: 'u4',
    userDisplayName: 'Мария Волкова',
    type: 'credit',
    amount: 45,
    balanceAfter: 45,
    reason: 'Mock-собеседование',
    createdAt: '2026-05-20T09:30:00Z',
  },
]

export function getMockBonusOperations() {
  return [...operations].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
}

export function getMockUserBalance(userId: string) {
  return balances[userId] ?? 0
}

export function applyMockBonus(userId: string, displayName: string, type: 'credit' | 'debit', amount: number, reason: string) {
  const current = getMockUserBalance(userId)
  const delta = type === 'credit' ? amount : -amount
  const balanceAfter = current + delta
  if (balanceAfter < 0) throw new Error('Недостаточно бонусов')
  balances[userId] = balanceAfter
  const op: BonusOperation = {
    id: `bo${Date.now()}`,
    userId,
    userDisplayName: displayName,
    type,
    amount,
    balanceAfter,
    reason,
    createdAt: new Date().toISOString(),
  }
  operations = [op, ...operations]
  return op
}
