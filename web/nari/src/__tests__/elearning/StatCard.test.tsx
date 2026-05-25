import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatCard } from '@/components/elearning/StatCard'

const icon = <svg data-testid="stat-icon" />

describe('StatCard', () => {
  it('renders label and numeric value', () => {
    render(<StatCard label="Completed" value={5} icon={icon} />)
    expect(screen.getByText('Completed')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('renders label and string value', () => {
    render(<StatCard label="Learning Time" value="4h 5m" icon={icon} />)
    expect(screen.getByText('Learning Time')).toBeInTheDocument()
    expect(screen.getByText('4h 5m')).toBeInTheDocument()
  })

  it('renders trend text when provided', () => {
    render(<StatCard label="Day Streak" value={5} icon={icon} trend="Best: 12 days" />)
    expect(screen.getByText('Best: 12 days')).toBeInTheDocument()
  })

  it('does not render trend when not provided', () => {
    render(<StatCard label="Completed" value={3} icon={icon} />)
    expect(screen.queryByText(/best/i)).not.toBeInTheDocument()
  })

  it('renders the icon element', () => {
    render(<StatCard label="Completed" value={0} icon={icon} />)
    expect(screen.getByTestId('stat-icon')).toBeInTheDocument()
  })

  it('shows "0" value correctly without being blank', () => {
    render(<StatCard label="Learning Time" value="0m" icon={icon} />)
    expect(screen.getByText('0m')).toBeInTheDocument()
  })
})
