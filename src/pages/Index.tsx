import React from "react";
import Navbar from "@/components/ui/navbar";
import HeroCarousel from "@/components/HeroCarousel";
import PlatformCapabilities from "@/components/PlatformCapabilities";
import DigitalSolutions from "@/components/DigitalSolutions";
import TeamSection from "@/components/TeamSection";
import TeamComposition from "@/components/TeamComposition";
import TechnicalSkills from "@/components/TechnicalSkills";
import ContactSection from "@/components/ContactSection";
import TechnicalSkills2 from "@/components/TechnicalSkills2";
import { useTranslation } from 'react-i18next';

const Index = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* ✅ Navigation Bar */}
      <Navbar />

      {/* ✅ Hero Carousel */}
      <HeroCarousel />

      {/* ✅ Main Sections */}
      <PlatformCapabilities />
      <DigitalSolutions />
      <TeamSection />
      <TeamComposition />
      <TechnicalSkills />
      <ContactSection />
      <TechnicalSkills2 />

      {/* ✅ Footer */}
      <footer className="bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 text-white pt-16 pb-10 mt-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
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
              {t('footer.about')}
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-white">{t('footer.platformTitle')}</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>{t('footer.platformLinks.0')}</li>
              <li>{t('footer.platformLinks.1')}</li>
              <li>{t('footer.platformLinks.2')}</li>
              <li>{t('footer.platformLinks.3')}</li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-white">{t('footer.servicesTitle')}</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>{t('footer.servicesLinks.0')}</li>
              <li>{t('footer.servicesLinks.1')}</li>
              <li>{t('footer.servicesLinks.2')}</li>
              <li>{t('footer.servicesLinks.3')}</li>
            </ul>
          </div>

          {/* Contact Info + Social Icons */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-white">{t('footer.contactTitle')}</h3>
            <ul className="space-y-2 text-sm text-gray-400 break-words">
              <li>India</li>
              <li>suja.sharma@codepackers.com</li>
              <li>vikas.tyagi@codepackers.com</li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition text-lg">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition text-lg">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition text-lg">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center text-sm text-gray-500 px-4">
          &copy; 2025 Codepackers Software Solutions Pvt Ltd. {t('footer.rights')}
        </div>
      </footer>
    </div>
  );
};

export default Index;
