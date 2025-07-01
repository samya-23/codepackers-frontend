// src/components/HeroCarousel.tsx

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "@/index.css"; // Ensure Tailwind is loaded

const HeroCarousel = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />

      {/* Swiper Carousel */}
      <div className="relative z-20 h-full">
        <Swiper
          modules={[Pagination, Navigation]}
          pagination={{ clickable: true }}
          navigation
          loop={true}
          className="h-full"
        >
          {/* Slide 1: Codepackers */}
          <SwiperSlide>
            <div className="flex flex-col justify-center items-center text-center h-full px-6 text-white relative">
              <div className="pt-20 md:pt-0">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                  Codepackers Software Solutions
                </h1>
                <p className="max-w-3xl text-lg md:text-xl mx-auto drop-shadow-md">
                  Codepackers is a software design and development company. Our team combines years of expertise with modern AI-driven practices to deliver scalable, future-ready solutions.
                </p>
              </div>

              {/* Bottom Buttons */}
              <div className="absolute bottom-16 px-4 md:px-0 w-full flex flex-wrap justify-center gap-4">
                {[
                  { label: "Capabilities", href: "#platform" },
                  { label: "Expertise", href: "#expertise" },
                  { label: "Team", href: "#team" },
                  { label: "Contact", href: "#contact" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group flex items-center justify-between gap-2 min-w-[190px] px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium shadow-md hover:bg-white/20 hover:scale-105 transition-all duration-300 ease-in-out"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </a>
                ))}
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2: Alaap & Pustak */}
          <SwiperSlide>
            <div className="flex flex-col items-center justify-center text-center h-full px-6 text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Frameworks</h2>
              <div className="max-w-4xl w-full grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 rounded-xl p-6 shadow-lg backdrop-blur-sm">
                  <h3 className="text-2xl font-semibold mb-2 text-blue-300">Alaap</h3>
                  <p className="text-sm">
                    Alaap is our conversational AI framework — enabling personalized voice/chat agents for enterprises with multi-language support.
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-6 shadow-lg backdrop-blur-sm">
                  <h3 className="text-2xl font-semibold mb-2 text-green-300">Pustak</h3>
                  <p className="text-sm">
                    Pustak is a document-based AI system powering intelligent search, recommendations, and automation for text-heavy platforms.
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3: Coming Soon */}
          <SwiperSlide>
            <div className="flex flex-col justify-center items-center text-center h-full px-6 text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">More Coming Soon</h2>
              <p className="max-w-2xl text-lg">
                We are constantly evolving. Stay tuned for updates on our client success stories, innovation labs, and partner ecosystem.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HeroCarousel;
