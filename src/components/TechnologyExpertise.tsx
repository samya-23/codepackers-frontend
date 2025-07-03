import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain, Cpu, Database, Shield, Zap, Globe, BarChart3, Settings,
} from "lucide-react";

const TechnologyExpertise = () => {
  const expertiseAreas = [
    {
      icon: Brain,
      title: "AI & Machine Learning",
      technologies: [
        "Language Models", "Speech Recognition", "Speech Synthesis",
        "Computer Vision", "Retrieval Augmented Generation",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Cpu,
      title: "Enterprise Systems",
      technologies: [
        "ERP Systems", "CRM", "HRMS", "RDMS Integration",
        "IoT & Embedded Systems",
      ],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: BarChart3,
      title: "Data & Analytics",
      technologies: [
        "Data Analytics", "Business Intelligence", "Real-time Processing",
        "Performance Monitoring",
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Globe,
      title: "Communication Systems",
      technologies: [
        "Voice & Video Communication", "Telecom RAN Stacks",
        "Real-time Messaging", "Multi-platform Integration",
      ],
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Shield,
      title: "Specialized Domains",
      technologies: [
        "Homeland Security", "Radar Systems", "Healthcare Solutions",
        "E-governance Platforms",
      ],
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: Settings,
      title: "Industry Solutions",
      technologies: [
        "Education Platforms", "E-commerce Systems", "Manufacturing",
        "Telecom Solutions",
      ],
      color: "from-teal-500 to-blue-500",
    },
  ];

  const frameworks = [
    "Human Resources Management",
    "Attendance Tracking",
    "Visitor Management",
    "Inventory Control",
    "Appointment Scheduling",
    "Resource Management",
    "Task Management",
  ];

  return (
    <section
      id="expertise"
      className="py-28 px-4 sm:px-6 lg:px-20 bg-gradient-to-b from-white via-slate-50 to-slate-100"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold tracking-tight text-gray-900">
            Technology{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-text-glow">
              Expertise
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Our team brings deep expertise across multiple domains and
            cutting-edge technologies, enabling us to deliver comprehensive
            enterprise solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {expertiseAreas.map((area, index) => (
            <Card
              key={index}
              className="bg-white/80 border border-white/20 backdrop-blur-md shadow-xl rounded-3xl transition-transform duration-300 hover:shadow-[0_10px_40px_rgba(99,102,241,0.2)] hover:-translate-y-2"
            >
              <CardHeader>
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${area.color} rounded-xl flex items-center justify-center shadow-md mb-4`}
                >
                  <area.icon className="text-white w-6 h-6" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {area.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mt-2">
                  {area.technologies.map((tech, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2 text-gray-700"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                      <span className="text-sm">{tech}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-md">
          <h3 className="text-3xl font-bold text-center mb-6 text-gray-900">
            Ready-to-Deploy{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Frameworks
            </span>
          </h3>
          <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto text-base">
            Our proprietary software frameworks enable rapid deployment of
            customized enterprise solutions, significantly reducing development
            time and cost.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {frameworks.map((framework, index) => (
              <Badge
                key={index}
                className="bg-white text-gray-700 border border-white/40 px-4 py-2 rounded-full shadow-sm hover:shadow-md hover:bg-white/90 transition-all duration-200 text-sm"
              >
                {framework}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyExpertise;
