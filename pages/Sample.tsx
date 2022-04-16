import { useState } from 'react'
import Snippets from './snippets'

const Sample = () => {
  const [number, setNumber] = useState(0)

  return <Snippets number={number} setNumber={setNumber} />
}

export default Sample
