---
version: alpha
name: Shakti
description: AI-powered economic empowerment platform for women across India
colors:
  # Light mode (shakti theme) — blush-rose surfaces
  base-100: "oklch(99.2% 0.005 345)"   # faintest blush white
  base-200: "oklch(97.5% 0.010 348)"   # soft blush
  base-300: "oklch(93% 0.016 352)"     # rose-tinted border
  base-content: "oklch(19% 0.015 20)"  # rose-charcoal text
  primary: "oklch(54.6% 0.229 17)"     # Rose 600
  primary-content: "oklch(99% 0.004 345)"
  secondary: "oklch(79.5% 0.18 74)"    # Amber 500
  secondary-content: "oklch(22% 0.008 55)"
  accent: "oklch(65% 0.12 22)"         # Terracotta
  neutral: "oklch(40% 0.010 340)"      # rose-tinted warm gray
  error: "oklch(54.4% 0.225 29)"
  # Dark mode (shakti-dark theme) — rose velvet
  dark-base-100: "oklch(15.5% 0.016 12)"
  dark-base-200: "oklch(10.5% 0.010 10)"
  dark-base-300: "oklch(21% 0.022 12)"
  dark-base-content: "oklch(95.5% 0.008 355)"
  dark-primary: "oklch(72% 0.168 13)"  # Rose 400 brightened
  dark-secondary: "oklch(85% 0.165 78)"
typography:
  headline-lg:
    fontFamily: Poppins
    fontSize: 30px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Poppins
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Poppins
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.4
  body-lg:
    fontFamily: Poppins
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Poppins
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Poppins
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
  label-lg:
    fontFamily: Poppins
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
  label-md:
    fontFamily: Poppins
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Poppins
    fontSize: 11px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.02em
  mono-md:
    fontFamily: IBM Plex Mono
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.6
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  gutter: 16px
  section: 32px
rounded:
  none: 0px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.full}"
    padding: 12px 24px
    typography: "{typography.label-lg}"
  button-primary-hover:
    backgroundColor: "{colors.primary-dark}"
  button-secondary:
    backgroundColor: "{colors.secondary-light}"
    textColor: "{colors.secondary-dark}"
    rounded: "{rounded.full}"
    padding: 12px 24px
    typography: "{typography.label-lg}"
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.neutral}"
    rounded: "{rounded.full}"
    padding: 12px 24px
    typography: "{typography.label-lg}"
  badge:
    backgroundColor: "{colors.secondary-light}"
    textColor: "{colors.secondary-dark}"
    rounded: "{rounded.full}"
    padding: 2px 10px
    typography: "{typography.label-sm}"
  badge-primary:
    backgroundColor: "{colors.primary-light}"
    textColor: "{colors.primary-dark}"
    rounded: "{rounded.full}"
    padding: 2px 10px
    typography: "{typography.label-sm}"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: 24px
  nav-item-active:
    backgroundColor: "{colors.primary-light}"
    textColor: "{colors.primary-dark}"
    rounded: "{rounded.md}"
    padding: 8px 16px
    typography: "{typography.label-lg}"
  nav-item:
    backgroundColor: transparent
    textColor: "{colors.neutral}"
    rounded: "{rounded.md}"
    padding: 8px 16px
    typography: "{typography.label-lg}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 10px 14px
    typography: "{typography.body-md}"
---

# Shakti Design System

## Overview

Shakti is an economic empowerment platform designed for women across India — from rural villages to semi-urban towns. The visual language must feel **warm, trustworthy, and empowering**, not clinical or intimidating. It should feel like a knowledgeable friend guiding the user through her journey.

The emotional register is **confident and celebratory** — this platform marks a transformative moment in each woman's economic life. Rose (our primary) evokes energy, passion, and strength. Amber (secondary) signals warmth, optimism, and achievement. Stone (neutral) provides a grounded, earthy foundation that avoids the coldness of pure gray.

The UI must be immediately legible at low literacy levels and work across a range of device sizes, from low-end Android phones to desktop browsers. Every screen should feel uncluttered, with generous white space and a clear visual hierarchy that guides the eye naturally.

The platform supports 8 Indian languages (English, Hindi, Tamil, Telugu, Kannada, Marathi, Bengali, Gujarati). Typography choices prioritize readability across scripts.

