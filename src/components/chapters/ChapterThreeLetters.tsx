import React, { useState } from 'react';
import { Mail, Sparkles, Heart, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { soundEngine } from '../../services/soundEngine';

interface ChapterThreeLettersProps {
  onNext: () => void;
  onPrev: () => void;
  onTriggerConfetti: () => void;
}

interface LetterData {
  id: number;
  label: string;
  arabicLabel: string;
  sealColor: string;
  message: string;
  arabicBlessing: string;
}

const LETTERS: LetterData[] = [
  {
    id: 1,
    label: 'الرسالة الأولى',
    arabicLabel: 'يوم استثنائي',
    sealColor: 'from-amber-600 to-amber-800',
    message:
      'اليوم مو مجرد يوم عادي، هذا اليوم اللي نوّرتِ بيه الدنيا بإطلالتج وحضورج المميز. كل عام وإنتِ بألف خير يا بَنّون! 🌷',
    arabicBlessing: 'يوم ميلادج هو ميلاد الفرح لقلوبنا كلنا.',
  },
  {
    id: 2,
    label: 'الرسالة الثانية',
    arabicLabel: 'ابتسامة وسلام',
    sealColor: 'from-rose-600 to-rose-800',
    message:
      'أتمنى ضحكتج الحلوة ما تغيب أبداً، وكلبج دوم يحس بالأمان والسلام، وأيامكِ تفيض بأسباب الفرح والراحة.',
    arabicBlessing: 'عسى ضحكتج تدوم وراحة بالج ما تفارق روحج الطيبة.',
  },
  {
    id: 3,
    label: 'الرسالة الثالثة',
    arabicLabel: 'أمنية من الأعماق',
    sealColor: 'from-purple-600 to-purple-800',
    message:
      'لو أگدر أهديج أي شي بهالدنيا، جان أهديتج راحة بال أبدية، وكلب مليان فرح، وأحلاماً حلوة تتحقق بلمحة بصر.',
    arabicBlessing: 'لو بيدي أهديج الكون، أهديج سعادة وسكينة تملأ كل ثانية من عمرج.',
  },
  {
    id: 4,
    label: 'الرسالة الرابعة',
    arabicLabel: 'خطوات نحو الأحلام',
    sealColor: 'from-pink-600 to-pink-800',
    message:
      'عسى كل سنة جديدة من عمرج تقرّبج أكثر وأكثر لكل شي تمنيتيه وسعيتي لإله بحياتج.',
    arabicBlessing: 'كل عام وإنتِ بألف خطوة أقرب لكل طموح وأمنية ببالج.',
  },
  {
    id: 5,
    label: 'الرسالة الخامسة',
    arabicLabel: 'أكثر من احتفال',
    sealColor: 'from-red-600 to-red-800',
    message:
      'إنتِ تستاهلين أكثر بهواية من مجرد احتفال بيوم ميلاد. تستاهلين لحظات دافية، وسعادة حقيقية، وعمر طويل مليان ذكريات ما تُنسى.',
    arabicBlessing: 'تستاهلين الفرح اللي ما ينتهي، والذكريات اللي تبقى ناصعة ومضيئة.',
  },
];

export const ChapterThreeLetters: React.FC<ChapterThreeLettersProps> = ({
  onNext,
  onPrev,
  onTriggerConfetti,
}) => {
  const [openedLetters, setOpenedLetters] = useState<Set<number>>(new Set());
  const [activeLetter, setActiveLetter] = useState<LetterData | null>(null);

  const handleOpenLetter = (letter: LetterData) => {
    soundEngine.playChime();
    setActiveLetter(letter);
    setOpenedLetters((prev) => {
      const next = new Set(prev);
      next.add(letter.id);
      if (next.size === LETTERS.length) {
        soundEngine.playSparkle();
        onTriggerConfetti();
      }
      return next;
    });
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 max-w-5xl mx-auto" dir="rtl">
      {/* Chapter header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-400/25 text-rose-200 text-xs font-arabic mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>الفصل ۳: رسائل من القلب · كلمات كتبت بحب</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-arabic font-bold text-rose-gold-gradient">
          رسائل مختومة بالحب 💌
        </h2>
        <p className="text-sm md:text-base text-rose-200/80 mt-2 max-w-lg mx-auto font-arabic leading-relaxed">
          خمس رسائل مختومة بالشمع الأحمر كُتبت خصيصاً لكِ يا بَنّون. اضغطي على أي ظرف لفتحه وقراءة ما يحمله.
        </p>

        {/* Unsealed count badge */}
        <div className="mt-3 flex items-center justify-center gap-2 text-xs font-arabic text-amber-300/90">
          <span>تم فتح: {openedLetters.size} من ٥</span>
          {openedLetters.size === 5 && (
            <span className="text-emerald-400 font-medium">· فُتحت جميع الرسائل بالحب! 💖</span>
          )}
        </div>
      </div>

      {/* 5 Envelopes Showcase Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5 w-full">
        {LETTERS.map((letter) => {
          const isOpened = openedLetters.has(letter.id);
          const isSelected = activeLetter?.id === letter.id;

          return (
            <div
              key={letter.id}
              onClick={() => handleOpenLetter(letter)}
              className={`relative cursor-pointer transition-all duration-300 rounded-2xl p-4 flex flex-col items-center justify-between min-h-[190px] group border ${
                isSelected
                  ? 'bg-rose-950/70 border-amber-400 shadow-xl shadow-rose-900/40 scale-105'
                  : isOpened
                  ? 'bg-slate-900/80 border-rose-400/30 hover:border-rose-400/60 hover:scale-102'
                  : 'bg-slate-900/50 border-slate-800 hover:border-amber-400/40 hover:bg-slate-900/70 hover:scale-102'
              }`}
            >
              {/* Header inside envelope */}
              <div className="w-full flex items-center justify-between text-xs text-rose-300/70 font-arabic">
                <span className="font-semibold">{letter.label}</span>
                {isOpened && (
                  <span className="flex items-center gap-1 text-emerald-400 text-[11px] font-medium">
                    <Check className="w-3 h-3" /> تم الفتح
                  </span>
                )}
              </div>

              {/* Envelope flap visual */}
              <div className="relative my-2 w-full flex flex-col items-center">
                <div className="w-24 h-16 rounded-lg bg-gradient-to-br from-rose-100 via-rose-200 to-amber-100 shadow-md relative overflow-hidden flex items-center justify-center border border-amber-300/40">
                  <div className="absolute top-0 inset-x-0 h-8 border-b border-rose-300/60 bg-gradient-to-b from-rose-200/90 to-transparent" />
                  
                  {/* Wax Seal */}
                  <div
                    className={`relative z-10 w-8 h-8 rounded-full bg-gradient-to-br ${letter.sealColor} flex items-center justify-center shadow-lg border border-amber-300/50 group-hover:rotate-12 transition-transform`}
                  >
                    <Heart className="w-3.5 h-3.5 text-amber-200 fill-amber-200/40" />
                  </div>
                </div>
              </div>

              {/* Title & Prompt */}
              <div className="text-center w-full">
                <p className="font-arabic text-xs text-amber-300/90 font-medium">
                  {letter.arabicLabel}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5 group-hover:text-rose-200 transition-colors font-arabic">
                  {isOpened ? 'إعادة القراءة' : 'اضغطي للفتح'}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expanded Letter Viewer Modal / Card */}
      {activeLetter && (
        <div className="w-full mt-8 p-6 md:p-8 rounded-2xl bg-gradient-to-b from-[#FFFDF9] to-[#FDF8EE] text-slate-900 shadow-2xl border border-amber-300/60 relative animate-in fade-in zoom-in-95 duration-300 text-right">
          {/* Subtle floral watermark effect */}
          <div className="absolute top-4 left-4 text-3xl opacity-20 pointer-events-none">
            🌹
          </div>
          <div className="absolute bottom-4 right-4 text-3xl opacity-20 pointer-events-none">
            🕊️
          </div>

          <div className="flex items-center justify-between border-b border-amber-200/80 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-700" />
              <span className="font-arabic font-bold text-amber-900 text-base md:text-lg">
                {activeLetter.label} · من أجلكِ يا بَنّون
              </span>
            </div>
            <span className="font-arabic text-sm text-amber-800 font-medium">
              {activeLetter.arabicLabel}
            </span>
          </div>

          {/* Message Prose */}
          <p className="font-arabic text-xl md:text-2xl text-slate-900 leading-relaxed font-bold">
            "{activeLetter.message}"
          </p>

          <p className="font-arabic text-base md:text-lg text-amber-900 mt-4 leading-loose font-medium">
            {activeLetter.arabicBlessing}
          </p>

          {/* Handwritten Sign-off */}
          <div className="mt-6 pt-4 border-t border-amber-200/60 flex items-center justify-between">
            <span className="font-arabic text-lg md:text-xl text-rose-800 font-semibold">
              بكل حب ومعزّة، لبَنّون 💗
            </span>
            <span className="text-xs text-stone-500 font-arabic">
              الرسالة {activeLetter.id} من ٥
            </span>
          </div>
        </div>
      )}

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
          <span>الفصل السابق: حفلة الميلاد</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playChime();
            onNext();
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold bg-rose-500/20 border border-rose-400/40 text-rose-200 hover:bg-rose-500/30 hover:scale-105 transition-all shadow-sm font-arabic"
        >
          <span>الفصل التالي: قصيدة خاصة لبَنّون</span>
          <ChevronLeft className="w-4 h-4 text-rose-300" />
        </button>
      </div>
    </div>
  );
};
