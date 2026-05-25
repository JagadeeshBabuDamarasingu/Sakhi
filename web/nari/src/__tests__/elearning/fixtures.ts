import type {
  Course,
  Speaker,
  LiveSession,
  UserProgress,
  LearningGoal,
  Badge,
  Certificate,
  CalendarEvent,
  Category,
  UserStats,
} from '@/components/elearning/types'

export const mockCourses: Course[] = [
  {
    id: 'course-001',
    title: 'Digital Marketing for Women Entrepreneurs',
    description: 'Learn to market your products and services online',
    category: 'business',
    duration: 180,
    totalModules: 8,
    format: 'mixed',
    level: 'beginner',
    language: 'hi',
    isMandatory: false,
    isTrending: true,
    thumbnailUrl: '/images/courses/digital-marketing.jpg',
    instructorName: 'Neha Gupta',
    rating: 4.8,
    enrolledCount: 12500,
  },
  {
    id: 'course-002',
    title: 'Cyber Security & Online Safety',
    description: 'Protect yourself from online fraud and scams',
    category: 'cyber-security',
    duration: 90,
    totalModules: 6,
    format: 'interactive',
    level: 'beginner',
    language: 'hi',
    isMandatory: true,
    isTrending: false,
    thumbnailUrl: '/images/courses/cyber-security.jpg',
    instructorName: 'Anjali Verma',
    rating: 4.9,
    enrolledCount: 28340,
  },
  {
    id: 'course-003',
    title: 'Personal Finance Basics',
    description: 'Take control of your money',
    category: 'personal-finance',
    duration: 120,
    totalModules: 8,
    format: 'video',
    level: 'beginner',
    language: 'hi',
    isMandatory: false,
    isTrending: false,
    thumbnailUrl: '/images/courses/finance.jpg',
    instructorName: 'Kavita Joshi',
    rating: 4.5,
    enrolledCount: 6540,
  },
]

export const mockUserProgress: UserProgress[] = [
  {
    id: 'prog-001',
    courseId: 'course-001',
    completedModules: 3,
    percentComplete: 37,
    lastAccessedAt: '2026-05-20T10:00:00Z',
    status: 'in-progress',
    enrolledAt: '2026-05-01T00:00:00Z',
  },
  {
    id: 'prog-002',
    courseId: 'course-002',
    completedModules: 6,
    percentComplete: 100,
    lastAccessedAt: '2026-05-15T10:00:00Z',
    status: 'completed',
    enrolledAt: '2026-05-01T00:00:00Z',
    completedAt: '2026-05-15T10:00:00Z',
  },
]

export const mockSpeakers: Speaker[] = [
  {
    id: 'speaker-001',
    name: 'Vandana Luthra',
    title: 'Founder, VLCC',
    bio: 'Wellness entrepreneur',
    avatarUrl: '/images/speakers/vandana.jpg',
    expertise: ['entrepreneurship'],
  },
]

export const mockLiveSessions: LiveSession[] = [
  {
    id: 'session-001',
    title: 'From Kitchen to Company: My Entrepreneurship Journey',
    description: 'Vandana Luthra shares her story',
    speakerId: 'speaker-001',
    courseId: null,
    type: 'guest-speaker',
    scheduledAt: '2026-06-05T18:00:00+05:30',
    duration: 60,
    registeredCount: 2340,
    maxCapacity: 5000,
    isUpcoming: true,
    thumbnailUrl: '/images/sessions/vandana.jpg',
  },
]

export const mockBadges: Badge[] = [
  {
    id: 'badge-001',
    title: 'Safety Champion',
    description: 'Completed the Cyber Security course',
    iconUrl: '/images/badges/safety.svg',
    earnedAt: '2026-05-15T00:00:00Z',
    courseId: 'course-002',
    shareUrl: '/share/badge/safety-champion',
  },
  {
    id: 'badge-002',
    title: 'First Steps',
    description: 'Enrolled in your first course',
    iconUrl: '/images/badges/first-steps.svg',
    earnedAt: '2026-05-01T00:00:00Z',
    courseId: null,
    shareUrl: '/share/badge/first-steps',
  },
]

export const mockCertificates: Certificate[] = [
  {
    id: 'cert-001',
    title: 'Cyber Security & Online Safety',
    issuedAt: '2026-05-15T00:00:00Z',
    courseId: 'course-002',
    certificateUrl: '/certificates/cert-001.pdf',
    shareUrl: '/share/certificate/cyber-security',
    validUntil: '2027-05-15T00:00:00Z',
  },
]

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: 'event-001',
    title: 'Continue: Digital Marketing',
    type: 'course-reminder',
    courseId: 'course-001',
    sessionId: null,
    scheduledAt: '2026-06-01T10:00:00Z',
    isCompleted: false,
  },
  {
    id: 'event-002',
    title: 'Live: From Kitchen to Company',
    type: 'live-session',
    courseId: null,
    sessionId: 'session-001',
    scheduledAt: '2026-06-05T18:00:00Z',
    isCompleted: false,
  },
]

export const mockCategories: Category[] = [
  { id: 'digital-literacy', label: 'Digital Literacy', icon: 'smartphone' },
  { id: 'business', label: 'Business', icon: 'briefcase' },
  { id: 'communication', label: 'Communication', icon: 'message-circle' },
  { id: 'personal-finance', label: 'Personal Finance', icon: 'wallet' },
  { id: 'cyber-security', label: 'Cyber Security', icon: 'shield' },
  { id: 'entrepreneurship', label: 'Entrepreneurship', icon: 'rocket' },
]

export const mockLearningGoals: LearningGoal[] = [
  {
    id: 'goal-001',
    title: 'Start my own business',
    description: 'Turn my tailoring skills into a business',
    isActive: true,
    createdAt: '2026-05-01T00:00:00Z',
  },
]

export const mockUserStats: UserStats = {
  coursesCompleted: 3,
  coursesInProgress: 2,
  totalLearningMinutes: 245,
  currentStreak: 5,
  longestStreak: 12,
  badgesEarned: 2,
  certificatesEarned: 1,
}
