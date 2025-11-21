import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Moon, Sun } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ language, setLanguage, darkMode, setDarkMode }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', labelEn: 'Post', labelCn: '文章' },
    { path: '/gallery', labelEn: 'Gallery', labelCn: '相册' },
    { path: '/about', labelEn: 'About', labelCn: '关于' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'cn' : 'en');
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const fontClass = language === 'en' ? 'font-averia' : 'font-mashan';

  return (
    <header className={`w-full max-w-5xl mx-auto pt-10 pb-6 px-6 md:px-8 mb-8 ${fontClass}`}>
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">

        {/* Left: Avatar (Rounded Rectangle) */}
        <Link to="/" className="group relative">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden shadow-sm border-2 border-transparent group-hover:border-brand-accent transition-all duration-300">
            <img
              src="https://raw.githubusercontent.com/eytanchan/eytan-images/master/avatar.jpg"
              alt="Avatar"
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        </Link>

        {/* Right: Nav & Controls */}
        <div className="flex flex-col items-center md:items-end gap-4">

          {/* Navigation Links */}
          <nav className="flex items-center gap-x-6 md:gap-x-8 text-lg">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${isActive(item.path)
                  ? 'text-brand-primary font-bold'
                  : 'text-brand-secondary dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-accent'
                  } transition-colors tracking-wide`}
              >
                {language === 'en' ? item.labelEn : item.labelCn}
              </Link>
            ))}
          </nav>

          {/* Controls (Lang | Theme) */}
          <div className="flex items-center gap-4 text-sm text-brand-secondary dark:text-gray-500">

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 hover:text-brand-primary dark:hover:text-brand-accent transition-colors"
              aria-label="Toggle Language"
            >
              <Globe size={18} strokeWidth={1.5} />
              <span className="uppercase font-bold">{language === 'en' ? 'EN' : '中'}</span>
            </button>

            <span className="text-brand-accent/50">|</span>

            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 hover:text-brand-primary dark:hover:text-brand-accent transition-colors"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Moon size={18} strokeWidth={1.5} /> : <Sun size={18} strokeWidth={1.5} />}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};