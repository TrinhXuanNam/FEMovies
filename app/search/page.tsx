'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import MovieList from '@/components/MovieList';
import Pagination from '@/components/Pagination';
import DropdownArrow from '@/components/DropdownArrow';

interface SearchFilters {
  q: string;
  genre: string;
  year: string;
  rating: string;
  type: string;
  sort: string;
}

const genres = [
  { value: '', label: 'Tất cả thể loại' },
  { value: 'Huyền Huyễn', label: 'Huyền Huyễn' },
  { value: 'Xuyên Không', label: 'Xuyên Không' },
  { value: 'Trùng Sinh', label: 'Trùng Sinh' },
  { value: 'Tiên Hiệp', label: 'Tiên Hiệp' },
  { value: 'Cổ Trang', label: 'Cổ Trang' },
  { value: 'Hài Hước', label: 'Hài Hước' },
  { value: 'Kiếm Hiệp', label: 'Kiếm Hiệp' },
  { value: 'Hiện Đại', label: 'Hiện Đại' },
];

const years = Array.from({ length: 10 }, (_, i) => 2024 - i);
const ratings = [4.5, 4.0, 3.5, 3.0];
const types = [
  { value: '', label: 'Tất cả' },
  { value: 'movie', label: 'Phim Lẻ' },
  { value: 'series', label: 'Phim Bộ' },
];
const sortOptions = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'rating', label: 'Đánh giá cao' },
  { value: 'year', label: 'Năm phát hành' },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
  });

  const [filters, setFilters] = useState<SearchFilters>({
    q: searchParams.get('q') || '',
    genre: searchParams.get('genre') || '',
    year: searchParams.get('year') || '',
    rating: searchParams.get('rating') || '',
    type: searchParams.get('type') || '',
    sort: searchParams.get('sort') || 'newest',
  });

  // Collapse/Expand states for filter sections (default: all closed)
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters.q) params.set('q', filters.q);
        if (filters.genre) params.set('genre', filters.genre);
        if (filters.year) params.set('year', filters.year);
        if (filters.rating) params.set('rating', filters.rating);
        if (filters.type) params.set('type', filters.type);
        if (filters.sort) params.set('sort', filters.sort);
        params.set('page', currentPage.toString());

        const response = await fetch(`/api/search?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();

        setMovies(data.movies);
        setPagination(data.pagination);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [filters, currentPage]);

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    // Update URL
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    params.set('page', '1'); // Reset to page 1 when filter changes
    router.push(`/search?${params.toString()}`);
  };

  const clearFilters = () => {
    setFilters({
      q: '',
      genre: '',
      year: '',
      rating: '',
      type: '',
      sort: 'newest',
    });
    router.push('/search');
  };

  const hasActiveFilters =
    filters.genre || filters.year || filters.rating || filters.type || filters.sort !== 'newest';

  return (
    <div className="container mx-auto max-w-container px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-1 h-8 bg-gradient-to-b from-primary-500 to-primary-600 rounded-full"></div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent-500 to-primary-400 bg-clip-text text-transparent">
            Tìm Kiếm
          </h1>
        </div>
        {filters.q && (
          <div className="flex items-center gap-2 text-neutral-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Kết quả tìm kiếm cho:</span>
            <span className="text-white font-semibold bg-primary-600/20 px-2 py-0.5 rounded">{filters.q}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 md:p-6 sticky top-4 shadow-xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700/50">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <h2 className="text-lg font-semibold text-white">Bộ Lọc</h2>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs px-2 py-1 bg-primary-600/20 hover:bg-primary-600/30 text-primary-400 hover:text-primary-300 rounded-md transition-all duration-200 flex items-center gap-1"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Xóa
                </button>
              )}
            </div>

            <div className="space-y-5">
              {/* Genre Filter */}
              <div>
                <button
                  onClick={() => setIsGenreOpen(!isGenreOpen)}
                  className="w-full flex items-center justify-between gap-2 mb-3 group"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    <label className="text-sm font-semibold text-white">Thể Loại</label>
                  </div>
                  <DropdownArrow
                    size={16}
                    color="#9CA3AF"
                    direction={isGenreOpen ? 'up' : 'down'}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isGenreOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="space-y-1 pt-1">
                    {genres.map((genre) => {
                      const isSelected = filters.genre === genre.value;
                      return (
                        <button
                          key={genre.value}
                          onClick={() => handleFilterChange('genre', genre.value)}
                          className={`
                            w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                            ${
                              isSelected
                                ? 'bg-primary-600 text-white shadow-md shadow-primary-600/30'
                                : 'bg-slate-700/30 text-white hover:bg-slate-700/50'
                            }
                          `}
                        >
                          {isSelected && (
                            <svg
                              className="w-4 h-4 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                          <span className="text-left flex-1">{genre.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Year Filter */}
              <div>
                <button
                  onClick={() => setIsYearOpen(!isYearOpen)}
                  className="w-full flex items-center justify-between gap-2 mb-3 group"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <label className="text-sm font-semibold text-white">Năm Phát Hành</label>
                  </div>
                  <DropdownArrow
                    size={16}
                    color="#9CA3AF"
                    direction={isYearOpen ? 'up' : 'down'}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isYearOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="space-y-1 pt-1">
                  <button
                    onClick={() => handleFilterChange('year', '')}
                    className={`
                      w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                      ${
                        !filters.year
                          ? 'bg-primary-600 text-white shadow-md shadow-primary-600/30'
                          : 'bg-slate-700/30 text-white hover:bg-slate-700/50'
                      }
                    `}
                  >
                    {!filters.year && (
                      <svg
                        className="w-4 h-4 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                    <span className="text-left flex-1">Tất cả</span>
                  </button>
                  {years.map((year) => {
                    const isSelected = filters.year === year.toString();
                    return (
                      <button
                        key={year}
                        onClick={() => handleFilterChange('year', year.toString())}
                        className={`
                          w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                          ${
                            isSelected
                              ? 'bg-primary-600 text-white shadow-md shadow-primary-600/30'
                              : 'bg-slate-700/30 text-white hover:bg-slate-700/50'
                          }
                        `}
                      >
                        {isSelected && (
                          <svg
                            className="w-4 h-4 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                        <span className="text-left flex-1">{year}</span>
                      </button>
                    );
                  })}
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <button
                  onClick={() => setIsRatingOpen(!isRatingOpen)}
                  className="w-full flex items-center justify-between gap-2 mb-3 group"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    <label className="text-sm font-semibold text-white">Đánh Giá Tối Thiểu</label>
                  </div>
                  <DropdownArrow
                    size={16}
                    color="#9CA3AF"
                    direction={isRatingOpen ? 'up' : 'down'}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isRatingOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="space-y-1 pt-1">
                  <button
                    onClick={() => handleFilterChange('rating', '')}
                    className={`
                      w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                      ${
                        !filters.rating
                          ? 'bg-primary-600 text-white shadow-md shadow-primary-600/30'
                          : 'bg-slate-700/30 text-white hover:bg-slate-700/50'
                      }
                    `}
                  >
                    {!filters.rating && (
                      <svg
                        className="w-4 h-4 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                    <span className="text-left flex-1">Tất cả</span>
                  </button>
                  {ratings.map((rating) => {
                    const isSelected = filters.rating === rating.toString();
                    return (
                      <button
                        key={rating}
                        onClick={() => handleFilterChange('rating', rating.toString())}
                        className={`
                          w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                          ${
                            isSelected
                              ? 'bg-primary-600 text-white shadow-md shadow-primary-600/30'
                              : 'bg-slate-700/30 text-white hover:bg-slate-700/50'
                          }
                        `}
                      >
                        {isSelected && (
                          <svg
                            className="w-4 h-4 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                        <span className="text-left flex-1">{rating}+ ⭐</span>
                      </button>
                    );
                  })}
                  </div>
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <button
                  onClick={() => setIsTypeOpen(!isTypeOpen)}
                  className="w-full flex items-center justify-between gap-2 mb-3 group"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <label className="text-sm font-semibold text-white">Loại Phim</label>
                  </div>
                  <DropdownArrow
                    size={16}
                    color="#9CA3AF"
                    direction={isTypeOpen ? 'up' : 'down'}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isTypeOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="space-y-1 pt-1">
                  {types.map((type) => {
                    const isSelected = filters.type === type.value;
                    return (
                      <button
                        key={type.value}
                        onClick={() => handleFilterChange('type', type.value)}
                        className={`
                          w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                          ${
                            isSelected
                              ? 'bg-primary-600 text-white shadow-md shadow-primary-600/30'
                              : 'bg-slate-700/30 text-white hover:bg-slate-700/50'
                          }
                        `}
                      >
                        {isSelected && (
                          <svg
                            className="w-4 h-4 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                        <span className="text-left flex-1">{type.label}</span>
                      </button>
                    );
                  })}
                  </div>
                </div>
              </div>

              {/* Sort */}
              <div>
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="w-full flex items-center justify-between gap-2 mb-3 group"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                    </svg>
                    <label className="text-sm font-semibold text-white">Sắp Xếp</label>
                  </div>
                  <DropdownArrow
                    size={16}
                    color="#9CA3AF"
                    direction={isSortOpen ? 'up' : 'down'}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isSortOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="space-y-1 pt-1">
                  {sortOptions.map((option) => {
                    const isSelected = filters.sort === option.value;
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleFilterChange('sort', option.value)}
                        className={`
                          w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                          ${
                            isSelected
                              ? 'bg-primary-600 text-white shadow-md shadow-primary-600/30'
                              : 'bg-slate-700/30 text-white hover:bg-slate-700/50'
                          }
                        `}
                      >
                        {isSelected && (
                          <svg
                            className="w-4 h-4 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                        <span className="text-left flex-1">{option.label}</span>
                      </button>
                    );
                  })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-600/20 border-t-primary-600 mx-auto mb-4"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                <p className="text-white font-medium">Đang tìm kiếm...</p>
                <p className="text-neutral-400 text-sm mt-1">Vui lòng đợi trong giây lát</p>
              </div>
            </div>
          ) : movies.length > 0 ? (
            <>
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                  <span className="text-neutral-400">
                    Tìm thấy <span className="text-white font-semibold">{pagination.total}</span> kết quả
                  </span>
                </div>
              </div>
              <MovieList movies={movies} />
              {pagination.totalPages > 1 && (
                <div className="mt-8">
                  <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    baseUrl={`/search?${new URLSearchParams(
                      Object.entries(filters).filter(([_, v]) => v)
                    ).toString()}`}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-800/50 rounded-full mb-6">
                <svg
                  className="w-10 h-10 text-neutral-600"
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
              </div>
              <p className="text-neutral-300 text-lg font-medium mb-2">Không tìm thấy kết quả</p>
              <p className="text-neutral-500 text-sm">
                Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto max-w-container px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}

