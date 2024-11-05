'use client';

import React from 'react';
import { FileUpload } from '../components/ui/file-upload';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { InfiniteMovingCards } from '../components/ui/infinite-moving-cards';

const testimonials = [
  {
    quote:"Just Tap and Share: Experience Blazing Fast File Transfers with End-to-End Encryption, Ensuring Your Data Is Always Secure While You Share Effortlessly!",
    name: "Tap And Share",
    // title: "Hamlet",
  },
  {
    quote: "Share Files at Lightning Speed While Ensuring Their Safety: Our End-to-End Encryption Keeps Your Data Secure, Allowing You to Transfer Files Effortlessly and With Confidence!",
    name: "Extremely Fast Speed",
    // title: "A Dream Within a Dream",
  },
  {
    quote: "Elevate Your Sharing Experience with End-to-End Encryption: Our Service Guarantees That Your Files Are Securely Encrypted from the Moment You Upload Until They're in the Hands of the Recipient. Share Freely and Safely!",
    name: "End To End Encryption",
    // title: "Moby-Dick",
  },
];

const HomePage = () => {
  return (
    <>
      <div className="w-full bg-black flex flex-col items-center justify-center text-white min-h-screen">
        <div className="w-full flex flex-col items-center">

          {/* File Upload Section */}
          <div className='w-full min-h-[50vh] '>
            <FileUpload />
          </div>

          {/* Testimonials Section */}
          <div className='flex mt-[-6vh] w-full '>
            <InfiniteMovingCards
              items={testimonials}
              direction="right"
              speed="slow"
            />
          </div>

          {/* Additional Content to Enable Scrolling */}
          {/* <div className='w-full h-[200vh]'></div> This adds extra height for scrolling */}

        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default HomePage;
