// =============================================================================
// Data Types
// =============================================================================

export type ValidationStatus = 'verified' | 'pending' | 'unverified' | 'auto-verified'

export type ValidationType = 'ai-assessment' | 'document' | 'video' | null

export type ProficiencyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert'

export type MarketDemand = 'low' | 'medium' | 'high' | 'very-high'

export type DemandTrend = 'falling' | 'stable' | 'rising'

export type SuggestionType = 'ai-recommended' | 'trending'

export interface EarningPotential {
  min: number
  max: number
  currency: string
  period: 'monthly' | 'weekly' | 'daily'
}

export interface Skill {
  id: string
  name: string
  category: string
  categoryId: string
  description: string
  validationStatus: ValidationStatus
  validationType: ValidationType
  proficiencyLevel: ProficiencyLevel
  yearsOfExperience: number
  earningPotential: EarningPotential
  marketDemand: MarketDemand
  demandTrend: DemandTrend
  relatedCourses: string[]
  relatedListings: string[]
  addedAt: string
  verifiedAt: string | null
}

export interface SkillCategory {
  id: string
  name: string
  icon: string
  description: string
  skillCount: number
  popularSkills: string[]
}

export interface SkillSuggestion {
  id: string
  skillName: string
  category: string
  categoryId: string
  suggestionType: SuggestionType
  reason: string
  marketDemand: MarketDemand
  earningPotential: EarningPotential
  matchScore?: number
  trendingRank?: number
}

export interface RelatedCourse {
  id: string
  title: string
  thumbnail: string
  duration: string
  level: string
  rating: number
  enrolledCount: number
}

export interface ValidationMethod {
  id: string
  type: ValidationType
  name: string
  description: string
  duration: string
  icon: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface SkillDiscoveryProps {
  /** The list of user's claimed skills */
  skills: Skill[]
  /** Skill categories for browsing */
  skillCategories: SkillCategory[]
  /** AI-recommended and trending skill suggestions */
  skillSuggestions: SkillSuggestion[]
  /** Related courses that can be linked from skills */
  relatedCourses: RelatedCourse[]
  /** Available validation methods */
  validationMethods: ValidationMethod[]

  // === Skill Actions ===
  /** Called when user wants to view skill details */
  onViewSkill?: (skillId: string) => void
  /** Called when user wants to delete/remove a skill */
  onDeleteSkill?: (skillId: string) => void
  /** Called when user wants to validate a skill (opens wizard) */
  onValidateSkill?: (skillId: string) => void
  /** Called when user wants to edit a skill */
  onEditSkill?: (skillId: string) => void

  // === Add Skill Actions ===
  /** Called when user searches for a skill to add */
  onSearchSkill?: (query: string) => void
  /** Called when user wants to add skill via AI conversation */
  onStartAIConversation?: () => void
  /** Called when user selects a category to browse */
  onBrowseCategory?: (categoryId: string) => void
  /** Called when user adds a skill from search/browse/suggestion */
  onAddSkill?: (skillName: string, categoryId: string) => void

  // === Suggestion Actions ===
  /** Called when user wants to add a suggested skill */
  onAddSuggestion?: (suggestionId: string) => void
  /** Called when user dismisses a suggestion */
  onDismissSuggestion?: (suggestionId: string) => void

  // === Navigation Actions ===
  /** Called when user wants to view a related course */
  onViewCourse?: (courseId: string) => void
  /** Called when user wants to view a related listing */
  onViewListing?: (listingId: string) => void
  /** Called when user clicks to go to eLearning (from empty state) */
  onNavigateToLearning?: () => void
}
