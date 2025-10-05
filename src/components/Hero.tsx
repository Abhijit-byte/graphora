import { useEffect, useRef } from 'react';
import { TrendingUp, Zap } from 'lucide-react';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = 'rgba(11, 15, 25, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(139, 92, 246, 0.5)';
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0b0f19] z-10"></div>

      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
        <div className="fade-in-up">
          <div className="flex items-center justify-center space-x-2 mb-6 float">
            <TrendingUp className="w-12 h-12 text-[#00f5d4]" />
            <Zap className="w-12 h-12 text-[#8b5cf6]" />
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-[#8b5cf6] via-[#00f5d4] to-[#8b5cf6] bg-clip-text text-transparent">
            Visualize Data Like Never Before
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Experience real-time 3D analytics in motion. Transform complex data into stunning visual insights.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={() => scrollToSection('dashboard')}
              className="btn-primary bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition glow-blue"
            >
              Explore Dashboard
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="glass px-8 py-4 rounded-full font-semibold text-lg hover:glow-cyan transition"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#8b5cf6] rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-[#8b5cf6] rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
