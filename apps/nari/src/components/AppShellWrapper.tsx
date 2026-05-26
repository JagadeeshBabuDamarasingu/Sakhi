'use client'

import { usePathname, useRouter } from 'next/navigation'
import { AppShell } from './shell'
import type { ReactNode } from 'react'

const MOCK_USER = {
  name: 'Priya Sharma',
  avatarUrl: undefined,
}

export function AppShellWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  // Landing page renders without the app shell
  if (pathname === '/') {
    return <>{children}</>
  }

  return (
    <AppShell
      currentPath={pathname}
      onNavigate={(href) => router.push(href)}
      user={MOCK_USER}
      onLogout={() => {
        localStorage.removeItem('sakhi_user')
        router.push('/')
      }}
    >
      {children}
    </AppShell>
  )
}
