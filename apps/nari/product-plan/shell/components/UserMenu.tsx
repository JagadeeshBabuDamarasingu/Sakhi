'use client'

import { useState, useRef, useEffect } from 'react'
import { LuUser as User, LuSettings as Settings, LuLogOut as LogOut, LuGlobe as Globe, LuChevronDown as ChevronDown } from 'react-icons/lu'

interface UserMenuProps {
  user?: {
    name: string
    avatarUrl?: string
  }
  onLogout?: () => void
  onLanguageChange?: (language: string) => void
  currentLanguage?: string
}

const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'mr', label: 'मराठी' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'gu', label: 'ગુજરાતી' },
]

export function UserMenu({
  user,
  onLogout,
  onLanguageChange,
  currentLanguage = 'en',
}: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const currentLang = languages.find((l) => l.code === currentLanguage)

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
      >
        {/* Avatar */}
        {user?.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-rose-200 dark:ring-rose-800"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900 flex items-center justify-center ring-2 ring-rose-200 dark:ring-rose-800">
            {user ? (
              <span className="text-sm font-medium text-rose-600 dark:text-rose-400">
                {getInitials(user.name)}
              </span>
            ) : (
              <User className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            )}
          </div>
        )}

        {/* Name (hidden on mobile) */}
        <span className="hidden sm:block text-sm font-medium text-stone-700 dark:text-stone-300 max-w-[120px] truncate">
          {user?.name || 'Guest'}
        </span>

        <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-stone-900 rounded-xl shadow-lg border border-stone-200 dark:border-stone-700 py-2 z-50">
          {/* User Info */}
          {user && (
            <div className="px-4 py-3 border-b border-stone-200 dark:border-stone-700">
              <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                {user.name}
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                View profile
              </p>
            </div>
          )}

          {/* Language Selector */}
          <div className="px-2 py-2 border-b border-stone-200 dark:border-stone-700">
            <div className="px-2 py-1.5 text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
              Language
            </div>
            <div className="grid grid-cols-2 gap-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onLanguageChange?.(lang.code)
                    setIsOpen(false)
                  }}
                  className={`
                    flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm
                    transition-colors
                    ${
                      currentLanguage === lang.code
                        ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400'
                        : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }
                  `}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>

            {onLogout && (
              <button
                onClick={() => {
                  onLogout()
                  setIsOpen(false)
                }}
                className="flex items-center gap-3 w-full px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
