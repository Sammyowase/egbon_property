'use client';

import { useEffect, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

// Client-only wrapper component
export const ClientOnly = ({ children }: { children: ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <>{children}</>;
};

// Client-only ScrollReveal component
export const ClientScrollReveal = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  className = '' 
}: {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  className?: string;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // During SSR or before hydration, render without animations
  if (!isMounted) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0, 
        y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0, 
        x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0 
      }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ delay, duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};

// Client-only StaggerContainer component
export const ClientStaggerContainer = ({ 
  children, 
  className = '' 
}: { 
  children: ReactNode; 
  className?: string;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // During SSR or before hydration, render without animations
  if (!isMounted) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
      }}
    >
      {children}
    </motion.div>
  );
};

// Client-only StaggerItem component
export const ClientStaggerItem = ({ 
  children 
}: { 
  children: ReactNode;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // During SSR or before hydration, render without animations
  if (!isMounted) {
    return <div>{children}</div>;
  }
  
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 }
      }}
    >
      {children}
    </motion.div>
  );
};