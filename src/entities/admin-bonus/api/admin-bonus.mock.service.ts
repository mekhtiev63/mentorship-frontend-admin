import type { AdminBonusService } from '@/entities/admin-bonus/api/admin-bonus.service'
import { applyMockBonus, getMockBonusOperations } from '@/entities/admin-bonus/model/mock-store'
import { mockDelay } from '@/shared/lib/mockDelay'

export const adminBonusMockService: AdminBonusService = {
  async listOperations() {
    await mockDelay()
    return getMockBonusOperations()
  },
  async credit(input) {
    await mockDelay(350)
    return applyMockBonus(input.userId, input.userDisplayName, 'credit', input.amount, input.reason)
  },
  async debit(input) {
    await mockDelay(350)
    return applyMockBonus(input.userId, input.userDisplayName, 'debit', input.amount, input.reason)
  },
}
