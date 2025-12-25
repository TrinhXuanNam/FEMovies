'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import MovieList from '@/components/MovieList';
import Pagination from '@/components/Pagination';

// Mock data - sẽ thay bằng API call sau
// Deterministic function to generate consistent values (fixes hydration error)
const generateRating = (seed: number) => {
  const normalized = ((seed * 9301 + 49297) % 233280) / 233280;
  return Math.round((normalized * 2 + 3) * 10) / 10;
};

const generateMovies = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `completed-${i + 1}`,
    title: `Phim Hoàn Thành ${i + 1}`,
    englishTitle: `Completed ${i + 1}`,
    poster: '/api/placeholder/200/300',
    rating: generateRating(i),
    year: 2020 + (i % 4),
  }));
};

const TOTAL_MOVIES = 150;
const MOVIES_PER_PAGE = 20;
const TOTAL_PAGES = Math.ceil(TOTAL_MOVIES / MOVIES_PER_PAGE);

function CompletedContent() {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const startIndex = (currentPage - 1) * MOVIES_PER_PAGE;
  const endIndex = startIndex + MOVIES_PER_PAGE;
  const movies = generateMovies(TOTAL_MOVIES).slice(startIndex, endIndex);

  return (
    <>
      <MovieList movies={movies} />

      {TOTAL_PAGES > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={TOTAL_PAGES}
          baseUrl="/completed"
        />
      )}
    </>
  );
}

export default function CompletedPage() {
  return (
    <div className="container mx-auto max-w-container px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-accent-500 mb-6 md:mb-8">
        HOÀN THÀNH
      </h1>

      <Suspense fallback={<div className="text-white">Đang tải...</div>}>
        <CompletedContent />
      </Suspense>
    </div>
  );
}

