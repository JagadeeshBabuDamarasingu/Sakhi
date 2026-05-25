# Skill Discovery

## Overview

Skill Discovery is the section where users view, add, and validate their marketable skills. It displays rich skill cards showing proficiency, market demand, and earning potential. Users can add skills through search, AI conversation, or category browsing, and validate them through a multi-step wizard offering AI assessments, document uploads, or video demonstrations.

## User Flows

- **View my skills** — See all claimed skills as rich cards with validation status, proficiency, market demand, and earning potential
- **Add skill via search** — Search from predefined skill list and select
- **Add skill via AI conversation** — Chat with AI that identifies skills from user's description
- **Add skill via category browse** — Browse skill categories and select from lists
- **Validate a skill** — Multi-step wizard with validation options based on skill type
- **View skill suggestions** — See AI-recommended and trending skills
- **Empty state** — If no skills, prompt to add existing skills or navigate to eLearning

## Design Decisions

- Empty state uses a centered hero with two action cards (AI Chat, Learn New Skills) and a "Browse categories" text link
- CategoryBrowser shows as a modal/bottom sheet on mobile; sidebar panel on desktop (lg+)
- Suggestion tabs (AI Picks / Trending) switch between `ai-recommended` and `trending` suggestion types
- Search bar + AI Chat + Browse buttons are grouped in a gradient banner at the top

## Data Used

**Entities:** Skill, SkillCategory, SkillSuggestion, RelatedCourse, ValidationMethod

## Components Provided

- `SkillDiscovery` — Main orchestrator with empty state and populated state
- `SkillCard` — Rich card showing skill name, category, validation status badge, proficiency, earning potential, market demand
- `SkillSuggestionCard` — Suggested skill card with Add/Dismiss actions
- `CategoryBrowser` — Browseable list of skill categories

## Callback Props

| Callback | Description |
|----------|-------------|
| `onViewSkill(skillId)` | View skill detail page |
| `onDeleteSkill(skillId)` | Remove a skill |
| `onValidateSkill(skillId)` | Open validation wizard |
| `onEditSkill(skillId)` | Edit skill details |
| `onSearchSkill(query)` | Search for a skill to add |
| `onStartAIConversation()` | Open AI chat interface |
| `onBrowseCategory(categoryId)` | Open category browser |
| `onAddSkill(skillName, categoryId)` | Add a skill from browse/search |
| `onAddSuggestion(suggestionId)` | Add a suggested skill |
| `onDismissSuggestion(suggestionId)` | Dismiss a skill suggestion |
| `onViewCourse(courseId)` | Navigate to a related course |
| `onViewListing(listingId)` | Navigate to a related listing |
| `onNavigateToLearning()` | Navigate to eLearning (from empty state) |
