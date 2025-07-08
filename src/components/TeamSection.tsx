import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Mail,
  Phone,
  Briefcase,
  Code,
  Palette,
  ShieldCheck,
  BarChart,
  Cpu,
  UserCheck,
  Headphones,
  FlaskConical,
  Mic,
} from "lucide-react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { Variants } from 'framer-motion';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
};

const TeamSection = () => {
  const { t } = useTranslation();

  const leadership = [
    {
      name: "Vikas Tyagi",
      role: t('team.leadership.0.role'),
      description: t('team.leadership.0.description'),
      email: "vikas.tyagi@codepackers.com",
      phone: "9873919260",
      link: "https://www.linkedin.com/in/vikastyagi1974/",
      image: "vikas",
    },
    {
      name: "Sujagya Das Sharma",
      role: t('team.leadership.1.role'),
      description: t('team.leadership.1.description'),
      email: "suja.sharma@codepackers.com",
      phone: "9873573707",
      link: "https://www.linkedin.com/in/sujagya/",
      image: "sujagya",
    },
  ];

  return (
    <section
      id="team"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-slate-50 to-slate-100 overflow-hidden"
    >
      {/* Floating Blobs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-purple-400 opacity-20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-blue-400 opacity-20 rounded-full blur-3xl animate-pulse" />

      {/* Dotted Grid Pattern */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#e2e8f0" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900">
            {t('team.title')}{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent animate-text-glow">
              {t('team.subtitle')}
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-2 sm:px-0">
            {t('team.description')}
          </p>
        </motion.div>

        {/* Leadership Section */}
        <div className="mb-10 sm:mb-20 px-2 sm:px-0">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10 text-gray-900">
            {t('team.leadershipTitle')}
          </h3>
          <div className="flex flex-col sm:flex-row sm:justify-center sm:gap-12 gap-6">
            {leadership.map((leader, index) => (
              <Tilt
                key={index}
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                glareEnable={true}
                glareMaxOpacity={0.2}
                className="w-full sm:w-1/2 transition-transform duration-500 hover:-translate-y-1"
              >
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Card className="relative bg-white/40 backdrop-blur-xl border border-transparent hover:border-blue-400/60 shadow-[0_15px_50px_rgba(109,40,217,0.2)] hover:shadow-[0_20px_70px_rgba(59,130,246,0.25)] hover:scale-[1.025] transition-all duration-500 ease-in-out group overflow-hidden">
                    <CardHeader className="text-center relative px-4 pt-6">
                      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-2xl transition-all duration-500 group-hover:shadow-[0_0_0_6px_rgba(99,102,241,0.3)]">
                        <img
                          src={`/assets/${leader.image}.png`}
                          alt={`${leader.name}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <a
                        href={leader.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-4 right-4 p-1.5 rounded-full bg-white/80 backdrop-blur hover:bg-blue-100 shadow-lg transition-all hover:scale-110"
                      >
                        <img
                          src="/linkedin-icon.svg"
                          alt="LinkedIn"
                          className="w-5 h-5"
                        />
                      </a>
                      <CardTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                        {leader.name}
                      </CardTitle>
                      <p className="text-sm text-gray-700 font-medium mb-2 italic">
                        {leader.role}
                      </p>
                    </CardHeader>
                    <CardContent className="text-center px-4 sm:px-6 pb-6">
                      <p className="text-gray-700 mb-4 text-sm italic">
                        {leader.description}
                      </p>
                      <div className="text-sm text-gray-600 space-y-2">
                        <div className="flex items-center justify-center gap-2 break-words">
                          <Mail className="w-4 h-4" /> {leader.email}
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <Phone className="w-4 h-4" /> {leader.phone}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
