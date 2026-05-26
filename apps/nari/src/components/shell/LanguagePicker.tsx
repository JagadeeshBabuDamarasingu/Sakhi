'use client'

import { useState, useRef, useEffect } from 'react'
import { LuLanguages, LuChevronDown, LuCheck } from 'react-icons/lu'
import { useI18n } from '@/providers/I18nProvider'
import { languages, type Language } from '@/i18n/translations'

export function LanguagePicker() {
  const { language, setLanguage } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [])

  const current = languages.find((l) => l.code === language)

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Select language"
        aria-expanded={isOpen}
        className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
      >
        <LuLanguages className="w-4 h-4 shrink-0" />
        <span className="hidden sm:block text-xs font-medium leading-none">
          {current?.label}
        </span>
        <LuChevronDown
          className={`w-3 h-3 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-44 bg-white dark:bg-stone-900 rounded-xl shadow-lg border border-stone-200 dark:border-stone-700 py-1.5 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code as Language)
                setIsOpen(false)
              }}
              className={`flex items-center justify-between w-full px-3 py-2 text-sm transition-colors ${
                language === lang.code
                  ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
              }`}
            >
              {lang.label}
              {language === lang.code && (
                <LuCheck className="w-3.5 h-3.5 shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
