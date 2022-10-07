import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { TbBolt, TbBoltOff } from 'react-icons/tb'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  return (
    <motion.button
      id="theme-btn"
      aria-label="Toggle Dark Mode"
      type="button"
      className="w-8 h-8 p-1 rounded"
      whileHover={{ scale: 1.2 }}
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="text-gray-900 dark:text-gray-100"
      >
        {mounted && (theme === 'dark' || resolvedTheme === 'dark') ? (
          <TbBolt size={20} />
        ) : (
          <TbBoltOff size={20} />
        )}
      </svg>
    </motion.button>
  )
}

export default ThemeSwitch
