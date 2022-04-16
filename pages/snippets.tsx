interface SnippetsProps {
  number: number
  setNumber: (v: number) => void
}

const Snippets = ({ number, setNumber }: SnippetsProps) => {
  return (
    <div>
      <span>Clicked {number} times</span>
      <button onClick={() => setNumber(number + 1)}>Click me</button>
    </div>
  )
}

export default Snippets
