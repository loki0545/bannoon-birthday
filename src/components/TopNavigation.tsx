import React from 'react';
import { Volume2, VolumeX, Music, BookOpen } from 'lucide-react';
import { CHAPTERS } from '../data/chaptersData';
import { soundEngine } from '../services/soundEngine';

interface TopNavigationProps {
  currentChapter: number;
  onSelectChapter: (chapterId: number) => void;
  onToggleDrawer: () => void;
  isMusicPlaying: boolean;
  isMuted: boolean;
  onToggleMusic: () => void;
  onToggleMute: () => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  currentChapter,
  onSelectChapter,
  onToggleDrawer,
  isMusicPlaying,
  isMuted,
  onToggleMusic,
  onToggleMute,
}) => {
  const currentChapterInfo = CHAPTERS.find((c) => c.id === currentChapter) || CHAPTERS[0];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-rose-500/15 transition-all">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Single element Brand Zone */}
        <button
          onClick={() => {
            soundEngine.playChime();
            onSelectChapter(1);
          }}
          className="flex items-center gap-2 text-right group shrink-0 focus-visible:outline-none"
          title="العودة للمفاجأة"
        >
          <span className="text-xl md:text-2xl font-arabic font-bold text-rose-200 tracking-wide group-hover:text-rose-100 transition-colors">
            بَنّون
          </span>
          <span className="font-sans text-xs md:text-sm text-amber-300/90 font-medium px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/20">
            عيد ميلاد سعيد
          </span>
          <span className="text-base">🎂</span>
        </button>

        {/* Zone 2: Progress indicator & Chapter Title */}
        <div className="hidden sm:flex items-center gap-3 text-xs text-rose-200/80 shrink-0">
          <div className="flex items-center gap-1.5">
            {CHAPTERS.map((ch) => (
              <button
                key={ch.id}
                onClick={() => {
                  soundEngine.playChime();
                  onSelectChapter(ch.id);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  ch.id === currentChapter
                    ? 'w-6 bg-gradient-to-r from-amber-300 to-rose-400 shadow-sm shadow-rose-500/50'
                    : ch.id < currentChapter
                    ? 'bg-rose-400/60 hover:bg-rose-300'
                    : 'bg-slate-700 hover:bg-slate-500'
                }`}
                title={`الفصل ${ch.id}: ${ch.title}`}
                aria-label={`الانتقال إلى ${ch.title}`}
              />
            ))}
          </div>
          <span className="text-slate-500">·</span>
          <span className="font-arabic font-medium text-rose-100 tracking-wide text-sm">
            الفصل {currentChapter}: {currentChapterInfo.title}
          </span>
        </div>

        {/* Zone 3: Audio controls & Chapter Menu */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Ambient Music Toggle */}
          <button
            onClick={onToggleMusic}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium font-arabic transition-all ${
              isMusicPlaying
                ? 'bg-rose-500/20 text-rose-200 border border-rose-400/40 shadow-sm shadow-rose-500/30'
                : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
            title={isMusicPlaying ? 'إيقاف موسيقى صندوق العيد' : 'تشغيل موسيقى صندوق العيد'}
          >
            <Music className={`w-3.5 h-3.5 ${isMusicPlaying ? 'animate-spin text-rose-400' : ''}`} style={{ animationDuration: '6s' }} />
            <span className="hidden md:inline whitespace-nowrap">
              {isMusicPlaying ? 'الموسيقى تعمل' : 'تشغيل الموسيقى'}
            </span>
          </button>

          {/* Sound FX Mute Toggle */}
          <button
            onClick={onToggleMute}
            className="p-1.5 rounded-full bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
            title={isMuted ? 'تشغيل المؤثرات الصوتية' : 'كتم المؤثرات الصوتية'}
            aria-label="التحكم بالصوت"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Chapter Drawer Toggle */}
          <button
            onClick={() => {
              soundEngine.playChime();
              onToggleDrawer();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium font-arabic bg-gradient-to-r from-amber-500/20 to-rose-500/20 text-amber-200 border border-amber-400/30 hover:border-amber-300 transition-all shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span className="whitespace-nowrap">فصول الاحتفال</span>
          </button>
        </div>
      </div>
    </header>
  );
};
