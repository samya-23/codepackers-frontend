
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Cpu, Database, Shield, Zap, Globe, BarChart3, Settings } from 'lucide-react';

const TechnologyExpertise = () => {
  const expertiseAreas = [
    {
      icon: Brain,
      title: "AI & Machine Learning",
      technologies: [
        "Language Models", "Speech Recognition", "Speech Synthesis", 
        "Computer Vision", "Retrieval Augmented Generation"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Cpu,
      title: "Enterprise Systems",
      technologies: [
        "ERP Systems", "CRM", "HRMS", "RDMS Integration", 
        "IoT & Embedded Systems"
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: BarChart3,
      title: "Data & Analytics",
      technologies: [
        "Data Analytics", "Business Intelligence", "Real-time Processing", 
        "Performance Monitoring"
      ],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Globe,
      title: "Communication Systems",
      technologies: [
        "Voice & Video Communication", "Telecom RAN Stacks", 
        "Real-time Messaging", "Multi-platform Integration"
      ],
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Shield,
      title: "Specialized Domains",
      technologies: [
        "Homeland Security", "Radar Systems", "Healthcare Solutions", 
        "E-governance Platforms"
      ],
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Settings,
      title: "Industry Solutions",
      technologies: [
        "Education Platforms", "E-commerce Systems", "Manufacturing", 
        "Telecom Solutions"
      ],
      color: "from-teal-500 to-blue-500"
    }
  ];

  const frameworks = [
    "Human Resources Management",
    "Attendance Tracking",
    "Visitor Management", 
    "Inventory Control",
    "Appointment Scheduling",
    "Resource Management",
    "Task Management",
    // "AI Conversational Agents"
  ];

  return (
    <section id="expertise" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Technology <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Expertise</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our team brings deep expertise across multiple domains and cutting-edge technologies, 
            enabling us to deliver comprehensive enterprise solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {expertiseAreas.map((area, index) => (
            <Card key={index} className="bg-white/70 backdrop-blur-lg border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className={`w-12 h-12 bg-gradient-to-r ${area.color} rounded-lg flex items-center justify-center mb-4`}>
                  <area.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">{area.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {area.technologies.map((tech, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                      <span className="text-gray-700 text-sm">{tech}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Ready-to-Deploy <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Frameworks</span>
          </h3>
          <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
            Our proprietary software frameworks enable rapid deployment of customized enterprise solutions, 
            significantly reducing development time and cost.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {frameworks.map((framework, index) => (
              <Badge key={index} className="bg-white/70 text-gray-700 hover:bg-white/90 p-3 text-center justify-center border border-white/40">
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
