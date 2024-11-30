'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';

const Whiteboard = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const [isDrawingMode, setIsDrawingMode] = useState(true);

  useEffect(() => {
    // Ensure the DOM element exists
    const canvasElement = document.getElementById('whiteboard');
    if (!canvasElement) {
      console.error('Canvas element not found');
      return;
    }

    // Initialize the canvas
    const canvas = new fabric.Canvas('whiteboard', {
      width: 1550,
      height: 700,
      backgroundColor: '#ffffff', // Set the background color to white
      isDrawingMode: true, // Automatically enable drawing mode
    });

    canvasRef.current = canvas;

    // Initialize the freeDrawingBrush
    if (!canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    }

    const brush = canvas.freeDrawingBrush;
    if (brush) {
      brush.color = 'black';
      brush.width = 5;
    } else {
      console.error('Failed to initialize freeDrawingBrush');
    }

    // Persist drawings on mouse events
    canvas.on('mouse:down', () => console.log('Mouse down detected'));
    canvas.on('mouse:move', () => console.log('Mouse move detected'));
    canvas.on('mouse:up', () => {
      console.log('Mouse up detected');
      canvas.renderAll();
      console.log("Rendered All");
       // Ensure the canvas re-renders and keeps the drawing
    });

    // Cleanup on component unmount
    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.isDrawingMode = isDrawingMode;

      if (isDrawingMode) {
        if (!canvas.freeDrawingBrush) {
          canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        }
        const brush = canvas.freeDrawingBrush;
        if (brush) {
          brush.color = 'black';
          brush.width = 5;
        }
      }
    }
  }, [isDrawingMode]);

  const toggleDrawingMode = () => {
    setIsDrawingMode((prev) => !prev);
  };

  return (
    <div className="w-full h-screen relative">
      <canvas
        id="whiteboard"
        width="1550"
        height="700"
        style={{
          border: '1px solid black',
          backgroundColor: '#ffffff',
        }}
      />
      <button
        onClick={toggleDrawingMode}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          padding: '10px',
          backgroundColor: '#f0f0f0',
          border: '1px solid #ccc',
        }}
      >
        Toggle Drawing Mode
      </button>
    </div>
  );
};

export default Whiteboard;
