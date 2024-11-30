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

    // Add an example object
    const rect = new fabric.Rect({
      left: 50,
      top: 50,
      fill: 'red',
      width: 100,
      height: 100,
    });
    canvas.add(rect);

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
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          padding: '10px',
          backgroundColor: activeTool === 'draw' ? '#d4f4d4' : '#f0f0f0',
          border: '1px solid #ccc',
        }}
      >
        Drawing Mode
      </button>
      <button
        onClick={enableEraserMode}
        style={{
          position: 'absolute',
          top: '20px',
          left: '180px',
          padding: '10px',
          backgroundColor: activeTool === 'erase' ? '#f4d4d4' : '#f0f0f0',
          border: '1px solid #ccc',
        }}
      >
        Eraser
      </button>
      <button
        onClick={disableAllModes}
        style={{
          position: 'absolute',
          top: '20px',
          left: '340px',
          padding: '10px',
          backgroundColor: activeTool === 'none' ? '#d4d4f4' : '#f0f0f0',
          border: '1px solid #ccc',
        }}
      >
        Disable All
      </button>
    </div>
  );
};

export default Whiteboard;
