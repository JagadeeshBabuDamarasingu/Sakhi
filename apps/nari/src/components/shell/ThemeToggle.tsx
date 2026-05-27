'use client'

import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2'
import { useTheme } from '@/providers/ThemeProvider'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="p-2 rounded-lg text-base-content/60 hover:bg-base-200 hover:text-base-content transition-colors"
    >
      {theme === 'dark' ? (
        <HiOutlineSun className="w-5 h-5" />
      ) : (
        <HiOutlineMoon className="w-5 h-5" />
      )}
    </button>
  )
}
