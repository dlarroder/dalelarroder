'use client';

import { useEffect, useRef, useState } from 'react';

type ShapeType = 'circle' | 'square' | 'triangle' | 'pentagon' | 'hexagon';

interface Blob {
  id: number;
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  gradientId: string;
  gradientColors: string[];
  sensitivity: number;
  shape: ShapeType;
}

export default function GooeyBackground() {
  const [blobs, setBlobs] = useState<Blob[]>([]);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | undefined>(undefined);

  // Generate random blobs on component mount
  useEffect(() => {
    const colors = ['#DE1D8D', '#BE1588'];

    const shapes: ShapeType[] = ['circle', 'square', 'triangle'];

    const newBlobs: Blob[] = [];
    for (let i = 0; i < 3; i++) {
      // Create a unique gradient ID for each blob
      const gradientId = `gradient-${i}`;

      // Pick two random colors for the gradient
      const colorIndex1 = Math.floor(Math.random() * colors.length);
      let colorIndex2 = Math.floor(Math.random() * colors.length);
      // Ensure we get different colors
      while (colorIndex2 === colorIndex1) {
        colorIndex2 = Math.floor(Math.random() * colors.length);
      }

      // Position blobs to favor the right side of the screen
      const rightBias = Math.random() > 0.1; // 90% chance to be on the right side
      const xPosition = rightBias
        ? dimensions.width * 0.5 + Math.random() * (dimensions.width * 0.5) // Right half
        : dimensions.width * 0.3 + Math.random() * (dimensions.width * 0.3); // Center-right

      // Randomly select a shape
      const shape = shapes[i];

      newBlobs.push({
        id: i,
        x: xPosition,
        y: Math.random() * dimensions.height,
        radius: 60 + Math.random() * 100, // Slightly smaller to accommodate more complex shapes
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        rotation: Math.random() * 360, // Initial rotation in degrees
        rotationSpeed: (Math.random() - 0.5) * 0.5, // Rotation speed in degrees per frame
        color: colors[colorIndex1], // Keep for compatibility
        gradientId,
        gradientColors: [colors[colorIndex1], colors[colorIndex2]],
        sensitivity: 0.3 + Math.random() * 0.7, // Random sensitivity between 0.3 and 1.0
        shape,
      });
    }
    setBlobs(newBlobs);

    // Update dimensions based on window size
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    const handleMouseLeave = () => {
      setMousePosition(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Generate SVG path for different shapes
  const getShapePath = (blob: Blob): string => {
    const { shape, radius, x, y, rotation } = blob;

    switch (shape) {
      case 'circle':
        // Circles don't need a path
        return '';
      case 'square':
        // Square with rounded corners
        const size = radius * 1.8;
        return `M${x - size / 2},${y - size / 2 + size / 10} 
                Q${x - size / 2},${y - size / 2} ${x - size / 2 + size / 10},${y - size / 2} 
                L${x + size / 2 - size / 10},${y - size / 2} 
                Q${x + size / 2},${y - size / 2} ${x + size / 2},${y - size / 2 + size / 10} 
                L${x + size / 2},${y + size / 2 - size / 10} 
                Q${x + size / 2},${y + size / 2} ${x + size / 2 - size / 10},${y + size / 2} 
                L${x - size / 2 + size / 10},${y + size / 2} 
                Q${x - size / 2},${y + size / 2} ${x - size / 2},${y + size / 2 - size / 10} 
                Z`;
      case 'triangle':
        // Equilateral triangle
        const height = radius * 1.8;
        const halfWidth = height * Math.cos(Math.PI / 6);
        return `M${x},${y - height / 1.5} 
                L${x + halfWidth},${y + height / 3} 
                L${x - halfWidth},${y + height / 3} 
                Z`;
      case 'pentagon':
        // Regular pentagon
        return generatePolygon(x, y, radius * 1.2, 5, rotation);
      case 'hexagon':
        // Regular hexagon
        return generatePolygon(x, y, radius * 1.2, 6, rotation);
      default:
        return '';
    }
  };

  // Helper function to generate regular polygons
  const generatePolygon = (
    x: number,
    y: number,
    radius: number,
    sides: number,
    rotation: number
  ): string => {
    let path = '';
    const angleStep = (Math.PI * 2) / sides;
    const rotationRad = (rotation * Math.PI) / 180;

    for (let i = 0; i < sides; i++) {
      const angle = i * angleStep + rotationRad;
      const pointX = x + radius * Math.cos(angle);
      const pointY = y + radius * Math.sin(angle);

      if (i === 0) {
        path += `M${pointX},${pointY} `;
      } else {
        path += `L${pointX},${pointY} `;
      }
    }

    return path + 'Z';
  };

  // Animation loop
  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      setBlobs((prevBlobs) =>
        prevBlobs.map((blob) => {
          let newX = blob.x + blob.speedX;
          let newY = blob.y + blob.speedY;
          let newRotation = blob.rotation + blob.rotationSpeed;

          // Apply mouse interaction if mouse is over the canvas
          if (mousePosition) {
            // Calculate distance between blob and mouse
            const dx = mousePosition.x - blob.x;
            const dy = mousePosition.y - blob.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Apply force inversely proportional to distance (with a minimum distance to avoid extreme forces)
            const minDistance = 100;
            const maxForce = 2;

            if (distance > minDistance) {
              // Create a force that attracts blobs to the mouse
              // The force diminishes with distance (inverse square law)
              const force = maxForce * (1 / (distance / 100));

              // Normalize direction vector
              const directionX = dx / distance;
              const directionY = dy / distance;

              // Apply force based on blob's sensitivity
              newX += directionX * force * blob.sensitivity;
              newY += directionY * force * blob.sensitivity;
            } else {
              // If too close, create a slight repulsion effect
              const repulsionForce = 1;
              const directionX = dx / distance;
              const directionY = dy / distance;

              newX -= directionX * repulsionForce * blob.sensitivity;
              newY -= directionY * repulsionForce * blob.sensitivity;
            }
          }

          // Bounce off edges with a bias to keep blobs more on the right side
          if (newX <= 0) {
            blob.speedX = Math.abs(blob.speedX) * 1.1; // Bounce right with extra force
            newX = blob.x + blob.speedX;
          } else if (newX >= dimensions.width) {
            blob.speedX = -Math.abs(blob.speedX);
            newX = blob.x + blob.speedX;
          }

          if (newY <= 0 || newY >= dimensions.height) {
            blob.speedY *= -1;
            newY = blob.y + blob.speedY;
          }

          // Keep rotation between 0-360 degrees
          if (newRotation > 360) newRotation -= 360;
          if (newRotation < 0) newRotation += 360;

          return {
            ...blob,
            x: newX,
            y: newY,
            rotation: newRotation,
          };
        })
      );
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [dimensions, mousePosition]);

  return (
    <div className="absolute inset-0 w-full h-full bg-white dark:bg-black">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="gooey"
            />
          </filter>

          {/* Define gradients for each blob */}
          {blobs.map((blob) => (
            <radialGradient
              key={blob.gradientId}
              id={blob.gradientId}
              cx="50%"
              cy="50%"
              r="50%"
              fx="25%"
              fy="25%"
            >
              <stop offset="0%" stopColor={blob.gradientColors[0]} />
              <stop offset="100%" stopColor={blob.gradientColors[1]} />
            </radialGradient>
          ))}
        </defs>
        <g filter="url(#gooey)">
          {blobs.map((blob) =>
            blob.shape === 'circle' ? (
              <circle
                key={blob.id}
                cx={blob.x}
                cy={blob.y}
                r={blob.radius}
                fill={`url(#${blob.gradientId})`}
                opacity="0.8"
              />
            ) : (
              <path
                key={blob.id}
                d={getShapePath(blob)}
                fill={`url(#${blob.gradientId})`}
                opacity="0.8"
                transform={`rotate(${blob.rotation}, ${blob.x}, ${blob.y})`}
              />
            )
          )}
        </g>
      </svg>
    </div>
  );
}
