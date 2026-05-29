// eLearning domain — shared data models
// Source of truth: proto/elearning/v1/elearning.proto

export type CourseCategory =
  | 'digital-literacy'
  | 'business'
  | 'communication'
  | 'personal-finance'
  | 'cyber-security'
  | 'entrepreneurship'

export type CourseFormat = 'video' | 'interactive' | 'mixed'

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced'

export type ProgressStatus = 'enrolled' | 'in-progress' | 'completed'

export type SessionType = 'guest-speaker' | 'bootcamp' | 'workshop'

export type CalendarEventType =
  | 'course-reminder'
  | 'live-session'
  | 'bootcamp'
  | 'deadline'
  | 'mandatory-reminder'

export interface Course {
  id: string
  title: string
  description: string
  category: CourseCategory
  duration: number
  totalModules: number
  format: CourseFormat
  level: CourseLevel
  language: string
  isMandatory: boolean
  isTrending: boolean
  thumbnailUrl: string
  instructorName: string
  rating: number
  enrolledCount: number
}

export interface Speaker {
  id: string
  name: string
  title: string
  bio: string
  avatarUrl: string
  expertise: string[]
}

export interface LiveSession {
  id: string
  title: string
  description: string
  speakerId: string | null
  courseId: string | null
  type: SessionType
  scheduledAt: string
  duration: number
  registeredCount: number
  maxCapacity: number
  isUpcoming: boolean
  thumbnailUrl: string
}

export interface UserProgress {
  id: string
  courseId: string
  completedModules: number
  percentComplete: number
  lastAccessedAt: string | null
  status: ProgressStatus
  enrolledAt: string
  completedAt?: string
}

export interface LearningGoal {
  id: string
  title: string
  description: string
  isActive: boolean
  createdAt: string
}

export interface Badge {
  id: string
  title: string
  description: string
  iconUrl: string
  earnedAt: string
  courseId: string | null
  shareUrl: string
}

export interface Certificate {
  id: string
  title: string
  issuedAt: string
  courseId: string
  certificateUrl: string
  shareUrl: string
  validUntil: string
}

export interface CalendarEvent {
  id: string
  title: string
  type: CalendarEventType
  courseId: string | null
  sessionId: string | null
  scheduledAt: string
  isCompleted: boolean
}

export interface Category {
  id: CourseCategory
  label: string
  icon: string
}

export interface UserStats {
  coursesCompleted: number
  coursesInProgress: number
  totalLearningMinutes: number
  currentStreak: number
  longestStreak: number
  badgesEarned: number
  certificatesEarned: number
}

export interface SessionWithSpeaker extends LiveSession {
  speaker: Speaker | null
}
