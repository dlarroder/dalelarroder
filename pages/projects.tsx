import Card from '@/components/Card'
import LayoutWrapper from '@/components/LayoutWrapper'
import { PageSEO } from '@/components/SEO'
import projectsData from '@/data/projectsData'
import siteMetadata from '@/data/siteMetadata'

export default function Projects() {
  return (
    <LayoutWrapper>
      <PageSEO title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div>
        <div className="pt-6 pb-8 space-y-2 md:space-y-5 ">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Here are some selected projects I'd like to share
          </p>
        </div>
        <div className="container py-5">
          <div className="flex flex-wrap -m-4">
            {projectsData.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
              />
            ))}
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}
