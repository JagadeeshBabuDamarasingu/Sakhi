# Milestone 1: Foundation

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** None

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

Set up the foundational elements: design tokens, data model types, routing structure, and application shell.

## What to Implement

### 1. Design Tokens

Configure your styling system with these tokens:

- See `product-plan/design-system/tokens.css` for CSS custom properties
- See `product-plan/design-system/tailwind-colors.md` for Tailwind color usage patterns
- See `product-plan/design-system/fonts.md` for Google Fonts setup

**Colors:** Primary = `rose`, Secondary = `amber`, Neutral = `stone`
**Typography:** Poppins for all text, IBM Plex Mono for code

**Important for multi-language support:** Poppins covers Latin characters well. For Devanagari (Hindi), Tamil, Telugu, Kannada, Marathi, Bengali, and Gujarati scripts, add Google's Noto Sans family as a fallback:

```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari&family=Noto+Sans+Tamil&family=Noto+Sans+Telugu&display=swap" rel="stylesheet">
```

### 2. Data Model Types

Create TypeScript interfaces for the core entities:

- See `product-plan/data-model/types.ts` for shared interface definitions
- See `product-plan/data-model/README.md` for entity relationships
- Each section has extended types in `product-plan/sections/[section-id]/types.ts`

Key entities to define first: `User`, `Skill`, `Course`, `Listing`, `Order`, `Loan`

### 3. Routing Structure

Create placeholder routes for each section:

```
/dashboard         → Dashboard (default redirect after login)
/skill-discovery   → Skill Discovery
/elearning         → eLearning
/marketplace       → Seller Dashboard
/financing         → Financing Hub
```

### 4. Application Shell

Copy the shell components from `product-plan/shell/components/` to your project:

- `AppShell.tsx` — Main layout wrapper with responsive header and mobile bottom tabs
- `MainNav.tsx` — Navigation supporting `horizontal` (desktop) and `bottom-tabs` (mobile) variants
- `UserMenu.tsx` — User avatar dropdown with language switcher and logout
- `types.ts` — TypeScript interfaces for shell props

**Wire Up Navigation:**

Connect navigation to your routing system:

| Label | Route | Icon |
|-------|-------|------|
| Dashboard | `/dashboard` | LayoutDashboard |
| Skill Discovery | `/skill-discovery` | Sparkles |
| eLearning | `/elearning` | GraduationCap |
| Marketplace | `/marketplace` | Store |
| Financing | `/financing` | Wallet |

**User Menu expects:**
- `user.name` — User's display name
- `user.avatarUrl` — Optional profile photo URL (falls back to initials)
- `onLogout` — Logout callback
- `onLanguageChange(code)` — Called with language code (`'en'`, `'hi'`, `'ta'`, `'te'`, `'kn'`, `'mr'`, `'bn'`, `'gu'`)
- `currentLanguage` — Currently selected language code

**Dependencies:** Shell components use `react-icons` for icons. Install it:
```bash
npm install react-icons
```

## Files to Reference

- `product-plan/design-system/` — Design tokens and font config
- `product-plan/data-model/` — Type definitions and entity relationships
- `product-plan/shell/README.md` — Shell design intent and wire-up example
- `product-plan/shell/components/` — React components (copy these)

## Done When

- [ ] Design tokens configured (Tailwind colors + Google Fonts)
- [ ] Data model types defined
- [ ] Routes exist for all 5 sections (can be placeholder pages)
- [ ] AppShell renders with top nav on desktop and bottom tabs on mobile
- [ ] Active route is highlighted in navigation
- [ ] User menu shows user name and avatar (or initials)
- [ ] Language switcher shows 8 Indian language options
- [ ] Logout works
- [ ] Responsive on mobile (bottom tab bar visible, header simplified)
