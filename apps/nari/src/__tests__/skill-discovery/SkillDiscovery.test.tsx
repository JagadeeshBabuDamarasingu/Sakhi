import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SkillDiscovery } from '@/components/skill-discovery/SkillDiscovery'
import { defaultProps, mockSuggestions } from './fixtures'

describe('Flow 1: Empty State — First-Time User', () => {
  it('shows "Discover Your Skills" heading', () => {
    render(<SkillDiscovery {...defaultProps} skills={[]} />)
    expect(screen.getByText('Discover Your Skills')).toBeInTheDocument()
  })

  it('shows descriptive text about finding marketable skills', () => {
    render(<SkillDiscovery {...defaultProps} skills={[]} />)
    expect(screen.getByText(/valuable skills/i)).toBeInTheDocument()
  })

  it('calls onStartAIConversation when "Chat with AI" is clicked', () => {
    const onStartAIConversation = vi.fn()
    render(
      <SkillDiscovery
        {...defaultProps}
        skills={[]}
        onStartAIConversation={onStartAIConversation}
      />
    )
    fireEvent.click(screen.getByText('Chat with AI'))
    expect(onStartAIConversation).toHaveBeenCalledOnce()
  })

  it('calls onNavigateToLearning when "Learn New Skills" is clicked', () => {
    const onNavigateToLearning = vi.fn()
    render(
      <SkillDiscovery
        {...defaultProps}
        skills={[]}
        onNavigateToLearning={onNavigateToLearning}
      />
    )
    fireEvent.click(screen.getByText('Learn New Skills'))
    expect(onNavigateToLearning).toHaveBeenCalledOnce()
  })

  it('shows "Browse skill categories" link', () => {
    render(<SkillDiscovery {...defaultProps} skills={[]} />)
    expect(screen.getByText(/Browse skill categories/i)).toBeInTheDocument()
  })

  it('opens CategoryBrowser when "Browse skill categories" is clicked', () => {
    render(<SkillDiscovery {...defaultProps} skills={[]} />)
    fireEvent.click(screen.getByText(/Browse skill categories/i))
    expect(screen.getByText('Skill Categories')).toBeInTheDocument()
  })

  it('closes CategoryBrowser when ✕ is clicked', () => {
    render(<SkillDiscovery {...defaultProps} skills={[]} />)
    fireEvent.click(screen.getByText(/Browse skill categories/i))
    fireEvent.click(screen.getByText('✕'))
    expect(screen.queryByText('Skill Categories')).not.toBeInTheDocument()
  })

  it('does not render any skill cards in empty state', () => {
    render(<SkillDiscovery {...defaultProps} skills={[]} />)
    expect(screen.queryByText('My Skills')).not.toBeInTheDocument()
    expect(screen.queryByText('Mehndi Art')).not.toBeInTheDocument()
  })
})

describe('Flow 2: View Existing Skills', () => {
  it('shows "My Skills" header', () => {
    render(<SkillDiscovery {...defaultProps} />)
    expect(screen.getByText('My Skills')).toBeInTheDocument()
  })

  it('shows correct skill count', () => {
    render(<SkillDiscovery {...defaultProps} />)
    expect(screen.getByText('3 skills added to your profile')).toBeInTheDocument()
  })

  it('renders all skill names', () => {
    render(<SkillDiscovery {...defaultProps} />)
    expect(screen.getByText('Mehndi Art')).toBeInTheDocument()
    expect(screen.getByText('Block Printing')).toBeInTheDocument()
    expect(screen.getByText('Pottery')).toBeInTheDocument()
  })

  it('shows Verified badge for verified skill', () => {
    render(<SkillDiscovery {...defaultProps} />)
    expect(screen.getByText('Verified')).toBeInTheDocument()
  })

  it('shows Pending badge for pending skill', () => {
    render(<SkillDiscovery {...defaultProps} />)
    expect(screen.getByText('Pending')).toBeInTheDocument()
  })

  it('shows Unverified badge for unverified skill', () => {
    render(<SkillDiscovery {...defaultProps} />)
    expect(screen.getByText('Unverified')).toBeInTheDocument()
  })
})

describe('Flow 3: Add Skill via Search', () => {
  it('calls onSearchSkill when search form is submitted', () => {
    const onSearchSkill = vi.fn()
    render(<SkillDiscovery {...defaultProps} onSearchSkill={onSearchSkill} />)
    const input = screen.getByPlaceholderText(/search for a skill/i)
    fireEvent.change(input, { target: { value: 'Mehndi' } })
    fireEvent.submit(input.closest('form')!)
    expect(onSearchSkill).toHaveBeenCalledWith('Mehndi')
  })

  it('does not call onSearchSkill with empty query', () => {
    const onSearchSkill = vi.fn()
    render(<SkillDiscovery {...defaultProps} onSearchSkill={onSearchSkill} />)
    const input = screen.getByPlaceholderText(/search for a skill/i)
    fireEvent.submit(input.closest('form')!)
    expect(onSearchSkill).not.toHaveBeenCalled()
  })
})

