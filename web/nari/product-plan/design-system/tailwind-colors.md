# Tailwind Color Configuration

## Color Choices

- **Primary:** `rose` — Used for buttons, active nav items, links, key action CTAs, gradient hero sections
- **Secondary:** `amber` — Used for tags, highlights, secondary badges, hover states, warnings, onboarding nudges
- **Neutral:** `stone` — Used for backgrounds, body text, borders, card surfaces (warm grays)

## Usage Examples

Primary button: `bg-rose-600 hover:bg-rose-700 text-white`
Primary active nav: `text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50`
Secondary badge: `bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400`
Neutral card: `bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800`
Neutral text: `text-stone-600 dark:text-stone-400`
Hero gradient: `bg-gradient-to-br from-rose-500 via-rose-400 to-amber-400`

## Dark Mode

All components support dark mode using Tailwind's `dark:` variant. Key patterns:
- Backgrounds: `bg-stone-50 dark:bg-stone-950` (page), `bg-white dark:bg-stone-900` (cards)
- Text: `text-stone-900 dark:text-stone-100` (primary), `text-stone-600 dark:text-stone-400` (secondary)
- Borders: `border-stone-200 dark:border-stone-800`
- Primary accent: `text-rose-600 dark:text-rose-400`
