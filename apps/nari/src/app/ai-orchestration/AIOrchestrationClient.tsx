'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  HiOutlineSparkles,
  HiOutlineCpuChip,
  HiOutlineShoppingBag,
  HiOutlineAcademicCap,
  HiOutlineBanknotes,
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineXCircle,
  HiOutlineArrowRight,
  HiOutlineArrowPath,
  HiOutlineExclamationCircle,
} from 'react-icons/hi2'

interface AgentAction {
  id: string
  message: string
  timestamp: string
  type: 'listing' | 'course' | 'financing' | 'assessment'
}

interface Recommendation {
  id: string
  message: string
  ctaLabel: string
  targetSection: string
  potentialBoost: string | null
}

interface InsightResult {
  type: string
  title: string
  description: string
  action: string
}

interface CoachResult {
  message: string
  recommendation?: { title: string; courseId: string }
}

interface ListingDraft {
  title: string
  description: string
  tags: string[]
  photoTips: string[]
}

interface SkillSuggestion {
  skillName: string
  category: string
  earningPotential: { min: number; max: number; currency: string }
  marketDemand: string
}

interface SkillResult {
  message: string
  suggestions: SkillSuggestion[]
}

type RunState = 'idle' | 'loading' | 'done' | 'error'

interface PanelResult {
  skillDiscovery?: SkillResult
  marketplaceInsights?: InsightResult[]
  listingDraft?: ListingDraft
  learningCoach?: CoachResult
  financingCoach?: CoachResult
}

const actionTypeIcon: Record<AgentAction['type'], React.ReactNode> = {
  listing: <HiOutlineShoppingBag className="w-4 h-4 text-amber-500" />,
  course: <HiOutlineAcademicCap className="w-4 h-4 text-blue-500" />,
  financing: <HiOutlineBanknotes className="w-4 h-4 text-emerald-500" />,
  assessment: <HiOutlineDocumentText className="w-4 h-4 text-violet-500" />,
}

