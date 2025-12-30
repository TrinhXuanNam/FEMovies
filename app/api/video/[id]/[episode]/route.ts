import { NextRequest, NextResponse } from 'next/server';

// Mock video sources - sẽ thay bằng logic crawl thực tế sau
const getVideoSource = (movieId: string, episode: number): string => {
  // Ví dụ: trả về URL video
  // Trong thực tế, bạn sẽ crawl từ source website hoặc lấy từ database
  // return `https://hoathinh3d.gg/xem-phim-${movieId}/tap-${episode}-sv1.html`;
  
  // Tạm thời dùng sample video để test
  // Bạn có thể thay bằng URL thực tế từ crawl
  return `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`;
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; episode: string } }
) {
  try {
    const { id, episode } = params;
    const episodeNum = parseInt(episode, 10);

    if (isNaN(episodeNum) || episodeNum < 1) {
      return NextResponse.json(
        { error: 'Invalid episode number' },
        { status: 400 }
      );
    }

    // Lấy video source
    const videoUrl = getVideoSource(id, episodeNum);

    // Trả về video URL hoặc embed code
    // Có thể mở rộng để trả về multiple sources (360p, 720p, 1080p)
    return NextResponse.json({
      url: videoUrl,
      sources: [
        {
          quality: '1080p',
          url: videoUrl,
        },
        {
          quality: '720p',
          url: videoUrl, // Trong thực tế sẽ là URL khác
        },
        {
          quality: '360p',
          url: videoUrl, // Trong thực tế sẽ là URL khác
        },
      ],
      subtitles: [], // Có thể thêm subtitles sau
    });
  } catch (error) {
    console.error('Error fetching video source:', error);
    return NextResponse.json(
      { error: 'Failed to fetch video source' },
      { status: 500 }
    );
  }
}

