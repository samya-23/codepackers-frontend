import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Lock, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [language, setLanguage] = useState("English");
  const [langDropdown, setLangDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const logoPressTimeout = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => setMobileOpen(!mobileOpen);
  const toggleLang = () => setLangDropdown(!langDropdown);

  const navItems = [
    { name: t("nav.capabilities"), id: "capabilities" },
    { name: t("nav.solutions"), id: "expertise" },
    { name: t("nav.team"), id: "team" },
    { name: t("nav.contact"), id: "contact" },
  ];

  const goToAdmin = () => navigate("/admin/login");

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoPressStart = () => {
    logoPressTimeout.current = setTimeout(() => {
      setShowAdmin(true);
    }, 3000);
  };

  const handleLogoPressEnd = () => {
    if (logoPressTimeout.current) clearTimeout(logoPressTimeout.current);
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang === "English" ? "en" : "es");
    localStorage.setItem("language", lang);
    setLangDropdown(false);
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileOpen(false); // auto-close on mobile
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div
            onMouseDown={handleLogoPressStart}
            onMouseUp={handleLogoPressEnd}
            onTouchStart={handleLogoPressStart}
            onTouchEnd={handleLogoPressEnd}
            className={`text-xl md:text-2xl font-extrabold tracking-tight drop-shadow-md cursor-text ${
              isScrolled ? "text-black" : "text-white"
            }`}
          >
            Codepackers Software Solutions
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium hover:text-blue-500 px-3 py-2 transition rounded-md ${
                  isScrolled ? "text-black" : "text-white"
                }`}
              >
                {item.name}
              </button>
            ))}

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={toggleLang}
                className={`flex items-center gap-1 px-3 py-1 text-sm rounded-md hover:bg-white/10 transition ${
                  isScrolled ? "text-black" : "text-white"
                }`}
              >
                <img
                  src={
                    language === "English"
                      ? "/assets/flags/english.png"
                      : "/assets/flags/spanish.png"
                  }
                  alt={`${language} flag`}
                  className="w-5 h-4 rounded-sm object-cover"
                />
                <span>{language}</span>
                <ChevronDown size={16} />
              </button>
              {langDropdown && (
                <div className={`absolute right-0 mt-2 w-32 rounded-md shadow-lg z-50 border ${
  isScrolled ? "bg-white text-black border-black/20" : "bg-white/10 backdrop-blur-md text-white border-white/30"
}`}>

                  {["English", "Spanish"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`w-full px-4 py-2 text-left text-sm ${
  isScrolled ? "text-black hover:bg-gray-100" : "text-white hover:bg-white/20"
} transition ${language === lang ? "font-semibold text-blue-500" : ""}`}

                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={
                            lang === "English"
                              ? "/assets/flags/english.png"
                              : "/assets/flags/spanish.png"
                          }
                          alt={lang}
                          className="w-5 h-4 rounded-sm object-cover"
                        />
                        {lang}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Admin Button */}
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
                {t("nav.adminPanel")}
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`hover:text-blue-300 ${
                isScrolled ? "text-black" : "text-white"
              }`}
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
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="block text-sm font-medium px-2 py-2 hover:text-blue-300"
              >
                {item.name}
              </button>
            ))}

            {/* Language Dropdown Mobile */}
            <div className="relative">
              <button
                onClick={toggleLang}
                className="flex items-center gap-1 text-white px-3 py-1 text-sm rounded-md hover:bg-white/10 transition"
              >
                <img
                  src={
                    language === "English"
                      ? "/assets/flags/english.png"
                      : "/assets/flags/spanish.png"
                  }
                  alt={`${language} flag`}
                  className="w-5 h-4 rounded-sm object-cover"
                />
                <span>{language}</span>
                <ChevronDown size={16} />
              </button>
              {langDropdown && (
                <div className={`absolute left-0 mt-2 w-32 rounded-md shadow-lg z-50 border ${
  isScrolled ? "bg-white text-black border-black/20" : "bg-white/10 backdrop-blur-md text-white border-white/30"
}`}>

                  {["English", "Spanish"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`w-full px-4 py-2 text-left text-sm ${
  isScrolled ? "text-black hover:bg-gray-100" : "text-white hover:bg-white/20"
} transition ${language === lang ? "font-semibold text-blue-500" : ""}`}

                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={
                            lang === "English"
                              ? "/assets/flags/english.png"
                              : "/assets/flags/spanish.png"
                          }
                          alt={lang}
                          className="w-5 h-4 rounded-sm object-cover"
                        />
                        {lang}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Admin Button Mobile */}
            {showAdmin && (
              <Button
                variant="outline"
                onClick={goToAdmin}
                className="w-full text-sm flex items-center justify-center gap-1 mt-2 text-white border-white/50 hover:border-blue-400 hover:text-blue-400"
              >
                <Lock size={16} />
                {t("nav.adminPanel")}
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
