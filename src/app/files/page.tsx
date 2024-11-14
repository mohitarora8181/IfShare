'use client';

import React, { useEffect, useState } from 'react';
import { FileUpload } from '@/@/components/ui/file-upload';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AnimatedTooltip } from '@/@/components/ui/animated-tooltip';
import something from "@/@/assets/1730644219432_do.jpg"
import { TextRevealCard, TextRevealCardDescription, TextRevealCardTitle } from '@/@/components/ui/text-reveal-card';
import { motion } from 'framer-motion'
import { Button } from '@/@/components/ui/moving-border-button';
import { CodeIcon, FileTextIcon } from '@radix-ui/react-icons';
import { generateUniqueId } from '@/@/lib/utils';



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
      <div className={`w-full bg-black flex flex-col items-center text-white min-h-full overflow-y-hidden ${!isMounted && "justify-center"}`}>
        <div className="w-full flex flex-col items-center">
          <div className='w-full  min-h-[30vh]'>
            <FileUpload showReveal={setMounted} />
          </div>
          {/* <div className='w-full flex justify-between px-10 max-sm:px-5 max-sm:gap-5 absolute top-20 max-sm:top-auto max-sm:bottom-10'>
            <Button className='flex flex-col justify-center'>
              <a href={`/code/${uniqueID}`} className='flex w-full h-full justify-center align-middle whitespace-nowrap gap-2 cursor-pointer select-none'>
                <p className='self-center'>Code Share</p> <CodeIcon className='self-center' width={25} height={25} />
              </a>
            </Button>
            <Button className='flex flex-col justify-center'>
              <a href={`/notes/${uniqueID}`} className='flex w-full h-full justify-center align-middle whitespace-nowrap gap-2 cursor-pointer select-none'>
                <p className='self-center'>Notes Share</p><FileTextIcon className='self-center' width={25} height={25} />
              </a>
            </Button>
          </div> */}
          {isMounted && <motion.div className='flex mt-[-6vh] pl-10 w-full text-white'>
            <div className='flex w-full justify-between p-4  max-sm:hidden'>
              <TextRevealCard
                text="End To End Encryption"
                revealText="All About Privacy"
              />
              <TextRevealCard
                text="Amazingly Fast"
                revealText="High Speed File Sharing"
                className='ml-10'
              />
            </div>

            <div className="flex absolute bottom-10 left-1/2 -translate-x-1/2 max-sm:hidden">
              <AnimatedTooltip items={people} />
            </div>
          </motion.div>}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default HomePage;
