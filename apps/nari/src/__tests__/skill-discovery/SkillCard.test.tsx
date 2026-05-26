import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SkillCard } from '@/components/skill-discovery/SkillCard'
import {
  mockVerifiedSkill,
  mockUnverifiedSkill,
  mockPendingSkill,
  mockRelatedCourses,
} from './fixtures'

describe('SkillCard', () => {
  it('renders skill name and category', () => {
    render(<SkillCard skill={mockVerifiedSkill} />)
    expect(screen.getByText('Mehndi Art')).toBeInTheDocument()
    expect(screen.getByText('Art & Craft')).toBeInTheDocument()
  })

  it('shows correct proficiency level badge', () => {
    render(<SkillCard skill={mockVerifiedSkill} />)
    expect(screen.getByText('Advanced')).toBeInTheDocument()
  })

  it('shows market demand indicator', () => {
    render(<SkillCard skill={mockVerifiedSkill} />)
    expect(screen.getByText('High Demand')).toBeInTheDocument()
  })

  it('shows earning potential range', () => {
    render(<SkillCard skill={mockVerifiedSkill} />)
    expect(screen.getByText(/8K - 25K/)).toBeInTheDocument()
  })

  it('shows "Verified" badge on verified skill', () => {
    render(<SkillCard skill={mockVerifiedSkill} />)
    expect(screen.getByText('Verified')).toBeInTheDocument()
  })

  it('shows "Pending" badge on pending skill', () => {
    render(<SkillCard skill={mockPendingSkill} />)
    expect(screen.getByText('Pending')).toBeInTheDocument()
  })

  it('shows "Unverified" badge and "Validate now" button on unverified skill', () => {
    render(<SkillCard skill={mockUnverifiedSkill} />)
    expect(screen.getByText('Unverified')).toBeInTheDocument()
    expect(screen.getByText('Validate now')).toBeInTheDocument()
  })

  it('does not show "Validate now" on verified skill', () => {
    render(<SkillCard skill={mockVerifiedSkill} />)
    expect(screen.queryByText('Validate now')).not.toBeInTheDocument()
  })

  it('calls onValidate with skill id when "Validate now" is clicked', () => {
    const onValidate = vi.fn()
    render(<SkillCard skill={mockUnverifiedSkill} onValidate={onValidate} />)
    fireEvent.click(screen.getByText('Validate now'))
    expect(onValidate).toHaveBeenCalledOnce()
  })

  it('opens menu and calls onEdit when Edit is clicked', () => {
    const onEdit = vi.fn()
    render(<SkillCard skill={mockVerifiedSkill} onEdit={onEdit} />)
    fireEvent.click(screen.getByRole('button', { name: /more options/i }))
    fireEvent.click(screen.getByText('Edit'))
    expect(onEdit).toHaveBeenCalledOnce()
  })

  it('opens menu and calls onDelete when Remove is clicked', () => {
    const onDelete = vi.fn()
    render(<SkillCard skill={mockVerifiedSkill} onDelete={onDelete} />)
    fireEvent.click(screen.getByRole('button', { name: /more options/i }))
    fireEvent.click(screen.getByText('Remove'))
    expect(onDelete).toHaveBeenCalledOnce()
  })

  it('shows related course count when courses are linked', () => {
    render(
      <SkillCard
        skill={mockVerifiedSkill}
        relatedCourses={mockRelatedCourses}
      />
    )
    expect(screen.getByText('1 Course')).toBeInTheDocument()
  })

  it('calls onViewCourse when course link is clicked', () => {
    const onViewCourse = vi.fn()
    render(
      <SkillCard
        skill={mockVerifiedSkill}
        relatedCourses={mockRelatedCourses}
        onViewCourse={onViewCourse}
      />
    )
    fireEvent.click(screen.getByText('1 Course'))
    expect(onViewCourse).toHaveBeenCalledWith('course-001')
  })

  it('shows rising trend indicator', () => {
    render(<SkillCard skill={mockVerifiedSkill} />)
    expect(screen.getByText('Rising')).toBeInTheDocument()
  })

  it('truncates very long skill names without breaking layout', () => {
    const longNameSkill = { ...mockVerifiedSkill, name: 'A'.repeat(100) }
    const { container } = render(<SkillCard skill={longNameSkill} />)
    expect(container.firstChild).toBeTruthy()
  })

  it('shows "₹0" when earningPotential.min is 0', () => {
    const zeroEarningSkill = {
      ...mockVerifiedSkill,
      earningPotential: { min: 0, max: 5000, currency: 'INR', period: 'monthly' as const },
    }
    render(<SkillCard skill={zeroEarningSkill} />)
    expect(screen.getByText(/0 - 5K/)).toBeInTheDocument()
  })

  it('does not show broken course links when relatedCourses is empty', () => {
    render(<SkillCard skill={{ ...mockVerifiedSkill, relatedCourses: [] }} relatedCourses={[]} />)
    expect(screen.queryByText(/course/i)).not.toBeInTheDocument()
  })

  it('shows correct label for very-high market demand', () => {
    const highDemandSkill = { ...mockVerifiedSkill, marketDemand: 'very-high' as const }
    render(<SkillCard skill={highDemandSkill} />)
    expect(screen.getByText('Very High Demand')).toBeInTheDocument()
  })
})
