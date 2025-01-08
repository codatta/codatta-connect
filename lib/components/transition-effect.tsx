import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

/**
 * TransitionContainer component adds transition animation effects to child elements
 * 
 * @param props.children - Child elements that need transition effects
 * @param props.className - Optional custom className
 * @returns A wrapper component with transition animation effects
 */
const TransitionContainer = (props: {children: React.ReactNode, className?: string}) => {
  return (
    // AnimatePresence handles enter/exit animations for components
    <AnimatePresence>
      {/* motion.div provides the actual animation effects */}
      <motion.div
        // Initial state: fully transparent
        initial={{ x: 0, opacity: 0 }}
        // Animated state: fully visible
        animate={{ x: 0, opacity: 1 }}
        // Exit state: move 30px right and fade out
        exit={{ x: 30, opacity: 0 }}
        // Animation duration of 0.3 seconds
        transition={{ duration: 0.3 }}
        className={props.className}
      >
        {props.children}
      </motion.div>
    </AnimatePresence>
  );
}

export default TransitionContainer
