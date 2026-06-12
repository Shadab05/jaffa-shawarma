import React, { useEffect, useRef } from 'react';

export const BackgroundParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;

    const parent = canvas.parentElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = parent.clientWidth);
    let height = (canvas.height = parent.clientHeight);

    // Track mouse coordinates
    const mouse = { x: -1000, y: -1000, active: false };

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      alpha: number;
      color: string;
      angle: number;
      angleSpeed: number;
    }

    const particles: Particle[] = [];
    // 25 soft smoke particles for excellent rendering speed and aesthetic volume
    const particleCount = 25; 

    // Soft spice colors (sumac red, cumin gold, spice smoke white)
    const colors = [
      'rgba(239, 68, 68, 0.16)',   // Sumac Coral Red
      'rgba(245, 158, 11, 0.18)',   // Cumin Spice Gold
      'rgba(224, 231, 255, 0.14)',  // Cool Toum White/Blue smoke
      'rgba(14, 91, 255, 0.12)',    // Brand Electric Blue
    ];

    const createParticle = (yPos?: number): Particle => {
      const parentHeight = parent.clientHeight;
      return {
        x: Math.random() * width,
        y: yPos !== undefined ? yPos : Math.random() * parentHeight,
        size: Math.random() * 24 + 12, // 12px to 36px large soft smoke spheres
        speedY: Math.random() * 0.45 + 0.15, // Drifts upward
        speedX: (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.4 + 0.45, // Opacity range
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * Math.PI * 2,
        angleSpeed: (Math.random() - 0.5) * 0.01,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = parent.clientWidth;
      height = canvas.height = parent.clientHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Find parent offsets to ensure correct coordinates inside absolute div
      const rect = parent.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('resize', handleResize);
    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, index) => {
        // Drifts upwards
        p.y -= p.speedY;
        
        // Sway sideways
        p.angle += p.angleSpeed;
        p.x += Math.sin(p.angle) * 0.2 + p.speedX;

        // Proximity mouse push logic
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const pushRadius = 140;

          if (distance < pushRadius) {
            const force = (pushRadius - distance) / pushRadius;
            const angle = Math.atan2(dy, dx);
            // Push away
            p.x += Math.cos(angle) * force * 1.5;
            p.y += Math.sin(angle) * force * 1.5;
          }
        }

        // Recycle particles off top
        if (p.y < -p.size) {
          particles[index] = createParticle(height + p.size);
        }
        // Recycle horizontal boundary breaches
        if (p.x < -p.size) p.x = width + p.size;
        if (p.x > width + p.size) p.x = -p.size;

        // Render soft smoke puffs using radial gradients
        ctx.save();
        ctx.beginPath();
        
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        grad.addColorStop(0, p.color);
        grad.addColorStop(0.5, p.color.replace(/[\d.]+\)$/, '0.05)'));
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = grad;
        // Fade out as it rises (top 25% of the height will fade out to zero opacity)
        const verticalFade = Math.min(1, p.y / (height * 0.25));
        ctx.globalAlpha = p.alpha * verticalFade;
        
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
};

export default BackgroundParticles;
