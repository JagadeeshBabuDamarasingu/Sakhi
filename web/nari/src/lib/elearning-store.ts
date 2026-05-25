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

// =============================================================================
// Initial Data (seeded from sample-data.json)
// =============================================================================

const initialCourses: Course[] = [
  {
    id: 'course-001',
    title: 'Digital Literacy Fundamentals',
    description: 'Learn to use smartphones, apps, and the internet safely. Perfect for beginners who want to get comfortable with technology.',
    category: 'digital-literacy',
    duration: 180,
    totalModules: 12,
    format: 'video',
    level: 'beginner',
    language: 'hindi',
    isMandatory: false,
    isTrending: true,
    thumbnailUrl: '/images/courses/digital-literacy.jpg',
    instructorName: 'Priya Sharma',
    rating: 4.8,
    enrolledCount: 12450,
  },
  {
    id: 'course-002',
    title: 'Cyber Security & Online Safety',
    description: 'Protect yourself from online fraud, scams, and cyber threats. Learn to recognize fake messages, secure your accounts, and stay safe while using UPI and online banking.',
    category: 'cyber-security',
    duration: 90,
    totalModules: 6,
    format: 'interactive',
    level: 'beginner',
    language: 'hindi',
    isMandatory: true,
    isTrending: false,
    thumbnailUrl: '/images/courses/cyber-security.jpg',
    instructorName: 'Anjali Verma',
    rating: 4.9,
    enrolledCount: 28340,
  },
  {
    id: 'course-003',
    title: 'Starting Your First Business',
    description: 'A step-by-step guide to turning your skills into a business. Learn about pricing, finding customers, managing money, and growing your venture.',
    category: 'business',
    duration: 240,
    totalModules: 16,
    format: 'mixed',
    level: 'beginner',
    language: 'hindi',
    isMandatory: false,
    isTrending: true,
    thumbnailUrl: '/images/courses/first-business.jpg',
    instructorName: 'Meera Patel',
    rating: 4.7,
    enrolledCount: 8920,
  },
  {
    id: 'course-004',
    title: 'WhatsApp for Business',
    description: 'Master WhatsApp Business to connect with customers, showcase products, and manage orders. Includes catalog setup and automated replies.',
    category: 'digital-literacy',
    duration: 60,
    totalModules: 5,
    format: 'video',
    level: 'beginner',
    language: 'hindi',
    isMandatory: false,
    isTrending: true,
    thumbnailUrl: '/images/courses/whatsapp-business.jpg',
    instructorName: 'Sunita Rao',
    rating: 4.6,
    enrolledCount: 15780,
  },
  {
    id: 'course-005',
    title: 'Personal Finance Basics',
    description: 'Take control of your money. Learn budgeting, saving, and smart spending habits that will help you and your family build financial security.',
    category: 'personal-finance',
    duration: 120,
    totalModules: 8,
    format: 'video',
    level: 'beginner',
    language: 'hindi',
    isMandatory: false,
    isTrending: false,
    thumbnailUrl: '/images/courses/personal-finance.jpg',
    instructorName: 'Kavita Joshi',
    rating: 4.5,
    enrolledCount: 6540,
  },
  {
    id: 'course-006',
    title: 'Confident Communication',
    description: 'Build confidence in speaking with customers, negotiating prices, and presenting yourself professionally.',
    category: 'communication',
    duration: 150,
    totalModules: 10,
    format: 'interactive',
    level: 'intermediate',
    language: 'hindi',
    isMandatory: false,
    isTrending: false,
    thumbnailUrl: '/images/courses/communication.jpg',
    instructorName: 'Deepa Nair',
    rating: 4.4,
    enrolledCount: 4230,
  },
  {
    id: 'course-007',
    title: 'Product Photography with Your Phone',
    description: 'Learn to take beautiful photos of your products using just your smartphone. Perfect for selling on the marketplace.',
    category: 'business',
    duration: 45,
    totalModules: 4,
    format: 'video',
    level: 'beginner',
    language: 'hindi',
    isMandatory: false,
    isTrending: true,
    thumbnailUrl: '/images/courses/product-photography.jpg',
    instructorName: 'Lakshmi Iyer',
    rating: 4.8,
    enrolledCount: 9870,
  },
  {
    id: 'course-008',
    title: 'Understanding Loans & Credit',
    description: 'Learn how loans work, what interest rates mean, and how to borrow responsibly.',
    category: 'personal-finance',
    duration: 75,
    totalModules: 5,
    format: 'mixed',
    level: 'intermediate',
    language: 'hindi',
    isMandatory: false,
    isTrending: false,
    thumbnailUrl: '/images/courses/loans-credit.jpg',
    instructorName: 'Rekha Menon',
    rating: 4.3,
    enrolledCount: 3210,
  },
]

