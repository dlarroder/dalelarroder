import { Command } from 'cmdk'
import { ReactNode, useCallback } from 'react'

interface CommandItemProps {
  id: string
  name: string
  onSelect: (v: string) => void
  setOpen: (v: boolean) => void
  icon?: ReactNode
}

export default function CommandItem({ id, name, onSelect, setOpen, icon }: CommandItemProps) {
  const handleSelect = useCallback(
    (v: string) => {
      onSelect(v)
      setOpen(false)
    },
    [onSelect, setOpen]
  )

  return (
    <Command.Item key={id} onSelect={handleSelect} value={id}>
      {icon && <div>{icon}</div>}
      <div>{name}</div>
    </Command.Item>
  )
}
