'use client'

import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';

const Whiteboard = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const [isDrawingMode, setIsDrawingMode] = useState(true);

  useEffect(() => {
    // Initialize the canvas
    const canvasElement = document.getElementById('whiteboard');
    if (!canvasElement) return;

    const canvas = new fabric.Canvas('whiteboard', {
      width: 1550,
      height: 700,
      backgroundColor: '#ffffff',
      isDrawingMode: true, // Drawing mode enabled
    });

    canvasRef.current = canvas;

    // Draw a test rectangle
    const rect = new fabric.Rect({
      left: 50,
      top: 50,
      fill: 'red',
      width: 100,
      height: 100,
    });

    canvas.add(rect);
    canvas.renderAll();  // Ensure it's rendered

    // Listen for mouse up event to see objects
    canvas.on('mouse:up', () => {
      console.log('Mouse up detected');
      console.log('Objects on canvas:', canvas.getObjects());  // Log objects
      canvas.renderAll();  // Re-render after mouse up
    });

    // Clean up on component unmount
    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    // Update drawing mode when toggled
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
