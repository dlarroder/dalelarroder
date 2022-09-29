import { Switch as PlaygroundSwitch } from '@dlarroder/playground'
import { useState } from 'react'

export default function Switch() {
  const [checked, setChecked] = useState(false)

  return (
    <div className="flex space-x-4 bg-white text-black p-4 rounded-lg items-center w-fit">
      <div className="flex flex-col space-y-2 items-center">
        <span>Small</span>
        <PlaygroundSwitch checked={checked} onChange={setChecked} size="small" />
      </div>

      <div className="flex flex-col space-y-2 items-center">
        <span>Default</span>
        <PlaygroundSwitch checked={checked} onChange={setChecked} />
      </div>

      <div className="flex flex-col space-y-2 items-center">
        <span>Large</span>
        <PlaygroundSwitch checked={checked} onChange={setChecked} size="large" />
      </div>

      <div className="flex flex-col space-y-2 items-center">
        <span>Disabled</span>
        <div className="flex space-x-4">
          <PlaygroundSwitch checked onChange={setChecked} disabled />
          <PlaygroundSwitch checked={false} onChange={setChecked} disabled />
        </div>
      </div>
    </div>
  )
}
