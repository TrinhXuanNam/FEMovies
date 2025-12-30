'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DropdownArrow from '@/components/DropdownArrow';
import LoginModal from '@/components/LoginModal';

// Map genre names to slugs
const genreSlugMap: Record<string, string> = {
  'CN Animation': 'cn-animation',
  'Cổ Trang': 'co-trang',
  'Huyền Huyễn': 'huyen-huyen',
  'Tiên Hiệp': 'tien-hiep',
  'Xuyên Không': 'xuyen-khong',
  'Trùng Sinh': 'trung-sinh',
  'Hài Hước': 'hai-huoc',
  'Kiếm Hiệp': 'kiem-hiep',
  'Hiện Đại': 'hien-dai',
};

// Mock data - sẽ thay bằng API call sau
const movieData = {
  id: 'tien-nghich',
  title: 'Tiên Nghịch',
  otherName: 'Xian Ni',
  genres: ['CN Animation', 'Cổ Trang', 'Huyền Huyễn', 'Tiên Hiệp'],
  latestEpisode: 120,
  totalEpisodes: 128,
  year: 2023,
  rating: 4.56,
  ratingCount: 38242,
  schedule: 'LỊCH CHIẾU VÀO TRƯA THỨ 2, CHIẾU SỚM LÚC 18:00 CHỦ NHẬT',
  scheduleDay: 'THỨ 2',
  scheduleTime: '18:00',
  description: `Xem phim Tiên Nghịch Vietsub 2023: Cải biên từ tiểu thuyết "Tiên Nghịch" của tác giả Nhĩ Căn, kể về thiếu niên bình phàm Vương Lâm xuất thân nông thôn, mang theo nhiệt huyết, tu luyện nghịch tiên, không chỉ cầu trường sinh, mà còn muốn thoát khỏi thân phận giun dế. Hắn tin rằng đạo do người quyết định, dùng tư chất bình phàm bước vào con đường tu chân, trải qua bao phong ba bão táp, dựa vào trí tuệ sáng suốt, từng bước một bước lên đỉnh cao, dựa vào sức một người, danh chấn Tu chân giới.`,
  commentCount: 89300,
  tags: ['Tiên Nghịch', 'Xian Ni'],
};

