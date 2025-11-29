import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Header } from './components/Header';
import { PostCard } from './components/PostCard';
import { MOCK_PHOTOS } from './constants';
import postsData from './src/posts.json';
import { Language, Post } from './types';
import { ArrowRight, Mail, Github, Twitter } from 'lucide-react';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { TypewriterText } from './components/TypewriterText';

// --- VIEW COMPONENTS ---

const PostListView: React.FC<{ language: Language }> = ({ language }) => {
  const fontClass = language === 'en' ? 'font-averia' : 'font-mashan';
  const [showAll, setShowAll] = useState(false);

  // Filter posts that have content in the selected language
  const allPosts = (postsData as Post[]).filter(post => language === 'en' ? post.en : post.zh);

  // Determine which posts to show
  const posts = showAll ? allPosts : allPosts.slice(0, 4);

  return (
    <>
      <title>Eytan's Blog</title>
      <meta name="description" content="A vibe-coder's blog about tech, crypto, AI and life" />
      <meta property="og:title" content="Eytan's Blog" />
      <meta property="og:description" content="A vibe-coder's blog about tech, crypto, AI and life" />
      
      <main className={`w-full max-w-5xl mx-auto px-6 md:px-8 animate-fade-in ${fontClass}`}>
      <div className="mt-12 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-primary dark:text-brand-primary">
          {showAll
            ? (language === 'en' ? 'All Posts' : '所有文章')
            : (language === 'en' ? 'Latest Posts' : '最新文章')
          }
        </h2>
      </div>

      <div className="flex flex-col border-t border-brand-accent/20 dark:border-brand-accent/10 pt-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} language={language} />
        ))}
      </div>

      {!showAll && (
        <div className="mt-4 mb-24 text-center">
          <button
            onClick={() => setShowAll(true)}
            className="
              relative overflow-hidden
              px-10 py-3 rounded-full
              border border-brand-primary text-brand-primary
              dark:border-brand-accent dark:text-brand-accent
              font-bold uppercase tracking-widest text-sm
              hover:text-white dark:hover:text-gray-900
              transition-all duration-300 ease-in-out
              group
            "
          >
            <span className="relative z-10">{language === 'en' ? 'All Posts' : '所有文章'}</span>
            <div className="absolute inset-0 h-full w-full bg-brand-primary dark:bg-brand-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-0"></div>
          </button>
        </div>
      )}

      {showAll && (
        <div className="mb-24"></div>
      )}
      </main>
    </>
  );
};

const PostDetailView: React.FC<{ language: Language }> = ({ language }) => {
  const { id } = useParams();
  const posts = postsData as Post[];
  const post = posts.find(p => p.id === id);
  const fontClass = language === 'en' ? 'font-averia' : 'font-mashan';

  if (!post) {
    return <div className={`text-center mt-20 text-brand-secondary ${fontClass}`}>Post not found</div>;
  }

  const content = language === 'en' ? post.en : post.zh;

  if (!content) {
    return <div className={`text-center mt-20 text-brand-secondary ${fontClass}`}>
      {language === 'en' ? 'Post not available in English' : '该文章暂无中文版本'}
    </div>;
  }

  return (
    <>
      <title>{content.title} | Eytan's Blog</title>
      <meta name="description" content={content.excerpt || content.title} />
      <meta property="og:title" content={content.title} />
      <meta property="og:description" content={content.excerpt || content.title} />
      
      <article className={`w-full max-w-3xl mx-auto px-6 md:px-8 animate-fade-in ${fontClass} mb-24`}>
        <div className="mb-8 mt-12">
          <div className="text-sm text-brand-accent mb-2 font-bold tracking-widest">
            {post.date}
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-brand-primary dark:text-brand-primary mb-8 leading-tight">
            {content.title}
          </h1>
        </div>

      <div className="prose dark:prose-invert text-brand-secondary dark:text-gray-300 leading-loose max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeRaw, rehypeKatex]}
          components={{
            a: ({ node, ...props }) => (
              <a
                {...props}
                className="font-bold text-brand-secondary dark:text-gray-300 no-underline border-b-2 border-dashed border-brand-primary hover:text-brand-primary transition-colors"
              />
            ),
            ul: ({ node, ...props }) => (
              <ul {...props} className="list-disc pl-6 marker:text-brand-primary" />
            ),
            ol: ({ node, ...props }) => (
              <ol {...props} className="list-decimal pl-6 marker:text-brand-primary" />
            ),
            li: ({ node, ...props }) => (
              <li {...props} className="pl-2 mb-2" />
            ),
            code({ node, inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  style={oneLight}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{ background: '#f5f5f5', borderRadius: '0.5rem', padding: '1rem' }}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code {...props} className={`${className} bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-brand-primary`}>
                  {children}
                </code>
              );
            },
            del: ({ node, ...props }) => (
              <del {...props} className="line-through decoration-brand-secondary/50" />
            )
          }}
        >
          {content.content}
        </ReactMarkdown>
      </div>
      </article>
    </>
  );
};

