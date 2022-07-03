import headerNavLinks from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'
import Link from 'next/link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'

export const Header = () => {
  return (
    <header className="py-5 md:py-10 z-40 bg-transparent">
      <div className="flex items-center justify-between max-w-4xl mx-auto ">
        <div>
          <Link href="/" aria-label="Dale Larroder Blog">
            <button className="flex items-center justify-between">
              {typeof siteMetadata.headerTitle === 'string' ? (
                <div className="font-merriweather hidden text-2xl font-semibold sm:block">
                  {siteMetadata.headerTitle}
                </div>
              ) : (
                siteMetadata.headerTitle
              )}
            </button>
          </Link>
        </div>
        <div className="flex items-center text-base leading-5">
          <div className="hidden sm:flex">
            {headerNavLinks.map((link) => {
              return (
                <Link key={link.title} href={link.href}>
                  <button className="horizontal-underline rounded py-1 px-3 font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700">
                    <span className="">{link.title}</span>
                  </button>
                </Link>
              )
            })}
          </div>
          <ThemeSwitch />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
