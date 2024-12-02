'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import { GrRedo, GrUndo } from 'react-icons/gr';

const Whiteboard = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const [activeTool, setActiveTool] = useState<'draw' | 'erase' | 'none'>('draw');
  const [history, setHistory] = useState<fabric.Object[]>([]);
  const [redoStack, setRedoStack] = useState<fabric.Object[]>([]);

  useEffect(() => {
    const canvasElement = document.getElementById('whiteboard');
    if (!canvasElement) return;

    const canvas = new fabric.Canvas('whiteboard', {
      width: 1550,
      height: 700,
      backgroundColor: '#ffffff',
    });

    canvasRef.current = canvas;

    canvas.renderAll();
    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.off('mouse:down');
    canvas.off('mouse:move');

    if (activeTool === 'draw') {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      const brush = canvas.freeDrawingBrush as fabric.PencilBrush;
      if (brush) {
        brush.color = 'black';
        brush.width = 5;
      }

      canvas.on('object:added', (e) => {
        setHistory((prevHistory) => {
          return [...prevHistory, e.target];
        });
      });
    } else if (activeTool === 'erase') {
      canvas.isDrawingMode = false;

      canvas.on('mouse:down', function (event) {
        const pointer = canvas.getPointer(event.e);
        const objects = canvas.getObjects();

        for (const obj of objects) {
          if (obj.containsPoint(pointer)) {
            canvas.remove(obj);

            setRedoStack((prevRedoStack) => {
              return [...prevRedoStack, obj];
            });
            break;
          }
        }
      });
    } else {
      canvas.isDrawingMode = false;
      canvas.off('mouse:down');
    }
  }, [activeTool]);

  const enableDrawingMode = () => {
    setActiveTool('draw');
  };

  const enableEraserMode = () => {
    setActiveTool('erase');
  };

  const disableAllModes = () => {
    setActiveTool('none');
  };

  const exportAsImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,  
      multiplier: 1, 
    });

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'whiteboard.png';
    link.click();
  };

  const addText = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const text = new fabric.Textbox('Type here', {
      left: 100,
      top: 100,
      width: 200,
      fontSize: 30,
      fontFamily: 'Arial',
      fill: 'black',
      fontWeight: 'bold',
      textAlign: 'center',
      lineHeight: 1.2,
    });

    setActiveTool('none');
    canvas.add(text);

    setHistory((prevHistory) => {
      return [...prevHistory, text];
    });
  };

  const undo = () => {
    const canvas = canvasRef.current;
    if (!canvas || history.length === 0) {
      return;
    }

    const lastObject = history[history.length - 1];

    canvas.remove(lastObject);

    setRedoStack((prevRedoStack) => {
      return [...prevRedoStack, lastObject];
    });

    setHistory((prevHistory) => {
      return prevHistory.slice(0, -1);
    });
  };

  const redo = () => {
    const canvas = canvasRef.current;
    if (!canvas || redoStack.length === 0) {
      return;
    }

    const lastRedoObject = redoStack[redoStack.length - 1];

    canvas.add(lastRedoObject);

    setHistory((prevHistory) => {
      return [...prevHistory, lastRedoObject];
    });

    setRedoStack((prevRedoStack) => {
      return prevRedoStack.slice(0, -1);
    });
  };

  return (
    <div className="w-full h-screen relative">
      <canvas
        id="whiteboard"
        width="1550"
        height="700"
        style={{
          border: '1px solid black',
        }}
      />
      <button
        onClick={enableDrawingMode}
        className={`absolute font-anton top-6 left-6 px-3 py-1 rounded-md ${activeTool === 'draw' ? 'bg-gradient-to-r from-cyan-400 to-green-400' : 'bg-gradient-to-r from-cyan-100 to-green-200'}`}
      >
        Drawing Mode
      </button>
      <button
        onClick={enableEraserMode}
        className={`absolute font-anton top-6 left-40 px-3 py-1 rounded-md ${activeTool === 'erase' ? 'bg-gradient-to-r from-red-500 to-red-700' : 'bg-gradient-to-r from-red-200 to-red-400'}`}
      >
        Eraser
      </button>
      <button
        onClick={disableAllModes}
        className={`absolute font-anton top-6 left-60 px-3 py-1 rounded-md ${activeTool === 'none' ? 'bg-gradient-to-r from-gray-500 to-gray-700' : 'bg-gradient-to-r from-gray-200 to-gray-300'}`}
      >
        Disable All
      </button>
      <button onClick={undo} className="absolute top-7 left-[22rem] font-anton bg-gray-800 text-white px-3 py-1 rounded-md">
      <GrUndo/>
      </button>
      <button onClick={redo} className="absolute top-7 left-[25rem] font-anton bg-gray-800 text-white px-3 py-1 rounded-md">
        <GrRedo />
      </button>
      <button onClick={exportAsImage} className="absolute top-6 right-10 font-anton bg-zinc-900 text-white px-3 py-1 rounded-md">Export</button>
      <button onClick={addText} className="absolute top-6 right-[10rem] font-anton bg-gradient-to-r from-cyan-500 to-blue-400 text-white px-3 py-1 rounded-md">Add Text</button>

      <div className="absolute top-2 translate-x-[-50%] font-bubble text-3xl translate-y-1/2 left-1/2 text-black">
        Whiteboard
      </div>
    </div>
  );
};

export default Whiteboard;
