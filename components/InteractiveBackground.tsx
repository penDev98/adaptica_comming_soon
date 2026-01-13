import React, { useEffect, useRef } from 'react';

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let time = 0;

    // Processor Grid Config
    const gridSize = 40;
    const nodes: {x: number, y: number}[] = [];
    
    // Mouse Interaction
    const mouse = { x: -1000, y: -1000 };

    const initGrid = () => {
      nodes.length = 0;
      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          // Create nodes at grid intersections sparsely
          if (Math.random() > 0.6) { 
             nodes.push({ x, y });
          }
        }
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initGrid();
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    resize();

    const render = () => {
      time += 0.005;

      // Dark Background (Brand Dark)
      ctx.fillStyle = '#1C1C1C';
      ctx.fillRect(0, 0, width, height);

      // --- Ambient Brand Glows (Smooth Colors) ---
      // These gradients provide the "smooth colors" requested, using brand Red and Green
      
      // 1. Red Glow (Top Left / Floating)
      const rX = (width * 0.3) + Math.sin(time * 0.7) * (width * 0.1);
      const rY = (height * 0.4) + Math.cos(time * 0.5) * (height * 0.1);
      const redRadius = Math.max(width, height) * 0.6;
      
      const redGlow = ctx.createRadialGradient(rX, rY, 0, rX, rY, redRadius);
      redGlow.addColorStop(0, 'rgba(166, 58, 66, 0.08)'); // #A63A42 (Brand Red) - Very subtle
      redGlow.addColorStop(1, 'rgba(166, 58, 66, 0)');
      
      ctx.fillStyle = redGlow;
      ctx.fillRect(0, 0, width, height);

      // 2. Green Glow (Bottom Right / Floating)
      const gX = (width * 0.7) + Math.cos(time * 0.6) * (width * 0.1);
      const gY = (height * 0.6) + Math.sin(time * 0.8) * (height * 0.1);
      const greenRadius = Math.max(width, height) * 0.6;

      const greenGlow = ctx.createRadialGradient(gX, gY, 0, gX, gY, greenRadius);
      greenGlow.addColorStop(0, 'rgba(62, 124, 103, 0.08)'); // #3E7C67 (Brand Green) - Very subtle
      greenGlow.addColorStop(1, 'rgba(62, 124, 103, 0)');
      
      ctx.fillStyle = greenGlow;
      ctx.fillRect(0, 0, width, height);


      // --- 1. Static Grid ---
      // Dark lines on dark background for smooth "panel" look
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#000000'; 
      ctx.globalAlpha = 0.3; 
      
      for (let x = 0; x <= width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
      }
      for (let y = 0; y <= height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
      }

      // --- 2. Interactive "Active" Traces near Mouse ---
      ctx.globalAlpha = 0.2;
      ctx.strokeStyle = '#A63A42'; // Red Highlight
      ctx.lineWidth = 1.5;
      
      const range = 150;
      // Highlight grid lines near mouse
      const snapX = Math.round(mouse.x / gridSize) * gridSize;
      const snapY = Math.round(mouse.y / gridSize) * gridSize;
      
      // Draw crosshair effect
      ctx.beginPath();
      ctx.moveTo(snapX - range, snapY);
      ctx.lineTo(snapX + range, snapY);
      ctx.moveTo(snapX, snapY - range);
      ctx.lineTo(snapX, snapY + range);
      ctx.stroke();
      
      // Draw connecting circuit lines from mouse to nearby nodes
      ctx.globalAlpha = 0.1;
      nodes.forEach(node => {
         const dx = node.x - mouse.x;
         const dy = node.y - mouse.y;
         const dist = Math.sqrt(dx*dx + dy*dy);
         if (dist < range) {
             ctx.beginPath();
             ctx.moveTo(node.x, node.y);
             // Draw manhattan path
             ctx.lineTo(node.x, mouse.y);
             ctx.lineTo(mouse.x, mouse.y);
             ctx.stroke();
             
             // Draw node dot (subtle light)
             ctx.fillStyle = '#2A2A2A'; 
             ctx.fillRect(node.x - 2, node.y - 2, 4, 4);
         }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', resize); // cleanup mouse listener if attached differently
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
};

export default InteractiveBackground;