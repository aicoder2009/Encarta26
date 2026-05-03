import SearchBar from './SearchBar';
import CategoryList from './CategoryList';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-56 flex-shrink-0 flex flex-col bg-[#0d2240] encarta-panel border-r-0" style={{ minHeight: '100%' }}>
      {/* Sidebar Header */}
      <div className="px-3 py-3 border-b border-[#1a3a5c]">
        <Link href="/" className="block">
          <div className="text-[#c8a84b] text-xs font-bold uppercase tracking-widest mb-1" style={{ fontFamily: 'Georgia, serif' }}>
            Contents
          </div>
        </Link>
        <SearchBar />
      </div>
      
      {/* Category Navigation */}
      <CategoryList />
      
      {/* Footer */}
      <div className="px-3 py-2 border-t border-[#1a3a5c] mt-auto">
        <p className="text-[#3a5a7a] text-xs text-center" style={{ fontFamily: 'system-ui, sans-serif' }}>
          © 2024 Encarta 26
        </p>
      </div>
    </aside>
  );
}
