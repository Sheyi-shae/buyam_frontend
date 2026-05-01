"use client";

import React, { useEffect, useRef } from "react";
import SearchInput from "./search-input";
import { animate, stagger, splitText } from "animejs";

export default function Hero() {
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!textRef.current) return;

  const { chars } = splitText(textRef.current, {
  words: false,
  chars: true,
});



    animate(chars, {
  translateY: [
    { to: -5, duration: 1500 },
    { to: 0, duration: 1500 }
  ],
  delay: stagger(100),
  easing: "easeInOutSine",
  loop: true,
});
  }, []);

  

  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-6xl font-bold gradient-char mb-6 leading-tight">
        Discover Everything
        <span
  ref={textRef}
  className="block text-gray-900 cat-heading"
>
  From Trusted Vendors
</span>
      </h1>

     

      <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
        Shop from thousands of verified vendors in one place.
      </p>

      <SearchInput />
    </div>
  );
}