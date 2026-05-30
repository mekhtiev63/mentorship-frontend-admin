export type MeetingStatus = 'pending' | 'scheduled' | 'completed' | 'cancelled'

export type AdminMeeting = {
  id: string
  studentName: string
  buddyName: string
  slotAt: string
  status: MeetingStatus
}

export type AssignMeetingInput = {
  studentName: string
  buddyName: string
  slotAt: string
}
