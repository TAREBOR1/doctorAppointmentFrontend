"use client"

import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets/assets_frontend/assets";
import Image from "next/image";

const HeroSection = () => {
  const sliderData = [
    {
    
      imgSrc: assets.header1,
    },
    {
    
      imgSrc: assets.header2,
    },
    {
     
      imgSrc: assets.header3,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);


  return (
   <div className="relative w-full  overflow-hidden h-[calc(80vh-80px)] mt-18">
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
        <div className="relative min-w-full h-full"  key={index}>
              <Image
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
                className="object-cover"
                fill
              />
            </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
