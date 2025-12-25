'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import DropdownArrow from './DropdownArrow';
import LoginModal from './LoginModal';

interface NavLink {
  href: string;
  label: string;
  icon?: React.ReactNode | null;
  hasDropdown?: boolean;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const genreDropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const genres = [
    { href: '/genre/huyen-huyen', label: 'Huyền Huyễn' },
    { href: '/genre/xuyen-khong', label: 'Xuyên Không' },
    { href: '/genre/trung-sinh', label: 'Trùng Sinh' },
    { href: '/genre/tien-hiep', label: 'Tiên Hiệp' },
    { href: '/genre/co-trang', label: 'Cổ Trang' },
    { href: '/genre/hai-huoc', label: 'Hài Hước' },
    { href: '/genre/kiem-hiep', label: 'Kiếm Hiệp' },
    { href: '/genre/hien-dai', label: 'Hiện Đại' },
  ];

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  const navLinks: NavLink[] = [
    // {
    //   href: '/',
    //   label: 'Trang chủ',
    //   icon: (
    //     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    //     </svg>
    //   ),
    // },
    {
      href: '/genres',
      label: 'Thể Loại',
      icon: null,
      hasDropdown: true,
    },
    {
      href: '/movies',
      label: 'Phim Lẻ',
      icon: null,
    },
    {
      href: '/now-playing',
      label: 'Đang Chiếu',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
    // {
    //   href: '/schedule',
    //   label: 'Lịch Chiếu',
    //   icon: (
    //     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    //     </svg>
    //   ),
    // },
    {
      href: '/completed',
      label: 'Hoàn Thành',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      href: '/top-10',
      label: 'Top 10 HH3D',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      href: '/highly-rated',
      label: 'Đánh Giá Cao',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      ),
    },
  ];


  return (
    <header className="sticky top-0 z-50 w-full bg-movie-dark border-b border-movie-border backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group flex-shrink-0">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-movie rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-lg md:text-xl">F</span>
            </div>
            <span className="text-white font-bold text-xl md:text-2xl whitespace-nowrap">
              FEMovies
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2 xl:space-x-3 flex-1 justify-center max-w-4xl">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.href}
                    ref={genreDropdownRef}
                    className="relative"
                    onMouseEnter={() => {
                      // Clear any pending timeout
                      if (dropdownTimeoutRef.current) {
                        clearTimeout(dropdownTimeoutRef.current);
                      }
                      setIsGenreDropdownOpen(true);
                    }}
                    onMouseLeave={() => {
                      // Add delay before closing
                      dropdownTimeoutRef.current = setTimeout(() => {
                        setIsGenreDropdownOpen(false);
                      }, 200); // 200ms delay
                    }}
                  >
                    <button
                      className="flex items-center gap-1.5 px-2.5 py-1.5 xl:px-3 xl:py-2 text-neutral-300 hover:text-white hover:bg-primary-600/20 rounded-lg transition-colors duration-200 text-sm whitespace-nowrap"
                    >
                      {link.icon && <span className="flex-shrink-0">{link.icon}</span>}
                      <span>{link.label}</span>
                      <DropdownArrow
                        size={20}
                        color={isGenreDropdownOpen ? '#ffffff' : '#9ca3af'}
                        className="ml-0.5 flex-shrink-0 transition-colors"
                      />
                    </button>
                    {/* Dropdown Menu */}
                    {isGenreDropdownOpen && (
                      <div
                        className="absolute top-full left-0 mt-3 w-52 bg-slate-800/95 backdrop-blur-md rounded-xl shadow-2xl border border-slate-700/50 z-50 animate-fade-in overflow-hidden"
                        onMouseEnter={() => {
                          // Cancel timeout when mouse enters dropdown
                          if (dropdownTimeoutRef.current) {
                            clearTimeout(dropdownTimeoutRef.current);
                          }
                          setIsGenreDropdownOpen(true);
                        }}
                        onMouseLeave={() => {
                          // Add delay before closing
                          dropdownTimeoutRef.current = setTimeout(() => {
                            setIsGenreDropdownOpen(false);
                          }, 200);
                        }}
                      >
                        {/* Arrow pointing up */}
                        <div className="absolute -top-1.5 left-6 w-3 h-3 bg-slate-800 border-l border-t border-slate-700/50 transform rotate-45"></div>
                        {/* Menu Items */}
                        <div className="py-1.5">
                          {genres.map((genre) => (
                            <Link
                              key={genre.href}
                              href={genre.href}
                              className="block px-4 py-2.5 text-white hover:bg-slate-700/60 active:bg-slate-700/80 transition-colors text-sm rounded-lg mx-1.5"
                            >
                              {genre.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 xl:px-3 xl:py-2 text-neutral-300 hover:text-white hover:bg-primary-600/20 rounded-lg transition-colors duration-200 text-sm whitespace-nowrap"
                >
                  {link.icon && <span className="flex-shrink-0">{link.icon}</span>}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Tablet Navigation - ít items hơn */}
          <nav className="hidden md:flex lg:hidden items-center space-x-2">
            {navLinks.slice(0, 5).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1 px-2 py-1.5 text-neutral-300 hover:text-white hover:bg-primary-600/20 rounded-lg transition-colors duration-200 text-sm whitespace-nowrap"
              >
                {link.icon && <span className="flex-shrink-0">{link.icon}</span>}
                <span className="hidden sm:inline">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
            {/* Search Button - Mobile */}
            <button
              className="md:hidden p-2 text-neutral-300 hover:text-white hover:bg-primary-600/20 rounded-lg transition-colors"
              aria-label="Search"
            >
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Search Input - Desktop */}
            <div className="hidden lg:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search movies..."
                  className="w-40 xl:w-52 px-3 py-1.5 pl-9 bg-movie-card border border-movie-border rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* User Menu / Login Button */}
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="p-2 text-neutral-300 hover:text-white hover:bg-primary-600/20 rounded-lg transition-colors"
              aria-label="Login"
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-neutral-300 hover:text-white hover:bg-primary-600/20 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-movie-border py-4 animate-slide-down">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 px-4 py-2 text-neutral-300 hover:text-white hover:bg-primary-600/20 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon && <span className="flex-shrink-0">{link.icon}</span>}
                  <span>{link.label}</span>
                  {link.hasDropdown && (
                    <DropdownArrow
                      size={12}
                      color="#9ca3af"
                      className="ml-auto"
                    />
                  )}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </header>
  );
}

