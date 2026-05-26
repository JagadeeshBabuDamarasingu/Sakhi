import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BadgeDisplay } from '@/components/elearning/BadgeDisplay'
import { mockBadges } from './fixtures'

describe('BadgeDisplay', () => {
  it('renders earned badge titles', () => {
    render(<BadgeDisplay badges={mockBadges} />)
    expect(screen.getByText('Safety Champion')).toBeInTheDocument()
    expect(screen.getByText('First Steps')).toBeInTheDocument()
  })

  it('shows badge count', () => {
    render(<BadgeDisplay badges={mockBadges} />)
    expect(screen.getByText('2 earned')).toBeInTheDocument()
  })

  it('shows empty state message when no badges earned', () => {
    render(<BadgeDisplay badges={[]} />)
    expect(screen.getByText(/complete courses to earn badges/i)).toBeInTheDocument()
  })

  it('does not show badge count in empty state', () => {
    render(<BadgeDisplay badges={[]} />)
    expect(screen.queryByText(/earned/)).not.toBeInTheDocument()
  })

  it('calls onShare with correct badge id when share is clicked', () => {
    const onShare = vi.fn()
    render(<BadgeDisplay badges={mockBadges} onShare={onShare} />)
    const shareButtons = screen.getAllByRole('button')
    fireEvent.click(shareButtons[0])
    expect(onShare).toHaveBeenCalledWith(mockBadges[0].id)
  })
})
