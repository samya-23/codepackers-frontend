import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import {
  MessageCircle, Mic, Shield, Globe, Users, BarChart3
} from "lucide-react";

const frameworks = {
  A: [
    {
      icon: MessageCircle,
      title: "Multi-Channel Communication",
      description: "Chat, voice messages, internet calls, and telephone integration",
      features: ["WhatsApp Integration", "Voice Calls", "Web Chat", "Mobile Apps"]
    },
    {
      icon: Mic,
      title: "Voice Intelligence",
      description: "Real-time speech recognition and synthesis with customizable voices",
      features: ["Male/Female Voices", "Accent Control", "Live Transcription", "Voice Commands"]
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Private knowledge repositories with enterprise-grade security",
      features: ["Data Privacy", "User Authentication", "Secure APIs", "Compliance Ready"]
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "Break language barriers with intelligent translation and localization",
      features: ["50+ Languages", "Real-time Translation", "Cultural Context", "Voice Synthesis"]
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Deep insights into conversations, sentiment, and user behavior",
      features: ["Sentiment Analysis", "Intent Recognition", "Usage Analytics", "Performance Metrics"]
    },
    {
      icon: Users,
      title: "User Management",
      description: "Comprehensive user and group management with role-based access",
      features: ["Role Management", "Group Controls", "Guest Access", "Admin Dashboard"]
    }
  ],
  B: []
};

frameworks.B = [...frameworks.A];

const FrameworkCapabilities = () => {
  const [selectedFramework, setSelectedFramework] = useState<'A' | 'B'>('A');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<any>(null);
  const currentCards = frameworks[selectedFramework];

  return (
    <section className="relative py-28 bg-gradient-to-b from-white via-slate-50 to-slate-100 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold tracking-tight text-gray-900">
            Platform <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-text-glow">Capabilities</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Explore AI capabilities tailored per framework.
          </p>
        </div>

        {/* Framework Toggle Buttons */}
        <div className="flex justify-center gap-4 mb-10">
          {(['A', 'B'] as const).map((fw) => (
            <button
              key={fw}
              onClick={() => setSelectedFramework(fw)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
                selectedFramework === fw
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              Framework {fw}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {currentCards.map((cap, i) => (
            <motion.div
              key={i}
              onClick={() => { setModalIndex(i); setActiveSlide(i); setModalOpen(true); }}
              className="cursor-pointer group bg-white/10 border border-white/20 backdrop-blur-md shadow-2xl rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_50px_rgba(99,102,241,0.2)]"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg mb-4">
                <cap.icon className="text-white w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{cap.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              className="bg-white/80 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl max-w-lg w-full"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(s) => setActiveSlide(s.activeIndex)}
                initialSlide={modalIndex}
                modules={[Pagination]}
              >
                {currentCards.map((cap, i) => (
                  <SwiperSlide key={i}>
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                          <cap.icon className="text-white w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">{cap.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-4">{cap.description}</p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                        {cap.features.map((f, idx) => <li key={idx}>{f}</li>)}
                      </ul>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Modern Nav Section */}
              <div className="flex flex-col items-center border-t bg-white px-6 py-4 space-y-2">
                <div className="flex gap-2 justify-center">
                  {currentCards.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-2 rounded-full transition-all duration-300 ${activeSlide === idx ? "bg-gradient-to-r from-blue-500 to-purple-500 w-6" : "bg-gray-300 w-2"}`}
                    />
                  ))}
                </div>

                <div className="flex justify-between w-full">
                  <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    disabled={activeSlide === 0}
                    className="px-4 py-1.5 text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full disabled:opacity-30 hover:opacity-90 transition"
                  >
                    ← Back
                  </button>

                  <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full shadow-sm">
                    Capability {activeSlide + 1} of {currentCards.length}
                  </span>

                  <button
                    onClick={() => swiperRef.current?.slideNext()}
                    disabled={activeSlide === currentCards.length - 1}
                    className="px-4 py-1.5 text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full disabled:opacity-30 hover:opacity-90 transition"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FrameworkCapabilities;
