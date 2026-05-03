import { getArticleSummary } from '@/lib/wikipedia';
import ArticleView from '@/components/ArticleView';
import Link from 'next/link';
import type { Metadata } from 'next';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = decodeURIComponent(slug);
  return {
    title: `${title.replace(/_/g, ' ')} — Encarta 26`,
    description: `Encyclopedia article about ${title.replace(/_/g, ' ')}`,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  
  let article = null;
  let error = null;
  
  try {
    article = await getArticleSummary(decodedSlug);
  } catch (e) {
    error = e instanceof Error ? e.message : 'Article not found';
  }

  if (error || !article) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="encarta-panel p-6 text-center">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="encarta-heading text-[#c8a84b] text-2xl mb-2">Article Not Found</h1>
          <p className="text-[#7aaac8] mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
            The article &ldquo;{decodedSlug.replace(/_/g, ' ')}&rdquo; could not be found in the encyclopedia.
          </p>
          <Link
            href="/"
            className="inline-block px-4 py-2 text-sm text-[#c8a84b] border border-[#c8a84b] hover:bg-[#c8a84b] hover:text-[#0a1628] transition-colors encarta-button"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            ← Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#4a6a8a] mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
        <Link href="/" className="hover:text-[#c8a84b] transition-colors">Home</Link>
        <span>▶</span>
        <span className="text-[#7aaac8]">{article.displaytitle || article.title}</span>
      </nav>
      
      <ArticleView article={article} />
    </div>
  );
}
