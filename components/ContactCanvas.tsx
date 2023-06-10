import { MouseEventHandler, ReactNode, useEffect, useRef, useState } from 'react'

interface ContactCanvasProps {
  children?: ReactNode
}

export function ContactCanvas({ children }: ContactCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    const { current: canvas } = canvasRef

    if (canvas && window) {
      canvas.width = window.innerWidth * 2
      canvas.height = window.innerHeight * 2
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      canvas.style.background = 'transparent'

      const context = canvas.getContext('2d')
      if (context) {
        context.scale(2, 2)
        context.lineCap
        context.lineWidth = 10
        contextRef.current = context
      }
    }
  }, [])

  const startDrawing: MouseEventHandler<HTMLCanvasElement> = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent
    if (contextRef.current) {
      contextRef.current.beginPath()
      contextRef.current.moveTo(offsetX, offsetY)
    }

    setIsDrawing(true)
  }

  const finishDrawing = () => {
    if (contextRef.current) {
      contextRef.current.closePath()
    }
    setIsDrawing(false)
  }

  const draw: MouseEventHandler<HTMLCanvasElement> = ({ nativeEvent }) => {
    if (!isDrawing) {
      return
    }

    const { offsetX, offsetY } = nativeEvent
    if (contextRef.current) {
      // const angle = Math.atan2(offsetY, offsetX) - Math.PI / 2
      // const offX1 = offsetX + (10 / 2.25) * Math.cos(angle)
      // const offY1 = offsetY + (10 / 2.25) * Math.sin(angle)
      // const offX2 = offsetX + (10 / 2.25) * Math.cos(angle - Math.PI)
      // const offY2 = offsetY + (10 / 2.25) * Math.sin(angle - Math.PI)

      // const gradient = contextRef.current.createLinearGradient(offX1, offY1, offX2, offY2)
      // gradient.addColorStop(0, 'red')
      // gradient.addColorStop(0.5, 'blue')
      // gradient.addColorStop(1, 'orange')

      contextRef.current.strokeStyle = '#de1d8d'
      contextRef.current.lineTo(offsetX, offsetY)
      contextRef.current.lineCap = 'round'
      contextRef.current.stroke()
    }
  }
  return (
    <div className="relative">
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        onDoubleClick={() => {
          // clear canvas
          if (contextRef.current) {
            contextRef.current.clearRect(0, 0, window.innerWidth * 2, window.innerHeight * 2)
          }
        }}
        ref={canvasRef}
      >
        {children}
      </canvas>
      <div
        className="absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2
 transform"
      >
        <h5 className="darktext-black text-8xl text-white">Let's make something great together.</h5>
      </div>
    </div>
  )
}
