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
import { FloatingDock } from '../components/ui/floating-dock';
import { IconBrandGithub, IconBrandX, IconExchange, IconHome, IconNewSection, IconTerminal2 } from '@tabler/icons-react';
import { FaCode } from "react-icons/fa6";
import { MdOutlineDraw } from "react-icons/md";
import { GrNotes } from "react-icons/gr";



const people = [
  {
    id: 1,
    name: "Mohit Arora",
    designation: "Full Stack Developer",
    image: something, 
    href: "https://github.com/MurtazaKhannn"
  },
  {
    id: 2,
    name: "Murtaza",
    designation: "Full Stack Developer",
    image: something,
    href: "https://github.com/MurtazaKhannn"
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

  const links = [

    {
      title: "Code Share",
      icon: (
        <FaCode className="h-full w-full text-white dark:text-neutral-700" />
      ),
      href: `/code/${uniqueID}`,
    },
  
    {
      title: "Whiteboard",
      icon: (
        <MdOutlineDraw className="h-full w-full text-white dark:text-neutral-300" />
      ),
      href: `/whiteboard/${uniqueID}`,
    },
    {
      title: "Notes Share",
      icon: (
        <GrNotes className="h-full w-full text-white dark:text-neutral-300" />
      ),
      href: `/notes/${uniqueID}`,
    },
  ];


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
            {/* <motion.a
              href={`/code/${uniqueID}`}
               className="relative text-xl lg:text-[1.3vw] flex items-center text-white  
    font-bubble  
    rounded-full 
    "
              style={{
                borderImage: "linear-gradient(to right, #00bcd4, #4caf50) 1", // Gradient border
              }}
            >
              <p className='text-sm bg-zinc-900 px-4 text-white py-2 rounded-md text-center'>Code Share</p>
              </motion.a>



            <motion.a
              href={`/notes/${uniqueID}`}
              className="relative text-xl  lg:text-[1.3vw] px-4 lg:px-[1.5vw] py-3  text-black rounded-lg font-bubble group"
              drag
              dragControls={controls}
            >
              <p className='bg-gradient-to-r from-cdyan-500 bg-zinc-900 to-greefn-400 px-4 text-white py-2 text-sm rounded-md text-center'>Notes Share</p>
            </motion.a> */}

            <FloatingDock mobileClassName='absolute right-[6rem] -bottom-' items={links} />



          </div>

          <div className='flex text-white sm:hidden xl:flex  font-kanit text-xs absolute -bottom-[6rem] z-40'>
            <Accordion type="single" collapsible className="w-full flex items-center gap-20  text-white z-40">
              <AccordionItem value="item-1">
                <AccordionTrigger className='bg-zinc-900 px-3 rounded-md py-1'>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className='bg-zinc-900 px-3 rounded-md py-1'>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className='bg-zinc-900 px-3 rounded-md py-1'>Is it animated?</AccordionTrigger>
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
