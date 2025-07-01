import React from 'react';
import Navbar from '@/components/ui/navbar'; // ✅ New styled navbar
import HeroCarousel from '@/components/HeroCarousel'; // ✅ New hero media carousel
import PlatformCapabilities from '@/components/PlatformCapabilities';
import TechnologyExpertise from '@/components/TechnologyExpertise';
import TeamSection from '@/components/TeamSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* ✅ Navigation Bar */}
      <Navbar />

      {/* ✅ Hero Carousel with 3 slides */}
      <HeroCarousel />

      {/* ✅ Main Sections */}
      <PlatformCapabilities />
      <TechnologyExpertise />
      <TeamSection />
      <ContactSection />

      {/* ✅ Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img src="/logo.png" alt="Codepackers Software Solutions" className="h-8 w-auto" />
              </div>
              <p className="text-gray-400">
                Leading AI conversational agent platform for enterprises in India.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>AI Agents</li>
                <li>Voice Interface</li>
                <li>Multi-language Support</li>
                <li>Enterprise Integration</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Custom Development</li>
                <li>AI Solutions</li>
                <li>ERP Systems</li>
                <li>Data Analytics</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>India</li>
                <li>suja.sharma@codepackers.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Codepackers Software Solutions Pvt Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
