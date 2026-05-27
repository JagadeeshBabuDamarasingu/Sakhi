'use client'

import { useState } from 'react'
import type { SkillDiscoveryProps } from './types'
import { SkillCard } from './SkillCard'
import { SkillSuggestionCard } from './SkillSuggestionCard'
import { CategoryBrowser } from './CategoryBrowser'
import {
  LuSearch as Search,
  LuMessageCircle as MessageCircle,
  LuSparkles as Sparkles,
  LuTrendingUp as TrendingUp,
  LuPlus as Plus,
  LuBookOpen as BookOpen,
  LuArrowRight as ArrowRight,
} from 'react-icons/lu'

export function SkillDiscovery({
  skills,
  skillCategories,
  skillSuggestions,
  relatedCourses,
  validationMethods,
  onViewSkill,
  onDeleteSkill,
  onValidateSkill,
  onEditSkill,
  onSearchSkill,
  onStartAIConversation,
  onBrowseCategory,
  onAddSkill,
  onAddSuggestion,
  onDismissSuggestion,
  onViewCourse,
  onViewListing,
  onNavigateToLearning,
}: SkillDiscoveryProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestionTab, setSuggestionTab] = useState<'ai' | 'trending'>('ai')
  const [showCategories, setShowCategories] = useState(false)

  const aiSuggestions = skillSuggestions.filter((s) => s.suggestionType === 'ai-recommended')
  const trendingSuggestions = skillSuggestions.filter((s) => s.suggestionType === 'trending')
  const displayedSuggestions = suggestionTab === 'ai' ? aiSuggestions : trendingSuggestions

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      onSearchSkill?.(searchQuery)
    }
  }

  // Empty state
  if (skills.length === 0) {
    return (
      <div className="p-6 sm:p-8">
        <div className="max-w-2xl mx-auto text-center py-12">
          {/* Illustration */}
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary/15 to-secondary/15 flex items-center justify-center">
            <Sparkles className="w-16 h-16 text-primary" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-base-content mb-3">
            Discover Your Skills
          </h1>
          <p className="text-base-content/60 mb-8 max-w-md mx-auto">
            Every woman has valuable skills. Let's identify yours and help you earn from them.
            Add skills you already have or learn new ones.
          </p>

          {/* Action Cards */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <button
              onClick={onStartAIConversation}
              className="flex items-center gap-4 p-5 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all text-left group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center shadow-lg shadow-primary/20">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-base-content group-hover:text-primary transition-colors">
                  Chat with AI
                </h3>
                <p className="text-sm text-base-content/60">
                  Tell us about yourself
                </p>
              </div>
            </button>

            <button
              onClick={onNavigateToLearning}
              className="flex items-center gap-4 p-5 bg-gradient-to-br from-secondary/10 to-amber-100/50 dark:to-amber-900/10 rounded-2xl border border-secondary/20 hover:border-secondary/40 transition-all text-left group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-secondary/20">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-base-content group-hover:text-secondary transition-colors">
                  Learn New Skills
                </h3>
                <p className="text-sm text-base-content/60">
                  Explore courses & bootcamps
                </p>
              </div>
            </button>
          </div>

          {/* Or browse */}
          <button
            onClick={() => setShowCategories(true)}
            className="text-primary font-medium hover:underline"
          >
            Browse skill categories <ArrowRight className="inline w-4 h-4 ml-1" />
          </button>

          {/* Category Browser Modal/Sheet */}
          {showCategories && (
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4">
              <div className="w-full max-w-lg max-h-[80vh] overflow-auto bg-base-100 rounded-t-2xl sm:rounded-2xl">
                <div className="sticky top-0 flex items-center justify-between p-4 border-b border-base-300 bg-base-100">
                  <h2 className="font-semibold text-base-content">
                    Skill Categories
                  </h2>
                  <button
                    onClick={() => setShowCategories(false)}
                    className="p-2 text-base-content/60 hover:text-base-content"
                  >
                    ✕
                  </button>
                </div>
                <CategoryBrowser
                  categories={skillCategories}
                  onSelectCategory={(id) => {
                    onBrowseCategory?.(id)
                    setShowCategories(false)
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 sm:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-base-content">
          My Skills
        </h1>
        <p className="text-base-content/60 mt-1">
          {skills.length} skill{skills.length !== 1 ? 's' : ''} added to your profile
        </p>
      </div>

      {/* Add Skill Section */}
      <div className="bg-gradient-to-r from-primary/5 via-base-100 to-secondary/5 rounded-2xl border border-base-300 p-5 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
              <input
                type="text"
                placeholder="Search for a skill to add..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-base-100 border border-base-300 text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
            </div>
          </form>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <button
              onClick={onStartAIConversation}
              aria-label="AI Chat"
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-content font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="hidden sm:inline">AI Chat</span>
            </button>

            <button
              onClick={() => setShowCategories(true)}
              aria-label="Browse"
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-base-100 text-base-content font-medium border border-base-300 hover:border-primary/40 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Browse</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Skills Grid */}
        <div className="lg:col-span-2">
          <div className="grid sm:grid-cols-2 gap-4">
            {skills.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                relatedCourses={relatedCourses}
                onView={() => onViewSkill?.(skill.id)}
                onEdit={() => onEditSkill?.(skill.id)}
                onDelete={() => onDeleteSkill?.(skill.id)}
                onValidate={() => onValidateSkill?.(skill.id)}
                onViewCourse={onViewCourse}
                onViewListing={onViewListing}
              />
            ))}
          </div>
        </div>

        {/* Sidebar - Suggestions */}
        <div className="space-y-6">
          {/* Suggestions */}
          <div className="bg-base-100 rounded-2xl border border-base-300 overflow-hidden">
            <div className="p-4 border-b border-base-300">
              <h3 className="font-semibold text-base-content mb-3">
                Suggested for You
              </h3>

              {/* Tabs */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSuggestionTab('ai')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    suggestionTab === 'ai'
                      ? 'bg-primary/15 text-primary'
                      : 'text-base-content/60 hover:bg-base-200'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  AI Picks
                </button>
                <button
                  onClick={() => setSuggestionTab('trending')}
                  aria-label="Trending"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    suggestionTab === 'trending'
                      ? 'bg-secondary/20 text-secondary'
                      : 'text-base-content/60 hover:bg-base-200'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  Trending
                </button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              {displayedSuggestions.length === 0 ? (
                <p className="text-sm text-base-content/60 text-center py-4">
                  No suggestions yet — keep building your profile!
                </p>
              ) : (
                displayedSuggestions.map((suggestion) => (
                  <SkillSuggestionCard
                    key={suggestion.id}
                    suggestion={suggestion}
                    onAdd={() => onAddSuggestion?.(suggestion.id)}
                    onDismiss={() => onDismissSuggestion?.(suggestion.id)}
                  />
                ))
              )}
            </div>
          </div>

          {/* Category Browser (collapsed by default on desktop) */}
          <div className="hidden lg:block">
            <CategoryBrowser categories={skillCategories} onSelectCategory={onBrowseCategory} />
          </div>
        </div>
      </div>

      {/* Category Browser Modal */}
      {showCategories && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg max-h-[80vh] overflow-auto bg-base-100 rounded-t-2xl sm:rounded-2xl">
            <div className="sticky top-0 flex items-center justify-between p-4 border-b border-base-300 bg-base-100">
              <h2 className="font-semibold text-base-content">Skill Categories</h2>
              <button
                onClick={() => setShowCategories(false)}
                className="p-2 text-base-content/60 hover:text-base-content"
              >
                ✕
              </button>
            </div>
            <CategoryBrowser
              categories={skillCategories}
              onSelectCategory={(id) => {
                onBrowseCategory?.(id)
                setShowCategories(false)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
