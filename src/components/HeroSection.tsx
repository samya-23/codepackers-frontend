
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Mic, Globe } from 'lucide-react';

const HeroSection = () => {

  const handleTryAgentClick = () => {
    window.open('https://www.aptilab.in/signin', '_blank');
  };


  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI Conversational
                </span>
                <br />
                <span className="text-gray-900">Agents for</span>
                <br />
                <span className="text-gray-900">Enterprise</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Empower your organization with personified AI agents that understand your business, 
                speak your language, and protect your data. From chat to voice, we make AI accessible to everyone.
              </p>
            </div>
            

            <div className="flex items-center space-x-8 pt-4">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">Chat with your private data</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mic className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-gray-600">Voice Enabled</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">Multi-language</span>
              </div>
            </div>

            <div>
            <Button 
                className="mt-6 px-8 py-3 text-lg font-semibold rounded-full shadow-lg 
                           bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                           hover:from-blue-700 hover:to-purple-700 transition-all duration-300
                           flex items-center space-x-2"
                onClick={handleTryAgentClick}                
              >
                <span>Try Our Agent</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Paul - My Enterprise AI Agent</p>
                    <p className="text-sm text-gray-600">Multilingual</p>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-4">
                  <div className="bg-blue-50 rounded-xl p-4 ml-auto max-w-[80%]">
                    <p className="text-gray-800">"Show me the Q3 sales report for the Delhi region"</p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 mr-auto max-w-[80%]">
                    <p className="text-gray-800">I've found the Q3 sales report for Delhi. The region showed 23% growth with ₹2.4 crores in revenue. Would you like me to break this down by product categories?</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 ml-auto max-w-[80%]">
                    <p className="text-gray-800">"Please, provide me breakdown of top three product categories"</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-200"></div>
                  </div>
                  <span className="text-xs text-gray-500">Powered by Alaap platform</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
