'use client'

import Image from "next/image";
import Link from 'next/link';
import { useState, useEffect } from 'react';

// CTF 图片组件
const CTFImage = ({ src, rotate = 0, className = "", size = 300 }) => (
  <div className={`absolute ${className}`}>
    <Image
      src={src}
      alt="CTF decoration"
      width={size}
      height={size}
      className="select-none"
      style={{ transform: `rotate(${rotate}deg)` }}
    />
  </div>
);

export default function Home() {
  // 状态管理
  const [mode, setMousePosX] = useState({x: 0});
  const [active, setMousePosY] = useState({y: 0 });
  const [time, setTime] = useState(new Date());
  // const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 更新时间和数值
  useEffect(() => {
    const timer = setInterval(() => {
      setMousePosX(prev => {
        const change = (Math.random() - 0.5) * 2;
        return { x: Number((prev.x + change).toFixed(1)) };
      });
      
      setMousePosY(prev => {
        const change = (Math.random() - 0.5) * 0.5;
        return { y: Number((prev.y + change).toFixed(2)) };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 监听鼠标移动
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosX({ x: e.clientX });
      setMousePosY({ y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  
  const formattedTime = time.toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
    timeZone: 'UTC'
  });

  const ctfImages = [
    { src: '/glitch_1-o.gif', rotate: 0, className: 'top-[10%] left-[8%]', size: 300 },
    { src: '/glitch_2-o.gif', rotate: 0, className: 'top-[10%] right-[8%]', size: 300 },
    { src: '/glitch_3-o.gif', rotate: 0, className: 'bottom-[10%] left-[8%]', size: 300 },
    { src: '/glitch_4-o.gif', rotate: 0, className: 'bottom-[10%] right-[8%]', size: 300 }
  ];

  return (
    <>
      {/* CTF装饰图片 */}
      <div className="fixed inset-0 pointer-events-none">
        {ctfImages.map((img, index) => (
          <CTFImage 
            key={index}
            src={img.src}
            rotate={img.rotate}
            className={img.className}
            size={img.size}
          />
        ))}
      </div>

      {/* 终端风格文字 */}
      <div className="fixed top-8 left-1/4 font-mono text-sm p-4 backdrop-blur-sm">
        <div className="text-black">
          {`> Greetings`}<br/>
          {`> -`}<br/>
          {`> INITIALIZING SEQUENCE...`}
        </div>
      </div>

      <div className="fixed top-8 right-1/4 font-mono text-sm p-4 backdrop-blur-sm">
        <div className="text-black">
          {`+    ${mode.x}    MODE +`}<br/>
          {`${active.y} // :ACTIVE`}<br/>
          {formattedTime}
        </div>
      </div>

      {/* 主要内容 */}
      <div className="flex flex-col items-center justify-center h-screen font-['Zpix']">
        <div className="text-center mb-8">
          <Image
            src="/logo.png"
            alt="Logo"
            width={500}
            height={250}
          />
        </div>
        <div className="flex">
          <a
            href="/join"
            className="border border-black bg-white text-black px-16 py-4 flex items-center justify-center"
          >
            Join US
          </a>
          <a
            href="/example"
            className="border border-black bg-white text-black px-16 py-4 flex items-center justify-center"
          >
            Example
          </a>
          <a
            href="/share"
            className="border border-black bg-white text-black px-16 py-4 flex items-center justify-center"
          >
            WhitePaper
          </a>
        </div>
      </div>
    </>
  );
}