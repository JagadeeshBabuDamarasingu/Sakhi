'use client'

import type { SkillCategory } from '../types'
import {
  LuPalette as Palette,
  LuChefHat as ChefHat,
  LuScissors as Scissors,
  LuBookOpen as BookOpen,
  LuLaptop as Laptop,
  LuSparkles as Sparkles,
  LuLeaf as Leaf,
  LuHouse as Home,
  LuChevronRight as ChevronRight,
} from 'react-icons/lu'

interface CategoryBrowserProps {
  categories: SkillCategory[]
  onSelectCategory?: (categoryId: string) => void
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  palette: Palette,
  'chef-hat': ChefHat,
  scissors: Scissors,
  'book-open': BookOpen,
  laptop: Laptop,
  sparkles: Sparkles,
  leaf: Leaf,
  home: Home,
}

const categoryColors: Record<string, string> = {
  'cat-001': 'from-violet-500 to-purple-600',
  'cat-002': 'from-orange-500 to-red-500',
  'cat-003': 'from-pink-500 to-rose-600',
  'cat-004': 'from-blue-500 to-indigo-600',
  'cat-005': 'from-cyan-500 to-blue-600',
  'cat-006': 'from-rose-400 to-pink-500',
  'cat-007': 'from-green-500 to-emerald-600',
  'cat-008': 'from-amber-500 to-orange-500',
}

export function CategoryBrowser({ categories, onSelectCategory }: CategoryBrowserProps) {
  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden">
      <div className="p-4 border-b border-stone-200 dark:border-stone-800">
        <h3 className="font-semibold text-stone-900 dark:text-stone-100">Browse by Category</h3>
        <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">
          Find skills in your area of expertise
        </p>
      </div>

      <div className="divide-y divide-stone-100 dark:divide-stone-800">
        {categories.map((category) => {
          const IconComponent = iconMap[category.icon] || Sparkles
          const gradientColor = categoryColors[category.id] || 'from-stone-500 to-stone-600'

          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory?.(category.id)}
              className="w-full flex items-center gap-4 p-4 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors text-left group"
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradientColor} flex items-center justify-center shadow-lg shadow-stone-200/50 dark:shadow-none`}
              >
                <IconComponent className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-stone-900 dark:text-stone-100">
                    {category.name}
                  </h4>
                  <span className="text-xs text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded-full">
                    {category.skillCount} skills
                  </span>
                </div>
                <p className="text-sm text-stone-500 dark:text-stone-400 truncate mt-0.5">
                  {category.popularSkills.slice(0, 3).join(', ')}
                </p>
              </div>

              {/* Arrow */}
              <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-rose-500 group-hover:translate-x-1 transition-all" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
