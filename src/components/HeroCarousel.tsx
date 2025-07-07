import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import SwiperCore from "swiper";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
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
  const swiperRef = useRef<SwiperCore | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [chatLoopKey, setChatLoopKey] = useState(0);
const [pustakLoopKey, setPustakLoopKey] = useState(0); // 👉 Add this
const [pustakLottieData, setPustakLottieData] = useState(null);

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
    setPustakLoopKey((prev) => prev + 1); // 👉 trigger Slide 4 Lottie only when visited
  }
};

  const alaapFeatures = [
  [<Bot size={32} stroke="url(#icon-gradient)" />, "Website chatbots & voicebots"],
  [<Headset size={32} stroke="url(#icon-gradient)" />, "Customer Helpdesks"],
  [<Briefcase size={32} stroke="url(#icon-gradient)" />, "Virtual Sales agents"],
  [<PhoneCall size={32} stroke="url(#icon-gradient)" />, "Call centers"],
  [<CalendarDays size={32} stroke="url(#icon-gradient)" />, "Online Bookings"],
  [<GraduationCap size={32} stroke="url(#icon-gradient)" />, "Educational purposes"],
  [<Tv size={32} stroke="url(#icon-gradient)" />, "Infotainment"],
  [<Mic size={32} stroke="url(#icon-gradient)" />, "Capacity building & Trainings"],
  [<FlaskConical size={32} stroke="url(#icon-gradient)" />, "Online tests & evaluations"],
  [<SatelliteDish size={32} stroke="url(#icon-gradient)" />, "Enterprise communications"],
];
const pustakFeatures = [
  [<UserRound size={32} stroke="url(#icon-gradient)" />, "Human Resources"],
  [<Boxes size={32} stroke="url(#icon-gradient)" />, "Inventory"],
  [<Truck size={32} stroke="url(#icon-gradient)" />, "Supply Chain Management"],
  [<Users size={32} stroke="url(#icon-gradient)" />, "Employee Management"],
  [<FileText size={32} stroke="url(#icon-gradient)" />, "Project & Tasks Management"],
  [<ActivitySquare size={32} stroke="url(#icon-gradient)" />, "Leads, Prospects, CRM"],
  [<Hammer size={32} stroke="url(#icon-gradient)" />, "Trouble Tickets"],
  [<Hospital size={32} stroke="url(#icon-gradient)" />, "Health Management"],
  [<GraduationCap size={32} stroke="url(#icon-gradient)" />, "Schools and Colleges"],
  [<FileText size={32} stroke="url(#icon-gradient)" />, "Visitor Entry"],
  [<Briefcase size={32} stroke="url(#icon-gradient)" />, "Estate and Facilities"],
  [<BusFront size={32} stroke="url(#icon-gradient)" />, "Transportation System"],
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
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="flex flex-col justify-center items-center text-center h-full px-4 md:px-6 text-white relative">
              <div className="pt-28 md:pt-0">
                <h1 className="text-3xl md:text-6xl font-bold mb-4 drop-shadow-lg leading-snug md:leading-tight">
                  Codepackers Software Solutions
                </h1>
                <p className="max-w-3xl text-base md:text-xl mx-auto drop-shadow-md">
                  Codepackers is a software design and development company.
                </p>
                <p className="max-w-3xl text-base md:text-xl mx-auto drop-shadow-md mt-4">
                  Our team combines years of expertise with modern AI-driven
                  practices to deliver scalable, future-ready solutions.
                </p>
              </div>

              <div className="absolute bottom-12 md:bottom-16 px-4 w-full flex flex-wrap justify-center gap-3 md:gap-4">
                {["Capabilities", "Expertise", "Team", "Contact"].map((label) => (
                  <a
                    key={label}
                    href={`#${label.toLowerCase()}`}
                    className="group flex items-center justify-between gap-2 min-w-[160px] md:min-w-[190px] px-5 py-2.5 md:px-6 md:py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm md:text-base font-medium shadow-md hover:bg-white/20 hover:scale-105 transition-all duration-300 ease-in-out"
                  >
                    <span>{label}</span>
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </a>
                ))}
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 - AI Chat Preview */}
          <SwiperSlide>
            <div className="flex justify-center items-center h-full text-white px-4 md:px-8">
              <div className="w-full max-w-[1440px] flex flex-col md:flex-row justify-center items-center min-h-full px-0 md:px-10 py-8">
                {/* Text */}
                <div className="text-center md:text-left px-2 md:px-8">
                  
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-snug md:leading-tight">
  <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
    Alaap Framework
  </span>
  <br />
  <span className="text-white">
    Enterprise AI Agents
  </span>
