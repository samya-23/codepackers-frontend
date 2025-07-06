import React from "react";
import Navbar from "@/components/ui/navbar";
import HeroCarousel from "@/components/HeroCarousel";
import PlatformCapabilities from "@/components/PlatformCapabilities";
import TechnologyExpertise from "@/components/TechnologyExpertise";
import TeamSection from "@/components/TeamSection";
import TeamExpertiseSection from "@/components/TeamExpertiseSection"; // NEW
import DevelopmentApproach from "@/components/DevelopmentApproach"; // 🆕 Newly added section
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* ✅ Navigation Bar */}
      <Navbar />

      {/* ✅ Hero Carousel */}
      <HeroCarousel />

      {/* ✅ Main Sections */}
      <PlatformCapabilities />
      <TechnologyExpertise />
      <TeamSection />
      <TeamExpertiseSection /> {/* Now shows right after Our Team */}
      <DevelopmentApproach /> {/* 🆕 Our Development Approach section */}
      <ContactSection />

      {/* ✅ Footer */}
      <footer className="bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 text-white pt-16 pb-10 mt-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo + About */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/logo.png"
                alt="Codepackers Logo"
                className="h-8 w-8 object-contain"
              />
              <span className="text-xl font-bold">Codepackers</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Leading AI conversational agent platform for enterprises in India.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-white">Platform</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>AI Agents</li>
              <li>Voice Interface</li>
              <li>Multi-language Support</li>
              <li>Enterprise Integration</li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-white">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Custom Development</li>
              <li>AI Solutions</li>
              <li>ERP Systems</li>
              <li>Data Analytics</li>
            </ul>
          </div>

          {/* Contact Info + Social Icons */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-white">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>India</li>
              <li>suja.sharma@codepackers.com</li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center text-sm text-gray-500">
          &copy; 2025 Codepackers Software Solutions Pvt Ltd. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
