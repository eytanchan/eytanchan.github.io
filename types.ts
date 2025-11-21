export interface PostContent {
  title: string;
  excerpt: string;
  content: string;
}

export interface Post {
  id: string;
  date: string;
  hasZh: boolean;
  en: PostContent;
  zh: PostContent | null;
}

export interface Photo {
  id: string;
  url: string;
  caption: string;
}

export type Language = 'en' | 'cn';

export interface NavItem {
  labelEn: string;
  labelCn: string;
  path: string;
}