## Colors

The palette is anchored in rose and amber against blush-tinted surfaces. Light mode reads warm and inviting — the surfaces carry a barely-perceptible blush rather than neutral white, so the interface feels alive before any content loads. Dark mode inverts to a rose-velvet dark: warm charcoal with rose undertones, not cold gray.

All color values use OKLCH. Chroma is kept very low on surface colors (0.005–0.016) so the tinting reads as warmth, not color.

### Light mode (shakti theme)

- **base-100 (oklch 99.2% 0.005 345):** Page background. Faintest blush white — imperceptible on its own, but gives the page warmth vs. cold white.
- **base-200 (oklch 97.5% 0.010 348):** Card and panel background. Soft blush that separates surfaces without borders.
- **base-300 (oklch 93% 0.016 352):** Borders and dividers. Rose-tinted, never cold.
- **base-content (oklch 19% 0.015 20):** Body text. Rose-charcoal — slightly warm vs. stone black.
- **Primary (Rose 600 — oklch 54.6% 0.229 17):** The core brand color. Primary actions, active nav, key CTAs.
- **Secondary (Amber 500 — oklch 79.5% 0.18 74):** Achievement badges, trending labels, onboarding nudges.
- **Accent (Terracotta — oklch 65% 0.12 22):** Warm earthy accent for highlights and tags. Feminine without leaning fashion.
- **Neutral (oklch 40% 0.010 340):** Supporting text and ghost UI elements. Rose-tinted warm gray.
- **Error (oklch 54.4% 0.225 29):** Error states only.

### Dark mode (shakti-dark theme)

Scene: woman checking her sales late evening, warm lamp, dim room. Warm and intimate.

- **base-100 (oklch 15.5% 0.016 12):** Main dark surface. Deep rose-charcoal.
- **base-200 (oklch 10.5% 0.010 10):** Deepest dark — sidebar, behind-content layers.
- **base-300 (oklch 21% 0.022 12):** Dark surface borders. Visible but not jarring.
- **base-content (oklch 95.5% 0.008 355):** Text on dark. Warm near-white with a faint rose cast.
- **Primary (oklch 72% 0.168 13):** Rose 400-ish, brightened for legibility on dark bg.
- **Secondary (oklch 85% 0.165 78):** Amber 400, warm gold on dark.
- **Accent (oklch 70% 0.10 18):** Lighter terracotta for dark surfaces.

## Typography

All text in Shakti uses **Poppins** — a geometric sans-serif that combines modernity with warmth. Its rounded letterforms are friendly and accessible, and it maintains excellent legibility at small sizes on low-resolution screens common in rural India.

**IBM Plex Mono** is reserved exclusively for code, numeric data (loan amounts, EMI values), and technical identifiers.

For Indian script languages (Hindi, Tamil, Telugu, Kannada, Marathi, Bengali, Gujarati), **Noto Sans** family variants serve as automatic fallbacks, ensuring native-script content renders with the same care as Latin text.

- **Headline Large (30px / 700):** Section hero titles, onboarding screen headers.
- **Headline Medium (24px / 600):** Page titles, card headers, modal titles.
- **Headline Small (20px / 600):** Section headings, widget titles.
- **Body Large (16px / 400):** Primary reading text, course descriptions, onboarding copy.
- **Body Medium (14px / 400):** Card descriptions, list item text, form helper text.
- **Body Small (12px / 400):** Captions, timestamps, secondary metadata.
- **Label Large (14px / 500):** Button text, navigation labels, tab labels.
- **Label Medium (12px / 500):** Chip labels, badge text, form labels.
- **Label Small (11px / 500):** Category tags, micro-labels.
- **Mono Medium (13px / 400):** Loan amounts, EMI figures, order IDs, numeric data displays.

## Layout

Shakti uses a **responsive fluid grid** that adapts across three breakpoints:

- **Mobile (<768px):** Single column, 16px horizontal margins. Full-width cards. Bottom tab navigation with safe-area padding for notched devices.
- **Tablet (768px–1023px):** Two-column grid with 24px gutters. Top horizontal navigation.
- **Desktop (1024px+):** Fixed max-width of 1280px, centered. Three-column grid with 24px gutters for content areas. Fixed top navigation header at 64px height.

