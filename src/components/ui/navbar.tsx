import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Lock, ChevronDown, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [language, setLanguage] = useState("English");
  const [langDropdown, setLangDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const logoPressTimeout = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => setMobileOpen(!mobileOpen);
  const toggleLang = () => setLangDropdown(!langDropdown);

  const navItems = [
    { name: "Capabilities", href: "#platform" },
    { name: "Expertise", href: "#expertise" },
    { name: "Team", href: "#team" },
    { name: "Contact", href: "#contact" },
  ];

  const goToAdmin = () => navigate("/admin/login");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoPressStart = () => {
    logoPressTimeout.current = setTimeout(() => {
      setShowAdmin(true);
    }, 3000); // 3 seconds hold
  };

  const handleLogoPressEnd = () => {
    if (logoPressTimeout.current) {
      clearTimeout(logoPressTimeout.current);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo with long-press */}
          <div
            onMouseDown={handleLogoPressStart}
            onMouseUp={handleLogoPressEnd}
            onTouchStart={handleLogoPressStart}
            onTouchEnd={handleLogoPressEnd}
            className={`text-xl md:text-2xl font-extrabold tracking-tight drop-shadow-md cursor-pointer ${
              isScrolled ? "text-black" : "text-white"
            }`}
          >
            Codepackers Software Solutions
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm font-medium hover:text-blue-500 px-3 py-2 transition rounded-md ${
                  isScrolled ? "text-black" : "text-white"
                }`}
              >
                {item.name}
              </a>
            ))}

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={toggleLang}
                className={`flex items-center gap-1 px-3 py-1 text-sm rounded-md hover:bg-white/10 transition ${
                  isScrolled ? "text-black" : "text-white"
                }`}
              >
                <Globe size={16} />
                {language} <ChevronDown size={16} />
              </button>
              {langDropdown && (
                <div className="absolute right-0 mt-2 w-32 bg-white/10 backdrop-blur-md border border-white/30 rounded-md shadow-lg z-50">
                  {["English", "Spanish"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setLangDropdown(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm text-white hover:bg-white/20 transition ${
                        language === lang ? "font-semibold text-blue-300" : ""
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Admin Panel Button (Desktop) */}
            {showAdmin && (
              <Button
                variant="ghost"
                onClick={goToAdmin}
                className={`text-sm font-semibold flex items-center gap-1 border px-3 py-1.5 rounded-md backdrop-blur-lg transition-all shadow-sm ${
                  isScrolled
                    ? "text-black border-black hover:text-blue-600 hover:border-blue-600"
                    : "text-white border-white/50 hover:text-blue-400 hover:border-blue-400"
                }`}
              >
                <Lock size={16} className="mb-[1px]" />
                Admin Panel
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`hover:text-blue-300 ${isScrolled ? "text-black" : "text-white"}`}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              <span className="sr-only">Open menu</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2 text-white">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-sm font-medium px-2 py-2 hover:text-blue-300"
              >
                {item.name}
              </a>
            ))}

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={toggleLang}
                className="flex items-center gap-1 text-white px-3 py-1 text-sm rounded-md hover:bg-white/10 transition"
              >
                <Globe size={16} />
                {language} <ChevronDown size={16} />
              </button>
              {langDropdown && (
                <div className="absolute left-0 mt-2 w-32 bg-white/10 backdrop-blur-md border border-white/30 rounded-md shadow-lg z-50">
                  {["English", "Spanish"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setLangDropdown(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm text-white hover:bg-white/20 transition ${
                        language === lang ? "font-semibold text-blue-300" : ""
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Admin Panel (Mobile) */}
            {showAdmin && (
              <Button
                variant="outline"
                onClick={goToAdmin}
                className="w-full text-sm flex items-center justify-center gap-1 mt-2 text-white border-white/50 hover:border-blue-400 hover:text-blue-400"
              >
                <Lock size={16} />
                Admin Panel
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
