import { getDashboardData } from '@/lib/dashboard-store'
import { getELearningData } from '@/lib/elearning-store'
import { getFinancingDashboardData } from '@/lib/financing-store'
import {
  getLowStockListings,
  getMarketplaceDashboardData,
  getSellerListings,
  getSellerOrders,
} from '@/lib/marketplace-store'
import type { AiPurpose } from './types'

const UNSUPPORTED_LANGUAGE_FALLBACK = 'en'
const SUPPORTED_LANGUAGES = new Set(['en', 'hi', 'ta', 'te', 'kn', 'ml', 'mr', 'bn', 'gu', 'pa'])

export interface AiContext {
  user: {
    id: string
    name: string
    city: string
    preferredLanguage: string
    onboardingCompleted: boolean
  }
  dashboard?: unknown
  skills?: unknown
  learning?: unknown
  marketplace?: unknown
  financing?: unknown
  metadata: {
    piiMinimized: true
    languageFallback: boolean
  }
}

export function resolveAiLanguage(language?: string) {
  const requested = language || getDashboardData().user.preferredLanguage || UNSUPPORTED_LANGUAGE_FALLBACK
  return SUPPORTED_LANGUAGES.has(requested) ? requested : UNSUPPORTED_LANGUAGE_FALLBACK
}

export function buildAiContext(purpose: AiPurpose): AiContext {
  const dashboard = getDashboardData()
  const language = resolveAiLanguage(dashboard.user.preferredLanguage)

  const context: AiContext = {
    user: {
      id: dashboard.user.id,
      name: dashboard.user.name,
      city: dashboard.user.city,
      preferredLanguage: language,
      onboardingCompleted: dashboard.user.onboardingCompleted,
    },
    metadata: {
      piiMinimized: true,
      languageFallback: language !== dashboard.user.preferredLanguage,
    },
  }

  if (purpose === 'chat' || purpose === 'dashboard-recommendation') {
    context.dashboard = {
      onboardingSteps: dashboard.onboardingSteps,
      metrics: dashboard.metrics,
      recentAgentActions: dashboard.agentActions.slice(0, 5),
      recommendations: dashboard.recommendations.slice(0, 5),
    }
  }

  if (purpose === 'skill-discovery' || purpose === 'chat') {
    context.skills = {
      currentSkillNames: getMarketplaceDashboardData().sellerProfile.skills,
      city: dashboard.user.city,
    }
  }

  if (purpose === 'learning-coach' || purpose === 'chat') {
    const learning = getELearningData()
    context.learning = {
      courses: learning.courses.map(({ id, title, category, level, language, isTrending }) => ({
        id,
        title,
        category,
        level,
        language,
        isTrending,
      })),
      progress: learning.userProgress,
      stats: learning.userStats,
    }
  }

  if (purpose === 'marketplace' || purpose === 'listing-draft' || purpose === 'chat') {
    const marketplace = getMarketplaceDashboardData()
    context.marketplace = {
      sellerProfile: {
        storeName: marketplace.sellerProfile.storeName,
        skills: marketplace.sellerProfile.skills,
        city: marketplace.sellerProfile.location.city,
        rating: marketplace.sellerProfile.rating,
      },
      analytics: marketplace.analyticsSummary,
      activeListings: getSellerListings()
        .filter((listing) => listing.status === 'active')
        .slice(0, 8)
        .map(({ id, title, category, price, inventory, views, soldCount }) => ({
          id,
          title,
          category,
          price,
          inventory,
          views,
          soldCount,
        })),
      recentOrders: getSellerOrders({ limit: 5 }).map(({ id, orderNumber, total, status, createdAt, items }) => ({
        id,
        orderNumber,
        total,
        status,
        createdAt,
        items,
      })),
      lowStockListings: getLowStockListings().map(({ id, title, inventory }) => ({ id, title, inventory })),
    }
  }

  if (purpose === 'financing-coach' || purpose === 'chat') {
    const financing = getFinancingDashboardData()
    context.financing = {
      profile: {
        isFirstTimeBorrower: financing.userFinancingProfile.isFirstTimeBorrower,
        creditLimit: financing.userFinancingProfile.creditLimit,
        creditLimitEligible: financing.userFinancingProfile.creditLimitEligible,
        creditLadder: financing.userFinancingProfile.creditLadder,
        kycStatus: financing.userFinancingProfile.kycStatus,
      },
      loans: financing.loans.map(
        ({ id, type, status, amount, outstandingBalance, repaymentStatus, nextEmiDate, nextEmiAmount }) => ({
          id,
          type,
          status,
          amount,
          outstandingBalance,
          repaymentStatus,
          nextEmiDate,
          nextEmiAmount,
        })
      ),
    }
  }

  return context
}

export function sanitizeForPrompt(value: unknown) {
  return JSON.stringify(value)
    .replace(/[<>]/g, '')
    .replace(/ignore previous instructions/gi, '[removed instruction override]')
    .slice(0, 12000)
}
