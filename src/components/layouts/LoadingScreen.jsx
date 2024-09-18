import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Burger from '../../assets/burger.png';
import Eggs from '../../assets/EGGS.png';
import { Button, Carousel } from 'flowbite-react';
import { TypewriterEffect } from '../ui/typewriter-effect';

const LoadingScreen = () => {


    return (
        <div className='w-full min-h-screen h-fit flex justify-center items-center bg-[#202020]/60'>
            <div className='w-full h-full flex flex-col justify-center items-center'>
                <div className="flex min-h-[50] flex-row gap-10 w-full items-center justify-center transition-all ease-in-out duration-300">
                    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 w-full flex flex-row items-center justify-center">
                        <Carousel
                            leftControl={<button className='hidden'></button>}
                            rightControl={<button className='hidden'></button>}
                            indicators={false}
                            className='w-1/2'
                            slideInterval={5000}>
                            <div className="flex w-1/2 items-center justify-center">
                                <img src={Burger} alt="burger" className=' h-fit object-contain w-[200px] animate-floating' />
                            </div>
                            <div className="flex w-1/2 items-center justify-center">
                                <img src={Eggs} alt="eggs" className=' h-fit object-contain w-[200px] animate-floating' />
                            </div>
                        </Carousel>
                    </div>
                </div>
                <h3 className="relative text-4xl text-gray-300 ">
                    Let me cook ...
                </h3>
            </div>
        </div>
    )
}

export default LoadingScreen;