</h2>


                  <p className="text-base md:text-lg mb-6 max-w-xl mx-auto md:mx-0">
                    Empower your organization with personified AI agents that
                    understand your business, speak your language, and protect
                    your data. From chat to voice, we make AI accessible to
                    everyone.
                  </p>

                  <div className="flex flex-col sm:flex-row sm:flex-wrap items-center md:items-start gap-3 md:gap-4 mb-6 text-sm font-medium justify-center md:justify-start">
                    <span className="flex items-center gap-2">
                      <span>💬</span> Chat with your private data
                    </span>
                    <span className="flex items-center gap-2">
                      <span>🎤</span> Voice Enabled
                    </span>
                    <span className="flex items-center gap-2">
                      <span>🌐</span> Multi-language
                    </span>
                  </div>

                  <a
                    href="https://www.aptilab.in/signin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold shadow-md transition text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 hover:shadow-lg"
                  >
                    Try Our Agent <ArrowRight className="w-5 h-5" />
                  </a>
                </div>

                <div className="w-full px-4 md:px-0 md:w-[560px] lg:w-[640px] xl:w-[720px] mx-auto transition-all duration-500 ease-in-out">
                  <AIChatCarousel loopKey={chatLoopKey} run={activeIndex === 1} />
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          
          <SwiperSlide>
  <div className="flex flex-col justify-center items-center text-center h-full px-6 text-white">
    <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-snug md:leading-tight">
      <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
        Alaap Platform
      </span>
    </h2>
    <p className="max-w-3xl text-base md:text-lg mb-10">
      The Alaap platform can create AI agents for:
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
      className="grid grid-cols-2 md:grid-cols-5 gap-6 w-full max-w-6xl"
    >
      {alaapFeatures.map(([icon, label], i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: "easeOut" },
            },
          }}
          className="flex flex-col items-center justify-center p-5 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/10 shadow-md hover:shadow-xl backdrop-blur-md hover:scale-105 text-center"
        >
          <div className="mb-3">{icon}</div>
          <p className="text-sm md:text-base text-white leading-snug">{label}</p>
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
      <div className="text-center md:text-left px-2 md:px-8">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-snug md:leading-tight">
  <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
    Pustak Framework
  </span>
  <br />
  <span className="whitespace-nowrap">Streamlined ERP & Workflows</span>
</h2>
        <p className="text-base md:text-lg mb-6 max-w-xl mx-auto md:mx-0">
          A powerful, modular framework built for enterprise operations like CRM,
          HRMS, Projects, SCM & more. Includes user control, dashboards, audit logs,
          notifications & role-based access.
        </p>

        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6 text-sm font-medium justify-center md:justify-start whitespace-nowrap">
  <span className="flex items-center gap-1">🔐 Role-Based Access</span>
  <span className="flex items-center gap-1">📊 Reports & Dashboards</span>
  <span className="flex items-center gap-1">🧩 Modular Architecture</span>
</div>



        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold shadow-md transition text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 hover:shadow-lg"
        >
          Contact Us <ArrowRight className="w-5 h-5" />
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
{/* Slide 5 – Pustak Platform Domains */}
  {/* Slide 5 – Pustak Platform Domains */}
<SwiperSlide>
  <div className="flex flex-col justify-center items-center text-center h-full px-6 text-white">
    <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-snug md:leading-tight">
      <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
        Pustak Platform
      </span>
    </h2>
    <p className="max-w-3xl text-base md:text-lg mb-10">
      The Pustak platform caters to the requirements of data management systems for:
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
      className="grid grid-cols-2 md:grid-cols-6 gap-6 w-full max-w-6xl"

    >
      {pustakFeatures.map(([icon, label], i) => (

        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: "easeOut" },
            },
          }}
          className="flex flex-col items-center justify-center p-5 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/10 shadow-md hover:shadow-xl backdrop-blur-md hover:scale-105 text-center"
        >
          <div className="mb-3">{icon}</div>
          <p className="text-sm md:text-base text-white leading-snug text-center">
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
