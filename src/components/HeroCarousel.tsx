import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import SwiperCore from "swiper";
import AIChatCarousel from "./AIChatCarousel/AIChatCarousel";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "@/index.css";

const HeroCarousel = () => {
  const swiperRef = useRef<SwiperCore | null>(null);

  const handleChatLoopComplete = () => {
    swiperRef.current?.slideNext();
  };

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

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />

      {/* Carousel Content */}
      <div className="relative z-20 h-full">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Autoplay, Navigation, EffectFade]}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            nextEl: ".hero-swiper-button-next",
            prevEl: ".hero-swiper-button-prev",
          }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop
          className="h-full"
        >
          {/* Slide 1: Introduction */}
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

              <div className="absolute bottom-16 px-4 md:px-0 w-full flex flex-wrap justify-center gap-4">
                {["Capabilities", "Expertise", "Team", "Contact"].map((label) => (
                  <a
                    key={label}
                    href={`#${label.toLowerCase()}`}
                    className="group flex items-center justify-between gap-2 min-w-[190px] px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium shadow-md hover:bg-white/20 hover:scale-105 transition-all duration-300 ease-in-out"
                  >
                    <span>{label}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </a>
                ))}
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2: AI Chat Carousel */}
          <SwiperSlide>
            <div className="flex justify-center items-center h-full text-white px-4 md:px-12">
              <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
                {/* Left Text Content */}
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                      AI Conversational
                    </span>
                    <br />
                    Agents for Enterprise
                  </h2>
                  <p className="text-lg mb-6 max-w-xl">
                    Empower your organization with personified AI agents that understand your business, speak your language, and protect your data. From chat to voice, we make AI accessible to everyone.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mb-6 text-sm font-medium">
                    <span className="flex items-center gap-2"><span>💬</span> Chat with your private data</span>
                    <span className="flex items-center gap-2"><span>🎤</span> Voice Enabled</span>
                    <span className="flex items-center gap-2"><span>🌐</span> Multi-language</span>
                  </div>

                  <a
                    href="https://www.aptilab.in/signin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition"
                  >
                    Try Our Agent <ArrowRight className="w-5 h-5" />
                  </a>
                </div>

                {/* Right AI Chat Component */}
                <div className="max-w-screen-xl mx-auto w-full px-4 md:px-8">
                  <AIChatCarousel onLoopComplete={handleChatLoopComplete} />
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

        {/* Navigation Arrows */}
        <button className="hero-swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/30 hover:bg-white/20 text-white rounded-full transition">
          <ChevronLeft size={24} />
        </button>
        <button className="hero-swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/30 hover:bg-white/20 text-white rounded-full transition">
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default HeroCarousel;
