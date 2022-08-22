import siteMetadata from '@/data/siteMetadata'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'

export default function Giscus() {
  const { theme, resolvedTheme } = useTheme()
  const COMMENTS_ID = 'comments-container'

  useEffect(() => {
    const commentsTheme =
      siteMetadata.comment.giscusConfig.themeURL === ''
        ? theme === 'dark' || resolvedTheme === 'dark'
          ? siteMetadata.comment.giscusConfig.darkTheme
          : siteMetadata.comment.giscusConfig.theme
        : siteMetadata.comment.giscusConfig.themeURL

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', siteMetadata.comment.giscusConfig.repo)
    script.setAttribute('data-repo-id', siteMetadata.comment.giscusConfig.repositoryId)
    script.setAttribute('data-category', siteMetadata.comment.giscusConfig.category)
    script.setAttribute('data-category-id', siteMetadata.comment.giscusConfig.categoryId)
    script.setAttribute('data-mapping', 'title')
    script.setAttribute('data-reactions-enabled', siteMetadata.comment.giscusConfig.reactions)
    script.setAttribute('data-emit-metadata', siteMetadata.comment.giscusConfig.metadata)
    script.setAttribute('data-theme', commentsTheme)
    script.setAttribute('crossOrigin', 'anonymous')
    script.async = true

    const comments = document.getElementById(COMMENTS_ID)
    if (comments) comments.appendChild(script)

    return () => {
      const comments = document.getElementById(COMMENTS_ID)
      if (comments) comments.innerHTML = ''
    }
  }, [theme, resolvedTheme])

  return (
    <div className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300">
      <div className="giscus" id={COMMENTS_ID} />
    </div>
  )
}
