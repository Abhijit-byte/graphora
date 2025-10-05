import { useEffect, useRef, useState } from 'react';
import { Users, Zap, Activity, Globe } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  number: string;
  label: string;
  delay: number;
}

function StatCard({ icon, number, label, delay }: StatCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`glass rounded-2xl p-8 text-center hover:glow-blue transition-all duration-500 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="flex justify-center mb-4">
        <div className="p-4 bg-gradient-to-br from-[#8b5cf6] to-[#00f5d4] rounded-full">
          {icon}
        </div>
      </div>
      <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#8b5cf6] to-[#00f5d4] bg-clip-text text-transparent">
        {number}
      </div>
      <div className="text-gray-400 font-semibold">{label}</div>
    </div>
  );
}

export default function Stats() {
  return (
    <section id="insights" className="py-20 px-6 bg-gradient-to-b from-[#0b0f19] via-[#1a1f35] to-[#0b0f19]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#8b5cf6] to-[#00f5d4] bg-clip-text text-transparent">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-400">Join thousands of companies transforming their data analytics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <StatCard
            icon={<Users className="w-8 h-8 text-white" />}
            number="500+"
            label="Clients"
            delay={0}
          />
          <StatCard
            icon={<Zap className="w-8 h-8 text-white" />}
            number="99.9%"
            label="Uptime"
            delay={200}
          />
          <StatCard
            icon={<Activity className="w-8 h-8 text-white" />}
            number="Real-Time"
            label="Visualization"
            delay={400}
          />
          <StatCard
            icon={<Globe className="w-8 h-8 text-white" />}
            number="Cross-Platform"
            label="Compatibility"
            delay={600}
          />
        </div>

        <div className="glass rounded-2xl p-12">
          <h3 className="text-3xl font-bold mb-8 text-center">What Our Clients Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass rounded-xl p-6 hover:glow-cyan transition">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#8b5cf6] to-[#00f5d4] rounded-full flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <div className="ml-4">
                  <div className="font-semibold">Jane Doe</div>
                  <div className="text-sm text-gray-400">CEO, TechCorp</div>
                </div>
              </div>
              <p className="text-gray-300">
                "Graphora transformed how we visualize our data. The 3D analytics are stunning and incredibly insightful."
              </p>
            </div>

            <div className="glass rounded-xl p-6 hover:glow-cyan transition">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#8b5cf6] to-[#00f5d4] rounded-full flex items-center justify-center text-white font-bold">
                  MS
                </div>
                <div className="ml-4">
                  <div className="font-semibold">Michael Smith</div>
                  <div className="text-sm text-gray-400">CTO, DataFlow</div>
                </div>
              </div>
              <p className="text-gray-300">
                "Real-time updates and beautiful visualizations have made decision-making so much faster for our team."
              </p>
            </div>

            <div className="glass rounded-xl p-6 hover:glow-cyan transition">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#8b5cf6] to-[#00f5d4] rounded-full flex items-center justify-center text-white font-bold">
                  SL
                </div>
                <div className="ml-4">
                  <div className="font-semibold">Sarah Lee</div>
                  <div className="text-sm text-gray-400">VP Analytics, CloudNet</div>
                </div>
              </div>
              <p className="text-gray-300">
                "The cross-platform compatibility means we can access our analytics anywhere. Truly game-changing."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