const GalleryView: React.FC<{ language: Language }> = ({ language }) => {
  const fontClass = language === 'en' ? 'font-averia' : 'font-mashan';
  return (
    <>
      <title>Gallery | Eytan's Blog</title>
      <meta name="description" content="A collection of moments captured in time" />
      
      <main className={`w-full max-w-6xl mx-auto px-6 md:px-8 animate-fade-in ${fontClass}`}>
      <div className="mb-8">
        <h3 className="text-xl text-brand-primary font-bold uppercase tracking-widest">
          {language === 'en' ? 'Gallery' : '画廊'}
        </h3>
        <p className="text-brand-secondary dark:text-gray-400 text-sm mt-2">
          {language === 'en' ? 'A collection of moments captured in time.' : '捕捉瞬间。'}
        </p>
      </div>

      <div className="masonry-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {MOCK_PHOTOS.map((photo) => (
          <div key={photo.id} className="break-inside-avoid mb-6 group cursor-pointer">
            <div className="overflow-hidden rounded-lg shadow-sm bg-gray-100 dark:bg-gray-800 relative">
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-auto object-cover grayscale-[0.8] group-hover:grayscale-0 transition-all duration-700 ease-out transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
            </div>
            <div className="mt-3 flex justify-between items-end px-1">
              <span className="text-xs font-bold text-brand-secondary dark:text-gray-300 uppercase tracking-wider">{photo.caption}</span>
            </div>
          </div>
        ))}
      </div>
      </main>
    </>
  );
};

const AboutView: React.FC<{ language: Language }> = ({ language }) => {
  const fontClass = language === 'en' ? 'font-averia' : 'font-mashan';
  return (
    <>
      <title>About | Eytan's Blog</title>
      <meta name="description" content="About Eytan Chan - Developer and Photographer" />
      
      <main className={`w-full max-w-3xl mx-auto px-6 md:px-8 mb-24 animate-fade-in ${fontClass}`}>

      <div className="relative mb-12">
        <div className="w-24 h-1 bg-brand-accent mb-6"></div>
        <h1 className="text-4xl md:text-5xl font-bold text-brand-primary mb-4">
          {language === 'en' ? 'Eytan Chan' : 'Eytan Chan'}
        </h1>
        <p className="text-lg text-brand-secondary dark:text-gray-400 italic">
          {language === 'en' ? 'Developer / Photographer' : '开发 / 摄影'}
        </p>
      </div>

      <div className="prose prose-lg dark:prose-invert text-brand-secondary dark:text-gray-300 leading-loose">
        <p className="mb-8 first-letter:text-5xl first-letter:font-bold first-letter:text-brand-primary first-letter:mr-3 first-letter:float-left">
          {language === 'en'
            ? "A vibe-coder trying to build some useful tools, all the posts writen by human, to record the Alpha Moment along the seeking and practice journey."
            : "正在尝试构建一些有用工具的 vibe-coder，所有文字内容人工编写，记录一些 Alpha Moment。"
          }
        </p>
        <p className="mb-8">
          {language === 'en'
            ? "Some social links are as belows, welcome to contact me."
            : "一些联系信息如下，欢迎。"
          }
        </p>

        <div className="mt-16 pt-8 border-t border-dashed border-brand-accent/40">
          <h4 className="text-brand-primary font-bold mb-6 uppercase text-sm tracking-widest">
            {language === 'en' ? 'Connect' : '保持联系'}
          </h4>
          <div className="flex flex-wrap gap-6 text-sm">
            <a href="mailto:hi@etanchan.com" className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-brand-secondary dark:text-gray-300 hover:bg-brand-accent hover:text-brand-primary transition-all">
              <Mail size={16} />
              <span>hi@etanchan.com</span>
            </a>
            <a href="https://x.com/0xetan" className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-brand-secondary dark:text-gray-300 hover:bg-brand-accent hover:text-brand-primary transition-all">
              <Twitter size={16} />
              <span>@0xetan</span>
            </a>
            <a href="https://github.com/eytnchn" className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-brand-secondary dark:text-gray-300 hover:bg-brand-accent hover:text-brand-primary transition-all">
              <Github size={16} />
              <span>github.com/eytnchn</span>
            </a>
          </div>
        </div>
      </div>
      </main>
    </>
  );
};

const Footer: React.FC<{ language: Language }> = ({ language }) => {
  const fontClass = language === 'en' ? 'font-averia' : 'font-mashan';
  return (
    <footer className={`w-full py-12 mt-auto bg-gray-50 dark:bg-[#151515] transition-colors ${fontClass}`}>
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="text-brand-primary font-bold text-md mb-2">
          <TypewriterText text="Whatever happens, happens." speed={150} />
        </div>
        <div className="text-xs text-brand-secondary/60 dark:text-gray-600 uppercase tracking-widest">
          &copy; 2020–2025 Eytan Chan
        </div>
      </div>
    </footer>
  );
};

function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className={`min-h-screen flex flex-col bg-white dark:bg-[#1A1A1A] transition-colors duration-300`}>
        <Header
          language={language}
          setLanguage={setLanguage}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<PostListView language={language} />} />
            <Route path="/post/:id" element={<PostDetailView language={language} />} />
            <Route path="/gallery" element={<GalleryView language={language} />} />
            <Route path="/about" element={<AboutView language={language} />} />
            <Route path="*" element={<div className="text-center mt-20">404 - Page Not Found</div>} />
          </Routes>
        </div>

        <Footer language={language} />
      </div>
    </Router>
  );
}

export default App;