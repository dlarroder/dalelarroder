'use client';

import { motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { MoonIcon } from '../icons/moon-icon';
import { SunMediumIcon } from '../icons/sun-icon';

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  return (
    <div className="absolute top-4 right-4 z-10">
      <motion.button
        aria-label="Toggle Dark Mode"
        type="button"
        whileTap={{
          scale: 0.7,
          rotate: 360,
          transition: { duration: 0.2 },
        }}
        whileHover={{ scale: 1.2 }}
        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      >
        {mounted && (theme === 'dark' || resolvedTheme === 'dark') ? (
          <SunMediumIcon className="h-9 w-9" />
        ) : (
          <MoonIcon className="h-9 w-9" />
        )}
      </motion.button>
    </div>
  );
};

export default ThemeSwitch;
