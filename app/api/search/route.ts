import { NextRequest, NextResponse } from 'next/server';

interface SearchFilters {
  q?: string;
  genre?: string;
  year?: string;
  rating?: string;
  type?: string;
  sort?: string;
  page?: string;
}

// Mock search function - sẽ thay bằng database query sau
const searchMovies = async (filters: SearchFilters) => {
  const { q, genre, year, rating, type, sort = 'newest', page = '1' } = filters;
  const pageNum = parseInt(page, 10);
  const perPage = 20;
  const offset = (pageNum - 1) * perPage;

  // Mock data - trong thực tế sẽ query từ database
  const allMovies = Array.from({ length: 100 }, (_, i) => ({
    id: `movie-${i + 1}`,
    title: `Phim ${i + 1}${q ? ` - ${q}` : ''}`,
    englishTitle: `Movie ${i + 1}`,
    poster: '/api/placeholder/200/300',
    rating: 3.5 + Math.random() * 1.5,
    year: 2020 + (i % 5),
    genres: ['Huyền Huyễn', 'Tiên Hiệp'],
    type: i % 2 === 0 ? 'movie' : 'series',
  }));

  // Filter by query
  let filtered = allMovies;
  if (q) {
    filtered = filtered.filter((movie) =>
      movie.title.toLowerCase().includes(q.toLowerCase()) ||
      movie.englishTitle.toLowerCase().includes(q.toLowerCase())
    );
  }

  // Filter by genre
  if (genre) {
    filtered = filtered.filter((movie) => movie.genres.includes(genre));
  }

  // Filter by year
  if (year) {
    const yearNum = parseInt(year, 10);
    filtered = filtered.filter((movie) => movie.year === yearNum);
  }

  // Filter by rating
  if (rating) {
    const ratingNum = parseFloat(rating);
    filtered = filtered.filter((movie) => movie.rating >= ratingNum);
  }

  // Filter by type
  if (type) {
    filtered = filtered.filter((movie) => movie.type === type);
  }

  // Sort
  if (sort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'year') {
    filtered.sort((a, b) => b.year - a.year);
  } else {
    // newest (default)
    filtered.sort((a, b) => b.id.localeCompare(a.id));
  }

  const total = filtered.length;
  const movies = filtered.slice(offset, offset + perPage);
  const totalPages = Math.ceil(total / perPage);

  return {
    movies,
    pagination: {
      currentPage: pageNum,
      totalPages,
      total,
      perPage,
    },
  };
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filters: SearchFilters = {
      q: searchParams.get('q') || undefined,
      genre: searchParams.get('genre') || undefined,
      year: searchParams.get('year') || undefined,
      rating: searchParams.get('rating') || undefined,
      type: searchParams.get('type') || undefined,
      sort: searchParams.get('sort') || 'newest',
      page: searchParams.get('page') || '1',
    };

    const result = await searchMovies(filters);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to search movies' },
      { status: 500 }
    );
  }
}

