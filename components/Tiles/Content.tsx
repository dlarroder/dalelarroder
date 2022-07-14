import Image from 'next/image'
import { WorkContainer, WorkLeft, WorkRight } from '../Work/works'
import { WorkTile } from './Works'

interface Props {
  work: WorkTile
  progress?: number
}

export default function Content({ work, progress }: Props) {
  const { title, description, image } = work
  return (
    <WorkContainer>
      <WorkLeft progress={progress}>
        <div>{description}</div>
        <span className="text-4xl md:text-5xl font-semibold tracking-tight">{title}</span>
      </WorkLeft>
      <WorkRight progress={progress}>
        <Image
          src={image.src}
          alt={title}
          layout="responsive"
          width={image.width}
          height={image.height}
        />
      </WorkRight>
    </WorkContainer>
  )
}
