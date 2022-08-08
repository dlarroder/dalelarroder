import headerNavLinks from '@/data/headerNavLinks'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const MobileNav = () => {
  const router = useRouter()
  const [navShow, setNavShow] = useState(false)

  useEffect(() => {
    if (navShow) {
      // Prevent scrolling
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [navShow])

  return (
    <div className="sm:hidden">
      <button
        type="button"
        className="w-8 h-8 py-1 ml-1 mr-1 rounded"
        aria-label="Toggle Menu"
        onClick={() => setNavShow(!navShow)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-gray-900 dark:text-gray-100"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={`fixed w-full h-full top-0 right-0 bg-white dark:bg-black opacity-95 z-20 transform ease-in-out duration-300 ${
          navShow ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex justify-end py-5 px-4">
          <button
            type="button"
            aria-label="toggle modal"
            className="h-8 w-8 rounded"
            onClick={() => setNavShow(!navShow)}
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
        <nav className="fixed h-full mt-8">
          <div key="Home" className="px-12 py-4">
            <Link href="/" onClick={() => setNavShow(!navShow)}>
              <a
                className={classNames(
                  'horizontal-underline backdrop:text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100',
                  { 'horizontal-underline-active': router.pathname === '/' }
                )}
              >
                Home
              </a>
            </Link>
          </div>
          {headerNavLinks.map(({ title, href }) => {
            const active = router.pathname.includes(href)

            return (
              <div key={title} className="px-12 py-4">
                <Link href={href} onClick={() => setNavShow(!navShow)}>
                  <a
                    className={classNames(
                      'horizontal-underline backdrop:text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100',
                      { 'horizontal-underline-active': active }
                    )}
                    aria-label={title}
                  >
                    {title}
                  </a>
                </Link>
              </div>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default MobileNav
