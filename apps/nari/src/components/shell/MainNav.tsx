'use client'

import type { NavigationItem } from './types'

interface MainNavProps {
  items: NavigationItem[]
  onNavigate?: (href: string) => void
  variant: 'horizontal' | 'bottom-tabs'
}

export function MainNav({ items, onNavigate, variant }: MainNavProps) {
  const handleClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault()
    onNavigate?.(href)
  }

  if (variant === 'bottom-tabs') {
    return (
      <nav className="flex items-center justify-around py-2 px-1">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => handleClick(item.href, e)}
            className={`
              flex flex-col items-center justify-center min-w-[64px] py-2 px-3 rounded-lg
              transition-colors duration-200
              ${
                item.isActive
                  ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50'
                  : 'text-stone-600 dark:text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }
            `}
          >
            <span className={item.isActive ? 'text-rose-600 dark:text-rose-400' : ''}>
              {item.icon}
            </span>
            <span className="mt-1 text-xs font-medium truncate max-w-[72px]">
              {item.label.split(' ')[0]}
            </span>
          </a>
        ))}
      </nav>
    )
  }

  return (
    <nav className="flex items-center space-x-1">
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={(e) => handleClick(item.href, e)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
            transition-colors duration-200
            ${
              item.isActive
                ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50'
                : 'text-stone-600 dark:text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-stone-100 dark:hover:bg-stone-800'
            }
          `}
        >
          <span className={item.isActive ? 'text-rose-600 dark:text-rose-400' : ''}>
            {item.icon}
          </span>
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  )
}
