import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Layers,
  GitBranch,
  BarChart3,
  Target,
  Calendar,
  FileText,
  Settings,
  Sparkles,
} from 'lucide-react'
import { navItems } from '../../data/mockData'

const iconMap = {
  LayoutDashboard,
  Layers,
  GitBranch,
  BarChart3,
  Target,
  Calendar,
  FileText,
  Settings,
}

export default function Sidebar({ collapsed, onToggle }) {
  return (
    <aside
      className={`
        fixed left-0 top-0 z-40 h-full flex flex-col
        border-r border-[var(--color-border)] bg-[var(--color-surface)]
        transition-all duration-300 ease-out
        ${collapsed ? 'w-[72px]' : 'w-60'}
      `}
    >
      <div className="flex items-center gap-3 px-4 h-16 border-b border-[var(--color-border)]">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500/20 to-violet-600/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 text-indigo-400" />
        </div>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="overflow-hidden"
          >
            <span className="text-sm font-semibold tracking-tight text-zinc-100">
              CONTEXTOS
            </span>
            <p className="text-[10px] text-zinc-500 leading-tight">
              Context Intelligence
            </p>
          </motion.div>
        )}
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon]
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative ${
                  isActive
                    ? 'text-zinc-100 bg-white/[0.06]'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-lg bg-indigo-500/[0.08] border border-indigo-500/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className="w-[18px] h-[18px] shrink-0 relative z-10" />
                  {!collapsed && (
                    <span className="relative z-10 truncate">{item.label}</span>
                  )}
                </>
              )}
            </NavLink>
          )
        })}
      </nav>

      <div className="p-3 border-t border-[var(--color-border)]">
        <button
          type="button"
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04] transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <span className={collapsed ? 'rotate-180' : ''}>←</span>
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  )
}
