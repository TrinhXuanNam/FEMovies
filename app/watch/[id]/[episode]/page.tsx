'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import VideoPlayer from '@/components/VideoPlayer';
import DropdownArrow from '@/components/DropdownArrow';
import LoginModal from '@/components/LoginModal';

// Mock movie data - sẽ thay bằng API call sau
const getMovieData = (id: string) => {
  // Trong thực tế sẽ fetch từ API
  const movies: Record<string, any> = {
    'tien-nghich': {
      id: 'tien-nghich',
      title: 'Tiên Nghịch',
      otherName: 'Xian Ni',
      totalEpisodes: 128,
      poster: '/api/placeholder/200/300',
      scheduleDay: 'THỨ 2',
      scheduleTime: '18:00',
      description: `Xem phim Tiên Nghịch Vietsub 2023: Cải biên từ tiểu thuyết "Tiên Nghịch" của tác giả Nhĩ Căn, kể về thiếu niên bình phàm Vương Lâm xuất thân nông thôn, mang theo nhiệt huyết, tu luyện nghịch tiên, không chỉ cầu trường sinh, mà còn muốn thoát khỏi thân phận giun dế. Hắn tin rằng đạo do người quyết định, dùng tư chất bình phàm bước vào con đường tu chân, trải qua bao phong ba bão táp, dựa vào trí tuệ sáng suốt, từng bước một bước lên đỉnh cao, dựa vào sức một người, danh chấn Tu chân giới.`,
      commentCount: 89300,
      tags: ['Tiên Nghịch', 'Xian Ni'],
    },
  };
  return movies[id] || movies['tien-nghich'];
};

// Watch history management
const saveWatchHistory = (movieId: string, episode: number, progress: number) => {
  if (typeof window === 'undefined') return;
  
  const history = JSON.parse(localStorage.getItem('watchHistory') || '{}');
  history[movieId] = {
    episode,
    progress,
    timestamp: Date.now(),
  };
  localStorage.setItem('watchHistory', JSON.stringify(history));
};

const getWatchHistory = (movieId: string) => {
  if (typeof window === 'undefined') return null;
  
  const history = JSON.parse(localStorage.getItem('watchHistory') || '{}');
  return history[movieId] || null;
};

export default function WatchPage() {
  const params = useParams();
  const router = useRouter();
  const movieId = params.id as string;
  const episode = parseInt(params.episode as string, 10);

  const [videoData, setVideoData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const movieData = getMovieData(movieId);

  useEffect(() => {
    if (!movieId || isNaN(episode) || episode < 1) {
      setError('Invalid movie ID or episode number');
      setLoading(false);
      return;
    }

    // Fetch video source
    const fetchVideoSource = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/video/${movieId}/${episode}`);
        if (!response.ok) {
          throw new Error('Failed to fetch video source');
        }
        const data = await response.json();
        setVideoData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching video:', err);
        setError('Không thể tải video. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideoSource();
  }, [movieId, episode]);

  // Load watch history on mount
  useEffect(() => {
    const history = getWatchHistory(movieId);
    if (history && history.episode === episode) {
      // Có thể tự động resume từ vị trí đã xem
      // Implement trong VideoPlayer component nếu cần
    }
  }, [movieId, episode]);

  // Episode navigation
  const handleEpisodeChange = (newEpisode: number) => {
    router.push(`/watch/${movieId}/${newEpisode}`);
    // Save watch history
    saveWatchHistory(movieId, newEpisode, 0);
  };

  return (
    <div className="container mx-auto max-w-container px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {/* Breadcrumb */}
      <div className="mb-4">
        <nav className="flex items-center gap-2 text-sm text-neutral-400">
          <Link href="/" className="hover:text-white transition-colors">
            Trang chủ
          </Link>
          <span>/</span>
          <Link
            href={`/movies/${movieId}`}
            className="hover:text-white transition-colors"
          >
            {movieData.title}
          </Link>
          <span>/</span>
          <span className="text-white">Tập {episode}</span>
        </nav>
      </div>

      {/* Video Player */}
      <div className="mb-6">
        {loading ? (
          <div className="relative w-full bg-black rounded-lg overflow-hidden" style={{ paddingTop: '56.25%' }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p className="text-white">Đang tải video...</p>
              </div>
            </div>
          </div>
        ) : error || !videoData ? (
          <div className="relative w-full bg-black rounded-lg overflow-hidden" style={{ paddingTop: '56.25%' }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-red-400 text-lg mb-4">{error || 'Không tìm thấy video'}</p>
                <Link
                  href={`/movies/${movieId}`}
                  className="text-primary-400 hover:text-primary-500 transition-colors"
                >
                  ← Quay lại trang phim
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <VideoPlayer
            url={videoData.url}
            movieId={movieId}
            episode={episode}
            totalEpisodes={movieData.totalEpisodes}
            movieTitle={movieData.title}
            onEpisodeChange={handleEpisodeChange}
            autoPlay={true}
          />
        )}
      </div>

      {/* Episode Selection Section */}
      <div className="mb-6">
        {/* Series Selection Buttons */}
        <div className="flex items-center gap-3 mb-6">
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
              onSubmit={(e) => {
                e.preventDefault();
                const epNum = parseInt((e.currentTarget.querySelector('input') as HTMLInputElement).value, 10);
                if (epNum >= 1 && epNum <= movieData.totalEpisodes) {
                  router.push(`/watch/${movieId}/${epNum}`);
                }
              }}
              className="flex gap-2 flex-1 max-w-md"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Nhập số tập"
                  min="1"
                  max={movieData.totalEpisodes}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
              >
                Tìm
              </button>
            </form>
          </div>
        </div>

        {/* Episode Grid - 12 columns, scrollable */}
        <div className="mb-8">
          <div className="max-h-96 overflow-y-auto custom-scrollbar pr-2">
            <div className="grid grid-cols-12 gap-2">
              {Array.from({ length: movieData.totalEpisodes }, (_, i) => {
                const epNum = movieData.totalEpisodes - i;
                return (
                  <Link
                    key={epNum}
                    href={`/watch/${movieId}/${epNum}`}
                    className={`
                      px-3 py-2 rounded-md font-medium transition-colors text-sm text-center
                      ${
                        epNum === episode
                          ? 'bg-primary-600 text-white'
                          : 'bg-slate-700/50 hover:bg-slate-700 text-neutral-300 border border-slate-600'
                      }
                    `}
                  >
                    {epNum}
                  </Link>
                );
              })}
            </div>
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
          Xem phim {movieData.title} Vietsub 2023:
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
            (tag: string) => (
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

