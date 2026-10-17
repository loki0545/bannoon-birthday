import React, { useState } from 'react';
import { Sparkles, Heart, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { soundEngine } from '../../services/soundEngine';
import { DIAMOND_WISHES } from '../../data/chaptersData';

interface ChapterFiveGiftBoxProps {
  onNext: () => void;
  onPrev: () => void;
  onTriggerConfetti: () => void;
  onTriggerFireworks: () => void;
}

type GiftType = 'rose' | 'diamond' | 'secretLetter' | null;

export const ChapterFiveGiftBox: React.FC<ChapterFiveGiftBoxProps> = ({
  onNext,
  onPrev,
  onTriggerConfetti,
  onTriggerFireworks,
}) => {
  const [boxState, setBoxState] = useState<'closed' | 'shaking' | 'untying' | 'opened'>('closed');
  const [selectedGift, setSelectedGift] = useState<GiftType>(null);
  const [diamondWishIndex, setDiamondWishIndex] = useState<number>(0);

  const handleBoxClick = () => {
    if (boxState !== 'closed') return;

    soundEngine.playChime();
    setBoxState('shaking');

    setTimeout(() => {
      setBoxState('untying');
      soundEngine.playTone(523.25, 0.4, 'sine', 0.5);

      setTimeout(() => {
        setBoxState('opened');
        soundEngine.playGiftOpen();
        onTriggerConfetti();
        onTriggerFireworks();
      }, 700);
    }, 600);
  };

  const handleOpenGift = (gift: GiftType) => {
    soundEngine.playSparkle();
    setSelectedGift(gift);
    if (gift === 'diamond') {
      setDiamondWishIndex((prev) => (prev + 1) % DIAMOND_WISHES.length);
    }
  };

  const handleNextDiamondWish = () => {
    soundEngine.playSparkle();
    setDiamondWishIndex((prev) => (prev + 1) % DIAMOND_WISHES.length);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 max-w-4xl mx-auto" dir="rtl">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-400/25 text-rose-200 text-xs font-arabic mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>الفصل ٥: صندوق الهدايا السحري · مفاجآت بَنّون</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-arabic font-bold text-rose-gold-gradient">
          هدية خاصة لبَنّون 🎀
        </h2>
        <p className="text-sm md:text-base text-rose-200/80 mt-2 max-w-md mx-auto font-arabic leading-relaxed">
          {boxState === 'closed'
            ? 'صندوق فاخر ملفوف بالحرير والذهب. اضغطي على الصندوق لفكّ الشريط وفتح المفاجأة!'
            : 'انفتحت كنوزكِ السحرية! اختاري أي هدية أدناه لتكتشفي ما تخبئه لكِ.'}
        </p>
      </div>

      {/* 3D Interactive Gift Box */}
      <div className="relative my-6 flex flex-col items-center justify-center perspective-1000">
        <div
          onClick={handleBoxClick}
          className={`relative cursor-pointer transition-transform duration-500 ${
            boxState === 'shaking'
              ? 'animate-box-shake'
              : boxState === 'opened'
              ? 'scale-105'
              : 'hover:scale-105 active:scale-95'
          }`}
        >
          {/* Box Container */}
          <div className="relative w-52 md:w-64 h-52 md:h-64 flex flex-col items-center justify-end">
            {/* Box Lid */}
            <div
              className={`absolute top-6 z-20 w-56 md:w-70 h-16 rounded-xl bg-gradient-to-r from-rose-600 via-pink-500 to-rose-700 shadow-xl border-t border-rose-300 transition-all duration-700 ${
                boxState === 'opened'
                  ? '-translate-y-20 -rotate-12 opacity-85'
                  : boxState === 'untying'
                  ? '-translate-y-4'
                  : 'translate-y-0'
              }`}
            >
              {/* Ribbon Bow on top */}
              <div className="absolute -top-6 inset-x-0 flex items-center justify-center">
                <div
                  className={`relative flex items-center justify-center transition-all duration-500 ${
                    boxState === 'untying' || boxState === 'opened'
                      ? 'scale-125 opacity-70'
                      : ''
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-600 shadow-md border border-amber-200" />
                  {/* Ribbon Loops */}
                  <div className="absolute -right-6 w-8 h-6 rounded-full border-2 border-amber-300 bg-amber-400/60 rotate-25 shadow-sm" />
                  <div className="absolute -left-6 w-8 h-6 rounded-full border-2 border-amber-300 bg-amber-400/60 -rotate-25 shadow-sm" />
                </div>
              </div>

              {/* Vertical Lid Ribbon */}
              <div className="w-8 h-full bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-500 mx-auto shadow-sm" />
            </div>

            {/* Box Base */}
            <div className="relative w-52 md:w-64 h-40 md:h-48 rounded-b-2xl bg-gradient-to-br from-rose-700 via-pink-600 to-rose-800 shadow-2xl border-x border-b border-rose-400/40 overflow-hidden flex items-center justify-center">
              {/* Vertical Base Ribbon */}
              <div className="w-8 h-full bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-500 shadow-sm" />

              {/* Horizontal Base Ribbon */}
              <div className="absolute inset-y-0 my-auto h-8 w-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 shadow-sm" />

              {/* Center Seal */}
              <div className="absolute z-10 w-10 h-10 rounded-full bg-slate-950/80 border-2 border-amber-300 flex items-center justify-center shadow-lg">
                <Heart className="w-5 h-5 text-amber-300 fill-amber-300/40" />
              </div>

              {/* Ambient Glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>

            {/* Box Shadow */}
            <div className="w-48 md:w-60 h-6 bg-black/40 rounded-full blur-md -mt-2 -z-10" />
          </div>
        </div>

        {boxState === 'closed' && (
          <p className="mt-4 text-xs font-arabic font-semibold tracking-wide text-amber-300 animate-pulse">
            ✨ اضغطي على الصندوق لفتحه ✨
          </p>
        )}
      </div>

      {/* When Opened: Glowing Gift Message */}
      {boxState === 'opened' && (
        <div className="w-full mt-4 text-center animate-in fade-in zoom-in-95 duration-500">
          <div className="max-w-xl mx-auto p-5 rounded-2xl bg-gradient-to-r from-rose-950/80 via-slate-900/90 to-purple-950/80 border border-amber-400/50 shadow-xl mb-6">
            <p className="font-arabic text-xl md:text-2xl text-rose-100 font-bold leading-relaxed">
              "هالهدية البسيطة وياها دعوة من كل كلبي: عسى البسمة دوم منورة وجهج الطيب يا بَنّون. 💗"
            </p>
            <p className="font-arabic text-sm md:text-base text-amber-300 mt-2 font-medium">
              تستاهلين كل خير وفرح في هالدنيا!
            </p>
          </div>

          {/* Three Virtual Gifts Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            {/* Gift 1: Rose */}
            <button
              onClick={() => handleOpenGift('rose')}
              className="p-5 rounded-2xl bg-slate-900/70 border border-rose-500/30 hover:border-rose-400 hover:bg-slate-900 transition-all flex flex-col items-center text-center group hover:scale-105 shadow-md"
            >
              <span className="text-4xl mb-3 group-hover:scale-125 transition-transform">
                🌷
              </span>
              <h4 className="font-arabic font-bold text-rose-100 text-lg">
                الهدية الأولى — وردة العمر
              </h4>
              <span className="font-arabic text-xs text-amber-300 mt-1">وردة الجوري</span>
              <span className="text-xs text-slate-400 mt-2 font-arabic">اضغطي لمشاهدة الهدية</span>
            </button>

            {/* Gift 2: Diamond of Wishes */}
            <button
              onClick={() => handleOpenGift('diamond')}
              className="p-5 rounded-2xl bg-slate-900/70 border border-amber-500/30 hover:border-amber-400 hover:bg-slate-900 transition-all flex flex-col items-center text-center group hover:scale-105 shadow-md"
            >
              <span className="text-4xl mb-3 group-hover:scale-125 transition-transform">
                💎
              </span>
              <h4 className="font-arabic font-bold text-amber-100 text-lg">
                الهدية الثانية — ماسة الأمنيات
              </h4>
              <span className="font-arabic text-xs text-amber-300 mt-1">ماسة متلألئة</span>
              <span className="text-xs text-slate-400 mt-2 font-arabic">اضغطي لكشف أمنية</span>
            </button>

            {/* Gift 3: Secret Letter */}
            <button
              onClick={() => handleOpenGift('secretLetter')}
              className="p-5 rounded-2xl bg-slate-900/70 border border-purple-500/30 hover:border-purple-400 hover:bg-slate-900 transition-all flex flex-col items-center text-center group hover:scale-105 shadow-md"
            >
              <span className="text-4xl mb-3 group-hover:scale-125 transition-transform">
                💌
              </span>
              <h4 className="font-arabic font-bold text-purple-100 text-lg">
                الهدية الثالثة — رسالة سرية
              </h4>
              <span className="font-arabic text-xs text-amber-300 mt-1">رسالة خاصة</span>
              <span className="text-xs text-slate-400 mt-2 font-arabic">اضغطي لقراءة الرسالة</span>
            </button>
          </div>
        </div>
      )}

      {/* Gift Detail Modal Overlays */}
      {selectedGift && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200" dir="rtl">
          <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-amber-400/50 rounded-3xl p-6 sm:p-8 shadow-2xl text-center">
            {/* Close button */}
            <button
              onClick={() => {
                soundEngine.playChime();
                setSelectedGift(null);
              }}
              className="absolute top-4 left-4 p-2 rounded-full text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
              aria-label="إغلاق النافذة"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Gift 1: Rose modal */}
            {selectedGift === 'rose' && (
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-rose-500/20 border-2 border-rose-400/50 flex items-center justify-center text-5xl mb-4 shadow-lg shadow-rose-500/30 animate-float">
                  🌷
                </div>
                <h3 className="font-arabic text-2xl font-bold text-rose-gold-gradient mb-2">
                  وردة خاصة لعيون بَنّون 🌸
                </h3>
                <p className="font-arabic text-xl md:text-2xl text-rose-100 font-bold leading-relaxed my-4">
                  "لإنسانة تستاهل كل بساتين وورود الدنيا."
                </p>
                <p className="font-arabic text-base text-amber-300 mt-1">
                  عسى عمرج دوم يفوح عطر وفرح وطمأنينة! 🌹
                </p>
              </div>
            )}

            {/* Gift 2: Diamond modal */}
            {selectedGift === 'diamond' && (
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-amber-500/20 border-2 border-amber-400/50 flex items-center justify-center text-5xl mb-4 shadow-lg shadow-amber-500/30 animate-pulse">
                  💎
                </div>
                <h3 className="font-arabic text-2xl font-bold text-gold-gradient mb-2">
                  ماسة الأمنيات السحرية ✨
                </h3>
                <div className="min-h-[72px] flex items-center justify-center my-3">
                  <p className="font-arabic text-xl md:text-2xl text-amber-100 font-semibold leading-relaxed">
                    "{DIAMOND_WISHES[diamondWishIndex]}"
                  </p>
                </div>
                <button
                  onClick={handleNextDiamondWish}
                  className="mt-4 px-6 py-2.5 rounded-full text-sm font-arabic font-bold bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 hover:scale-105 active:scale-95 transition-all shadow-md"
                >
                  ✨ اضغطي على الماسة لأمنية جديدة ✨
                </button>
              </div>
            )}

            {/* Gift 3: Secret Letter modal */}
            {selectedGift === 'secretLetter' && (
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-purple-500/20 border-2 border-purple-400/50 flex items-center justify-center text-5xl mb-4 shadow-lg shadow-purple-500/30 animate-float">
                  💌
                </div>
                <h3 className="font-arabic text-2xl font-bold text-rose-gold-gradient mb-2">
                  رسالة سرّية من القلب 💗
                </h3>
                <div className="p-5 rounded-2xl bg-[#FFFDF8] text-slate-900 border border-amber-300 shadow-md my-4">
                  <p className="font-arabic text-xl md:text-2xl text-slate-900 font-bold leading-relaxed">
                    "لو بيدي أهديج هدية تبقى للأبد، جان هديتج كلب ما يعرف الحزن، وعيون ما تفارقها دمعة الفرح."
                  </p>
                  <p className="font-arabic text-base text-amber-900 mt-3 font-medium leading-loose">
                    كل عام وسعادتج تكبر وابتسامتج تزيد نضارة يا بَنّون.
                  </p>
                </div>
              </div>
            )}
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
          <span>الفصل السابق: قصيدة لبَنّون</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playChime();
            onNext();
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold bg-rose-500/20 border border-rose-400/40 text-rose-200 hover:bg-rose-500/30 hover:scale-105 transition-all shadow-sm font-arabic"
        >
          <span>الفصل التالي: ذكريات وأحلام</span>
          <ChevronLeft className="w-4 h-4 text-rose-300" />
        </button>
      </div>
    </div>
  );
};
