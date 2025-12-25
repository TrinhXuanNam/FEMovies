'use client';

import { useState } from 'react';

type FilterType = 'new' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

const filters = [
  { id: 'new' as FilterType, label: 'Mới Cập Nhật' },
  { id: 'mon' as FilterType, label: 'Mon', subLabel: 'Thứ Hai' },
  { id: 'tue' as FilterType, label: 'Tue', subLabel: 'Thứ Ba' },
  { id: 'wed' as FilterType, label: 'Wed', subLabel: 'Thứ Tư' },
  { id: 'thu' as FilterType, label: 'Thu', subLabel: 'Thứ Năm' },
  { id: 'fri' as FilterType, label: 'Fri', subLabel: 'Thứ Sáu' },
  { id: 'sat' as FilterType, label: 'Sat', subLabel: 'Thứ Bảy' },
  { id: 'sun' as FilterType, label: 'Sun', subLabel: 'Chủ Nhật' },
];

export default function FilterBar() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('new');

  return (
    <div className="flex gap-2 md:gap-3 overflow-x-auto pb-4 scrollbar-hide mb-6 md:mb-8">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id;
        return (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`
              flex-shrink-0 px-4 py-2 md:px-6 md:py-2.5 rounded-lg font-medium text-sm md:text-base transition-all
              ${
                isActive
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
                  : 'bg-movie-card text-neutral-400 hover:text-white hover:bg-movie-light border border-movie-border'
              }
            `}
          >
            <div className="flex flex-col items-center">
              <span>{filter.label}</span>
              {filter.subLabel && (
                <span className="text-xs mt-0.5">{filter.subLabel}</span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

