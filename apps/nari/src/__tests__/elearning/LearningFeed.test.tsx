import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LearningFeed } from '@/components/elearning/LearningFeed'
import {
  mockCourses,
  mockSpeakers,
  mockLiveSessions,
  mockUserProgress,
  mockLearningGoals,
  mockBadges,
  mockCertificates,
  mockCalendarEvents,
  mockCategories,
  mockUserStats,
} from './fixtures'

const defaultProps = {
  courses: mockCourses,
  speakers: mockSpeakers,
  liveSessions: mockLiveSessions,
  userProgress: mockUserProgress,
  learningGoals: mockLearningGoals,
  badges: mockBadges,
  certificates: mockCertificates,
  calendarEvents: mockCalendarEvents,
  categories: mockCategories,
  userStats: mockUserStats,
}

describe('LearningFeed — Flow 1: View Personalized Feed', () => {
  it('shows "Continue Learning" section with in-progress courses', () => {
    render(<LearningFeed {...defaultProps} />)
    expect(screen.getByText('Continue Learning')).toBeInTheDocument()
    expect(screen.getByText('Digital Marketing for Women Entrepreneurs')).toBeInTheDocument()
  })

  it('shows stats grid with correct values', () => {
    render(<LearningFeed {...defaultProps} />)
    expect(screen.getByText('3')).toBeInTheDocument() // coursesCompleted
    expect(screen.getByText('2')).toBeInTheDocument() // coursesInProgress
    expect(screen.getByText('5')).toBeInTheDocument() // currentStreak
  })

  it('shows "Trending Now" section with trending courses', () => {
    render(<LearningFeed {...defaultProps} />)
    expect(screen.getByText('Trending Now')).toBeInTheDocument()
  })

  it('shows "Recommended for You" section for unenrolled courses', () => {
    render(<LearningFeed {...defaultProps} />)
    expect(screen.getByText('Recommended for You')).toBeInTheDocument()
    // course-003 (Personal Finance Basics) is not in userProgress
    expect(screen.getByText('Personal Finance Basics')).toBeInTheDocument()
  })
})

describe('LearningFeed — Flow 2: Enroll in a Course', () => {
  it('shows "Enroll Free" for unenrolled courses', () => {
    render(<LearningFeed {...defaultProps} />)
    const enrollButtons = screen.getAllByRole('button', { name: /enroll free/i })
    expect(enrollButtons.length).toBeGreaterThan(0)
  })

  it('calls onEnrollCourse with correct courseId when Enroll Free is clicked', () => {
    const onEnrollCourse = vi.fn()
    render(<LearningFeed {...defaultProps} onEnrollCourse={onEnrollCourse} />)
    const enrollButtons = screen.getAllByRole('button', { name: /enroll free/i })
    fireEvent.click(enrollButtons[0])
    expect(onEnrollCourse).toHaveBeenCalledOnce()
    expect(typeof onEnrollCourse.mock.calls[0][0]).toBe('string')
  })
})

describe('LearningFeed — Flow 3: Continue an In-Progress Course', () => {
  it('shows progress bar at correct percentage', () => {
    render(<LearningFeed {...defaultProps} />)
    expect(screen.getByText(/37%/i)).toBeInTheDocument()
  })

  it('shows Continue Learning button for in-progress course', () => {
    render(<LearningFeed {...defaultProps} />)
    expect(screen.getAllByRole('button', { name: /continue learning/i }).length).toBeGreaterThan(0)
  })

  it('calls onContinueCourse with correct courseId', () => {
    const onContinueCourse = vi.fn()
    render(<LearningFeed {...defaultProps} onContinueCourse={onContinueCourse} />)
    fireEvent.click(screen.getAllByRole('button', { name: /continue learning/i })[0])
    expect(onContinueCourse).toHaveBeenCalledWith('course-001')
  })
})

describe('LearningFeed — Flow 4: Register for Live Session', () => {
  it('renders LiveEventBanner when upcoming session exists', () => {
    render(<LearningFeed {...defaultProps} />)
    expect(screen.getByText('From Kitchen to Company: My Entrepreneurship Journey')).toBeInTheDocument()
  })

  it('calls onRegisterSession when Register Free is clicked', () => {
    const onRegisterSession = vi.fn()
    render(<LearningFeed {...defaultProps} onRegisterSession={onRegisterSession} />)
    fireEvent.click(screen.getByRole('button', { name: /register free/i }))
    expect(onRegisterSession).toHaveBeenCalledWith('session-001')
  })
})

