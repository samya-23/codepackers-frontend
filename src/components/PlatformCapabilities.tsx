import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import {
  MessageCircle, Mic, Shield, Globe, Users, BarChart3,
  Bot, Database, MonitorSmartphone, PhoneCall, Link2, LineChart
} from "lucide-react";
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Capability {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  short: string;
  description: string;
  features: string[];
}

interface Frameworks {
  ALAAP: Capability[];
  PUSTAK: Capability[];
}

const frameworks: Frameworks = {
  ALAAP: [
    {
      icon: MessageCircle,
      title: "capabilities.alaap.communication.title",
      short: "capabilities.alaap.communication.short",
      description: "capabilities.alaap.communication.description",
      features: [
        "capabilities.alaap.communication.features.0",
        "capabilities.alaap.communication.features.1",
        "capabilities.alaap.communication.features.2",
        "capabilities.alaap.communication.features.3"
      ]
    },
    {
      icon: Mic,
      title: "capabilities.alaap.voice.title",
      short: "capabilities.alaap.voice.short",
      description: "capabilities.alaap.voice.description",
      features: [
        "capabilities.alaap.voice.features.0",
        "capabilities.alaap.voice.features.1",
        "capabilities.alaap.voice.features.2",
        "capabilities.alaap.voice.features.3"
      ]
    },
    {
      icon: Shield,
      title: "capabilities.alaap.security.title",
      short: "capabilities.alaap.security.short",
      description: "capabilities.alaap.security.description",
      features: [
        "capabilities.alaap.security.features.0",
        "capabilities.alaap.security.features.1",
        "capabilities.alaap.security.features.2",
        "capabilities.alaap.security.features.3"
      ]
    },
    {
      icon: Globe,
      title: "capabilities.alaap.multilingual.title",
      short: "capabilities.alaap.multilingual.short",
      description: "capabilities.alaap.multilingual.description",
      features: [
        "capabilities.alaap.multilingual.features.0",
        "capabilities.alaap.multilingual.features.1",
        "capabilities.alaap.multilingual.features.2",
        "capabilities.alaap.multilingual.features.3"
      ]
    },
    {
      icon: BarChart3,
      title: "capabilities.alaap.analytics.title",
      short: "capabilities.alaap.analytics.short",
      description: "capabilities.alaap.analytics.description",
      features: [
        "capabilities.alaap.analytics.features.0",
        "capabilities.alaap.analytics.features.1",
        "capabilities.alaap.analytics.features.2",
        "capabilities.alaap.analytics.features.3"
      ]
    },
    {
      icon: Users,
      title: "capabilities.alaap.management.title",
      short: "capabilities.alaap.management.short",
      description: "capabilities.alaap.management.description",
      features: [
        "capabilities.alaap.management.features.0",
        "capabilities.alaap.management.features.1",
        "capabilities.alaap.management.features.2",
        "capabilities.alaap.management.features.3"
      ]
    }
  ],
  PUSTAK: [
    {
      icon: Bot,
      title: "capabilities.pustak.agents.title",
      short: "capabilities.pustak.agents.short",
      description: "capabilities.pustak.agents.description",
      features: []
    },
    {
      icon: Database,
      title: "capabilities.pustak.erp.title",
      short: "capabilities.pustak.erp.short",
      description: "capabilities.pustak.erp.description",
      features: []
    },
    {
      icon: MonitorSmartphone,
      title: "capabilities.pustak.apps.title",
      short: "capabilities.pustak.apps.short",
      description: "capabilities.pustak.apps.description",
      features: []
    },
    {
      icon: PhoneCall,
      title: "capabilities.pustak.communication.title",
      short: "capabilities.pustak.communication.short",
      description: "capabilities.pustak.communication.description",
      features: []
    },
    {
      icon: Link2,
      title: "capabilities.pustak.integration.title",
      short: "capabilities.pustak.integration.short",
      description: "capabilities.pustak.integration.description",
      features: []
    },
    {
      icon: LineChart,
      title: "capabilities.pustak.analytics.title",
      short: "capabilities.pustak.analytics.short",
      description: "capabilities.pustak.analytics.description",
      features: []
    }
  ]
};

