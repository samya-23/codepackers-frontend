import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import SwiperCore from "swiper";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Bot,
  Headset,
  Briefcase,
  PhoneCall,
  CalendarDays,
  GraduationCap,
  Tv,
  Mic,
  FlaskConical,
  SatelliteDish,
  UserRound,
  Boxes,
  Truck,
  Users,
  FileText,
  ActivitySquare,
  Hammer,
  Hospital,
  BusFront,
} from "lucide-react";
import Lottie from "lottie-react";
const pustakLottiePath = "/assets/pustak-lottie.json";
import AIChatCarousel from "./AIChatCarousel/AIChatCarousel";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "@/index.css";

const HeroCarousel = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const { t } = useTranslation();
  const swiperRef = useRef<SwiperCore | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [chatLoopKey, setChatLoopKey] = useState(0);
  const [pustakLoopKey, setPustakLoopKey] = useState(0);
  const [pustakLottieData, setPustakLottieData] = useState<any>(null);

  useEffect(() => {
    fetch(pustakLottiePath)
      .then((res) => res.json())
      .then((data) => setPustakLottieData(data))
      .catch((err) => console.error("Error loading Pustak Lottie:", err));
  }, []);

  const handleSlideChange = (swiper: SwiperCore) => {
    const index = swiper.realIndex;
    setActiveIndex(index);

    if (index === 1) {
      setChatLoopKey((prev) => prev + 1);
    }

    if (index === 3) {
      setPustakLoopKey((prev) => prev + 1);
    }
  };

  const alaapFeatures = [
    [<Bot key="bot" size={32} stroke="url(#icon-gradient)" />, t("alaap.features.0")],
    [<Headset key="headset" size={32} stroke="url(#icon-gradient)" />, t("alaap.features.1")],
    [<Briefcase key="briefcase" size={32} stroke="url(#icon-gradient)" />, t("alaap.features.2")],
    [<PhoneCall key="phone" size={32} stroke="url(#icon-gradient)" />, t("alaap.features.3")],
    [<CalendarDays key="calendar" size={32} stroke="url(#icon-gradient)" />, t("alaap.features.4")],
    [<GraduationCap key="graduation" size={32} stroke="url(#icon-gradient)" />, t("alaap.features.5")],
    [<Tv key="tv" size={32} stroke="url(#icon-gradient)" />, t("alaap.features.6")],
    [<Mic key="mic" size={32} stroke="url(#icon-gradient)" />, t("alaap.features.7")],
    [<FlaskConical key="flask" size={32} stroke="url(#icon-gradient)" />, t("alaap.features.8")],
    [<SatelliteDish key="satellite" size={32} stroke="url(#icon-gradient)" />, t("alaap.features.9")],
  ];

  const pustakFeatures = [
    [<UserRound key="user" size={32} stroke="url(#icon-gradient)" />, t("pustak.features.0")],
    [<Boxes key="boxes" size={32} stroke="url(#icon-gradient)" />, t("pustak.features.1")],
    [<Truck key="truck" size={32} stroke="url(#icon-gradient)" />, t("pustak.features.2")],
    [<Users key="users" size={32} stroke="url(#icon-gradient)" />, t("pustak.features.3")],
    [<FileText key="file" size={32} stroke="url(#icon-gradient)" />, t("pustak.features.4")],
    [<ActivitySquare key="activity" size={32} stroke="url(#icon-gradient)" />, t("pustak.features.5")],
    [<Hammer key="hammer" size={32} stroke="url(#icon-gradient)" />, t("pustak.features.6")],
    [<Hospital key="hospital" size={32} stroke="url(#icon-gradient)" />, t("pustak.features.7")],
    [<GraduationCap key="grad" size={32} stroke="url(#icon-gradient)" />, t("pustak.features.8")],
    [<FileText key="file2" size={32} stroke="url(#icon-gradient)" />, t("pustak.features.9")],
    [<Briefcase key="briefcase2" size={32} stroke="url(#icon-gradient)" />, t("pustak.features.10")],
    [<BusFront key="bus" size={32} stroke="url(#icon-gradient)" />, t("pustak.features.11")],
  ];


  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Gradient for Lucide icons */}
      <svg className="absolute w-0 h-0">
        <defs>
          <linearGradient id="icon-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Fallback image */}
<img
  src="/fallbacks/hero-fallback.jpg"
  alt="Fallback Background"
  className={`absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-500 ${
    isVideoLoaded ? "opacity-0" : "opacity-100"
  }`}
/>

