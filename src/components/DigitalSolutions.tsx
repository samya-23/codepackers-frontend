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
import { useTranslation } from 'react-i18next';

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
  { icon: Stethoscope, label: "solutions.items.0" },
  { icon: Radiation, label: "solutions.items.1" },
  { icon: Settings, label: "solutions.items.2" },
  { icon: Brain, label: "solutions.items.3" },
  { icon: Cpu, label: "solutions.items.4" },
  { icon: Mic, label: "solutions.items.5" },
  { icon: MessageCircleCode, label: "solutions.items.6" },
  { icon: Video, label: "solutions.items.7" },
  { icon: BarChart3, label: "solutions.items.8" },
  { icon: MapPin, label: "solutions.items.9" },
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

const DigitalSolutions = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-24 bg-gradient-to-br from-white via-slate-50 to-slate-100 overflow-hidden"
    >
      <BackgroundBlob />
      <PatternOverlay />

      <div className="relative z-10 max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center px-2"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 text-center">
            {t('solutions.title')}{' '}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              {t('solutions.subtitle')}
            </span>
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-gray-600 max-w-3xl mx-auto text-center">
            {t('solutions.description')}
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
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 px-2 sm:px-0"
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
              className="flex flex-col items-center gap-2 sm:gap-4 p-3 sm:p-4 md:p-6 rounded-lg md:rounded-xl bg-white/40 border border-white/30 shadow-sm sm:shadow-md backdrop-blur-xl hover:shadow-lg sm:hover:shadow-2xl transition-all duration-300 hover:bg-white/60"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm sm:shadow-md">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </div>
              <h4 className="text-xs sm:text-sm md:text-base font-medium text-gray-800 text-center leading-tight sm:leading-snug">
                {t(label)}
              </h4>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DigitalSolutions;