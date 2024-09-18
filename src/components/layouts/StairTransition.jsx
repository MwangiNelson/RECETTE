import { AnimatePresence ,animate,motion } from 'framer-motion'
import React from 'react'
import { useLocation } from 'react-router-dom'
const StairTransition = () => {
  const location = useLocation()

  const stairAnimation = {
    initial:{   
        top:"0%"
    },
    animate:{
        top:"100%"
    },
    exit:{
        top:["100%","0%"]
    }
  }

  const reverseIndex = (index)=>{
    const totalSteps = 6
    return totalSteps - index -1
  }
  const Stairs = () =>{
    return(
        <>
            {[...Array(6).keys()].map((_ ,index)=>(
                <motion.div 
                key={index} 
                className='w-full h-full bg-white relative' 
                variants={stairAnimation} 
                initial="initial" 
                animate="animate" 
                exit="exit" 
                transition={{
                    duration:0.5, 
                    delay:reverseIndex(index)*0.1 ,
                    ease:"easeInOut"
                }}
                />
            ))}
        </>
    )
  }

  return (
    <AnimatePresence mode='wait'>
        <div key={location.pathname + 'stair'}>
            <div className="h-screen w-screen fixed top-0 left-0 right-0 pointer-events-none z-40 flex" >
                <Stairs />
            </div>
        </div>

    </AnimatePresence>
  )
}

export default StairTransition