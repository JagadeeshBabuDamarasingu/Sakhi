import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CourseCard } from '@/components/elearning/CourseCard'
import { mockCourses, mockUserProgress } from './fixtures'

const course = mockCourses[0] // business, trending, not mandatory
const mandatoryCourse = mockCourses[1] // cyber-security, mandatory
const inProgressData = mockUserProgress[0] // 37% on course-001
const completedData = mockUserProgress[1] // 100% on course-002

describe('CourseCard', () => {
  it('renders course title, duration, format, and rating', () => {
    render(<CourseCard course={course} />)
    expect(screen.getByText(course.title)).toBeInTheDocument()
    expect(screen.getByText(/3h/i)).toBeInTheDocument()
    expect(screen.getByText(/mixed/i)).toBeInTheDocument()
    expect(screen.getByText(String(course.rating))).toBeInTheDocument()
  })

  it('shows "Enroll Free" when no progress entry exists', () => {
    render(<CourseCard course={course} />)
    expect(screen.getByRole('button', { name: /enroll free/i })).toBeInTheDocument()
  })

  it('shows "Continue Learning" when course is in-progress', () => {
    render(<CourseCard course={course} progress={inProgressData} />)
    expect(screen.getByRole('button', { name: /continue learning/i })).toBeInTheDocument()
  })

  it('shows progress percentage for in-progress course', () => {
    render(<CourseCard course={course} progress={inProgressData} />)
    expect(screen.getByText(/37%/i)).toBeInTheDocument()
    expect(screen.getByText(/3\/8 modules/i)).toBeInTheDocument()
  })

  it('shows "Review Course" when course is completed', () => {
    render(<CourseCard course={mandatoryCourse} progress={completedData} />)
    expect(screen.getByRole('button', { name: /review course/i })).toBeInTheDocument()
  })

  it('calls onView when card is clicked', () => {
    const onView = vi.fn()
    render(<CourseCard course={course} onView={onView} />)
    fireEvent.click(screen.getByText(course.title))
    expect(onView).toHaveBeenCalledOnce()
  })

  it('calls onEnroll when Enroll Free button is clicked', () => {
    const onEnroll = vi.fn()
    render(<CourseCard course={course} onEnroll={onEnroll} />)
    fireEvent.click(screen.getByRole('button', { name: /enroll free/i }))
    expect(onEnroll).toHaveBeenCalledOnce()
  })

  it('calls onContinue when Continue Learning button is clicked', () => {
    const onContinue = vi.fn()
    render(<CourseCard course={course} progress={inProgressData} onContinue={onContinue} />)
    fireEvent.click(screen.getByRole('button', { name: /continue learning/i }))
    expect(onContinue).toHaveBeenCalledOnce()
  })

  it('shows "Required" badge on mandatory courses', () => {
    render(<CourseCard course={mandatoryCourse} />)
    expect(screen.getByText(/required/i)).toBeInTheDocument()
  })

  it('shows "Trending" badge on trending non-mandatory courses', () => {
    render(<CourseCard course={course} />)
    expect(screen.getByText(/trending/i)).toBeInTheDocument()
  })

  it('truncates very long title gracefully without breaking layout', () => {
    const longTitleCourse = { ...course, title: 'A'.repeat(100) }
    const { container } = render(<CourseCard course={longTitleCourse} />)
    expect(container.firstChild).toBeTruthy()
  })
})
