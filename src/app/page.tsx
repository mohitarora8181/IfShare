'use client';

import React, { useEffect, useState } from 'react';
import { FileUpload } from '../components/ui/file-upload';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AnimatedTooltip } from '../components/ui/animated-tooltip';
import something from "@/@/assets/1730644219432_do.jpg"
import { TextRevealCard, TextRevealCardDescription, TextRevealCardTitle } from '../components/ui/text-reveal-card';



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

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="w-full bg-black flex flex-col items-center text-white min-h-full overflow-y-hidden ">
        <div className="w-full flex flex-col items-center">
          <div className='w-full  min-h-[50vh] '>
            <FileUpload />
          </div>

          {isMounted && <div className='flex mt-[-6vh] pl-10 w-full text-white'>
            <div className='flex w-full justify-between p-4  max-sm:hidden'>
              <TextRevealCard
                text="End To End Encryption"
                revealText="All About Privacy"
              />
              <TextRevealCard
                text="Amazingly Fast"
                revealText="High Speed File Sharing"
              />
            </div>

            <div className="flex absolute bottom-10 left-1/2 -translate-x-1/2">
              <AnimatedTooltip items={people} />
            </div>
          </div>}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default HomePage;
