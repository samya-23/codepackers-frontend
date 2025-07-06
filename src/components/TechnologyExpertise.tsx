import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Stethoscope,
  Radiation,
  Settings,
  Brain,
  Cpu,
  Mic,
  MessageCircleCode,
  Video,
  BarChart3,
  MapPin,
} from "lucide-react";

const BackgroundBlob = () => (
  <>
    <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-purple-400 opacity-20 rounded-full blur-3xl animate-pulse" />
    <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-blue-400 opacity-20 rounded-full blur-3xl animate-pulse" />
  </>
);

const PatternOverlay = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
    <defs>
      <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="1" fill="#e2e8f0" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dots)" />
  </svg>
);

const bsisprSolutions = [
  { icon: Stethoscope, label: "Telemedicine Systems" },
  { icon: Radiation, label: "Disaster Management Solutions" },
  { icon: Settings, label: "Customized Workflow Management" },
  { icon: Brain, label: "ML/AI Prediction & Analysis" },
  { icon: Cpu, label: "IoT & Embedded Systems" },
  { icon: Mic, label: "Voice-Based User Interfaces" },
  { icon: MessageCircleCode, label: "Chat & Voice Messaging with Translation" },
  { icon: Video, label: "Video Communications" },
  { icon: BarChart3, label: "Data Analytics & Visualization" },
  { icon: MapPin, label: "Google Maps Integrations" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const TechnologyExpertise = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="relative py-24 px-6 lg:px-24 bg-gradient-to-br from-white via-slate-50 to-slate-100 overflow-hidden"
    >
      <BackgroundBlob />
      <PatternOverlay />

      <div className="relative z-10 max-w-7xl mx-auto space-y-16">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-5xl font-extrabold text-gray-900 text-center">
            Specialized{' '}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Digital Solutions
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto text-center">
            We have also designed and developed intelligent systems for healthcare, disaster management, education, automation, and communication—leveraging AI, IoT, and modern web technologies.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {bsisprSolutions.map(({ icon: Icon, label }, i) => (
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
              whileHover={{ scale: 1.05, rotate: 0.5 }}
              className="flex flex-col items-center gap-4 p-6 rounded-xl bg-white/40 border border-white/30 shadow-md backdrop-blur-xl hover:shadow-2xl transition-all duration-300 hover:bg-white/60"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-xl flex items-center justify-center shadow-md">
                <Icon className="w-6 h-6" />
              </div>
              <h4 className="text-sm md:text-base font-medium text-gray-800 text-center leading-snug">
                {label}
              </h4>
            </motion.div>
          ))}
        </motion.div>

        {/* Technical Skills Section */}
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={fadeUp}
  className="mt-16 bg-white/40 backdrop-blur-xl rounded-3xl p-10 border border-white/20 shadow-2xl overflow-hidden"
>
  <h3 className="text-3xl font-bold text-center mb-8 text-gray-900">
    Our <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Technical Skills</span>
  </h3>

  <div className="relative w-full overflow-hidden">
    <div className="flex w-max animate-slide space-x-10">
      {[
        { name: "MySQL", iconSrc: "/icons/mysql.svg" },
        { name: "PostgreSQL", iconSrc: "/icons/postgresql.svg" },
        { name: "MongoDB", iconSrc: "/icons/mongodb.svg" },
        { name: "Node.js", iconSrc: "/icons/nodejs.svg" },
        { name: "Express", iconSrc: "/icons/express.svg" },
        { name: "Django", iconSrc: "/icons/django.svg" },
        { name: "Flask", iconSrc: "/icons/flask.svg" },
        { name: "Laravel", iconSrc: "/icons/laravel.svg" },
        { name: "React", iconSrc: "/icons/react.svg" },
        { name: "Vue.js", iconSrc: "/icons/vue.svg" },
        { name: "Flutter", iconSrc: "/icons/flutter.svg" },
        { name: "HTML5", iconSrc: "/icons/html5.svg" },
        { name: "CSS3", iconSrc: "/icons/css3.svg" },
        { name: "React Native", iconSrc: "/icons/react-native.svg" },
        { name: "Swift", iconSrc: "/icons/swift.svg" },
        { name: "Kotlin", iconSrc: "/icons/kotlin.svg" },
      ]
        // Duplicate icons for infinite effect
        .concat([
          { name: "MySQL", iconSrc: "/icons/mysql.svg" },
          { name: "PostgreSQL", iconSrc: "/icons/postgresql.svg" },
          { name: "MongoDB", iconSrc: "/icons/mongodb.svg" },
        ])
        .map(({ name, iconSrc }, idx) => (
          <motion.div
            key={idx}
            className="flex flex-col items-center gap-2 w-24 p-4 bg-white/70 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: idx * 0.1,
            }}
          >
            <img src={iconSrc} alt={name} className="w-12 h-12 object-contain" />
            <span className="text-xs font-medium text-gray-800 text-center">{name}</span>
          </motion.div>
        ))}
    </div>
  </div>
</motion.div>

      </div>
    </section>
  );
};

export default TechnologyExpertise;