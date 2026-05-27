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
                  ? 'bg-primary/10 text-primary'
                  : 'text-base-content/70 hover:text-primary hover:bg-base-200'
              }
            `}
          >
            <span className={item.isActive ? 'text-primary' : ''}>
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
                ? 'bg-primary/10 text-primary'
                : 'text-base-content/70 hover:text-primary hover:bg-base-200'
            }
          `}
        >
          <span className={item.isActive ? 'text-primary' : ''}>
            {item.icon}
          </span>
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  )
}
