import React, { useState } from 'react';
import { UserCheck, X, Check, Mail, School, ShieldCheck } from 'lucide-react';
import { Language, StudentInfo } from '../types/prl';
import { t } from '../data/translations';
import { sound } from '../utils/sound';

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  student: StudentInfo;
  onSave: (info: StudentInfo) => void;
}

export const StudentModal: React.FC<StudentModalProps> = ({
  isOpen,
  onClose,
  language,
  student,
  onSave
}) => {
  const currentT = t[language];
  const [name, setName] = useState(student.name);
  const [group, setGroup] = useState(student.group);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !group.trim()) {
      sound.playError();
      return;
    }
    sound.playSuccess();
    onSave({
      name: name.trim(),
      group: group.trim(),
      emailTarget: 'jpons@centredelamar.com'
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  const groupPresets = [
    "1r MER (Manteniment d'Embarcacions)",
    "2n MER (Varaders i Sistemes)",
    "CFGM Nàutica Esportiva",
    "IPO1 Prevenció de Riscos"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative overflow-hidden">
        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between mb-6 relative z-10">
          <div className="flex items-center space-x-3.5">
            <div className="p-3 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-2xl shadow-inner">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white tracking-tight">
                {currentT.registerTitle}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Centre de la Mar • CIFP Nàutic
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Description */}
        <div className="bg-slate-950/70 border border-cyan-500/20 rounded-2xl p-4 mb-6 text-xs text-slate-300 space-y-2">
          <p>
            {currentT.registerDesc} <span className="text-cyan-300 font-bold underline">jpons@centredelamar.com</span>.
          </p>
          <div className="flex items-center space-x-2 text-cyan-400 font-medium pt-1 border-t border-slate-800">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Registre vàlid per a les sessions de qualificació de PRL nàutica.</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              {currentT.studentLabel}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={currentT.namePlaceholder}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              {currentT.groupLabel}
            </label>
            <input
              type="text"
              required
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              placeholder={currentT.groupPlaceholder}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
            />

            {/* Quick group tags */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {groupPresets.map((preset) => (
                <button
                  type="button"
                  key={preset}
                  onClick={() => {
                    sound.playClick();
                    setGroup(preset);
                  }}
                  className="text-[11px] px-2.5 py-1 bg-slate-800/80 hover:bg-cyan-950 hover:text-cyan-300 border border-slate-700/60 hover:border-cyan-500/40 rounded-lg text-slate-400 transition"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-5 bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-cyan-600/30 transition flex items-center justify-center space-x-2"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-5 h-5 text-emerald-300" />
                  <span>{currentT.dataSaved}</span>
                </>
              ) : (
                <>
                  <UserCheck className="w-5 h-5" />
                  <span>{currentT.saveBtn}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
