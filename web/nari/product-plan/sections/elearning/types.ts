// =============================================================================
// Data Types
// =============================================================================

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

// =============================================================================
// Component Props
// =============================================================================

export interface ELearningProps {
  /** All available courses */
  courses: Course[]
  /** Speakers who host live sessions */
  speakers: Speaker[]
  /** Upcoming and past live sessions */
  liveSessions: LiveSession[]
  /** Current user's progress on enrolled courses */
  userProgress: UserProgress[]
  /** User's learning goals */
  learningGoals: LearningGoal[]
  /** Badges earned by the user */
  badges: Badge[]
  /** Certificates earned by the user */
  certificates: Certificate[]
  /** Calendar events including reminders who deadlines */
  calendarEvents: CalendarEvent[]
  /** Available course categories */
  categories: Category[]
  /** User's learning statistics */
  userStats: UserStats

  // Course actions
  /** Called when user wants to view course details */
  onViewCourse?: (courseId: string) => void
  /** Called when user enrolls in a course */
  onEnrollCourse?: (courseId: string) => void
  /** Called when user wants to continue a course */
  onContinueCourse?: (courseId: string) => void
  /** Called when user completes a course module */
  onCompleteModule?: (courseId: string, moduleIndex: number) => void

  // Live session actions
  /** Called when user views session details */
  onViewSession?: (sessionId: string) => void
  /** Called when user registers for a live session */
  onRegisterSession?: (sessionId: string) => void
  /** Called when user cancels registration for a session */
  onCancelRegistration?: (sessionId: string) => void

  // Goal actions
  /** Called when user creates a new learning goal */
  onCreateGoal?: (goal: Omit<LearningGoal, 'id' | 'createdAt'>) => void
  /** Called when user updates a learning goal */
  onUpdateGoal?: (goalId: string, updates: Partial<LearningGoal>) => void
  /** Called when user deletes a learning goal */
  onDeleteGoal?: (goalId: string) => void

  // Achievement actions
  /** Called when user wants to share a badge */
  onShareBadge?: (badgeId: string) => void
  /** Called when user wants to share a certificate */
  onShareCertificate?: (certificateId: string) => void
  /** Called when user wants to download a certificate */
  onDownloadCertificate?: (certificateId: string) => void

  // Calendar actions
  /** Called when user views a calendar event */
  onViewCalendarEvent?: (eventId: string) => void
  /** Called when user marks a calendar event as complete */
  onCompleteCalendarEvent?: (eventId: string) => void

  // Navigation actions
  /** Called when user wants to explore courses by category */
  onFilterByCategory?: (category: CourseCategory) => void
  /** Called when user searches for courses */
  onSearch?: (query: string) => void
  /** Called when user opens the learning calendar */
  onOpenCalendar?: () => void
}
