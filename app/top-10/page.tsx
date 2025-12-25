'use client';

import { useState } from 'react';
import Link from 'next/link';
import LoginModal from '@/components/LoginModal';

// Mock data - sẽ thay bằng API call sau
const top10Data = [
  {
    id: 'than-an-vuong-toa',
    rank: 1,
    title: 'Thần Ấn Vương Tọa',
    englishTitle: 'Divine Seal Throne',
    poster: '/placeholder-poster.jpg',
  },
  {
    id: 'tien-nghich',
    rank: 2,
    title: 'Tiên Nghịch',
    englishTitle: 'Xian Ni',
    poster: '/placeholder-poster.jpg',
  },
  {
    id: 'gia-thien',
    rank: 3,
    title: 'Già Thiên',
    englishTitle: 'Jia Tian',
    poster: '/placeholder-poster.jpg',
  },
  {
    id: 'muc-than-ky',
    rank: 4,
    title: 'Mục Thần Ký',
    englishTitle: 'Mu Shen Ji',
    poster: '/placeholder-poster.jpg',
  },
  {
    id: 'dau-pha-thuong-khung',
    rank: 5,
    title: 'Đấu Phá Thương Khung Phẩ...',
    englishTitle: 'Battle Through The Heavens',
    poster: '/placeholder-poster.jpg',
  },
  {
    id: 'thon-phe-tinh-khong',
    rank: 6,
    title: 'Thôn Phệ Tinh Không',
    englishTitle: 'Devour The Starry Sky',
    poster: '/placeholder-poster.jpg',
  },
  {
    id: 'the-gioi-hoan-my',
    rank: 7,
    title: 'Thế Giới Hoàn Mỹ',
    englishTitle: 'Perfect World',
    poster: '/placeholder-poster.jpg',
  },
  {
    id: 'huyen-gioi-chi-mon',
    rank: 8,
    title: 'Huyền Giới Chi Môn',
    englishTitle: 'Mysterious Realm Gate',
    poster: '/placeholder-poster.jpg',
  },
  {
    id: 'pham-nhan-tu-tien-3',
    rank: 9,
    title: 'Phàm Nhân Tu Tiên Phần 3',
    englishTitle: 'A Record of a Mortal\'s Journey to Immortality',
    poster: '/placeholder-poster.jpg',
  },
  {
    id: 'than-mo',
    rank: 10,
    title: 'Thần Mộ',
    englishTitle: 'Shen Mu',
    poster: '/placeholder-poster.jpg',
  },
];

type TimeFilter = 'day' | 'week' | 'month' | 'all';

export default function Top10HH3DPage() {
  const [activeFilter, setActiveFilter] = useState<TimeFilter>('day');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const filters = [
    { key: 'day' as TimeFilter, label: 'NGÀY' },
    { key: 'week' as TimeFilter, label: 'TUẦN' },
    { key: 'month' as TimeFilter, label: 'THÁNG' },
    { key: 'all' as TimeFilter, label: 'TẤT CẢ' },
  ];

  return (
    <div className="container mx-auto max-w-container px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-accent-500 mb-6">
          TOP 10 HH3D
        </h1>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`
                px-5 py-2.5 rounded-lg font-medium transition-colors text-sm md:text-base
                ${
                  activeFilter === filter.key
                    ? 'bg-primary-400 text-white shadow-lg'
                    : 'bg-slate-700/50 hover:bg-slate-700 text-neutral-300 border border-slate-600'
                }
              `}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top 10 Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mb-8">
        {top10Data.map((item) => (
          <Link
            key={item.id}
            href={`/movies/${item.id}`}
            className="group"
          >
            <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 mb-3">
              {/* Rank Badge - Overlapping top-left */}
              <div className="absolute -top-1 -left-1 z-10">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-accent-500 rounded-lg flex items-center justify-center shadow-lg border-2 border-slate-800">
                  <span className="text-white font-bold text-xl md:text-2xl">
                    {item.rank}
                  </span>
                </div>
              </div>

              {/* Poster Placeholder */}
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800">
                <span className="text-neutral-500 text-xs text-center px-2">
                  {item.title}
                </span>
              </div>
            </div>

            {/* Title Section */}
            <div>
              <h3 className="text-white font-bold text-sm md:text-base mb-1 line-clamp-2 group-hover:text-accent-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-neutral-400 text-xs md:text-sm line-clamp-1">
                {item.englishTitle}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Login Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setIsLoginModalOpen(true)}
          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors inline-flex items-center gap-2"
        >
          <span>Đăng nhập để bình luận</span>
          <svg
            className="w-4 h-4"
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
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
}

