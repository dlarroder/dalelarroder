import Image from 'next/image'
import { WorkContainer } from './WorkContainer'
import { WorkLeft } from './WorkLeft'
import { WorkRight } from './WorkRight'
import { WorkTile } from './workTiles'

interface WorkContentProps {
  work: WorkTile
  progress?: number
}

export default function WorkContent({ work, progress = 0 }: WorkContentProps) {
  const { title, description, image } = work
  return (
    <WorkContainer>
      <WorkLeft progress={progress}>
        <div className="text-2xl font-medium md:text-3xl xl:text-4xl">{description}</div>
        <span className="text-4xl font-bold tracking-tight md:text-5xl xl:text-6xl">{title}</span>
      </WorkLeft>
      <WorkRight progress={progress}>
        <div className="drop-shadow-2xl sm:mt-10 md:mt-24">
          <Image src={image.src} alt={title} width={image.width} height={image.height} />
        </div>
      </WorkRight>
    </WorkContainer>
  )
}
