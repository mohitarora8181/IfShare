'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';

const Whiteboard = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const [activeTool, setActiveTool] = useState<'draw' | 'erase' | 'none'>('draw');

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
    } else if (activeTool === 'erase') {
      canvas.isDrawingMode = false; 

      canvas.on('mouse:down', function (event) {
        const pointer = canvas.getPointer(event.e);
        const objects = canvas.getObjects();

        for (const obj of objects) {
          if (obj.containsPoint(pointer)) {
            canvas.remove(obj); 
            break; 
          }
        }
      });
    } else {
      canvas.isDrawingMode = false;
      canvas.off('mouse:down'); 
    }
  }, [activeTool]);

  const enableDrawingMode = () => setActiveTool('draw');
  const enableEraserMode = () => setActiveTool('erase');
  const disableAllModes = () => setActiveTool('none');

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
        className={`absolute font-anton top-6 left-6 px-3 py-1 rounded-md ${activeTool === 'draw' ? 'bg-gradient-to-r from-cyan-400 to-green-400' : 'bg-gradient-to-r from-cyan-100 to-green-200'}  `}
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
        className={`absolute font-anton top-6 left-60 px-3 py-1 rounded-md ${activeTool === 'none' ? ' bg-gradient-to-r from-gray-500 to-gray-700' : 'bg-gradient-to-r from-gray-200 to-gray-300'}  `}
      >
        Disable All
      </button>
      <div className='absolute top-2 translate-x-[-50%] font-bubble text-3xl translate-y-1/2 left-1/2 text-black'>
        Whiteboard
      </div>
    </div>
  );
};

export default Whiteboard;
