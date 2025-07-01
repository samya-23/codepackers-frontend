// src/components/ui/navbar.tsx

import React, { useState } from "react";
import { Menu, X, Lock } from "lucide-react";
import { Button } from "./button";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [language, setLanguage] = useState("EN");

  const toggleMenu = () => setMobileOpen(!mobileOpen);

  const navItems = [
    { name: "Capabilities", href: "#platform" },
    { name: "Expertise", href: "#expertise" },
    { name: "Team", href: "#team" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-2xl font-bold">Codepackers Software Solutions</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {item.name}
              </a>
            ))}

            {/* Language Switch */}
            <div className="flex items-center bg-gray-200 rounded-full p-0.5 text-sm font-medium">
              {["EN", "ES"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1 rounded-full transition-colors duration-200 ${
                    language === lang
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Admin Panel */}
            <Button
              variant="ghost"
              className="text-sm font-medium flex items-center gap-1 border border-gray-300 hover:border-blue-600 hover:text-blue-600 px-3 py-1 rounded-md shadow-sm transition"
            >
              <Lock size={16} className="mb-[1px]" />
              Admin Panel
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 hover:text-blue-600">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              <span className="sr-only">Open menu</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-gray-700 hover:text-blue-600 px-2"
              >
                {item.name}
              </a>
            ))}

            {/* Mobile Language Toggle */}
            <div className="flex items-center bg-gray-200 rounded-full w-max mx-2 text-sm font-medium">
              {["EN", "ES"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1 rounded-full transition-colors duration-200 ${
                    language === lang
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Admin Panel (mobile) */}
            <Button
              variant="outline"
              className="w-full text-sm flex items-center justify-center gap-1 mt-2"
            >
              <Lock size={16} />
              Admin Panel
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
