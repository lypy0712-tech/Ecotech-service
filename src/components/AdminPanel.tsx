import React, { useState } from "react";
import {
  X,
  Settings,
  Plus,
  Trash2,
  Save,
  Check,
  Grid,
  Image,
  MessageSquare,
  PlusCircle,
  RotateCcw,
  FileText,
  Info,
  Copy,
  Sliders,
  Sparkles,
  Award,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ExternalLink
} from "lucide-react";
import { Language, NavLink, ServiceItem, AdvantageItem, PortfolioItem, ReviewItem, CallbackSubmission } from "../types";
import { DICTIONARY } from "../data";


interface AdminPanelProps {
  isStandAlone?: boolean;
  navLinks: NavLink[];
  setNavLinks: React.Dispatch<React.SetStateAction<NavLink[]>>;
  services: ServiceItem[];
  setServices: React.Dispatch<React.SetStateAction<ServiceItem[]>>;
  advantages: AdvantageItem[];
  setAdvantages: React.Dispatch<React.SetStateAction<AdvantageItem[]>>;
  portfolio: PortfolioItem[];
  setPortfolio: React.Dispatch<React.SetStateAction<PortfolioItem[]>>;
  reviews: ReviewItem[];
  setReviews: React.Dispatch<React.SetStateAction<ReviewItem[]>>;
  heroTexts: {
    title: Record<Language, string>;
    subtitle: Record<Language, string>;
    tagline: Record<Language, string>;
  };
  setHeroTexts: (texts: any) => void;
  statsTexts: {
    jobs: string;
    experience: string;
    happyClients: string;
    responseTime: string;
  };
  setStatsTexts: (stats: any) => void;
  submissions: CallbackSubmission[];
  onUpdateStatus: (id: string, nextStatus: "pending" | "called" | "rejected") => void;
  onClearSubmissions: () => void;
  onResetAllData: () => void;
}

