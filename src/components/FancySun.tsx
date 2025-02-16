import React, { useEffect, useRef, useState } from 'react';

interface FancySunProps {
  isDark: boolean;
  onToggle: () => void;
}

const FancySun: React.FC<FancySunProps> = ({ isDark, onToggle }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const draw = () => {
      if (!canvas || !ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update time
      time += 0.02;

      // Center coordinates
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const baseRadius = Math.min(canvas.width, canvas.height) * 0.2;

      if (isDark) {
        // Draw moon
        const gradient = ctx.createRadialGradient(
          centerX - baseRadius * 0.2, centerY - baseRadius * 0.2,
          baseRadius * 0.1,
          centerX, centerY, baseRadius
        );
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(0.9, '#e1e1e1');
        gradient.addColorStop(1, '#d4d4d4');

        ctx.beginPath();
        ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw craters
        const craters = [
          { x: -0.2, y: -0.3, size: 0.15 },
          { x: 0.3, y: 0.1, size: 0.1 },
          { x: -0.1, y: 0.25, size: 0.12 }
        ];

        craters.forEach(crater => {
          ctx.beginPath();
          ctx.arc(
            centerX + crater.x * baseRadius,
            centerY + crater.y * baseRadius,
            baseRadius * crater.size,
            0, Math.PI * 2
          );
          ctx.fillStyle = 'rgba(180, 180, 180, 0.8)';
          ctx.fill();
        });

        // Draw stars
        for (let i = 0; i < 20; i++) {
          const angle = (i * Math.PI * 2) / 20 + time;
          const distance = baseRadius * (1.5 + 0.2 * Math.sin(time * 2 + i));
          const starSize = 2 + Math.sin(time * 3 + i) * 1;

          ctx.beginPath();
          ctx.arc(
            centerX + Math.cos(angle) * distance,
            centerY + Math.sin(angle) * distance,
            starSize,
            0, Math.PI * 2
          );
          ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + 0.5 * Math.sin(time + i)})`;
          ctx.fill();
        }
      } else {
        // Draw sun core
        const gradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, baseRadius
        );
        gradient.addColorStop(0, '#fff7e6');
        gradient.addColorStop(0.8, '#ffd700');
        gradient.addColorStop(1, '#ffa500');

        ctx.beginPath();
        ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw rays
        const numRays = 12;
        const rayLength = baseRadius * 0.5;
        
        for (let i = 0; i < numRays; i++) {
          const angle = (i * Math.PI * 2) / numRays + time;
          const rayStart = baseRadius;
          const rayEnd = rayStart + rayLength * (0.8 + 0.2 * Math.sin(time * 3 + i));

          ctx.beginPath();
          ctx.moveTo(
            centerX + Math.cos(angle) * rayStart,
            centerY + Math.sin(angle) * rayStart
          );
          ctx.lineTo(
            centerX + Math.cos(angle) * rayEnd,
            centerY + Math.sin(angle) * rayEnd
          );
          ctx.strokeStyle = '#ffd700';
          ctx.lineWidth = 4;
          ctx.stroke();
        }

        // Draw corona
        for (let i = 0; i < 360; i += 5) {
          const angle = (i * Math.PI) / 180;
          const length = baseRadius * (1.2 + 0.1 * Math.sin(time * 2 + i));
          
          ctx.beginPath();
          ctx.moveTo(
            centerX + Math.cos(angle) * baseRadius,
            centerY + Math.sin(angle) * baseRadius
          );
          ctx.lineTo(
            centerX + Math.cos(angle) * length,
            centerY + Math.sin(angle) * length
          );
          ctx.strokeStyle = `rgba(255, 215, 0, ${0.1 + 0.1 * Math.sin(time + i)})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full cursor-pointer"
      style={{ background: 'transparent' }}
      onClick={onToggle}
    />
  );
};

export default FancySun;