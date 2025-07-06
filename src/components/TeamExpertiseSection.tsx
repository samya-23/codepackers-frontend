"use client";
import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Cpu, Code, Palette, ShieldCheck, BarChart, Mic, UserCheck, Headphones, FlaskConical } from "lucide-react";

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

const teamRoles = [
  { label: "Product Specialists", icon: Briefcase },
  { label: "Software Architects", icon: Cpu },
  { label: "Software Developers", icon: Code },
  { label: "UI/UX Designers", icon: Palette },
  { label: "Software Testers", icon: ShieldCheck },
  { label: "Business Analysts", icon: BarChart },
  { label: "DevOps Engineers", icon: Mic },
  { label: "Customer Relationship Team", icon: UserCheck },
  { label: "Support Team", icon: Headphones },
  { label: "Research & Development", icon: FlaskConical },
];

const techStack = [
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
];

const TeamExpertiseSection = () => {
  return (
    <section id="expertise" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        {/* Floating Blobs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-purple-400 opacity-20 rounded-full blur-3xl animate-pulse" />
    <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-blue-400 opacity-20 rounded-full blur-3xl animate-pulse" />
      <div className="max-w-7xl mx-auto">
        {/* Team Composition */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="bg-white/60 backdrop-blur-2xl rounded-3xl p-10 border border-white/30 shadow-2xl"
        >
          <h3 className="text-3xl font-bold text-center mb-10 text-gray-900">
            Expert{" "}
            <span className="bg-gradient-to-br from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Team Composition
            </span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {teamRoles.map(({ label, icon: Icon }, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: "easeOut" },
                  },
                }}
                whileHover={{ scale: 1.05, rotate: 0.5 }}
                className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/50 border border-white/30 shadow-md backdrop-blur-xl hover:shadow-2xl transition-all duration-300 hover:bg-white/70"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-xl flex items-center justify-center shadow-md">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm md:text-base font-medium text-gray-800 text-center leading-snug">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Expertise */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-20 bg-white/60 backdrop-blur-2xl rounded-3xl p-10 border border-white/30 shadow-2xl"
        >
          <h3 className="text-3xl font-bold text-center mb-10 text-gray-900">
            Our{" "}
            <span className="bg-gradient-to-br from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Technical Skills
            </span>
          </h3>

          <div className="relative w-full overflow-hidden">
            <div className="flex w-max animate-slide space-x-10">
              {techStack.concat(techStack.slice(0, 5)).map(({ name, iconSrc }, idx) => (
                <motion.div
                  key={idx}
                  className="flex flex-col items-center gap-2 w-24 p-4 bg-white/70 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                  animate={{ y: [0, -5, 0] }}
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

export default TeamExpertiseSection;
