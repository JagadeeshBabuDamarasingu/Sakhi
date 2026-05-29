import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  cancelToolCall,
  confirmToolCall,
  createAiSession,
  createDashboardRecommendation,
  draftListing,
  generateMarketplaceInsights,
  getAiActions,
  getAiRecommendations,
  getAiSession,
  resetAiStoreForTests,
  runFinancingCoach,
  runLearningCoach,
  runSkillDiscovery,
  sendAiMessage,
} from '@/lib/ai/orchestrator'
import { ProviderSafetyError, type AiProvider } from '@/lib/ai/provider'

describe('AI orchestration', () => {
  beforeEach(() => {
    resetAiStoreForTests()
    vi.unstubAllEnvs()
  })

  it('creates a session, stores message history, and records provider output', async () => {
    const session = createAiSession({ purpose: 'skill-discovery' })

    const response = await sendAiMessage(session.id, 'I make pickles at home')

    expect(response.session.id).toBe(session.id)
    expect(response.messages.map((message) => message.role)).toEqual([
      'system',
      'user',
      'assistant',
    ])
    expect(response.assistantMessage.content).toContain('pickle')
  })

  it('requires confirmation before executing medium risk tool calls', async () => {
    const session = createAiSession({ purpose: 'skill-discovery' })

    const proposed = await sendAiMessage(session.id, 'Please add tailoring as a skill', {
      requestedTool: {
        toolName: 'add_skill',
        arguments: { skillName: 'Tailoring', categoryId: 'textiles' },
      },
    })

    expect(proposed.toolCalls).toHaveLength(1)
    expect(proposed.toolCalls[0].status).toBe('pending_confirmation')

    const executed = confirmToolCall(proposed.toolCalls[0].id)

    expect(executed.status).toBe('executed')
    expect(executed.result).toMatchObject({ skillName: 'Tailoring', saved: true })
    expect(getAiActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          actionType: 'add_skill',
          riskLevel: 'medium',
          status: 'executed',
        }),
      ])
    )
  })

  it('allows users to cancel pending tool calls without execution', async () => {
    const session = createAiSession({ purpose: 'marketplace' })
    const response = await sendAiMessage(session.id, 'Publish my listing', {
      requestedTool: {
        toolName: 'publish_listing',
        arguments: { title: 'Block print dupatta', description: 'Cotton dupatta', price: 800 },
      },
    })

    const cancelled = cancelToolCall(response.toolCalls[0].id)

    expect(cancelled.status).toBe('cancelled')
    expect(cancelled.executedAt).toBeNull()
  })

  it('returns a safe fallback when the provider fails', async () => {
    const failingProvider: AiProvider = {
      async completeChat() {
        throw new ProviderSafetyError('blocked')
      },
    }
    const session = createAiSession({ purpose: 'financing-coach' })

    const response = await sendAiMessage(session.id, 'Can I get a loan?', {
      provider: failingProvider,
    })

    expect(response.assistantMessage.metadata.fallback).toBe(true)
    expect(response.assistantMessage.content).toContain('could not reach the AI service')
  })

  it('generates dashboard recommendations from audited actions', () => {
    const recommendation = createDashboardRecommendation({
      message: 'Add more photos to your best listing.',
      ctaLabel: 'Edit Listing',
      targetSection: 'marketplace',
      potentialBoost: '+20% views',
    })

    expect(getAiRecommendations()).toContainEqual(recommendation)
    expect(getAiActions()[0]).toMatchObject({
      actionType: 'create_dashboard_recommendation',
      targetSection: 'dashboard',
      status: 'executed',
    })
  })

  it('returns structured skill discovery, marketplace, listing, learning, and financing outputs', async () => {
    const skill = await runSkillDiscovery('I stitch blouses and decorate fabric')
    const insights = await generateMarketplaceInsights()
    const listing = await draftListing({
      productName: 'Handmade dupatta',
      materials: ['cotton', 'natural dye'],
      category: 'Handloom',
    })
    const course = await runLearningCoach()
    const financing = await runFinancingCoach({ loanType: 'micro-loan' })

    expect(skill.suggestions[0]).toMatchObject({ categoryId: expect.any(String) })
    expect(insights[0]).toMatchObject({ type: expect.any(String), action: expect.any(String) })
    expect(listing.tags.length).toBeGreaterThan(0)
    expect(course.recommendation.courseId).toMatch(/^course-/)
    expect(financing.nextStep.toolName).toBe('start_loan_application')
    expect(financing.nextStep.requiresConfirmation).toBe(true)
  })

  it('prevents cross-user access to AI sessions', () => {
    const session = createAiSession({ purpose: 'chat', userId: 'user-alice' })

    const aliceView = getAiSession(session.id, 'user-alice')
    expect(aliceView).not.toBeNull()

    const bobView = getAiSession(session.id, 'user-bob')
    expect(bobView).toBeNull()
  })

  it('prevents cross-user tool call confirmation', async () => {
    const session = createAiSession({ purpose: 'skill-discovery', userId: 'user-alice' })
    const proposed = await sendAiMessage(session.id, 'Add a skill', {
      requestedTool: {
        toolName: 'add_skill',
        arguments: { skillName: 'Pottery', categoryId: 'cat-001' },
      },
    })

    expect(() => confirmToolCall(proposed.toolCalls[0].id, 'user-bob')).toThrow()
    expect(() => cancelToolCall(proposed.toolCalls[0].id, 'user-bob')).toThrow()

    const aliceConfirmed = confirmToolCall(proposed.toolCalls[0].id, 'user-alice')
    expect(aliceConfirmed.status).toBe('executed')
  })

  it('ai actions feed is scoped per user', async () => {
    const aliceSession = createAiSession({ purpose: 'dashboard-recommendation', userId: 'user-alice' })
    await sendAiMessage(aliceSession.id, 'create a recommendation', {
      requestedTool: {
        toolName: 'create_dashboard_recommendation',
        arguments: { message: 'Alice tip', ctaLabel: 'View', targetSection: 'dashboard' },
      },
    })

    const bobActions = getAiActions('user-bob')
    expect(bobActions).toHaveLength(0)

    const aliceActions = getAiActions('user-alice')
    expect(aliceActions.length).toBeGreaterThan(0)
  })

  it('enforces a per-user action limit', async () => {
    vi.stubEnv('AI_MAX_DAILY_ACTIONS_PER_USER', '1')
    const first = createAiSession({ purpose: 'dashboard-recommendation' })
    await sendAiMessage(first.id, 'create a recommendation', {
      requestedTool: {
        toolName: 'create_dashboard_recommendation',
        arguments: { message: 'Try product photography', ctaLabel: 'View Course', targetSection: 'learn' },
      },
    })

    const second = createAiSession({ purpose: 'dashboard-recommendation' })
    const response = await sendAiMessage(second.id, 'create another recommendation', {
      requestedTool: {
        toolName: 'create_dashboard_recommendation',
        arguments: { message: 'Try WhatsApp Business', ctaLabel: 'View Course', targetSection: 'learn' },
      },
    })

    expect(response.toolCalls[0].status).toBe('failed')
    expect(response.toolCalls[0].error).toContain('Daily AI action limit')
  })
})
