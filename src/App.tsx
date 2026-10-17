/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BackgroundEffects } from './components/BackgroundEffects';
import { TopNavigation } from './components/TopNavigation';
import { ChapterDrawer } from './components/ChapterDrawer';
import { ChapterOneSurprise } from './components/chapters/ChapterOneSurprise';
import { ChapterTwoParty } from './components/chapters/ChapterTwoParty';
import { ChapterThreeLetters } from './components/chapters/ChapterThreeLetters';
import { ChapterFourPoem } from './components/chapters/ChapterFourPoem';
import { ChapterFiveGiftBox } from './components/chapters/ChapterFiveGiftBox';
import { ChapterSixMemories } from './components/chapters/ChapterSixMemories';
import { ChapterSevenFinale } from './components/chapters/ChapterSevenFinale';
import { soundEngine } from './services/soundEngine';

export default function App() {
  const [activeChapter, setActiveChapter] = useState<number>(1);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [confettiTrigger, setConfettiTrigger] = useState<number>(0);
  const [fireworksTrigger, setFireworksTrigger] = useState<number>(0);

  const triggerConfetti = () => {
    setConfettiTrigger((prev) => prev + 1);
  };

  const triggerFireworks = () => {
    setFireworksTrigger((prev) => prev + 1);
  };

  const handleToggleMusic = () => {
    const newState = soundEngine.toggleMusic();
    setIsMusicPlaying(newState);
  };

  const handleToggleMute = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const handleOpenSurprise = () => {
    triggerConfetti();
    triggerFireworks();
    setIsMusicPlaying(soundEngine.getPlaying());
    setActiveChapter(2);
  };

  const handleSelectChapter = (id: number) => {
    setActiveChapter(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextChapter = () => {
    if (activeChapter < 7) {
      handleSelectChapter(activeChapter + 1);
    }
  };

  const handlePrevChapter = () => {
    if (activeChapter > 1) {
      handleSelectChapter(activeChapter - 1);
    }
  };

  const handleRestart = () => {
    handleSelectChapter(1);
    triggerConfetti();
  };

  // Determine background animation intensity
  const bgIntensity =
    activeChapter === 7 ? 'fireworks' : activeChapter === 2 ? 'celebration' : 'subtle';

  return (
    <div
      className="min-h-screen bg-[#0A0512] text-rose-100 flex flex-col relative overflow-x-hidden selection:bg-rose-500/30 selection:text-white"
      dir="rtl"
    >
      {/* Background canvas effects: Stars, Petals, Hearts, Confetti & Fireworks */}
      <BackgroundEffects
        intensity={bgIntensity}
        triggerConfetti={confettiTrigger}
        triggerFireworks={fireworksTrigger}
      />

      {/* Top Bar Navigation */}
      <TopNavigation
        currentChapter={activeChapter}
        onSelectChapter={handleSelectChapter}
        onToggleDrawer={() => setDrawerOpen((prev) => !prev)}
        isMusicPlaying={isMusicPlaying}
        isMuted={isMuted}
        onToggleMusic={handleToggleMusic}
        onToggleMute={handleToggleMute}
      />

      {/* Chapter Drawer modal */}
      <ChapterDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        currentChapter={activeChapter}
        onSelectChapter={handleSelectChapter}
      />

      {/* Main Chapter Stage */}
      <main className="flex-1 flex flex-col pt-16 md:pt-20 pb-8 px-4 relative z-10">
        {activeChapter === 1 && (
          <ChapterOneSurprise onOpenSurprise={handleOpenSurprise} />
        )}

        {activeChapter === 2 && (
          <ChapterTwoParty
            onNext={handleNextChapter}
            onPrev={handlePrevChapter}
            onTriggerConfetti={triggerConfetti}
            onTriggerFireworks={triggerFireworks}
          />
        )}

        {activeChapter === 3 && (
          <ChapterThreeLetters
            onNext={handleNextChapter}
            onPrev={handlePrevChapter}
            onTriggerConfetti={triggerConfetti}
          />
        )}

        {activeChapter === 4 && (
          <ChapterFourPoem
            onNext={handleNextChapter}
            onPrev={handlePrevChapter}
            onTriggerConfetti={triggerConfetti}
          />
        )}

        {activeChapter === 5 && (
          <ChapterFiveGiftBox
            onNext={handleNextChapter}
            onPrev={handlePrevChapter}
            onTriggerConfetti={triggerConfetti}
            onTriggerFireworks={triggerFireworks}
          />
        )}

        {activeChapter === 6 && (
          <ChapterSixMemories
            onNext={handleNextChapter}
            onPrev={handlePrevChapter}
            onTriggerConfetti={triggerConfetti}
          />
        )}

        {activeChapter === 7 && (
          <ChapterSevenFinale
            onRestart={handleRestart}
            onReliveSurprise={() => handleSelectChapter(1)}
            onTriggerFireworks={triggerFireworks}
            onTriggerConfetti={triggerConfetti}
          />
        )}
      </main>

      {/* Arabic Footer */}
      <footer className="relative z-10 py-3 text-center border-t border-rose-500/10 text-xs text-rose-300/50 font-arabic">
        <p>احتفال عيد ميلاد بَنّون الساحر · مهدى بكل مشاعر الحب والوفاء لبَنّون 💗</p>
      </footer>
    </div>
  );
}
