'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  icon: string;
  articles: string[];
}

const CATEGORIES: Category[] = [
  {
    id: 'world-atlas',
    name: 'World Atlas',
    icon: '🌍',
    articles: ['United_States', 'Europe', 'Asia', 'Africa', 'Pacific_Ocean'],
  },
  {
    id: 'science',
    name: 'Science',
    icon: '🔬',
    articles: ['Physics', 'Chemistry', 'Biology', 'Astronomy', 'Mathematics'],
  },
  {
    id: 'history',
    name: 'History',
    icon: '📜',
    articles: ['World_War_II', 'Ancient_Rome', 'Renaissance', 'Cold_War', 'Industrial_Revolution'],
  },
  {
    id: 'nature',
    name: 'Nature',
    icon: '🌿',
    articles: ['Rainforest', 'Ocean', 'Ecosystem', 'Evolution', 'Dinosaur'],
  },
  {
    id: 'arts',
    name: 'Arts & Literature',
    icon: '🎨',
    articles: ['Shakespeare', 'Leonardo_da_Vinci', 'Beethoven', 'Renaissance_art', 'Literature'],
  },
  {
    id: 'people',
    name: 'People',
    icon: '👤',
    articles: ['Albert_Einstein', 'Marie_Curie', 'Isaac_Newton', 'Charles_Darwin', 'Nikola_Tesla'],
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: '⚽',
    articles: ['Olympic_Games', 'Football', 'Basketball', 'Tennis', 'Athletics'],
  },
  {
    id: 'technology',
    name: 'Technology',
    icon: '💻',
    articles: ['Internet', 'Computer', 'Artificial_intelligence', 'Space_exploration', 'Robotics'],
  },
  {
    id: 'society',
    name: 'Society & Culture',
    icon: '🏛️',
    articles: ['Democracy', 'Philosophy', 'Religion', 'Economics', 'Anthropology'],
  },
];

export default function CategoryList() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <nav className="flex-1 overflow-y-auto">
      <ul className="space-y-0.5">
        {CATEGORIES.map((cat) => (
          <li key={cat.id}>
            <button
              onClick={() => setExpanded(expanded === cat.id ? null : cat.id)}
              className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm text-[#a8c8e8] hover:bg-[#1a3a5c] hover:text-[#c8a84b] transition-colors group"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              <span className="text-base">{cat.icon}</span>
              <span className="flex-1 font-medium">{cat.name}</span>
              <span className="text-[#4a6a8a] text-xs group-hover:text-[#c8a84b]">
                {expanded === cat.id ? '▼' : '▶'}
              </span>
            </button>
            {expanded === cat.id && (
              <ul className="bg-[#061520] border-l-2 border-[#1a6eb5] ml-4">
                {cat.articles.map((article) => (
                  <li key={article}>
                    <Link
                      href={`/article/${encodeURIComponent(article)}`}
                      className="block px-4 py-1.5 text-xs text-[#7aaac8] hover:text-[#c8a84b] hover:bg-[#0d2240] transition-colors"
                      style={{ fontFamily: 'system-ui, sans-serif' }}
                    >
                      {article.replace(/_/g, ' ')}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
