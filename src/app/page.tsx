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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion';


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
    designation: "Full Stack Developer",
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
        {/* <AuroraBackground className='w-[100vw] '> */}
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


          <div className='flex z-50 absolute gap-40 -bottom-[15rem]'>
            <motion.a
              href={`/code/${uniqueID}`}
              animate={{ y: [0, 10, 0], rotate: 10 }}  // Moves from 0 to 100 and then back to 0
              transition={{
                repeat: Infinity,            // Repeat infinitely
                repeatDelay: 1,              // Delay between repeats (in seconds)
                duration: 6,                 // Duration for one full cycle (forward + reverse)
                repeatType: "reverse",       // Reverse the animation after completing one cycle
                ease: "easeInOut",           // Easing function for smooth animation
              }} className="relative text-xl lg:text-[1.3vw] px-4 lg:px-[1.5vw] flex items-center font-semibold text-white bg-zinc-900 
    font-bubble  
    rounded-full 
    "
              style={{
                borderImage: "linear-gradient(to right, #00bcd4, #4caf50) 1", // Gradient border
              }}
            >
              Code Share
            </motion.a>



            <motion.a
              href={`/notes/${uniqueID}`}
              className="relative text-xl  lg:text-[1.3vw] px-4 lg:px-[1.5vw] py-3  text-black rounded-lg font-bubble group"
              drag
              dragControls={controls}
            >
              <p className='bg-gradient-to-r from-cdyan-500 bg-zinc-900 to-greefn-400 px-3 text-white py-1 rounded-md text-center'>Notes Share</p>
            </motion.a>



          </div>

          <div className='flex text-white sm:hidden xl:flex  font-kanit text-xs absolute -bottom-[6rem] z-40'>
            <Accordion type="single" collapsible className="w-full flex items-center gap-20 text-white z-40">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                  Yes. It&apos;s animated by default, but you can disable it if you
                  prefer.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className='flex w-full justify-between absolute -bottom-[10rem] max-sm:hidden z-20'>

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

        {/* </AuroraBackground> */}
        <div className="w-full flex flex-col sm:flex  absolute top-[15.5rem] sm:-bottom-[1.75rem] items-center">
          <motion.div drag dragControls={controls} className="flex absolute bottom-10 z-30">
            <AnimatedTooltip items={people} />
          </motion.div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default HomePage;