export function AIOrchestrationClient() {
  const router = useRouter()
  const [actions, setActions] = useState<AgentAction[]>([])
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [runState, setRunState] = useState<Record<string, RunState>>({})
  const [results, setResults] = useState<PanelResult>({})
  const [loadingFeed, setLoadingFeed] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/ai/actions').then((r) => (r.ok ? r.json() : [])),
      fetch('/api/ai/recommendations').then((r) => (r.ok ? r.json() : [])),
    ])
      .then(([acts, recs]) => {
        setActions(acts)
        setRecommendations(recs)
      })
      .catch(() => {})
      .finally(() => setLoadingFeed(false))
  }, [])

  const run = useCallback(async (key: string, fn: () => Promise<unknown>) => {
    setRunState((prev) => ({ ...prev, [key]: 'loading' }))
    try {
      const data = await fn()
      setResults((prev) => ({ ...prev, [key]: data }))
      setRunState((prev) => ({ ...prev, [key]: 'done' }))
    } catch {
      setRunState((prev) => ({ ...prev, [key]: 'error' }))
    }
  }, [])

  const runSkillDiscovery = () =>
    run('skillDiscovery', () =>
      fetch('/api/ai/skill-discovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'What skills do I have based on my profile?' }),
      }).then((r) => r.json())
    )

  const runMarketplaceInsights = () =>
    run('marketplaceInsights', () =>
      fetch('/api/ai/marketplace/insights', { method: 'POST' }).then((r) => r.json())
    )

  const runListingDraft = () =>
    run('listingDraft', () =>
      fetch('/api/ai/listings/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productName: 'Handmade product', category: 'Handloom' }),
      }).then((r) => r.json())
    )

  const runLearningCoach = () =>
    run('learningCoach', () =>
      fetch('/api/ai/learning/coach', { method: 'POST' }).then((r) => r.json())
    )

  const runFinancingCoach = () =>
    run('financingCoach', () =>
      fetch('/api/ai/financing/coach', { method: 'POST' }).then((r) => r.json())
    )

  const refreshFeed = () => {
    setLoadingFeed(true)
    Promise.all([
      fetch('/api/ai/actions').then((r) => (r.ok ? r.json() : [])),
      fetch('/api/ai/recommendations').then((r) => (r.ok ? r.json() : [])),
    ])
      .then(([acts, recs]) => {
        setActions(acts)
        setRecommendations(recs)
      })
      .catch(() => {})
      .finally(() => setLoadingFeed(false))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center shadow-lg shadow-rose-200/50 dark:shadow-none">
              <HiOutlineCpuChip className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-base-content">AI Orchestration</h1>
          </div>
          <p className="text-base-content/50 text-sm ml-11.5">
            Run AI agents, review actions, and manage recommendations across your business.
          </p>
        </div>
        <button
          onClick={refreshFeed}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-base-content/60 bg-base-100 border border-base-300 rounded-xl hover:bg-base-200 transition-colors"
        >
          <HiOutlineArrowPath className={`w-4 h-4 ${loadingFeed ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* AI Capabilities Grid */}
      <section>
        <h2 className="text-sm font-semibold text-base-content/50 uppercase tracking-wide mb-4">
          AI Capabilities
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AIPanel
            icon={<HiOutlineSparkles className="w-5 h-5" />}
            color="rose"
            title="Skill Discovery"
            description="Identify marketable skills from your profile and daily activities."
            state={runState.skillDiscovery ?? 'idle'}
            onRun={runSkillDiscovery}
            onNavigate={() => router.push('/skill-discovery')}
            navigateLabel="Open Skill Discovery"
          >
            {results.skillDiscovery && (
              <div className="mt-3 space-y-2">
                <p className="text-xs text-base-content/60 line-clamp-2">
                  {(results.skillDiscovery as SkillResult).message}
                </p>
                {(results.skillDiscovery as SkillResult).suggestions?.map((s, i) => (
                  <div key={i} className="flex items-center justify-between text-xs bg-base-200 rounded-lg px-2.5 py-1.5">
                    <span className="font-medium text-base-content">{s.skillName}</span>
                    <span className="text-base-content/50">{s.marketDemand} demand</span>
                  </div>
                ))}
              </div>
            )}
          </AIPanel>

          <AIPanel
            icon={<HiOutlineShoppingBag className="w-5 h-5" />}
            color="amber"
            title="Marketplace Insights"
            description="AI analysis of your store performance and growth opportunities."
            state={runState.marketplaceInsights ?? 'idle'}
            onRun={runMarketplaceInsights}
            onNavigate={() => router.push('/marketplace')}
            navigateLabel="Open Marketplace"
          >
            {results.marketplaceInsights && (
              <div className="mt-3 space-y-2">
                {(results.marketplaceInsights as InsightResult[]).map((ins, i) => (
                  <div key={i} className="text-xs bg-base-200 rounded-lg px-2.5 py-2">
                    <p className="font-medium text-base-content">{ins.title}</p>
                    <p className="text-base-content/50 mt-0.5 line-clamp-2">{ins.description}</p>
                  </div>
                ))}
              </div>
            )}
          </AIPanel>

          <AIPanel
            icon={<HiOutlineDocumentText className="w-5 h-5" />}
            color="violet"
            title="Listing Draft"
            description="Generate listing title, description, tags, and photo tips."
            state={runState.listingDraft ?? 'idle'}
            onRun={runListingDraft}
            onNavigate={() => router.push('/marketplace/listings/new')}
            navigateLabel="Create Listing"
          >
            {results.listingDraft && (
              <div className="mt-3 space-y-1.5">
                <p className="text-xs font-medium text-base-content line-clamp-1">
                  {(results.listingDraft as ListingDraft).title}
                </p>
                <p className="text-xs text-base-content/50 line-clamp-2">
                  {(results.listingDraft as ListingDraft).description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {(results.listingDraft as ListingDraft).tags?.slice(0, 4).map((tag, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </AIPanel>

          <AIPanel
            icon={<HiOutlineAcademicCap className="w-5 h-5" />}
            color="blue"
            title="Learning Coach"
            description="Personalized course recommendation based on your skills and goals."
            state={runState.learningCoach ?? 'idle'}
            onRun={runLearningCoach}
            onNavigate={() => router.push('/elearning')}
            navigateLabel="Open Learning"
          >
            {results.learningCoach && (
              <div className="mt-3 text-xs text-base-content/60 line-clamp-3">
                {(results.learningCoach as CoachResult).message}
              </div>
            )}
          </AIPanel>

          <AIPanel
            icon={<HiOutlineBanknotes className="w-5 h-5" />}
            color="emerald"
            title="Financing Coach"
            description="Understand your loan options and eligibility in plain language."
            state={runState.financingCoach ?? 'idle'}
            onRun={runFinancingCoach}
            onNavigate={() => router.push('/financing')}
            navigateLabel="Open Financing"
          >
            {results.financingCoach && (
              <div className="mt-3 text-xs text-base-content/60 line-clamp-3">
                {(results.financingCoach as CoachResult).message}
              </div>
            )}
          </AIPanel>
        </div>
      </section>

      {/* Bottom two columns: Actions feed + Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agent Actions Feed */}
        <section>
          <h2 className="text-sm font-semibold text-base-content/50 uppercase tracking-wide mb-4">
            Agent Action Log
          </h2>
          <div className="bg-base-100 rounded-2xl border border-base-300 overflow-hidden">
            {loadingFeed ? (
              <div className="p-6 space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3 animate-pulse">
                    <div className="w-8 h-8 rounded-lg bg-base-200 flex-shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-3 bg-base-200 rounded w-4/5" />
                      <div className="h-2.5 bg-base-200 rounded w-2/5" />
                    </div>
                  </div>
                ))}
              </div>
            ) : actions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                <div className="w-12 h-12 rounded-full bg-base-200 flex items-center justify-center mb-3">
                  <HiOutlineCpuChip className="w-6 h-6 text-base-content/40" />
                </div>
                <p className="text-sm font-medium text-base-content/80">No AI actions yet</p>
                <p className="text-xs text-base-content/40 mt-1">
                  Run one of the AI capabilities above to see actions here.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-stone-100">
                {actions.slice(0, 8).map((action) => (
                  <li key={action.id} className="flex items-start gap-3 px-4 py-3.5">
                    <span className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-base-200 flex items-center justify-center">
                      {actionTypeIcon[action.type]}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-base-content line-clamp-2">{action.message}</p>
                      <time className="text-xs text-base-content/40 mt-0.5 block">
                        {new Date(action.timestamp).toLocaleString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </time>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Recommendations */}
        <section>
          <h2 className="text-sm font-semibold text-base-content/50 uppercase tracking-wide mb-4">
            AI Recommendations
          </h2>
          <div className="bg-base-100 rounded-2xl border border-base-300 overflow-hidden">
            {loadingFeed ? (
              <div className="p-6 space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="animate-pulse space-y-2">
                    <div className="h-3 bg-base-200 rounded w-3/4" />
                    <div className="h-2.5 bg-base-200 rounded w-1/3" />
                  </div>
                ))}
              </div>
            ) : recommendations.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                <div className="w-12 h-12 rounded-full bg-base-200 flex items-center justify-center mb-3">
                  <HiOutlineSparkles className="w-6 h-6 text-base-content/40" />
                </div>
                <p className="text-sm font-medium text-base-content/80">No recommendations yet</p>
                <p className="text-xs text-base-content/40 mt-1">
                  Recommendations will appear here as the AI learns more about your journey.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-stone-100">
                {recommendations.map((rec) => (
                  <li key={rec.id} className="px-4 py-3.5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-base-content line-clamp-2">{rec.message}</p>
                        {rec.potentialBoost && (
                          <span className="mt-1 inline-block text-xs font-medium text-emerald-600 dark:text-emerald-400">
                            {rec.potentialBoost}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => router.push(`/${rec.targetSection}`)}
                        className="flex-shrink-0 flex items-center gap-1 text-xs font-medium text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors"
                      >
                        {rec.ctaLabel}
                        <HiOutlineArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

interface AIPanelProps {
  icon: React.ReactNode
  color: 'rose' | 'amber' | 'violet' | 'blue' | 'emerald'
  title: string
  description: string
  state: RunState
  onRun: () => void
  onNavigate: () => void
  navigateLabel: string
  children?: React.ReactNode
}

const colorMap = {
  rose: {
    bg: 'bg-rose-50 dark:bg-rose-950/40',
    icon: 'bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400',
    btn: 'bg-rose-600 hover:bg-rose-700 text-white',
    border: 'border-rose-200 dark:border-rose-800/50',
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    icon: 'bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400',
    btn: 'bg-amber-600 hover:bg-amber-700 text-white',
    border: 'border-amber-200 dark:border-amber-800/50',
  },
  violet: {
    bg: 'bg-violet-50 dark:bg-violet-950/40',
    icon: 'bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400',
    btn: 'bg-violet-600 hover:bg-violet-700 text-white',
    border: 'border-violet-200 dark:border-violet-800/50',
  },
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    icon: 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400',
    btn: 'bg-blue-600 hover:bg-blue-700 text-white',
    border: 'border-blue-200 dark:border-blue-800/50',
  },
  emerald: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    icon: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400',
    btn: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    border: 'border-emerald-200 dark:border-emerald-800/50',
  },
}

function RunStateIndicator({ state }: { state: RunState }) {
  if (state === 'loading') return <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
  if (state === 'done') return <HiOutlineCheckCircle className="w-4 h-4 text-emerald-500" />
  if (state === 'error') return <HiOutlineXCircle className="w-4 h-4 text-rose-500" />
  return <HiOutlineClock className="w-4 h-4 opacity-40" />
}

function AIPanel({ icon, color, title, description, state, onRun, onNavigate, navigateLabel, children }: AIPanelProps) {
  const c = colorMap[color]
  return (
    <div className={`rounded-2xl border ${c.border} ${c.bg} p-4 flex flex-col gap-3`}>
      {/* Header */}
      <div className="flex items-start gap-3">
        <span className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${c.icon}`}>
          {icon}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-base-content text-sm">{title}</h3>
            <RunStateIndicator state={state} />
          </div>
          <p className="text-xs text-base-content/50 mt-0.5 line-clamp-2">{description}</p>
        </div>
      </div>

      {/* Result area */}
      {children}

      {/* Error state */}
      {state === 'error' && (
        <div className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 rounded-lg px-2.5 py-2">
          <HiOutlineExclamationCircle className="w-4 h-4 flex-shrink-0" />
          AI service unavailable. Retry or check the feature directly.
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 mt-auto pt-1">
        <button
          onClick={onRun}
          disabled={state === 'loading'}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-medium transition-colors disabled:opacity-50 ${c.btn}`}
        >
          {state === 'loading' ? (
            <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          ) : (
            <HiOutlineSparkles className="w-3.5 h-3.5" />
          )}
          {state === 'loading' ? 'Running…' : 'Run AI'}
        </button>
        <button
          onClick={onNavigate}
          className="flex items-center gap-1 py-2 px-3 rounded-xl text-xs font-medium text-base-content/60 bg-base-100 border border-base-300 hover:bg-base-200 transition-colors"
        >
          {navigateLabel}
          <HiOutlineArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
