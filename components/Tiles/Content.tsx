interface Props {
  progress?: number
}

export default function Content({ progress }: Props) {
  return <div className="text-9xl">{progress}</div>
}
