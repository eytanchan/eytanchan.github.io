import React from 'react';
import { Post, Language } from '../types';

interface PostCardProps {
  post: Post;
  language: Language;
}

export const PostCard: React.FC<PostCardProps> = ({ post, language }) => {
  return (
    <article className="mb-12 group">
      {/* Title */}
      <h2 className="text-xl md:text-2xl font-bold text-brand-primary mb-2 group-hover:opacity-90 transition-opacity cursor-pointer">
        {post.title}
      </h2>

      {/* Date */}
      <div className="text-xs text-brand-secondary mb-4 font-bold opacity-70">
        {post.date}
      </div>

      {/* Excerpt */}
      <p className="text-brand-secondary italic mb-4 leading-relaxed text-sm md:text-base">
        {language === 'en' ? post.excerptEn : post.excerptCn}
      </p>

      {/* Continue Reading Link */}
      <button className="text-brand-primary text-sm border-b border-dotted border-brand-primary hover:bg-brand-accent hover:text-brand-secondary transition-all">
        {language === 'en' ? 'Continue reading' : '阅读全文'}
      </button>

      {/* Separator */}
      <div className="w-full border-b border-dotted border-brand-accent mt-8 opacity-40"></div>
    </article>
  );
};