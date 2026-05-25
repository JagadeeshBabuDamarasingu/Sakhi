'use client'

import { useState } from 'react'
import { MainNav } from './MainNav'
import { UserMenu } from './UserMenu'
import { ThemeToggle } from './ThemeToggle'
import { LanguagePicker } from './LanguagePicker'
import { AIChatSidebar } from './AIChatSidebar'
import {
  HiOutlineSquares2X2,
  HiOutlineAcademicCap,
  HiOutlineBuildingStorefront,
  HiOutlineWallet,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCpuChip,
} from 'react-icons/hi2'
import { useI18n } from '@/providers/I18nProvider'
import type { AppShellProps } from './types'

export type { AppShellProps }

export function AppShell({
  children,
  user,
  currentPath = '/dashboard',
  onNavigate,
  onLogout,
}: AppShellProps) {
  const { t } = useI18n()
  const [isChatOpen, setIsChatOpen] = useState(false)

  const navigationItems = [
    { label: t('nav.dashboard'), href: '/dashboard', icon: <HiOutlineSquares2X2 className="w-5 h-5" />, isActive: currentPath === '/dashboard' },
    { label: t('nav.elearning'), href: '/elearning', icon: <HiOutlineAcademicCap className="w-5 h-5" />, isActive: currentPath === '/elearning' },
    { label: t('nav.marketplace'), href: '/marketplace', icon: <HiOutlineBuildingStorefront className="w-5 h-5" />, isActive: currentPath === '/marketplace' },
    { label: t('nav.financing'), href: '/financing', icon: <HiOutlineWallet className="w-5 h-5" />, isActive: currentPath === '/financing' },
    { label: t('nav.ai-orchestration'), href: '/ai-orchestration', icon: <HiOutlineCpuChip className="w-5 h-5" />, isActive: currentPath === '/ai-orchestration' },
  ]

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 font-sans">
      {/* Desktop/Tablet Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                Shakti
              </span>
            </div>

            <div className="hidden md:block">
              <MainNav
                items={navigationItems}
                onNavigate={onNavigate}
                variant="horizontal"
              />
            </div>

            <div className="flex items-center gap-2">
              <LanguagePicker />
              <button
                onClick={() => setIsChatOpen(prev => !prev)}
                className={`p-2 rounded-lg transition-colors ${
                  isChatOpen
                    ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-500'
                    : 'text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
                aria-label="Toggle AI chat"
                title="Sakhi AI"
              >
                <HiOutlineChatBubbleLeftRight className="w-5 h-5" />
              </button>
              <ThemeToggle />
              <UserMenu
                user={user}
                onLogout={onLogout}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="pt-16 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 safe-area-bottom">
        <MainNav
          items={navigationItems}
          onNavigate={onNavigate}
          variant="bottom-tabs"
        />
      </div>

      <AIChatSidebar isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  )
}
