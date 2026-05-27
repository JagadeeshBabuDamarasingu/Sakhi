'use client'

import { useState, useRef, useEffect } from 'react'
import {
  HiOutlineUser,
  HiOutlineCog6Tooth,
  HiOutlineArrowRightOnRectangle,
  HiOutlineChevronDown,
} from 'react-icons/hi2'
import { useI18n } from '@/providers/I18nProvider'
import { languages, type Language } from '@/i18n/translations'

interface UserMenuProps {
  user?: {
    name: string
    avatarUrl?: string
  }
  onLogout?: () => void
}

export function UserMenu({ user, onLogout }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { language, setLanguage, t } = useI18n()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-base-200 transition-colors"
      >
        {user?.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/30"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center ring-2 ring-primary/30">
            {user ? (
              <span className="text-sm font-medium text-primary">
                {getInitials(user.name)}
              </span>
            ) : (
              <HiOutlineUser className="w-4 h-4 text-primary" />
            )}
          </div>
        )}

        <span className="hidden sm:block text-sm font-medium text-base-content max-w-[120px] truncate">
          {user?.name || t('user.guest')}
        </span>

        <HiOutlineChevronDown
          className={`w-4 h-4 text-base-content/40 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-base-100 rounded-xl shadow-lg border border-base-300 py-2 z-50">
          {user && (
            <div className="px-4 py-3 border-b border-base-300">
              <p className="text-sm font-medium text-base-content">
                {user.name}
              </p>
              <p className="text-xs text-base-content/60 mt-0.5">
                {t('user.view-profile')}
              </p>
            </div>
          )}

          <div className="px-2 py-2 border-b border-base-300">
            <div className="px-2 py-1.5 text-xs font-medium text-base-content/60 uppercase tracking-wider">
              {t('menu.language')}
            </div>
            <div className="grid grid-cols-2 gap-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code as Language)
                    setIsOpen(false)
                  }}
                  className={`
                    flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm
                    transition-colors
                    ${
                      language === lang.code
                        ? 'bg-primary/10 text-primary'
                        : 'text-base-content/70 hover:bg-base-200'
                    }
                  `}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          <div className="py-1">
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-base-content hover:bg-base-200 transition-colors"
            >
              <HiOutlineCog6Tooth className="w-4 h-4" />
              {t('menu.settings')}
            </button>

            {onLogout && (
              <button
                onClick={() => {
                  onLogout()
                  setIsOpen(false)
                }}
                className="flex items-center gap-3 w-full px-4 py-2 text-sm text-primary hover:bg-primary/10 transition-colors"
              >
                <HiOutlineArrowRightOnRectangle className="w-4 h-4" />
                {t('menu.logout')}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
