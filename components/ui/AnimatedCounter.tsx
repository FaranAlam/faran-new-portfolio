'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
  onComplete?: () => void;
}

export default function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
  onComplete,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hasAnimated, setHasAnimated] = useState(false);

  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });

  const [displayValue, setDisplayValue] = useState(from);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      motionValue.set(to);
    }
  }, [isInView, motionValue, to, hasAnimated]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(latest);
      
      // Check if animation is complete
      if (Math.abs(latest - to) < 0.01 && onComplete) {
        onComplete();
      }
    });

    return () => unsubscribe();
  }, [springValue, to, onComplete]);

  const formattedValue = displayValue.toFixed(decimals);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}

// Prebuilt counter preset for common use cases
interface CounterPresetProps {
  value: number;
  label: string;
  icon?: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  color?: 'blue' | 'purple' | 'green' | 'orange' | 'pink';
  size?: 'sm' | 'md' | 'lg';
}

export function CounterPreset({
  value,
  label,
  icon,
  suffix = '+',
  prefix = '',
  decimals = 0,
  color = 'blue',
  size = 'md',
}: CounterPresetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const colorClasses = {
    blue: 'from-blue-600 to-blue-400',
    purple: 'from-purple-600 to-purple-400',
    green: 'from-green-600 to-green-400',
    orange: 'from-orange-600 to-orange-400',
    pink: 'from-pink-600 to-pink-400',
  };

  const sizeClasses = {
    sm: { number: 'text-2xl', label: 'text-xs', icon: 'text-xl' },
    md: { number: 'text-4xl', label: 'text-sm', icon: 'text-2xl' },
    lg: { number: 'text-6xl', label: 'text-base', icon: 'text-4xl' },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      {icon && (
        <div className={`mb-2 ${sizeClasses[size].icon}`}>{icon}</div>
      )}
      <div
        className={`font-bold bg-gradient-to-r ${colorClasses[color]} bg-clip-text text-transparent ${sizeClasses[size].number}`}
      >
        <AnimatedCounter
          to={value}
          suffix={suffix}
          prefix={prefix}
          decimals={decimals}
          duration={2}
        />
      </div>
      <p className={`text-gray-600 dark:text-gray-400 font-medium ${sizeClasses[size].label} mt-1`}>
        {label}
      </p>
    </motion.div>
  );
}
