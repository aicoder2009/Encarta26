import TopicOfTheDay from '@/components/TopicOfTheDay';
import { getArticleSummary } from '@/lib/wikipedia';
import Link from 'next/link';
import Image from 'next/image';

const FEATURED_ARTICLES = [
  { title: 'Solar_System', label: 'Solar System', category: 'Science' },
  { title: 'World_War_II', label: 'World War II', category: 'History' },
  { title: 'Leonardo_da_Vinci', label: 'Leonardo da Vinci', category: 'People' },
  { title: 'Amazon_rainforest', label: 'Amazon Rainforest', category: 'Nature' },
  { title: 'Ancient_Rome', label: 'Ancient Rome', category: 'History' },
  { title: 'Internet', label: 'The Internet', category: 'Technology' },
];

async function FeaturedArticleCard({ title, label, category }: { title: string; label: string; category: string }) {
  let summary = null;
  try {
    summary = await getArticleSummary(title);
  } catch {
    // fallback
  }

  return (
    <Link href={`/article/${encodeURIComponent(title)}`} className="block group">
      <div className="encarta-panel p-0 overflow-hidden hover:border-[#c8a84b] transition-colors h-full">
        {summary?.thumbnail ? (
          <div className="relative w-full h-32 overflow-hidden encarta-inset">
            <Image
              src={summary.thumbnail.source}
              alt={label}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              unoptimized
            />
          </div>
        ) : (
          <div className="w-full h-32 bg-[#061520] flex items-center justify-center encarta-inset">
            <span className="text-[#1a3a5c] text-4xl">📖</span>
          </div>
        )}
        <div className="p-3">
          <div className="text-[#c8a84b] text-xs uppercase tracking-wider mb-1" style={{ fontFamily: 'system-ui, sans-serif' }}>
            {category}
          </div>
          <h3 className="encarta-heading text-[#e8d888] text-sm group-hover:text-white transition-colors mb-1">
            {label}
          </h3>
          {summary?.description && (
            <p className="text-[#7aaac8] text-xs line-clamp-2" style={{ fontFamily: 'system-ui, sans-serif' }}>
              {summary.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Splash Header */}
      <div className="encarta-panel p-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, #c8a84b 0%, transparent 70%)',
        }} />
        <div className="relative z-10">
          <h1 className="text-5xl font-bold text-[#c8a84b] mb-2 encarta-heading"
            style={{ textShadow: '0 0 40px rgba(200,168,75,0.4), 2px 2px 4px rgba(0,0,0,0.8)' }}>
            Encarta 26
          </h1>
          <div className="encarta-divider w-64 mx-auto" />
          <p className="text-[#7aaac8] text-lg mt-2" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
            Explore the world of knowledge
          </p>
          <p className="text-[#4a6a8a] text-sm mt-1" style={{ fontFamily: 'system-ui, sans-serif' }}>
            Millions of articles at your fingertips
          </p>
        </div>
      </div>

      {/* Topic of the Day */}
      <TopicOfTheDay />

      {/* Divider */}
      <div className="encarta-divider" />

      {/* Featured Articles Grid */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="encarta-heading text-[#c8a84b] text-xl">Featured Articles</h2>
          <div className="flex-1 h-px bg-[#1a3a5c]" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {FEATURED_ARTICLES.map((article) => (
            <FeaturedArticleCard key={article.title} {...article} />
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="encarta-panel p-4">
        <h2 className="encarta-heading text-[#c8a84b] text-lg mb-3">Quick Topics</h2>
        <div className="flex flex-wrap gap-2">
          {[
            'Philosophy', 'Music', 'Architecture', 'Medicine', 'Language',
            'Climate', 'Economics', 'Psychology', 'Astronomy', 'Geology',
          ].map((topic) => (
            <Link
              key={topic}
              href={`/article/${encodeURIComponent(topic)}`}
              className="px-3 py-1 text-sm text-[#a8c8e8] hover:text-[#c8a84b] encarta-button bg-[#061520] hover:bg-[#1a3a5c] transition-colors"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {topic}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
