"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

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

// Background blobs
const BackgroundBlob = () => (
  <>
    <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-purple-400 opacity-20 rounded-full blur-3xl animate-pulse" />
    <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-blue-400 opacity-20 rounded-full blur-3xl animate-pulse" />
  </>
);

const TechnicalSkills = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 lg:px-24 bg-gradient-to-br from-white via-slate-50 to-slate-100 overflow-hidden"
    >
      <BackgroundBlob />

      <div className="max-w-7xl mx-auto">
        {/* Heading Animation Match */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-5xl font-extrabold text-gray-900 text-center">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Technical Skills
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto text-center">
            We build secure, scalable, and modern solutions using cutting-edge tools and frameworks.
          </p>
        </motion.div>

        {/* Tech strip */}
        <div className="overflow-x-auto scrollbar-none mt-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="relative w-full overflow-hidden"
          >
            <div className="flex w-max animate-slide space-x-10 min-w-full px-4 sm:px-0">
              {techStack.concat(techStack.slice(0, 5)).map(({ name, iconSrc }, idx) => (
                <motion.div
                  key={idx}
                  className="flex flex-col items-center gap-2 w-24 p-3 bg-white rounded-xl shadow hover:shadow-xl hover:scale-105 transition duration-300 border border-gray-100 backdrop-blur-sm"
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.1,
                  }}
                >
                  <img src={iconSrc} alt={name} className="w-12 h-12 object-contain" />
                  <span className="text-xs font-medium text-gray-700 text-center">{name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkills;