export default function AdminPanel({
  isStandAlone = false,
  navLinks,
  setNavLinks,
  services,
  setServices,
  advantages,
  setAdvantages,
  portfolio,
  setPortfolio,
  reviews,
  setReviews,
  heroTexts,
  setHeroTexts,
  statsTexts,
  setStatsTexts,
  submissions,
  onUpdateStatus,
  onClearSubmissions,
  onResetAllData,
}: AdminPanelProps) {
  // Authentication states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("aquaclean_cms_auth") === "true";
  });
  const [authError, setAuthError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().toLowerCase() === "admin" && password.trim() === "admin") {
      setIsLoggedIn(true);
      localStorage.setItem("aquaclean_cms_auth", "true");
      setAuthError("");
    } else {
      setAuthError("Yalnış istifadəçi adı və ya şifrə! / Неверный логин или пароль!");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("aquaclean_cms_auth");
  };

  // Customizable sections dictionary state
  const [sectionsDict, setSectionsDict] = useState(() => {
    return {
      servicesTitle: {
        az: DICTIONARY.services.title.az,
        en: DICTIONARY.services.title.en,
        ru: DICTIONARY.services.title.ru,
      },
      servicesSubtitle: {
        az: DICTIONARY.services.subtitle.az,
        en: DICTIONARY.services.subtitle.en,
        ru: DICTIONARY.services.subtitle.ru,
      },
      advantagesTitle: {
        az: DICTIONARY.advantages.title.az,
        en: DICTIONARY.advantages.title.en,
        ru: DICTIONARY.advantages.title.ru,
      },
      advantagesSubtitle: {
        az: DICTIONARY.advantages.subtitle.az,
        en: DICTIONARY.advantages.subtitle.en,
        ru: DICTIONARY.advantages.subtitle.ru,
      },
      portfolioTitle: {
        az: DICTIONARY.portfolio.title.az,
        en: DICTIONARY.portfolio.title.en,
        ru: DICTIONARY.portfolio.title.ru,
      },
      portfolioSubtitle: {
        az: DICTIONARY.portfolio.subtitle.az,
        en: DICTIONARY.portfolio.subtitle.en,
        ru: DICTIONARY.portfolio.subtitle.ru,
      },
      reviewsTitle: {
        az: DICTIONARY.reviews.title.az,
        en: DICTIONARY.reviews.title.en,
        ru: DICTIONARY.reviews.title.ru,
      },
      reviewsSubtitle: {
        az: DICTIONARY.reviews.subtitle.az,
        en: DICTIONARY.reviews.subtitle.en,
        ru: DICTIONARY.reviews.subtitle.ru,
      },
      contactTitle: {
        az: DICTIONARY.contact.title.az,
        en: DICTIONARY.contact.title.en,
        ru: DICTIONARY.contact.title.ru,
      },
      contactSubtitle: {
        az: DICTIONARY.contact.subtitle.az,
        en: DICTIONARY.contact.subtitle.en,
        ru: DICTIONARY.contact.subtitle.ru,
      },
      footerDesc: {
        az: DICTIONARY.footer.description.az,
        en: DICTIONARY.footer.description.en,
        ru: DICTIONARY.footer.description.ru,
      },
      footerAddr: {
        az: DICTIONARY.footer.address.az,
        en: DICTIONARY.footer.address.en,
        ru: DICTIONARY.footer.address.ru,
      },
    };
  });

  const handleSectionsDictChange = (sectionKey: keyof typeof sectionsDict, langKey: Language, val: string) => {
    const updated = {
      ...sectionsDict,
      [sectionKey]: {
        ...sectionsDict[sectionKey],
        [langKey]: val,
      }
    };
    setSectionsDict(updated);

    // Save and merge update to DICTIONARY in real-time
    const customDictJson = {
      services: {
        title: updated.servicesTitle,
        subtitle: updated.servicesSubtitle,
      },
      advantages: {
        title: updated.advantagesTitle,
        subtitle: updated.advantagesSubtitle,
      },
      portfolio: {
        title: updated.portfolioTitle,
        subtitle: updated.portfolioSubtitle,
      },
      reviews: {
        title: updated.reviewsTitle,
        subtitle: updated.reviewsSubtitle,
      },
      contact: {
        title: updated.contactTitle,
        subtitle: updated.contactSubtitle,
      },
      footer: {
        description: updated.footerDesc,
        address: updated.footerAddr,
      }
    };

    localStorage.setItem("aquaclean_custom_dictionary", JSON.stringify(customDictJson));
    
    // Also merge instantly to current session DICTIONARY object
    Object.assign(DICTIONARY.services.title, updated.servicesTitle);
    Object.assign(DICTIONARY.services.subtitle, updated.servicesSubtitle);
    Object.assign(DICTIONARY.advantages.title, updated.advantagesTitle);
    Object.assign(DICTIONARY.advantages.subtitle, updated.advantagesSubtitle);
    Object.assign(DICTIONARY.portfolio.title, updated.portfolioTitle);
    Object.assign(DICTIONARY.portfolio.subtitle, updated.portfolioSubtitle);
    Object.assign(DICTIONARY.reviews.title, updated.reviewsTitle);
    Object.assign(DICTIONARY.reviews.subtitle, updated.reviewsSubtitle);
    Object.assign(DICTIONARY.contact.title, updated.contactTitle);
    Object.assign(DICTIONARY.contact.subtitle, updated.contactSubtitle);
    Object.assign(DICTIONARY.footer.description, updated.footerDesc);
    Object.assign(DICTIONARY.footer.address, updated.footerAddr);
  };


  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"menu" | "services" | "advantages" | "portfolio" | "hero" | "submissions">("menu");
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  // States for New Items Forms
  // 1. Menu Node
  const [newMenuId, setNewMenuId] = useState("");
  const [newMenuLabelAz, setNewMenuLabelAz] = useState("");
  const [newMenuLabelEn, setNewMenuLabelEn] = useState("");
  const [newMenuLabelRu, setNewMenuLabelRu] = useState("");

  // 2. Service Item
  const [newServiceTitleAz, setNewServiceTitleAz] = useState("");
  const [newServiceTitleEn, setNewServiceTitleEn] = useState("");
  const [newServiceTitleRu, setNewServiceTitleRu] = useState("");
  const [newServiceDescAz, setNewServiceDescAz] = useState("");
  const [newServiceDescEn, setNewServiceDescEn] = useState("");
  const [newServiceDescRu, setNewServiceDescRu] = useState("");
  const [newServicePriceAz, setNewServicePriceAz] = useState("");
  const [newServicePriceEn, setNewServicePriceEn] = useState("");
  const [newServicePriceRu, setNewServicePriceRu] = useState("");
  const [newServiceIcon, setNewServiceIcon] = useState("Droplets");

  // 3. Advantage Item
  const [newAdvTitleAz, setNewAdvTitleAz] = useState("");
  const [newAdvTitleEn, setNewAdvTitleEn] = useState("");
  const [newAdvTitleRu, setNewAdvTitleRu] = useState("");
  const [newAdvDescAz, setNewAdvDescAz] = useState("");
  const [newAdvDescEn, setNewAdvDescEn] = useState("");
  const [newAdvDescRu, setNewAdvDescRu] = useState("");
  const [newAdvIcon, setNewAdvIcon] = useState("Activity");

  // 4. Portfolio Item
  const [newPortTitleAz, setNewPortTitleAz] = useState("");
  const [newPortTitleEn, setNewPortTitleEn] = useState("");
  const [newPortTitleRu, setNewPortTitleRu] = useState("");
  const [newPortDescAz, setNewPortDescAz] = useState("");
  const [newPortDescEn, setNewPortDescEn] = useState("");
  const [newPortDescRu, setNewPortDescRu] = useState("");
  const [newPortBeforeImg, setNewPortBeforeImg] = useState("https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800");
  const [newPortAfterImg, setNewPortAfterImg] = useState("https://images.unsplash.com/photo-1581091215367-9b6c00b3035a?auto=format&fit=crop&q=80&w=800");

  const handleCopyLink = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Nav Links Handlers
  const handleAddNavLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMenuId.trim()) return;
    const formattedId = newMenuId.trim().toLowerCase().replace(/\s+/g, "-");
    const labelAz = newMenuLabelAz.trim() || newMenuId;
    const labelEn = newMenuLabelEn.trim() || newMenuId;
    const labelRu = newMenuLabelRu.trim() || newMenuId;

    const updated = [
      ...navLinks,
      {
        id: formattedId,
        label: { az: labelAz, en: labelEn, ru: labelRu },
      },
    ];
    setNavLinks(updated);
    localStorage.setItem("aquaclean_nav_links", JSON.stringify(updated));

    // Clear form
    setNewMenuId("");
    setNewMenuLabelAz("");
    setNewMenuLabelEn("");
    setNewMenuLabelRu("");
  };

  const handleDeleteNavLink = (id: string) => {
    const updated = navLinks.filter((n) => n.id !== id);
    setNavLinks(updated);
    localStorage.setItem("aquaclean_nav_links", JSON.stringify(updated));
  };

  // Service Items Handlers
  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceTitleAz.trim()) return;

    const newService: ServiceItem = {
      id: Date.now(),
      title: {
        az: newServiceTitleAz.trim(),
        en: newServiceTitleEn.trim() || newServiceTitleAz.trim(),
        ru: newServiceTitleRu.trim() || newServiceTitleAz.trim(),
      },
      description: {
        az: newServiceDescAz.trim() || "Təsvir əlavə edilməyib.",
        en: newServiceDescEn.trim() || "No description provided.",
        ru: newServiceDescRu.trim() || "Описание отсутствует.",
      },
      price: {
        az: newServicePriceAz.trim() || "Sifarişlə",
        en: newServicePriceEn.trim() || "On Request",
        ru: newServicePriceRu.trim() || "По запросу",
      },
      iconName: newServiceIcon,
    };

    const updated = [...services, newService];
    setServices(updated);
    localStorage.setItem("aquaclean_services", JSON.stringify(updated));

    // Clear
    setNewServiceTitleAz("");
    setNewServiceTitleEn("");
    setNewServiceTitleRu("");
    setNewServiceDescAz("");
    setNewServiceDescEn("");
    setNewServiceDescRu("");
    setNewServicePriceAz("");
    setNewServicePriceEn("");
    setNewServicePriceRu("");
  };

  const handleDeleteService = (id: number) => {
    const updated = services.filter((s) => s.id !== id);
    setServices(updated);
    localStorage.setItem("aquaclean_services", JSON.stringify(updated));
  };

  // Advantages Handlers
  const handleAddAdvantage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdvTitleAz.trim()) return;

    const newAdv: AdvantageItem = {
      id: Date.now(),
      title: {
        az: newAdvTitleAz.trim(),
        en: newAdvTitleEn.trim() || newAdvTitleAz.trim(),
        ru: newAdvTitleRu.trim() || newAdvTitleAz.trim(),
      },
      description: {
        az: newAdvDescAz.trim() || "Təsvir yoxdur",
        en: newAdvDescEn.trim() || "No description",
        ru: newAdvDescRu.trim() || "Без описания",
      },
      iconName: newAdvIcon,
    };

    const updated = [...advantages, newAdv];
    setAdvantages(updated);
    localStorage.setItem("aquaclean_advantages", JSON.stringify(updated));

    // Clear
    setNewAdvTitleAz("");
    setNewAdvTitleEn("");
    setNewAdvTitleRu("");
    setNewAdvDescAz("");
    setNewAdvDescEn("");
    setNewAdvDescRu("");
  };

  const handleDeleteAdvantage = (id: number) => {
    const updated = advantages.filter((a) => a.id !== id);
    setAdvantages(updated);
    localStorage.setItem("aquaclean_advantages", JSON.stringify(updated));
  };

  // Portfolio Handlers
  const handleAddPortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortTitleAz.trim()) return;

    const newPort: PortfolioItem = {
      id: Date.now(),
      title: {
        az: newPortTitleAz.trim(),
        en: newPortTitleEn.trim() || newPortTitleAz.trim(),
        ru: newPortTitleRu.trim() || newPortTitleAz.trim(),
      },
      description: {
        az: newPortDescAz.trim() || "Təsvir yoxdur",
        en: newPortDescEn.trim() || "No description",
        ru: newPortDescRu.trim() || "Без описания",
      },
      beforeImg: newPortBeforeImg.trim(),
      afterImg: newPortAfterImg.trim(),
    };

    const updated = [...portfolio, newPort];
    setPortfolio(updated);
    localStorage.setItem("aquaclean_portfolio", JSON.stringify(updated));

    // Clear
    setNewPortTitleAz("");
    setNewPortTitleEn("");
    setNewPortTitleRu("");
    setNewPortDescAz("");
    setNewPortDescEn("");
    setNewPortDescRu("");
  };

  const handleDeletePortfolio = (id: number) => {
    const updated = portfolio.filter((p) => p.id !== id);
    setPortfolio(updated);
    localStorage.setItem("aquaclean_portfolio", JSON.stringify(updated));
  };

  // Text Inputs Edit Handlers
  const handleHeroTextChange = (langKey: Language, field: "title" | "subtitle" | "tagline", val: string) => {
    const updated = {
      ...heroTexts,
      [field]: {
        ...heroTexts[field],
        [langKey]: val,
      },
    };
    setHeroTexts(updated);
    localStorage.setItem("aquaclean_hero_texts", JSON.stringify(updated));
  };

  const handleStatsChange = (field: "jobs" | "experience" | "happyClients" | "responseTime", val: string) => {
    const updated = {
      ...statsTexts,
      [field]: val,
    };
    setStatsTexts(updated);
    localStorage.setItem("aquaclean_stats_texts", JSON.stringify(updated));
  };

  if (isStandAlone) {
    if (!isLoggedIn) {
      return (
        <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 border border-slate-100 text-slate-800 relative overflow-hidden">
            <div className="text-center space-y-2 mb-6">
              <div className="mx-auto w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-1">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold tracking-tight text-slate-900">AQUACLEAN CMS</h2>
              <p className="text-[11px] text-slate-500 font-medium">Saytın İdarəetmə Panelini açmaq üçün daxil olun</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3 text-left">
              {authError && (
                <div className="p-2.5 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100 font-medium text-center">
                  {authError}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700">İstifadəçi adı (Username)</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-xl bg-slate-50 text-xs text-slate-900 outline-none focus:border-blue-600 focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700">Şifrə (Password)</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="******"
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-xl bg-slate-50 text-xs text-slate-900 outline-none focus:border-blue-600 focus:bg-white transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer mt-2"
              >
                <span>Daxil Ol</span>
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center text-[10px] text-slate-400 font-mono">
              <span className="font-bold text-blue-650">Giriş məlumatları:</span>
              <div className="mt-1 flex justify-center gap-3 text-[10px] text-slate-500">
                <span>Login: <strong>admin</strong></span>
                <span>Şifrə: <strong>admin</strong></span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full bg-white min-h-screen flex flex-col overflow-hidden text-slate-800">
        {/* Standalone CMS Top bar */}
        <div className="bg-slate-950 text-white p-4 flex flex-col sm:flex-row justify-between items-center gap-3 border-b border-blue-950 select-none">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Settings className="w-5 h-5 text-sky-100 animate-spin-slow" />
            </div>
            <div className="text-left">
              <h3 className="text-sm font-bold text-white tracking-tight">AquaClean CMS • İdarəetmə Paneli</h3>
              <p className="text-[10px] text-slate-400 font-mono">Yeni Vərəqdə İdarəetmə Paneli (Standalone • Local Storage & SMTP Alerts)</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/"
              className="px-3 py-1.5 hover:bg-white/10 rounded-xl text-sky-300 hover:text-white transition-all font-semibold flex items-center gap-1.5 text-xs border border-white/10 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Sayta keçid et</span>
            </a>
            <button
              onClick={onResetAllData}
              title="Восстановить исходные данные сайта"
              className="px-3 py-1.5 hover:bg-white/10 rounded-xl text-rose-400 hover:text-rose-300 transition-all font-semibold flex items-center gap-1.5 text-xs border border-white/10 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Saytı sıfırla</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer select-none"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-300" />
              <span>Çıxış (Logout)</span>
            </button>
          </div>
        </div>

        {/* Tab switcher inside CMS */}
        <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap gap-1.5 overflow-x-auto select-none">
          {[
            { id: "menu", label: "Навигация (Меню)", icon: <RotateCcw className="w-4 h-4" /> },
            { id: "services", label: "Услуги (Раздел)", icon: <Grid className="w-4 h-4" /> },
            { id: "advantages", label: "Преимущества (Bento)", icon: <Award className="w-4 h-4" /> },
            { id: "portfolio", label: "Работы (До/После)", icon: <Image className="w-4 h-4" /> },
            { id: "hero", label: "Главные Тексты / Статистика", icon: <FileText className="w-4 h-4" /> },
            {
              id: "submissions",
              label: `Заявки с сайта (${submissions.length})`,
              icon: <MessageSquare className="w-4 h-4" />,
              badge: submissions.filter((s) => s.status === "pending").length,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 cursor-pointer select-none ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="bg-rose-500 text-white font-bold text-[9px] px-1.5 py-0.5 rounded-full inline-block leading-none">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* CMS Tab Viewports */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6 text-left">
          {/* TAB 1: MENU LINKS */}
          {activeTab === "menu" && (
            <div className="space-y-6">
              <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-blue-900 leading-relaxed space-y-1">
                  <p className="font-semibold">Как работает меню сайта?</p>
                  <p>Каждая вкладка меню ссылается на соответствующий ID секции на странице. При клике на неё страница будет плавно прокручиваться к этой секции. Вы можете добавлять произвольные локальные или внешние ссылки.</p>
                  <p className="font-mono text-[10px] text-blue-700 bg-blue-100/60 px-1 py-0.5 rounded inline">
                    ID по умолчанию: hero, services, advantages, portfolio, reviews, contact
                  </p>
                </div>
              </div>

              {/* Current Nav Links Table */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Текущие пункты меню:</h4>
                <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-sm">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold">
                        <th className="p-3">Якорь (ID)</th>
                        <th className="p-3">Азербайджанский (AZ)</th>
                        <th className="p-3">Английский (EN)</th>
                        <th className="p-3">Русский (RU)</th>
                        <th className="p-3 text-right">Действие</th>
                      </tr>
                    </thead>
                    <tbody>
                      {navLinks.map((link) => (
                        <tr key={link.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                          <td className="p-3 font-mono text-blue-700 font-bold">#{link.id}</td>
                          <td className="p-3 text-slate-800">{link.label.az}</td>
                          <td className="p-3 text-slate-800">{link.label.en}</td>
                          <td className="p-3 text-slate-800">{link.label.ru}</td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleDeleteNavLink(link.id)}
                              className="text-rose-500 hover:text-rose-700 p-1 rounded-md hover:bg-rose-50 cursor-pointer"
                              title="Удалить пункт меню"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Add New Menu Link Form */}
              <form onSubmit={handleAddNavLink} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
                <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <PlusCircle className="w-3.5 h-3.5 text-blue-600" />
                  Добавление нового пункта меню:
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Идентификатор / Якорь секции # *</label>
                    <input
                      type="text"
                      value={newMenuId}
                      onChange={(e) => setNewMenuId(e.target.value)}
                      placeholder="Məsələn: about, gallery, price"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-xs text-slate-900 outline-none focus:border-blue-600"
                    />
                  </div>
                  <div className="space-y-1.5 select-none text-slate-500">
                    <label className="text-xs font-semibold text-slate-700">Азербайджанский лейбл (AZ) *</label>
                    <input
                      type="text"
                      value={newMenuLabelAz}
                      onChange={(e) => setNewMenuLabelAz(e.target.value)}
                      placeholder="Haqqımızda"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-xs text-slate-900 outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 font-sans">English translation Label (EN)</label>
                    <input
                      type="text"
                      value={newMenuLabelEn}
                      onChange={(e) => setNewMenuLabelEn(e.target.value)}
                      placeholder="About Us"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-xs text-slate-900 outline-none focus:border-blue-600"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Русский перевод Меню (RU)</label>
                    <input
                      type="text"
                      value={newMenuLabelRu}
                      onChange={(e) => setNewMenuLabelRu(e.target.value)}
                      placeholder="О Нас"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-xs text-slate-900 outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Создать пункт меню</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: SERVICES */}
              {activeTab === "services" && (
                <div className="space-y-6">
                  {/* Current Services List */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Существующие услуги:</h4>
                    <div className="grid grid-cols-1 gap-4">
                      {services.map((item) => (
                        <div key={item.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-start gap-4">
                          <div className="space-y-1.5 text-left">
                            <span className="inline-block bg-blue-100 text-blue-700 font-mono font-bold text-[10px] px-2 py-0.5 rounded">
                              Иконка: {item.iconName} • ID-услуги: {item.id}
                            </span>
                            <h5 className="font-bold text-slate-900 text-sm">
                              🇦🇿 {item.title.az} <br />
                              💬 {item.title.ru}
                            </h5>
                            <p className="text-xs text-slate-500 leading-relaxed font-light">
                              {item.description.ru}
                            </p>
                            <p className="text-xs font-semibold text-blue-700">Цена: {item.price?.ru || "—"}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteService(item.id)}
                            className="text-rose-500 hover:text-rose-700 p-2 rounded-xl hover:bg-rose-50 cursor-pointer"
                            title="Удалить услугу"
                          >
                            <Trash2 className="w-4.5 h-4.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add Service item */}
                  <form onSubmit={handleAddService} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4 text-left">
                    <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <PlusCircle className="w-3.5 h-3.5 text-blue-600" />
                      Добавление новой услуги:
                    </h4>

                    {/* Localised titles */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-800">1. Названия услуги на 3-х языках *</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input
                          type="text"
                          required
                          value={newServiceTitleAz}
                          onChange={(e) => setNewServiceTitleAz(e.target.value)}
                          placeholder="AZ: Su Çənlərinin təmizlənməsi"
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-xs text-slate-900 outline-none"
                        />
                        <input
                          type="text"
                          value={newServiceTitleEn}
                          onChange={(e) => setNewServiceTitleEn(e.target.value)}
                          placeholder="EN: Drinking Water Tank Cleanup"
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-xs text-slate-900 outline-none"
                        />
                        <input
                          type="text"
                          value={newServiceTitleRu}
                          onChange={(e) => setNewServiceTitleRu(e.target.value)}
                          placeholder="RU: Очистка баков для воды"
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-xs text-slate-900 outline-none"
                        />
                      </div>
                    </div>

                    {/* Localised Descriptions */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-800">2. Описание услуги на 3-х языках</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <textarea
                          value={newServiceDescAz}
                          onChange={(e) => setNewServiceDescAz(e.target.value)}
                          placeholder="AZ: Geniş təsvir..."
                          rows={2}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-xs text-slate-900 outline-none"
                        />
                        <textarea
                          value={newServiceDescEn}
                          onChange={(e) => setNewServiceDescEn(e.target.value)}
                          placeholder="EN: Clean reservoirs with care..."
                          rows={2}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-xs text-slate-900 outline-none"
                        />
                        <textarea
                          value={newServiceDescRu}
                          onChange={(e) => setNewServiceDescRu(e.target.value)}
                          placeholder="RU: Качественная мойка поверхностей..."
                          rows={2}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-xs text-slate-900 outline-none"
                        />
                      </div>
                    </div>

                    {/* Price and Icon mapping */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Price fields */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-800">3. Цены (AZ, EN, RU)</label>
                        <div className="grid grid-cols-3 gap-2">
                          <input
                            type="text"
                            value={newServicePriceAz}
                            onChange={(e) => setNewServicePriceAz(e.target.value)}
                            placeholder="50 AZN-dən"
                            className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs"
                          />
                          <input
                            type="text"
                            value={newServicePriceEn}
                            onChange={(e) => setNewServicePriceEn(e.target.value)}
                            placeholder="From 50 AZN"
                            className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs"
                          />
                          <input
                            type="text"
                            value={newServicePriceRu}
                            onChange={(e) => setNewServicePriceRu(e.target.value)}
                            placeholder="От 50 AZN"
                            className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs"
                          />
                        </div>
                      </div>

                      {/* Icon designation selector */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-800">4. Выберите иконку услуги</label>
                        <select
                          value={newServiceIcon}
                          onChange={(e) => setNewServiceIcon(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white text-slate-800"
                        >
                          <option value="Droplets">💧 Капли (Droplets)</option>
                          <option value="Fuel">⛽ Топливо (Fuel)</option>
                          <option value="Settings">⚙️ Снаряжение (Settings)</option>
                          <option value="ShieldCheck">🛡️ Защита (ShieldCheck)</option>
                          <option value="Activity">📈 График (Activity)</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Добавить Услугу</span>
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 3: ADVANTAGES */}
              {activeTab === "advantages" && (
                <div className="space-y-6">
                  {/* Current list */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Существующие преимущества:</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {advantages.map((adv) => (
                        <div key={adv.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center text-left">
                          <div>
                            <span className="font-mono text-[10px] text-blue-600 bg-sky-100 px-1.5 py-0.5 rounded leading-none font-bold mr-2">
                              {adv.iconName}
                            </span>
                            <span className="font-bold text-xs text-slate-900">{adv.title.ru}</span>
                            <p className="text-[11px] text-slate-500 mt-1 leading-normal">{adv.description.ru}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteAdvantage(adv.id)}
                            className="text-rose-500 hover:text-rose-700 p-1 rounded-lg hover:bg-rose-50 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add Advantage Item Form */}
                  <form onSubmit={handleAddAdvantage} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4 text-left">
                    <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <PlusCircle className="w-3.5 h-3.5 text-blue-600" />
                      Добавить Новое Преимущество:
                    </h4>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700">Заголовки (AZ, EN, RU) *</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input
                          type="text"
                          required
                          value={newAdvTitleAz}
                          onChange={(e) => setNewAdvTitleAz(e.target.value)}
                          placeholder="AZ: 100% Zəmanət"
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-xs"
                        />
                        <input
                          type="text"
                          value={newAdvTitleEn}
                          onChange={(e) => setNewAdvTitleEn(e.target.value)}
                          placeholder="EN: 100% Quality Output"
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-xs"
                        />
                        <input
                          type="text"
                          value={newAdvTitleRu}
                          onChange={(e) => setNewAdvTitleRu(e.target.value)}
                          placeholder="RU: 100% Гарантия"
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700">Текст преимущества (AZ, EN, RU)</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input
                          type="text"
                          value={newAdvDescAz}
                          onChange={(e) => setNewAdvDescAz(e.target.value)}
                          placeholder="AZ: Əla komanda ilə..."
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white"
                        />
                        <input
                          type="text"
                          value={newAdvDescEn}
                          onChange={(e) => setNewAdvDescEn(e.target.value)}
                          placeholder="EN: With specialized agents..."
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white"
                        />
                        <input
                          type="text"
                          value={newAdvDescRu}
                          onChange={(e) => setNewAdvDescRu(e.target.value)}
                          placeholder="RU: С нашей квалифицированной бригадой..."
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700">Иконка преимущества</label>
                      <select
                          value={newAdvIcon}
                          onChange={(e) => setNewAdvIcon(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white text-slate-800"
                        >
                          <option value="Activity">🛡️ Сертификат (Activity)</option>
                          <option value="Cpu">⚡ Немецкие машины (Cpu)</option>
                          <option value="FileCheck">📝 Договор с НДС (FileCheck)</option>
                          <option value="Leaf">🌱 Экологично (Leaf)</option>
                        </select>
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Добавить преимущество</span>
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 4: PORTFOLIO */}
              {activeTab === "portfolio" && (
                <div className="space-y-6">
                  {/* Current Portfolio Items */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Существующие работы (Слайдер):</h4>
                    <div className="grid grid-cols-1 gap-4">
                      {portfolio.map((item) => (
                        <div key={item.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col sm:flex-row justify-between gap-4 text-left">
                          <div className="space-y-2 flex-grow">
                            <span className="inline-block bg-blue-100 text-blue-800 font-mono text-[9px] px-2 py-0.5 rounded font-bold">
                              ID: {item.id}
                            </span>
                            <h5 className="font-bold text-slate-900 text-sm">{item.title.ru || item.title.az}</h5>
                            <p className="text-xs text-slate-500 leading-relaxed font-light">{item.description.ru || item.description.az}</p>
                            
                            {/* Images links debug & copy */}
                            <div className="grid grid-cols-2 gap-3 pt-2">
                              <div className="bg-white p-2 rounded-xl border border-slate-200">
                                <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">До (Before Imag URL):</span>
                                <span className="text-[10px] text-slate-600 font-mono block truncate">{item.beforeImg}</span>
                              </div>
                              <div className="bg-white p-2 rounded-xl border border-slate-200">
                                <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">После (After Imag URL):</span>
                                <span className="text-[10px] text-slate-600 font-mono block truncate">{item.afterImg}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex sm:flex-col justify-between items-end gap-2 flex-shrink-0">
                            <button
                              onClick={() => handleDeletePortfolio(item.id)}
                              className="text-rose-500 hover:text-rose-700 p-2 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Удалить работу из слайдера"
                            >
                              <Trash2 className="w-4.5 h-4.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add New Finished Work Portfolio item */}
                  <form onSubmit={handleAddPortfolio} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4 text-left">
                    <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <PlusCircle className="w-3.5 h-3.5 text-blue-600" />
                      Добавить новую фотоработу в Слайдер (До и После):
                    </h4>

                    {/* Titles */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700">Заголовок AZ *</label>
                        <input
                          type="text"
                          required
                          value={newPortTitleAz}
                          onChange={(e) => setNewPortTitleAz(e.target.value)}
                          placeholder="Sumqayıt təmizlik işi"
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-xs text-slate-900 outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700 font-sans">Title EN</label>
                        <input
                          type="text"
                          value={newPortTitleEn}
                          onChange={(e) => setNewPortTitleEn(e.target.value)}
                          placeholder="Sumgait Clean job"
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-xs text-slate-900 outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700">Заголовок RU</label>
                        <input
                          type="text"
                          value={newPortTitleRu}
                          onChange={(e) => setNewPortTitleRu(e.target.value)}
                          placeholder="Мойка в Сумгаите"
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-xs text-slate-900 outline-none"
                        />
                      </div>
                    </div>

                    {/* Descriptions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700">Описание AZ</label>
                        <textarea
                          value={newPortDescAz}
                          onChange={(e) => setNewPortDescAz(e.target.value)}
                          rows={2}
                          placeholder="AZ təsvir..."
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-xs text-slate-900 outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700 font-sans">Description EN</label>
                        <textarea
                          value={newPortDescEn}
                          onChange={(e) => setNewPortDescEn(e.target.value)}
                          rows={2}
                          placeholder="EN description..."
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-xs text-slate-900 outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700">Описание RU</label>
                        <textarea
                          value={newPortDescRu}
                          onChange={(e) => setNewPortDescRu(e.target.value)}
                          rows={2}
                          placeholder="RU описание..."
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-xs text-slate-900 outline-none"
                        />
                      </div>
                    </div>

                    {/* Images URLs inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-800">Ссылка на фотографию «ДО» (Before Image URL) *</label>
                        <input
                          type="text"
                          required
                          value={newPortBeforeImg}
                          onChange={(e) => setNewPortBeforeImg(e.target.value)}
                          placeholder="https://images.unsplash.com/... or relative path"
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white font-mono text-xs text-slate-900 outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-800">Ссылка на фотографию «ПОСЛЕ» (After Image URL) *</label>
                        <input
                          type="text"
                          required
                          value={newPortAfterImg}
                          onChange={(e) => setNewPortAfterImg(e.target.value)}
                          placeholder="https://images.unsplash.com/... or relative path"
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white font-mono text-xs text-slate-900 outline-none"
                        />
                      </div>
                    </div>

                    {/* Image preset catalog drawer shortcuts for quick validation */}
                    <div className="bg-slate-100 p-3.5 rounded-xl border border-slate-200 space-y-2 text-left">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block leading-none">
                        💡 Быстрые пресеты изображений из Unsplash (можно скопировать в буфер кликом):
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        {[
                          {
                            label: "Изначальные грязная/чистая цистерна",
                            b: "cistern_dirty_before",
                            a: "cistern_shiny_after",
                          },
                          {
                            label: "Промышленный резервуар из Unsplash (Очистка от нефти)",
                            b: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800",
                            a: "https://images.unsplash.com/photo-1581091215367-9b6c00b3035a?auto=format&fit=crop&q=80&w=800",
                          },
                          {
                            label: "Бетонный коллектор сточных вод",
                            b: "https://images.unsplash.com/photo-1542060748-10c28b629f6f?auto=format&fit=crop&q=80&w=800",
                            a: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800",
                          },
                        ].map((pr, idx) => (
                          <div key={idx} className="bg-white p-2 rounded border border-slate-200 space-y-1">
                            <span className="font-semibold block text-slate-700">{pr.label}</span>
                            <div className="flex gap-1">
                              <button
                                type="button"
                                onClick={() => handleCopyLink(pr.b, `b-${idx}`)}
                                className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded scale-95 flex items-center gap-0.5 truncate max-w-[120px]"
                              >
                                {copiedIndex === `b-${idx}` ? "Скопировано!" : "Копи До"}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleCopyLink(pr.a, `a-${idx}`)}
                                className="bg-green-50 text-green-700 px-1.5 py-0.5 rounded scale-95 flex items-center gap-0.5 truncate max-w-[120px]"
                              >
                                {copiedIndex === `a-${idx}` ? "Скопировано!" : "Копи После"}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Создать фотослайд</span>
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 5: HERO GENERAL TEXTS */}
              {activeTab === "hero" && (
                <div className="space-y-6 text-left">
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1 border-b border-slate-200 pb-2">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      Главный экран сайта (Hero Portion):
                    </h4>

                    {/* Taglines */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Надзаголовок (Tagline):</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-slate-400">AZ</span>
                          <input
                            type="text"
                            value={heroTexts.tagline.az}
                            onChange={(e) => handleHeroTextChange("az", "tagline", e.target.value)}
                            className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-slate-400">EN</span>
                          <input
                            type="text"
                            value={heroTexts.tagline.en}
                            onChange={(e) => handleHeroTextChange("en", "tagline", e.target.value)}
                            className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-slate-400 font-sans">RU</span>
                          <input
                            type="text"
                            value={heroTexts.tagline.ru}
                            onChange={(e) => handleHeroTextChange("ru", "tagline", e.target.value)}
                            className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Main title */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Главный заголовок сайта:</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-slate-400">AZ</span>
                          <textarea
                            value={heroTexts.title.az}
                            onChange={(e) => handleHeroTextChange("az", "title", e.target.value)}
                            rows={2}
                            className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-slate-400">EN</span>
                          <textarea
                            value={heroTexts.title.en}
                            onChange={(e) => handleHeroTextChange("en", "title", e.target.value)}
                            rows={2}
                            className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                          />
                        </div>
                        <div className="space-y-1 font-sans">
                          <span className="text-[10px] font-mono text-slate-400">RU</span>
                          <textarea
                            value={heroTexts.title.ru}
                            onChange={(e) => handleHeroTextChange("ru", "title", e.target.value)}
                            rows={2}
                            className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Hero subtitle */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Развернутое описание (Подзаголовок):</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-slate-400">AZ</span>
                          <textarea
                            value={heroTexts.subtitle.az}
                            onChange={(e) => handleHeroTextChange("az", "subtitle", e.target.value)}
                            rows={3}
                            className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-slate-400">EN</span>
                          <textarea
                            value={heroTexts.subtitle.en}
                            onChange={(e) => handleHeroTextChange("en", "subtitle", e.target.value)}
                            rows={3}
                            className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-slate-400">RU</span>
                          <textarea
                            value={heroTexts.subtitle.ru}
                            onChange={(e) => handleHeroTextChange("ru", "subtitle", e.target.value)}
                            rows={3}
                            className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section Stats numbers */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1 border-b border-slate-200 pb-2">
                      <RotateCcw className="w-4 h-4 text-blue-600" />
                      Показатели Статистики (Цифры на главном экране):
                    </h4>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700">Вымытых емкостей</label>
                        <input
                          type="text"
                          value={statsTexts.jobs}
                          onChange={(e) => handleStatsChange("jobs", e.target.value)}
                          className="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-bold text-blue-700"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700">Лет нашего опыта</label>
                        <input
                          type="text"
                          value={statsTexts.experience}
                          onChange={(e) => handleStatsChange("experience", e.target.value)}
                          className="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-bold text-blue-700"
                        />
                      </div>
                      <div className="space-y-1 font-sans">
                        <label className="text-xs font-semibold text-slate-700">Процент клиентов</label>
                        <input
                          type="text"
                          value={statsTexts.happyClients}
                          onChange={(e) => handleStatsChange("happyClients", e.target.value)}
                          className="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-bold text-blue-700"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700">Время на отклик (мин)</label>
                        <input
                          type="text"
                          value={statsTexts.responseTime}
                          onChange={(e) => handleStatsChange("responseTime", e.target.value)}
                          className="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-bold text-blue-700"
                        />
                      </div>
                    </div>
                  </div>

                  {/* CUSTOM SECTION TITLES & SUBTITLES */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-6">
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1 border-b border-slate-200 pb-2">
                      <Sliders className="w-4 h-4 text-blue-600" />
                      Тексты и Заголовки Разделов Сайта (Многоязычный CMS):
                    </h4>

                    {/* Section: Services Headers */}
                    <div className="space-y-3 pb-4 border-b border-slate-200/60">
                      <h5 className="text-xs font-extrabold text-blue-700 uppercase">1. Раздел: УСЛУГИ (Services)</h5>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-600 block">Заголовок Раздела:</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          {["az", "en", "ru"].map((key) => (
                            <div key={key} className="space-y-0.5">
                              <span className="text-[9px] font-mono text-slate-400 font-bold uppercase">{key}</span>
                              <input
                                type="text"
                                value={sectionsDict.servicesTitle[key as Language]}
                                onChange={(e) => handleSectionsDictChange("servicesTitle", key as Language, e.target.value)}
                                className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-800"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2 pt-1">
                        <label className="text-[11px] font-bold text-slate-600 block">Подзаголовок Раздела:</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          {["az", "en", "ru"].map((key) => (
                            <div key={key} className="space-y-0.5">
                              <span className="text-[9px] font-mono text-slate-400 font-bold uppercase">{key}</span>
                              <textarea
                                value={sectionsDict.servicesSubtitle[key as Language]}
                                onChange={(e) => handleSectionsDictChange("servicesSubtitle", key as Language, e.target.value)}
                                rows={2}
                                className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-800"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Section: Advantages Headers */}
                    <div className="space-y-3 pb-4 border-b border-slate-200/60">
                      <h5 className="text-xs font-extrabold text-blue-700 uppercase">2. Раздел: ПРЕИМУЩЕСТВА (Advantages / Bento)</h5>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-600 block">Заголовок:</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          {["az", "en", "ru"].map((key) => (
                            <div key={key} className="space-y-0.5">
                              <span className="text-[9px] font-mono text-slate-400 font-bold uppercase">{key}</span>
                              <input
                                type="text"
                                value={sectionsDict.advantagesTitle[key as Language]}
                                onChange={(e) => handleSectionsDictChange("advantagesTitle", key as Language, e.target.value)}
                                className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-800"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2 pt-1">
                        <label className="text-[11px] font-bold text-slate-600 block">Подзаголовок:</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          {["az", "en", "ru"].map((key) => (
                            <div key={key} className="space-y-0.5">
                              <span className="text-[9px] font-mono text-slate-400 font-bold uppercase">{key}</span>
                              <textarea
                                value={sectionsDict.advantagesSubtitle[key as Language]}
                                onChange={(e) => handleSectionsDictChange("advantagesSubtitle", key as Language, e.target.value)}
                                rows={2}
                                className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-800"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Section: Portfolio Headers */}
                    <div className="space-y-3 pb-4 border-b border-slate-200/60">
                      <h5 className="text-xs font-extrabold text-blue-700 uppercase">3. Раздел: НАШИ РАБОТЫ (Portfolio 50/50 Slider)</h5>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-600 block">Заголовок:</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          {["az", "en", "ru"].map((key) => (
                            <div key={key} className="space-y-0.5">
                              <span className="text-[9px] font-mono text-slate-400 font-bold uppercase">{key}</span>
                              <input
                                type="text"
                                value={sectionsDict.portfolioTitle[key as Language]}
                                onChange={(e) => handleSectionsDictChange("portfolioTitle", key as Language, e.target.value)}
                                className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-800"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2 pt-1">
                        <label className="text-[11px] font-bold text-slate-600 block">Подзаголовок:</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          {["az", "en", "ru"].map((key) => (
                            <div key={key} className="space-y-0.5">
                              <span className="text-[9px] font-mono text-slate-400 font-bold uppercase">{key}</span>
                              <textarea
                                value={sectionsDict.portfolioSubtitle[key as Language]}
                                onChange={(e) => handleSectionsDictChange("portfolioSubtitle", key as Language, e.target.value)}
                                rows={2}
                                className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-800"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Section: Reviews Headers */}
                    <div className="space-y-3 pb-4 border-b border-slate-200/60">
                      <h5 className="text-xs font-extrabold text-blue-700 uppercase">4. Раздел: ОТЗЫВЫ КЛИЕНТОВ (Reviews Carousel)</h5>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-600 block">Заголовок:</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          {["az", "en", "ru"].map((key) => (
                            <div key={key} className="space-y-0.5">
                              <span className="text-[9px] font-mono text-slate-400 font-bold uppercase">{key}</span>
                              <input
                                type="text"
                                value={sectionsDict.reviewsTitle[key as Language]}
                                onChange={(e) => handleSectionsDictChange("reviewsTitle", key as Language, e.target.value)}
                                className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-800"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2 pt-1">
                        <label className="text-[11px] font-bold text-slate-600 block">Подзаголовок:</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          {["az", "en", "ru"].map((key) => (
                            <div key={key} className="space-y-0.5">
                              <span className="text-[9px] font-mono text-slate-400 font-bold uppercase">{key}</span>
                              <textarea
                                value={sectionsDict.reviewsSubtitle[key as Language]}
                                onChange={(e) => handleSectionsDictChange("reviewsSubtitle", key as Language, e.target.value)}
                                rows={2}
                                className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-800"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Section: Contact Form Headers */}
                    <div className="space-y-3 pb-4 border-b border-slate-200/60">
                      <h5 className="text-xs font-extrabold text-blue-700 uppercase">5. Раздел: КОНТАКТНАЯ ФОРМА & СВЯЗЬ (Contact Area)</h5>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-600 block">Заголовок:</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          {["az", "en", "ru"].map((key) => (
                            <div key={key} className="space-y-0.5">
                              <span className="text-[9px] font-mono text-slate-400 font-bold uppercase">{key}</span>
                              <input
                                type="text"
                                value={sectionsDict.contactTitle[key as Language]}
                                onChange={(e) => handleSectionsDictChange("contactTitle", key as Language, e.target.value)}
                                className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-800"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2 pt-1">
                        <label className="text-[11px] font-bold text-slate-600 block">Подзаголовок:</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          {["az", "en", "ru"].map((key) => (
                            <div key={key} className="space-y-0.5">
                              <span className="text-[9px] font-mono text-slate-400 font-bold uppercase">{key}</span>
                              <textarea
                                value={sectionsDict.contactSubtitle[key as Language]}
                                onChange={(e) => handleSectionsDictChange("contactSubtitle", key as Language, e.target.value)}
                                rows={2}
                                className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-800"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Section: Footer Headers */}
                    <div className="space-y-3">
                      <h5 className="text-xs font-extrabold text-blue-700 uppercase">6. ФУТЕР И КОНТАКТНЫЕ ДАННЫЕ (Footer & Address)</h5>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-600 block">Описание компании в футере:</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          {["az", "en", "ru"].map((key) => (
                            <div key={key} className="space-y-0.5">
                              <span className="text-[9px] font-mono text-slate-400 font-bold uppercase">{key}</span>
                              <input
                                type="text"
                                value={sectionsDict.footerDesc[key as Language]}
                                onChange={(e) => handleSectionsDictChange("footerDesc", key as Language, e.target.value)}
                                className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-800"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2 pt-1">
                        <label className="text-[11px] font-bold text-slate-600 block">Адрес офиса:</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          {["az", "en", "ru"].map((key) => (
                            <div key={key} className="space-y-0.5">
                              <span className="text-[9px] font-mono text-slate-400 font-bold uppercase">{key}</span>
                              <input
                                type="text"
                                value={sectionsDict.footerAddr[key as Language]}
                                onChange={(e) => handleSectionsDictChange("footerAddr", key as Language, e.target.value)}
                                className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-800"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}


              {/* TAB 6: REQUESTS / MONITORING */}
              {activeTab === "submissions" && (
                <div className="space-y-6 text-left font-sans">
                  <div className="flex justify-between items-center bg-slate-900 text-white p-4 rounded-xl">
                    <div>
                      <h4 className="text-xs font-mono text-sky-400 uppercase tracking-widest font-bold">Входящие лиды с форм</h4>
                      <p className="text-xs text-slate-300">Прямое управление заказами на обратный звонок</p>
                    </div>
                    {submissions.length > 0 && (
                      <button
                        onClick={onClearSubmissions}
                        className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer"
                      >
                        Очистить историю
                      </button>
                    )}
                  </div>

                  {submissions.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 space-y-2">
                      <p className="text-sm font-semibold">Список заявок пока пуст.</p>
                      <p className="text-xs">Заполните форму обратной связи на сайте, чтобы увидеть работу монитора в реальном времени!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {submissions.map((sub) => (
                        <div
                          key={sub.id}
                          className={`p-4 rounded-2xl border transition-all ${
                            sub.status === "called"
                              ? "bg-emerald-50/50 border-emerald-100"
                              : sub.status === "rejected"
                              ? "bg-rose-50/40 border-rose-100"
                              : "bg-white border-slate-200 shadow-md"
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono ${
                                  sub.status === "called"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : sub.status === "rejected"
                                    ? "bg-rose-100 text-rose-800"
                                    : "bg-blue-100 text-blue-800 animate-pulse"
                                }`}>
                                  {sub.status === "called" ? "Обзвонен" : sub.status === "rejected" ? "Отказ" : "Новый лид"}
                                </span>
                                <span className="text-[10px] text-slate-400 font-mono">{sub.timestamp}</span>
                              </div>
                              <h5 className="font-bold text-slate-900 text-sm">{sub.name}</h5>
                              <p className="text-xs text-blue-700 font-bold">{sub.phone}</p>
                            </div>

                            <div className="flex gap-1.5">
                              {sub.status !== "called" && (
                                <button
                                  onClick={() => onUpdateStatus(sub.id, "called")}
                                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[10px] cursor-pointer"
                                >
                                  Обзвонен
                                </button>
                              )}
                              {sub.status !== "rejected" && (
                                <button
                                  onClick={() => onUpdateStatus(sub.id, "rejected")}
                                  className="px-3 py-1.5 bg-slate-200 hover:bg-rose-600 hover:text-white text-slate-700 font-semibold rounded-lg text-[10px] transition-colors cursor-pointer"
                                >
                                  Отказ
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Extra info */}
                          <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-slate-400 text-[10px] uppercase font-bold block mb-0.5">Услуга:</span>
                              <span className="text-slate-800 font-medium">{sub.serviceType}</span>
                            </div>
                            {sub.tankVolume && (
                              <div>
                                <span className="text-slate-400 text-[10px] uppercase font-bold block mb-0.5">Объем:</span>
                                <span className="text-slate-800 font-mono font-bold text-xs">{sub.tankVolume}</span>
                              </div>
                            )}
                          </div>
                          {sub.notes && (
                            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 mt-2">
                              <span className="text-slate-400 text-[9px] uppercase font-bold block mb-0.5">Комментарий:</span>
                              <p className="text-slate-600 text-xs italic">“{sub.notes}”</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

        </div>

        {/* Footer informational */}
        <div className="bg-slate-50 border-t border-slate-200 p-3 text-center">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold">
            🛠️ Изменения применяются мгновенно и сохраняются на устройстве
          </span>
        </div>
      </div>
    );
  }

  return null;
}
