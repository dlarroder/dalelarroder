import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { BsMoonFill, BsSunFill } from 'react-icons/bs'

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
      className="ml-1 mr-1 h-8 w-8 rounded p-1"
      whileTap={{
        scale: 0.7,
        rotate: 360,
        transition: { duration: 0.2 },
      }}
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
          <BsSunFill size={16} />
        ) : (
          <BsMoonFill size={18} />
        )}
      </svg>
    </motion.button>
  )
}

export default ThemeSwitch
