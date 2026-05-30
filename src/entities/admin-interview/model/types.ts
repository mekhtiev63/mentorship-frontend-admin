export type InterviewType = 'mock' | 'real'

export type AdminInterview = {
  id: string
  title: string
  type: InterviewType
  scheduledAt: string
  capacity: number
  enrolled: number
}

export type AdminInterviewInput = Omit<AdminInterview, 'id' | 'enrolled'>
