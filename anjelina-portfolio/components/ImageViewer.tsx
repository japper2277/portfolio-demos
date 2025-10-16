// ImageViewer component - Main artwork display with navigation
// Based on portfolio_first_anjie.html lines 190-200, 222-268

'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';
import type { Artwork } from '@/lib/mockData';
import { artworks as allArtworks } from '@/lib/mockData';
import Filmstrip from './Filmstrip';
import YearFilter from './YearFilter';

interface ImageViewerProps {
  artworks: Artwork[];
  selectedYear: number | 'all';
  onYearChange: (year: number | 'all') => void;
  currentArtworkIndex?: number;
  onArtworkChange?: (index: number) => void;
}

export default function ImageViewer({
  artworks,
  selectedYear,
  onYearChange,
  currentArtworkIndex = 0,
  onArtworkChange
}: ImageViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(currentArtworkIndex);
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // Filter artworks by selected year
  const filteredArtworks = useMemo(() => {
    if (selectedYear === 'all') {
      return artworks;
    }
    return artworks.filter(artwork => artwork.year === selectedYear);
  }, [artworks, selectedYear]);

  const currentArtwork = filteredArtworks[currentIndex];

  // Sync with external currentArtworkIndex
  useEffect(() => {
    if (currentArtworkIndex !== currentIndex) {
      setCurrentIndex(currentArtworkIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentArtworkIndex]);

  // Reset to first artwork when year filter changes with fade
  useEffect(() => {
    setFadeOut(true);
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentIndex(0);
      setImageLoaded(false);
      setImageError(false);
      setFadeOut(false);

      setTimeout(() => setIsTransitioning(false), 500);
    }, 300);
  }, [selectedYear]);


  // Navigation handler with smooth fade transitions
  const navigate = useCallback((direction: number) => {
    if (isTransitioning) return; // Prevent rapid clicks

    // Start fade out
    setFadeOut(true);
    setIsTransitioning(true);

    let newIndex = currentIndex + direction;

    // Wrap around
    if (newIndex < 0) {
      newIndex = filteredArtworks.length - 1;
    } else if (newIndex >= filteredArtworks.length) {
      newIndex = 0;
    }

    // Wait for fade out, then change image
    setTimeout(() => {
      setImageLoaded(false);
      setImageError(false);
      setCurrentIndex(newIndex);
      onArtworkChange?.(newIndex);
      setFadeOut(false);

      // Reset transitioning after fade in completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }, 300); // Faster fade out, smoother overall
  }, [isTransitioning, currentIndex, filteredArtworks.length, onArtworkChange]);

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
      } else if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault(); // Prevent page scroll on spacebar
        navigate(1);
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, isFullscreen]);

  // Swipe handlers for mobile
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => !isFullscreen && navigate(1),
    onSwipedRight: () => !isFullscreen && navigate(-1),
    preventScrollOnSwipe: true,
    trackMouse: false, // Disable for desktop, only touch
  });

  return (
    <>
      {/* Main Viewer */}
      <div
        {...swipeHandlers}
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
              opacity: imageLoaded && !fadeOut ? 1 : 0,
              transition: fadeOut
                ? 'opacity 0.3s cubic-bezier(0.4, 0, 0.6, 1)'
                : 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        )}
      </div>

      {/* Artwork Info */}
      <div
        className="artwork-info"
        role="status"
        aria-live="polite"
        style={{
          opacity: fadeOut ? 0 : 1,
          transition: fadeOut
            ? 'opacity 0.3s cubic-bezier(0.4, 0, 0.6, 1)'
            : 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="artwork-year" aria-label="Year created">{currentArtwork.year}</div>
        <h1 id="artwork-title">{currentArtwork.title}</h1>
        <p aria-label="Medium and dimensions">
          {currentArtwork.medium}, {currentArtwork.dimensions}
        </p>

        {/* Price and Availability */}
        <div className="artwork-pricing">
          {currentArtwork.availability === 'available' && (
            <span className="availability-badge available">
              {currentArtwork.inquireForPrice
                ? 'Available - Inquire for Price'
                : currentArtwork.price
                  ? `Available - ${currentArtwork.currency === 'USD' ? '$' : '€'}${currentArtwork.price.toLocaleString()}`
                  : 'Available'}
            </span>
          )}
          {currentArtwork.availability === 'sold' && (
            <span className="availability-badge sold">Sold</span>
          )}
          {currentArtwork.availability === 'on-loan' && (
            <span className="availability-badge on-loan">On Loan</span>
          )}
          {currentArtwork.availability === 'private-collection' && (
            <span className="availability-badge private">Private Collection</span>
          )}
        </div>
      </div>

      {/* Year Filter */}
      <YearFilter
        artworks={allArtworks}
        selectedYear={selectedYear}
        onYearChange={onYearChange}
      />

      {/* Filmstrip */}
      <Filmstrip
        artworks={filteredArtworks}
        currentIndex={currentIndex}
        onSelectArtwork={(index) => {
          if (index === currentIndex || isTransitioning) return;

          // Fade out current artwork
          setFadeOut(true);
          setIsTransitioning(true);

          setTimeout(() => {
            setImageLoaded(false);
            setImageError(false);
            setCurrentIndex(index);
            onArtworkChange?.(index);
            setFadeOut(false);

            setTimeout(() => {
              setIsTransitioning(false);
            }, 500);
          }, 300);
        }}
        selectedYear={selectedYear}
      />

      {/* Fullscreen Lightbox */}
      {isFullscreen && (
        <div
          className="lightbox-overlay"
          onClick={() => setIsFullscreen(false)}
          style={{
            animation: 'fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <button
            className="lightbox-close"
            onClick={() => setIsFullscreen(false)}
            aria-label="Close fullscreen"
            style={{
              animation: 'fadeInScale 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            ×
          </button>

          {/* Lightbox Navigation Buttons */}
          <button
            className="lightbox-nav prev"
            onClick={(e) => {
              e.stopPropagation();
              navigate(-1);
            }}
            aria-label="Previous artwork in fullscreen"
            style={{
              animation: 'fadeInLeft 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            ‹
          </button>
          <button
            className="lightbox-nav next"
            onClick={(e) => {
              e.stopPropagation();
              navigate(1);
            }}
            aria-label="Next artwork in fullscreen"
            style={{
              animation: 'fadeInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            ›
          </button>

          {/* Artwork Counter */}
          <div
            className="lightbox-counter"
            style={{
              animation: 'fadeInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {currentIndex + 1} / {filteredArtworks.length}
          </div>

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
              opacity: fadeOut ? 0 : 1,
              transition: fadeOut
                ? 'opacity 0.3s cubic-bezier(0.4, 0, 0.6, 1)'
                : 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
