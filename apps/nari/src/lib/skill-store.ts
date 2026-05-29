import sampleData from '@/data/skill-data.json'
import type {
  Skill,
  SkillCategory,
  SkillSuggestion,
  RelatedCourse,
  ValidationMethod,
} from '@/components/skill-discovery/types'

type SkillSeed = {
  skills: Skill[]
  skillCategories: SkillCategory[]
  skillSuggestions: SkillSuggestion[]
  relatedCourses: RelatedCourse[]
}

const seed = sampleData as unknown as SkillSeed

let skills = [...seed.skills]
const skillCategories = seed.skillCategories
const skillSuggestions = [...seed.skillSuggestions]
const relatedCourses = seed.relatedCourses

const validationMethods: ValidationMethod[] = [
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
    type: 'video',
    name: 'Video Demonstration',
    description: 'Upload a short video showing your work',
    duration: '2-5 minutes',
    icon: 'video',
  },
  {
    id: 'vm-003',
    type: 'document',
    name: 'Document Upload',
    description: 'Upload certificates, samples, or portfolio items',
    duration: 'Instant',
    icon: 'file',
  },
]

export function getSkillDiscoveryData() {
  return {
    skills: structuredClone(skills),
    skillCategories: structuredClone(skillCategories),
    skillSuggestions: structuredClone(skillSuggestions),
    relatedCourses: structuredClone(relatedCourses),
    validationMethods: structuredClone(validationMethods),
  }
}

export function addSkill(skillName: string, categoryId: string): Skill {
  const category = skillCategories.find((c) => c.id === categoryId)
  const newSkill: Skill = {
    id: `skill-${Date.now()}`,
    name: skillName,
    category: category?.name ?? 'General',
    categoryId,
    description: `${skillName} skill added via AI suggestion.`,
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
  skills = [newSkill, ...skills]
  return structuredClone(newSkill)
}

export function removeSkill(skillId: string) {
  skills = skills.filter((s) => s.id !== skillId)
}

export function updateSkill(
  skillId: string,
  updates: Partial<Pick<Skill, 'proficiencyLevel' | 'yearsOfExperience' | 'description'>>
): Skill | null {
  const idx = skills.findIndex((s) => s.id === skillId)
  if (idx === -1) return null
  skills[idx] = { ...skills[idx], ...updates }
  return structuredClone(skills[idx])
}

export function startValidation(
  skillId: string,
  methodType: 'ai-assessment' | 'document' | 'video'
): Skill | null {
  const idx = skills.findIndex((s) => s.id === skillId)
  if (idx === -1) return null
  skills[idx] = {
    ...skills[idx],
    validationStatus: 'pending',
    validationType: methodType,
  }
  return structuredClone(skills[idx])
}
