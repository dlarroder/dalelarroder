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
        <div className="font-medium text-2xl md:text-3xl xl:text-4xl">{description}</div>
        <span className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight">{title}</span>
      </WorkLeft>
      <WorkRight progress={progress}>
        <div className="drop-shadow-2xl md:mt-24 sm:mt-10">
          <Image
            src={image.src}
            alt={title}
            layout="responsive"
            width={image.width}
            height={image.height}
          />
        </div>
      </WorkRight>
    </WorkContainer>
  )
}
