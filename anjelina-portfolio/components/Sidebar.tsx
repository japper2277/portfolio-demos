// Sidebar component - Thumbnail grid navigation with artwork details
// Redesigned for better visual navigation

'use client';

import { useMemo } from 'react';
import Image from 'next/image';
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

  // Get current artwork details
  const currentArtwork = artworks.find(a => a.id === currentArtworkId);

  // Generate inquiry email link
  const getInquiryEmailLink = (artwork: Artwork) => {
    const subject = encodeURIComponent(`Inquiry about "${artwork.title}"`);
    const body = encodeURIComponent(
      `Hi,

I'm interested in learning more about "${artwork.title}" (${artwork.year}).

Details:
• Medium: ${artwork.medium}
• Dimensions: ${artwork.dimensions}

Please let me know about pricing and availability.

Thank you!`
    );
    return `mailto:contact@anjelinavillalobos.com?subject=${subject}&body=${body}`;
  };

  // Format price/availability for sidebar
  const getPriceStatus = (artwork: Artwork) => {
    if (artwork.availability === 'available') {
      if (artwork.inquireForPrice) {
        return 'Available - Inquire for Price';
      } else if (artwork.price) {
        const symbol = artwork.currency === 'USD' ? '$' : '€';
        return `Available - ${symbol}${artwork.price.toLocaleString()}`;
      }
      return 'Available';
    } else if (artwork.availability === 'sold') {
      return 'Sold';
    } else if (artwork.availability === 'on-loan') {
      return 'On Loan';
    } else if (artwork.availability === 'private-collection') {
      return 'Private Collection';
    }
    return '';
  };

  const getStatusClass = (artwork: Artwork) => {
    if (artwork.availability === 'available') {
      return 'status-available';
    }
    return 'status-sold';
  };

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
      {/* Year-grouped navigation */}
      <div className="sidebar-nav-scrollable">
        {Object.entries(artworksByYear).map(([year, yearArtworks]) => (
          <div key={year} className="year-group">
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
                  >
                    {artwork.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
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
