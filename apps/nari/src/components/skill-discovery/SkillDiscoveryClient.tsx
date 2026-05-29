'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SkillDiscovery } from './SkillDiscovery'
import type { Skill, SkillCategory, SkillSuggestion, RelatedCourse, ValidationMethod, ValidationType, ProficiencyLevel } from './types'
import type { AiToolCall } from '@/lib/ai/types'
import {
  HiOutlineSparkles,
  HiOutlinePaperAirplane,
  HiOutlineXMark,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineDocumentText,
  HiOutlineVideoCamera,
  HiOutlineCloudArrowUp,
} from 'react-icons/hi2'

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

type ValidationStep = 'select-method' | 'complete' | 'success'

const PROFICIENCY_LEVELS: ProficiencyLevel[] = ['beginner', 'intermediate', 'advanced', 'expert']

const methodIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'ai-assessment': HiOutlineSparkles,
  document: HiOutlineDocumentText,
  video: HiOutlineVideoCamera,
}

export function SkillDiscoveryClient({ data }: { data: SkillDiscoveryData }) {
  const router = useRouter()
  const [skills, setSkills] = useState(data.skills)
  const [skillSuggestions, setSkillSuggestions] = useState(data.skillSuggestions)

  // AI chat state
  const [aiOpen, setAiOpen] = useState(false)
  const [messages, setMessages] = useState<AIMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [pendingToolCall, setPendingToolCall] = useState<AiToolCall | null>(null)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [addedSkillName, setAddedSkillName] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Validation wizard state
  const [validatingSkillId, setValidatingSkillId] = useState<string | null>(null)
  const [validationStep, setValidationStep] = useState<ValidationStep>('select-method')
  const [selectedMethod, setSelectedMethod] = useState<ValidationMethod | null>(null)
  const [validationLoading, setValidationLoading] = useState(false)
  const [aiAnswers, setAiAnswers] = useState<string[]>(['', '', ''])
  const [docFile, setDocFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState('')

  // Edit skill state
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null)
  const [editProficiency, setEditProficiency] = useState<ProficiencyLevel>('beginner')
  const [editYears, setEditYears] = useState(0)
  const [editDescription, setEditDescription] = useState('')
  const [editLoading, setEditLoading] = useState(false)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const validatingSkill = skills.find((s) => s.id === validatingSkillId) ?? null
  const editingSkill = skills.find((s) => s.id === editingSkillId) ?? null

  // === AI Chat ===

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
      const res = await fetch('/api/ai/skills', {
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

  // === Suggestion Management ===

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

  // === Delete Skill ===

  const handleDeleteSkill = useCallback(async (skillId: string) => {
    setSkills((prev) => prev.filter((s) => s.id !== skillId))
    await fetch(`/api/skills/${skillId}`, { method: 'DELETE' }).catch(() => {})
  }, [])

  // === Validation Wizard ===

  const handleOpenValidation = useCallback((skillId: string) => {
    setValidatingSkillId(skillId)
    setValidationStep('select-method')
    setSelectedMethod(null)
    setAiAnswers(['', '', ''])
    setDocFile(null)
    setVideoUrl('')
  }, [])

  const handleSelectMethod = useCallback((method: ValidationMethod) => {
    setSelectedMethod(method)
    setValidationStep('complete')
  }, [])

  const handleSubmitValidation = useCallback(async () => {
    if (!validatingSkillId || !selectedMethod) return
    setValidationLoading(true)

    try {
      const res = await fetch(`/api/skills/${validatingSkillId}/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: selectedMethod.type }),
      })
      if (!res.ok) throw new Error('Validation failed')
      const updated: Skill = await res.json()
      setSkills((prev) => prev.map((s) => (s.id === updated.id ? updated : s)))
      setValidationStep('success')
    } catch {
      // stay on step so user can retry
    } finally {
      setValidationLoading(false)
    }
  }, [validatingSkillId, selectedMethod])

  const handleCloseValidation = useCallback(() => {
    setValidatingSkillId(null)
    setValidationStep('select-method')
    setSelectedMethod(null)
  }, [])

  // === Edit Skill ===

  const handleOpenEdit = useCallback(
    (skillId: string) => {
      const skill = skills.find((s) => s.id === skillId)
      if (!skill) return
      setEditingSkillId(skillId)
      setEditProficiency(skill.proficiencyLevel)
      setEditYears(skill.yearsOfExperience)
      setEditDescription(skill.description)
    },
    [skills]
  )

  const handleSaveEdit = useCallback(async () => {
    if (!editingSkillId) return
    setEditLoading(true)

    try {
      const res = await fetch(`/api/skills/${editingSkillId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proficiencyLevel: editProficiency,
          yearsOfExperience: editYears,
          description: editDescription,
        }),
      })
      if (!res.ok) throw new Error('Update failed')
      const updated: Skill = await res.json()
      setSkills((prev) => prev.map((s) => (s.id === updated.id ? updated : s)))
      setEditingSkillId(null)
    } catch {
      // keep modal open so user can retry
    } finally {
      setEditLoading(false)
    }
  }, [editingSkillId, editProficiency, editYears, editDescription])

  const aiAssessmentQuestions = validatingSkill
    ? [
        `How long have you been practicing ${validatingSkill.name}?`,
        `Describe a recent project where you used ${validatingSkill.name}.`,
        `What makes your ${validatingSkill.name} skill stand out in the market?`,
      ]
    : []

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
        onNavigateToLearning={() => router.push('/learn')}
        onViewCourse={(id) => router.push(`/learn/courses/${id}`)}
        onViewListing={(id) => router.push(`/marketplace/listings/${id}`)}
        onViewSkill={(id) => router.push(`/skills/${id}`)}
        onDeleteSkill={handleDeleteSkill}
        onValidateSkill={handleOpenValidation}
        onEditSkill={handleOpenEdit}
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
        onBrowseCategory={(catId) => router.push(`/skills?category=${catId}`)}
        onSearchSkill={(q) => router.push(`/skills?q=${encodeURIComponent(q)}`)}
      />

      {/* ──────────────── AI Chat Modal ──────────────── */}
      {aiOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
          <div className="w-full max-w-md bg-base-100 rounded-2xl shadow-2xl flex flex-col max-h-[85vh]">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-base-300">
              <span className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                <HiOutlineSparkles className="w-4 h-4 text-primary" />
              </span>
              <span className="flex-1 font-semibold text-base-content text-sm">
                Skill Discovery — AI Chat
              </span>
              <button
                onClick={() => setAiOpen(false)}
                className="p-1.5 rounded-lg text-base-content/40 hover:text-base-content hover:bg-base-200 transition-colors"
                aria-label="Close"
              >
                <HiOutlineXMark className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-content rounded-br-sm'
                        : 'bg-base-200 text-base-content rounded-bl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-base-200 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-base-content/40 animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-base-content/40 animate-bounce [animation-delay:120ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-base-content/40 animate-bounce [animation-delay:240ms]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="px-3 py-3 border-t border-base-300">
              <div className="flex items-center gap-2 bg-base-200 rounded-xl px-3 py-2">
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
                  className="flex-1 bg-transparent text-sm text-base-content placeholder-base-content/40 focus:outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                  className="p-1.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-content disabled:opacity-40 transition-colors"
                  aria-label="Send"
                >
                  <HiOutlinePaperAirplane className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────── AI Confirmation Modal ──────────────── */}
      {pendingToolCall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
          <div className="w-full max-w-sm bg-base-100 rounded-2xl shadow-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                <HiOutlineExclamationCircle className="w-5 h-5 text-secondary" />
              </span>
              <div>
                <p className="text-xs font-medium text-secondary uppercase tracking-wide">
                  AI Action · Needs Confirmation
                </p>
                <p className="font-semibold text-base-content mt-0.5">
                  Add Skill to Profile
                </p>
              </div>
            </div>

            <p className="text-sm text-base-content/70 mb-1">
              <strong className="text-base-content">
                {String(pendingToolCall.arguments.skillName ?? '')}
              </strong>{' '}
              will be added to your skill profile. You can edit or remove it later.
            </p>
            <p className="text-xs text-base-content/60 mb-5">
              This is a medium-risk action. Your profile will be updated.
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleCancelToolCall}
                className="btn btn-outline flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAddSkill}
                disabled={confirmLoading}
                className="btn btn-primary flex-1"
              >
                {confirmLoading ? (
                  <span className="w-4 h-4 border-2 border-primary-content/40 border-t-primary-content rounded-full animate-spin" />
                ) : (
                  <HiOutlineCheckCircle className="w-4 h-4" />
                )}
                Confirm &amp; Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────── Validation Wizard ──────────────── */}
      {validatingSkillId && validatingSkill && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
          <div className="w-full max-w-md bg-base-100 rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-base-300">
              <div className="flex-1">
                <p className="text-xs text-base-content/60 uppercase tracking-wide font-medium">
                  Validate Skill
                </p>
                <p className="font-semibold text-base-content">
                  {validatingSkill.name}
                </p>
              </div>
              <button
                onClick={handleCloseValidation}
                aria-label="Close validation wizard"
                className="p-1.5 rounded-lg text-base-content/40 hover:text-base-content hover:bg-base-200 transition-colors"
              >
                <HiOutlineXMark className="w-5 h-5" />
              </button>
            </div>

            {/* Step: select method */}
            {validationStep === 'select-method' && (
              <div className="p-5">
                <p className="text-sm text-base-content/70 mb-4">
                  Choose how you'd like to verify this skill:
                </p>
                <div className="space-y-3">
                  {data.validationMethods.map((method) => {
                    const Icon = methodIcons[method.type ?? ''] ?? HiOutlineDocumentText
                    return (
                      <button
                        key={method.id}
                        onClick={() => handleSelectMethod(method)}
                        className="w-full flex items-center gap-4 p-4 rounded-xl border border-base-300 hover:border-primary/40 hover:bg-primary/10 transition-all text-left group"
                      >
                        <span className="w-10 h-10 rounded-lg bg-base-200 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                          <Icon className="w-5 h-5 text-base-content/70 group-hover:text-primary" />
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-base-content">
                            {method.name}
                          </p>
                          <p className="text-sm text-base-content/60">
                            {method.description} · {method.duration}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Step: complete validation */}
            {validationStep === 'complete' && selectedMethod && (
              <div className="p-5">
                <button
                  onClick={() => setValidationStep('select-method')}
                  className="text-xs text-base-content/60 hover:text-base-content mb-4 flex items-center gap-1"
                >
                  ← Back
                </button>

                <p className="font-medium text-base-content mb-4">
                  {selectedMethod.name}
                </p>

                {selectedMethod.type === 'ai-assessment' && (
                  <div className="space-y-4">
                    {aiAssessmentQuestions.map((question, i) => (
                      <div key={i}>
                        <label className="block text-sm font-medium text-base-content mb-1.5">
                          {i + 1}. {question}
                        </label>
                        <textarea
                          rows={2}
                          value={aiAnswers[i]}
                          onChange={(e) => {
                            const next = [...aiAnswers]
                            next[i] = e.target.value
                            setAiAnswers(next)
                          }}
                          placeholder="Your answer…"
                          className="textarea textarea-bordered w-full text-sm placeholder:text-base-content/40 focus:ring-2 focus:ring-primary/50 resize-none"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {selectedMethod.type === 'document' && (
                  <div>
                    <label
                      htmlFor="doc-upload"
                      className="flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed border-base-300 hover:border-primary/40 cursor-pointer transition-colors bg-base-200"
                    >
                      <HiOutlineCloudArrowUp className="w-8 h-8 text-base-content/40 mb-2" />
                      <span className="text-sm text-base-content/70">
                        {docFile ? docFile.name : 'Click to upload certificate or portfolio'}
                      </span>
                      <span className="text-xs text-base-content/40 mt-1">PDF, JPG, PNG up to 10 MB</span>
                    </label>
                    <input
                      id="doc-upload"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="sr-only"
                      onChange={(e) => setDocFile(e.target.files?.[0] ?? null)}
                    />
                  </div>
                )}

                {selectedMethod.type === 'video' && (
                  <div>
                    <label className="block text-sm font-medium text-base-content mb-1.5">
                      Video URL
                    </label>
                    <input
                      type="url"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="https://youtube.com/..."
                      className="input input-bordered w-full text-sm placeholder:text-base-content/40 focus:ring-2 focus:ring-primary/50"
                    />
                    <p className="text-xs text-base-content/60 mt-1.5">
                      Link a short video (YouTube, Drive, or direct URL) showing your work.
                    </p>
                  </div>
                )}

                <button
                  onClick={handleSubmitValidation}
                  disabled={validationLoading}
                  className="btn btn-primary w-full mt-6"
                >
                  {validationLoading ? (
                    <span className="w-4 h-4 border-2 border-primary-content/40 border-t-primary-content rounded-full animate-spin" />
                  ) : (
                    'Submit for Review'
                  )}
                </button>
              </div>
            )}

            {/* Step: success */}
            {validationStep === 'success' && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-4">
                  <HiOutlineCheckCircle className="w-8 h-8 text-success" />
                </div>
                <h3 className="font-semibold text-base-content mb-2">
                  Submitted for Review
                </h3>
                <p className="text-sm text-base-content/70 mb-6">
                  Your {validatingSkill.name} skill is now <strong>Pending</strong> review. You'll
                  be notified once it's verified.
                </p>
                <button
                  onClick={handleCloseValidation}
                  className="btn btn-primary px-6"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ──────────────── Edit Skill Modal ──────────────── */}
      {editingSkillId && editingSkill && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
          <div className="w-full max-w-sm bg-base-100 rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-base-300">
              <div className="flex-1">
                <p className="text-xs text-base-content/60 uppercase tracking-wide font-medium">
                  Edit Skill
                </p>
                <p className="font-semibold text-base-content">
                  {editingSkill.name}
                </p>
              </div>
              <button
                onClick={() => setEditingSkillId(null)}
                aria-label="Close edit"
                className="p-1.5 rounded-lg text-base-content/40 hover:text-base-content hover:bg-base-200 transition-colors"
              >
                <HiOutlineXMark className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-base-content mb-1.5">
                  Proficiency Level
                </label>
                <select
                  value={editProficiency}
                  onChange={(e) => setEditProficiency(e.target.value as ProficiencyLevel)}
                  className="select select-bordered w-full text-sm focus:ring-2 focus:ring-primary/50 capitalize"
                >
                  {PROFICIENCY_LEVELS.map((level) => (
                    <option key={level} value={level} className="capitalize">
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-base-content mb-1.5">
                  Years of Experience
                </label>
                <input
                  type="number"
                  min={0}
                  max={50}
                  value={editYears}
                  onChange={(e) => setEditYears(Number(e.target.value))}
                  className="input input-bordered w-full text-sm focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-base-content mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="textarea textarea-bordered w-full text-sm placeholder:text-base-content/40 focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>
            </div>

            <div className="px-5 pb-5 flex gap-3">
              <button
                onClick={() => setEditingSkillId(null)}
                className="btn btn-outline flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={editLoading}
                className="btn btn-primary flex-1"
              >
                {editLoading ? (
                  <span className="w-4 h-4 border-2 border-primary-content/40 border-t-primary-content rounded-full animate-spin" />
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────── Success Toast ──────────────── */}
      {addedSkillName && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-3 bg-success text-white rounded-xl shadow-lg text-sm font-medium animate-in fade-in slide-in-from-bottom-4"
          onAnimationEnd={() => setTimeout(() => setAddedSkillName(null), 2500)}
        >
          <HiOutlineCheckCircle className="w-5 h-5" />
          {addedSkillName} added to your profile
        </div>
      )}
    </>
  )
}
