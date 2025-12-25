'use client';

import { Suspense } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import MovieList from '@/components/MovieList';
import Pagination from '@/components/Pagination';

// Map genre slugs to display names
const genreNames: Record<string, string> = {
  'cn-animation': 'CN Animation',
  'huyen-huyen': 'Huyền Huyễn',
  'xuyen-khong': 'Xuyên Không',
  'trung-sinh': 'Trùng Sinh',
  'tien-hiep': 'Tiên Hiệp',
  'co-trang': 'Cổ Trang',
  'hai-huoc': 'Hài Hước',
  'kiem-hiep': 'Kiếm Hiệp',
  'hien-dai': 'Hiện Đại',
};

// Mock data - sẽ thay bằng API call sau
// Deterministic functions to generate consistent values (fixes hydration error)
const generateRating = (seed: number) => {
  const normalized = ((seed * 9301 + 49297) % 233280) / 233280;
  return Math.round((normalized * 2 + 3) * 10) / 10;
};

const generateEpisode = (seed: number) => {
  const normalized = ((seed * 7919 + 104729) % 233280) / 233280;
  return Math.floor(normalized * 50) + 1;
};

const generateMovies = (count: number, genre: string) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${genre}-${i + 1}`,
    title: `${genreNames[genre] || genre} ${i + 1}`,
    englishTitle: `${genre} Movie ${i + 1}`,
    episode: `Tập ${generateEpisode(i)}`,
    poster: '/api/placeholder/200/300',
    rating: generateRating(i),
    year: 2020 + (i % 4),
  }));
};

const TOTAL_MOVIES = 120;
const MOVIES_PER_PAGE = 20;
const TOTAL_PAGES = Math.ceil(TOTAL_MOVIES / MOVIES_PER_PAGE);

function GenreContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const genreSlug = params.slug as string;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const genreName = genreNames[genreSlug] || genreSlug;

  const startIndex = (currentPage - 1) * MOVIES_PER_PAGE;
  const endIndex = startIndex + MOVIES_PER_PAGE;
  const movies = generateMovies(TOTAL_MOVIES, genreSlug).slice(
    startIndex,
    endIndex
  );

  return (
    <>
      <MovieList movies={movies} />

      {TOTAL_PAGES > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={TOTAL_PAGES}
          baseUrl={`/genre/${genreSlug}`}
        />
      )}
    </>
  );
}

export default function GenrePage() {
  const params = useParams();
  const genreSlug = params.slug as string;
  const genreName = genreNames[genreSlug] || genreSlug;

  return (
    <div className="container mx-auto max-w-container px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-accent-500 mb-6 md:mb-8">
        {genreName.toUpperCase()}
      </h1>

      <Suspense fallback={<div className="text-white">Đang tải...</div>}>
        <GenreContent />
      </Suspense>
    </div>
  );
}

