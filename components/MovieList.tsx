'use client';

import Link from 'next/link';

interface MovieItem {
  id: string;
  title: string;
  englishTitle?: string;
  episode?: string;
  poster: string;
  rating?: number;
  year?: number;
}

interface MovieListProps {
  movies: MovieItem[];
}

export default function MovieList({ movies }: MovieListProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-5">
      {movies.map((movie) => (
        <Link
          key={movie.id}
          href={`/movies/${movie.id}`}
          className="group cursor-pointer transform transition-transform hover:scale-105"
        >
          {/* Poster */}
          <div className="relative mb-2">
            <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden bg-movie-card border border-movie-border group-hover:border-primary-500 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
              <div className="w-full h-full bg-gradient-to-br from-primary-600/20 to-secondary-600/20 flex items-center justify-center">
                <span className="text-neutral-500 text-xs">Poster</span>
              </div>
              {/* Episode Number Overlay */}
              {movie.episode && (
                <div className="absolute top-2 left-2 z-20 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-md">
                  <span className="text-white text-xs font-medium">
                    {movie.episode}
                  </span>
                </div>
              )}
              {/* Rating Badge */}
              {movie.rating && (
                <div className="absolute top-2 right-2 z-20 bg-yellow-500/90 backdrop-blur-sm px-2 py-1 rounded-md">
                  <span className="text-white text-xs font-medium">
                    ★ {movie.rating}
                  </span>
                </div>
              )}
            </div>
          </div>
          {/* Title */}
          <div>
            <h3 className="text-white font-medium text-sm md:text-base line-clamp-2 group-hover:text-primary-400 transition-colors">
              {movie.title}
            </h3>
            {movie.englishTitle && (
              <p className="text-neutral-400 text-xs line-clamp-1 mt-1">
                {movie.englishTitle}
              </p>
            )}
            {movie.year && (
              <p className="text-neutral-500 text-xs mt-1">{movie.year}</p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