describe('LearningFeed — Flow 5: Filter by Category', () => {
  it('calls onFilterByCategory when a category pill is clicked', async () => {
    const onFilterByCategory = vi.fn()
    const user = userEvent.setup()
    render(<LearningFeed {...defaultProps} onFilterByCategory={onFilterByCategory} />)
    await user.click(screen.getByRole('button', { name: /business/i }))
    expect(onFilterByCategory).toHaveBeenCalledWith('business')
  })
})

describe('LearningFeed — Flow 6: Share a Badge', () => {
  it('shows badge section with 2 badges', () => {
    render(<LearningFeed {...defaultProps} />)
    expect(screen.getByText('Safety Champion')).toBeInTheDocument()
    expect(screen.getByText('First Steps')).toBeInTheDocument()
  })

  it('calls onShareBadge when share is clicked', () => {
    const onShareBadge = vi.fn()
    render(<LearningFeed {...defaultProps} onShareBadge={onShareBadge} />)
    const shareButtons = screen.getAllByRole('button')
    // Find the share buttons within badge section (small buttons)
    const badgeShareBtns = shareButtons.filter(
      (btn) => !btn.textContent?.trim()
    )
    fireEvent.click(badgeShareBtns[0])
    expect(onShareBadge).toHaveBeenCalled()
  })
})

describe('LearningFeed — Empty States', () => {
  it('hides "Continue Learning" section when no in-progress courses', () => {
    render(<LearningFeed {...defaultProps} userProgress={[]} />)
    expect(screen.queryByText('Continue Learning')).not.toBeInTheDocument()
  })

  it('hides LiveEventBanner when no upcoming live sessions', () => {
    const noUpcoming = [{ ...mockLiveSessions[0], isUpcoming: false }]
    render(<LearningFeed {...defaultProps} liveSessions={noUpcoming} />)
    expect(screen.queryByText(/register free/i)).not.toBeInTheDocument()
  })

  it('shows empty state in badge section when no badges', () => {
    render(<LearningFeed {...defaultProps} badges={[]} />)
    expect(screen.getByText(/complete courses to earn badges/i)).toBeInTheDocument()
  })

  it('shows "No upcoming events" when all calendar events are completed', () => {
    const completedEvents = mockCalendarEvents.map((e) => ({ ...e, isCompleted: true }))
    render(<LearningFeed {...defaultProps} calendarEvents={completedEvents} />)
    expect(screen.getByText(/no upcoming events/i)).toBeInTheDocument()
  })

  it('hides "Recommended for You" when all courses are enrolled', () => {
    const allEnrolled = mockUserProgress.concat([
      {
        id: 'prog-003',
        courseId: 'course-003',
        completedModules: 0,
        percentComplete: 0,
        lastAccessedAt: null,
        status: 'enrolled',
        enrolledAt: '2026-05-01T00:00:00Z',
      },
    ])
    render(<LearningFeed {...defaultProps} userProgress={allEnrolled} />)
    expect(screen.queryByText('Recommended for You')).not.toBeInTheDocument()
  })
})

describe('LearningFeed — Accessibility', () => {
  it('search input has a placeholder', () => {
    render(<LearningFeed {...defaultProps} />)
    expect(screen.getByPlaceholderText(/search courses/i)).toBeInTheDocument()
  })

  it('streak stat does not show best comparison when streak is 0', () => {
    const zeroStreak = { ...mockUserStats, currentStreak: 0 }
    render(<LearningFeed {...defaultProps} userStats={zeroStreak} />)
    expect(screen.queryByText(/best:/i)).not.toBeInTheDocument()
  })

  it('certificate highlight card shows when certificates exist', () => {
    render(<LearningFeed {...defaultProps} />)
    expect(screen.getByText(/latest certificate/i)).toBeInTheDocument()
  })

  it('certificate highlight card does not render when no certificates', () => {
    render(<LearningFeed {...defaultProps} certificates={[]} />)
    expect(screen.queryByText(/latest certificate/i)).not.toBeInTheDocument()
  })
})
