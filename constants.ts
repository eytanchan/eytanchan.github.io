import { Post, Photo } from './types';

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'Plasma: Stablecoin Supercycle',
    date: '9/29/2025',
    excerptEn: 'Plasma is a purpose-built L1 optimized for stablecoins and payments.',
    excerptCn: 'Plasma 是专门为稳定币和支付优化的 Layer 1 区块链。',
  },
  {
    id: '2',
    title: 'Ethena: USDe, Converge and The New Frontier',
    date: '7/16/2025',
    excerptEn: "Ethena's strategy has centered on the two primary use cases of cryptocurrencies, settlement for speculation and settlement for stablecoins, digital dollars and tokenization",
    excerptCn: 'Ethena 的战略主要集中在加密货币的两个主要用例：投机结算和稳定币、数字美元及代币化的结算。',
  },
  {
    id: '3',
    title: 'Stablecoins: Economic, Technological and Geopolitical Superconductors',
    date: '6/16/2025',
    excerptEn: 'Stablecoins have emerged as the most compelling product-market fit in crypto to date, with their growth trajectory reflecting extraordinary adoption. The market has expanded from just $30 million in total market cap in 2018 to >$250 billion today, representing a 263% compound annual growth rate.',
    excerptCn: '稳定币已成为迄今为止加密领域中最引人注目的产品市场契合点，其增长轨迹反映了非凡的采用率。市场规模从 2018 年的仅 3000 万美元总市值扩大到今天的超过 2500 亿美元，年复合增长率为 263%。',
  }
];

export const MOCK_PHOTOS: Photo[] = [
  { id: '1', url: 'https://picsum.photos/800/600?random=1', caption: 'Street Photography / Tokyo' },
  { id: '2', url: 'https://picsum.photos/800/800?random=2', caption: 'Architecture / Brutalist' },
  { id: '3', url: 'https://picsum.photos/800/500?random=3', caption: 'Nature / Mist' },
  { id: '4', url: 'https://picsum.photos/600/800?random=4', caption: 'Portrait / Analog' },
  { id: '5', url: 'https://picsum.photos/800/600?random=5', caption: 'Night / Neon' },
  { id: '6', url: 'https://picsum.photos/800/600?random=6', caption: 'Abstract / Light' },
];