Content sections use a consistent 32px vertical spacing between sections. Cards use 24px internal padding. A strict 8px base unit is used for all spacing — xs(4), sm(8), md(16), lg(24), xl(32), 2xl(48), 3xl(64).

The layout prioritizes **progressive disclosure** — the most critical information (metrics, next action) appears above the fold on all screen sizes.

## Elevation & Depth

Depth is conveyed through **tonal layering** rather than heavy drop shadows. The hierarchy uses three levels:

1. **Base:** Page background (stone-50) — the foundational plane.
2. **Raised:** Cards and panels on white (`bg-white`) — content surfaces that sit above the base.
3. **Floating:** Modals, dropdowns, tooltips — with a soft shadow (`shadow-lg`) and a slight backdrop.

Card borders (`border border-stone-200`) reinforce separation without relying on shadow depth. Primary CTAs use a subtle hover lift effect (`hover:shadow-md transition-shadow`) to communicate interactivity.

Avoid heavy box shadows on content cards — they feel heavy for users on mobile with limited screen real estate.

## Shapes

The shape language balances **friendliness with structure**. Rounded corners are used throughout, calibrated by component importance:

- **Buttons and pills:** Full radius (9999px) — the most approachable, primary-action feel.
- **Cards and panels:** 12px radius (lg) — structured but welcoming.
- **Inputs and chips:** 8px radius (md) — crisp and functional.
- **Badges and tags:** Full radius (9999px) — consistent with the pill language of highlights.

Sharp corners (0px) are never used — they create a cold, institutional feel inconsistent with Shakti's warmth. The consistent use of rounded forms builds a coherent, gentle visual rhythm across the interface.

## Components

### Navigation

The app shell uses a dual-mode navigation pattern:
- **Desktop:** Horizontal top nav with icon + label items. Active state uses rose-50 background with rose-600 text.
- **Mobile:** Bottom tab bar with icons and abbreviated labels. Safe-area-aware padding for notched devices.

User menu (top right) includes avatar with rose ring, name, language switcher (8 Indian languages), settings, and logout.

### Buttons

Three button variants are used:
- **Primary:** Rose-600 fill, white text, full radius. The single most important action per screen.
- **Secondary:** Amber-100 fill, amber-700 text. For confirmatory secondary actions.
- **Ghost:** Transparent with stone-600 text. For tertiary actions and navigation.

Button heights are 40px (default) and 48px (large/touch-friendly). Full-width buttons are used on mobile for all primary CTAs.

### Cards

Cards are the primary content surface. White background, stone-200 border, 12px radius, 24px padding. On hover, a subtle shadow lift signals interactivity on clickable cards.

### Badges and Tags

Used for skill validation status, course levels, market demand, and categories. Two variants:
- **Primary badge:** Rose-50 fill, rose-600 text — used for verified status, primary categories.
- **Secondary badge:** Amber-100 fill, amber-700 text — used for trending, achievements, highlights.

### Input Fields

Standard text inputs with stone-200 border, white fill, and rose-600 focus ring. Error state uses red-600 border with a helper text below. Labels sit above the input field in label-md weight.

## Do's and Don'ts

- Do use rose (primary) only for the single most important action per screen — don't use it for decorative elements.
- Do always maintain WCAG AA contrast (4.5:1 for normal text, 3:1 for large text).
- Do use Poppins at 14px or larger for body text — never smaller on mobile to ensure readability at low literacy levels.
- Do add Noto Sans fallbacks for all text that may render in Indian scripts.
- Don't use more than two font weights on a single card or widget.
- Don't rely on color alone to communicate status — always pair color with an icon or label.
- Don't use harsh drop shadows on content cards — use tonal layers and borders instead.
- Don't use sharp corners (0px radius) — they conflict with the platform's warm, approachable character.
- Do use full-radius (pill) shapes for interactive chips and buttons to maintain visual consistency.
- Do respect safe-area insets on mobile for the bottom tab bar — many target users are on notched Android devices.
- Don't show empty states without guidance — always include an action or encouraging message when no content exists.
- Do celebrate progress — use amber highlights and encouraging microcopy when users complete milestones.
