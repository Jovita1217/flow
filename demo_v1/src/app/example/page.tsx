'use client'

import Image from "next/image";
import Link from 'next/link';
import { useEffect, useRef } from 'react';

interface WindowBoxProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

function WindowBox({ title, children, className = "" }: WindowBoxProps) {
  return (
    <div className={`bg-white p-6 border-2 border-gray-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${className}`}>
      <h2 className="text-2xl mb-4">{title}</h2>
      <div>
        {children}
      </div>
    </div>
  );
}

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

      <div className="min-h-screen p-8 font-['Zpix']">
        <Link 
          href="/"
          className="fixed top-8 left-8 border border-black bg-white text-black px-4 py-2 flex items-center gap-2 hover:bg-gray-100 transition-colors z-20"
        >
          ←
          Back
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="flex items-start mb-8">
            <Image
              src="/Ryan.jpg"
              alt="Profile"
              width={150}
              height={150}
              className="rounded-full"
            />
            <div className="ml-4">
              <h1 className="text-3xl">Ryan.eth</h1>
              <p className="text-lg">UID: SL00001</p>
              <p className="text-lg">猛男就应该穿女装</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="border-2 border-black bg-blue-100 px-3 py-1 text-sm">00后</span>
                <span className="border-2 border-black bg-green-100 px-3 py-1 text-sm">Hacker</span>
                <span className="border-2 border-black bg-purple-100 px-3 py-1 text-sm">Creator</span>
                <span className="border-2 border-black bg-yellow-100 px-3 py-1 text-sm">创业</span>
                <span className="border-2 border-black bg-pink-100 px-3 py-1 text-sm">开源自我</span>
                <span className="border-2 border-black bg-orange-100 px-3 py-1 text-sm">长期主义</span>
                <span className="border-2 border-black bg-indigo-100 px-3 py-1 text-sm">+</span>
              </div>
            </div>
          </div>
          
          <WindowBox title="👋 快速了解我？" className="mb-8 max-h-96 overflow-y-auto">
            <div className="space-y-4 text-lg">
              <p>1. Ryan🦄.eth, 00后</p>
              <p>2. 浙大图灵班20级，辅修创业(ITP)，之前在Yale暑研过三个月，24年刚毕业，想去Stanford，现在全职创业，在cook一个年轻人的创业加速器Spark Lab，详细可以看 mp.weixin.qq.com</p>
              <p>3. 我是一个Hacker, Maker, and Creator，做过一些「自己的」的作品。Build In Public开源自我，黑客松惯犯，在尝试成为独立开发，学习出海ing，伪数字游民，超级链接者，00后创业小学生，Work For Myself</p>
              <p>4. Buidling Crypto和Generative AI，目前对科技、社区、创业、教育感兴趣</p>
              <p>更详细的可以看我的个人说明书: k5ms77k0o1.feishu.cn</p>
            </div>
          </WindowBox>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <WindowBox title="🖼️ 我眼里的我" className="max-h-64 overflow-y-auto">
              <p className="text-lg">
                就像 YC创始人 Paul Graham 的《Hackers And Painters 》说的，我是一个 Hacker, Maker, and Creator。
                我的电脑就是我的画笔，我用他"画"出我的产品、blog、视频、音频。
                Hacking 对于我来说，是一种表达自己的方式；同时也是一种链接、与他人共鸣的方法，就像一颗石子，落在湖里泛起的涟漪。
                「我的所有作品」也是我正在泛起的涟漪，包括这篇自我介绍。
              </p>
            </WindowBox>
            
            <WindowBox title="" className="max-h-64 overflow-y-auto">
              <iframe
                src="https://www.youtube.com/embed/m7_3T8fpNPY"
                className="w-full h-48 mb-4"
                title="YouTube video"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
              <p className="text-lg">
                Want3是一个public goods工具，服务于解决ETH生态上的帮人代支付的问题。每个人都可以在我们平台上发布自己的愿望，并且发送分享给其他人，鼓励他们参与完成这一愿望，并且将完成愿望对证明上链，我们工具应用的场景有很多，比如Web3支付宝亲情付、众筹生日礼物、结婚份子钱。
              </p>
            </WindowBox>

            <WindowBox title="" className="max-h-64 overflow-y-auto hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-center">
              <span className="text-3xl">+</span>
            </WindowBox>
          </div>
        </div>
      </div>
    </>
  );
}