import Image from 'next/image'
import { WorkContainer } from './WorkContainer'
import { WorkLeft } from './WorkLeft'
import { WorkRight } from './WorkRight'
import { WorkTile } from './workTiles'

interface WorkContentProps {
  work: WorkTile
  progress?: number
}

export default function WorkContent({ work, progress }: WorkContentProps) {
  const { title, description, image } = work
  return (
    <WorkContainer>
      <WorkLeft progress={progress}>
        <div>{description}</div>
        <span className="text-4xl md:text-5xl font-semibold tracking-tight">{title}</span>
      </WorkLeft>
      <WorkRight progress={progress}>
        <div className="drop-shadow-2xl">
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
