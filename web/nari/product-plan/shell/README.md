# Application Shell

## Overview

Shakti uses an adaptive navigation pattern — top horizontal navigation on desktop and tablet, bottom tab bar on mobile. This provides optimal usability across all device sizes and literacy levels.

## Navigation Structure

- **Dashboard** → `/dashboard` (icon: LayoutDashboard) — Default view
- **Skill Discovery** → `/skill-discovery` (icon: Sparkles)
- **eLearning** → `/elearning` (icon: GraduationCap)
- **Marketplace** → `/marketplace` (icon: Store)
- **Financing** → `/financing` (icon: Wallet)

## Layout Pattern

**Desktop (1024px+):** Fixed header with logo on left, navigation links centered, user menu on right. Full navigation labels visible.

**Tablet (768px - 1023px):** Same as desktop but navigation items may use icons + shortened labels.

**Mobile (<768px):** Simplified header (Logo left, user avatar right) + bottom tab bar with icons and short labels. Safe area padding for notched devices.

## User Menu

Located top right on all screen sizes. Contains:
- User avatar (with fallback initials)
- User name
- Language selector (8 Indian languages: English, Hindi, Tamil, Telugu, Kannada, Marathi, Bengali, Gujarati)
- Settings link
- Logout button

## Components Provided

- `AppShell` — Main layout wrapper with responsive header and bottom tabs
- `MainNav` — Navigation component supporting `horizontal` and `bottom-tabs` variants
- `UserMenu` — User avatar + dropdown with language switcher and logout

## Callback Props

| Callback | Description |
|----------|-------------|
| `onNavigate(href)` | Called when user clicks a nav link; connect to your router |
| `onLogout()` | Called when user clicks Logout |
| `onLanguageChange(code)` | Called when user selects a language (e.g., `'hi'`, `'ta'`) |

## Wire Up Example

```tsx
import { AppShell } from './shell/components'
import { useRouter } from 'your-router'

function App({ children }) {
  const router = useRouter()

  return (
    <AppShell
      currentPath={router.pathname}
      onNavigate={(href) => router.push(href)}
      user={{ name: 'Priya Sharma' }}
      onLogout={() => auth.signOut()}
      onLanguageChange={(code) => i18n.changeLanguage(code)}
      currentLanguage={i18n.language}
    >
      {children}
    </AppShell>
  )
}
```
