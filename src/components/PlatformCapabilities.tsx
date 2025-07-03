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
  const [selectedFramework, setSelectedFramework] = useState("ALAAP");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef(null);
  const currentCards = frameworks[selectedFramework];

  return (
    <section id="capabilities" className="relative overflow-hidden py-24 px-6 lg:px-20 bg-gradient-to-br from-white via-slate-50 to-slate-100">
      {/* Background Glow Blobs */}
      <div className="absolute -top-20 -left-32 w-[450px] h-[450px] bg-pink-400 opacity-20 blur-3xl rounded-full z-0" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 opacity-20 blur-2xl rounded-full z-0" />
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true">
        <defs>
          <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#e2e8f0" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto text-center space-y-10">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-gray-900"
        >
          Platform <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Capabilities</span>
        </motion.h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Purpose-built features for conversational AI and enterprise systems
        </p>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mt-8">
          {["ALAAP", "PUSTAK"].map((fw) => (
            <button
              key={fw}
              onClick={() => setSelectedFramework(fw)}
              className={`px-5 py-2 text-sm font-semibold rounded-full border shadow-sm transition ${
                selectedFramework === fw
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {fw}
            </button>
          ))}
        </div>

        {/* Capability Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentCards.map((cap, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                setModalIndex(i);
                setActiveSlide(i);
                setModalOpen(true);
              }}
              className="cursor-pointer bg-white/30 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 shadow-xl hover:shadow-2xl"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-4">
                <cap.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{cap.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{cap.short}</p>
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
              className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
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
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white">
                          <cap.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{cap.title}</h3>
                      </div>
                      <p className="text-gray-700 mb-4">{cap.description}</p>
                      {cap.features.length > 0 && (
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          {cap.features.map((f, idx) => (
                            <li key={idx}>{f}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={() => swiperRef.current?.slidePrev()}
                  disabled={activeSlide === 0}
                  className="text-sm px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow disabled:opacity-40"
                >
                  ← Back
                </button>
                <span className="text-xs text-gray-500">
                  Capability {activeSlide + 1} of {currentCards.length}
                </span>
                <button
                  onClick={() => swiperRef.current?.slideNext()}
                  disabled={activeSlide === currentCards.length - 1}
                  className="text-sm px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow disabled:opacity-40"
                >
                  Next →
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
