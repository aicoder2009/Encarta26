import { getDailyFeatured } from '@/lib/wikipedia';
import Link from 'next/link';
import Image from 'next/image';

export default async function TopicOfTheDay() {
  let featured = null;
  
  try {
    const data = await getDailyFeatured();
    featured = data.tfa || null;
  } catch {
    // Fallback if API is unavailable
  }

  if (!featured) {
    return (
      <div className="encarta-panel p-4">
        <h2 className="encarta-heading text-[#c8a84b] text-lg mb-2">Topic of the Day</h2>
        <p className="text-[#7aaac8] text-sm">Featured content unavailable.</p>
      </div>
    );
  }

  const slug = encodeURIComponent(featured.titles?.canonical || featured.title);

  return (
    <div className="encarta-panel p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[#c8a84b] text-lg">⭐</span>
        <h2 className="encarta-heading text-[#c8a84b] text-lg">Topic of the Day</h2>
      </div>
      
      <div className="flex gap-4">
        {featured.thumbnail && (
          <div className="flex-shrink-0 encarta-inset p-0.5">
            <Image
              src={featured.thumbnail.source}
              alt={featured.title}
              width={120}
              height={80}
              className="object-cover"
              style={{ width: '120px', height: '80px' }}
              unoptimized
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <Link href={`/article/${slug}`}>
            <h3 className="encarta-heading text-[#e8d888] text-base hover:text-white transition-colors mb-1 cursor-pointer">
              {featured.displaytitle || featured.title}
            </h3>
          </Link>
          {featured.description && (
            <p className="text-[#7aaac8] text-xs mb-2 italic">{featured.description}</p>
          )}
          <p className="text-[#a8c8e8] text-sm leading-relaxed line-clamp-3" style={{ fontFamily: 'system-ui, sans-serif' }}>
            {featured.extract?.slice(0, 200)}
            {(featured.extract?.length || 0) > 200 ? '...' : ''}
          </p>
          <Link
            href={`/article/${slug}`}
            className="inline-block mt-2 text-xs text-[#c8a84b] hover:text-white border border-[#c8a84b] px-2 py-0.5 hover:bg-[#c8a84b] hover:text-[#0a1628] transition-colors encarta-button"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
}
