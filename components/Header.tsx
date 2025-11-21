import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ language, setLanguage }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', labelEn: 'Post', labelCn: '文章' },
    { path: '/gallery', labelEn: 'Gallery', labelCn: '摄影' },
    { path: '/about', labelEn: 'About', labelCn: '关于' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'cn' : 'en');
  };

  return (
    <header className="w-full max-w-5xl mx-auto pt-8 pb-4 px-6 md:px-0 mb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
        {/* Logo Area */}
        <Link to="/" className="text-3xl font-bold text-brand-primary tracking-tighter hover:opacity-80 transition-opacity">
          MY_BLOG
        </Link>

        {/* Navigation */}
        <nav className="flex flex-wrap items-center gap-x-4 text-sm md:text-base">
          {navItems.map((item, index) => (
            <React.Fragment key={item.path}>
              <Link
                to={item.path}
                className={`${
                  isActive(item.path) ? 'text-brand-primary font-bold underline decoration-brand-accent decoration-2 underline-offset-4' : 'text-brand-secondary hover:text-brand-primary'
                } transition-colors uppercase tracking-wide`}
              >
                {language === 'en' ? item.labelEn : item.labelCn}
              </Link>
              {index < navItems.length - 1 && (
                <span className="text-brand-accent">|</span>
              )}
            </React.Fragment>
          ))}

          <span className="text-brand-accent mx-2">|</span>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 text-brand-secondary hover:text-brand-primary transition-colors"
            aria-label="Toggle Language"
          >
            <Globe size={16} />
            <span className="uppercase font-bold">{language}</span>
          </button>
        </nav>
      </div>
      
      {/* Decorative Dotted Line */}
      <div className="w-full border-b-2 border-dotted border-brand-accent mt-6 opacity-60"></div>
    </header>
  );
};