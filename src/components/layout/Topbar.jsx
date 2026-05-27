import { Search, Bell, Command, Zap, ZapOff } from 'lucide-react'
import Button from '../ui/Button'
import Avatar from '../ui/Avatar'
import useLocalStorage from '../../hooks/useLocalStorage'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'

export default function Topbar({ title }) {
  const [reducedPref, setReducedPref] = useLocalStorage('reducedMotion', undefined)
  const systemPref = usePrefersReducedMotion()
  const reduced = typeof reducedPref === 'undefined' ? systemPref : reducedPref

  function toggleReduced() {
    setReducedPref(!reduced)
  }

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center justify-between gap-4 px-6 border-b border-[var(--color-border)] bg-[var(--color-base)]/80 backdrop-blur-xl">
      <div className="flex items-center gap-4 min-w-0">
        {title && (
          <h2 className="text-sm font-medium text-zinc-400 hidden lg:block truncate">
            {title}
          </h2>
        )}
        <button
          type="button"
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-[var(--color-border)] text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.05] transition-colors min-w-[200px] sm:min-w-[280px]"
        >
          <Search className="w-4 h-4 shrink-0" />
          <span className="text-sm truncate">Search context...</span>
          <kbd className="ml-auto hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/[0.06] text-zinc-500 border border-[var(--color-border)]">
            <Command className="w-3 h-3" />K
          </kbd>
        </button>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <Button variant="ghost" size="sm" className="!p-2" onClick={toggleReduced}>
          {reduced ? <ZapOff className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
        </Button>
        <Button variant="ghost" size="sm" className="!p-2 relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400" />
        </Button>
        <div className="h-6 w-px bg-[var(--color-border)] hidden sm:block" />
        <div className="flex items-center gap-2.5 pl-1">
          <Avatar initials="SC" size="sm" />
          <div className="hidden sm:block text-left">
            <p className="text-xs font-medium text-zinc-200 leading-tight">Sarah Chen</p>
            <p className="text-[10px] text-zinc-500">Pro</p>
          </div>
        </div>
      </div>
    </header>
  )
}
