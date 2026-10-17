import React, { useState, useEffect } from 'react';
import { Sparkles, RotateCcw, Heart, Flame } from 'lucide-react';
import { soundEngine } from '../../services/soundEngine';

interface ChapterSevenFinaleProps {
  onRestart: () => void;
  onReliveSurprise: () => void;
  onTriggerFireworks: () => void;
  onTriggerConfetti: () => void;
}

const FINALE_PARAGRAPHS = [
  "كل عام وإنتِ بألف خير يا بَنّون! 🎂💗",
  "عسى هذا الفصل الجديد من عمرج يحمل إلج بدايات جميلة، وأياماً مليانة سكينة، وذكريات ما تُنسى، وأحلاماً تتحقق واحداً تلو الآخر.",
  "عسى ضحكتج تبقى دوم منورة، وكلبج يبقى مليان أمل، وحياتج تفيض بسعادة أكبر من كل الكلمات والوصف.",
  "وإذا جان عندي أمنية واحدة أطلبها إلج اليوم، فهي إنج تبقين دوم بخير، وبصحة، وسعادة، ومحاطة بكل اللحظات الحلوة.",
  "عيد ميلاد سعيد لأغلى إنسانة تستاهل كل فرح وسعادة بهالدنيا. 🌷✨",
];

export const ChapterSevenFinale: React.FC<ChapterSevenFinaleProps> = ({
  onRestart,
  onReliveSurprise,
  onTriggerFireworks,
  onTriggerConfetti,
}) => {
  const [revealedCount, setRevealedCount] = useState<number>(0);

  useEffect(() => {
    // Continuous initial celebratory fireworks
    onTriggerFireworks();
    soundEngine.playFirework();
    const fireworkTimer = setTimeout(() => {
      onTriggerFireworks();
      onTriggerConfetti();
    }, 1200);

    let current = 0;
    const interval = setInterval(() => {
      current++;
      setRevealedCount(current);
      soundEngine.playTone(523.25 + current * 60, 0.6, 'sine', 0.4);
      if (current >= FINALE_PARAGRAPHS.length) {
        clearInterval(interval);
        setTimeout(() => {
          soundEngine.playSparkle();
          onTriggerFireworks();
        }, 1000);
      }
    }, 1200);

    return () => {
      clearTimeout(fireworkTimer);
      clearInterval(interval);
    };
  }, []);

  const handleManualFireworks = () => {
    soundEngine.playFirework();
    onTriggerFireworks();
    onTriggerConfetti();
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-12 max-w-4xl mx-auto select-none" dir="rtl">
      {/* Luminous Glowing Moon Visual */}
      <div className="relative mb-6">
        <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-tr from-amber-100 via-amber-200 to-yellow-100 shadow-[0_0_80px_rgba(254,240,138,0.5)] flex items-center justify-center relative border border-amber-100/60 animate-pulse" style={{ animationDuration: '5s' }}>
          <div className="absolute top-6 left-8 w-6 h-6 rounded-full bg-amber-300/30 blur-[1px]" />
          <div className="absolute bottom-8 right-8 w-8 h-8 rounded-full bg-amber-300/25 blur-[1px]" />
          <div className="absolute top-14 right-12 w-4 h-4 rounded-full bg-amber-300/30 blur-[1px]" />
          
          <span className="font-arabic text-2xl md:text-3xl text-amber-950 font-bold">
            بَنّون
          </span>
        </div>

        <div className="absolute -inset-4 rounded-full bg-amber-300/20 blur-2xl -z-10" />
      </div>

      {/* Prominent Nickname Typography */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 mb-2 text-rose-300">
          <Heart className="w-4 h-4 fill-rose-400 text-rose-400 animate-bounce" />
          <span className="text-xs uppercase tracking-widest font-arabic font-semibold">الاحتفال الختامي الساحر</span>
          <Heart className="w-4 h-4 fill-rose-400 text-rose-400 animate-bounce" />
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-arabic font-extrabold text-rose-gold-gradient tracking-tight drop-shadow-2xl">
          بَنّون 💗
        </h1>
        <p className="font-arabic text-2xl sm:text-3xl md:text-4xl text-amber-300 mt-3 font-bold drop-shadow-md">
          يا وردة العمر، عسى أيامكِ كلها هناء وسلام 🌸
        </p>
      </div>

      {/* Line by Line Revealed Final Message */}
      <div className="w-full max-w-2xl bg-slate-950/70 border border-amber-400/40 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-md space-y-6 my-6 text-center">
        {FINALE_PARAGRAPHS.map((para, idx) => {
          const isVisible = idx < revealedCount;
          return (
            <div
              key={idx}
              className={`transition-all duration-700 transform ${
                isVisible
                  ? 'opacity-100 translate-y-0 filter-none'
                  : 'opacity-0 translate-y-4 blur-xs pointer-events-none'
              }`}
            >
              {idx === 0 ? (
                <h3 className="font-arabic text-2xl sm:text-3xl font-extrabold text-amber-300">
                  {para}
                </h3>
              ) : idx === FINALE_PARAGRAPHS.length - 1 ? (
                <p className="font-arabic text-xl sm:text-2xl font-bold text-rose-300 pt-4 border-t border-rose-500/20">
                  {para}
                </p>
              ) : (
                <p className="font-arabic text-lg sm:text-xl text-rose-100 leading-relaxed font-semibold">
                  {para}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Manual Fireworks Trigger */}
      <div className="my-3">
        <button
          onClick={handleManualFireworks}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs md:text-sm font-arabic font-bold bg-amber-500/15 border border-amber-400/30 text-amber-300 hover:bg-amber-500/25 transition-all"
        >
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>إطلاق الألعاب النارية 🎆</span>
        </button>
      </div>

      {/* Action Buttons: "Celebrate Again" & "Relive the Surprise" */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
        <button
          onClick={() => {
            soundEngine.playSparkle();
            onRestart();
          }}
          className="w-full sm:w-auto px-8 py-3.5 rounded-full font-arabic text-base md:text-lg font-bold tracking-wide text-slate-950 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-amber-400/30 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-slate-900" />
          <span>الاحتفال مجدداً 🎉</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playChime();
            onReliveSurprise();
          }}
          className="w-full sm:w-auto px-8 py-3.5 rounded-full font-arabic text-base md:text-lg font-bold tracking-wide text-rose-100 bg-rose-950/70 border border-rose-400/40 hover:bg-rose-900/80 hover:scale-105 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4 text-rose-300" />
          <span>إعادة عيش المفاجأة 💌</span>
        </button>
      </div>

      {/* Heartfelt sign-off */}
      <p className="font-arabic text-sm text-amber-200/70 mt-8">
        صُنع بكل حب ووفاء لأغلى إنسانة · بَنّون 💗
      </p>
    </div>
  );
};
