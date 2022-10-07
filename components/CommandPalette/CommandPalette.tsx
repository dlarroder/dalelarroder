import { Command } from 'cmdk'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { TbCommand } from 'react-icons/tb'
import usePaletteOptions from './usePaletteOptions'

export default function CommandPalette() {
  const [open, setOpen] = useState(false)

  const { pageOptions, blogOptions, generalOptions } = usePaletteOptions()

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && e.metaKey) {
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <Command.Dialog open={open} onOpenChange={setOpen}>
        <Command.Input placeholder="Search..." />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>

          <Command.Group heading="General">
            {generalOptions.map(({ id, name, onSelect, icon }) => (
              <Command.Item
                key={id}
                onSelect={(v) => {
                  onSelect(v)
                  setOpen(false)
                }}
                value={id}
              >
                {icon && <div>{icon}</div>}
                <div>{name}</div>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Pages">
            {pageOptions.map(({ id, name, icon, onSelect }) => (
              <Command.Item
                key={id}
                onSelect={(v) => {
                  onSelect(v)
                  setOpen(false)
                }}
                value={id}
              >
                {icon && <div>{icon}</div>}
                <div>{name}</div>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Blogs">
            {blogOptions.map(({ id, name, onSelect }) => (
              <Command.Item
                key={id}
                onSelect={(v) => {
                  onSelect(v)
                  setOpen(false)
                }}
                value={id}
              >
                <div>{name}</div>
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command.Dialog>
      <motion.button
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        type="button"
        className="w-8 h-8 p-1 rounded hidden sm:block"
        whileHover={{ scale: 1.2 }}
      >
        <TbCommand size={22} className="ext-gray-100" />
      </motion.button>
    </>
  )
}
