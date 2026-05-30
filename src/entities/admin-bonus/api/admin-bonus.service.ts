import type { BonusAdjustInput, BonusOperation } from '@/entities/admin-bonus/model/types'

export interface AdminBonusService {
  listOperations(): Promise<BonusOperation[]>
  credit(input: BonusAdjustInput & { userDisplayName: string }): Promise<BonusOperation>
  debit(input: BonusAdjustInput & { userDisplayName: string }): Promise<BonusOperation>
}

export const adminBonusHttpService: AdminBonusService = {
  async listOperations() {
    throw new Error('HTTP bonus API не подключён')
  },
  async credit() {
    throw new Error('HTTP bonus API не подключён')
  },
  async debit() {
    throw new Error('HTTP bonus API не подключён')
  },
}
