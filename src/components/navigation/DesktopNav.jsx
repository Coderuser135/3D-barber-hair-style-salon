import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calendar } from 'lucide-react';
import { salon } from '@/data/salon';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/hairstyles', label: 'Hairstyles' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function DesktopNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path) => (path === '/' ? location.pathname === '/' : location.pathname.startsWith(path));

  return (
    <header
      className={`hidden lg:block fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => navigate('/')} className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-lg bg-gold-400 flex items-center justify-center">
            <span className="text-ink-950 font-display font-bold text-xl">B</span>
          </span>
          <span className="font-display font-semibold text-xl text-gray-50">{salon.name}</span>
        </button>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive(item.to)
                  ? 'text-gold-300'
                  : 'text-gray-400 hover:text-gray-100'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => navigate('/book')}
          className="btn-gold px-5 py-2.5 text-sm flex items-center gap-2"
        >
          <Calendar size={16} />
          Book Appointment
        </button>
      </div>
    </header>
  );
}
