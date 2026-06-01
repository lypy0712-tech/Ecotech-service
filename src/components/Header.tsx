import { useState, useEffect } from "react";
import { Menu, X, Globe, Phone, Clock, Shield } from "lucide-react";
import { Language, NavLink } from "../types";

interface HeaderProps {
  currentLang: Language;
  onLangChange: (lang: Language) => void;
  activeSection: string;
  navLinks: NavLink[];
}

export default function Header({ currentLang, onLangChange, activeSection, navLinks }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle transparent to white/blue background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of the sticky nav
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const getLanguageLabel = (lang: Language) => {
    if (lang === "az") return "AZE";
    if (lang === "en") return "ENG";
    return "RUS";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top micro bar */}
      <div className="bg-blue-900 text-sky-100 text-[11px] md:text-xs py-2 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5 font-medium">
              <Phone className="w-3.5 h-3.5 text-sky-300" />
              <a href="tel:+994503333322" className="hover:text-white transition-colors">
                +994 (50) 333-33-22
              </a>
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-sky-300" />
              <span>7/24 Fəaliyyət xidməti</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-emerald-400" />
              <span className="hidden xs:inline">Fövqəladə sənaye icazəli</span>
            </span>

            {/* CMS link in a new tab */}
            <a
              href="?admin=true"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider transition-all border border-blue-400/20 shadow-sm cursor-pointer"
              title="CMS Admin Panel (New Tab)"
            >
              <Shield className="w-3 h-3 text-cyan-200" />
              <span>CMS</span>
            </a>

            {/* Quick language dots for mobile or compact view */}
            <div className="flex gap-1.5 items-center bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
              <Globe className="w-3 h-3 text-sky-300" />
              {(["az", "en", "ru"] as Language[]).map((ln) => (
                <button
                  key={ln}
                  onClick={() => onLangChange(ln)}
                  className={`px-1 rounded-sm text-[10px] font-bold uppercase transition-all ${
                    currentLang === ln
                      ? "bg-sky-400 text-blue-950"
                      : "text-sky-300 hover:text-white"
                  }`}
                >
                  {ln}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <nav
        className={`px-4 py-3 md:py-4 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-sky-100"
            : "bg-gradient-to-b from-blue-900/80 to-blue-950/20 backdrop-blur-xs text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            {/* Minimalist Water Droplet Tank Logo */}
            <div className={`p-2.5 rounded-xl transition-all ${
              scrolled ? "bg-blue-600 text-white" : "bg-white text-blue-600"
            }`}>
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                <path d="M6 18h12v1H6z" opacity="0.3" />
              </svg>
            </div>
            <div>
              <span className={`text-lg md:text-xl font-bold tracking-tight block leading-none transition-colors ${
                scrolled ? "text-slate-900" : "text-white"
              }`}>
                AQUACLEAN
              </span>
              <span className="text-[9px] font-mono tracking-widest uppercase block opacity-75">
                Cistern Cleaners
              </span>
            </div>
          </div>

          {/* Desktop Nav menu */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex gap-1 bg-slate-100/10 p-1 rounded-lg">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 cursor-pointer ${
                      isActive
                        ? scrolled
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-white/20 text-white"
                        : scrolled
                        ? "text-slate-600 hover:text-blue-600 hover:bg-slate-100"
                        : "text-sky-100 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {link.label[currentLang]}
                  </button>
                );
              })}
            </div>

            {/* Callback urgent button */}
            <button
              onClick={() => scrollToSection("contact")}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all shadow-md cursor-pointer hover:scale-[1.03] active:scale-[0.98] ${
                scrolled
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200"
                  : "bg-sky-400 text-blue-950 hover:bg-sky-300"
              }`}
            >
              Qaynar Xətt
            </button>
          </div>

          {/* Mobile menu and Language Drawer trigger */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Quick call */}
            <a
              href="tel:+994503333322"
              className={`p-2.5 rounded-full ${
                scrolled ? "bg-slate-100 text-blue-600" : "bg-white/10 text-sky-200"
              }`}
            >
              <Phone className="w-5 h-5" />
            </a>

            {/* Menu trigger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2.5 rounded-full transition-colors ${
                scrolled
                  ? "text-slate-800 hover:bg-slate-100"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer menu overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-[110px] bg-blue-950/95 backdrop-blur-lg z-40 flex flex-col justify-between p-6">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono tracking-widest text-sky-400 uppercase">
              MENYU PUNKTLARI
            </span>
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`w-full py-3 px-4 rounded-xl text-left text-base font-semibold transition-all flex justify-between items-center ${
                    isActive
                      ? "bg-sky-400 text-blue-950 shadow-md"
                      : "text-sky-100 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{link.label[currentLang]}</span>
                  {isActive && <div className="w-2 h-2 rounded-full bg-blue-950" />}
                </button>
              );
            })}
          </div>

          {/* Contact Details & Flags inside drawer */}
          <div className="border-t border-sky-900 pt-6 flex flex-col gap-4">
            <a
              href="?admin=true"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-xl text-center text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Shield className="w-4 h-4 text-cyan-200" />
              <span>CMS - Sayt İdarəetmə Paneli (Yeni Tab)</span>
            </a>

            <div className="flex justify-around bg-blue-900/60 p-2.5 rounded-xl border border-sky-900">
              {(["az", "en", "ru"] as Language[]).map((ln) => (
                <button
                  key={ln}
                  onClick={() => onLangChange(ln)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all flex items-center gap-1.5 ${
                    currentLang === ln
                      ? "bg-sky-400 text-blue-950 shadow-md"
                      : "text-sky-300 hover:text-white"
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  {getLanguageLabel(ln)}
                </button>
              ))}
            </div>

            <button
              onClick={() => scrollToSection("contact")}
              className="w-full py-4 bg-sky-400 hover:bg-sky-300 text-blue-950 font-bold rounded-xl text-center shadow-lg cursor-pointer"
            >
              Geri Zəng Sifarişi
            </button>
            <p className="text-center text-[10px] text-sky-300/60 font-mono">
              Sülh Prospekti 148, Bakı • +994 (50) 333-33-22
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
