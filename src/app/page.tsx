'use client';

import React, { useEffect, useState } from 'react';
import { FileUpload } from '../components/ui/file-upload';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AnimatedTooltip } from '../components/ui/animated-tooltip';
import something from "@/@/assets/1730644219432_do.jpg"
import { TextRevealCard } from '../components/ui/text-reveal-card';
import { motion } from 'framer-motion'
import { generateUniqueId } from '../lib/utils';
import { useDragControls } from "motion/react"
import { AuroraBackground } from '../components/ui/aurora-background';


const people = [
  {
    id: 1,
    name: "Mohit Arora",
    designation: "Full Stack Developer",
    image: something
  },
  {
    id: 2,
    name: "Murtaza",
    designation: "Web Developer",
    image: something
  },
];




const HomePage = () => {
  const [isMounted, setMounted] = useState(false);
  const [uniqueID, setUniqueID] = useState("");
  const controls = useDragControls()

  useEffect(() => {
    setMounted(true);
    setUniqueID(generateUniqueId());
  }, []);


  return (
    <>
      <div className=''>
        <AuroraBackground className='w-[100vw] '>
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="relative flex flex-col gap-4 items-center justify-center px-4"
          >
            <div className='w-full'>
              <FileUpload showReveal={setMounted} />
            </div>


            <div className='flex absolute bottom-[10rem] gap-40 z-50'>
              <motion.a
                href={`/code/${uniqueID}`}
                animate={{ y: [0, 10, 0]  , rotate:10}}  // Moves from 0 to 100 and then back to 0
  transition={{
    repeat: Infinity,            // Repeat infinitely
    repeatDelay: 1,              // Delay between repeats (in seconds)
    duration: 6,                 // Duration for one full cycle (forward + reverse)
    repeatType: "reverse",       // Reverse the animation after completing one cycle
    ease: "easeInOut",           // Easing function for smooth animation
  }}                className="relative text-xl lg:text-[1.3vw] px-4 lg:px-[1.5vw] py-3 font-semibold bg-transparent text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-green-400 
    border- font-bubble border-transparent 
    rounded-full 
    group"
                style={{
                  borderImage: "linear-gradient(to right, #00bcd4, #4caf50) 1", // Gradient border
                }}
              >
                Code Share
              </motion.a>



              <motion.a
                href={`/notes/${uniqueID}`}
                animate={{ y: [0, 10, 0]  , rotate:10 }}  // Moves from 0 to 100 and then back to 0
  transition={{
    repeat: Infinity,            // Repeat infinitely
    repeatDelay: 1,              // Delay between repeats (in seconds)
    duration: 6,                 // Duration for one full cycle (forward + reverse)
    repeatType: "reverse",       // Reverse the animation after completing one cycle
    ease: "easeInOut",           // Easing function for smooth animation
  }}
                className="relative text-xl  lg:text-[1.3vw] px-4 lg:px-[1.5vw] py-3 font-semibold text-black rounded-lg font-bubble group"
                drag
                dragControls={controls}
              >
                <p className='bg-gradient-to-r from-cyan-500 to-green-400 bg-clip-text hover:text-green-400'>Notes Share</p>
              </motion.a>



            </div>

            <div className='flex w-[100vw] justify-between p-4  max-sm:hidden'>

              <TextRevealCard
                text="End To End Encryption"
                revealText="All About Privacy"
                texttwo="encryption secures files so only the sender and recipient can access them, keeping data private from everyone else."
              />
              <TextRevealCard
                text="Amazingly Fast"
                revealText="High Speed File Sharing"
                texttwo="Experience ultra-fast file sharing, streamlined for seamless transfers without compromising efficiency."
                className='ml-10'
              />
            </div>
          </motion.div>

        </AuroraBackground>
        <div className="w-full flex flex-col items-center">
          <motion.div drag dragControls={controls} className="flex absolute bottom-20 left-1/2 -translate-x-1/2  z-30">
            <AnimatedTooltip items={people} />
          </motion.div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default HomePage;
