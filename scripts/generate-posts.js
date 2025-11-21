import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RESOURCE_DIR = path.join(__dirname, '../resource');
const OUTPUT_DIR = path.join(__dirname, '../src');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'posts.json');

const EXCERPT_SEPARATOR = '<!----read more---->';

function getPostData(filePath) {
    if (!fs.existsSync(filePath)) return null;
    
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    
    const [excerpt, ...rest] = content.split(EXCERPT_SEPARATOR);
    const fullContent = content.replace(EXCERPT_SEPARATOR, '');

    return {
        meta: data,
        excerpt: excerpt.trim(),
        content: fullContent.trim()
    };
}

function generatePosts() {
    const enDir = path.join(RESOURCE_DIR, 'en');
    const zhDir = path.join(RESOURCE_DIR, 'zh');

    if (!fs.existsSync(enDir)) {
        console.error(`Directory not found: ${enDir}`);
        return;
    }

    const files = fs.readdirSync(enDir).filter(file => file.endsWith('.md'));
    const posts = [];

    files.forEach(file => {
        const id = path.basename(file, '.md');
        const enPath = path.join(enDir, file);
        const zhPath = path.join(zhDir, file);

        const enData = getPostData(enPath);
        const zhData = getPostData(zhPath);

        if (!enData) return; // Should not happen as we iterate enDir

        const post = {
            id,
            date: enData.meta.date ? new Date(enData.meta.date).toISOString().split('T')[0] : '',
            hasZh: !!zhData,
            en: {
                title: enData.meta.title || 'Untitled',
                excerpt: enData.excerpt,
                content: enData.content
            },
            zh: zhData ? {
                title: zhData.meta.title || '无标题',
                excerpt: zhData.excerpt,
                content: zhData.content
            } : null
        };

        posts.push(post);
    });

    // Sort by date descending
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2));
    console.log(`Generated ${posts.length} posts to ${OUTPUT_FILE}`);
}

generatePosts();
