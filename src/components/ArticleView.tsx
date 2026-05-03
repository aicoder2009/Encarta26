import type { WikipediaSummary } from '@/types/wikipedia';
import Image from 'next/image';
import Link from 'next/link';

interface ArticleViewProps {
  article: WikipediaSummary;
}

export default function ArticleView({ article }: ArticleViewProps) {
  return (
    <article className="max-w-none">
      {/* Article Header */}
      <div className="encarta-panel p-5 mb-4">
        <div className="flex items-start gap-4">
          {article.thumbnail && (
            <div className="flex-shrink-0 encarta-inset p-0.5 float-right ml-4 mb-2">
              <Image
                src={article.originalimage?.source || article.thumbnail.source}
                alt={article.title}
                width={200}
                height={150}
                className="object-cover"
                style={{ width: '200px', height: 'auto' }}
                unoptimized
              />
              {article.description && (
                <p className="text-[#7aaac8] text-xs mt-1 text-center italic px-1" style={{ fontFamily: 'system-ui, sans-serif' }}>
                  {article.description}
                </p>
              )}
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[#c8a84b] text-xs uppercase tracking-widest font-bold" style={{ fontFamily: 'system-ui, sans-serif' }}>
                Encyclopedia Article
              </span>
            </div>
            <h1
              className="text-3xl text-[#e8d888] mb-2 leading-tight"
              style={{ fontFamily: 'Georgia, serif' }}
              dangerouslySetInnerHTML={{ __html: article.displaytitle || article.title }}
            />
            {article.description && (
              <p className="text-[#7aaac8] text-sm italic mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                {article.description}
              </p>
            )}
            <div className="border-t border-[#1a3a5c] pt-3">
              <p
                className="text-[#c8d8e8] text-base leading-relaxed"
                style={{ fontFamily: 'Georgia, serif', lineHeight: '1.8' }}
              >
                {article.extract}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Article Metadata */}
      <div className="encarta-panel p-4 mb-4">
        <h2 className="encarta-heading text-[#c8a84b] text-sm mb-3 uppercase tracking-wide">
          Article Information
        </h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
          {article.timestamp && (
            <>
              <span className="text-[#4a6a8a]">Last Updated:</span>
              <span className="text-[#a8c8e8]">
                {new Date(article.timestamp).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </span>
            </>
          )}
          {article.lang && (
            <>
              <span className="text-[#4a6a8a]">Language:</span>
              <span className="text-[#a8c8e8] uppercase">{article.lang}</span>
            </>
          )}
        </div>
      </div>

      {/* Read Full Article Link */}
      <div className="encarta-panel p-4">
        <div className="flex items-center justify-between">
          <p className="text-[#7aaac8] text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
            This article is sourced from Wikipedia, the free encyclopedia.
          </p>
          <a
            href={article.content_urls?.desktop?.page}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#c8a84b] hover:text-white border border-[#c8a84b] px-3 py-1 hover:bg-[#c8a84b] hover:text-[#0a1628] transition-colors encarta-button flex-shrink-0 ml-4"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            View on Wikipedia ↗
          </a>
        </div>
      </div>
    </article>
  );
}
