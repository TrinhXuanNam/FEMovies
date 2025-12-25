'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

interface TrendingItem {
  rank: number;
  title: string;
  titleEn: string;
  rating: number;
  poster: string;
}

const trendingData: TrendingItem[] = [
  {
    rank: 1,
    title: 'Tiên Nghịch',
    titleEn: 'Kian Ni',
    rating: 4.6,
    poster: '/api/placeholder/300/400',
  },
  {
    rank: 2,
    title: 'Đấu Phá Thương Kh...',
    titleEn: 'Fights Break Sphere S',
    rating: 4.0,
    poster: '/api/placeholder/300/400',
  },
  {
    rank: 3,
    title: 'Mục Thần Ký',
    titleEn: 'Mu Shen 21',
    rating: 4.6,
    poster: '/api/placeholder/300/400',
  },
  {
    rank: 4,
    title: 'Phàm Nhân Tu Tiên...',
    titleEn: 'Fansen Xiu Xian Chuan S',
    rating: 4.5,
    poster: '/api/placeholder/300/400',
  },
  {
    rank: 5,
    title: 'Thế Giới Hoàn I',
    titleEn: 'Perfect World',
    rating: 4.3,
    poster: '/api/placeholder/300/400',
  },
  {
    rank: 6,
    title: 'Võ Thần Truyền Kỳ',
    titleEn: 'Martial God Legend',
    rating: 4.4,
    poster: '/api/placeholder/300/400',
  },
  {
    rank: 7,
    title: 'Thần Ấn Vương Toạ',
    titleEn: 'Throne Of Seal',
    rating: 4.7,
    poster: '/api/placeholder/300/400',
  },
  {
    rank: 8,
    title: 'Luyện Khí Mười Vạn Năm',
    titleEn: 'Lian Qi Shi Wan Nian',
    rating: 4.2,
    poster: '/api/placeholder/300/400',
  },
  {
    rank: 9,
    title: 'Vạn Giới Độc Tôn',
    titleEn: 'Wan Jie Du Zun',
    rating: 4.5,
    poster: '/api/placeholder/300/400',
  },
  {
    rank: 10,
    title: 'Thôn Phệ Tinh Không',
    titleEn: 'Swallowed Star',
    rating: 4.6,
    poster: '/api/placeholder/300/400',
  },
];

export default function TrendingSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      checkScrollButtons();
      scrollContainer.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);
      return () => {
        scrollContainer.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="mb-8 md:mb-12">
      <h2 className="flex items-center gap-2 text-white font-bold text-xl md:text-2xl mb-4 md:mb-6">
        {/* Flame Icon */}
        <svg
          className="w-5 h-5 md:w-6 md:h-6 text-accent-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
            clipRule="evenodd"
          />
        </svg>
        <span className="bg-gradient-to-r from-white to-pink-400 bg-clip-text text-transparent">
          ĐANG THỊNH HÀNH
        </span>
      </h2>
      <div className="relative">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-black/80 hover:bg-primary-600 backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-lg transition-all hover:scale-110 active:scale-95"
            aria-label="Scroll left"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-black/80 hover:bg-primary-600 backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-lg transition-all hover:scale-110 active:scale-95"
            aria-label="Scroll right"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}

        {/* Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-3 md:gap-4 lg:gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
          style={{
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {trendingData.map((item, index) => {
            // Tạo gradient khác nhau cho mỗi poster - màu đỏ-nâu-cam-vàng như poster thật
            const gradients = [
              'from-red-900/60 via-orange-800/50 to-yellow-700/40',
              'from-red-800/60 via-orange-900/50 to-yellow-800/40',
              'from-brown-900/60 via-red-900/50 to-orange-800/40',
              'from-orange-900/60 via-red-800/50 to-yellow-700/40',
              'from-red-900/60 via-brown-800/50 to-orange-700/40',
              'from-orange-800/60 via-red-900/50 to-yellow-800/40',
              'from-red-800/60 via-orange-900/50 to-yellow-700/40',
              'from-brown-900/60 via-red-800/50 to-orange-800/40',
              'from-orange-900/60 via-red-900/50 to-yellow-800/40',
              'from-red-900/60 via-orange-800/50 to-brown-700/40',
            ];

            return (
              <Link
                key={item.rank}
                href={`/movies/${item.rank}`}
                className="flex-shrink-0 w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] group cursor-pointer"
              >
                {/* Poster */}
                <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-movie-card border border-movie-border hover:border-primary-400/60 transition-all mb-2">
                  {/* Background Gradient - màu đỏ-nâu với cam-vàng */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} z-0`}
                  />
                  
                  {/* Rating Badge - góc dưới phải, màu vàng đậm, oval */}
                  <div className="absolute bottom-2 right-2 z-20 bg-yellow-600/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-lg">
                    <span className="text-white text-xs md:text-sm font-bold">
                      {item.rating}
                    </span>
                  </div>
                </div>
                
                {/* Info dưới poster: Rank + Title */}
                <div className="flex items-baseline gap-2">
                  {/* Rank số - lớn, màu cam */}
                  <span className="text-accent-500 font-bold text-2xl md:text-3xl leading-none">
                    {item.rank}
                  </span>
                  {/* Title */}
                  <div className="flex-1 min-w-0">
                    {/* Vietnamese Title - lớn */}
                    <h3 className="text-white font-bold text-base md:text-lg leading-tight line-clamp-2 hover:text-primary-400 transition-colors">
                      {item.title}
                    </h3>
                    {/* English Title - nhỏ, ở dưới */}
                    <p className="text-neutral-400 text-xs md:text-sm line-clamp-1 mt-0.5">
                      {item.titleEn}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

