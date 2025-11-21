import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Header } from './components/Header';
import { PostCard } from './components/PostCard';
import { MOCK_POSTS, MOCK_PHOTOS } from './constants';
import { Language } from './types';
import { Camera, User, ArrowRight } from 'lucide-react';

// --- VIEW COMPONENTS DEFINED HERE FOR SIMPLICITY ---

const PostListView: React.FC<{ language: Language }> = ({ language }) => {
  return (
    <main className="w-full max-w-5xl mx-auto px-6 md:px-0">
      <h3 className="text-2xl text-brand-primary font-bold mb-8 border-l-4 border-brand-accent pl-4">
        {language === 'en' ? 'Latest Research' : '最新研究'}
      </h3>
      
      <div className="flex flex-col">
        {MOCK_POSTS.map((post) => (
          <PostCard key={post.id} post={post} language={language} />
        ))}
      </div>

      <div className="mt-8 mb-20 text-center">
        <button 
          className="group w-full md:w-auto px-12 py-4 border-2 border-dotted border-brand-primary text-brand-primary font-bold uppercase tracking-widest 
                     hover:bg-brand-primary hover:text-white hover:border-solid transition-all duration-300 ease-in-out"
        >
          {language === 'en' ? 'View all posts' : '查看全部文章'}
        </button>
      </div>
    </main>
  );
};

const GalleryView: React.FC<{ language: Language }> = ({ language }) => {
  return (
    <main className="w-full max-w-5xl mx-auto px-6 md:px-0 animate-fade-in">
       <h3 className="text-2xl text-brand-primary font-bold mb-8 border-l-4 border-brand-accent pl-4 flex items-center gap-3">
        <Camera className="text-brand-secondary" />
        {language === 'en' ? 'Visual Log' : '视觉日志'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {MOCK_PHOTOS.map((photo) => (
          <div key={photo.id} className="relative group cursor-pointer">
            <div className="overflow-hidden border-2 border-transparent group-hover:border-brand-accent transition-colors rounded-sm">
               <img 
                src={photo.url} 
                alt={photo.caption} 
                className="w-full h-64 object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out transform group-hover:scale-105"
              />
            </div>
            <div className="mt-2 flex justify-between items-center border-b border-dotted border-brand-secondary/30 pb-1">
              <span className="text-xs font-bold text-brand-primary uppercase">{photo.caption.split(' / ')[0]}</span>
              <span className="text-xs text-brand-secondary italic">{photo.caption.split(' / ')[1]}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

const AboutView: React.FC<{ language: Language }> = ({ language }) => {
  return (
    <main className="w-full max-w-3xl mx-auto px-6 md:px-0 mb-20">
       <h3 className="text-2xl text-brand-primary font-bold mb-8 border-l-4 border-brand-accent pl-4 flex items-center gap-3">
        <User className="text-brand-secondary" />
        {language === 'en' ? 'About Me' : '关于我'}
      </h3>

      <div className="prose prose-stone font-mono text-brand-secondary">
        <p className="mb-6">
          {language === 'en' 
            ? "I am a researcher and developer focused on the intersection of cryptography, finance, and minimalist design. This blog serves as a repository for my thoughts on stablecoin economics and a gallery for my analog photography."
            : "我是一名研究员和开发者，专注于密码学、金融和极简设计的交叉领域。这个博客用来存放我对稳定币经济学的思考，以及我的胶片摄影作品展示。"
          }
        </p>
        <p className="mb-6">
           {language === 'en'
             ? "My philosophy is simple: clearer signal, less noise. The aesthetic of this site reflects that principle."
             : "我的哲学很简单：更清晰的信号，更少的噪音。这个网站的美学反映了这一原则。"
           }
        </p>
        
        <div className="mt-12 p-6 border border-dotted border-brand-primary bg-gray-50">
          <h4 className="text-brand-primary font-bold mb-4 uppercase text-sm">
            {language === 'en' ? 'Contact' : '联系方式'}
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <ArrowRight size={14} className="text-brand-accent" /> 
              <span>Email: hello@example.com</span>
            </li>
            <li className="flex items-center gap-2">
               <ArrowRight size={14} className="text-brand-accent" /> 
               <span>Twitter: @example_handle</span>
            </li>
             <li className="flex items-center gap-2">
               <ArrowRight size={14} className="text-brand-accent" /> 
               <span>Github: @example_dev</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

const Footer: React.FC<{ language: Language }> = ({ language }) => (
  <footer className="w-full max-w-5xl mx-auto px-6 md:px-0 py-12 border-t border-dotted border-brand-accent/50 text-xs text-brand-secondary/60 flex flex-col md:flex-row justify-between items-center">
    <div>
      &copy; 2025 ASXN Research Clone. 
    </div>
    <div className="mt-2 md:mt-0">
       {language === 'en' ? 'Designed with React & Tailwind' : '由 React & Tailwind 驱动'}
    </div>
  </footer>
);

function App() {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <Router>
      <div className="min-h-screen bg-white selection:bg-brand-accent selection:text-brand-secondary flex flex-col">
        <Header language={language} setLanguage={setLanguage} />
        
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<PostListView language={language} />} />
            <Route path="/gallery" element={<GalleryView language={language} />} />
            <Route path="/about" element={<AboutView language={language} />} />
          </Routes>
        </div>

        <Footer language={language} />
      </div>
    </Router>
  );
}

export default App;