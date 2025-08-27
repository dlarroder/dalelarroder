'use client';

import classNames from 'classnames';
import headerNavLinks from 'content/headerNavLinks';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMobileNav } from './MobileNavContext';

export default function MobileNavOverlay() {
  const pathName = usePathname();
  const { navShow, toggleNav } = useMobileNav();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const variants = {
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '100vw' },
  };

  useEffect(() => {
    if (navShow) {
      // Prevent scrolling
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [navShow]);

  return (
    <AnimatePresence>
      {navShow && (
        <motion.div
          key="MobileNavOverlay"
          transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
          animate="enter"
          initial="exit"
          exit="exit"
          variants={variants}
          className={classNames('fixed inset-0 z-[60] h-full w-full bg-white dark:bg-black')}
          style={{
            backgroundColor: isDark ? '#000000' : '#ffffff',
            opacity: 1,
            backdropFilter: 'none',
            WebkitBackdropFilter: 'none',
          }}
        >
          <header className="flex justify-end py-5 px-4">
            <button
              type="button"
              aria-label="toggle modal"
              className="h-8 w-8 rounded"
              onClick={toggleNav}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="text-gray-900 dark:text-gray-100"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </header>
          <nav className="fixed mt-8 h-full">
            <div key="Home" className="px-12 py-4">
              <Link
                href="/"
                onClick={toggleNav}
                className={classNames(
                  'horizontal-underline font-bold tracking-widest text-gray-900 backdrop:text-2xl dark:text-gray-100',
                  { 'horizontal-underline-active': pathName === '/' }
                )}
              >
                Home
              </Link>
            </div>
            {headerNavLinks.map(({ title, href }) => {
              const active = pathName?.includes(href);

              return (
                <div key={title} className="px-12 py-4">
                  <Link
                    href={href}
                    onClick={toggleNav}
                    className={classNames(
                      'horizontal-underline font-bold tracking-widest text-gray-900 backdrop:text-2xl dark:text-gray-100',
                      { 'horizontal-underline-active': active }
                    )}
                    aria-label={title}
                  >
                    {title}
                  </Link>
                </div>
              );
            })}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