export default function MovieDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);
  const [episodeSearch, setEpisodeSearch] = useState('');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Generate episode list (120 down to 1) - có thể mở rộng đến 1000 tập
  const totalEpisodes = movieData.totalEpisodes;
  const episodes = Array.from(
    { length: totalEpisodes },
    (_, i) => totalEpisodes - i
  );

  const handleEpisodeSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const episodeNum = parseInt(episodeSearch);
    if (episodeNum >= 1 && episodeNum <= totalEpisodes) {
      setSelectedEpisode(episodeNum);
      // Navigate to watch page
      router.push(`/watch/${movieData.id}/${episodeNum}`);
    }
  };

  return (
    <div className="container mx-auto max-w-container px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {/* Header */}

      {/* Main Content - 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
        {/* Left: Character Illustration */}
        <div className="lg:col-span-1">
          <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-gradient-to-br from-red-900/60 via-orange-800/50 to-yellow-700/40 border border-movie-border">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-neutral-500 text-sm">
                Character Illustration
              </span>
            </div>
          </div>
        </div>

        {/* Right: Information Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-accent-500 mb-2">
              {movieData.title}
            </h1>
            <p className="text-neutral-400">
              <span className="text-neutral-300">Tên Khác:</span>{' '}
              {movieData.otherName}
            </p>
          </div>
          {/* Genres */}
          <div>
            <h3 className="text-sm font-medium text-neutral-300 mb-2">
              Thể Loại
            </h3>
            <div className="flex flex-wrap gap-2">
              {movieData.genres.map((genre) => {
                const slug = genreSlugMap[genre];
                if (slug) {
                  return (
                    <Link
                      key={genre}
                      href={`/genre/${slug}`}
                      className="px-3 py-1 bg-slate-700/50 border border-slate-600 rounded-lg text-sm text-neutral-300 hover:bg-slate-700 hover:border-primary-500 hover:text-primary-400 transition-colors"
                    >
                      {genre}
                    </Link>
                  );
                }
                return (
                  <span
                    key={genre}
                    className="px-3 py-1 bg-slate-700/50 border border-slate-600 rounded-lg text-sm text-neutral-300"
                  >
                    {genre}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Latest Episode */}
          <div>
            <h3 className="text-sm font-medium text-neutral-300 mb-2">
              Tập mới nhất
            </h3>
            <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors">
              Tập {movieData.latestEpisode}
            </button>
          </div>

          {/* Other Information */}
          <div>
            <h3 className="text-sm font-medium text-neutral-300 mb-2">
              Thông Tin Khác
            </h3>
            <div className="flex flex-wrap gap-4 text-neutral-400">
              <div className="flex items-center gap-2">
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>{movieData.year}</span>
              </div>
              <div className="flex items-center gap-2">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{movieData.totalEpisodes} Tập</span>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div>
            <h3 className="text-sm font-medium text-neutral-300 mb-2">
              Đánh Giá
            </h3>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-white font-medium text-lg">
                {movieData.rating}/5
              </span>
              <span className="text-neutral-400 text-sm">
                ({movieData.ratingCount.toLocaleString()} lượt)
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors">
              Đánh Giá
            </button>
            <button className="px-4 py-2 bg-accent-500 hover:bg-accent-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              Theo dõi
            </button>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/watch/${movieData.id}/${selectedEpisode || movieData.latestEpisode}`}
              className="px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white rounded-lg font-medium transition-colors w-[350px] text-center"
            >
              Xem Phim
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-6 mb-6 flex items-center gap-3">
        <button className="px-4 py-3 bg-secondary-600 hover:bg-secondary-700 text-white rounded-lg font-medium transition-colors">
          Phân Chính
        </button>
        <button className="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors">
          Movie Thân Lâm Chi Chiến
        </button>
      </div>
      {/* Episode Search */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <form
            onSubmit={handleEpisodeSearch}
            className="flex gap-2 flex-1 max-w-md"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={episodeSearch}
                onChange={(e) => setEpisodeSearch(e.target.value)}
                placeholder="Nhập số tập"
                min="1"
                max={totalEpisodes}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {/* <DropdownArrow
                size={16}
                color="#9ca3af"
                className="absolute right-3 top-1/2 -translate-y-1/2"
              /> */}
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
            >
              Tìm
            </button>
          </form>
          {/* <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2">
            <span>VIỆT SUB</span>
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
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button> */}
        </div>
      </div>

      {/* Episode Grid - Scrollable */}
      <div className="mb-8">
        <div className="max-h-96 overflow-y-auto custom-scrollbar pr-2">
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-2">
            {episodes.map((episode) => (
              <Link
                key={episode}
                href={`/watch/${movieData.id}/${episode}`}
                onClick={() => setSelectedEpisode(episode)}
                className={`
                  px-3 py-2 rounded-md font-medium transition-colors text-sm text-center
                  ${
                    selectedEpisode === episode
                      ? 'bg-primary-600 text-white'
                      : 'bg-slate-700/50 hover:bg-slate-700 text-neutral-300 border border-slate-600'
                  }
                `}
              >
                {episode}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Broadcast Schedule */}
      <div className="mb-6 p-4 bg-slate-700/30 rounded-lg">
        <div className="flex items-center gap-3">
          {/* Calendar Icon */}
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center flex-shrink-0">
            <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">31</span>
            </div>
          </div>
          <p className="text-white text-sm md:text-base">
            LỊCH CHIẾU VÀO TRƯA{' '}
            <span className="text-accent-500 font-semibold">
              {movieData.scheduleDay}
            </span>
            , CHIẾU SỚM LÚC{' '}
            <span className="text-accent-500 font-semibold">
              {movieData.scheduleTime}
            </span>{' '}
            CHỦ NHẬT
          </p>
        </div>
      </div>

      {/* Content Description */}
      <div className="mb-8 p-6 bg-slate-800/50 rounded-lg border border-slate-700/50">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-white inline-block">
            NỘI DUNG
          </h2>
          <div className="h-0.5 w-16 bg-accent-500 mt-1"></div>
        </div>

        {/* Title */}
        <h3 className="text-white text-lg mb-3">
          Xem phim Tiên Nghịch Vietsub 2023:
        </h3>

        {/* Description */}
        <div className="mb-4">
          <p className="text-white leading-relaxed">
            {showFullDescription
              ? movieData.description
              : `${movieData.description.substring(0, 200)}...`}
          </p>
          {movieData.description.length > 200 && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-accent-500 hover:text-accent-400 mt-2 text-sm font-medium"
            >
              {showFullDescription ? 'Thu gọn' : 'Xem thêm...'}
            </button>
          )}
        </div>

        {/* Login to Comment Button */}
        <button
          onClick={() => setIsLoginModalOpen(true)}
          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors inline-flex items-center gap-2"
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

      {/* Comment Section */}
      <div className="mb-8">
        {/* Comment Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-white font-bold text-lg">
              {(movieData.commentCount / 1000).toFixed(1)}K BÌNH LOẠN
            </h3>
            <div className="h-0.5 flex-1 bg-green-500 max-w-xs"></div>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                clipRule="evenodd"
              />
            </svg>
            <button className="text-white flex items-center gap-1">
              <span>Mới nhất</span>
              <DropdownArrow size={16} color="#ffffff" direction="down" />
            </button>
            <div className="h-0.5 w-12 bg-accent-500"></div>
          </div>
        </div>

        {/* View Comments Button */}
        <div className="flex justify-center">
          <button className="px-6 py-3 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors border border-slate-600">
            Xem Bình Luận
          </button>
        </div>
      </div>

      {/* Tags Section */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {(showAllTags ? movieData.tags : movieData.tags.slice(0, 2)).map(
            (tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 bg-slate-700/50 border border-slate-600 rounded-lg text-sm text-white"
              >
                {tag}
              </span>
            )
          )}
          {movieData.tags.length > 2 && (
            <button
              onClick={() => setShowAllTags(!showAllTags)}
              className="px-3 py-1.5 text-neutral-400 hover:text-neutral-300 text-sm"
            >
              {showAllTags ? 'Ẩn bớt' : 'Show more...'}
            </button>
          )}
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
}
