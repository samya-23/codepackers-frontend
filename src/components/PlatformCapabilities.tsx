
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Mic, Phone, Globe, Shield, Users, BarChart3, Search, FileText, Zap } from 'lucide-react';

const PlatformCapabilities = () => {
  const capabilities = [
    {
      icon: MessageCircle,
      title: "Multi-Channel Communication",
      description: "Chat, voice messages, internet calls, and telephone integration",
      features: ["WhatsApp Integration", "Voice Calls", "Web Chat", "Mobile Apps"]
    },
    {
      icon: Mic,
      title: "Voice Intelligence",
      description: "Real-time speech recognition and synthesis with customizable voices",
      features: ["Male/Female Voices", "Accent Control", "Live Transcription", "Voice Commands"]
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Private knowledge repositories with enterprise-grade security",
      features: ["Data Privacy", "User Authentication", "Secure APIs", "Compliance Ready"]
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "Break language barriers with intelligent translation and localization",
      features: ["50+ Languages", "Real-time Translation", "Cultural Context", "Voice Synthesis"]
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Deep insights into conversations, sentiment, and user behavior",
      features: ["Sentiment Analysis", "Intent Recognition", "Usage Analytics", "Performance Metrics"]
    },
    {
      icon: Users,
      title: "User Management",
      description: "Comprehensive user and group management with role-based access",
      features: ["Role Management", "Group Controls", "Guest Access", "Admin Dashboard"]
    }
  ];

  const integrations = [
    { name: "Websites", icon: Globe },
    { name: "Mobile Apps", icon: Phone },
    { name: "WhatsApp", icon: MessageCircle },
    { name: "Alexa", icon: Mic },
    { name: "Google Home", icon: Search },
    { name: "Call Centers", icon: Phone }
  ];

  return (
    <section id="platform" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Platform <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Capabilities</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI conversational agent platform delivers enterprise-grade features 
            that transform how organizations interact with their users and data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {capabilities.map((capability, index) => (
            <Card key={index} className="bg-white/60 backdrop-blur-lg border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <capability.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">{capability.title}</CardTitle>
                <CardDescription className="text-gray-600">{capability.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {capability.features.map((feature, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white/40 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Seamless <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Integration</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {integrations.map((integration, index) => (
              <div key={index} className="flex flex-col items-center space-y-3 p-4 rounded-xl bg-white/50 hover:bg-white/70 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <integration.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">{integration.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformCapabilities;
