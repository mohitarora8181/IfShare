'use client'

import gsap from 'gsap';
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { color, motion } from 'framer-motion'
import { generateUniqueId } from '../lib/utils';

const page = () => {
    const [uniqueID, setUniqueId] = useState('');

    useEffect(() => {
        gsap.from('h1 , h2', {
            y: '100%',
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power1.out',
        });
        setUniqueId(generateUniqueId());
    }, []);

    const svgRef = useRef(null);
    const pointerRef = useRef({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
    });
    useEffect(() => {
        const ease = 0.75;
        const totalLines = 100;
        const svgns = "http://www.w3.org/2000/svg";
        const root = svgRef.current;
        let leader: any = pointerRef.current;

        const handleMouseMove = (event: any) => {
            pointerRef.current.x = event.clientX;
            pointerRef.current.y = event.clientY;
        };

        window.addEventListener("mousemove", handleMouseMove);

        for (let i = 0; i < totalLines; i++) {
            leader = createLine(leader, i);
        }

        function createLine(leader: any, i: any) {
            const line = document.createElementNS(svgns, "line");
            //@ts-ignore
            root.appendChild(line);

            gsap.set(line, { x: -15, y: -15, opacity: (totalLines - i) / totalLines });

            gsap.to(line, {
                duration: 1000,
                x: "+=1",
                y: "+=1",
                repeat: -1,
                modifiers: {
                    x: function () {
                        let posX = gsap.getProperty(line, "x");
                        let leaderX = gsap.getProperty(leader, "x");
                        //@ts-ignore
                        const x = posX + (leaderX - posX) * ease;
                        //@ts-ignore
                        line.setAttribute("x2", leaderX - x);
                        return x;
                    },
                    y: function () {
                        let posY = gsap.getProperty(line, "y");
                        let leaderY = gsap.getProperty(leader, "y");
                        //@ts-ignore
                        const y = posY + (leaderY - posY) * ease;
                        //@ts-ignore
                        line.setAttribute("y2", leaderY - y);
                        return y;
                    },
                },
            });

            return line;
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            //@ts-ignore
            gsap.killTweensOf(root.querySelectorAll("line"));
            //@ts-ignore
            root.innerHTML = "";
        };
    }, [])

    return (
        <div className='w-full h-full'>
            <svg className='absolute h-full w-full top-0 left-0' ref={svgRef}></svg>
            <div className='grid w-full h-full absolute' />
            <div className='w-full h-full flex gap-5'>
                <div className='w-1/2 p-10 py-40'>
                    <h1 className='text-8xl relative top-0 w-fit h-auto py-4 justify-center flex bg-gradient-to-r items-center from-blue-500 via-teal-500 to-pink-500 bg-clip-text font-extrabold text-transparent text-center select-none'>IfShare</h1>
                    <h2 className='animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-4xl text-white font-bold'>Upload and share your stuff seamlessly!</h2>
                </div>
                <div className='w-1/2'>
                    <div className="ag-courses_box flex-1">
                        <FeatureCard
                            name='Code Share'
                            link={`/code/${uniqueID}`}
                            color='bg-blue-600'
                            icon={
                                <svg className='text-white fill-current' width="80px" height="80px" viewBox="0 0 15 15" fill="none">
                                    <path
                                        d="M9.96424 2.68571C10.0668 2.42931 9.94209 2.13833 9.6857 2.03577C9.4293 1.93322 9.13832 2.05792 9.03576 2.31432L5.03576 12.3143C4.9332 12.5707 5.05791 12.8617 5.3143 12.9642C5.5707 13.0668 5.86168 12.9421 5.96424 12.6857L9.96424 2.68571ZM3.85355 5.14646C4.04882 5.34172 4.04882 5.6583 3.85355 5.85356L2.20711 7.50001L3.85355 9.14646C4.04882 9.34172 4.04882 9.6583 3.85355 9.85356C3.65829 10.0488 3.34171 10.0488 3.14645 9.85356L1.14645 7.85356C0.951184 7.6583 0.951184 7.34172 1.14645 7.14646L3.14645 5.14646C3.34171 4.9512 3.65829 4.9512 3.85355 5.14646ZM11.1464 5.14646C11.3417 4.9512 11.6583 4.9512 11.8536 5.14646L13.8536 7.14646C14.0488 7.34172 14.0488 7.6583 13.8536 7.85356L11.8536 9.85356C11.6583 10.0488 11.3417 10.0488 11.1464 9.85356C10.9512 9.6583 10.9512 9.34172 11.1464 9.14646L12.7929 7.50001L11.1464 5.85356C10.9512 5.6583 10.9512 5.34172 11.1464 5.14646Z"
                                    />
                                </svg>
                            }
                        />
                        <FeatureCard
                            name='Files Share'
                            link='/files'
                            color='bg-cyan-600'
                            icon={
                                <svg className='fill-current text-white' width="80px" height="80px" viewBox="0 0 24 24" >
                                    <path d="M15 21h1v2H3V7h2v1H4v14h11zm3-2H7V5h1V4H6v16h13v-2h-1zm.4-18L22 4.6V17H9V1zM21 6h-4V2h-7v14h11zm0-1.31L18.31 2H18v3h3z" /><path fill="none" d="M0 0h24v24H0z" />
                                </svg>
                            }
                        />
                        <FeatureCard
                            name='Notes Share'
                            link={`/notes/${uniqueID}`}
                            color='bg-pink-600'
                            icon={
                                <svg className='text-white fill-current' width="80px" height="80px" viewBox="0 0 24 24" data-name="Layer 1">
                                    <path d="M16,14H8a1,1,0,0,0,0,2h8a1,1,0,0,0,0-2Zm0-4H10a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Zm4-6H17V3a1,1,0,0,0-2,0V4H13V3a1,1,0,0,0-2,0V4H9V3A1,1,0,0,0,7,3V4H4A1,1,0,0,0,3,5V19a3,3,0,0,0,3,3H18a3,3,0,0,0,3-3V5A1,1,0,0,0,20,4ZM19,19a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1V6H7V7A1,1,0,0,0,9,7V6h2V7a1,1,0,0,0,2,0V6h2V7a1,1,0,0,0,2,0V6h2Z" />\
                                </svg>
                            }
                        />
                    </div>
                </div>
            </div>
            <footer className='w-full ocean absolute -bottom-10 left-0'>
                <div className="wave"></div>
                <div className="wave"></div>
            </footer>
        </div>
    )
}

const FeatureCard = ({ name, color, link, icon }: { name: string, color: string, link: string, icon: ReactNode }) => {
    return <motion.div
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        whileInView={{
            opacity: 1
        }}
        className="ag-courses_item w-1/2 border border-black scale-75 skew-x-6 skew-y-2 hover:scale-100 hover:skew-y-0 hover:skew-x-0 duration-500 transition-all">
        <a href={link} className="ag-courses-item_link">
            <div className={`ag-courses-item_bg ${color}`}></div>
            <div className="ag-courses-item_title">
                {name}
            </div>
            <div className="ag-courses-item_date-box">
                {icon}
            </div>
        </a>
    </motion.div>
}

export default page
