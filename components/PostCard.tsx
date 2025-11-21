import React from 'react';
import { Post, Language } from '../types';

interface PostCardProps {
  post: Post;
  language: Language;
}

export const PostCard: React.FC<PostCardProps> = ({ post, language }) => {
  const fontClass = language === 'en' ? 'font-averia' : 'font-mashan';
  
  return (
    <article className={`mb-16 group ${fontClass}`}>
      {/* Meta */}
      <div className="text-sm text-brand-accent mb-2 font-bold tracking-widest">
        {post.date}
      </div>

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-brand-primary dark:text-brand-primary mb-4 group-hover:opacity-80 transition-opacity cursor-pointer leading-tight">
        {post.title}
      </h2>

      {/* Excerpt */}
      <p className="text-brand-secondary dark:text-gray-300 mb-6 leading-relaxed text-base md:text-lg opacity-90">
        {language === 'en' ? post.excerptEn : post.excerptCn}
      </p>

      {/* Continue Reading Link */}
      <button className="
        inline-flex items-center gap-2
        text-brand-primary dark:text-brand-accent 
        font-bold text-sm uppercase tracking-wider
        border-b-2 border-transparent hover:border-brand-accent
        transition-all duration-300 pb-1
      ">
        {language === 'en' ? 'Continue reading' : '阅读全文'}
      </button>
    </article>
  );
};