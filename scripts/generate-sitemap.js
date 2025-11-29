import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const POSTS_FILE = path.join(__dirname, '../src/posts.json');
const PUBLIC_DIR = path.join(__dirname, '../public');
const SITEMAP_FILE = path.join(PUBLIC_DIR, 'sitemap.xml');
const BASE_URL = 'https://etanchan.com';

function generateSitemap() {
    if (!fs.existsSync(POSTS_FILE)) {
        console.error(`Posts file not found: ${POSTS_FILE}`);
        return;
    }

    const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8'));
    const today = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- Static Pages -->
    <url>
        <loc>${BASE_URL}/</loc>
        <lastmod>${today}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${BASE_URL}/about</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>${BASE_URL}/gallery</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>

    <!-- Blog Posts -->`;

    posts.forEach(post => {
        xml += `
    <url>
        <loc>${BASE_URL}/post/${post.id}</loc>
        <lastmod>${post.date}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>`;
    });

    xml += `
</urlset>`;

    if (!fs.existsSync(PUBLIC_DIR)) {
        fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    }

    fs.writeFileSync(SITEMAP_FILE, xml);
    console.log(`Generated sitemap with ${posts.length + 3} URLs to ${SITEMAP_FILE}`);
}

generateSitemap();
