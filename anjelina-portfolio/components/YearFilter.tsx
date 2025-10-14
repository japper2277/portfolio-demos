// YearFilter component - Dedicated filter bar for year selection
// Extracted from inline filmstrip year labels for better UX

'use client';

import type { Artwork } from '@/lib/mockData';

interface YearFilterProps {
  artworks: Artwork[];
  selectedYear: number | 'all';
  onYearChange: (year: number | 'all') => void;
}

export default function YearFilter({
  artworks,
  selectedYear,
  onYearChange,
}: YearFilterProps) {
  // Get unique years from artworks and sort descending
  const years = Array.from(new Set(artworks.map(artwork => artwork.year))).sort(
    (a, b) => b - a
  );

  // Count artworks per year
  const artworkCountByYear = artworks.reduce((acc, artwork) => {
    acc[artwork.year] = (acc[artwork.year] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  return (
    <div className="year-filter-bar" role="group" aria-label="Filter artworks by year">
      <button
        className={`filter-btn ${selectedYear === 'all' ? 'active' : ''}`}
        onClick={() => onYearChange('all')}
        aria-pressed={selectedYear === 'all'}
        aria-label={`Show all ${artworks.length} artworks`}
      >
        All
      </button>
      {years.map(year => {
        const count = artworkCountByYear[year] || 0;
        return (
          <button
            key={year}
            className={`filter-btn ${selectedYear === year ? 'active' : ''}`}
            onClick={() => onYearChange(year)}
            aria-pressed={selectedYear === year}
            aria-label={`Filter by year ${year} (${count} ${count === 1 ? 'artwork' : 'artworks'})`}
          >
            {year}
          </button>
        );
      })}
    </div>
  );
}
