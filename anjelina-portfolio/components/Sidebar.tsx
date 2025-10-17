// Sidebar component - Thumbnail grid navigation with artwork details
// Redesigned for better visual navigation

'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import type { Artwork } from '@/lib/mockData';

interface SidebarProps {
  artworks: Artwork[];
  currentArtworkId: number;
  onSelectArtwork: (id: number) => void;
}

export default function Sidebar({
  artworks,
  currentArtworkId,
  onSelectArtwork,
}: SidebarProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const yearRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [activeYearFilter, setActiveYearFilter] = useState<number | 'all'>('all');
  const isManualScrollRef = useRef(false);

  // Group artworks by year
  const artworksByYear = useMemo(() => {
    const grouped = artworks.reduce((acc, artwork) => {
      if (!acc[artwork.year]) {
        acc[artwork.year] = [];
      }
      acc[artwork.year].push(artwork);
      return acc;
    }, {} as Record<number, Artwork[]>);

    // Sort years in descending order (2024 at top → 2023 → 2022 at bottom)
    const sortedYears = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

    return sortedYears.reduce((acc, year) => {
      acc[Number(year)] = grouped[Number(year)];
      return acc;
    }, {} as Record<number, Artwork[]>);
  }, [artworks]);

  // Get list of years for filter buttons (sorted descending: 2025 → 2024 → 2023)
  const years = useMemo(() => {
    return Object.keys(artworksByYear).map(Number).sort((a, b) => b - a);
  }, [artworksByYear]);

  // Scroll to year section and show first artwork of that year
  const scrollToYear = (year: number | 'all') => {
    isManualScrollRef.current = true;
    setActiveYearFilter(year);

    if (year === 'all') {
      // Scroll to top and show first artwork
      scrollContainerRef.current?.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      // Select first artwork in the list
      if (artworks.length > 0) {
        onSelectArtwork(artworks[0].id);
      }
    } else {
      // Scroll to specific year section
      const yearElement = yearRefs.current[year];
      if (yearElement && scrollContainerRef.current) {
        const containerTop = scrollContainerRef.current.offsetTop;
        const elementTop = yearElement.offsetTop;
        const scrollPosition = elementTop - containerTop - 10; // 10px offset for spacing

        scrollContainerRef.current.scrollTo({
          top: scrollPosition,
          behavior: 'smooth'
        });
      }

      // Select first artwork of the selected year
      const yearArtworks = artworksByYear[year];
      if (yearArtworks && yearArtworks.length > 0) {
        onSelectArtwork(yearArtworks[0].id);
      }
    }

    // Reset manual scroll flag after animation completes
    setTimeout(() => {
      isManualScrollRef.current = false;
    }, 1000);
  };

  // Smart filter sync - auto-update active year based on scroll position
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const observerOptions = {
      root: scrollContainer,
      rootMargin: '-20% 0px -70% 0px', // Trigger when year section is in upper 30% of viewport
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Only update if not manually scrolling
      if (isManualScrollRef.current) return;

      // Find the first visible year section
      const visibleEntry = entries.find(entry => entry.isIntersecting);

      if (visibleEntry) {
        const year = Number(visibleEntry.target.getAttribute('data-year'));
        if (year && !isNaN(year)) {
          setActiveYearFilter(year);
        }
      }

      // If scrolled to very top, set to 'all'
      if (scrollContainer.scrollTop < 50) {
        setActiveYearFilter('all');
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all year sections
    Object.values(yearRefs.current).forEach(yearElement => {
      if (yearElement) {
        observer.observe(yearElement);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [years]);

  // Auto-scroll to current artwork when it changes
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    // Find the active link element
    const activeLink = scrollContainer.querySelector('a.active');
    if (!activeLink) return;

    // Scroll the active link into view
    activeLink.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest'
    });
  }, [currentArtworkId]);

  // Get current artwork details
  const currentArtwork = artworks.find(a => a.id === currentArtworkId);

  // Navigation handlers
  const handlePrevious = () => {
    const currentIndex = artworks.findIndex(a => a.id === currentArtworkId);
    const prevIndex = currentIndex === 0 ? artworks.length - 1 : currentIndex - 1;
    onSelectArtwork(artworks[prevIndex].id);
  };

  const handleNext = () => {
    const currentIndex = artworks.findIndex(a => a.id === currentArtworkId);
    const nextIndex = (currentIndex + 1) % artworks.length;
    onSelectArtwork(artworks[nextIndex].id);
  };

  return (
    <aside className="sidebar">
      {/* Year Filter Buttons */}
      <div className="sidebar-year-filters">
        <button
          className={`year-filter-btn ${activeYearFilter === 'all' ? 'active' : ''}`}
          onClick={() => scrollToYear('all')}
        >
          ALL
        </button>
        {years.map((year) => (
          <button
            key={year}
            className={`year-filter-btn ${activeYearFilter === year ? 'active' : ''}`}
            onClick={() => scrollToYear(year)}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Year-grouped navigation */}
      <div className="sidebar-nav-scrollable" ref={scrollContainerRef}>
        {years.map((year) => {
          const yearArtworks = artworksByYear[year];
          if (!yearArtworks) return null;

          return (
            <div
              key={year}
              className="year-group"
              ref={(el) => { yearRefs.current[year] = el; }}
              data-year={year}
            >
              <h3>{year}</h3>
              <ul>
                {yearArtworks.map((artwork) => (
                  <li key={artwork.id}>
                    <a
                      href="#"
                      className={artwork.id === currentArtworkId ? 'active' : ''}
                      onClick={(e) => {
                        e.preventDefault();
                        onSelectArtwork(artwork.id);
                      }}
                      data-medium={artwork.medium}
                    >
                      <span className="artwork-title">{artwork.title}</span>
                      <span className="artwork-medium-preview">{artwork.medium}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Current artwork details */}
      {currentArtwork && (
        <div className="sidebar-details">
          <h4>{currentArtwork.title}</h4>
          <p>{currentArtwork.medium}, {currentArtwork.dimensions}</p>

          {/* Navigation buttons */}
          <div className="sidebar-nav-buttons">
            <button
              onClick={handlePrevious}
              className="sidebar-nav-btn prev"
              aria-label="Previous artwork"
              title="Previous artwork"
            >
              <span className="nav-arrow">←</span>
              <span className="nav-label">Previous</span>
            </button>
            <button
              onClick={handleNext}
              className="sidebar-nav-btn next"
              aria-label="Next artwork"
              title="Next artwork"
            >
              <span className="nav-label">Next</span>
              <span className="nav-arrow">→</span>
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