{/* Background video */}
<video
  className={`absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-500 ${
    isVideoLoaded ? "opacity-100" : "opacity-0"
  }`}
  autoPlay
  loop
  muted
  playsInline
  preload="auto"
  onLoadedData={() => setIsVideoLoaded(true)}
>
  <source src="/background.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>


      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />

      <div className="relative z-20 h-full">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={handleSlideChange}
          modules={[Autoplay, Navigation, EffectFade]}
          autoplay={{
            delay: 5000,
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
          {/* Slide 1 - Intro */}
          <SwiperSlide>
            <div className="flex flex-col justify-center items-center text-center h-full px-4 md:px-6 text-white relative">
              <div className="pt-6 md:pt-0 px-4">
                <h1 className="text-2xl md:text-6xl font-bold mb-2 md:mb-4 drop-shadow-lg leading-snug md:leading-tight">
                  Codepackers Software Solutions
                </h1>
                <p className="max-w-3xl text-xs md:text-xl mx-auto drop-shadow-md">
                  {t("hero.intro1")}
                </p>
                <p className="max-w-3xl text-xs md:text-xl mx-auto drop-shadow-md mt-1 md:mt-4">
                  {t("hero.intro2")}
                </p>
              </div>

              {/* CTA Buttons - Mobile adjustments */}
              <div className="absolute bottom-6 md:bottom-16 px-4 w-full flex flex-col sm:flex-row justify-center items-center gap-2 md:gap-4">
                <button
                  onClick={() => swiperRef.current?.slideTo(1)}
                  className="group flex items-center justify-between gap-2 w-full sm:w-auto min-w-[160px] md:min-w-[220px] px-3 py-1.5 md:px-5 md:py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs md:text-base font-medium shadow-md hover:bg-white/20 hover:scale-105 transition-all duration-300 ease-in-out"
                >
                  <span>{t("hero.cta.alaap")}</span>
                  <ArrowRight className="w-3 h-3 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>

                <button
                  onClick={() => swiperRef.current?.slideTo(3)}
                  className="group flex items-center justify-between gap-2 w-full sm:w-auto min-w-[160px] md:min-w-[220px] px-3 py-1.5 md:px-5 md:py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs md:text-base font-medium shadow-md hover:bg-white/20 hover:scale-105 transition-all duration-300 ease-in-out"
                >
                  <span>{t("hero.cta.pustak")}</span>
                  <ArrowRight className="w-3 h-3 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 - AI Chat Preview */}
          <SwiperSlide>
            <div className="flex justify-center items-center h-full text-white px-2 sm:px-4 md:px-8">
              <div className="w-full max-w-[1440px] flex flex-col md:flex-row justify-center items-center min-h-full px-0 md:px-10 py-2 md:py-8">
                {/* Text */}
                <div className="text-center md:text-left px-2 md:px-8 mb-4 md:mb-0 w-full md:w-1/2">
                  <h2 className="text-xl md:text-5xl font-bold mb-2 md:mb-6 leading-snug md:leading-tight">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                      {t("alaap.title")}
                    </span>
                    <br />
                    <span className="text-white">
                      {t("alaap.subtitle")}
                    </span>
                  </h2>

                  <p className="text-xs md:text-lg mb-2 md:mb-6 max-w-xl mx-auto md:mx-0">
                    {t("alaap.description")}
                  </p>

                  <div className="flex flex-wrap items-center md:items-start gap-1 md:gap-4 mb-2 md:mb-6 text-xs md:text-sm font-medium justify-center md:justify-start">
                    <span className="flex items-center gap-1">
                      <span>💬</span> {t("alaap.points.0")}
                    </span>
                    <span className="flex items-center gap-1">
                      <span>🎤</span> {t("alaap.points.1")}
                    </span>
                    <span className="flex items-center gap-1">
                      <span>🌐</span> {t("alaap.points.2")}
                    </span>
                  </div>

                  <a
                    href="https://www.aptilab.in/signin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 md:px-6 md:py-3 rounded-full font-semibold shadow-md transition text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 hover:shadow-lg text-xs md:text-base"
                  >
                    {t("alaap.tryAgent")}<ArrowRight className="w-3 h-3 md:w-5 md:h-5" />
                  </a>
                </div>

                <div className="w-full md:w-1/2 px-2 md:px-0 mx-auto transition-all duration-500 ease-in-out scale-75 md:scale-100">
                  <AIChatCarousel loopKey={chatLoopKey} run={activeIndex === 1} />
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 - Alaap Features */}
          <SwiperSlide>
            <div className="flex flex-col justify-center items-center text-center h-full px-4 md:px-6 text-white pt-16 md:pt-0 pb-8 md:pb-0">
              <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6 leading-snug md:leading-tight">
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                  {t("alaap.platformTitle")}
                </span>
              </h2>
              <p className="max-w-3xl text-sm md:text-lg mb-6 md:mb-10 px-4">
                {t("alaap.platformDesc")}
              </p>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
                className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-6 w-full max-w-6xl px-4"
              >
                {alaapFeatures.map(([icon, label], i) => (
                  <motion.div
                    key={`alaap-feature-${i}`}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, ease: "easeOut" },
                      },
                    }}
                    className="flex flex-col items-center justify-center p-3 md:p-5 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/10 shadow-md hover:shadow-xl backdrop-blur-md hover:scale-105 text-center"
                  >
                    <div className="mb-2 md:mb-3">{icon}</div>
                    <p className="text-xs md:text-sm lg:text-base text-white leading-snug">{label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </SwiperSlide>

          {/* Slide 4 - Pustak Framework */}
          <SwiperSlide>
            <div className="flex justify-center items-center h-full text-white px-4 md:px-8">
              <div className="w-full max-w-[1440px] flex flex-col md:flex-row justify-center items-center min-h-full px-0 md:px-10 py-8">
                {/* Text Section */}
                <div className="text-center md:text-left px-2 md:px-8 mb-8 md:mb-0">
                  <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6 leading-snug md:leading-tight">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                      {t("pustak.title")}
                    </span>
                    <br />
                    <span className="whitespace-nowrap">{t("pustak.subtitle")}</span>
                  </h2>
                  <p className="text-sm md:text-lg mb-4 md:mb-6 max-w-xl mx-auto md:mx-0">
                    {t("pustak.description")}
                  </p>

                  <div className="flex flex-wrap gap-x-2 md:gap-x-4 gap-y-1 md:gap-y-2 mb-4 md:mb-6 text-xs md:text-sm font-medium justify-center md:justify-start whitespace-nowrap">
                    <span className="flex items-center gap-1">🔐 {t("pustak.tags.0")}</span>
                    <span className="flex items-center gap-1">📊 {t("pustak.tags.1")}</span>
                    <span className="flex items-center gap-1">🧩 {t("pustak.tags.2")}</span>
                  </div>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold shadow-md transition text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 hover:shadow-lg text-sm md:text-base"
                  >
                    {t("pustak.contact")} <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                </div>

                {/* Animated Lottie Visual */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="w-full md:w-[560px] lg:w-[640px] xl:w-[720px] mx-auto px-4 md:px-0 flex justify-center items-center"
                >
                  {pustakLottieData && (
                    <Lottie
                      key={pustakLoopKey}
                      animationData={pustakLottieData}
                      loop={false}
                      autoplay={true}
                      className="w-full h-auto"
                    />
                  )}
                </motion.div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 5 - Pustak Platform Domains */}
          <SwiperSlide>
            <div className="flex flex-col justify-center items-center text-center h-full px-4 md:px-6 text-white pt-8 md:pt-0 pb-8 md:pb-0">
              <h2 className="text-xl md:text-5xl font-bold mb-2 md:mb-6 leading-snug md:leading-tight">
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                  {t("pustak.platformTitle")}
                </span>
              </h2>
              <p className="max-w-3xl text-xs md:text-lg mb-3 md:mb-10 px-4">
                {t("pustak.platformDesc")}
              </p>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4 lg:gap-6 w-full max-w-6xl px-4 overflow-y-auto max-h-[50vh] md:max-h-none pb-4"
              >
                {pustakFeatures.map(([icon, label], i) => (
                  <motion.div
                    key={`pustak-feature-${i}`}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, ease: "easeOut" },
                      },
                    }}
                    className="flex flex-col items-center justify-center p-2 md:p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/10 shadow-md hover:shadow-xl backdrop-blur-md hover:scale-105 text-center min-h-[90px] md:min-h-[120px]"
                  >
                    <div className="mb-1 md:mb-3 scale-50 md:scale-100">
                      {React.cloneElement(icon, { size: 20 })}
                    </div>
                    <p className="text-[9px] md:text-sm text-white leading-snug text-center">
                      {label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </SwiperSlide>
        </Swiper>

        {/* Navigation Arrows */}
        <button className="hero-swiper-button-prev absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/30 hover:bg-white/20 text-white rounded-full transition">
          <ChevronLeft size={20} />
        </button>
        <button className="hero-swiper-button-next absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/30 hover:bg-white/20 text-white rounded-full transition">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default HeroCarousel;