// ImageViewer component - Main artwork display with navigation
// Based on portfolio_first_anjie.html lines 190-200, 222-268

'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import type { Artwork } from '@/lib/mockData';
import Filmstrip from './Filmstrip';

interface ImageViewerProps {
  artworks: Artwork[];
  selectedYear: number | 'all';
  onYearChange: (year: number | 'all') => void;
}

export default function ImageViewer({ artworks, selectedYear, onYearChange }: ImageViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Filter artworks by selected year
  const filteredArtworks = useMemo(() => {
    if (selectedYear === 'all') {
      return artworks;
    }
    return artworks.filter(artwork => artwork.year === selectedYear);
  }, [artworks, selectedYear]);

  const currentArtwork = filteredArtworks[currentIndex];

  // Reset to first artwork when year filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setImageLoaded(false);
    setImageError(false);
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 500);
    return () => clearTimeout(timer);
  }, [selectedYear]);


  // Navigation handler
  const navigate = (direction: number) => {
    setIsTransitioning(true);
    setLoading(true);
    setImageLoaded(false);
    setImageError(false);

    let newIndex = currentIndex + direction;

    // Wrap around
    if (newIndex < 0) {
      newIndex = filteredArtworks.length - 1;
    } else if (newIndex >= filteredArtworks.length) {
      newIndex = 0;
    }

    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsTransitioning(false);
    }, 50);
  };

  // Preload adjacent images for smoother navigation
  useEffect(() => {
    const preloadImage = (index: number) => {
      if (index >= 0 && index < filteredArtworks.length) {
        const img = new window.Image();
        img.src = filteredArtworks[index].image;
      }
    };

    // Preload next and previous images
    preloadImage(currentIndex + 1 < filteredArtworks.length ? currentIndex + 1 : 0);
    preloadImage(currentIndex - 1 >= 0 ? currentIndex - 1 : filteredArtworks.length - 1);
  }, [currentIndex, filteredArtworks]);

  // Keyboard navigation (from HTML lines 307-313)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        navigate(-1);
      } else if (e.key === 'ArrowRight') {
        navigate(1);
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, isFullscreen]); // Re-bind when currentIndex changes

  return (
    <>
      {/* Main Viewer */}
      <div
        className="main-viewer"
        onClick={() => setIsFullscreen(true)}
        role="region"
        aria-label="Artwork viewer"
        aria-live="polite"
      >
        {(!imageLoaded || loading) && !imageError && (
          <div className="image-skeleton" />
        )}

        {imageError ? (
          <div className="image-error">
            <div className="error-icon">⚠️</div>
            <p className="error-message">Failed to load image</p>
            <button
              className="retry-button"
              onClick={() => {
                setImageError(false);
                setLoading(true);
                setImageLoaded(false);
              }}
            >
              Retry
            </button>
          </div>
        ) : (
          <Image
            key={currentArtwork.id}
            src={currentArtwork.image}
            alt={currentArtwork.title}
            width={1200}
            height={800}
            priority={currentIndex < 3}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iODAwIiBmaWxsPSIjZjVmNWY1Ii8+PC9zdmc+"
            onLoad={() => {
              setLoading(false);
              setImageLoaded(true);
              setImageError(false);
            }}
            onError={() => {
              setLoading(false);
              setImageError(true);
            }}
            style={{
              opacity: imageLoaded && !isTransitioning ? 1 : 0,
              transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        )}

        {/* Ghost UI Navigation Buttons */}
        <button
          className="viewer-nav prev"
          onClick={(e) => {
            e.stopPropagation();
            navigate(-1);
          }}
          aria-label={`Previous artwork (${currentIndex === 0 ? filteredArtworks.length : currentIndex} of ${filteredArtworks.length})`}
          tabIndex={0}
        >
          &lt;
        </button>

        <button
          className="viewer-nav next"
          onClick={(e) => {
            e.stopPropagation();
            navigate(1);
          }}
          aria-label={`Next artwork (${currentIndex + 2 > filteredArtworks.length ? 1 : currentIndex + 2} of ${filteredArtworks.length})`}
          tabIndex={0}
        >
          &gt;
        </button>
      </div>

      {/* Artwork Info */}
      <div className="artwork-info" role="status" aria-live="polite">
        <div className="artwork-year" aria-label="Year created">{currentArtwork.year}</div>
        <h1 id="artwork-title">{currentArtwork.title}</h1>
        <p aria-label="Medium and dimensions">
          {currentArtwork.medium}, {currentArtwork.dimensions}
        </p>
        <div className="artwork-counter" aria-label="Artwork position">
          {currentIndex + 1} of {filteredArtworks.length}
        </div>
      </div>

      {/* Filmstrip */}
      <Filmstrip
        artworks={filteredArtworks}
        currentIndex={currentIndex}
        onSelectArtwork={setCurrentIndex}
        selectedYear={selectedYear}
      />

      {/* Fullscreen Lightbox */}
      {isFullscreen && (
        <div
          className="lightbox-overlay"
          onClick={() => setIsFullscreen(false)}
        >
          <button
            className="lightbox-close"
            onClick={() => setIsFullscreen(false)}
            aria-label="Close fullscreen"
          >
            ×
          </button>
          <Image
            src={currentArtwork.image}
            alt={currentArtwork.title}
            width={1920}
            height={1280}
            priority
            style={{
              maxWidth: '95vw',
              maxHeight: '95vh',
              objectFit: 'contain',
              cursor: 'zoom-out',
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
