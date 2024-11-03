'use client'

import React from 'react';
import { PinContainer } from '../components/ui/3d-pin';
import { FileUpload } from '../components/ui/file-upload';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const HomePage = () => {
  return (
    <>
      <div className="w-full bg-black flex flex-col items-center justify-center text-white h-screen">
        <div className='w-full h-1/2'>
          <div>
            <FileUpload />
          </div>
        </div>

        <div className='flex flex-col items-center justify-center h-1/2 w-full gap-4'>
          <div className='text-4xl font-anton'>Features</div>

          <div className='flex'>
            <PinContainer
              title="Secure"
              className="custom-styling-class"
              containerClassName="container-styling-class"
            >
              <p className='font-anton'>End-To-End Encryption</p>
              <br />
              <p className="w-[15vw] h-[25vh] font-kanit font-semibold">
                With end-to-end encryption, your files are secure from the moment they leave your device until they reach the intended recipient.
              </p>
            </PinContainer>
            <PinContainer
              title="Fast Uploads"
              className="another-styling-class"
              containerClassName="another-container-class"
            >
              <p className='font-anton'>Blazing Fast Speeds</p>
              <br />
              <p className="w-[15vw] h-[25vh] font-kanit font-semibold">
                Upload your files quickly and securely without compromising performance.
              </p>
            </PinContainer>
            <PinContainer
              title="Easy To Share"
              className="custom-styling-class"
              containerClassName="container-styling-class"
            >
              <p className='font-anton'>Upload and Share, Simple as That!</p>
              <br />
              <p className="w-[15vw] h-[25vh] font-kanit font-semibold">
                Effortless uploads to share your world, where every file finds its way with just a click. Experience sharing like never before, quick, secure, and hassle-free.
              </p>
            </PinContainer>
          </div>

        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default HomePage;
