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
import { WavyBackground } from '../components/ui/wavy-background';


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

  useEffect(() => {
    setMounted(true);
    setUniqueID(generateUniqueId());
  }, []);


  return (
    <>
      <div className=''>
        <WavyBackground className='w-[100vw] '>
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
              <a
                href={`/code/${uniqueID}`}
                className="relative text-xl lg:text-[1.3vw] px-4 lg:px-[1.5vw] py-3 font-semibold bg-transparent text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-green-400 
    border- font-bubble border-transparent 
    rounded-full 
    group"
                style={{
                  borderImage: "linear-gradient(to right, #00bcd4, #4caf50) 1", // Gradient border
                }}
              >
                Code Share
              </a>



              <a
                href={`/notes/${uniqueID}`}
                className="relative text-xl lg:text-[1.3vw] px-4 lg:px-[1.5vw] py-3 font-semibold bg-transparent text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-green-400 
    rounded-lg group font-bubble"
              >
                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-400 blur-sm opacity-50"></span>
                Notes Share
              </a>


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

        </WavyBackground>
        <div className="w-full flex flex-col items-center">
          <div className="flex absolute bottom-20 left-1/2 -translate-x-1/2  z-30">
            <AnimatedTooltip items={people} />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default HomePage;
