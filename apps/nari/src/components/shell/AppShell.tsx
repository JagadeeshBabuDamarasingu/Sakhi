'use client'

import { useState } from 'react'
import { MainNav } from './MainNav'
import { UserMenu } from './UserMenu'
import { ThemeToggle } from './ThemeToggle'
import { LanguagePicker } from './LanguagePicker'
import { AIChatWindow } from './AIChatWindow'
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
    { label: t('nav.learn'), href: '/learn', icon: <HiOutlineAcademicCap className="w-5 h-5" />, isActive: currentPath === '/learn' },
    { label: t('nav.marketplace'), href: '/marketplace', icon: <HiOutlineBuildingStorefront className="w-5 h-5" />, isActive: currentPath === '/marketplace' },
    { label: t('nav.finance'), href: '/finance', icon: <HiOutlineWallet className="w-5 h-5" />, isActive: currentPath === '/finance' },
    { label: t('nav.ai'), href: '/ai', icon: <HiOutlineCpuChip className="w-5 h-5" />, isActive: currentPath === '/ai' },
  ]

  return (
    <div className="min-h-screen bg-base-200 font-sans">
      {/* Desktop/Tablet Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-base-100 border-b border-base-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary">
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
                    ? 'bg-primary/10 text-primary'
                    : 'text-base-content/60 hover:text-base-content hover:bg-base-200'
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

      <main
        className={`pt-16 pb-20 md:pb-8 transition-[padding-right] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isChatOpen ? 'sm:pr-[22rem]' : 'pr-0'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-base-100 border-t border-base-300 safe-area-bottom">
        <MainNav
          items={navigationItems}
          onNavigate={onNavigate}
          variant="bottom-tabs"
        />
      </div>

      <AIChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  )
}
