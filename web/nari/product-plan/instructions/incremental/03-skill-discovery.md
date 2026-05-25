# Milestone 3: Skill Discovery

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete, Milestone 2 (Dashboard) recommended

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Implement the Skill Discovery section — where users view, add, and validate their marketable skills.

## Overview

Skill Discovery helps women identify and understand their marketable skills through multiple methods: AI conversation, skill search, and category browsing. Users see rich skill cards showing proficiency level, market demand, earning potential, and validation status. They can validate skills through a multi-step wizard (AI assessment, document upload, or video demonstration), and receive AI-powered and trending skill suggestions.

**Key Functionality:**
- View all claimed skills as rich cards with market demand and earning potential
- Add skills via search, AI conversation, or category browser
- Validate skills through AI assessment, document upload, or video demonstration
- See AI-recommended and trending skill suggestions
- Empty state guides first-time users to add skills or learn new ones

## Recommended Approach: Test-Driven Development

See `product-plan/sections/skill-discovery/tests.md` for detailed test-writing instructions including:
- Empty state flows (no skills yet)
- Adding skills via search, AI chat, and category browse
- Validating a skill
- Managing suggestions (add/dismiss)

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/skill-discovery/components/`:

- `SkillDiscovery` — Main orchestrator (handles both empty and populated states)
- `SkillCard` — Rich skill card with all metadata
- `SkillSuggestionCard` — Suggested skill with Add/Dismiss actions
- `CategoryBrowser` — Category grid for browsing skills

### Data Layer

The `SkillDiscovery` component expects (see `types.ts`):

- `skills` — User's claimed skills with validation status, proficiency, earning potential, market demand
- `skillCategories` — Available categories for browsing
- `skillSuggestions` — AI-recommended and trending suggestions
- `relatedCourses` — Courses linked from skill cards
- `validationMethods` — Available validation options for each skill type

### API Endpoints to Build

```
GET  /api/skills                    → List user's skills
GET  /api/skills/categories         → Get all skill categories
GET  /api/skills/suggestions        → Get AI + trending suggestions
POST /api/skills                    → Add a new skill
PUT  /api/skills/:id                → Update skill details
DELETE /api/skills/:id              → Remove a skill
POST /api/skills/:id/validate       → Start validation wizard
GET  /api/courses?relatedSkill=:id  → Get related courses for a skill
```

### Callbacks to Wire Up

| Callback | Action |
|----------|--------|
| `onViewSkill(skillId)` | Navigate to skill detail page |
| `onDeleteSkill(skillId)` | DELETE /api/skills/:id |
| `onValidateSkill(skillId)` | Open validation wizard (POST /api/skills/:id/validate) |
| `onEditSkill(skillId)` | Open skill edit form |
| `onSearchSkill(query)` | Search skill catalog and show results |
| `onStartAIConversation()` | Open AI chat interface for skill identification |
| `onBrowseCategory(categoryId)` | Show skills in category for selection |
| `onAddSkill(skillName, categoryId)` | POST /api/skills |
| `onAddSuggestion(suggestionId)` | Accept a suggestion and add skill |
| `onDismissSuggestion(suggestionId)` | Dismiss a suggestion |
| `onViewCourse(courseId)` | Navigate to /elearning with course highlighted |
| `onNavigateToLearning()` | Navigate to /elearning |

### The AI Conversation Flow

When `onStartAIConversation` is called, your implementation should:
1. Open an AI chat interface (modal, side panel, or new page)
2. The AI converses with the user in their preferred language
3. Based on the conversation, suggest skills to add
4. User confirms which skills to add → POST /api/skills

This is a generative AI feature — you'll need to integrate with an LLM API (Claude, GPT, etc.) and build the conversational UI.

### Skill Validation Wizard

When `onValidateSkill` is called:
1. Show available validation methods based on skill type
2. For **AI assessment**: present a questionnaire or interactive tasks
3. For **document upload**: collect certificates, diplomas, or portfolio
4. For **video demonstration**: collect or link a video showing the skill

### Empty States

- **No skills (first-time):** Show hero with "Chat with AI" and "Learn New Skills" CTAs + "Browse categories" link
- **No suggestions:** Show empty state in suggestions panel (not blank)

## Files to Reference

- `product-plan/sections/skill-discovery/README.md` — Feature overview
- `product-plan/sections/skill-discovery/tests.md` — Test-writing instructions
- `product-plan/sections/skill-discovery/components/` — React components
- `product-plan/sections/skill-discovery/types.ts` — TypeScript interfaces
- `product-plan/sections/skill-discovery/sample-data.json` — Test data

## Expected User Flows

### Flow 1: First-Time User Adds a Skill

1. User navigates to Skill Discovery — sees empty state
2. User clicks "Chat with AI" button
3. AI asks about her work, hobbies, and daily activities
4. AI identifies "Mehndi Art" and "Block Printing" as potential skills
5. User confirms both
6. **Outcome:** Both skills appear as SkillCards on her profile

### Flow 2: Add Skill via Category Browse

1. User clicks "Browse skill categories"
2. CategoryBrowser modal opens with category grid
3. User selects "Art & Craft" category
4. User selects "Mehndi Art" from the list
5. **Outcome:** Skill added with auto-verified or unverified status

### Flow 3: Validate a Skill

1. User sees an "Unverified" SkillCard for "Mehndi Art"
2. User clicks "Validate" button
3. Validation wizard opens showing available methods: AI assessment, document upload
4. User selects "Document upload" and uploads a photo of past work
5. **Outcome:** Skill status changes to "Pending" while under review; later "Verified"

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Skills list renders with real data from API
- [ ] Empty state shows for users with no skills
- [ ] Skill search works and adds skills
- [ ] AI conversation flow is implemented (even as a placeholder if LLM integration is pending)
- [ ] Category browser opens and allows skill selection
- [ ] Skill validation wizard works for at least one method
- [ ] Suggestions panel shows AI and trending tabs
- [ ] Suggestions can be added or dismissed
- [ ] Responsive on mobile
