'use client'

import Image from "next/image";
import Link from 'next/link';

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

export default function Join() {
  // CTF 图片配置
  const ctfImages = [
    { 
      src: '/glitch_1-o.gif', 
      rotate: 0, 
      className: 'top-[10%] left-[8%]',
      size: 300
    },
    { 
      src: '/glitch_2-o.gif', 
      rotate: 0, 
      className: 'top-[10%] right-[8%]',
      size: 300
    },
    { 
      src: '/glitch_3-o.gif', 
      rotate: 0, 
      className: 'bottom-[10%] left-[8%]',
      size: 300
    },
    { 
      src: '/glitch_4-o.gif', 
      rotate: 0, 
      className: 'bottom-[10%] right-[8%]',
      size: 300
    }
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

      {/* 主要内容 - 垂直排列的按钮 */}
      <div className="flex flex-col items-center justify-center min-h-screen font-['Zpix'] p-4">
        <Link 
          href="/"
          className="fixed top-8 left-8 border border-black bg-white text-black px-4 py-2 flex items-center gap-2 hover:bg-gray-100 transition-colors z-20"
        >
          ← Back
        </Link>

        <div className="max-w-2xl w-full space-y-8">
          {/* Waiting List Button */}
          <button className="w-full border-2 border-black bg-white hover:bg-gray-50 transition-colors p-6 text-left group">
            <h2 className="text-xl font-bold mb-2">Join our Waiting List</h2>
            <p className="text-gray-600">
              might take a while for us to finish development - be patient!
            </p>
          </button>

          {/* Beta Testing Button */}
          <button className="w-full border-2 border-black bg-white hover:bg-gray-50 transition-colors p-6 text-left group">
            <h2 className="text-xl font-bold mb-2">Join our beta testing team</h2>
            <p className="text-gray-600">
              utterly believe in our mission? join our insider group chat and access pre-alpha early!
            </p>
          </button>

          {/* Dev Team Button */}
          <button className="w-full border-2 border-black bg-white hover:bg-gray-50 transition-colors p-6 text-left group">
            <h2 className="text-xl font-bold mb-2">Join our dev team</h2>
            <p className="text-gray-600">
              1x pixel artist, 1-2 front end devs, 1-2 back end devs. working physically in Shanghai is required
            </p>
          </button>
        </div>
      </div>
    </>
  );
}