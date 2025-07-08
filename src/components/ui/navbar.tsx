import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Lock, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [language, setLanguage] = useState(() => {
    const stored = localStorage.getItem("language");
    return stored === "es" ? "Spanish" : "English";
  });
  const [langDropdown, setLangDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const logoPressTimeout = useRef<NodeJS.Timeout | null>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

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
  
  useEffect(() => {
    const storedLang = localStorage.getItem("language");
    i18n.changeLanguage(storedLang === "es" ? "es" : "en");
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdown(false);
      }
    };

    const handleOutsideScroll = () => {
      setLangDropdown(false);
    };

    if (langDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleOutsideScroll);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleOutsideScroll);
    };
  }, [langDropdown]);

  const handleLogoPressStart = () => {
    logoPressTimeout.current = setTimeout(() => {
      setShowAdmin(true);
    }, 3000);
  };

  const handleLogoPressEnd = () => {
    if (logoPressTimeout.current) clearTimeout(logoPressTimeout.current);
  };

  const handleLanguageChange = (lang: string) => {
    const langCode = lang === "English" ? "en" : "es";
    setLanguage(lang);
    i18n.changeLanguage(langCode);
    localStorage.setItem("language", langCode);
    setLangDropdown(false);
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 ${isScrolled ? "bg-white/90" : "bg-white/10"} backdrop-blur-xl border-b ${isScrolled ? "border-gray-200" : "border-white/20"} shadow-sm transition-all duration-300`}>
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
            <div className="relative" ref={langDropdownRef}>
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
                <div
                  className={`absolute right-0 mt-2 w-32 rounded-md shadow-lg z-50 border ${
                    isScrolled
                      ? "bg-white border-gray-200"
                      : "bg-gray-800 border-gray-600"
                  } overflow-hidden`}
                >
                  {["English", "Spanish"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 ${
                        isScrolled
                          ? "hover:bg-gray-100 text-gray-800"
                          : "hover:bg-gray-700 text-white"
                      } transition ${
                        language === lang ? "font-semibold text-blue-500" : ""
                      }`}
                    >
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
                className={`text-sm font-semibold flex items-center gap-1 border px-3 py-1.5 rounded-md ${
                  isScrolled
                    ? "text-black border-gray-300 hover:text-blue-600 hover:border-blue-600"
                    : "text-white border-white/50 hover:text-blue-400 hover:border-blue-400"
                }`}
              >
                <Lock size={16} className="mb-[1px]" />
                {t("nav.adminPanel")}
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            {showAdmin && (
              <Button
                variant="ghost"
                onClick={goToAdmin}
                className={`text-sm font-semibold flex items-center gap-1 border px-2 py-1 rounded-md ${
                  isScrolled
                    ? "text-black border-gray-300 hover:text-blue-600 hover:border-blue-600"
                    : "text-white border-white/50 hover:text-blue-400 hover:border-blue-400"
                }`}
              >
                <Lock size={16} className="mb-[1px]" />
              </Button>
            )}
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
          <div className={`md:hidden pb-4 space-y-2 ${
            isScrolled ? "text-gray-800" : "text-white"
          }`}>
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className={`block text-sm font-medium px-2 py-2 hover:text-blue-300 w-full text-left ${
                  isScrolled ? "hover:bg-gray-100" : "hover:bg-white/10"
                } rounded-md`}
              >
                {item.name}
              </button>
            ))}

            {/* Language Dropdown Mobile */}
            <div className="relative mb-2" ref={langDropdownRef}>
              <button
                onClick={toggleLang}
                className={`flex items-center gap-1 px-3 py-2 text-sm rounded-md w-full text-left ${
                  isScrolled ? "hover:bg-gray-100" : "hover:bg-white/10"
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
                <ChevronDown size={16} className="ml-auto" />
              </button>

              {langDropdown && (
                <div
                  className={`mt-1 w-full rounded-md shadow-lg z-50 border ${
                    isScrolled
                      ? "bg-white border-gray-200"
                      : "bg-gray-800 border-gray-600"
                  } overflow-hidden`}
                >
                  {["English", "Spanish"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 ${
                        isScrolled
                          ? "hover:bg-gray-100 text-gray-800"
                          : "hover:bg-gray-700 text-white"
                      } transition ${
                        language === lang ? "font-semibold text-blue-500" : ""
                      }`}
                    >
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
                className={`w-full text-sm flex items-center justify-center gap-1 mt-2 ${
                  isScrolled
                    ? "text-gray-800 border-gray-300 hover:border-blue-600 hover:text-blue-600"
                    : "text-white border-white/50 hover:border-blue-400 hover:text-blue-400"
                }`}
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