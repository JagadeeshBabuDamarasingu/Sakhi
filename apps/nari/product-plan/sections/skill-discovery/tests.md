# Test Instructions: Skill Discovery

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, RSpec, Minitest, PHPUnit, etc.).

## Overview

Skill Discovery lets users view, add, and validate their marketable skills. Key flows: empty state (first-time user), viewing skill cards with market data, adding skills via multiple methods, and managing suggestions.

---

## User Flow Tests

### Flow 1: Empty State — First-Time User

**Scenario:** User has no skills yet and sees the empty state.

**Setup:**
- `skills` is empty `[]`

**Steps:**
1. User navigates to Skill Discovery
2. User sees the empty state hero

**Expected Results:**
- [ ] Heading "Discover Your Skills" is visible
- [ ] Descriptive text about finding marketable skills is shown
- [ ] "Chat with AI" button is visible and calls `onStartAIConversation` when clicked
- [ ] "Learn New Skills" button is visible and calls `onNavigateToLearning` when clicked
- [ ] "Browse skill categories" link is visible
- [ ] Clicking "Browse skill categories" opens the CategoryBrowser modal
- [ ] No SkillCard components render in this state

---

### Flow 2: View Existing Skills

**Scenario:** Returning user views her skill profile.

**Setup:**
- `skills` array has 3 skills with different validation statuses
- One skill has `validationStatus: 'verified'`
- One has `validationStatus: 'pending'`
- One has `validationStatus: 'auto-verified'`

**Expected Results:**
- [ ] Header shows "My Skills" with correct count ("3 skills added to your profile")
- [ ] 3 SkillCards render in the grid
- [ ] Verified skill shows a "Verified" green badge
- [ ] Pending skill shows a "Pending" amber badge
- [ ] Auto-verified skill shows an "Auto-verified" badge

---

### Flow 3: Add Skill via Search

**Scenario:** User searches for and adds a skill.

**Steps:**
1. User types "Mehndi" in the search bar
2. User submits the search form

**Expected Results:**
- [ ] `onSearchSkill` is called with `"Mehndi"` as the argument
- [ ] (After backend responds) skill addition flow continues

---

### Flow 4: Add Skill via AI Conversation

**Steps:**
1. User clicks "AI Chat" button in the add-skill bar

**Expected Results:**
- [ ] `onStartAIConversation` is called
- [ ] (Your implementation opens AI chat interface)

---

### Flow 5: Validate a Skill

**Steps:**
1. User sees a skill with `validationStatus: 'unverified'`
2. User clicks the "Validate" button on that skill card

**Expected Results:**
- [ ] `onValidateSkill` is called with the correct skill id
- [ ] (Your implementation opens the validation wizard)

---

### Flow 6: Manage Skill Suggestions

**Setup:**
- `skillSuggestions` has 3 `ai-recommended` suggestions and 2 `trending` suggestions

**Steps:**
1. User sees the "Suggested for You" sidebar
2. AI Picks tab is active by default — 3 suggestions visible
3. User clicks "Trending" tab — 2 suggestions visible
4. User clicks "Add" on a suggestion
5. User clicks "Dismiss" on another suggestion

**Expected Results:**
- [ ] Default tab shows "AI Picks" label with Sparkles icon
- [ ] Switching to "Trending" shows trending suggestions
- [ ] "Add" button calls `onAddSuggestion` with correct suggestion id
- [ ] "Dismiss" button calls `onDismissSuggestion` with correct suggestion id

---

## Empty State Tests

### Primary Empty State (No Skills)

**Setup:** `skills: []`

**Expected Results:**
- [ ] Empty state hero renders with heading "Discover Your Skills"
- [ ] Two action cards visible (Chat with AI, Learn New Skills)
- [ ] "Browse skill categories" link visible
- [ ] No SkillCard renders

### No Suggestions Available

**Setup:** `skillSuggestions: []`

**Expected Results:**
- [ ] Suggestions sidebar renders without crashing
- [ ] Shows empty state message in suggestions panel (no blank space or error)

---

## Component Interaction Tests

### SkillCard

- [ ] Renders skill name and category
- [ ] Shows correct proficiency level badge (beginner/intermediate/advanced/expert)
- [ ] Shows market demand indicator (low/medium/high/very-high)
- [ ] Shows earning potential range formatted as currency
- [ ] "Edit" button calls `onEditSkill` with skill id
- [ ] "Delete" button calls `onDeleteSkill` with skill id
- [ ] "Validate" button calls `onValidateSkill` with skill id (only when unverified)

### CategoryBrowser Modal

- [ ] Opens when "Browse" or "Browse skill categories" is clicked
- [ ] Shows skill categories with names, icons, and skill counts
- [ ] Clicking a category calls `onBrowseCategory` with category id
- [ ] Clicking ✕ closes the modal
- [ ] Modal is accessible via keyboard (Escape to close)

---

## Edge Cases

- [ ] Skill with very long name truncates without breaking card layout
- [ ] `earningPotential.min === 0` shows "₹0" not blank
- [ ] Skills with `relatedCourses: []` don't show broken course links
- [ ] Market demand `'very-high'` renders correct label and color
- [ ] `demandTrend: 'rising'` shows upward trend indicator

---

## Accessibility Checks

- [ ] Search input has associated label or placeholder
- [ ] CategoryBrowser modal traps focus when open
- [ ] Skill card action buttons have descriptive aria-labels
- [ ] Tab order is logical across skill cards

---

## Sample Test Data

```typescript
const mockSkill = {
  id: 'skill-001',
  name: 'Mehndi Art',
  category: 'Art & Craft',
  categoryId: 'art-craft',
  description: 'Traditional Indian henna design art',
  validationStatus: 'verified' as const,
  validationType: 'document' as const,
  proficiencyLevel: 'advanced' as const,
  yearsOfExperience: 5,
  earningPotential: { min: 8000, max: 25000, currency: 'INR', period: 'monthly' as const },
  marketDemand: 'high' as const,
  demandTrend: 'rising' as const,
  relatedCourses: ['course-001'],
  relatedListings: ['listing-001'],
  addedAt: '2025-12-01',
  verifiedAt: '2025-12-05',
}

const mockSkillSuggestion = {
  id: 'sugg-001',
  skillName: 'Tailoring & Stitching',
  category: 'Fashion & Apparel',
  categoryId: 'fashion-apparel',
  suggestionType: 'ai-recommended' as const,
  reason: 'Based on your location and existing craft skills',
  marketDemand: 'very-high' as const,
  earningPotential: { min: 12000, max: 35000, currency: 'INR', period: 'monthly' as const },
  matchScore: 92,
}

// Empty state
const emptySkills = []
const emptySkillSuggestions = []
```
