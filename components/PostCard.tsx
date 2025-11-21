import React from 'react';
import { Link } from 'react-router-dom';
import { Post, Language } from '../types';

interface PostCardProps {
  post: Post;
  language: Language;
}

export const PostCard: React.FC<PostCardProps> = ({ post, language }) => {
  const fontClass = language === 'en' ? 'font-averia' : 'font-mashan';

  const content = language === 'en' ? post.en : post.zh;

  if (!content) return null;

  return (
    <article className={`mb-16 group ${fontClass}`}>
      {/* Meta */}
      <div className="text-sm text-brand-accent mb-2 font-bold tracking-widest">
        {post.date}
      </div>

      {/* Title */}
      <Link to={`/post/${post.id}`}>
        <h2 className="text-xl md:text-2xl font-bold text-brand-primary dark:text-brand-primary mb-4 group-hover:opacity-80 transition-opacity cursor-pointer leading-tight">
          {content.title}
        </h2>
      </Link>

      {/* Excerpt */}
      <p className="text-brand-secondary dark:text-gray-300 mb-6 leading-relaxed text-base md:text-lg opacity-90">
        {content.excerpt}
      </p>

      {/* Continue Reading Link */}
      <Link to={`/post/${post.id}`}>
        <button className="
          inline-flex items-center gap-2
          text-brand-primary dark:text-brand-accent 
          font-bold text-xs uppercase tracking-wider
          border-b-2 border-transparent hover:border-brand-accent
          transition-all duration-300 pb-1
        ">
          {language === 'en' ? 'Continue reading' : '阅读全文'}
        </button>
      </Link>
    </article>
  );
};