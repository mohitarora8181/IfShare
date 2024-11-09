'use client'

import React, { useEffect, useState } from 'react'
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Toolbar from './toolbar'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import { useParams } from 'next/navigation'

const page = () => {

    const [editorValue, setEditorValue] = useState("");

    const params = useParams();

    const editor = useEditor({
        extensions: [StarterKit, Underline, Highlight],
        content: editorValue,
        editorProps: {
            attributes: {
                class:
                    "h-[80vh] bg-gray-100 list-item scrollbar-thin overflow-y-auto border w-full px-10 py-3 text-black text-[16px] rounded-bl-md rounded-br-md outline-none",
            },
        },
        onUpdate: (({ editor }) => {
            setEditorValue(editor.getHTML())
        })
    });


    useEffect(() => {
        const handleKeyDown = async (event: any) => {
            if ((event.ctrlKey || event.metaKey) && event.key === 's') {
                event.preventDefault();
                await fetch("/api/notes/", {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify({
                        id: params.id,
                        value: editorValue,
                    })
                });
            }
        };
        const notesEditorDiv = document.getElementById('notes-editor');
        if (notesEditorDiv) {
            notesEditorDiv.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            if (notesEditorDiv) {
                notesEditorDiv.removeEventListener('keydown', handleKeyDown);
            }
        };
    }, [editorValue]);

    useEffect(() => {
        const getValue = async () => {
            await fetch(`/api/notes?id=${params.id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(async (res) => {
                const data = await res.json();
                if (data) {
                    setEditorValue(data.value);
                    editor?.commands.setContent(data.value);
                }
            })
        }
        if (editor) {
            getValue();
        }
    }, [editor]);

    return (
        <div id='notes-editor' className='bg-gray-800 w-full h-full flex px-20'>
            <div className='w-full h-[100vh] flex flex-col justify-center'>
                <Toolbar editor={editor} />
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}

export default page
