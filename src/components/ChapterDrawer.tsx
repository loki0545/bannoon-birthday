import React from 'react';
import { X, Sparkles, ChevronLeft } from 'lucide-react';
import { CHAPTERS } from '../data/chaptersData';
import { soundEngine } from '../services/soundEngine';

interface ChapterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentChapter: number;
  onSelectChapter: (id: number) => void;
}

export const ChapterDrawer: React.FC<ChapterDrawerProps> = ({
  isOpen,
  onClose,
  currentChapter,
  onSelectChapter,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-start animate-in fade-in duration-200" dir="rtl">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={() => {
          soundEngine.playChime();
          onClose();
        }}
      />

      {/* Drawer content */}
      <div className="relative w-full max-w-md bg-slate-950/95 border-l border-rose-500/20 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl z-10 text-right">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-rose-500/15">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <h3 className="font-arabic text-xl font-bold text-rose-100">
                  فصول رحلة الاحتفال
                </h3>
              </div>
              <p className="text-xs text-rose-300/70 mt-0.5 font-arabic">
                رحلة الاحتفال الساحرة المخصصة لبَنّون
              </p>
            </div>
            <button
              onClick={() => {
                soundEngine.playChime();
                onClose();
              }}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
              aria-label="إغلاق قائمة الفصول"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {CHAPTERS.map((ch) => {
              const isActive = ch.id === currentChapter;
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    soundEngine.playChime();
                    onSelectChapter(ch.id);
                    onClose();
                  }}
                  className={`w-full text-right p-3.5 rounded-xl border transition-all flex items-center justify-between group ${
                    isActive
                      ? 'bg-rose-950/40 border-amber-400/50 shadow-md shadow-rose-950/40 text-rose-100'
                      : 'bg-slate-900/50 border-slate-800/80 hover:border-rose-400/30 hover:bg-slate-900/80 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl p-2 rounded-lg bg-slate-800/60 border border-slate-700/50 group-hover:scale-110 transition-transform">
                      {ch.icon}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-amber-300/90 font-arabic">
                          الفصل {ch.id}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-rose-100 group-hover:text-rose-200 font-arabic">
                        {ch.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-1 font-arabic">
                        {ch.subtitle}
                      </p>
                    </div>
                  </div>
                  <ChevronLeft
                    className={`w-4 h-4 transition-transform group-hover:-translate-x-1 ${
                      isActive ? 'text-amber-300' : 'text-slate-600'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-6 mt-6 border-t border-rose-500/15 text-center">
          <p className="font-arabic text-base text-amber-200 font-semibold">
            كل عام وإنتِ فرحة هالدنيا يا بَنّون 💗
          </p>
          <p className="text-xs text-slate-400 mt-1 font-arabic">
            صُنع بكل مشاعر الود والمعزّة والتقدير
          </p>
        </div>
      </div>
    </div>
  );
};
