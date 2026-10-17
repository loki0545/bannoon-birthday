import React, { useState } from 'react';
import { Sparkles, Heart, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { soundEngine } from '../../services/soundEngine';

interface ChapterSixMemoriesProps {
  onNext: () => void;
  onPrev: () => void;
  onTriggerConfetti: () => void;
}

interface MemoryCard {
  id: number;
  title: string;
  theme: string;
  illustrationIcon: string;
  illustrationGradient: string;
  hiddenHope: string;
  arabicBlessing: string;
}

const MEMORIES: MemoryCard[] = [
  {
    id: 1,
    title: 'سكينة وطمأنينة بال',
    theme: 'نسيم الخزامى',
    illustrationIcon: '🌸',
    illustrationGradient: 'from-pink-900/40 via-purple-900/30 to-slate-900/60',
    hiddenHope:
      'عسى هدوء البال والسكينة يحيطون بروحج حتى بأصعب الأيام، وتلگين الأمان والطمأنينة وين ما حللتي.',
    arabicBlessing: 'راحة بال تملي كلبج وسكينة تطمن روحج بكل لحظة.',
  },
  {
    id: 2,
    title: 'ضحكة ونور دائم',
    theme: 'شمس الصباح',
    illustrationIcon: '☀️',
    illustrationGradient: 'from-amber-900/40 via-yellow-900/30 to-slate-900/60',
    hiddenHope:
      'عسى ضحكتج الحلوة تدوم كأعذب لحن، ترفع هموم كل اللي حولج وتسعد كلبج الطيب دوم.',
    arabicBlessing: 'ضحكتج دومها عيد، ونورج دوم يضوي كل مكان تمرّين بيه.',
  },
  {
    id: 3,
    title: 'أحلام محققة بلمحة عين',
    theme: 'بريق النجوم',
    illustrationIcon: '🌟',
    illustrationGradient: 'from-blue-900/40 via-indigo-900/30 to-slate-900/60',
    hiddenHope:
      'عسى كل أمنية سرية، وكل طموح حلو، وكل حلم تحتفظين بيه يصير حقيقة مفرحة بهالسنة الجديدة.',
    arabicBlessing: 'كل أمنية ببالج تتحقق بأجمل وأسهل مما تتمنين.',
  },
  {
    id: 4,
    title: 'صحة وعافية وعمر مديد',
    theme: 'بستان الورد',
    illustrationIcon: '🌷',
    illustrationGradient: 'from-rose-900/40 via-red-900/30 to-slate-900/60',
    hiddenHope:
      'عسى الصحة التامة والعافية والنشاط والبركة يرافقون كل خطوة تخطينها برحلة عمرج المديدة.',
    arabicBlessing: 'صحة وعمر طويل مليان هنا وسعادة ورضى.',
  },
];

export const ChapterSixMemories: React.FC<ChapterSixMemoriesProps> = ({
  onNext,
  onPrev,
  onTriggerConfetti,
}) => {
  const [revealedIds, setRevealedIds] = useState<Set<number>>(new Set());
  const [isFinalWishOpen, setIsFinalWishOpen] = useState<boolean>(false);

  const handleCardClick = (id: number) => {
    soundEngine.playChime();
    setRevealedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleFinalWishClick = () => {
    soundEngine.playSparkle();
    setIsFinalWishOpen(true);
    onTriggerConfetti();
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 max-w-5xl mx-auto" dir="rtl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-400/25 text-rose-200 text-xs font-arabic mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>الفصل ٦: ذكريات وأحلام · آمال ذهبية</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-arabic font-bold text-rose-gold-gradient">
          أحلام وآمال ذهبية ✨
        </h2>
        <p className="text-sm md:text-base text-rose-200/80 mt-2 max-w-lg mx-auto font-arabic leading-relaxed">
          معرض فني يحمل أصدق الأمنيات لمستقبلكِ الجميل. اضغطي على أي بطاقة لاكتشاف الأمنية المخبأة بداخلها.
        </p>
      </div>

      {/* 4 Artistic Memory Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
        {MEMORIES.map((card) => {
          const isRevealed = revealedIds.has(card.id);

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className="group relative cursor-pointer rounded-2xl border border-amber-400/30 bg-slate-900/60 p-5 transition-all duration-300 hover:border-amber-400/70 hover:shadow-xl hover:shadow-rose-950/40 hover:-translate-y-1 overflow-hidden flex flex-col justify-between min-h-[280px] text-right"
            >
              {/* Outer Golden Photo Frame effect */}
              <div className="absolute inset-1 rounded-xl border border-amber-300/20 pointer-events-none" />

              {/* Top info */}
              <div className="flex items-center justify-between text-xs text-rose-300/70 mb-3 z-10 font-arabic">
                <span className="font-semibold text-amber-300">
                  {card.theme}
                </span>
                <span className="text-slate-400">
                  بطاقة {card.id}
                </span>
              </div>

              {/* Artistic Floral Illustration Placeholder */}
              <div
                className={`relative w-full h-32 rounded-xl bg-gradient-to-br ${card.illustrationGradient} border border-amber-400/20 flex flex-col items-center justify-center shadow-inner overflow-hidden transition-transform duration-500 group-hover:scale-102`}
              >
                <div className="absolute -top-10 -left-10 w-24 h-24 bg-rose-400/20 rounded-full blur-xl" />
                
                <span className="text-5xl drop-shadow-md group-hover:scale-110 transition-transform">
                  {card.illustrationIcon}
                </span>
                <span className="font-arabic text-lg text-rose-100 mt-1 font-bold opacity-90">
                  بَنّون
                </span>
              </div>

              {/* Title & Revealed Message */}
              <div className="mt-4 z-10">
                <h4 className="font-arabic font-bold text-rose-100 text-base md:text-lg group-hover:text-amber-200 transition-colors">
                  {card.title}
                </h4>

                {isRevealed ? (
                  <div className="mt-2 p-3 rounded-lg bg-slate-950/80 border border-amber-400/30 animate-in fade-in zoom-in-95 duration-200">
                    <p className="font-arabic text-xs md:text-sm text-rose-200 font-medium leading-relaxed">
                      "{card.hiddenHope}"
                    </p>
                    <p className="font-arabic text-xs text-amber-300 mt-2 font-medium">
                      {card.arabicBlessing}
                    </p>
                  </div>
                ) : (
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400 group-hover:text-amber-300 transition-colors font-arabic">
                    <Eye className="w-3.5 h-3.5" />
                    <span>اضغطي لكشف الأمنية</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* "My Final Wish for You" Section */}
      <div className="w-full mt-10 flex flex-col items-center">
        {!isFinalWishOpen ? (
          <button
            onClick={handleFinalWishClick}
            className="px-8 py-3.5 rounded-full font-arabic text-base md:text-lg font-bold tracking-wide text-slate-950 bg-gradient-to-r from-amber-300 via-rose-300 to-amber-400 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-amber-400/30 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-slate-900" />
            <span>أمنيتي الأخيرة والدائمة إلج</span>
            <Heart className="w-4 h-4 text-rose-800 fill-rose-800" />
          </button>
        ) : (
          <div className="w-full max-w-2xl p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-rose-950/80 via-slate-900/95 to-amber-950/70 border border-amber-400/60 shadow-2xl text-center animate-in fade-in zoom-in-95 duration-500">
            <div className="flex items-center justify-center gap-2 text-amber-300 mb-3">
              <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="font-arabic text-xl font-bold">أمنيتي الدائمة من أعماق القلب</span>
              <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
            </div>

            <p className="font-arabic text-xl md:text-2xl text-rose-100 font-bold leading-relaxed">
              "أمنيتي إلج بسيطة وصادقة: عسى الدنيا تكون أحنّ وألطف عليج من كل ما تتخيّلين، وعسى الفرح يدور عليج وين ما رحتي، ويبقى كلبج دوم مؤمن بكل شي جميل ومبهج في هالحياة. 💗"
            </p>

            <p className="font-arabic text-base md:text-lg text-amber-200 mt-4 leading-loose font-medium">
              عسى أيامج كلها محبة وطمأنينة وضحكات تملي البيت والكون.
            </p>

            <div className="mt-4 pt-3 border-t border-rose-500/20">
              <span className="font-arabic text-xl text-rose-300 font-semibold">
                دوم أتمنى إلج كل الخير والسعادة، يا بَنّون 💗
              </span>
            </div>
          </div>
        )}
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
          <span>الفصل السابق: صندوق الهدايا</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playChime();
            onNext();
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold bg-rose-500/20 border border-rose-400/40 text-rose-200 hover:bg-rose-500/30 hover:scale-105 transition-all shadow-sm font-arabic"
        >
          <span>الفصل التالي: الختام الكبير</span>
          <ChevronLeft className="w-4 h-4 text-rose-300" />
        </button>
      </div>
    </div>
  );
};
