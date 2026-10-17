import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  type: 'confetti' | 'heart' | 'petal' | 'firework' | 'star';
  rotation: number;
  rotationSpeed: number;
}

interface BackgroundEffectsProps {
  intensity?: 'subtle' | 'celebration' | 'fireworks';
  triggerConfetti?: number;
  triggerFireworks?: number;
}

export const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({
  intensity = 'subtle',
  triggerConfetti = 0,
  triggerFireworks = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  const colors = [
    '#f472b6', // Pink
    '#fb7185', // Rose
    '#c084fc', // Lavender
    '#fbbf24', // Champagne Gold
    '#f43f5e', // Ruby
    '#ffffff', // Diamond White
    '#fef08a', // Soft gold
  ];

  // Spawn confetti burst
  const spawnConfettiBurst = (x: number, y: number, count: number = 80) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.012 + 0.008,
        type: Math.random() > 0.4 ? 'confetti' : (Math.random() > 0.5 ? 'heart' : 'petal'),
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
      });
    }
  };

  // Spawn firework
  const spawnFirework = (x: number, y: number) => {
    const fireworkColor = colors[Math.floor(Math.random() * colors.length)];
    const secondaryColor = colors[Math.floor(Math.random() * colors.length)];
    const count = 70;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 7 + 2;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 4 + 2,
        color: Math.random() > 0.3 ? fireworkColor : secondaryColor,
        alpha: 1,
        decay: Math.random() * 0.018 + 0.012,
        type: 'firework',
        rotation: 0,
        rotationSpeed: 0,
      });
    }
  };

  useEffect(() => {
    if (triggerConfetti > 0 && canvasRef.current) {
      const width = canvasRef.current.width;
      const height = canvasRef.current.height;
      spawnConfettiBurst(width * 0.25, height * 0.6, 60);
      spawnConfettiBurst(width * 0.5, height * 0.4, 90);
      spawnConfettiBurst(width * 0.75, height * 0.6, 60);
    }
  }, [triggerConfetti]);

  useEffect(() => {
    if (triggerFireworks > 0 && canvasRef.current) {
      const width = canvasRef.current.width;
      const height = canvasRef.current.height;
      spawnFirework(width * (0.3 + Math.random() * 0.4), height * (0.2 + Math.random() * 0.3));
      setTimeout(() => {
        spawnFirework(width * (0.2 + Math.random() * 0.6), height * (0.15 + Math.random() * 0.3));
      }, 300);
    }
  }, [triggerFireworks]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Initial ambient drifting petals and stars
    const stars: Array<{ x: number; y: number; r: number; alpha: number; speed: number }> = [];
    for (let i = 0; i < 90; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.8 + 0.5,
        alpha: Math.random() * 0.7 + 0.3,
        speed: Math.random() * 0.02 + 0.008,
      });
    }

    let lastAmbientSpawn = Date.now();

    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(x, y + topCurveHeight);
      c.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
      c.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 2, x, y + size);
      c.bezierCurveTo(x, y + (size + topCurveHeight) / 2, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
      c.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
      c.closePath();
      c.fill();
    };

    const drawPetal = (c: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      c.beginPath();
      c.ellipse(x, y, size * 0.5, size, Math.PI / 4, 0, Math.PI * 2);
      c.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render Stars
      stars.forEach((star) => {
        star.alpha += Math.sin(Date.now() * star.speed) * 0.01;
        const currentAlpha = Math.max(0.15, Math.min(0.9, star.alpha));
        ctx.fillStyle = `rgba(255, 248, 220, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Spawn periodic gentle floating petals/hearts
      const now = Date.now();
      const spawnInterval = intensity === 'celebration' ? 400 : 900;
      if (now - lastAmbientSpawn > spawnInterval && particlesRef.current.length < 150) {
        lastAmbientSpawn = now;
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: -10,
          vx: (Math.random() - 0.4) * 1.5,
          vy: Math.random() * 1.5 + 0.8,
          size: Math.random() * 7 + 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.4 + 0.5,
          decay: 0.003,
          type: Math.random() > 0.4 ? 'petal' : 'heart',
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.04,
        });
      }

      // Automatic fireworks in fireworks intensity
      if (intensity === 'fireworks' && Math.random() < 0.035) {
        spawnFirework(
          canvas.width * (0.15 + Math.random() * 0.7),
          canvas.height * (0.15 + Math.random() * 0.4)
        );
      }

      // Update and draw active particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.alpha -= p.decay;

        if (p.type === 'confetti' || p.type === 'firework') {
          p.vy += 0.12; // Gravity
          p.vx *= 0.98;
        } else {
          // Drifting flutter
          p.x += Math.sin(p.y * 0.02) * 0.5;
        }

        if (p.alpha <= 0 || p.y > canvas.height + 20) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;

        if (p.type === 'heart') {
          drawHeart(ctx, -p.size / 2, -p.size / 2, p.size);
        } else if (p.type === 'petal') {
          drawPetal(ctx, 0, 0, p.size);
        } else if (p.type === 'confetti') {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else if (p.type === 'firework') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.95 }}
    />
  );
};
