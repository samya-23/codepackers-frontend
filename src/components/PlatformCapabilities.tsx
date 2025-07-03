import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import {
  MessageCircle, Mic, Shield, Globe, Users, BarChart3,
  Bot, Database, MonitorSmartphone, PhoneCall, Link2, LineChart
} from "lucide-react";

const frameworks = {
  ALAAP: [
    {
      icon: MessageCircle,
      title: "Multi-Channel Communication",
      short: "Chat, voice messages, internet calls, and telephone integration",
      description: "Chat, voice messages, internet calls, and telephone integration",
      features: ["WhatsApp Integration", "Voice Calls", "Web Chat", "Mobile Apps"]
    },
    {
      icon: Mic,
      title: "Voice Intelligence",
      short: "Real-time speech recognition and customizable voices",
      description: "Real-time speech recognition and synthesis with customizable voices",
      features: ["Male/Female Voices", "Accent Control", "Live Transcription", "Voice Commands"]
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      short: "Private knowledge with enterprise-grade security",
      description: "Private knowledge repositories with enterprise-grade security",
      features: ["Data Privacy", "User Authentication", "Secure APIs", "Compliance Ready"]
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      short: "Break barriers with smart translation & localization",
      description: "Break language barriers with intelligent translation and localization",
      features: ["50+ Languages", "Real-time Translation", "Cultural Context", "Voice Synthesis"]
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      short: "Insights into sentiment, usage & behavior",
      description: "Deep insights into conversations, sentiment, and user behavior",
      features: ["Sentiment Analysis", "Intent Recognition", "Usage Analytics", "Performance Metrics"]
    },
    {
      icon: Users,
      title: "User Management",
      short: "Group & role management for user access",
      description: "Comprehensive user and group management with role-based access",
      features: ["Role Management", "Group Controls", "Guest Access", "Admin Dashboard"]
    }
  ],
  PUSTAK: [
    {
      icon: Bot,
      title: "AI Conversational Agents",
      short: "Human-like AI chatbots and voice assistants for enterprises",
      description:
        "These are advanced AI agents, like chatbots and voice assistants, designed to mimic human conversation. They enable seamless, intuitive interactions for users within enterprise environments, automating support, sales, and information retrieval to enhance customer and employee experiences.",
      features: []
    },
    {
      icon: Database,
      title: "ERP Solutions / Data Management",
      short: "CRM, HR, Inventory, Tasks, Visitors data entry and analytics",
      description:
        "Comprehensive systems for managing crucial business data across departments. This includes CRM for customer interactions, HR for personnel, inventory tracking, project management, and scheduling for meetings and visitors. It centralizes data entry, ensures efficient management, and provides insightful analytics.",
      features: []
    },
    {
      icon: MonitorSmartphone,
      title: "Web and Mobile Applications",
      short: "Data entry, storage & workflow apps for all devices",
      description:
        "Tailored software designed for diverse platforms, offering customized solutions for data entry, secure storage, and streamlined workflow management. These applications ensure accessibility and functionality across all types of devices, including desktops, tablets, and smartphones, enhancing operational efficiency.",
      features: []
    },
    {
      icon: PhoneCall,
      title: "Communication Systems",
      short: "Multilingual Chat, Voice/Video Calls with Translation",
      description:
        "Sophisticated platforms facilitating real-time communication across various mediums. Features include multilingual chat, voice messaging, and high-quality voice and video calls, often with integrated online translation for global interactions, fostering seamless and effective collaboration.",
      features: []
    },
    {
      icon: Link2,
      title: "Software Systems Integration",
      short: "Connecting tools, platforms & databases into smart ecosystem",
      description:
        "The process of connecting disparate software applications, tools, platforms, and databases. This creates a unified and intelligent ecosystem, enabling seamless data flow, improved operational efficiency, and enhanced decision-making by eliminating silos and automating workflows.",
      features: []
    },
    {
      icon: LineChart,
      title: "Data Analytics",
      short: "Visualizing insights using dashboards and AI-driven tools",
      description:
        "The process of examining raw data to extract meaningful insights. This involves visualizing data through interactive dashboards and employing AI-driven analysis, and prediction algorithms to identify trends, patterns, and valuable information, supporting informed decision-making and strategic planning.",
      features: []
    }
  ]
};

const PlatformCapabilities = () => {
  const [selectedFramework, setSelectedFramework] = useState<"ALAAP" | "PUSTAK">("ALAAP");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<any>(null);
  const currentCards = frameworks[selectedFramework];

  return (
    <section className="relative py-28 bg-gradient-to-b from-white via-slate-50 to-slate-100 px-6 lg:px-20 overflow-hidden">
      {/* Radial Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-200 via-transparent to-transparent"></div>

      {/* Subtle Grid Pattern Overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <pattern id="dot-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" className="text-gray-300" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-5xl font-extrabold tracking-tight text-gray-900"
          >
            Platform <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-text-glow">Capabilities</span>
          </motion.h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Purpose-built features for conversational AI and enterprise systems
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex justify-center gap-4 mb-10">
          {(["ALAAP", "PUSTAK"] as const).map((fw) => (
            <button
              key={fw}
              onClick={() => setSelectedFramework(fw)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
                selectedFramework === fw
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {fw}
            </button>
          ))}
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFramework}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {currentCards.map((cap, i) => (
              <motion.div
                key={i}
                onClick={() => {
                  setModalIndex(i);
                  setActiveSlide(i);
                  setModalOpen(true);
                }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{
                  scale: 1.03,
                  y: -4,
                  boxShadow: "0 8px 30px rgba(99,102,241,0.25)"
                }}
                className="cursor-pointer group bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl p-6 transition-transform duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg mb-4">
                  <cap.icon className="text-white w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{cap.title}</h3>
                <p className="text-sm text-gray-600">{cap.short}</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              className="relative bg-white/80 dark:bg-white/10 backdrop-blur-2xl border border-white/30 shadow-[0_12px_40px_rgba(0,0,0,0.25)] rounded-3xl max-w-2xl w-full overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 40, transition: { duration: 0.4 } }}
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
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                          <cap.icon className="text-white w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-800 tracking-tight">{cap.title}</h3>
                      </div>
                      <p className="text-gray-700 text-base leading-relaxed mb-4">{cap.description}</p>
                      {cap.features.length > 0 && (
                        <ul className="list-disc list-inside space-y-2 text-sm text-gray-800">
                          {cap.features.map((f, idx) => (
                            <li key={idx}>{f}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Modal Footer */}
              <div className="flex flex-col items-center border-t bg-white px-6 py-4 space-y-3">
                <div className="flex gap-2 justify-center pt-2">
                  {currentCards.map((_, idx) => (
                    <motion.div
                      key={idx}
                      className={`h-2 rounded-full ${
                        activeSlide === idx
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 w-6"
                          : "bg-gray-300 w-2"
                      }`}
                      layout
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </div>
                <div className="flex justify-between w-full">
                  <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    disabled={activeSlide === 0}
                    className="px-5 py-2 text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-30"
                  >
                    ← Back
                  </button>
                  <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full shadow-sm">
                    Capability {activeSlide + 1} of {currentCards.length}
                  </span>
                  <button
                    onClick={() => swiperRef.current?.slideNext()}
                    disabled={activeSlide === currentCards.length - 1}
                    className="px-5 py-2 text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-30"
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

export default PlatformCapabilities;
