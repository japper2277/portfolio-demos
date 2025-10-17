// Mobile Navigation Drawer - Year-grouped artwork list
// Provides full navigation access on mobile devices
// Matches desktop sidebar format exactly

'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import type { Artwork } from '@/lib/mockData';

interface MobileNavProps {
  artworks: Artwork[];
  currentArtworkId: number;
  onSelectArtwork: (id: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({
  artworks,
  currentArtworkId,
  onSelectArtwork,
  isOpen,
  onClose,
}: MobileNavProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const yearRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [activeYearFilter, setActiveYearFilter] = useState<number | 'all'>('all');
  const isManualScrollRef = useRef(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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
    const activeLink = scrollContainer.querySelector('button.active');
    if (!activeLink) return;

    // Scroll the active link into view
    activeLink.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest'
    });
  }, [currentArtworkId]);

  // Scroll progress tracking
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop;
      const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    // Calculate initial progress
    handleScroll();

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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

  const handleArtworkClick = (artworkId: number) => {
    onSelectArtwork(artworkId);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="mobile-nav-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside className={`mobile-nav-drawer ${isOpen ? 'open' : ''}`}>
        <div className="mobile-nav-header">
          <h2 className="mobile-nav-title">Artworks</h2>
          <button
            onClick={onClose}
            className="mobile-nav-close"
            aria-label="Close navigation"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Year Filter Buttons */}
        <div className="mobile-nav-year-filters">
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

        {/* Scroll progress indicator */}
        <div className="mobile-nav-scroll-progress">
          <div
            className="mobile-nav-scroll-progress-bar"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Year-grouped navigation */}
        <nav className="mobile-nav-content" ref={scrollContainerRef}>
          {years.map((year) => {
            const yearArtworks = artworksByYear[year];
            if (!yearArtworks) return null;

            return (
              <div
                key={year}
                className="mobile-nav-year-group"
                ref={(el) => { yearRefs.current[year] = el; }}
                data-year={year}
              >
                <h3 className="mobile-nav-year">{year}</h3>
                <ul className="mobile-nav-list">
                  {yearArtworks.map((artwork) => (
                    <li key={artwork.id}>
                      <button
                        className={`mobile-nav-item ${artwork.id === currentArtworkId ? 'active' : ''}`}
                        onClick={() => handleArtworkClick(artwork.id)}
                        data-medium={artwork.medium}
                      >
                        <span className="mobile-nav-item-title">{artwork.title}</span>
                        <span className="mobile-nav-item-medium">{artwork.medium}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </nav>

        {/* Current artwork details */}
        {currentArtwork && (
          <div className="mobile-nav-details">
            <h4>{currentArtwork.title}</h4>
            <p>{currentArtwork.medium}, {currentArtwork.dimensions}</p>

            {/* Navigation buttons */}
            <div className="mobile-nav-buttons">
              <button
                onClick={handlePrevious}
                className="mobile-nav-btn prev"
                aria-label="Previous artwork"
                title="Previous artwork"
              >
                <span className="nav-arrow">←</span>
                <span className="nav-label">Previous</span>
              </button>
              <button
                onClick={handleNext}
                className="mobile-nav-btn next"
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
    </>
  );
}
