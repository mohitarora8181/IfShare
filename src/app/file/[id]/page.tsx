'use client'

import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { cn } from '@/@/lib/utils';
import supabase from '@/@/lib/client';
import { useParams } from 'next/navigation';
import { GridPattern } from '@/@/components/ui/file-upload';
import CryptoJS from 'crypto-js';



interface FileMetadata {
    created_at: string;
    file_name: string;
    file_size: string;
    file_path: string;
    file_type: string | null;
    id: string;
}
const page = () => {
    const [file, setFile] = useState<FileMetadata>();
    const params = useParams();

    const fetchFile = async () => {
        try {
            await supabase
                .from('uploads')
                .select('*')
                .eq('id', params.id)
                .single().then(({ data }) => {
                    setFile(data);
                });
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchFile();
    }, [])

    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-black absolute">
            <div className="absolute inset-0 h-full [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
                <GridPattern />
            </div>
            <div className="relative w-full mt-10 max-w-xl mx-auto">
                {file &&
                    <>
                        <motion.div
                            key={"file" + 0}
                            layoutId={0 === 0 ? "file-upload" : "file-upload-" + 0}
                            className={cn(
                                "relative cursor-pointer hover:scale-110 transition-all overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                                "shadow-sm"
                            )}
                        >
                            <div className="flex justify-between w-full items-center gap-4">
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    layout
                                    className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs"
                                >
                                    {file.file_name}
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    layout
                                    className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input"
                                >
                                    {(parseInt(file.file_size) / (1024 * 1024)).toFixed(2)} MB
                                </motion.p>
                            </div>
                            <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    layout
                                    className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 "
                                >
                                    {file.file_type}
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    layout
                                >
                                    modified{" "}
                                    {new Date(file.created_at).toLocaleDateString()}
                                </motion.p>
                            </div>
                        </motion.div>
                        <motion.div className='w-full flex justify-center p-5'>
                            <motion.button
                                onClick={async () => {
                                    try {
                                        const encryptedfile = await fetch(process.env.NEXT_PUBLIC_SUPABASE_URL + file.file_path)
                                        const encryptedData = await encryptedfile.text();
                                        const decrypted = CryptoJS.AES.decrypt(encryptedData, process.env.NEXT_PUBLIC_ENCRYPTION_KEY!);
                                        const decryptedArrayBuffer = Buffer.from(decrypted.toString(CryptoJS.enc.Hex), 'hex');;
                                        const decryptedBlob = new Blob([decryptedArrayBuffer], { type: file.file_type! });
                                        console.log(URL.createObjectURL(decryptedBlob))

                                        const a = document.createElement('a');
                                        a.href = window.URL.createObjectURL(decryptedBlob);
                                        a.download = file.file_name;
                                        document.body.appendChild(a);
                                        a.click();
                                        document.body.removeChild(a);
                                    } catch (Err) {
                                        console.error(Err)
                                    }
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95, backgroundColor: "white", color: "black" }}
                                className='bg-gray-600 rounded-full px-3 py-2 text-white'>
                                Download Now
                            </motion.button>
                        </motion.div>
                    </>
                }
            </div>
        </div >


    )
}

export default page
