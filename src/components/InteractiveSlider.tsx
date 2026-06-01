import { useState, useRef, useEffect, MouseEvent, TouchEvent } from "react";
import { Maximize2, ArrowLeftRight, Sparkles } from "lucide-react";
import { PortfolioItem, Language } from "../types";

// Safe asset paths for Vite build to prevent type and resolver quirks
const dirtyBefore = "/src/assets/images/cistern_dirty_before_1780331013129.png";
const shinyAfter = "/src/assets/images/cistern_shiny_after_1780331035783.png";

interface InteractiveSliderProps {
  key?: any;
  item: PortfolioItem;
  lang: Language;
  labels: {
    before: string;
    after: string;
    guide: string;
  };
}

export default function InteractiveSlider({ item, lang, labels }: InteractiveSliderProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Determine actual image source based on key or string URL
  const getImgSrc = (imgKey: string) => {
    if (imgKey === "cistern_dirty_before") return dirtyBefore;
    if (imgKey === "cistern_shiny_after") return shinyAfter;
    return imgKey; // Unsplash URLs and external urls
  };

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let position = (x / rect.width) * 100;
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    setSliderPosition(position);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-sky-100 max-w-4xl mx-auto">
      {/* Title & Info */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium tracking-wider uppercase flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            {item.id === 1 ? "Top Work" : `Project #${item.id}`}
          </span>
        </div>
        <h3 className="text-xl md:text-2xl font-semibold text-slate-800 tracking-tight">
          {item.title[lang]}
        </h3>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          {item.description[lang]}
        </p>
      </div>

      {/* Interactive Drag Stage */}
      <div
        id={`portfolio-slider-${item.id}`}
        ref={containerRef}
        className="relative h-[340px] md:h-[480px] w-full rounded-2xl overflow-hidden select-none cursor-ew-resize border border-sky-100"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* AFTER IMAGE (Background - clean, polished) */}
        <img
          src={getImgSrc(item.afterImg)}
          alt="After cleaning"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          referrerPolicy="no-referrer"
        />
        <div className="absolute right-4 top-4 bg-blue-600/90 text-white text-xs px-3 py-1.5 rounded-md font-semibold backdrop-blur-sm shadow z-20 transition-all duration-300">
          {labels.after}
        </div>

        {/* BEFORE IMAGE (Foreground layer - dirty, scaled/clipped) */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <img
            src={getImgSrc(item.beforeImg)}
            alt="Before cleaning"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute left-4 top-4 bg-amber-700/90 text-white text-xs px-3 py-1.5 rounded-md font-semibold backdrop-blur-sm shadow z-20">
          {labels.before}
        </div>

        {/* DRAG HANDLE BAR */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-30 shadow-[0_0_12px_rgba(30,58,138,0.5)] flex items-center justify-center"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute w-10 h-10 rounded-full bg-white text-blue-800 shadow-xl border-2 border-blue-500 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform">
            <ArrowLeftRight className="w-5 h-5 animate-pulse" />
          </div>
        </div>

        {/* Subtle Watermark details */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center pointer-events-none z-10 text-[10px] md:text-xs text-white/80 bg-slate-900/40 backdrop-blur-xs py-1 px-3 rounded">
          <span>Ecotech Service</span>
          <span className="flex items-center gap-1">
            <Maximize2 className="w-3 h-3" />
            {labels.guide}
          </span>
        </div>
      </div>
    </div>
  );
}
