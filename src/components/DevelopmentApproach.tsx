import React from "react";
import { motion } from "framer-motion";
import {
  Lightbulb,
  Layout,
  ServerCog,
  Rocket
} from "lucide-react";

const phases = [
  {
    title: "Planning & Discovery",
    icon: Lightbulb,
    color: "from-yellow-500 to-orange-500",
    points: [
      "Understand how the client business works and what users need",
      "Design the system's database: users, orders, payments, etc.",
      "Build core logic and define rules",
      "Plan timelines, assign tasks, ensure quality"
    ]
  },
  {
    title: "Design & Prototyping",
    icon: Layout,
    color: "from-purple-500 to-pink-500",
    points: [
      "Create user interface for web and mobile",
      "Ensure ease-of-use and accessibility",
      "Implement system-to-system integrations",
      "Prepare for real-time comms: chat, voice, video"
    ]
  },
  {
    title: "Development & Deployment",
    icon: ServerCog,
    color: "from-blue-500 to-indigo-500",
    points: [
      "Secure login/signup, track user actions",
      "Test the system thoroughly",
      "Deploy on fast, secure servers",
      "Ensure system runs well with heavy load"
    ]
  },
  {
    title: "Growth & Optimization",
    icon: Rocket,
    color: "from-green-500 to-teal-500",
    points: [
      "Extract insights from stored data",
      "Follow Agile + CI/CD methodologies",
      "Use modern dev tools and AI advancements",
      "Build customizable in-house frameworks"
    ]
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

const DevelopmentApproach = () => {
  return (
    <section
      id="approach"
      className="relative py-24 px-4 sm:px-8 lg:px-20 bg-gradient-to-br from-white via-slate-50 to-slate-100 overflow-hidden"
    >
      {/* Gradient Blobs */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-purple-300 opacity-20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-blue-300 opacity-20 rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-extrabold text-gray-900">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Development Approach
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            We’ve worked with clients across E-commerce, Telecommunication, Disaster
            Management, Education, Healthcare, Real Estate, and Government — ensuring
            quality and innovation throughout the journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {phases.map(({ title, icon: Icon, points, color }, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="p-6 bg-white/50 border border-white/30 backdrop-blur-xl shadow-xl rounded-3xl hover:shadow-2xl transition-all"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-md`}>
                <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
              <ul className="space-y-3">
                {points.map((point, idx) => (
                  <li
                    key={idx}
                    className="text-gray-700 text-sm md:text-base leading-relaxed flex items-start gap-2"
                  >
                    <span className="mt-1 text-blue-500">▸</span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Optional CTA */}
        <div className="mt-16 text-center">
          <a
            href="https://codepackers.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Visit Our Website
          </a>
        </div>
      </div>
    </section>
  );
};

export default DevelopmentApproach;
