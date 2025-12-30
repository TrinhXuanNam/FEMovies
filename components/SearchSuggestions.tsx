'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface SearchSuggestion {
  id: string;
  title: string;
  type: 'movie' | 'genre';
  poster?: string;
}

interface SearchSuggestionsProps {
  query: string;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (suggestion: SearchSuggestion) => void;
}

// Mock search suggestions - sẽ thay bằng API call sau
const getSuggestions = async (query: string): Promise<SearchSuggestion[]> => {
  if (!query || query.length < 2) return [];

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Mock data - trong thực tế sẽ fetch từ API
  const mockMovies: SearchSuggestion[] = [
    { id: '1', title: 'Tiên Nghịch', type: 'movie' },
    { id: '2', title: 'Tiên Hiệp', type: 'genre' },
    { id: '3', title: 'Tiên Võ', type: 'movie' },
    { id: '4', title: 'Tiên Kiếm', type: 'movie' },
  ];

  return mockMovies.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );
};

// Get search history from localStorage
const getSearchHistory = (): string[] => {
  if (typeof window === 'undefined') return [];
  const history = localStorage.getItem('searchHistory');
  return history ? JSON.parse(history) : [];
};

// Save to search history
const saveToHistory = (query: string) => {
  if (typeof window === 'undefined' || !query.trim()) return;
  const history = getSearchHistory();
  const newHistory = [query, ...history.filter((q) => q !== query)].slice(0, 10);
  localStorage.setItem('searchHistory', JSON.stringify(newHistory));
};

// Popular searches
const popularSearches = [
  'Tiên Nghịch',
  'Huyền Huyễn',
  'Xuyên Không',
  'Cổ Trang',
  'Tiên Hiệp',
];

export default function SearchSuggestions({
  query,
  isOpen,
  onClose,
  onSelect,
}: SearchSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchHistory(getSearchHistory());
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      const results = await getSuggestions(query);
      setSuggestions(results);
      setLoading(false);
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, isOpen]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const hasQuery = query.length >= 2;
  const showHistory = !hasQuery && searchHistory.length > 0;
  const showPopular = !hasQuery && searchHistory.length === 0;

  return (
    <div
      ref={containerRef}
      className="absolute top-full left-0 right-0 mt-2 bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-2xl shadow-black/50 backdrop-blur-sm z-50 max-h-96 overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-top-2 duration-200"
    >
      {loading && hasQuery && (
        <div className="p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-500 border-t-transparent mx-auto mb-2"></div>
          <p className="text-neutral-400 text-sm">Đang tìm kiếm...</p>
        </div>
      )}

      {!loading && hasQuery && suggestions.length > 0 && (
        <div className="py-2">
          {suggestions.map((suggestion) => (
            <Link
              key={suggestion.id}
              href={
                suggestion.type === 'movie'
                  ? `/movies/${suggestion.id}`
                  : `/genre/${suggestion.id}`
              }
              onClick={() => {
                onSelect(suggestion);
                saveToHistory(suggestion.title);
                onClose();
              }}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-primary-600/20 hover:to-transparent hover:border-l-2 hover:border-primary-500 transition-all duration-200 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-primary-600/30 group-hover:to-primary-700/20 transition-all duration-200 shadow-sm">
                {suggestion.type === 'movie' ? (
                  <svg
                    className="w-5 h-5 text-neutral-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-neutral-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate group-hover:text-primary-300 transition-colors">
                  {suggestion.title}
                </p>
                <p className="text-neutral-400 text-xs group-hover:text-neutral-300 transition-colors">
                  {suggestion.type === 'movie' ? 'Phim' : 'Thể loại'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!loading && hasQuery && suggestions.length === 0 && (
        <div className="p-8 text-center">
          <svg
            className="w-12 h-12 text-neutral-600 mx-auto mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <p className="text-neutral-400 text-sm">Không tìm thấy kết quả</p>
          <p className="text-neutral-500 text-xs mt-1">Thử tìm kiếm với từ khóa khác</p>
        </div>
      )}

      {showHistory && (
        <div className="py-2">
          <div className="px-4 py-2.5 text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Lịch sử tìm kiếm
          </div>
          {searchHistory.map((item, index) => (
            <Link
              key={index}
              href={`/search?q=${encodeURIComponent(item)}`}
              onClick={() => {
                saveToHistory(item);
                onClose();
              }}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-gradient-to-r hover:from-slate-700/50 hover:to-transparent transition-all duration-200 group"
            >
              <svg
                className="w-4 h-4 text-neutral-500 group-hover:text-primary-400 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-white group-hover:text-primary-300 transition-colors">{item}</span>
            </Link>
          ))}
        </div>
      )}

      {showPopular && (
        <div className="py-2">
          <div className="px-4 py-2.5 text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Tìm kiếm phổ biến
          </div>
          {popularSearches.map((item, index) => (
            <Link
              key={index}
              href={`/search?q=${encodeURIComponent(item)}`}
              onClick={() => {
                saveToHistory(item);
                onClose();
              }}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-gradient-to-r hover:from-primary-600/20 hover:to-transparent transition-all duration-200 group"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-600/30 to-primary-700/20 flex items-center justify-center group-hover:from-primary-500/50 group-hover:to-primary-600/30 transition-all">
                <span className="text-xs font-bold text-primary-400">{index + 1}</span>
              </div>
              <span className="text-white group-hover:text-primary-300 transition-colors flex-1">{item}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

