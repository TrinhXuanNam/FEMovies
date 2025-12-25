'use client';

import Link from 'next/link';

interface NewlyUpdatedItem {
  id: string;
  episode: string;
  title: string;
  subtitle?: string;
  poster: string;
  isPremier?: boolean;
  premierDate?: string;
}

const newlyUpdatedData: NewlyUpdatedItem[] = [
  {
    id: 'than-an-vuong-toa',
    episode: 'Tập 191',
    title: 'Thần Ấn Vương Toạ',
    poster: '/api/placeholder/200/300',
  },
  {
    id: 'hoang-co-an-cuu-luc-pha',
    episode: 'Tập 33',
    title: 'Hoàng Cổ Án Cứu Lục Phá',
    poster: '/api/placeholder/200/300',
  },
  {
    id: 'huyen-gioi-chi-mon',
    episode: 'Tập 7',
    title: 'Huyền Giới Chi Môn 26日',
    poster: '/api/placeholder/200/300',
  },
  {
    id: 'do-thi-co-tien-y',
    episode: 'Tập 134',
    title: 'Đô Thị Có Tiên Y',
    poster: '/api/placeholder/200/300',
  },
  {
    id: 'lang-thien-doc-ton',
    episode: 'Tập 54',
    title: 'Lăng Thiên Độc Tôn',
    poster: '/api/placeholder/200/300',
  },
  {
    id: 'song-sinh-vo-hon',
    episode: 'Tập 53',
    title: 'Song Sinh Võ Hồn',
    poster: '/api/placeholder/200/300',
  },
  {
    id: 'gia-thien',
    episode: 'Tập 141',
    title: 'Giá Thiên',
    poster: '/api/placeholder/200/300',
  },
  {
    id: 'thien-tuong',
    episode: 'Tập 12',
    title: 'Thiên Tường',
    poster: '/api/placeholder/200/300',
  },
  {
    id: 'thon-phe-tinh-khong',
    episode: 'Tập 203',
    title: 'Thôn Phệ Tinh Không',
    poster: '/api/placeholder/200/300',
  },
  {
    id: 'tien-hoa-sieu-pham',
    episode: 'Tập 1-3',
    title: 'Tiên Hoa Siêu Phẩm',
    poster: '/api/placeholder/200/300',
  },
  {
    id: 'vo-hon-dai-luc',
    episode: 'Tập 32',
    title: 'Võ Hồn Đại Lục',
    poster: '/api/placeholder/200/300',
  },
  {
    id: 'van-gioi-doc-ton',
    episode: 'Tập 393',
    title: 'Vạn Giới Độc Tôn Phần',
    poster: '/api/placeholder/200/300',
  },
  {
    id: 'tuyet-the-than-hoang',
    episode: 'Tập 34',
    title: 'Tuyệt Thế Thần Hoàng',
    poster: '/api/placeholder/200/300',
  },
  {
    id: 'tuyet-the-chien-hon',
    episode: 'Tập 155',
    title: 'Tuyệt Thế Chiến Hồn',
    poster: '/api/placeholder/200/300',
  },
  {
    id: 'luyen-khi-muoi-van-nam',
    episode: 'Tập 305',
    title: 'Luyện Khí Mười Vạn Năm',
    poster: '/api/placeholder/200/300',
  },
  {
    id: 'than-vo-ky',
    episode: 'Tập 108',
    title: 'Thần Võ Kỷ',
    poster: '/api/placeholder/200/300',
  },
  {
    id: 'van-co-than-de',
    episode: 'Tập 610',
    title: 'Vạn Cổ Thần Đế',
    poster: '/api/placeholder/200/300',
  },
  {
    id: 'cuu-thien-huyen-de',
    episode: 'Tập 6',
    title: 'Cửu Thiên Huyền Đế',
    poster: '/api/placeholder/200/300',
  },
  {
    id: 'thien-dao-doc-ton',
    episode: 'Khôi Chiều 28/12',
    title: 'Thiên Đạo Độc Tôn',
    isPremier: true,
    premierDate: '28/12',
    poster: '/api/placeholder/200/300',
  },
  {
    id: 'vo-than-truyen-ky',
    episode: 'Tập 11',
    title: 'Võ Thần Truyền Kỳ',
    poster: '/api/placeholder/200/300',
  },
];

export default function NewlyUpdatedSection() {
  return (
    <section>
      <h2 className="text-accent-500 font-bold text-xl md:text-2xl mb-4 md:mb-6">
        MỚI CẬP NHẬT
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-5">
        {newlyUpdatedData.map((item) => (
          <Link
            key={item.id}
            href={`/movies/${item.id}`}
            className="group cursor-pointer transform transition-transform hover:scale-105"
          >
            {/* Episode Badge */}
            <div className="relative mb-2">
              <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden bg-movie-card border border-movie-border group-hover:border-primary-500 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                <div className="w-full h-full bg-gradient-to-br from-primary-600/20 to-secondary-600/20 flex items-center justify-center">
                  <span className="text-neutral-500 text-xs">Poster</span>
                </div>
                {/* Episode Number Overlay */}
                <div className="absolute top-2 left-2 z-20 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-md">
                  <span className="text-white text-xs font-medium">
                    {item.episode}
                  </span>
                </div>
                {/* Premier Badge */}
                {item.isPremier && (
                  <div className="absolute top-2 right-2 z-20 bg-accent-500 px-2 py-1 rounded-md">
                    <span className="text-white text-xs font-medium">
                      {item.premierDate}
                    </span>
                  </div>
                )}
              </div>
            </div>
            {/* Title */}
            <div>
              <h3 className="text-white font-medium text-sm md:text-base line-clamp-2 group-hover:text-primary-400 transition-colors">
                {item.title}
              </h3>
              {item.subtitle && (
                <p className="text-neutral-400 text-xs line-clamp-1 mt-1">
                  {item.subtitle}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