const PlatformCapabilities = () => {
  const { t } = useTranslation();
  const [selectedFramework, setSelectedFramework] = useState<keyof Frameworks>("ALAAP");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [modalCards, setModalCards] = useState<Capability[]>([]);
  const swiperRef = useRef<any>(null);
  const mainSwiperRef = useRef<any>(null);
  const currentCards = modalOpen ? modalCards : frameworks[selectedFramework];

  useEffect(() => {
    if (mainSwiperRef.current) {
      if (modalOpen) {
        mainSwiperRef.current.autoplay.stop();
      } else {
        mainSwiperRef.current.autoplay.start();
      }
    }
  }, [modalOpen]);

  useEffect(() => {
    if (mainSwiperRef.current?.navigation) {
      setTimeout(() => {
        mainSwiperRef.current.navigation.init();
        mainSwiperRef.current.navigation.update();
      }, 0);
    }
  }, []);

  return (
    <section id="capabilities" className="relative overflow-hidden py-12 md:py-24 px-4 sm:px-6 lg:px-20 bg-gradient-to-br from-white via-slate-50 to-slate-100">
      {/* Background Glow Blobs */}
      <div className="absolute -top-32 -left-32 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-purple-400 opacity-20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-400 opacity-20 rounded-full blur-3xl animate-pulse" />
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true">
        <defs>
          <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#e2e8f0" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto text-center space-y-6 md:space-y-10">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900"
        >
          {t('capabilities.title')} <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">{t('capabilities.platform')}</span>
        </motion.h2>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
          {t('capabilities.subtitle')}
        </p>

        <div className="mt-8 md:mt-12">
          <Swiper
            onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={false}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            modules={[Navigation, Autoplay]}
            className="relative"
          >
            {(Object.entries(frameworks) as [keyof Frameworks, Capability[]][]).map(
              ([label, cards], slideIndex) => (
                <SwiperSlide key={label}>
                  <div className="flex flex-col items-center px-2">
                    <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text mb-2">
                      {t(`capabilities.${label.toLowerCase()}.label`)}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600 mb-4 md:mb-6">{t('capabilities.clickPrompt')}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full px-2 sm:px-4 md:px-8">
                      {cards.map((cap, i) => {
                        const globalIndex = slideIndex === 0 ? i : frameworks.ALAAP.length + i;
                        return (
                          <motion.div
                            key={globalIndex}
                            whileHover={{ scale: 1.05, y: -4 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => {
                              setModalCards(cards);
                              setModalIndex(i);
                              setActiveSlide(i);
                              setSelectedFramework(label);
                              setModalOpen(true);
                            }}
                            className="cursor-pointer bg-white/30 backdrop-blur-2xl rounded-2xl md:rounded-3xl p-4 md:p-6 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300"
                          >
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white mb-3 md:mb-4">
                              <cap.icon className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <h3 className="text-lg md:text-xl font-semibold text-gray-800">{t(cap.title)}</h3>
                            <p className="text-xs md:text-sm text-gray-600 mt-1 md:mt-2">{t(cap.short)}</p>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </SwiperSlide>
              )
            )}
          </Swiper>
          <div className="mt-6 md:mt-10 flex justify-center gap-4 md:gap-6">
            <button
              className="custom-prev group relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out flex items-center justify-center"
              aria-label="Previous"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:scale-110 transition-transform duration-200" />
            </button>

            <button
              className="custom-next group relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out flex items-center justify-center"
              aria-label="Next"
            >
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:scale-110 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              className="bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl p-4 sm:p-6 md:p-8 max-w-full sm:max-w-lg md:max-w-2xl w-full"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(s) => setActiveSlide(s.realIndex)}
                initialSlide={modalIndex}
                loop={true}
                modules={[Pagination]}
              >
                {currentCards.map((cap, i) => (
                  <SwiperSlide key={i}>
                    <div>
                      <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white">
                          <cap.icon className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900">{t(cap.title)}</h3>
                      </div>
                      <p className="text-sm md:text-base text-gray-700 mb-3 md:mb-4">{t(cap.description)}</p>
                      {cap.features.length > 0 && (
                        <ul className="list-disc list-inside text-xs md:text-sm text-gray-700 space-y-1">
                          {cap.features.map((f, idx) => (
                            <li key={idx}>{t(f)}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="mt-4 md:mt-6 flex items-center justify-between">
                <button
                  onClick={() => swiperRef.current?.slidePrev()}
                  className="text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow"
                >
                  {t('capabilities.back')}
                </button>
                <span className="text-xs text-gray-500">
                  {t('capabilities.capability')} {activeSlide + 1} {t('capabilities.of')} {currentCards.length}
                </span>
                <button
                  onClick={() => swiperRef.current?.slideNext()}
                  className="text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow"
                >
                  {t('capabilities.next')} →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PlatformCapabilities;