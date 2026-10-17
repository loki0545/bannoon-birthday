import React, { useState } from 'react';
import { Sparkles, Heart, RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react';
import { soundEngine } from '../../services/soundEngine';
import { CAKE_WISHES } from '../../data/chaptersData';

interface ChapterTwoPartyProps {
  onNext: () => void;
  onPrev: () => void;
  onTriggerConfetti: () => void;
  onTriggerFireworks: () => void;
}

export const ChapterTwoParty: React.FC<ChapterTwoPartyProps> = ({
  onNext,
  onPrev,
  onTriggerConfetti,
  onTriggerFireworks,
}) => {
  // 3 candles state: true = lit, false = extinguished
  const [candles, setCandles] = useState<[boolean, boolean, boolean]>([true, true, true]);
  const [currentWish, setCurrentWish] = useState<string>(CAKE_WISHES[0]);
  const [wishCount, setWishCount] = useState<number>(0);
  const [allExtinguishedNotified, setAllExtinguishedNotified] = useState<boolean>(false);

  const litCount = candles.filter(Boolean).length;
  const allExtinguished = litCount === 0;

  const handleCandleClick = (index: number) => {
    if (!candles[index]) return; // Already extinguished

    soundEngine.playCandleBlow();
    const newCandles = [...candles] as [boolean, boolean, boolean];
    newCandles[index] = false;
    setCandles(newCandles);

    // If that was the last candle
    if (newCandles.every((c) => !c)) {
      setTimeout(() => {
        setAllExtinguishedNotified(true);
        soundEngine.playSparkle();
        soundEngine.playFirework();
        onTriggerConfetti();
        onTriggerFireworks();
      }, 500);
    }
  };

  const handleRelight = () => {
    soundEngine.playChime();
    setCandles([true, true, true]);
    setAllExtinguishedNotified(false);
  };

  const handleNewWish = () => {
    soundEngine.playSparkle();
    onTriggerConfetti();
    const nextIdx = (wishCount + 1) % CAKE_WISHES.length;
    setCurrentWish(CAKE_WISHES[nextIdx]);
    setWishCount((prev) => prev + 1);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 max-w-4xl mx-auto" dir="rtl">
      {/* Floating balloons in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute right-[8%] bottom-10 animate-float opacity-80">
          <div className="w-12 h-16 rounded-full bg-gradient-to-t from-rose-500 to-pink-300 shadow-lg shadow-pink-500/20" />
          <div className="w-0.5 h-12 bg-rose-200/40 mx-auto" />
        </div>
        <div className="absolute left-[10%] bottom-20 animate-float-reverse opacity-75" style={{ animationDelay: '1s' }}>
          <div className="w-14 h-18 rounded-full bg-gradient-to-t from-purple-500 to-lavender shadow-lg shadow-purple-500/20" />
          <div className="w-0.5 h-14 bg-purple-200/40 mx-auto" />
        </div>
        <div className="absolute right-[20%] top-20 animate-float opacity-70" style={{ animationDelay: '2s' }}>
          <div className="w-10 h-14 rounded-full bg-gradient-to-t from-amber-500 to-yellow-200 shadow-lg shadow-amber-500/20" />
          <div className="w-0.5 h-10 bg-amber-200/40 mx-auto" />
        </div>
        <div className="absolute left-[22%] top-16 animate-float-reverse opacity-80" style={{ animationDelay: '1.5s' }}>
          <div className="w-11 h-15 rounded-full bg-gradient-to-t from-pink-600 to-rose-300 shadow-lg shadow-pink-500/20" />
          <div className="w-0.5 h-12 bg-rose-200/40 mx-auto" />
        </div>
      </div>

      {/* Header Deck */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-400/25 text-rose-200 text-xs font-arabic mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>الفصل ۲: حفلة عيد الميلاد · كعكة بَنّون</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-arabic font-bold text-rose-gold-gradient">
          تمنّي أمنية يا بَنّون! 🎂
        </h2>
        <p className="text-sm md:text-base text-rose-200/80 mt-2 max-w-lg mx-auto font-arabic leading-relaxed">
          {allExtinguished
            ? 'انطفأت جميع الشموع! طارت أمنياتكِ ووصلت إلى النجوم لتتحقق بإذن الله ✨'
            : 'اضغطي على كل شعلة شمعة لتطفئيها وتتمنّي أمنية عيد ميلادكِ السرية!'}
        </p>
      </div>

      {/* Birthday Cake Scene */}
      <div className="relative my-4 flex flex-col items-center">
        {/* Candles Row */}
        <div className="flex items-end justify-center gap-8 md:gap-12 -mb-2 z-20">
          {candles.map((isLit, idx) => (
            <div
              key={idx}
              onClick={() => handleCandleClick(idx)}
              className="flex flex-col items-center cursor-pointer group"
              title={isLit ? 'اضغطي لإطفاء الشمعة' : 'انطفأت بالحب والدعاء'}
            >
              {/* Flame or Smoke */}
              <div className="h-10 flex items-center justify-center">
                {isLit ? (
                  <div className="relative animate-flame">
                    {/* Flame Core */}
                    <div className="w-4 h-7 rounded-full bg-gradient-to-t from-amber-500 via-yellow-300 to-white shadow-lg shadow-amber-400/60" />
                    {/* Outer Flame Glow */}
                    <div className="absolute -inset-1 rounded-full bg-amber-400/40 blur-sm -z-10 animate-pulse" />
                  </div>
                ) : (
                  <div className="animate-smoke flex flex-col items-center">
                    <span className="text-xs text-slate-400">💨</span>
                    <div className="w-1 h-3 bg-slate-500/40 rounded-full blur-[1px]" />
                  </div>
                )}
              </div>

              {/* Candle Body */}
              <div
                className={`w-3.5 md:w-4 h-12 md:h-14 rounded-t-sm transition-all duration-300 shadow-md ${
                  idx === 0
                    ? 'bg-gradient-to-b from-rose-300 via-rose-400 to-rose-500'
                    : idx === 1
                    ? 'bg-gradient-to-b from-amber-200 via-amber-300 to-amber-500'
                    : 'bg-gradient-to-b from-purple-300 via-purple-400 to-purple-500'
                } ${isLit ? 'group-hover:scale-105' : 'opacity-80'}`}
              >
                {/* Spiral decorative stripes */}
                <div className="w-full h-full opacity-30 bg-[repeating-linear-gradient(45deg,#fff,#fff_2px,transparent_2px,transparent_6px)]" />
              </div>
            </div>
          ))}
        </div>

        {/* The 3-Tier Luxury Cake */}
        <div className="flex flex-col items-center z-10">
          {/* Top Tier */}
          <div className="w-44 md:w-56 h-14 md:h-16 rounded-t-2xl bg-gradient-to-b from-pink-100 via-rose-200 to-pink-300 border-t-2 border-x-2 border-white/60 relative shadow-md flex items-center justify-center overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-4 bg-white/70 rounded-b-xl shadow-sm" />
            <div className="absolute inset-x-0 bottom-1 flex justify-around">
              <span className="text-xs">🍓</span>
              <span className="text-xs">✨</span>
              <span className="text-xs">🍓</span>
            </div>
          </div>

          {/* Middle Tier */}
          <div className="w-56 md:w-72 h-16 md:h-20 rounded-t-xl bg-gradient-to-b from-rose-200 via-pink-300 to-rose-400 border-x-2 border-white/40 relative shadow-lg flex items-center justify-center">
            <div className="absolute top-0 inset-x-0 h-4 bg-pink-100/80 rounded-b-xl" />
            <span className="font-arabic text-2xl md:text-3xl text-rose-950 font-bold tracking-wider drop-shadow-sm">
              بَنّون الحلوة
            </span>
          </div>

          {/* Bottom Tier */}
          <div className="w-68 md:w-88 h-18 md:h-22 rounded-t-lg bg-gradient-to-b from-pink-300 via-rose-400 to-rose-600 border-x-2 border-white/30 relative shadow-xl flex items-center justify-center">
            <div className="absolute top-0 inset-x-0 h-4 bg-white/80 rounded-b-xl" />
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-white fill-white/80" />
              <span className="font-arabic text-xl md:text-2xl text-white font-bold tracking-wide">
                عيد ميلاد سعيد يا بَنّون 🎂
              </span>
              <Heart className="w-4 h-4 text-white fill-white/80" />
            </div>
          </div>

          {/* Golden Stand Plate */}
          <div className="w-76 md:w-96 h-4 md:h-5 rounded-full bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 shadow-2xl border-t border-amber-100" />
          <div className="w-32 md:w-40 h-5 bg-gradient-to-b from-amber-400 to-amber-600 rounded-b-xl shadow-lg" />
        </div>

        {/* Extinguish status info */}
        <div className="mt-4 flex items-center gap-2 text-xs font-arabic text-rose-300">
          {!allExtinguished ? (
            <span>الشموع المتبقية: {litCount} من ۳</span>
          ) : (
            <button
              onClick={handleRelight}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 hover:border-amber-400 text-amber-200 text-xs font-arabic transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>إعادة إشعال الشموع</span>
            </button>
          )}
        </div>
      </div>

      {/* When All Candles Extinguished: The Mandatory Birthday Toast in Arabic */}
      {allExtinguishedNotified && (
        <div className="w-full max-w-2xl mt-6 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-rose-950/70 via-slate-900/90 to-purple-950/70 border border-amber-400/50 shadow-2xl text-center animate-in fade-in zoom-in-95 duration-500">
          <div className="flex items-center justify-center gap-2 text-amber-300 mb-2">
            <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
            <span className="font-arabic text-xl font-bold">أمنيات من أعماق القلب</span>
            <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
          </div>

          <p className="font-arabic text-xl md:text-2xl text-rose-100 font-bold leading-relaxed">
            "اليوم كلّه مخصص إلج يا بَنّون! عسى عمرج دوم مليان سعادة ولحظات حلوة وابتسامة ما تفارق وجهج أبداً. 💗"
          </p>

          <p className="font-arabic text-base md:text-lg text-amber-200 mt-3 font-medium leading-loose">
            كل ثانية وكل دقيقة اليوم تحتفل بوجودج وبطيبتج يا أحلى بَنّون 🌸
          </p>

          {/* Random Wish Dispenser Button */}
          <div className="mt-6 pt-6 border-t border-rose-500/20 flex flex-col items-center">
            <div className="min-h-[48px] flex items-center justify-center px-4">
              <p className="text-base md:text-lg text-rose-200 font-arabic font-medium">
                "{currentWish}"
              </p>
            </div>

            <button
              onClick={handleNewWish}
              className="mt-4 px-6 py-2.5 rounded-full text-sm font-arabic font-bold tracking-wide bg-gradient-to-r from-amber-400 to-rose-400 text-slate-950 hover:scale-105 active:scale-95 transition-all shadow-md shadow-rose-500/20"
            >
              ✨ تمنّي أمنية أخرى ✨
            </button>
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
          <span>الفصل السابق: المفاجأة الساحرة</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playChime();
            onNext();
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold bg-rose-500/20 border border-rose-400/40 text-rose-200 hover:bg-rose-500/30 hover:scale-105 transition-all shadow-sm font-arabic"
        >
          <span>الفصل التالي: رسائل من القلب</span>
          <ChevronLeft className="w-4 h-4 text-rose-300" />
        </button>
      </div>
    </div>
  );
};
