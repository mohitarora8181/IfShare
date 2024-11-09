'use client';

import React, { useEffect, useRef, useState } from 'react'
import { Editor } from '@monaco-editor/react'
import { supportedLanguages, supportedThemes } from "./config.js"
import { loader } from '@monaco-editor/react';
import { useParams } from 'next/navigation.js';

const page = () => {
  const [selectedLanguage, setLanguage] = useState('javascript');
  const [selectedTheme, setTheme] = useState('vs-dark');
  const [searchLanguage, setSearchedLanguage] = useState("");
  const [editorText, setEditorText] = useState("");

  const ulRef = useRef<HTMLUListElement | null>(null);

  const params = useParams();

  const handleSearch = (e: any) => {
    setSearchedLanguage(e.target.value);
    supportedLanguages.forEach((ele) => {
      if (ele.name.includes(searchLanguage)) {
        const element = ulRef.current?.querySelector(`#${ele.name}-language`)!;
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    })
  }

  useEffect(() => {
    setSearchedLanguage(selectedLanguage)
  }, [selectedLanguage]);

  useEffect(() => {
    const handleKeyDown = async (event: any) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        await fetch("/api/code/", {
          method: "POST",
          headers: {
            'Content-Type': "application/json"
          },
          body: JSON.stringify({
            id: params.id,
            value: editorText,
            language: selectedLanguage,
            theme: selectedTheme
          })
        });
      }
    };
    const codeEditorDiv = document.getElementById('code-editor');
    if (codeEditorDiv) {
      codeEditorDiv.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      if (codeEditorDiv) {
        codeEditorDiv.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [editorText, selectedLanguage, selectedTheme]);

  useEffect(() => {
    const getValue = async () => {
      await fetch(`/api/code?id=${params.id}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(async (res) => {
        const data = await res.json();
        if (data) {
          setEditorText(data.value);
          setLanguage(data.language);
          if (data.theme == 'vs-dark' || data.theme == 'light') {
            setTheme(data.theme);
          } else {
            defineTheme(data.theme).then(_ => setTheme(data.theme))
          }
        }
      })
    }
    getValue();
  }, []);


  return (
    <div id='code-editor' className='bg-black h-full w-full relative overflow-hidden'>
      <div className='w-full h-20 bg-black flex justify-between p-2 align-middle'>
        <a href='/' className='overflow-hidden rounded-full h-14 w-14 self-center'>
          <img className='object-cover' src='/logo.jpg' />
        </a>
      </div>
      <div className='flex justify-between w-full h-full'>
        <Editor
          height="100vh"
          theme={selectedTheme}
          language={selectedLanguage}
          onChange={(value: any, e) => setEditorText(value)}
          value={editorText}
        />
        <div className='bg-black text-white w-1/4 h-full bottom-0 right-0 max-sm:hidden'>
          <div className='w-full h-1/2 p-5'>
            <div className='w-full flex gap-2 justify-around align-middle'>
              <p className='w-full text-[#67e8f9] pb-2 self-center'>Languages</p>
              <input
                type="text"
                placeholder="Search language ..."
                className='text-neutral-300 text-sm rounded-full self-center bg-gray-700 lowercase'
                value={searchLanguage}
                onChange={handleSearch}
                style={{ marginBottom: "10px", padding: "5px", paddingLeft: "15px" }}
              />
            </div>
            <ul ref={ulRef} className='w-full h-60 p-5 overflow-y-scroll scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-stone-500 scrollbar-corner-neutral-500'>
              {supportedLanguages.map((ele) => {
                return <li id={ele.name + "-language"} key={ele.name + "-language"} className={`${selectedLanguage == ele.name ? "bg-gray-700" : ""} w-full p-2 text-white border-b border-gray-600 cursor-pointer hover:bg-gray-900`}
                  onClick={() => setLanguage(ele.name)}>
                  {ele.name}
                </li>
              })}
            </ul>
          </div>
          <div className='w-full h-1/2 p-5'>
            <p className='w-full text-[#67e8f9] pb-2'>Themes</p>
            <ul className='w-full h-60 p-5 overflow-y-scroll scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-stone-500 scrollbar-corner-neutral-500'>
              {supportedThemes.map((ele, index) => {
                return <li key={ele.id + "-theme"} className={`${selectedTheme == ele.id || selectedTheme == ele.name ? "bg-gray-700" : ""} w-full p-2 text-white border-b border-gray-600 cursor-pointer hover:bg-gray-900`}
                  onClick={() => {
                    if (index == 0 || index == 1) {
                      setTheme(ele.id);
                      return;
                    }
                    defineTheme(ele.name).then(_ => setTheme(ele.name))
                  }
                  }>
                  {ele.name}
                </li>
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}


const defineTheme = (theme: any) => {
  return new Promise(res => {
    Promise.all(
      [
        loader.init(),
        import(`monaco-themes/themes/${theme}.json`),
      ]
    ).then(
      ([monaco, themeData]) => {
        monaco.editor.defineTheme(theme, themeData);
        res(this);
      }
    );
  });
};

export default page
