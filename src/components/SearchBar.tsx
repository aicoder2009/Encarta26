'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/article/${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Encarta 26..."
          className="w-full px-3 py-2 text-sm bg-[#051020] border-2 text-[#a8c8e8] placeholder-[#4a6a8a] focus:outline-none focus:border-[#1a6eb5] encarta-inset"
          style={{ fontFamily: 'system-ui, sans-serif' }}
        />
        <button
          type="submit"
          className="absolute right-0 top-0 bottom-0 px-3 bg-[#1a6eb5] text-white text-sm font-bold hover:bg-[#2080cc] transition-colors encarta-button"
        >
          🔍
        </button>
      </div>
    </form>
  );
}
