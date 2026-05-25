import type { ReactNode } from 'react'

export interface NavigationItem {
  label: string
  href: string
  icon: ReactNode
  isActive?: boolean
}

export interface AppShellProps {
  children: ReactNode
  navigationItems?: NavigationItem[]
  user?: {
    name: string
    avatarUrl?: string
  }
  currentPath?: string
  onNavigate?: (href: string) => void
  onLogout?: () => void
  onLanguageChange?: (language: string) => void
  currentLanguage?: string
}
