import type { AgentAction, Recommendation } from '@/components/dashboard/types'
import type { AIInsight } from '@/components/marketplace/types'
import type { LoanType } from '@/components/financing/types'
import type { AiMessageRole } from './provider'

export type AiPurpose =
  | 'chat'
  | 'skill-discovery'
  | 'marketplace'
  | 'listing-draft'
  | 'learning-coach'
  | 'financing-coach'
  | 'dashboard-recommendation'

export type AiSessionStatus = 'active' | 'closed'
export type AiToolCallStatus = 'proposed' | 'pending_confirmation' | 'executed' | 'cancelled' | 'failed'
export type AiRiskLevel = 'low' | 'medium' | 'high'
export type AiTargetSection = 'dashboard' | 'skill-discovery' | 'marketplace' | 'elearning' | 'financing'

export interface AiSession {
  id: string
  userId: string
  purpose: AiPurpose
  status: AiSessionStatus
  language: string
  createdAt: string
  updatedAt: string
}

export interface AiMessage {
  id: string
  sessionId: string
  role: AiMessageRole
  content: string
  metadata: Record<string, unknown>
  createdAt: string
}

export interface AiToolCall {
  id: string
  sessionId: string
  toolName: AiToolName
  arguments: Record<string, unknown>
  status: AiToolCallStatus
  requiresConfirmation: boolean
  confirmedAt: string | null
  executedAt: string | null
  result: unknown
  error: string | null
  createdAt: string
}

export interface AiActionAudit {
  id: string
  userId: string
  sessionId: string
  actionType: AiToolName
  targetSection: AiTargetSection
  summary: string
  beforeState: unknown
  afterState: unknown
  riskLevel: AiRiskLevel
  status: AiToolCallStatus
  createdAt: string
}

export interface AiUserPreferences {
  userId: string
  language: string
  explanationDepth: 'simple' | 'standard'
  consentRequiredFor: AiRiskLevel[]
}

export type AiToolName =
  | 'suggest_skill'
  | 'add_skill'
  | 'recommend_course'
  | 'enroll_course'
  | 'draft_listing'
  | 'publish_listing'
  | 'create_marketplace_insight'
  | 'suggest_loan_type'
  | 'start_loan_application'
  | 'create_dashboard_recommendation'

export interface AiSessionWithMessages {
  session: AiSession
  messages: AiMessage[]
  toolCalls: AiToolCall[]
}

export interface SendAiMessageOptions {
  provider?: import('./provider').AiProvider
  requestedTool?: {
    toolName: AiToolName
    arguments: Record<string, unknown>
  }
}

export interface SendAiMessageResult extends AiSessionWithMessages {
  assistantMessage: AiMessage
}

export interface ListingDraft {
  title: string
  description: string
  tags: string[]
  photoTips: string[]
}

export interface SkillDiscoveryResult {
  session: AiSession
  message: string
  suggestions: Array<{
    id: string
    skillName: string
    category: string
    categoryId: string
    reason: string
    marketDemand: 'low' | 'medium' | 'high' | 'very-high'
    earningPotential: {
      min: number
      max: number
      currency: string
      period: 'monthly' | 'weekly' | 'daily'
    }
    matchScore: number
  }>
}

export interface LearningCoachResult {
  message: string
  recommendation: {
    courseId: string
    title: string
    reason: string
    nextLesson?: string
  }
}

export interface FinancingCoachResult {
  message: string
  nextStep: {
    toolName: 'start_loan_application'
    requiresConfirmation: true
    arguments: {
      loanType: LoanType
      amount?: number
      tenure?: number
    }
  }
}

export type DashboardRecommendationInput = Omit<Recommendation, 'id'>
export type MarketplaceInsight = AIInsight
export const DEFAULT_AI_USER_ID = 'user-001'
