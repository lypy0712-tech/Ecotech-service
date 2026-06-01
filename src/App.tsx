import React, { useState, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Droplets,
  Fuel,
  Settings,
  ShieldCheck,
  Activity,
  Cpu,
  FileCheck,
  Leaf,
  Star,
  Award,
  ArrowUp,
  Phone,
  MapPin,
  Mail,
  Check,
  Sparkles,
  PhoneCall,
  User,
  Activity as VolumeIcon,
  MessageSquare,
  Building,
  CheckSquare,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

import { Language, CallbackSubmission, NavLink, ServiceItem, AdvantageItem, PortfolioItem, ReviewItem } from "./types";
import { NAV_LINKS, SERVICES, ADVANTAGES, PORTFOLIO, REVIEWS, DICTIONARY } from "./data";
import Header from "./components/Header";
import InteractiveSlider from "./components/InteractiveSlider";
import CallbackDashboard from "./components/CallbackDashboard";
import AdminPanel from "./components/AdminPanel";

const heroImg = "/src/assets/images/cistern_cleaning_hero_1780331055569.png";

// Initial mock data to populate the dashboard table
const INITIAL_SUBMISSIONS: CallbackSubmission[] = [
  {
    id: "sub-101",
    name: "Rüfət Məmmədov",
    phone: "+994 (50) 441-23-45",
    tankVolume: "15 m³",
    serviceType: "İçməli su çəni təmizlənməsi",
    notes: "Zirə qəsəbəsində yerləşən fərdi bağ evində təcili su anbarının təmizliyini istəyirik.",
    timestamp: "01.06.2026, 12:44",
    status: "called"
  },
  {
    id: "sub-102",
    name: "Tofiq Hüseynzadə",
    phone: "+994 (77) 505-12-89",
    tankVolume: "40 ton",
    serviceType: "Yanacaq / Neft çəni təmizliyi",
    notes: "Dizel rezervuarının yuyulmasından sonra kənarlaşdırma aktı lazımdır.",
    timestamp: "01.06.2026, 14:15",
    status: "pending"
  }
];

export default function App() {
  const [lang, setLang] = useState<Language>("az");
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [submissions, setSubmissions] = useState<CallbackSubmission[]>(() => {
    const cached = localStorage.getItem("aquaclean_callbacks");
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        return INITIAL_SUBMISSIONS;
      }
    }
    return INITIAL_SUBMISSIONS;
  });

  // Dynamic CMS state elements
  const [navLinks, setNavLinks] = useState<NavLink[]>(() => {
    const cached = localStorage.getItem("aquaclean_nav_links");
    if (cached) {
      try { return JSON.parse(cached); } catch (e) {}
    }
    return NAV_LINKS;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const cached = localStorage.getItem("aquaclean_services");
    if (cached) {
      try { return JSON.parse(cached); } catch (e) {}
    }
    return SERVICES;
  });

  const [advantages, setAdvantages] = useState<AdvantageItem[]>(() => {
    const cached = localStorage.getItem("aquaclean_advantages");
    if (cached) {
      try { return JSON.parse(cached); } catch (e) {}
    }
    return ADVANTAGES;
  });

  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(() => {
    const cached = localStorage.getItem("aquaclean_portfolio");
    if (cached) {
      try { return JSON.parse(cached); } catch (e) {}
    }
    return PORTFOLIO;
  });

  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    const cached = localStorage.getItem("aquaclean_reviews");
    if (cached) {
      try { return JSON.parse(cached); } catch (e) {}
    }
    return REVIEWS;
  });

  const [heroTexts, setHeroTexts] = useState(() => {
    const cached = localStorage.getItem("aquaclean_hero_texts");
    if (cached) {
      try { return JSON.parse(cached); } catch (e) {}
    }
    return {
      title: DICTIONARY.hero.title,
      subtitle: DICTIONARY.hero.subtitle,
      tagline: DICTIONARY.hero.tagline,
    };
  });

  const [statsTexts, setStatsTexts] = useState(() => {
    const cached = localStorage.getItem("aquaclean_stats_texts");
    if (cached) {
      try { return JSON.parse(cached); } catch (e) {}
    }
    return {
      jobs: "1,200+",
      experience: "12+",
      happyClients: "100%",
      responseTime: "< 15",
    };
  });

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    tankVolume: "",
    serviceType: "drinking",
    notes: ""
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Active Portfolio item index
  const [activePortfolioIndex, setActivePortfolioIndex] = useState(0);

  // Active Review index for testimonial carousel
  const [reviewIndex, setReviewIndex] = useState(0);

  // Services horizontal scrolling
  const servicesScrollRef = useRef<HTMLDivElement>(null);

  const handleServicesScrollLeft = () => {
    if (servicesScrollRef.current) {
      servicesScrollRef.current.scrollBy({
        left: -320,
        behavior: "smooth"
      });
    }
  };

  const handleServicesScrollRight = () => {
    if (servicesScrollRef.current) {
      servicesScrollRef.current.scrollBy({
        left: 320,
        behavior: "smooth"
      });
    }
  };

  // Save submissions helper
  const saveSubmissions = (updated: CallbackSubmission[]) => {
    setSubmissions(updated);
    localStorage.setItem("aquaclean_callbacks", JSON.stringify(updated));
  };

  // Reset entire application data back to default baseline
  const handleResetAllData = () => {
    localStorage.removeItem("aquaclean_nav_links");
    localStorage.removeItem("aquaclean_services");
    localStorage.removeItem("aquaclean_advantages");
    localStorage.removeItem("aquaclean_portfolio");
    localStorage.removeItem("aquaclean_reviews");
    localStorage.removeItem("aquaclean_hero_texts");
    localStorage.removeItem("aquaclean_stats_texts");

    setNavLinks(NAV_LINKS);
    setServices(SERVICES);
    setAdvantages(ADVANTAGES);
    setPortfolio(PORTFOLIO);
    setReviews(REVIEWS);
    setHeroTexts({
      title: DICTIONARY.hero.title,
      subtitle: DICTIONARY.hero.subtitle,
      tagline: DICTIONARY.hero.tagline,
    });
    setStatsTexts({
      jobs: "1,200+",
      experience: "12+",
      happyClients: "100%",
      responseTime: "< 15",
    });
    setActivePortfolioIndex(0);
  };

  // Watch scroll to highlight active navigation link
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const link of navLinks) {
        const element = document.getElementById(link.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks]);

  // Icon mapping helper for dynamic rendering
  const renderIcon = (iconName: string, className = "w-6 h-6") => {
    switch (iconName) {
      case "Droplets":
        return <Droplets className={className} />;
      case "Fuel":
        return <Fuel className={className} />;
      case "Settings":
        return <Settings className={className} />;
      case "ShieldCheck":
        return <ShieldCheck className={className} />;
      case "Activity":
        return <Activity className={className} />;
      case "Cpu":
        return <Cpu className={className} />;
      case "FileCheck":
        return <FileCheck className={className} />;
      case "Leaf":
        return <Leaf className={className} />;
      default:
        return <Award className={className} />;
    }
  };

  // Pre-select service in form and scroll to contact
  const handleServiceOrder = (serviceKey: string) => {
    setFormData((prev) => ({ ...prev, serviceType: serviceKey }));
    const contactElem = document.getElementById("contact");
    if (contactElem) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = contactElem.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  // Process Callback Form Submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    // Basic Validation
    if (!formData.name.trim()) {
      errors.name = lang === "az" ? "Adınızı qeyd edin" : lang === "en" ? "Name required" : "Введите имя";
    }
    if (!formData.phone.trim()) {
      errors.phone = lang === "az" ? "Telefon nömrənizi qeyd edin" : lang === "en" ? "Phone required" : "Введите телефон";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    // Simulate Network Latency
    setTimeout(() => {
      // Create new request
      const now = new Date();
      const timestampString = now.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      }) + ", " + now.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit"
      });

      // Get readable service type label
      const options = DICTIONARY.contact.form.serviceOptions;
      const serviceLabelMap: Record<string, string> = {
        drinking: options.drinking[lang],
        petrol: options.petrol[lang],
        chemical: options.chemical[lang],
        disinfection: options.disinfection[lang],
        other: options.other[lang]
      };

      const newSubmission: CallbackSubmission = {
        id: "sub-" + Date.now(),
        name: formData.name,
        phone: formData.phone,
        tankVolume: formData.tankVolume || undefined,
        serviceType: serviceLabelMap[formData.serviceType] || formData.serviceType,
        notes: formData.notes || undefined,
        timestamp: timestampString,
        status: "pending"
      };

      const updated = [newSubmission, ...submissions];
      saveSubmissions(updated);
      setIsSubmitting(false);
      setShowSuccessModal(true);

      // Clear form inputs
      setFormData({
        name: "",
        phone: "",
        tankVolume: "",
        serviceType: "drinking",
        notes: ""
      });
    }, 1200);
  };

  // Dashboard Operations
  const handleUpdateStatus = (id: string, nextStatus: "pending" | "called" | "rejected") => {
    const updated = submissions.map((sub) => {
      if (sub.id === id) {
        return { ...sub, status: nextStatus };
      }
      return sub;
    });
    saveSubmissions(updated);
  };

  const handleClearSubmissions = () => {
    saveSubmissions([]);
  };

  const handleAddDummySubmission = () => {
    const firstNames = ["Emin", "Cavid", "Leyla", "Aydın", "Zakir", "Nigar"];
    const lastNames = ["Rəhimov", "Həsənov", "Quliyeva", "Əliyev", "Süleymanov"];
    const servicesOpt = ["drinking", "petrol", "disinfection"];
    
    const randomName = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    const randomPhone = `+994 (55) 301-${Math.floor(Math.random() * 90 + 10)}-${Math.floor(Math.random() * 90 + 10)}`;
    const randomVolume = `${Math.floor(Math.random() * 50 + 5)} ton`;
    const randomServiceKey = servicesOpt[Math.floor(Math.random() * servicesOpt.length)];
    
    const options = DICTIONARY.contact.form.serviceOptions;
    const serviceLabelMap: Record<string, string> = {
      drinking: options.drinking[lang],
      petrol: options.petrol[lang],
      chemical: options.chemical[lang],
      disinfection: options.disinfection[lang],
      other: options.other[lang]
    };

    const now = new Date();
    const timestampString = now.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }) + ", " + now.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit"
    });

    const dummy: CallbackSubmission = {
      id: "sub-" + Date.now(),
      name: randomName,
      phone: randomPhone,
      tankVolume: randomVolume,
      serviceType: serviceLabelMap[randomServiceKey],
      notes: "Avtomatik sınaq qeydi / Test simulation entry.",
      timestamp: timestampString,
      status: "pending"
    };

    saveSubmissions([dummy, ...submissions]);
  };

  const currentPortfolio = portfolio[activePortfolioIndex] || portfolio[0] || PORTFOLIO[0];

  const isAdminView = typeof window !== "undefined" && window.location.search.includes("admin=true");

  if (isAdminView) {
    return (
      <AdminPanel
        isStandAlone={true}
        navLinks={navLinks}
        setNavLinks={setNavLinks}
        services={services}
        setServices={setServices}
        advantages={advantages}
        setAdvantages={setAdvantages}
        portfolio={portfolio}
        setPortfolio={setPortfolio}
        reviews={reviews}
        setReviews={setReviews}
        heroTexts={heroTexts}
        setHeroTexts={setHeroTexts}
        statsTexts={statsTexts}
        setStatsTexts={setStatsTexts}
        submissions={submissions}
        onUpdateStatus={handleUpdateStatus}
        onClearSubmissions={handleClearSubmissions}
        onResetAllData={handleResetAllData}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative bg-slate-50 overflow-x-hidden">
      {/* Header element */}
      <Header
        currentLang={lang}
        onLangChange={setLang}
        activeSection={activeSection}
        navLinks={navLinks}
      />

      {/* Main Single Page Sections wrapper */}
      <main className="flex-grow pt-24">
        
        {/* SECTION 1: HERO / HOME */}
        <section
          id="hero"
          className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white overflow-hidden py-16 md:py-24"
        >
          {/* Saturated visual water mesh backgrounds */}
          <div className="absolute inset-0 z-0 opacity-15">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
            {/* Hero text panel */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-sky-400/10 border border-sky-400/30 text-sky-300 text-xs font-semibold rounded-full tracking-wider uppercase"
              >
                <Sparkles className="w-3.5 h-3.5 animate-bounce" />
                {heroTexts.tagline[lang]}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display leading-[1.12] text-white tracking-tight"
              >
                {heroTexts.title[lang]}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg text-sky-100/90 leading-relaxed max-w-2xl font-light"
              >
                {heroTexts.subtitle[lang]}
              </motion.p>

              {/* Direct action calls */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <button
                  onClick={() => handleServiceOrder("drinking")}
                  className="px-8 py-4 bg-sky-400 hover:bg-sky-300 text-blue-950 font-bold rounded-2xl shadow-lg shadow-sky-400/20 hover:shadow-sky-400/30 font-medium transition-all transform hover:scale-[1.02] cursor-pointer"
                >
                  {DICTIONARY.hero.ctaButton[lang]}
                </button>
                <a
                  href="#services"
                  className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all font-semibold flex items-center gap-2 border border-white/10 hover:border-white/30 backdrop-blur-md"
                >
                  <span>{DICTIONARY.hero.learnMore[lang]}</span>
                </a>
              </motion.div>

              {/* Quick statistics layout row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10"
              >
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-bold font-display text-sky-400">{statsTexts.jobs}</div>
                  <div className="text-xs text-white/70">{DICTIONARY.hero.stats.completedJobs[lang]}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-bold font-display text-sky-400">{statsTexts.experience}</div>
                  <div className="text-xs text-white/70">{DICTIONARY.hero.stats.yearsExperience[lang]}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-bold font-display text-sky-400">{statsTexts.happyClients}</div>
                  <div className="text-xs text-white/70">{DICTIONARY.hero.stats.happyClients[lang]}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-bold font-display text-sky-400">{statsTexts.responseTime}</div>
                  <div className="text-xs text-white/70">{DICTIONARY.hero.stats.responseMin[lang]}</div>
                </div>
              </motion.div>
            </div>

            {/* Corporate technician action photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 relative flex justify-center"
            >
              <div className="relative w-full max-w-sm sm:max-w-md h-[400px] rounded-3xl overflow-hidden border-4 border-white/15 shadow-2xl shadow-blue-950/50">
                <img
                  src={heroImg}
                  alt="Industrial cistern washing technician"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {/* Embedded Floating Trust tag */}
                <div className="absolute bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl flex items-center gap-3.5 border border-white/10">
                  <div className="p-3 bg-blue-600 rounded-xl text-white">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-mono uppercase text-sky-400 font-bold tracking-wider leading-none">
                      TƏHLÜKƏSİZLİK ZƏMANƏTİ
                    </h5>
                    <p className="text-xs text-slate-200 mt-1 leading-normal font-medium">
                      ISO 9001, OHSAS 18001 / Azərbaycan dövlət lisenziyalı
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: SERVICES */}
        <section
          id="services"
          className="py-20 md:py-28 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 select-none">
            {/* Section heading */}
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs font-bold uppercase tracking-widest text-blue-600 font-mono bg-blue-50 px-3.5 py-1.5 rounded-full inline-block"
              >
                XİDMƏTLƏRİMİZ (SERVICES)
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold font-display text-slate-900 tracking-tight"
              >
                {DICTIONARY.services.title[lang]}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-sm md:text-base text-slate-600 leading-relaxed"
              >
                {DICTIONARY.services.subtitle[lang]}
              </motion.p>
            </div>

            {/* Slide layout of services */}
            <div className="relative group px-1 md:px-12">
              {/* Left Scroll Button */}
              <button
                onClick={handleServicesScrollLeft}
                className="absolute left-0 lg:-left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white hover:bg-blue-650 hover:text-white text-slate-700 hover:text-blue-600 hover:border-blue-200 rounded-full shadow-lg border border-slate-150 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                title="Scroll Left"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Right Scroll Button */}
              <button
                onClick={handleServicesScrollRight}
                className="absolute right-0 lg:-right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white hover:bg-blue-650 hover:text-white text-slate-700 hover:text-blue-600 hover:border-blue-200 rounded-full shadow-lg border border-slate-150 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                title="Scroll Right"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* The slider viewport track */}
              <div
                ref={servicesScrollRef}
                className="flex overflow-x-auto gap-6 sm:gap-8 pb-6 pt-1.5 scroll-smooth snap-x snap-mandatory select-none scrollbar-none"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {services.map((serv, index) => (
                  <motion.div
                    key={serv.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="min-w-[280px] sm:min-w-[320px] max-w-[350px] snap-start flex-shrink-0 bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-sky-200 hover:bg-sky-50/20 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full"
                  >
                    <div className="space-y-5">
                      {/* Icon container */}
                      <div className="p-4 rounded-2xl bg-blue-600 text-white inline-flex shadow-md shadow-blue-200">
                        {renderIcon(serv.iconName)}
                      </div>

                      <div className="space-y-2 text-left">
                        <h4 className="text-lg font-bold text-slate-900 tracking-tight">
                          {serv.title[lang]}
                        </h4>
                        <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                          {serv.description[lang]}
                        </p>
                      </div>
                    </div>

                    {/* Pricing and Action row */}
                    <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                          {DICTIONARY.services.priceTag[lang]}
                        </span>
                        <span className="text-base font-bold text-blue-700 font-display">
                          {serv.price?.[lang] || "Sifarişlə"}
                        </span>
                      </div>

                      <button
                        onClick={() => handleServiceOrder(serv.id === 1 ? "drinking" : serv.id === 2 ? "petrol" : serv.id === 3 ? "chemical" : "disinfection")}
                        className="px-4 py-2 bg-blue-100 hover:bg-blue-600 hover:text-white text-blue-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <span>{DICTIONARY.services.orderCall[lang]}</span>
                        <PhoneCall className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: ADVANTAGES */}
        <section
          id="advantages"
          className="py-20 md:py-28 bg-gradient-to-b from-sky-50 to-white"
        >
          <div className="max-w-7xl mx-auto px-4 select-none">
            {/* Title banner */}
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs font-bold uppercase tracking-widest text-sky-600 font-mono bg-sky-100 px-3.5 py-1.5 rounded-full inline-block"
              >
                NİYƏ BİZİM ŞİRKƏT? (WHY US)
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold font-display text-slate-900 tracking-tight"
              >
                {DICTIONARY.advantages.title[lang]}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-sm md:text-base text-slate-600 leading-relaxed"
              >
                {DICTIONARY.advantages.subtitle[lang]}
              </motion.p>
            </div>

            {/* Bento cards format */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {advantages.map((adv, index) => (
                <motion.div
                  key={adv.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-3xl p-6 md:p-8 border border-sky-100 shadow-md hover:shadow-xl transition-all flex flex-col sm:flex-row gap-5 items-start text-left"
                >
                  <div className="p-4 rounded-2xl bg-sky-100 text-blue-700 inline-flex flex-shrink-0">
                    {renderIcon(adv.iconName, "w-8 h-8")}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg md:text-xl font-bold text-slate-800 tracking-tight">
                      {adv.title[lang]}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed font-light">
                      {adv.description[lang]}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Micro banner checklist */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-blue-900 text-white rounded-3xl p-6 md:p-8 max-w-5xl mx-auto mt-12 flex flex-col md:flex-row justify-between items-center gap-6 shadow-lg border border-blue-800"
            >
              <div className="text-center md:text-left">
                <span className="text-[10px] uppercase font-mono tracking-widest text-sky-300 font-bold block mb-1">
                  XİDMƏT MÜQAVİLƏSİ
                </span>
                <h4 className="text-lg md:text-xl font-bold tracking-tight">
                  {lang === "az"
                    ? "Bütün işlər rəsmi sənədlərlə və zəmanətlə icra olunur."
                    : lang === "en"
                    ? "All services completed with certified legal guarantee and paperwork."
                    : "Все работы сдаются по акту с выдачей официальной гарантии."}
                </h4>
              </div>
              <button
                onClick={() => handleServiceOrder("drinking")}
                className="px-6 py-3 bg-sky-400 hover:bg-sky-300 text-blue-950 font-bold rounded-xl transition-all flex items-center gap-2 font-semibold flex-shrink-0 shadow-md cursor-pointer"
              >
                <FileCheck className="w-4 h-4" />
                <span>
                  {lang === "az" ? "Lisenziyanı yoxla" : lang === "en" ? "Check License" : "Проверить допуски"}
                </span>
              </button>
            </motion.div>
          </div>
        </section>

        {/* SECTION 4: PORTFOLIO / COMPLETED PROJECTS (BEFORE & AFTER) */}
        <section
          id="portfolio"
          className="py-20 md:py-28 bg-white border-y border-slate-100"
        >
          <div className="max-w-7xl mx-auto px-4 select-none">
            {/* Title Banner */}
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs font-bold uppercase tracking-widest text-blue-600 font-mono bg-blue-50 px-3.5 py-1.5 rounded-full inline-block"
              >
                FOTOLAR ƏVVƏL VƏ SONRA (BEFORE & AFTER)
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold font-display text-slate-900 tracking-tight"
              >
                {DICTIONARY.portfolio.title[lang]}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-sm md:text-base text-slate-600 leading-relaxed"
              >
                {DICTIONARY.portfolio.subtitle[lang]}
              </motion.p>
            </div>

            {/* Quick horizontal selectors for completed jobs */}
            <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-2xl mx-auto">
              {portfolio.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActivePortfolioIndex(index)}
                  className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-full border transition-all cursor-pointer ${
                    activePortfolioIndex === index
                      ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {item.title[lang] || `Layihə #${item.id}`}
                </button>
              ))}
            </div>

            {/* Interactive Image Slide Widget */}
            <motion.div
              layoutId="portfolioWidget"
              className="w-full"
            >
              <InteractiveSlider
                key={currentPortfolio.id}
                item={currentPortfolio}
                lang={lang}
                labels={{
                  before: DICTIONARY.portfolio.beforeLabel[lang],
                  after: DICTIONARY.portfolio.afterLabel[lang],
                  guide: DICTIONARY.portfolio.interactiveGuide[lang]
                }}
              />
            </motion.div>
          </div>
        </section>

        {/* SECTION 5: TESTIMONIALS / REVIEWS */}
        <section
          id="reviews"
          className="py-20 md:py-28 bg-slate-50"
        >
          <div className="max-w-7xl mx-auto px-4 select-none">
            {/* Header elements */}
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs font-bold uppercase tracking-widest text-sky-600 font-mono bg-sky-100 px-3.5 py-1.5 rounded-full inline-block"
              >
                MÜŞTƏRİ MƏMNUNİYYƏTİ (REVIEWS)
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold font-display text-slate-900 tracking-tight"
              >
                {DICTIONARY.reviews.title[lang]}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-sm md:text-base text-slate-600 leading-relaxed"
              >
                {DICTIONARY.reviews.subtitle[lang]}
              </motion.p>
            </div>

            {/* Reviews display grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {reviews.map((rev) => (
                <motion.div
                  key={rev.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md flex flex-col justify-between text-left relative"
                >
                  <div className="space-y-4">
                    {/* Stars count */}
                    <div className="flex gap-1 text-amber-400">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-4.5 h-4.5 fill-current" />
                      ))}
                    </div>

                    {/* Review textual body */}
                    <p className="text-[#334155] text-xs md:text-sm leading-relaxed italic">
                      “{rev.text[lang]}”
                    </p>
                  </div>

                  {/* Review author profile card */}
                  <div className="flex items-center gap-3.5 pt-5 mt-6 border-t border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
                      {rev.author.split(" ")[0][0]}
                      {rev.author.split(" ")[1]?.[0] || ""}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {rev.author}
                      </h4>
                      {rev.company && (
                        <p className="text-[11px] text-blue-600 font-medium font-sans">
                          {rev.company}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: CALLBACK REQUEST FORM (CONTACT) */}
        <section
          id="contact"
          className="py-20 md:py-28 bg-white relative overflow-hidden"
        >
          {/* Ambient background designs */}
          <div className="absolute right-0 top-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute left-0 bottom-0 w-80 h-80 bg-sky-50 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto px-4 select-none relative z-10">
            {/* Title */}
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs font-bold uppercase tracking-widest text-blue-600 font-mono bg-blue-50 px-3.5 py-1.5 rounded-full inline-block"
              >
                SİPARİŞ VƏ ƏLAQƏ (ORDER FORM)
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 tracking-tight">
                {DICTIONARY.contact.title[lang]}
              </h2>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                {DICTIONARY.contact.subtitle[lang]}
              </p>
            </div>

            {/* Split row layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-stretch">
              
              {/* Callback input fields Card */}
              <div className="lg:col-span-7 bg-slate-50 p-6 md:p-10 rounded-3xl border border-slate-100 shadow-xl text-left">
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* Row One: Full Name */}
                  <div className="space-y-2">
                    <label className="text-xs md:text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                      <User className="w-4 h-4 text-blue-600" />
                      {DICTIONARY.contact.form.nameLabel[lang]} *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={DICTIONARY.contact.form.namePlaceholder[lang]}
                      className={`w-full px-4 py-3 bg-white text-slate-900 rounded-xl border text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100 ${
                        formErrors.name ? "border-red-400 focus:ring-red-500/10" : "border-slate-200"
                      }`}
                    />
                    {formErrors.name && (
                      <p className="text-[11px] text-red-500 font-medium">{formErrors.name}</p>
                    )}
                  </div>

                  {/* Row Two: Phone and Cistern volume */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs md:text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                        <Phone className="w-4 h-4 text-blue-600" />
                        {DICTIONARY.contact.form.phoneLabel[lang]} *
                      </label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={DICTIONARY.contact.form.phonePlaceholder[lang]}
                        className={`w-full px-4 py-3 bg-white text-slate-900 rounded-xl border text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100 ${
                          formErrors.phone ? "border-red-400 focus:ring-red-500/10" : "border-slate-200"
                        }`}
                      />
                      {formErrors.phone && (
                        <p className="text-[11px] text-red-500 font-medium">{formErrors.phone}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs md:text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                        <VolumeIcon className="w-4 h-4 text-blue-600" />
                        {DICTIONARY.contact.form.volumeLabel[lang]}
                      </label>
                      <input
                        type="text"
                        value={formData.tankVolume}
                        onChange={(e) => setFormData({ ...formData, tankVolume: e.target.value })}
                        placeholder={DICTIONARY.contact.form.volumePlaceholder[lang]}
                        className="w-full px-4 py-3 bg-white text-slate-900 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />
                    </div>
                  </div>

                  {/* Row Three: Service Category */}
                  <div className="space-y-2">
                    <label className="text-xs md:text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                      <CheckSquare className="w-4 h-4 text-blue-600" />
                      {DICTIONARY.contact.form.serviceLabel[lang]}
                    </label>
                    <div className="relative">
                      <select
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        className="w-full px-4 py-3 bg-white text-slate-900 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 appearance-none"
                      >
                        <option value="drinking">{DICTIONARY.contact.form.serviceOptions.drinking[lang]}</option>
                        <option value="petrol">{DICTIONARY.contact.form.serviceOptions.petrol[lang]}</option>
                        <option value="chemical">{DICTIONARY.contact.form.serviceOptions.chemical[lang]}</option>
                        <option value="disinfection">{DICTIONARY.contact.form.serviceOptions.disinfection[lang]}</option>
                        <option value="other">{DICTIONARY.contact.form.serviceOptions.other[lang]}</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        ▼
                      </div>
                    </div>
                  </div>

                  {/* Row Four: Notes */}
                  <div className="space-y-2">
                    <label className="text-xs md:text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                      {DICTIONARY.contact.form.msgLabel[lang]}
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder={DICTIONARY.contact.form.msgPlaceholder[lang]}
                      rows={4}
                      className="w-full px-4 py-3 bg-white text-slate-900 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  {/* Submit trigger button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 active:scale-[0.99] disabled:bg-slate-400 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>
                      {isSubmitting
                        ? DICTIONARY.contact.form.submitting[lang]
                        : DICTIONARY.contact.form.submitBtn[lang]}
                    </span>
                  </button>
                </form>
              </div>

              {/* Aesthetic trust indicators panel */}
              <div className="lg:col-span-5 bg-gradient-to-br from-blue-900 to-blue-950 text-white p-8 md:p-10 rounded-3xl flex flex-col justify-between text-left border border-blue-950 shadow-xl relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-sky-400/20 rounded-full blur-3xl" />
                
                <div className="space-y-6 relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight font-display text-sky-400">
                    {lang === "az"
                      ? "Operativ Mühəndis Müayinəsi"
                      : lang === "en"
                      ? "Rapid Engineering Check"
                      : "Выезд инженера за 5 минут"}
                  </h3>
                  <p className="text-sm text-sky-100/90 leading-relaxed font-light">
                    {lang === "az"
                      ? "Mütəxəssisimiz obyektə yerində baxış keçirir, sisternlərin çirklənmə dərəcəsini qiymətləndirir və sizə ən optimal təmizlik həllini təklif edir."
                      : lang === "en"
                      ? "Our specialist inspects your water systems in person, identifies the hazardous scaling layers, and supplies the best quotes immediately."
                      : "Наш специалист оперативно оценит загрязненность ваших емкостей и разработает детальную смету на очистку."}
                  </p>

                  {/* Quick checks list */}
                  <div className="space-y-3 pt-4 border-t border-sky-800">
                    <div className="flex items-start gap-3">
                      <div className="p-1 bg-sky-400 text-blue-950 rounded-md mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-semibold text-slate-100">
                        {lang === "az" ? "7/24 Qəbul və təcili müdaxilə" : lang === "en" ? "24/7 Emergency support" : "Круглосуточный выезд бригад"}
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-1 bg-sky-400 text-blue-950 rounded-md mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-semibold text-slate-100">
                        {lang === "az" ? "Dezinfeksiya aktlarının təqdimatı" : lang === "en" ? "Certified cleaning reports" : "Предоставляем акты дезинфекции"}
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-1 bg-sky-400 text-blue-950 rounded-md mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-semibold text-slate-100">
                        {lang === "az" ? "Hər növ ödəniş formaları" : lang === "en" ? "All corporate payment systems" : "Все виды наличного/безналичного расчета"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Direct quick support */}
                <div className="pt-8 border-t border-sky-800 mt-8 space-y-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-xl text-sky-400">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-sky-300">Bizimlə birbaşa əlaqə</div>
                      <div className="text-base font-bold text-white">+994 (50) 333-33-22</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-xl text-sky-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-sky-300">E-Poçt Ünvanımız</div>
                      <div className="text-sm font-semibold text-white">info@aquaclean-cisterns.az</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* COMPREHENSIVE TESTING CONSOLE SECTION (FOR THE CLIENT TO SEE INCOMING SUBMISSIONS IN REALTIME) */}
        <section className="py-12 bg-slate-950 border-t border-slate-900">
          <div className="max-w-7xl mx-auto px-4">
            <CallbackDashboard
              currentLang={lang}
              submissions={submissions}
              onUpdateStatus={handleUpdateStatus}
              onClear={handleClearSubmissions}
              onAddDummy={handleAddDummySubmission}
            />
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800 select-none text-left">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-600 rounded-xl text-white">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">AQUACLEAN</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              {DICTIONARY.footer.description[lang]}
            </p>
          </div>

          {/* Col 2: Services checklist */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-mono tracking-widest text-white font-bold">
              {lang === "az" ? "XİDMƏT SEKTORLARI" : lang === "en" ? "SERVICED SECTORS" : "СЕКТОРЫ ОЧИСТКИ"}
            </h4>
            <ul className="text-xs space-y-2.5">
              <li>• {lang === "az" ? "İçməli su çənləri" : lang === "en" ? "Drinking Water Reservoirs" : "Резервуары питьевой воды"}</li>
              <li>• {lang === "az" ? "Dizel və yanacaq çənləri" : lang === "en" ? "Diesel & Fuel Cisterns" : "Топливные резервуары"}</li>
              <li>• {lang === "az" ? "Sənaye anbarları" : lang === "en" ? "Heavy Industrial Tanks" : "Промышленные кубы и цистерны"}</li>
              <li>• {lang === "az" ? "Kimyəvi sistern təmizliyi" : lang === "en" ? "Aggressive Chemical Washing" : "Химико-технологическая мойка"}</li>
            </ul>
          </div>

          {/* Col 3: Address */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-mono tracking-widest text-white font-bold">
              {lang === "az" ? "ÜNVANIMIZ" : lang === "en" ? "OFFICE DETAILS" : "КОНТАКТНЫЕ ДАННЫЕ"}
            </h4>
            <div className="text-xs space-y-3">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>{DICTIONARY.footer.address[lang]}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>+994 (50) 333-33-22</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>info@aquaclean-cisterns.az</span>
              </p>
            </div>
          </div>

          {/* Col 4: Operations hours and permit */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-mono tracking-widest text-white font-bold">
              {lang === "az" ? "FƏALİYYƏT REJİMİ" : lang === "en" ? "WORK HOURS" : "РЕЖИМ РАБОТЫ"}
            </h4>
            <p className="text-xs leading-relaxed text-slate-400">
              {lang === "az"
                ? "Respublika ərazisində 7/24 operativ xidmət qruplarımız fəaliyyət göstərir. Sifarişlər həm fərdi, həm də korporativ qaydada qəbul edilir."
                : lang === "en"
                ? "Our mobile teams work around the clock 24/7. We cater to domestic estates as well as heavy machinery plants."
                : "Рабочие группы выезжают на объекты в режиме 24/7. Принимаем заявки как от физических, так и от юридических лиц."}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs gap-4 text-slate-500">
          <div>
            © {new Date().getFullYear()} AQUACLEAN Cistern Services. {DICTIONARY.footer.rights[lang]}
          </div>

          {/* Scroll to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
          >
            <span>{DICTIONARY.footer.top[lang]}</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </footer>

      {/* SUCCESS MODAL FOR THE FORM SUBMISSION */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center space-y-6 relative border border-sky-100"
            >
              {/* Animated checkmark circle */}
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mx-auto border-2 border-emerald-400/30">
                <Check className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  {DICTIONARY.contact.form.successHeader[lang]}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {DICTIONARY.contact.form.successSub[lang]}
                </p>
              </div>

              {/* Dismiss button */}
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Tamam (OK)
              </button>

              <p className="text-[10px] text-slate-400 font-mono italic">
                (Sandbox update: form saved to your dashboard submissions table below)
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ADMIN PANEL LIVE CONFIGURATION TOOL */}
      <AdminPanel
        navLinks={navLinks}
        setNavLinks={setNavLinks}
        services={services}
        setServices={setServices}
        advantages={advantages}
        setAdvantages={setAdvantages}
        portfolio={portfolio}
        setPortfolio={setPortfolio}
        reviews={reviews}
        setReviews={setReviews}
        heroTexts={heroTexts}
        setHeroTexts={setHeroTexts}
        statsTexts={statsTexts}
        setStatsTexts={setStatsTexts}
        submissions={submissions}
        onUpdateStatus={handleUpdateStatus}
        onClearSubmissions={handleClearSubmissions}
        onResetAllData={handleResetAllData}
      />
    </div>
  );
}
