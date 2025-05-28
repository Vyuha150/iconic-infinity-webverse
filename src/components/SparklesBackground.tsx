
import { useEffect, useRef } from 'react';

const SparklesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const sparkles: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      direction: number;
      twinkle: number;
    }> = [];

    // Create sparkles
    for (let i = 0; i < 50; i++) {
      sparkles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.6 + 0.2,
        direction: Math.random() * Math.PI * 2,
        twinkle: Math.random() * 0.02 + 0.01,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparkles.forEach((sparkle) => {
        // Update position
        sparkle.x += Math.cos(sparkle.direction) * sparkle.speed;
        sparkle.y += Math.sin(sparkle.direction) * sparkle.speed;

        // Update twinkle effect
        sparkle.opacity += sparkle.twinkle;
        if (sparkle.opacity > 0.8 || sparkle.opacity < 0.1) {
          sparkle.twinkle *= -1;
        }

        // Wrap around screen
        if (sparkle.x > canvas.width) sparkle.x = 0;
        if (sparkle.x < 0) sparkle.x = canvas.width;
        if (sparkle.y > canvas.height) sparkle.y = 0;
        if (sparkle.y < 0) sparkle.y = canvas.height;

        // Draw sparkle
        ctx.save();
        ctx.globalAlpha = sparkle.opacity;
        ctx.fillStyle = '#FFD700';
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 4;
        
        // Create star shape
        ctx.beginPath();
        const centerX = sparkle.x;
        const centerY = sparkle.y;
        const outerRadius = sparkle.size;
        const innerRadius = sparkle.size * 0.4;
        const spikes = 4;
        
        for (let i = 0; i < spikes * 2; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const angle = (i * Math.PI) / spikes;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default SparklesBackground;
