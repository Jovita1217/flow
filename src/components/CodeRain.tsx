import React, { useEffect, useRef } from 'react';

const CodeRain = ({ side }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resize = () => {
      canvas.width = 200;  // Fixed width for the side panels
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    // Matrix code characters
    const chars = '01';
    
    // Create drops
    const drops = [];
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * canvas.height);
    }
    
    // Drawing animation
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        drops[i]++;
      }
    };
    
    // Animation loop
    const interval = setInterval(draw, 33);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef}
      className={`fixed top-0 ${side === 'left' ? 'left-0' : 'right-0'} h-screen pointer-events-none z-10`}
    />
  );
};

const CodeRainWrapper = () => {
  return (
    <>
      <CodeRain side="left" />
      <CodeRain side="right" />
    </>
  );
};

export default CodeRainWrapper;