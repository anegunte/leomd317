'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  duration?: number; // duration in seconds
  suffix?: string;
  prefix?: string;
}

export default function AnimatedCounter({ value, duration = 2, suffix = '', prefix = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState(0);

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 25,
    stiffness: 75,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.floor(latest));
    });
    return () => unsubscribe();
  }, [springValue]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}