const initialSpeakers: Speaker[] = [
  {
    id: 'speaker-001',
    name: 'Vandana Luthra',
    title: 'Founder, VLCC',
    bio: 'Started VLCC from a small clinic in Delhi, now a wellness empire across 330+ locations in 14 countries.',
    avatarUrl: '/images/speakers/vandana-luthra.jpg',
    expertise: ['entrepreneurship', 'business-growth', 'wellness'],
  },
  {
    id: 'speaker-002',
    name: 'Kalpana Saroj',
    title: 'Chairperson, Kamani Tubes',
    bio: 'From a child bride in a small village to leading a ₹100 crore company.',
    avatarUrl: '/images/speakers/kalpana-saroj.jpg',
    expertise: ['resilience', 'manufacturing', 'turnaround'],
  },
  {
    id: 'speaker-003',
    name: 'Falguni Nayar',
    title: 'Founder & CEO, Nykaa',
    bio: 'Left a successful banking career at 50 to start Nykaa.',
    avatarUrl: '/images/speakers/falguni-nayar.jpg',
    expertise: ['e-commerce', 'late-start', 'retail'],
  },
  {
    id: 'speaker-004',
    name: 'Ritu Kumar',
    title: 'Fashion Designer',
    bio: 'Pioneer of the Indian fashion industry who started with hand-block printing.',
    avatarUrl: '/images/speakers/ritu-kumar.jpg',
    expertise: ['fashion', 'crafts', 'branding'],
  },
]

const initialLiveSessions: LiveSession[] = [
  {
    id: 'session-001',
    title: 'From Kitchen to Company: My Entrepreneurship Journey',
    description: 'Vandana Luthra shares how she started VLCC from scratch.',
    speakerId: 'speaker-001',
    courseId: 'course-003',
    type: 'guest-speaker',
    scheduledAt: '2026-02-05T18:00:00+05:30',
    duration: 60,
    registeredCount: 2340,
    maxCapacity: 5000,
    isUpcoming: true,
    thumbnailUrl: '/images/sessions/vandana-talk.jpg',
  },
  {
    id: 'session-002',
    title: 'Overcoming Obstacles: A Story of Courage',
    description: "Kalpana Saroj's incredible journey.",
    speakerId: 'speaker-002',
    courseId: null,
    type: 'guest-speaker',
    scheduledAt: '2026-02-12T17:00:00+05:30',
    duration: 75,
    registeredCount: 1890,
    maxCapacity: 5000,
    isUpcoming: true,
    thumbnailUrl: '/images/sessions/kalpana-talk.jpg',
  },
  {
    id: 'session-003',
    title: 'Selling Online: 3-Day Bootcamp',
    description: 'Intensive bootcamp covering everything from product listing to customer service.',
    speakerId: null,
    courseId: 'course-004',
    type: 'bootcamp',
    scheduledAt: '2026-02-20T10:00:00+05:30',
    duration: 180,
    registeredCount: 450,
    maxCapacity: 500,
    isUpcoming: true,
    thumbnailUrl: '/images/sessions/selling-bootcamp.jpg',
  },
  {
    id: 'session-004',
    title: "It's Never Too Late: Starting at 50",
    description: 'Falguni Nayar discusses her decision to leave banking and start Nykaa at 50.',
    speakerId: 'speaker-003',
    courseId: null,
    type: 'guest-speaker',
    scheduledAt: '2026-03-08T18:30:00+05:30',
    duration: 60,
    registeredCount: 3120,
    maxCapacity: 5000,
    isUpcoming: true,
    thumbnailUrl: '/images/sessions/falguni-talk.jpg',
  },
]

const initialUserProgress: UserProgress[] = [
  {
    id: 'progress-001',
    courseId: 'course-001',
    completedModules: 8,
    percentComplete: 67,
    lastAccessedAt: '2026-01-25T14:30:00+05:30',
    status: 'in-progress',
    enrolledAt: '2026-01-10T09:00:00+05:30',
  },
  {
    id: 'progress-002',
    courseId: 'course-002',
    completedModules: 6,
    percentComplete: 100,
    lastAccessedAt: '2026-01-20T11:45:00+05:30',
    status: 'completed',
    enrolledAt: '2026-01-05T10:00:00+05:30',
    completedAt: '2026-01-20T11:45:00+05:30',
  },
  {
    id: 'progress-003',
    courseId: 'course-003',
    completedModules: 3,
    percentComplete: 19,
    lastAccessedAt: '2026-01-24T16:00:00+05:30',
    status: 'in-progress',
    enrolledAt: '2026-01-15T08:30:00+05:30',
  },
  {
    id: 'progress-004',
    courseId: 'course-007',
    completedModules: 0,
    percentComplete: 0,
    lastAccessedAt: null,
    status: 'enrolled',
    enrolledAt: '2026-01-26T10:00:00+05:30',
  },
]

