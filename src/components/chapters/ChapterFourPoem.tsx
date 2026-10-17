import React, { useState, useEffect } from 'react';
import { Sparkles, RotateCcw, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { soundEngine } from '../../services/soundEngine';

interface ChapterFourPoemProps {
  onNext: () => void;
  onPrev: () => void;
  onTriggerConfetti: () => void;
}

const POEM_STANZAS = [
  // Stanza 1
  [
    'يا بَنّون يا وردة بهالعمر فاحت',
    'وبضحكتج كل هموم الروح راحت',
    'اليوم عيدج والفرح يلبس سماه',
    'وكل النجوم الليلة باسمج تنادت',
  ],
  // Stanza 2
  [
    'يا حلوة الأيام يا طيبة القلب',
    'يا ضحكةٍ تمحي التعب لو مرّ صعب',
    'أتمنالج عمر مليان أمان',
    'وكل أحلامج تصير بلمحة عين',
  ],
  // Stanza 3
  [
    'كل عام وإنتِ فرحة هالدنيا',
    'وكل عام والضحكة ما تفارق عينج',
    'يا رب تبقين بخير وبسعادة',
    'وتبقين أحلى عيد بكل سنينج',
  ],
];

export const ChapterFourPoem: React.FC<ChapterFourPoemProps> = ({
  onNext,
  onPrev,
  onTriggerConfetti,
}) => {
  const [revealedLinesCount, setRevealedLinesCount] = useState<number>(0);
  const totalLines = POEM_STANZAS.reduce((acc, s) => acc + s.length, 0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current++;
      setRevealedLinesCount(current);
      // Soft gentle chime for couplet entry
      if (current % 2 === 0) {
        soundEngine.playTone(659.25 + (current % 4) * 60, 0.8, 'sine', 0.4);
      }
      if (current >= totalLines) {
        clearInterval(interval);
        setTimeout(() => {
          soundEngine.playSparkle();
          onTriggerConfetti();
        }, 800);
      }
    }, 1100);

    return () => clearInterval(interval);
  }, [totalLines]);

  const handleReplay = () => {
    soundEngine.playChime();
    setRevealedLinesCount(0);
    let current = 0;
    const interval = setInterval(() => {
      current++;
      setRevealedLinesCount(current);
      if (current % 2 === 0) {
        soundEngine.playTone(659.25 + (current % 4) * 60, 0.8, 'sine', 0.4);
      }
      if (current >= totalLines) {
        clearInterval(interval);
      }
    }, 1100);
  };

  let lineCounter = 0;

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 max-w-4xl mx-auto" dir="rtl">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-400/25 text-rose-200 text-xs font-arabic mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>الفصل ٤: قصيدة خاصة لبَنّون · أبيات من القلب</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-arabic font-bold text-rose-gold-gradient">
          قصيدة لعيون بَنّون 🌹
        </h2>
        <p className="text-sm md:text-base text-rose-200/80 mt-2 font-arabic max-w-md mx-auto leading-relaxed">
          نُظمت بلهجة عراقية حنونة، تحتفي بضحكتج، وطيبتج، ونقاء روحج في يوم ميلادج.
        </p>
      </div>

      {/* Luxurious Handwritten Letter on Parchment Paper */}
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#FFFDF8] via-[#FAF5EE] to-[#F7EFE3] text-stone-900 rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl border-2 border-amber-300/70 overflow-hidden">
        {/* Soft Pink and Gold ambient backlight */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-rose-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-amber-300/30 rounded-full blur-3xl pointer-events-none" />

        {/* Vintage hairline border inside */}
        <div className="border border-amber-400/30 rounded-2xl p-4 sm:p-6 md:p-8">
          {/* Top Calligraphy Heading */}
          <div className="flex flex-col items-center justify-center border-b border-amber-300/60 pb-5 mb-6 text-center">
            <span className="text-xs uppercase tracking-widest text-amber-800 font-arabic font-semibold">
              مهداة إلى وردة العمر
            </span>
            <h3 className="font-arabic text-3xl md:text-4xl text-amber-950 font-bold mt-1">
              إلى الغالية بَنّون 🌸
            </h3>
            <div className="flex items-center gap-2 text-rose-600 mt-2">
              <span className="h-[1px] w-12 bg-amber-300" />
              <Heart className="w-4 h-4 fill-rose-500/20" />
              <span className="h-[1px] w-12 bg-amber-300" />
            </div>
          </div>

          {/* Stanzas Display with RTL Support */}
          <div className="space-y-8 text-center" dir="rtl">
            {POEM_STANZAS.map((stanza, sIdx) => (
              <div
                key={sIdx}
                className="space-y-3 pb-4 border-b border-amber-200/40 last:border-none"
              >
                {stanza.map((line) => {
                  lineCounter++;
                  const isVisible = lineCounter <= revealedLinesCount;
                  return (
                    <div
                      key={line}
                      className={`transition-all duration-700 transform ${
                        isVisible
                          ? 'opacity-100 translate-y-0 filter-none'
                          : 'opacity-0 translate-y-3 blur-xs pointer-events-none'
                      }`}
                    >
                      <p className="font-arabic text-xl sm:text-2xl md:text-3xl font-bold text-stone-900 leading-loose tracking-wide hover:text-rose-900 transition-colors">
                        {line}
                      </p>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Handwritten Signature and Reading Replay */}
          <div className="mt-8 pt-6 border-t border-amber-300/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-right">
              <p className="font-arabic text-xl md:text-2xl text-rose-800 font-bold">
                دومج بالكلب، بَنّون 💗
              </p>
            </div>

            <button
              onClick={handleReplay}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-arabic font-bold bg-amber-100 border border-amber-400/60 text-amber-900 hover:bg-amber-200 transition-colors shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>قراءة القصيدة مجدداً</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="w-full flex items-center justify-between mt-10 pt-4 border-t border-rose-500/15">
        <button
          onClick={() => {
            soundEngine.playChime();
            onPrev();
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm text-slate-400 hover:text-rose-200 hover:bg-slate-900 transition-colors font-arabic"
        >
          <ChevronRight className="w-4 h-4" />
          <span>الفصل السابق: رسائل من القلب</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playChime();
            onNext();
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold bg-rose-500/20 border border-rose-400/40 text-rose-200 hover:bg-rose-500/30 hover:scale-105 transition-all shadow-sm font-arabic"
        >
          <span>الفصل التالي: صندوق الهدايا السحري</span>
          <ChevronLeft className="w-4 h-4 text-rose-300" />
        </button>
      </div>
    </div>
  );
};
