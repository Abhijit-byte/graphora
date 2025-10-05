import { BarChart3, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#0b0f19] to-[#06080f] py-12 px-6 border-t border-[#8b5cf6]/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <BarChart3 className="w-8 h-8 text-[#8b5cf6]" />
              <span className="text-2xl font-bold bg-gradient-to-r from-[#8b5cf6] to-[#00f5d4] bg-clip-text text-transparent">
                Graphora
              </span>
            </div>
            <p className="text-gray-400 max-w-md mb-4">
              Transform your business intelligence with cutting-edge 3D data visualization technology.
              Experience real-time analytics like never before.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 glass rounded-full hover:glow-blue transition"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 glass rounded-full hover:glow-blue transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 glass rounded-full hover:glow-blue transition"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 glass rounded-full hover:glow-blue transition"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-[#8b5cf6]">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-[#00f5d4] transition">Features</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00f5d4] transition">Pricing</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00f5d4] transition">Documentation</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00f5d4] transition">API</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-[#8b5cf6]">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-[#00f5d4] transition">About</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00f5d4] transition">Blog</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00f5d4] transition">Careers</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00f5d4] transition">Contact</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#8b5cf6]/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; 2025 Graphora. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-[#00f5d4] transition">Privacy Policy</a>
              <a href="#" className="hover:text-[#00f5d4] transition">Terms of Service</a>
              <a href="#" className="hover:text-[#00f5d4] transition">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