const initialLearningGoals: LearningGoal[] = [
  {
    id: 'goal-001',
    title: 'Start my own business',
    description: 'I want to turn my tailoring skills into a small business',
    isActive: true,
    createdAt: '2026-01-05T09:00:00+05:30',
  },
  {
    id: 'goal-002',
    title: 'Learn to use technology',
    description: 'I want to be comfortable using smartphones and the internet',
    isActive: true,
    createdAt: '2026-01-05T09:00:00+05:30',
  },
]

const initialBadges: Badge[] = [
  {
    id: 'badge-001',
    title: 'Safety Champion',
    description: 'Completed the Cyber Security & Online Safety course',
    iconUrl: '/images/badges/safety-champion.svg',
    earnedAt: '2026-01-20T11:45:00+05:30',
    courseId: 'course-002',
    shareUrl: '/share/badge/safety-champion-abc123',
  },
  {
    id: 'badge-002',
    title: 'First Steps',
    description: 'Enrolled in your first course',
    iconUrl: '/images/badges/first-steps.svg',
    earnedAt: '2026-01-05T10:00:00+05:30',
    courseId: null,
    shareUrl: '/share/badge/first-steps-def456',
  },
  {
    id: 'badge-003',
    title: 'Goal Setter',
    description: 'Set your first learning goals',
    iconUrl: '/images/badges/goal-setter.svg',
    earnedAt: '2026-01-05T09:15:00+05:30',
    courseId: null,
    shareUrl: '/share/badge/goal-setter-ghi789',
  },
]

const initialCertificates: Certificate[] = [
  {
    id: 'cert-001',
    title: 'Cyber Security & Online Safety',
    issuedAt: '2026-01-20T11:45:00+05:30',
    courseId: 'course-002',
    certificateUrl: '/certificates/cert-001.pdf',
    shareUrl: '/share/certificate/cyber-security-abc123',
    validUntil: '2027-01-20T11:45:00+05:30',
  },
]

const initialCalendarEvents: CalendarEvent[] = [
  {
    id: 'event-001',
    title: 'Continue: Digital Literacy Fundamentals',
    type: 'course-reminder',
    courseId: 'course-001',
    sessionId: null,
    scheduledAt: '2026-01-27T10:00:00+05:30',
    isCompleted: false,
  },
  {
    id: 'event-002',
    title: 'Live: From Kitchen to Company',
    type: 'live-session',
    courseId: null,
    sessionId: 'session-001',
    scheduledAt: '2026-02-05T18:00:00+05:30',
    isCompleted: false,
  },
  {
    id: 'event-003',
    title: 'Bootcamp: Selling Online (Day 1)',
    type: 'bootcamp',
    courseId: null,
    sessionId: 'session-003',
    scheduledAt: '2026-02-20T10:00:00+05:30',
    isCompleted: false,
  },
  {
    id: 'event-004',
    title: 'Deadline: Complete Business Course Module 5',
    type: 'deadline',
    courseId: 'course-003',
    sessionId: null,
    scheduledAt: '2026-01-30T23:59:00+05:30',
    isCompleted: false,
  },
]

const categories: Category[] = [
  { id: 'digital-literacy', label: 'Digital Literacy', icon: 'smartphone' },
  { id: 'business', label: 'Business', icon: 'briefcase' },
  { id: 'communication', label: 'Communication', icon: 'message-circle' },
  { id: 'personal-finance', label: 'Personal Finance', icon: 'wallet' },
  { id: 'cyber-security', label: 'Cyber Security', icon: 'shield' },
  { id: 'entrepreneurship', label: 'Entrepreneurship', icon: 'rocket' },
]

const initialUserStats: UserStats = {
  coursesCompleted: 1,
  coursesInProgress: 3,
  totalLearningMinutes: 245,
  currentStreak: 5,
  longestStreak: 12,
  badgesEarned: 3,
  certificatesEarned: 1,
}

// =============================================================================
// Module-level mutable store (resets on server restart — prototype only)
// =============================================================================

interface ELearningStore {
  courses: Course[]
  speakers: Speaker[]
  liveSessions: LiveSession[]
  userProgress: UserProgress[]
  learningGoals: LearningGoal[]
  badges: Badge[]
  certificates: Certificate[]
  calendarEvents: CalendarEvent[]
  categories: Category[]
  userStats: UserStats
}

let store: ELearningStore = {
  courses: structuredClone(initialCourses),
  speakers: structuredClone(initialSpeakers),
  liveSessions: structuredClone(initialLiveSessions),
  userProgress: structuredClone(initialUserProgress),
  learningGoals: structuredClone(initialLearningGoals),
  badges: structuredClone(initialBadges),
  certificates: structuredClone(initialCertificates),
  calendarEvents: structuredClone(initialCalendarEvents),
  categories,
  userStats: structuredClone(initialUserStats),
}

