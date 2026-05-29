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
