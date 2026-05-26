import type {
  Skill,
  SkillCategory,
  SkillSuggestion,
  RelatedCourse,
  ValidationMethod,
} from '@/components/skill-discovery/types'

export const mockVerifiedSkill: Skill = {
  id: 'skill-001',
  name: 'Mehndi Art',
  category: 'Art & Craft',
  categoryId: 'art-craft',
  description: 'Traditional Indian henna design art',
  validationStatus: 'verified',
  validationType: 'document',
  proficiencyLevel: 'advanced',
  yearsOfExperience: 5,
  earningPotential: { min: 8000, max: 25000, currency: 'INR', period: 'monthly' },
  marketDemand: 'high',
  demandTrend: 'rising',
  relatedCourses: ['course-001'],
  relatedListings: ['listing-001'],
  addedAt: '2025-12-01',
  verifiedAt: '2025-12-05',
}

export const mockPendingSkill: Skill = {
  ...mockVerifiedSkill,
  id: 'skill-002',
  name: 'Block Printing',
  validationStatus: 'pending',
  validationType: null,
  verifiedAt: null,
}

export const mockUnverifiedSkill: Skill = {
  ...mockVerifiedSkill,
  id: 'skill-003',
  name: 'Pottery',
  validationStatus: 'unverified',
  validationType: null,
  verifiedAt: null,
}

export const mockSkills: Skill[] = [mockVerifiedSkill, mockPendingSkill, mockUnverifiedSkill]

export const mockCategories: SkillCategory[] = [
  {
    id: 'art-craft',
    name: 'Art & Craft',
    icon: 'palette',
    description: 'Creative arts and crafts',
    skillCount: 15,
    popularSkills: ['Mehndi Art', 'Painting', 'Block Printing'],
  },
  {
    id: 'fashion-apparel',
    name: 'Fashion & Apparel',
    icon: 'scissors',
    description: 'Tailoring and fashion skills',
    skillCount: 12,
    popularSkills: ['Tailoring', 'Embroidery', 'Knitting'],
  },
]

export const mockAiSuggestion: SkillSuggestion = {
  id: 'sugg-001',
  skillName: 'Tailoring & Stitching',
  category: 'Fashion & Apparel',
  categoryId: 'fashion-apparel',
  suggestionType: 'ai-recommended',
  reason: 'Based on your location and existing craft skills',
  marketDemand: 'very-high',
  earningPotential: { min: 12000, max: 35000, currency: 'INR', period: 'monthly' },
  matchScore: 92,
}

export const mockTrendingSuggestion: SkillSuggestion = {
  id: 'sugg-002',
  skillName: 'Digital Marketing',
  category: 'Technology',
  categoryId: 'technology',
  suggestionType: 'trending',
  reason: 'Highly demanded in your area',
  marketDemand: 'high',
  earningPotential: { min: 20000, max: 50000, currency: 'INR', period: 'monthly' },
  trendingRank: 3,
}

export const mockSuggestions: SkillSuggestion[] = [mockAiSuggestion, mockTrendingSuggestion]

export const mockRelatedCourses: RelatedCourse[] = [
  {
    id: 'course-001',
    title: 'Advanced Mehndi Techniques',
    thumbnail: '/images/mehndi.jpg',
    duration: '2h',
    level: 'intermediate',
    rating: 4.8,
    enrolledCount: 5000,
  },
]

export const mockValidationMethods: ValidationMethod[] = [
  {
    id: 'vm-001',
    type: 'ai-assessment',
    name: 'AI Assessment',
    description: 'Answer skill-related questions to verify your expertise',
    duration: '10-15 minutes',
    icon: 'sparkles',
  },
  {
    id: 'vm-002',
    type: 'document',
    name: 'Document Upload',
    description: 'Upload certificates, samples, or portfolio items',
    duration: 'Instant',
    icon: 'file',
  },
]

export const defaultProps = {
  skills: mockSkills,
  skillCategories: mockCategories,
  skillSuggestions: mockSuggestions,
  relatedCourses: mockRelatedCourses,
  validationMethods: mockValidationMethods,
}
