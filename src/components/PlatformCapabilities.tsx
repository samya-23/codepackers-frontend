import React from 'react';
import { motion } from 'framer-motion';
import {
  MessageCircle, Mic, Shield, Globe, Users, BarChart3, Phone, Search
} from 'lucide-react';

const capabilities = [
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
];

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" }
  })
};

const PlatformCapabilities: React.FC = () => {
  return (
    <section id="platform" className="relative py-28 bg-gradient-to-b from-white via-slate-50 to-slate-100 px-6 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          custom={0}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-extrabold tracking-tight text-gray-900">
            Platform <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-text-glow">Capabilities</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI conversational agent platform delivers enterprise-grade features that transform how organizations interact with their users and data.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              custom={i + 1}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative group bg-white/10 border border-white/20 backdrop-blur-md shadow-2xl rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_50px_rgba(99,102,241,0.2)]"
            >
              {/* Floating icon */}
              <div className="absolute -top-6 left-6 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <cap.icon className="text-white w-6 h-6" />
              </div>

              {/* Card content */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{cap.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{cap.description}</p>
                <div className="flex flex-wrap gap-2">
                  {cap.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Gradient glow ring */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-br from-purple-400 to-blue-400 opacity-20 rounded-full blur-[150px] z-0" />
    </section>
  );
};

export default PlatformCapabilities;
