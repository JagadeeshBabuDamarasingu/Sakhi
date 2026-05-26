'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SkillDiscovery } from './SkillDiscovery'
import type { Skill, SkillCategory, SkillSuggestion, RelatedCourse, ValidationMethod } from './types'
import type { AiToolCall } from '@/lib/ai/types'
import { HiOutlineSparkles, HiOutlinePaperAirplane, HiOutlineXMark, HiOutlineCheckCircle, HiOutlineExclamationCircle } from 'react-icons/hi2'

interface SkillDiscoveryData {
  skills: Skill[]
  skillCategories: SkillCategory[]
  skillSuggestions: SkillSuggestion[]
  relatedCourses: RelatedCourse[]
  validationMethods: ValidationMethod[]
}

interface AIMessage {
  role: 'user' | 'assistant'
  content: string
}

export function SkillDiscoveryClient({ data }: { data: SkillDiscoveryData }) {
  const router = useRouter()
  const [skills, setSkills] = useState(data.skills)
  const [skillSuggestions, setSkillSuggestions] = useState(data.skillSuggestions)
  const [aiOpen, setAiOpen] = useState(false)
  const [messages, setMessages] = useState<AIMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [pendingToolCall, setPendingToolCall] = useState<AiToolCall | null>(null)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [addedSkillName, setAddedSkillName] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleStartAIConversation = useCallback(() => {
    setAiOpen(true)
    setMessages([
      {
        role: 'assistant',
        content:
          'Hello! I can help identify skills you can earn from. Tell me about your daily activities, hobbies, or what kind of work you do at home.',
      },
    ])
  }, [])

  const handleSend = useCallback(async () => {
    if (!input.trim() || loading) return

    const userMsg = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }])
    setLoading(true)

    try {
      const res = await fetch('/api/ai/skill-discovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      })

      if (!res.ok) throw new Error('Skill discovery failed')

      const result = await res.json()
      setSessionId(result.session.id)
      setMessages((prev) => [...prev, { role: 'assistant', content: result.message }])

      if (result.suggestions?.length > 0) {
        const newSuggestions: SkillSuggestion[] = result.suggestions.map(
          (s: { id: string; skillName: string; category: string; categoryId: string; reason: string; marketDemand: string; earningPotential: { min: number; max: number; currency: string; period: string }; matchScore: number }) => ({
            id: s.id,
            skillName: s.skillName,
            category: s.category,
            categoryId: s.categoryId,
            suggestionType: 'ai-recommended' as const,
            reason: s.reason,
            marketDemand: s.marketDemand,
            earningPotential: s.earningPotential,
            matchScore: Math.round(s.matchScore * 100),
          })
        )
        setSkillSuggestions((prev) => [...newSuggestions, ...prev])
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'I could not reach the AI service right now. You can browse skill categories or add skills manually.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }, [input, loading])

  const handleAddSuggestion = useCallback(
    async (suggestionId: string) => {
      const suggestion = skillSuggestions.find((s) => s.id === suggestionId)
      if (!suggestion) return

      let activeSessionId = sessionId
      if (!activeSessionId) {
        const sessionRes = await fetch('/api/ai/sessions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ purpose: 'skill-discovery' }),
        })
        if (!sessionRes.ok) return
        const session = await sessionRes.json()
        activeSessionId = session.id
        setSessionId(activeSessionId)
      }

      const msgRes = await fetch(`/api/ai/sessions/${activeSessionId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `Add ${suggestion.skillName} to my profile`,
          requestedTool: {
            toolName: 'add_skill',
            arguments: { skillName: suggestion.skillName, categoryId: suggestion.categoryId },
          },
        }),
      })

      if (!msgRes.ok) return
      const response = await msgRes.json()
      const toolCall = response.toolCalls?.[0]
      if (toolCall) {
        setPendingToolCall(toolCall)
      }
    },
    [skillSuggestions, sessionId]
  )

  const handleConfirmAddSkill = useCallback(async () => {
    if (!pendingToolCall) return
    setConfirmLoading(true)

    try {
      const res = await fetch(`/api/ai/tool-calls/${pendingToolCall.id}/confirm`, {
        method: 'POST',
      })
      if (!res.ok) throw new Error('Confirm failed')
      const confirmed = await res.json()
      const result = confirmed.result as { skillName: string; categoryId: string; saved: boolean } | null

      if (result?.saved) {
        setAddedSkillName(result.skillName)
        const newSkill: Skill = {
          id: `skill-${Date.now()}`,
          name: result.skillName,
          category:
            data.skillCategories.find((c) => c.id === result.categoryId)?.name ?? 'General',
          categoryId: result.categoryId,
          description: `${result.skillName} skill added via AI.`,
          validationStatus: 'unverified',
          validationType: null,
          proficiencyLevel: 'beginner',
          yearsOfExperience: 0,
          earningPotential: { min: 5000, max: 15000, currency: 'INR', period: 'monthly' },
          marketDemand: 'medium',
          demandTrend: 'stable',
          relatedCourses: [],
          relatedListings: [],
          addedAt: new Date().toISOString(),
          verifiedAt: null,
        }
        setSkills((prev) => [newSkill, ...prev])
        setSkillSuggestions((prev) => prev.filter((s) => s.skillName !== result.skillName))
      }
    } catch {
      // keep modal open so user can retry
    } finally {
      setConfirmLoading(false)
      setPendingToolCall(null)
    }
  }, [pendingToolCall, data.skillCategories])

  const handleCancelToolCall = useCallback(async () => {
    if (!pendingToolCall) return
    await fetch(`/api/ai/tool-calls/${pendingToolCall.id}/cancel`, { method: 'POST' }).catch(() => {})
    setPendingToolCall(null)
  }, [pendingToolCall])

  return (
    <>
      <SkillDiscovery
        skills={skills}
        skillCategories={data.skillCategories}
        skillSuggestions={skillSuggestions}
        relatedCourses={data.relatedCourses}
        validationMethods={data.validationMethods}
        onStartAIConversation={handleStartAIConversation}
        onAddSuggestion={handleAddSuggestion}
        onDismissSuggestion={(id) =>
          setSkillSuggestions((prev) => prev.filter((s) => s.id !== id))
        }
        onNavigateToLearning={() => router.push('/elearning')}
        onViewCourse={(id) => router.push(`/elearning/courses/${id}`)}
        onViewListing={(id) => router.push(`/marketplace/listings/${id}`)}
        onViewSkill={(id) => router.push(`/skill-discovery/${id}`)}
        onDeleteSkill={(id) => setSkills((prev) => prev.filter((s) => s.id !== id))}
        onAddSkill={(name, catId) => {
          const category = data.skillCategories.find((c) => c.id === catId)
          const newSkill: Skill = {
            id: `skill-${Date.now()}`,
            name,
            category: category?.name ?? 'General',
            categoryId: catId,
            description: `${name} skill.`,
            validationStatus: 'unverified',
            validationType: null,
            proficiencyLevel: 'beginner',
            yearsOfExperience: 0,
            earningPotential: { min: 5000, max: 15000, currency: 'INR', period: 'monthly' },
            marketDemand: 'medium',
            demandTrend: 'stable',
            relatedCourses: [],
            relatedListings: [],
            addedAt: new Date().toISOString(),
            verifiedAt: null,
          }
          setSkills((prev) => [newSkill, ...prev])
        }}
        onBrowseCategory={(catId) => router.push(`/skill-discovery?category=${catId}`)}
        onSearchSkill={(q) => router.push(`/skill-discovery?q=${encodeURIComponent(q)}`)}
      />

      {/* AI Chat Modal */}
      {aiOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
          <div className="w-full max-w-md bg-white dark:bg-stone-900 rounded-2xl shadow-2xl flex flex-col max-h-[85vh]">
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-stone-200 dark:border-stone-800">
              <span className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/60 flex items-center justify-center">
                <HiOutlineSparkles className="w-4 h-4 text-rose-500" />
              </span>
              <span className="flex-1 font-semibold text-stone-900 dark:text-stone-100 text-sm">
                Skill Discovery — AI Chat
              </span>
              <button
                onClick={() => setAiOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                aria-label="Close"
              >
                <HiOutlineXMark className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-rose-500 text-white rounded-br-sm'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-bl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-stone-100 dark:bg-stone-800 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce [animation-delay:120ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce [animation-delay:240ms]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-800 rounded-xl px-3 py-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                  placeholder="Tell me about your skills…"
                  className="flex-1 bg-transparent text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                  className="p-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white disabled:opacity-40 transition-colors"
                  aria-label="Send"
                >
                  <HiOutlinePaperAirplane className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for add_skill */}
      {pendingToolCall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
          <div className="w-full max-w-sm bg-white dark:bg-stone-900 rounded-2xl shadow-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center">
                <HiOutlineExclamationCircle className="w-5 h-5 text-amber-500" />
              </span>
              <div>
                <p className="text-xs font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                  AI Action · Needs Confirmation
                </p>
                <p className="font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
                  Add Skill to Profile
                </p>
              </div>
            </div>

            <p className="text-sm text-stone-600 dark:text-stone-400 mb-1">
              <strong className="text-stone-900 dark:text-stone-100">
                {String(pendingToolCall.arguments.skillName ?? '')}
              </strong>{' '}
              will be added to your skill profile. You can edit or remove it later.
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-500 mb-5">
              This is a medium-risk action. Your profile will be updated.
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleCancelToolCall}
                className="flex-1 px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAddSkill}
                disabled={confirmLoading}
                className="flex-1 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
              >
                {confirmLoading ? (
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  <HiOutlineCheckCircle className="w-4 h-4" />
                )}
                Confirm &amp; Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success toast */}
      {addedSkillName && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-xl shadow-lg text-sm font-medium animate-in fade-in slide-in-from-bottom-4"
          onAnimationEnd={() => setTimeout(() => setAddedSkillName(null), 2500)}
        >
          <HiOutlineCheckCircle className="w-5 h-5" />
          {addedSkillName} added to your profile
        </div>
      )}
    </>
  )
}
