'use client'

import { MainNav } from './MainNav'
import { UserMenu } from './UserMenu'
import { LuLayoutDashboard as LayoutDashboard, LuSparkles as Sparkles, LuGraduationCap as GraduationCap, LuStore as Store, LuWallet as Wallet } from 'react-icons/lu'
import type { NavigationItem, AppShellProps } from './types'

export type { NavigationItem, AppShellProps }

const defaultNavigationItems: NavigationItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: 'Skill Discovery', href: '/skill-discovery', icon: <Sparkles className="w-5 h-5" /> },
  { label: 'eLearning', href: '/elearning', icon: <GraduationCap className="w-5 h-5" /> },
  { label: 'Marketplace', href: '/marketplace', icon: <Store className="w-5 h-5" /> },
  { label: 'Financing', href: '/financing', icon: <Wallet className="w-5 h-5" /> },
]

export function AppShell({
  children,
  navigationItems = defaultNavigationItems,
  user,
  currentPath = '/dashboard',
  onNavigate,
  onLogout,
  onLanguageChange,
  currentLanguage = 'en',
}: AppShellProps) {
  const navItemsWithActive = navigationItems.map((item) => ({
    ...item,
    isActive: item.href === currentPath,
  }))

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 font-sans">
      {/* Desktop/Tablet Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                Shakti
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <MainNav
                items={navItemsWithActive}
                onNavigate={onNavigate}
                variant="horizontal"
              />
            </div>

            {/* User Menu */}
            <UserMenu
              user={user}
              onLogout={onLogout}
              onLanguageChange={onLanguageChange}
              currentLanguage={currentLanguage}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 safe-area-bottom">
        <MainNav
          items={navItemsWithActive}
          onNavigate={onNavigate}
          variant="bottom-tabs"
        />
      </div>
    </div>
  )
}
