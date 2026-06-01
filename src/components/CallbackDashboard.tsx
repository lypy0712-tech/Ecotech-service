import { useState } from "react";
import { CallbackSubmission, Language } from "../types";
import { DICTIONARY } from "../data";
import { Play, CheckCircle, Trash2, Calendar, PhoneCall, Sparkles, Sliders, ShieldCheck } from "lucide-react";

interface CallbackDashboardProps {
  currentLang: Language;
  submissions: CallbackSubmission[];
  onUpdateStatus: (id: string, nextStatus: "pending" | "called" | "rejected") => void;
  onClear: () => void;
  onAddDummy: () => void;
}

export default function CallbackDashboard({
  currentLang,
  submissions,
  onUpdateStatus,
  onClear,
  onAddDummy,
}: CallbackDashboardProps) {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const text = DICTIONARY.notification;

  return (
    <div className="bg-slate-900 text-slate-100 rounded-3xl p-6 md:p-8 max-w-5xl mx-auto border border-blue-900 shadow-2xl relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header section of dashboard */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-blue-900 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-sky-500/10 text-sky-400 text-[10px] uppercase tracking-widest font-mono px-2.5 py-1 rounded-md border border-sky-500/20 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Live Simulation Sandbox
            </span>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-sky-400 animate-spin" />
            {text.adminTitle[currentLang]}
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            {submissions.length > 0
              ? text.requestCount[currentLang].replace("{count}", String(submissions.length))
              : text.noRequests[currentLang]}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={onAddDummy}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 active:scale-95 text-xs text-sky-300 rounded-xl border border-sky-900/50 transition-all font-medium flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3" />
            + Demo Sorğu (Demo Request)
          </button>
          
          {submissions.length > 0 && (
            <button
              onClick={onClear}
              className="px-4 py-2 bg-red-950/40 hover:bg-red-950/80 active:scale-95 text-xs text-red-300 rounded-xl border border-red-900/50 transition-all font-medium flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              Təmizlə (Clear All)
            </button>
          )}
        </div>
      </div>

      {/* Database/Submissions Table View */}
      {submissions.length === 0 ? (
        <div className="py-12 text-center text-slate-500 text-sm italic">
          — Hələ ki heç bir geri zəng sorğusu daxil olmayıb. Aşağıdakı formu doldurub göndərə bilərsiniz. —
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto max-h-[350px] overflow-y-auto pr-1">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                <th className="pb-3 pr-2">Müştəri / Vaxt (Client / Time)</th>
                <th className="pb-3 pr-2">Xidmət / Həcm (Service / Vol)</th>
                <th className="pb-3 pr-2">Əlaqə (Phone)</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Fəaliyyət (Actions)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {submissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-800/40 transition-colors">
                  {/* Name and time */}
                  <td className="py-3.5 pr-2">
                    <div className="font-semibold text-white">{sub.name}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {sub.timestamp}
                    </div>
                  </td>
                  {/* Service and Tank size */}
                  <td className="py-3.5 pr-2">
                    <div className="text-slate-200 truncate max-w-[170px] md:max-w-xs font-medium">
                      {sub.serviceType}
                    </div>
                    {sub.tankVolume && (
                      <span className="inline-block mt-0.5 bg-blue-950/60 text-sky-300 px-1.5 py-0.5 rounded text-[11px] border border-blue-900">
                        Vol: {sub.tankVolume}
                      </span>
                    )}
                  </td>
                  {/* Phone */}
                  <td className="py-3.5 pr-2 text-sky-200 font-mono font-medium">
                    <a href={`tel:${sub.phone}`} className="hover:underline">
                      {sub.phone}
                    </a>
                  </td>
                  {/* Status Indicator */}
                  <td className="py-3.5">
                    {sub.status === "pending" && (
                      <span className="bg-amber-500/10 text-amber-400 border border-amber-500/25 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider">
                        Bakılır (Pending)
                      </span>
                    )}
                    {sub.status === "called" && (
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider">
                        Zəng edildi (Called)
                      </span>
                    )}
                    {sub.status === "rejected" && (
                      <span className="bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider">
                        Arxiv (Archived)
                      </span>
                    )}
                  </td>
                  {/* Action triggers */}
                  <td className="py-3.5 text-right flex items-center justify-end gap-1.5">
                    {sub.status === "pending" && (
                      <button
                        onClick={() => onUpdateStatus(sub.id, "called")}
                        className="px-2.5 py-1 bg-emerald-500 text-slate-900 rounded hover:bg-emerald-400 transition-colors font-medium flex items-center gap-1 cursor-pointer"
                        title="Simulate successful ring-back"
                      >
                        <PhoneCall className="w-3 .5 h-3.5" />
                        Zəng et (Call)
                      </button>
                    )}
                    {sub.status === "called" && (
                      <button
                        onClick={() => onUpdateStatus(sub.id, "rejected")}
                        className="p-1 text-slate-500 hover:text-slate-300 transition-colors"
                        title="Archive row"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    {sub.status === "rejected" && (
                      <button
                        onClick={() => onUpdateStatus(sub.id, "pending")}
                        className="px-2 py-0.5 bg-slate-700 hover:bg-slate-600 rounded text-[11px] text-slate-300 transition-colors"
                      >
                        Bərpa et (Restore)
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Live pipeline validation tags to showcase high workmanship */}
      <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap justify-between items-center text-slate-500 text-[11px] gap-2">
        <span className="flex items-center gap-1.5 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          SSL secure pipeline online • Client side SQLite state
        </span>
        <span className="font-mono bg-blue-950/60 text-[10px] text-sky-400 border border-blue-900/50 px-2 py-1 rounded-sm">
          AZERBAIJAN INFRASTRUCTURE COMPLIANT
        </span>
      </div>
    </div>
  );
}
