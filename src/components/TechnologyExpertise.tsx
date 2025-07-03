import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import {
  BrainCircuit,
  Building2,
  BarChart3,
  Globe,
  Shield,
  Settings,
} from "lucide-react";

const expertiseAreas = [
  {
    icon: BrainCircuit,
    title: "AI & Machine Learning",
    technologies: [
      "Language Models", "Speech Recognition", "Speech Synthesis",
      "Computer Vision", "Retrieval Augmented Generation",
    ],
  },
  {
    icon: Building2,
    title: "Enterprise Systems",
    technologies: [
      "ERP Systems", "CRM", "HRMS", "RDMS Integration",
      "IoT & Embedded Systems",
    ],
  },
  {
    icon: BarChart3,
    title: "Data & Analytics",
    technologies: [
      "Data Analytics", "Business Intelligence", "Real-time Processing",
      "Performance Monitoring",
    ],
  },
  {
    icon: Globe,
    title: "Communication Systems",
    technologies: [
      "Voice & Video Communication", "Telecom RAN Stacks",
      "Real-time Messaging", "Multi-platform Integration",
    ],
  },
  {
    icon: Shield,
    title: "Specialized Domains",
    technologies: [
      "Homeland Security", "Radar Systems", "Healthcare Solutions",
      "E-governance Platforms",
    ],
  },
  {
    icon: Settings,
    title: "Industry Solutions",
    technologies: [
      "Education Platforms", "E-commerce Systems", "Manufacturing",
      "Telecom Solutions",
    ],
  },
];

const frameworks = {
  Alaap: {
    title: "Alaap – Conversational AI Framework",
    description: "The Alaap platform can create AI agents for:",
    badges: [
      "Website chatbots and voicebots", "Customer Helpdesks", "Virtual Sales agents",
      "Call centers", "Online Bookings", "Educational purposes",
      "Infotainment", "Capacity building and Trainings", "Online tests and evaluations",
      "Enterprise communications",
    ],
    images: ["/alaap-1.png", "/alaap-2.png"],
  },
  Pustak: {
    title: "Pustak – ERP & Workflow Framework",
    description: "The Pustak platform caters to requirements of data management systems for:",
    badges: [
      "Human Resources", "Inventory", "Supply Chain",
      "Contracts, Deliveries, Payments", "Project and Tasks",
      "Leads and Prospects", "Troubletickets", "Clinic/Hospital",
      "School and College", "Visitor Entry", "Estate and properties",
      "Online learning",
    ],
    images: ["/pustak-1.png", "/pustak-2.png"],
  },
};

const TechnologyExpertise = () => {
  const [activeFramework, setActiveFramework] = useState("Alaap");
  const [zoomedImage, setZoomedImage] = useState(null);

  return (
    <section id="expertise" className="py-28 px-6 lg:px-24 bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-extrabold text-gray-900 tracking-tight">
            Technology <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Expertise</span>
          </h2>
        </div>

        {/* Expertise Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {expertiseAreas.map((area, index) => (
            <Card key={index} className="bg-white/80 border border-white/30 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all">
              <CardHeader className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl flex items-center justify-center">
                  <area.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">{area.title}</CardTitle>
              </CardHeader>
              <CardContent className="mt-2 space-y-2 px-6 pb-6">
                {area.technologies.map((tech, i) => (
                  <div key={i} className="flex items-start text-sm text-gray-800">
                    <span className="h-1.5 w-1.5 mt-2 mr-2 rounded-full bg-blue-500" />
                    <span>{tech}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Framework Header */}
        <div className="text-center mb-10">
          <h3 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            Flagship <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Solution Frameworks</span>
          </h3>
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            {Object.keys(frameworks).map((name) => (
              <button
                key={name}
                onClick={() => setActiveFramework(name)}
                className={`px-6 py-2 rounded-full border font-semibold transition-all duration-200 ${
                  activeFramework === name
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Framework Section */}
        <div className="flex flex-col lg:flex-row gap-12 items-start lg:items-stretch">
          {/* Left Text Block */}
          <div className="lg:w-1/2 flex flex-col justify-center space-y-6">
            <h4 className="text-2xl font-bold text-gray-900">{frameworks[activeFramework].title}</h4>
            <p className="text-gray-700 text-base leading-relaxed">{frameworks[activeFramework].description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {frameworks[activeFramework].badges.map((badge, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/70 border border-white/30 backdrop-blur-md rounded-xl p-3 shadow-sm transition-all hover:shadow-md">
                  <div className="min-w-[32px] min-h-[32px] flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-md">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span className="text-sm text-gray-800 font-medium leading-snug">{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image Block */}
          <div className="lg:w-1/2 flex items-center justify-center">
            <div className="bg-white/80 border border-white/30 backdrop-blur-lg rounded-2xl p-4 shadow-xl w-full max-w-xl">
              <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop
                pagination={{ clickable: true }}
              >
                {frameworks[activeFramework].images.map((src, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className="relative cursor-zoom-in group"
                      onClick={() => setZoomedImage(src)}
                    >
                      <img
                        src={src}
                        alt="Framework"
                        className="rounded-xl w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>

      {/* Zoom View */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={() => setZoomedImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={zoomedImage}
              alt="Zoomed"
              className="max-w-full max-h-screen rounded-xl shadow-2xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TechnologyExpertise;