// =============================================================================
// Read operations
// =============================================================================

export function getELearningData(): ELearningStore {
  return structuredClone(store)
}

export function getCourses(params?: { category?: string; search?: string }): Course[] {
  let courses = structuredClone(store.courses)
  if (params?.category) {
    courses = courses.filter((c) => c.category === params.category)
  }
  if (params?.search) {
    const q = params.search.toLowerCase()
    courses = courses.filter(
      (c) => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    )
  }
  return courses
}

export function getCourseById(id: string): Course | null {
  return structuredClone(store.courses.find((c) => c.id === id) ?? null)
}

export function getLiveSessions(): LiveSession[] {
  return structuredClone(store.liveSessions)
}

export function getUserStats(): UserStats {
  return structuredClone(store.userStats)
}

export function getBadges(): Badge[] {
  return structuredClone(store.badges)
}

export function getCertificates(): Certificate[] {
  return structuredClone(store.certificates)
}

export function getCalendarEvents(): CalendarEvent[] {
  return structuredClone(store.calendarEvents)
}

// =============================================================================
// Write operations
// =============================================================================

export function enrollInCourse(courseId: string): UserProgress | null {
  if (!store.courses.find((c) => c.id === courseId)) return null
  if (store.userProgress.find((p) => p.courseId === courseId)) return null

  const newProgress: UserProgress = {
    id: `progress-${Date.now()}`,
    courseId,
    completedModules: 0,
    percentComplete: 0,
    lastAccessedAt: null,
    status: 'enrolled',
    enrolledAt: new Date().toISOString(),
  }

  store.userProgress.push(newProgress)
  store.userStats.coursesInProgress += 1

  // Award First Steps badge if first enrollment
  if (store.userProgress.length === 1) {
    store.badges.push({
      id: `badge-${Date.now()}`,
      title: 'First Steps',
      description: 'Enrolled in your first course',
      iconUrl: '/images/badges/first-steps.svg',
      earnedAt: new Date().toISOString(),
      courseId: null,
      shareUrl: `/share/badge/first-steps-${Date.now()}`,
    })
  }

  return structuredClone(newProgress)
}

export function updateCourseProgress(
  courseId: string,
  completedModules: number
): UserProgress | null {
  const progress = store.userProgress.find((p) => p.courseId === courseId)
  if (!progress) return null

  const course = store.courses.find((c) => c.id === courseId)
  if (!course) return null

  const wasCompleted = progress.status === 'completed'
  progress.completedModules = completedModules
  progress.percentComplete = Math.round((completedModules / course.totalModules) * 100)
  progress.lastAccessedAt = new Date().toISOString()

  if (completedModules >= course.totalModules && !wasCompleted) {
    progress.status = 'completed'
    progress.completedAt = new Date().toISOString()
    store.userStats.coursesCompleted += 1
    store.userStats.coursesInProgress = Math.max(0, store.userStats.coursesInProgress - 1)

    // Award course completion certificate
    store.certificates.push({
      id: `cert-${Date.now()}`,
      title: course.title,
      issuedAt: new Date().toISOString(),
      courseId,
      certificateUrl: `/certificates/cert-${Date.now()}.pdf`,
      shareUrl: `/share/certificate/${courseId}-${Date.now()}`,
      validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    })
    store.userStats.certificatesEarned += 1
  } else if (progress.status === 'enrolled' && completedModules > 0) {
    progress.status = 'in-progress'
  }

  return structuredClone(progress)
}

export function registerForSession(sessionId: string): { registered: boolean; session: LiveSession | null } {
  const session = store.liveSessions.find((s) => s.id === sessionId)
  if (!session || !session.isUpcoming) return { registered: false, session: null }
  if (session.registeredCount >= session.maxCapacity) return { registered: false, session: null }

  session.registeredCount += 1

  // Add calendar event
  store.calendarEvents.push({
    id: `event-${Date.now()}`,
    title: `Live: ${session.title}`,
    type: session.type === 'bootcamp' ? 'bootcamp' : 'live-session',
    courseId: session.courseId,
    sessionId,
    scheduledAt: session.scheduledAt,
    isCompleted: false,
  })

  return { registered: true, session: structuredClone(session) }
}

export function createLearningGoal(
  goal: Omit<LearningGoal, 'id' | 'createdAt'>
): LearningGoal {
  const newGoal: LearningGoal = {
    ...goal,
    id: `goal-${Date.now()}`,
    createdAt: new Date().toISOString(),
  }
  store.learningGoals.push(newGoal)
  return structuredClone(newGoal)
}