describe('Flow 4: Add Skill via AI Conversation', () => {
  it('calls onStartAIConversation when AI Chat button is clicked', () => {
    const onStartAIConversation = vi.fn()
    render(<SkillDiscovery {...defaultProps} onStartAIConversation={onStartAIConversation} />)
    fireEvent.click(screen.getByRole('button', { name: /ai chat/i }))
    expect(onStartAIConversation).toHaveBeenCalledOnce()
  })
})

describe('Flow 5: Validate a Skill', () => {
  it('calls onValidateSkill when "Validate now" is clicked', () => {
    const onValidateSkill = vi.fn()
    render(<SkillDiscovery {...defaultProps} onValidateSkill={onValidateSkill} />)
    const validateButtons = screen.getAllByText('Validate now')
    fireEvent.click(validateButtons[0])
    expect(onValidateSkill).toHaveBeenCalledWith(expect.any(String))
  })

  it('only shows "Validate now" on unverified or pending skills', () => {
    render(<SkillDiscovery {...defaultProps} />)
    const validateButtons = screen.getAllByText('Validate now')
    expect(validateButtons).toHaveLength(2)
  })
})

describe('Flow 6: Manage Skill Suggestions', () => {
  it('shows "AI Picks" tab by default', () => {
    render(<SkillDiscovery {...defaultProps} />)
    expect(screen.getByText('AI Picks')).toBeInTheDocument()
  })

  it('shows ai-recommended suggestion in AI Picks tab', () => {
    render(<SkillDiscovery {...defaultProps} />)
    expect(screen.getByText('Tailoring & Stitching')).toBeInTheDocument()
  })

  it('switches to trending suggestions when Trending tab is clicked', () => {
    render(<SkillDiscovery {...defaultProps} />)
    fireEvent.click(screen.getByRole('button', { name: /trending/i }))
    expect(screen.getByText('Digital Marketing')).toBeInTheDocument()
  })

  it('calls onAddSuggestion with correct id when Add button is clicked', () => {
    const onAddSuggestion = vi.fn()
    render(<SkillDiscovery {...defaultProps} onAddSuggestion={onAddSuggestion} />)
    fireEvent.click(screen.getByText('Add This Skill'))
    expect(onAddSuggestion).toHaveBeenCalledWith('sugg-001')
  })

  it('calls onDismissSuggestion with correct id when Dismiss is clicked', () => {
    const onDismissSuggestion = vi.fn()
    render(<SkillDiscovery {...defaultProps} onDismissSuggestion={onDismissSuggestion} />)
    const dismissBtn = screen.getByRole('button', { name: /dismiss tailoring/i })
    fireEvent.click(dismissBtn)
    expect(onDismissSuggestion).toHaveBeenCalledWith('sugg-001')
  })
})

describe('Empty State: No Suggestions', () => {
  it('shows empty state message when no ai suggestions available', () => {
    render(<SkillDiscovery {...defaultProps} skillSuggestions={[]} />)
    expect(screen.getByText(/no suggestions yet/i)).toBeInTheDocument()
  })

  it('shows empty state message when no trending suggestions available', () => {
    const aiOnly = mockSuggestions.filter((s) => s.suggestionType === 'ai-recommended')
    render(<SkillDiscovery {...defaultProps} skillSuggestions={aiOnly} />)
    fireEvent.click(screen.getByRole('button', { name: /trending/i }))
    expect(screen.getByText(/no suggestions yet/i)).toBeInTheDocument()
  })
})

describe('CategoryBrowser in populated state', () => {
  it('opens CategoryBrowser when Browse button is clicked', () => {
    render(<SkillDiscovery {...defaultProps} />)
    fireEvent.click(screen.getByRole('button', { name: /browse/i }))
    expect(screen.getByText('Skill Categories')).toBeInTheDocument()
  })

  it('calls onBrowseCategory when a category is selected', () => {
    const onBrowseCategory = vi.fn()
    render(<SkillDiscovery {...defaultProps} onBrowseCategory={onBrowseCategory} />)
    fireEvent.click(screen.getByRole('button', { name: /browse/i }))
    fireEvent.click(screen.getByText('Art & Craft'))
    expect(onBrowseCategory).toHaveBeenCalledWith('art-craft')
  })
})
