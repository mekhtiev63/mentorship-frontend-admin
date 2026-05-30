export type BonusOperationType = 'credit' | 'debit'

export type BonusOperation = {
  id: string
  userId: string
  userDisplayName: string
  type: BonusOperationType
  amount: number
  balanceAfter: number
  reason: string
  createdAt: string
}

export type BonusAdjustInput = {
  userId: string
  amount: number
  reason: string
}
