'use client';

import { ReactNode, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  shine?: boolean;
  scale?: boolean;
  shadow?: boolean;
}

export default function Card3D({
  children,
  className = '',
  intensity = 15,
  shine = true,
  scale = true,
  shadow = true,
}: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${intensity}deg`, `-${intensity}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${intensity}deg`, `${intensity}deg`]);
  
  // Always call hooks at top level
  const shineLeft = useTransform(mouseXSpring, [-0.5, 0.5], ['-100%', '100%']);
  const shineTop = useTransform(mouseYSpring, [-0.5, 0.5], ['-100%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      animate={{
        scale: scale && isHovered ? 1.05 : 1,
      }}
      transition={{
        scale: { duration: 0.3 },
      }}
      className={`relative ${className}`}
    >
      {/* Card content */}
      <div
        style={{
          transformStyle: 'preserve-3d',
          transform: 'translateZ(50px)',
        }}
        className="relative z-10"
      >
        {children}
      </div>

      {/* Shine effect */}
      {shine && (
        <motion.div
          className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none z-20"
          style={{
            transform: 'translateZ(75px)',
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0"
            style={{
              left: shineLeft,
              top: shineTop,
            }}
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      )}

      {/* Shadow */}
      {shadow && (
        <motion.div
          className="absolute inset-0 -z-10 blur-xl"
          style={{
            transform: 'translateZ(-50px)',
          }}
          animate={{
            opacity: isHovered ? 0.4 : 0.2,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-500/50 to-purple-500/50 rounded-xl" />
        </motion.div>
      )}
    </motion.div>
  );
}

// Simplified version for less intensive 3D effect
interface CardTiltProps {
  children: ReactNode;
  className?: string;
}

export function CardTilt({ children, className = '' }: CardTiltProps) {
  return (
    <motion.div
      className={`perspective-1000 ${className}`}
      whileHover={{
        rotateX: 5,
        rotateY: 5,
        scale: 1.03,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        style={{
          transform: 'translateZ(20px)',
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

// Floating card effect
export function CardFloat({ children, className = '' }: CardTiltProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        y: -10,
        rotateX: 5,
        rotateY: 5,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </motion.div>
  );
}
