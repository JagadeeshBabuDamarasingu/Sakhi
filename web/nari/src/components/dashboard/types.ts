export interface User {
  id: string
  name: string
  avatarUrl: string | null
  preferredLanguage: string
  city: string
  isFirstTime: boolean
  onboardingCompleted: boolean
  memberSince: string
}

export interface OnboardingStep {
  id: string
  title: string
  description: string
  targetSection: string
  completed: boolean
}

export interface DashboardMetrics {
  earningsThisMonth: number
  earningsLastMonth: number
  pendingOrdersCount: number
  activeCoursesCount: number
  loanStatus: 'active' | 'eligible' | 'not-eligible' | 'pending'
  activeLoanBalance?: number
  totalLoanAmount?: number
  nextRepaymentDate?: string
  nextRepaymentAmount?: number
}

export interface Streak {
  currentDays: number
  longestDays: number
  lastActiveDate: string
  weekActivity: boolean[]
}

export interface Milestone {
  id: string
  title: string
  description: string
  icon: string
  earnedAt: string | null
}

export interface NextGoal {
  title: string
  description: string
  targetSection: string
  targetLabel: string
  progressPercent: number
}

export interface AgentAction {
  id: string
  message: string
  timestamp: string
  type: 'listing' | 'course' | 'financing' | 'assessment'
}

export interface Recommendation {
  id: string
  message: string
  ctaLabel: string
  targetSection: string
  potentialBoost: string | null
}

export interface Announcement {
  id: string
  title: string
  message: string
  type: 'platform' | 'personalized'
  severity: 'info' | 'warning' | 'success'
  expiresAt: string | null
  isRead: boolean
}

export interface DashboardData {
  user: User
  onboardingSteps: OnboardingStep[]
  metrics: DashboardMetrics
  streak: Streak
  milestones: Milestone[]
  nextGoal: NextGoal
  agentActions: AgentAction[]
  recommendations: Recommendation[]
  announcements: Announcement[]
}

export interface DashboardProps {
  user: User
  onboardingSteps: OnboardingStep[]
  metrics: DashboardMetrics
  streak: Streak
  milestones: Milestone[]
  nextGoal: NextGoal
  agentActions: AgentAction[]
  recommendations: Recommendation[]
  announcements: Announcement[]
  onNavigateTo?: (section: string) => void
  onCompleteOnboardingStep?: (stepId: string) => void
  onDismissAnnouncement?: (id: string) => void
  onMarkAnnouncementRead?: (id: string) => void
}
