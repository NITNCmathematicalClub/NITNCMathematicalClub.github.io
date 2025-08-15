// import React, { useState } from 'react';
import { useKeenSlider } from "keen-slider/react";

const images = [
  "./img/Hero/slide1.jpg",
  "./img/Hero/slide2.jpg",
  "./img/Hero/slide3.jpg",
];

const HeroSlider = () => {
  const [slideRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    defaultAnimation: {
      duration: 1000,
    },
    drag: false,
    renderMode: "performance",
    slides: { perView: 1 },
    created: (slider) => {
      setInterval(() => slider.next(), 5000);
    },
  });

  return (
    <div className="relative w-full aspect-[3/1.5] md:aspect-[3/1] overflow-hidden">
      <div ref={slideRef} className="keen-slider h-full">
        {images.map((src, idx) => (
          <div key={idx} className="keen-slider__slide">
            <div
              className="h-full w-full bg-cover bg-center filter blur-sm brightness-75 scale-110 mix-blend-overlay"
              style={{ backgroundImage: `url(${src})` }}
            ></div>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src="./img/Hero/MathematicalClubTitle.svg"
          // alt="数理同好会ロゴ"
          className="w-2/3 md:w-2/5 h-auto brightness-100 select-none pointer-events-none mix-blend-normal filter drop-shadow-md"
          draggable="false"
        />
      </div>
    </div>
  );
};

export default HeroSlider;
