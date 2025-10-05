import { useState, useEffect } from 'react';
import { BarChart3, Moon, Sun } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export default function Navbar({ isDarkMode, toggleTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('home')}>
          <BarChart3 className="w-8 h-8 text-[#8b5cf6]" />
          <span className="text-2xl font-bold bg-gradient-to-r from-[#8b5cf6] to-[#00f5d4] bg-clip-text text-transparent">
            Graphora
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <button onClick={() => scrollToSection('home')} className="hover:text-[#8b5cf6] transition">
            Home
          </button>
          <button onClick={() => scrollToSection('dashboard')} className="hover:text-[#8b5cf6] transition">
            Dashboard
          </button>
          <button onClick={() => scrollToSection('insights')} className="hover:text-[#8b5cf6] transition">
            Insights
          </button>
          <button onClick={() => scrollToSection('contact')} className="hover:text-[#8b5cf6] transition">
            Contact
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full glass hover:glow-blue transition"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button className="btn-primary bg-gradient-to-r from-[#8b5cf6] to-[#00f5d4] px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
