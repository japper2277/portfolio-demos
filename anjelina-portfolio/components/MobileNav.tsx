// Mobile Navigation Drawer - Year-grouped artwork list
// Provides full navigation access on mobile devices

'use client';

import { useState, useEffect, useMemo } from 'react';
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
  // Group artworks by year
  const artworksByYear = useMemo(() => {
    const grouped = artworks.reduce((acc, artwork) => {
      if (!acc[artwork.year]) {
        acc[artwork.year] = [];
      }
      acc[artwork.year].push(artwork);
      return acc;
    }, {} as Record<number, Artwork[]>);

    // Sort years in descending order
    const sortedYears = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

    return sortedYears.reduce((acc, year) => {
      acc[Number(year)] = grouped[Number(year)];
      return acc;
    }, {} as Record<number, Artwork[]>);
  }, [artworks]);

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

        <nav className="mobile-nav-content">
          {Object.entries(artworksByYear).map(([year, yearArtworks]) => (
            <div key={year} className="mobile-nav-year-group">
              <h3 className="mobile-nav-year">{year}</h3>
              <ul className="mobile-nav-list">
                {yearArtworks.map((artwork) => (
                  <li key={artwork.id}>
                    <button
                      className={`mobile-nav-item ${artwork.id === currentArtworkId ? 'active' : ''}`}
                      onClick={() => handleArtworkClick(artwork.id)}
                    >
                      <span className="mobile-nav-item-title">{artwork.title}</span>
                      <span className="mobile-nav-item-medium">{artwork.medium}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
