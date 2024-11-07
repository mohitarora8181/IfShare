'use client';

import React, { useEffect, useRef, useState } from 'react'
import { Editor } from '@monaco-editor/react'
import { supportedLanguages } from "./config.js"
import gsap from 'gsap';

const page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setLanguage] = useState('javascript');
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(sidebarRef.current, { x: 0, duration: 0.5, ease: "power3.out" });
    } else {
      gsap.to(sidebarRef.current, { x: "100%", duration: 0.5, ease: "power3.in" });
    }
  }, [isOpen]);

  return (
    <div className='bg-black h-full w-full relative'>
      <div className='w-full h-16 flex justify-between'>
        <button className='text-white' onClick={() => setIsOpen(!isOpen)}>
          Settings
        </button>
      </div>
      <div className='flex justify-between'>
        <Editor
          height="100vh"
          theme="vs-dark"
          className='w-full relative'
          language={selectedLanguage}
        />
        <div ref={sidebarRef} className='bg-black w-1/3 h-full top-0 right-0 fixed'>
          <ul>
            {supportedLanguages.map((ele) => {
              return <li onClick={() => setLanguage(ele.name)}>{ele.name}</li>
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default page
