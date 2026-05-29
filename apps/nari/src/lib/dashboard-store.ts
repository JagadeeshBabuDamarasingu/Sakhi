import type {
  DashboardData,
  OnboardingStep,
  Announcement,
} from '@/components/dashboard/types'

const initialData: DashboardData = {
  user: {
    id: 'user-001',
    name: 'Priya Sharma',
    avatarUrl: null,
    preferredLanguage: 'hi',
    city: 'Jaipur',
    isFirstTime: false,
    onboardingCompleted: true,
    memberSince: '2025-11-10',
  },
  onboardingSteps: [
    {
      id: 'step-skill-discovery',
      title: 'Discover your skills',
      description: 'Complete an AI-powered skill assessment to find out what you can offer.',
      targetSection: 'skills',
      completed: true,
    },
    {
      id: 'step-first-listing',
      title: 'Create your first listing',
      description: 'Add a product or service to the marketplace and start selling.',
      targetSection: 'marketplace',
      completed: true,
    },
    {
      id: 'step-financing',
      title: 'Explore financing options',
      description: 'Check your loan eligibility and apply for your first micro-loan.',
      targetSection: 'finance',
      completed: false,
    },
  ],
  metrics: {
    earningsThisMonth: 12450,
    earningsLastMonth: 9820,
    pendingOrdersCount: 3,
    activeCoursesCount: 2,
    loanStatus: 'active',
    activeLoanBalance: 18500,
    totalLoanAmount: 25000,
    nextRepaymentDate: '2026-06-05',
    nextRepaymentAmount: 3200,
  },
  streak: {
    currentDays: 7,
    longestDays: 14,
    lastActiveDate: '2026-05-23',
    weekActivity: [true, true, false, true, true, true, true],
  },
  milestones: [
    {
      id: 'milestone-first-sale',
      title: 'First Sale!',
      description: 'You made your very first sale on the marketplace.',
      icon: '🛍️',
      earnedAt: '2026-01-15',
    },
    {
      id: 'milestone-first-course',
      title: 'Course Graduate',
      description: 'You completed your first full course on the platform.',
      icon: '🎓',
      earnedAt: '2025-12-20',
    },
    {
      id: 'milestone-earnings-1k',
      title: '₹1,000 Earned',
      description: 'You crossed your first ₹1,000 in total earnings.',
      icon: '💰',
      earnedAt: '2026-01-28',
    },
    {
      id: 'milestone-streak-7',
      title: '7-Day Streak',
      description: 'You stayed active for 7 days in a row. Keep going!',
      icon: '🔥',
      earnedAt: '2026-05-23',
    },
    {
      id: 'milestone-earnings-10k',
      title: '₹10,000 Earned',
      description: "You've earned over ₹10,000 on this platform — amazing!",
      icon: '🏆',
      earnedAt: null,
    },
    {
      id: 'milestone-five-listings',
      title: 'Shop of 5',
      description: 'You have 5 or more active listings in your shop.',
      icon: '🏪',
      earnedAt: null,
    },
  ],
  nextGoal: {
    title: 'Complete Module 3 in Digital Marketing',
    description:
      "You're 60% through — finish Module 3 to earn your certificate and unlock advanced seller tools.",
    targetSection: 'learn',
    targetLabel: 'Resume Course',
    progressPercent: 60,
  },
  agentActions: [
    {
      id: 'action-001',
      message: "Listed your 'Handmade Block Print Dupatta' in the Marketplace under Handloom & Textiles.",
      timestamp: '2026-05-23T09:15:00Z',
      type: 'listing',
    },
    {
      id: 'action-002',
      message: "Enrolled you in 'Social Media for Business' — a free 3-hour course matching your skill profile.",
      timestamp: '2026-05-22T14:30:00Z',
      type: 'course',
    },
    {
      id: 'action-003',
      message: 'Updated prices on 2 of your listings based on current market trends in Jaipur.',
      timestamp: '2026-05-21T11:00:00Z',
      type: 'listing',
    },
    {
      id: 'action-004',
      message: 'Submitted your loan renewal application for ₹30,000 (inventory expansion). Status: Under review.',
      timestamp: '2026-05-20T16:45:00Z',
      type: 'financing',
    },
    {
      id: 'action-005',
      message: "Ran a skill re-assessment — identified 'Photography for E-Commerce' as a new marketable skill.",
      timestamp: '2026-05-18T10:00:00Z',
      type: 'assessment',
    },
  ],
  recommendations: [
    {
      id: 'rec-001',
      message: 'Add 3 more photos to your top-selling listing — sellers with 5+ photos earn on average 40% more.',
      ctaLabel: 'Edit Listing',
      targetSection: 'marketplace',
      potentialBoost: '+40% earnings',
    },
    {
      id: 'rec-002',
      message:
        "You've completed 60% of 'Digital Marketing Basics' — finishing it unlocks the Certified Seller badge.",
      ctaLabel: 'Resume Course',
      targetSection: 'learn',
      potentialBoost: null,
    },
    {
      id: 'rec-003',
      message:
        'Your repayment history makes you eligible for a ₹50,000 business expansion loan. Apply before June 30.',
      ctaLabel: 'Check Eligibility',
      targetSection: 'finance',
      potentialBoost: 'Up to ₹50,000',
    },
  ],
  announcements: [
    {
      id: 'ann-001',
      title: 'Loan repayment due in 13 days',
      message: 'Your next EMI of ₹3,200 is due on June 5. Ensure your UPI account has sufficient balance.',
      type: 'personalized',
      severity: 'warning',
      expiresAt: '2026-06-05',
      isRead: false,
    },
    {
      id: 'ann-002',
      title: 'New feature: Voice search in Hindi & Tamil',
      message:
        'You can now browse courses and marketplace listings using voice commands in Hindi, Tamil, and Telugu.',
      type: 'platform',
      severity: 'info',
      expiresAt: '2026-06-15',
      isRead: false,
    },
    {
      id: 'ann-003',
      title: 'Order #ORD-2847 is out for delivery',
      message: 'Your buyer in Mumbai is receiving her order today. Rate the transaction once delivered.',
      type: 'personalized',
      severity: 'success',
      expiresAt: null,
      isRead: true,
    },
    {
      id: 'ann-004',
      title: 'Shakthi Super Sale — May 25 to May 31',
      message:
        'Platform-wide promotion this weekend. Products in the Handloom and Handicraft categories get featured placement.',
      type: 'platform',
      severity: 'info',
      expiresAt: '2026-05-31',
      isRead: false,
    },
  ],
}

// Module-level mutable store (resets on server restart — fine for prototype)
let store: DashboardData = structuredClone(initialData)

export function getDashboardData(): DashboardData {
  return structuredClone(store)
}

export function completeOnboardingStep(id: string): OnboardingStep | null {
  const step = store.onboardingSteps.find((s) => s.id === id)
  if (!step) return null
  step.completed = true
  return structuredClone(step)
}

export function markAnnouncementRead(id: string): Announcement | null {
  const ann = store.announcements.find((a) => a.id === id)
  if (!ann) return null
  ann.isRead = true
  return structuredClone(ann)
}

export function dismissAnnouncement(id: string): boolean {
  const idx = store.announcements.findIndex((a) => a.id === id)
  if (idx === -1) return false
  store.announcements.splice(idx, 1)
  return true
}
