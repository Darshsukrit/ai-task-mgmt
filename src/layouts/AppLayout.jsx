import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Sidebar from '../components/layout/Sidebar'
import Topbar from '../components/layout/Topbar'
import { navItems } from '../data/mockData'

const pageTitles = Object.fromEntries(
  navItems.map((item) => [item.path, item.label])
)

export default function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const location = useLocation()
  const title = pageTitles[location.pathname] ?? 'CONTEXTOS'

  return (
    <div className="min-h-screen mesh-bg">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((c) => !c)}
      />

      <div
        className={`
          min-h-screen flex flex-col transition-all duration-300
          ${sidebarCollapsed ? 'ml-[72px]' : 'ml-60 max-md:ml-[72px]'}
        `}
      >
        <Topbar title={title} />

        <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
