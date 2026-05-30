import type { AdminInterview, AdminInterviewInput } from '@/entities/admin-interview/model/types'

export interface AdminInterviewsService {
  list(): Promise<AdminInterview[]>
  create(input: AdminInterviewInput): Promise<AdminInterview>
  update(id: string, input: AdminInterviewInput): Promise<AdminInterview>
  remove(id: string): Promise<void>
}

export const adminInterviewsHttpService: AdminInterviewsService = {
  async list() {
    throw new Error('HTTP interviews API не подключён')
  },
  async create() {
    throw new Error('HTTP interviews API не подключён')
  },
  async update() {
    throw new Error('HTTP interviews API не подключён')
  },
  async remove() {
    throw new Error('HTTP interviews API не подключён')
  },
}
