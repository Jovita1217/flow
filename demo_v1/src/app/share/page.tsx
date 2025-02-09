 'use client'

import { useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function MatrixRain({ side }: { side: 'left' | 'right' }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
  
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
  
      canvas.width = 300;
      canvas.height = window.innerHeight;
  
      const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
      const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const nums = '0123456789';
      const alphabet = katakana + latin + nums;
  
      const fontSize = 16;
      const columns = canvas.width / fontSize;
  
      const drops: number[] = Array.from({ length: columns }, () => -Math.floor(Math.random() * 500));
  
      function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
  
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
          const text = alphabet[Math.floor(Math.random() * alphabet.length)];
          
          if (drops[i] * fontSize < fontSize) {
            ctx.fillStyle = '#fff';
          } else {
            const brightness = Math.random() * 0.5 + 0.5;
            ctx.fillStyle = `rgba(0,255,0,${brightness})`;
          }
  
          if (drops[i] > 0) {
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
          }
  
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
  
          drops[i]++;
        }
      }
  
      const interval = setInterval(draw, 33);
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <canvas 
        ref={canvasRef}
        className={`fixed top-0 ${side}-0 h-screen pointer-events-none z-10`}
      />
    );
}

export default function Home() {
  return (
    <>
      <MatrixRain side="left" />
      <MatrixRain side="right" />

      <div className="min-h-screen p-8 flex justify-center items-center">
        <div className="w-full max-w-4xl bg-white p-8">
          <Document
            file="/your-resume.pdf"  // 替换成你的PDF文件路径
            className="flex flex-col items-center"
          >
            <Page 
              pageNumber={1} 
              className="max-w-full"
              scale={1.2}
            />
          </Document>
        </div>
      </div>
    </>
  );
}