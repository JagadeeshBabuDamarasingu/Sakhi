'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { AppShell } from './shell'
import { useAuth } from '@/providers/AuthProvider'
import type { ReactNode } from 'react'

const PUBLIC_PATHS = new Set(['/', '/login', '/logout'])

export function AppShellWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, loading, logout } = useAuth()

  const isPublic = PUBLIC_PATHS.has(pathname)

  useEffect(() => {
    if (!isPublic && !loading && !user) {
      router.replace('/login')
    }
  }, [isPublic, loading, user, router])

  // Public routes render without the app shell
  if (isPublic) {
    return <>{children}</>
  }

  // Show spinner while auth resolves or while redirecting
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    )
  }

  return (
    <AppShell
      currentPath={pathname}
      onNavigate={(href) => router.push(href)}
      user={{
        name: user.displayName ?? 'User',
        avatarUrl: user.photoURL ?? undefined,
      }}
      onLogout={() => router.push('/logout')}
    >
      {children}
    </AppShell>
  )
}
