import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Briefcase,
  Cpu,
  Code,
  Palette,
  ShieldCheck,
  BarChart,
  Mic,
  UserCheck,
  Headphones,
  FlaskConical,
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

const TeamComposition = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const teamRoles = [
    { label: t('teamComposition.roles.0'), icon: Briefcase },
    { label: t('teamComposition.roles.1'), icon: Cpu },
    { label: t('teamComposition.roles.2'), icon: Code },
    { label: t('teamComposition.roles.3'), icon: Palette },
    { label: t('teamComposition.roles.4'), icon: ShieldCheck },
    { label: t('teamComposition.roles.5'), icon: BarChart },
    { label: t('teamComposition.roles.6'), icon: Mic },
    { label: t('teamComposition.roles.7'), icon: UserCheck },
    { label: t('teamComposition.roles.8'), icon: Headphones },
    { label: t('teamComposition.roles.9'), icon: FlaskConical },
  ];

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-24 bg-gradient-to-br from-white via-slate-50 to-slate-100 overflow-hidden"
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
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900">
            {t('teamComposition.title')}{' '}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent animate-text-glow">
              {t('teamComposition.subtitle')}
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-2 sm:px-0">
            {t('teamComposition.description')}
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 px-2 sm:px-0"
        >
          {teamRoles.map(({ icon: Icon, label }, i) => (
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
              whileHover={{
                scale: 1.05,
                rotate: 0.5,
                transition: { duration: 0.3 },
              }}
              className="group flex flex-col items-center gap-4 p-5 rounded-2xl bg-white/40 border border-transparent hover:border-blue-400/60 shadow-[0_15px_50px_rgba(109,40,217,0.1)] hover:shadow-[0_20px_70px_rgba(59,130,246,0.2)] backdrop-blur-xl hover:scale-[1.025] transition-all duration-500 ease-in-out"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-xl flex items-center justify-center shadow-md group-hover:shadow-xl transition-all duration-300">
                <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h4 className="text-sm sm:text-base font-medium text-gray-800 text-center leading-snug">
                {label}
              </h4>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamComposition;
