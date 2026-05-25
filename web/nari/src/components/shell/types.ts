import type { ReactNode } from 'react'

export interface NavigationItem {
  label: string
  href: string
  icon: ReactNode
  isActive?: boolean
}

export interface AppShellProps {
  children: ReactNode
  user?: {
    name: string
    avatarUrl?: string
  }
  currentPath?: string
  onNavigate?: (href: string) => void
  onLogout?: () => void
}
