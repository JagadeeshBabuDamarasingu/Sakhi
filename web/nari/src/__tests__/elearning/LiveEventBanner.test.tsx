import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LiveEventBanner } from '@/components/elearning/LiveEventBanner'
import { mockLiveSessions, mockSpeakers } from './fixtures'

const session = mockLiveSessions[0]
const speaker = mockSpeakers[0]

describe('LiveEventBanner', () => {
  it('renders session title', () => {
    render(<LiveEventBanner session={session} />)
    expect(screen.getByText(session.title)).toBeInTheDocument()
  })

  it('shows "Live Session" type label for guest-speaker type', () => {
    render(<LiveEventBanner session={session} />)
    expect(screen.getByText(/live session/i)).toBeInTheDocument()
  })

  it('shows "Bootcamp" type label for bootcamp type', () => {
    const bootcamp = { ...session, type: 'bootcamp' as const }
    render(<LiveEventBanner session={bootcamp} />)
    expect(screen.getByText(/bootcamp/i)).toBeInTheDocument()
  })

  it('shows speaker name and title when speaker is provided', () => {
    render(<LiveEventBanner session={session} speaker={speaker} />)
    expect(screen.getByText(speaker.name)).toBeInTheDocument()
    expect(screen.getByText(speaker.title)).toBeInTheDocument()
  })

  it('does not crash when no speaker is provided', () => {
    render(<LiveEventBanner session={session} />)
    expect(screen.getByText(session.title)).toBeInTheDocument()
  })

  it('shows registration count', () => {
    render(<LiveEventBanner session={session} />)
    expect(screen.getByText(/2,340/)).toBeInTheDocument()
  })

  it('calls onRegister when Register Free button is clicked', () => {
    const onRegister = vi.fn()
    render(<LiveEventBanner session={session} onRegister={onRegister} />)
    fireEvent.click(screen.getByRole('button', { name: /register free/i }))
    expect(onRegister).toHaveBeenCalledOnce()
  })

  it('calls onView when banner body is clicked', () => {
    const onView = vi.fn()
    render(<LiveEventBanner session={session} onView={onView} />)
    fireEvent.click(screen.getByText(session.title))
    expect(onView).toHaveBeenCalledOnce()
  })
})
