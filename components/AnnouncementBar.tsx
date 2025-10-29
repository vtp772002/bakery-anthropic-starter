"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Props = { text: string; href?: string };
export default function AnnouncementBar({ text, href }: Props) {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div 
      className={`w-full bg-black text-white text-sm py-2 transition-all duration-300 ease-out ${
        isScrolling ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      {/* Scrolling text animation for all devices */}
      <div className="overflow-hidden whitespace-nowrap" style={{ touchAction: 'manipulation' }}>
        <div className="animate-scroll-text inline-block pointer-events-none">
          <span className="inline-block px-6">{text}</span>
          {href && (
            <Link href={href} className="inline-block px-6 underline decoration-neutral-500 underline-offset-4 pointer-events-auto">
              Learn more
            </Link>
          )}
          {/* Duplicate for seamless loop */}
          <span className="inline-block px-6">{text}</span>
          {href && (
            <Link href={href} className="inline-block px-6 underline decoration-neutral-500 underline-offset-4 pointer-events-auto">
              Learn more
            </Link>
          )}
          {/* Triple for wider screens */}
          <span className="inline-block px-6">{text}</span>
          {href && (
            <Link href={href} className="inline-block px-6 underline decoration-neutral-500 underline-offset-4 pointer-events-auto">
              Learn more
            </Link>
          )}
        </div>
      </div>
      

    </div>
  );
}
