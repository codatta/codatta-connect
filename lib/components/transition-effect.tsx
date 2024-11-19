import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

const TransitionContainer = (props: {children: React.ReactNode, className?: string}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 30, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={props.className}
      >
        {props.children}
      </motion.div>
    </AnimatePresence>
  )
}

export default TransitionContainer
