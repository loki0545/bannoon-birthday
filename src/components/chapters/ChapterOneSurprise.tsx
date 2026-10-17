import React, { useState, useEffect } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { soundEngine } from '../../services/soundEngine';

interface ChapterOneSurpriseProps {
  onOpenSurprise: () => void;
}

export const ChapterOneSurprise: React.FC<ChapterOneSurpriseProps> = ({ onOpenSurprise }) => {
  const lineOne = "شخص مميز يستحق يوماً ساحراً... 💗";
  const [displayedText, setDisplayedText] = useState("");
  const [showBirthdayReveal, setShowBirthdayReveal] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  // Typewriter effect
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= lineOne.length) {
        setDisplayedText(lineOne.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setShowBirthdayReveal(true);
          soundEngine.playSparkle();
          setTimeout(() => {
            setShowButton(true);
          }, 800);
        }, 600);
      }
    }, 70);

    return () => clearInterval(interval);
  }, []);

  const handleOpenClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    soundEngine.playSparkle();
    soundEngine.playFirework();
    // Start gentle music if not playing
    if (!soundEngine.getPlaying()) {
      soundEngine.startMusicBox();
    }
    setTimeout(() => {
      onOpenSurprise();
    }, 900);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-12 select-none overflow-hidden" dir="rtl">
      {/* Soft celestial halo in background */}
      <div className="absolute w-[340px] md:w-[540px] h-[340px] md:h-[540px] rounded-full bg-gradient-to-tr from-rose-500/10 via-purple-600/15 to-amber-400/10 blur-3xl -z-10 pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />

      {/* Decorative floating icons */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <Sparkles className="w-5 h-5 text-amber-300 animate-bounce" style={{ animationDuration: '3s' }} />
        <span className="font-arabic text-amber-300 text-lg md:text-2xl font-semibold tracking-wide">
          بِسْمِ الحُبِّ وَالفَرَحْ
        </span>
        <Heart className="w-5 h-5 text-rose-400 fill-rose-400/40 animate-pulse" style={{ animationDuration: '2s' }} />
      </div>

      {/* Typewriter suspense message */}
      <div className="min-h-[60px] md:min-h-[72px] flex items-center justify-center">
        <p className="font-arabic text-2xl md:text-4xl lg:text-5xl text-rose-100 font-bold tracking-wide max-w-2xl leading-relaxed">
          {displayedText}
          <span className="inline-block w-1.5 h-6 md:h-8 bg-rose-400 mr-1 animate-pulse align-middle" />
        </p>
      </div>

      {/* Grand Happy Birthday Reveal */}
      <div
        className={`mt-6 transition-all duration-1000 transform ${
          showBirthdayReveal
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-6 scale-95 pointer-events-none'
        }`}
      >
        <div className="inline-block relative">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-arabic font-extrabold tracking-tight text-rose-gold-gradient drop-shadow-lg leading-tight">
            كل عام وإنتِ بألف خير يا بَنّون! 🎂
          </h1>
          <p className="font-arabic text-2xl md:text-3xl text-amber-300 mt-3 font-semibold drop-shadow-md">
            عيد ميلاد سعيد لأغلى الناس 💗
          </p>
        </div>
      </div>

      {/* Interactive Glowing Button */}
      <div
        className={`mt-10 md:mt-14 transition-all duration-700 transform ${
          showButton
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        <button
          onClick={handleOpenClick}
          disabled={isOpening}
          className={`relative group px-10 md:px-14 py-4 md:py-5 rounded-full font-arabic text-xl md:text-2xl font-bold tracking-wide text-slate-950 transition-all duration-300 ${
            isOpening ? 'scale-95 opacity-80' : 'hover:scale-105 active:scale-95'
          }`}
          style={{
            background: 'linear-gradient(135deg, #FFE4E6 0%, #FBBF24 50%, #F472B6 100%)',
            boxShadow: '0 0 35px rgba(251, 191, 36, 0.45), 0 0 70px rgba(244, 114, 182, 0.25)',
          }}
        >
          <span className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-slate-900 group-hover:rotate-12 transition-transform" />
            <span>افتحي مفاجأتِك</span>
            <span className="text-2xl">🎁</span>
          </span>

          {/* Glowing pulse ring */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 via-rose-400 to-purple-500 opacity-40 blur-md group-hover:opacity-80 transition-opacity -z-10 animate-pulse" />
        </button>

        <p className="text-xs md:text-sm text-rose-200/70 mt-4 tracking-wide font-arabic">
          اضغطي لتدخلي إلى عالم احتفالكِ الساحر ✨
        </p>
      </div>
    </div>
  );
};
