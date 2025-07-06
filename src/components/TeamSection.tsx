import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, Briefcase, Code, Palette, ShieldCheck, BarChart, Cpu, UserCheck, Headphones, FlaskConical, Mic } from "lucide-react";
import Tilt from "react-parallax-tilt";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { motion } from "framer-motion";

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

const TeamSection = () => {
  const leadership = [
    {
      name: "Vikas Tyagi",
      role: "Chief Business Officer",
      description: "Customer Relations, Business Development, Commercials",
      email: "vikas.tyagi@codepackers.com",
      phone: "9873919260",
      link: "https://www.linkedin.com/in/vikastyagi1974/",
      image: "vikas",
    },
    {
      name: "Sujagya Das Sharma",
      role: "Chief Innovation Officer",
      description: "Overall technology vision, driving innovation in AI and enterprise solutions",
      email: "suja.sharma@codepackers.com",
      phone: "9873573707",
      link: "https://www.linkedin.com/in/sujagya/",
      image: "sujagya",
    },
  ];

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

  return (
    <section id="team" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-slate-50 to-slate-100 overflow-hidden">
      {/* Floating Blobs */}
      <div className="absolute -top-10 -left-10 w-96 h-96 bg-purple-300 opacity-30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-300 opacity-30 rounded-full blur-2xl animate-pulse" />

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
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-5xl font-extrabold text-gray-900">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent animate-text-glow">
              Team
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            The team is led by experienced professionals and powered by a diverse team of specialists. We deliver excellence across all aspects of software development and operations.
          </p>
        </motion.div>

        {/* Leadership Section */}
        <motion.div
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h3 className="text-3xl font-bold text-center mb-10 text-gray-900">Leadership Team</h3>
          <div className="flex flex-col md:flex-row md:justify-center md:gap-12 gap-8">
            {leadership.map((leader, index) => (
              <Tilt
                key={index}
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                glareEnable={true}
                glareMaxOpacity={0.2}
                className="w-full md:w-1/2 transition-transform duration-500 hover:-translate-y-1"
              >
                <motion.div
                  variants={fadeUp}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Card className="relative bg-white/40 backdrop-blur-xl border border-transparent hover:border-blue-400/60 shadow-[0_15px_50px_rgba(109,40,217,0.2)] hover:shadow-[0_20px_70px_rgba(59,130,246,0.25)] hover:scale-[1.025] transition-all duration-500 ease-in-out group overflow-hidden">
                    <CardHeader className="text-center relative">
                      <div className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-2xl transition-all duration-500 group-hover:shadow-[0_0_0_6px_rgba(99,102,241,0.3)]">
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
                        <img src="/linkedin-icon.svg" alt="LinkedIn" className="w-5 h-5" />
                      </a>
                      <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                        {leader.name}
                      </CardTitle>
                      <p className="text-sm text-gray-700 font-medium mb-2 italic">{leader.role}</p>
                    </CardHeader>
                    <CardContent className="text-center px-6 pb-6">
                      <p className="text-gray-700 mb-4 text-sm italic">{leader.description}</p>
                      <div className="text-sm text-gray-600 space-y-2">
                        <div className="flex items-center justify-center gap-2"><Mail className="w-4 h-4" /> {leader.email}</div>
                        <div className="flex items-center justify-center gap-2"><Phone className="w-4 h-4" /> {leader.phone}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </motion.div>

        {/* Team Composition */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="bg-white/40 backdrop-blur-xl rounded-3xl p-10 border border-white/20 shadow-2xl"
        >
          <h3 className="text-3xl font-bold text-center mb-10 text-gray-900">
            Expert{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Team Composition
            </span>
          </h3>

          <div className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
                className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/40 border border-white/30 shadow-md backdrop-blur-xl hover:shadow-2xl transition-all duration-300 hover:bg-white/60"
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

          {/* Swiper for mobile view */}
          <div className="md:hidden mt-6">
            <Swiper
              spaceBetween={16}
              slidesPerView={1.2}
              pagination={{ clickable: true }}
              modules={[Pagination]}
            >
              {teamRoles.map(({ label, icon: Icon }, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    variants={fadeUp}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="bg-white/80 rounded-xl p-6 text-center border border-white/40 hover:bg-white shadow-md transition-all"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{label}</span>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
