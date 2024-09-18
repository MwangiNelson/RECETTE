import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { Boxes } from '../ui/background-boxes'


const PageTransition = ({ children }) => {
    const location = useLocation()
    return (
        <AnimatePresence>  
           { location.pathname === '/' ? <Boxes /> : null}
            <motion.div
                key={location.pathname + 'page'}
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 1 }}
                className='fixed top-0 left-0 w-screen h-screen bg-[#ff5400] pointer-events-none z-[99]'
            />
            
            {children}
        </AnimatePresence>
    )
}

export default PageTransition