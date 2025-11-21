export interface Post {
  id: string;
  title: string;
  date: string;
  excerptEn: string;
  excerptCn: string;
  contentEn?: string; // Mock content
  contentCn?: string; // Mock content
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