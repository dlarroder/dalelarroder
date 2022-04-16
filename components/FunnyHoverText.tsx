interface FancyHoverTextProps {
  text: string
}

export const FancyHoverText = ({ text }: FancyHoverTextProps) => {
  return (
    <div>
      {[...text].map((t, i) => (
        <span key={i} className="hover:text-yellow-300 darkhover:text-primary-300">
          {t}
        </span>
      ))}
    </div>
  )
}
