import { useEffect, useState } from "react";

const images = ["/img/Hero/slide1.jpg", "/img/Hero/slide2.jpg", "/img/Hero/slide3.jpg"];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] items-end overflow-hidden bg-dark">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden={i !== index}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/60 to-dark/10" />
      <div className="relative mx-auto w-full max-w-6xl px-5 pb-24 pt-32 text-white">
        <p className="text-sm tracking-widest text-hero-sub">沼津工業高等専門学校</p>
        <h1 className="mt-3 font-logo text-6xl font-bold md:text-7xl">数理同好会</h1>
        <span className="mt-6 block h-1 w-28 bg-gold" />
        <p className="mt-6 text-lg font-bold">数学を楽しむ、沼津高専の同好会です。</p>
        <p className="mt-3 max-w-xl leading-relaxed text-hero-sub">
          授業の補足や大学数学の入門まで、各自が持ち寄った問題をみんなで考え、教え合っています。
        </p>
      </div>
      <div className="absolute bottom-6 left-5 flex items-center gap-3 text-hero-sub md:left-[max(1.25rem,calc((100vw-72rem)/2+1.25rem))]">
        <span className="text-[11px] tracking-[0.3em]">Scroll</span>
        <span className="block h-px w-11 bg-gold" />
      </div>
    </section>
  );
}
