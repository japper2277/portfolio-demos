'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';
import type { Artwork } from '@/lib/mockData';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import MobileNav from '@/components/MobileNav';
import { GallerySchema, ArtworkSchema } from '@/components/StructuredData';

interface HomePageClientProps {
  artworks: Artwork[];
}

export default function HomePageClient({ artworks }: HomePageClientProps) {
  const [currentArtworkId, setCurrentArtworkId] = useState(artworks[0]?.id || 1);
  const [fadeOut, setFadeOut] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(true);

  // Dual-layer background crossfade state
  const [activeLayer, setActiveLayer] = useState<1 | 2>(1);
  const [layer1Image, setLayer1Image] = useState(artworks[0]?.image || '');
  const [layer2Image, setLayer2Image] = useState(artworks[0]?.image || '');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-advance settings - disabled on mobile devices
  const [autoAdvance, setAutoAdvance] = useState(() => {
    // Disable auto-advance on mobile devices
    if (typeof window !== 'undefined') {
      return window.innerWidth > 768;
    }
    return true;
  });
  const [isPaused, setIsPaused] = useState(false);
  const autoAdvanceDelay = 4000; // 4 seconds between transitions
  const manualPauseDelay = 10000; // 10 seconds pause after manual interaction

  // Refs for timers and queue
  const autoAdvanceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigationQueueRef = useRef<number[]>([]);
  const isProcessingQueueRef = useRef(false);

  const currentArtwork = artworks.find(a => a.id === currentArtworkId) || artworks[0];
  const currentIndex = artworks.findIndex(a => a.id === currentArtworkId);

  // Get next and previous artworks for preloading
  const nextIndex = (currentIndex + 1) % artworks.length;
  const prevIndex = currentIndex === 0 ? artworks.length - 1 : currentIndex - 1;
  const nextArtwork = artworks[nextIndex];
  const prevArtwork = artworks[prevIndex];

  // Process navigation queue
  const processQueue = useCallback(() => {
    if (isProcessingQueueRef.current || navigationQueueRef.current.length === 0) {
      return;
    }

    const nextId = navigationQueueRef.current.shift();
    if (!nextId || nextId === currentArtworkId) {
      processQueue(); // Try next in queue
      return;
    }

    const newArtwork = artworks.find(a => a.id === nextId);
    if (!newArtwork) {
      processQueue(); // Try next in queue
      return;
    }

    isProcessingQueueRef.current = true;
    setIsTransitioning(true);

    // Update current artwork ID immediately for metadata display
    setCurrentArtworkId(nextId);

    // Set the new image to the inactive layer
    if (activeLayer === 1) {
      setLayer2Image(newArtwork.image);
      requestAnimationFrame(() => {
        setTimeout(() => {
          setActiveLayer(2);
          // Allow next transition after 300ms (shorter than full crossfade)
          transitionTimeoutRef.current = setTimeout(() => {
            setIsTransitioning(false);
            isProcessingQueueRef.current = false;
            processQueue(); // Process next in queue
          }, 300);
        }, 50);
      });
    } else {
      setLayer1Image(newArtwork.image);
      requestAnimationFrame(() => {
        setTimeout(() => {
          setActiveLayer(1);
          transitionTimeoutRef.current = setTimeout(() => {
            setIsTransitioning(false);
            isProcessingQueueRef.current = false;
            processQueue(); // Process next in queue
          }, 300);
        }, 50);
      });
    }
  }, [currentArtworkId, artworks, activeLayer]);

  // Handle artwork change with queue system
  const handleArtworkChange = useCallback((newId: number, isManual: boolean = false) => {
    if (newId === currentArtworkId) return;

    // Add to queue
    navigationQueueRef.current.push(newId);

    // If manual interaction, pause auto-advance temporarily
    if (isManual) {
      setIsPaused(true);
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }
      // Resume after delay
      setTimeout(() => setIsPaused(false), manualPauseDelay);
    }

    // Start processing if not already
    if (!isProcessingQueueRef.current) {
      processQueue();
    }
  }, [currentArtworkId, processQueue, manualPauseDelay]);

  // Handle clicking the painting - go to next artwork
  const handleImageClick = () => {
    const currentIndex = artworks.findIndex(a => a.id === currentArtworkId);
    const nextIndex = (currentIndex + 1) % artworks.length;
    handleArtworkChange(artworks[nextIndex].id, true);
  };

  // Auto-advance to next artwork
  useEffect(() => {
    if (!autoAdvance || isPaused || isTransitioning) {
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }
      return;
    }

    autoAdvanceTimerRef.current = setTimeout(() => {
      const currentIndex = artworks.findIndex(a => a.id === currentArtworkId);
      const nextIndex = (currentIndex + 1) % artworks.length;
      handleArtworkChange(artworks[nextIndex].id, false); // false = not manual
    }, autoAdvanceDelay);

    return () => {
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }
    };
  }, [currentArtworkId, artworks, autoAdvance, isPaused, autoAdvanceDelay, isTransitioning, handleArtworkChange]);

  // Update auto-advance on window resize
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile && autoAdvance) {
        setAutoAdvance(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [autoAdvance]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = artworks.findIndex(a => a.id === currentArtworkId);

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % artworks.length;
        handleArtworkChange(artworks[nextIndex].id, true);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = currentIndex === 0 ? artworks.length - 1 : currentIndex - 1;
        handleArtworkChange(artworks[prevIndex].id, true);
      } else if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        // Only allow toggling auto-advance on desktop
        if (window.innerWidth > 768) {
          setAutoAdvance(prev => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentArtworkId, artworks, handleArtworkChange]);

  // Swipe handlers for mobile
  const handleSwipe = (direction: 'left' | 'right') => {
    const currentIndex = artworks.findIndex(a => a.id === currentArtworkId);

    if (direction === 'left') {
      // Swipe left = next artwork
      const nextIndex = (currentIndex + 1) % artworks.length;
      handleArtworkChange(artworks[nextIndex].id, true);
    } else {
      // Swipe right = previous artwork
      const prevIndex = currentIndex === 0 ? artworks.length - 1 : currentIndex - 1;
      handleArtworkChange(artworks[prevIndex].id, true);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    trackMouse: false,
    trackTouch: true,
    preventScrollOnSwipe: true,
  });

  if (!currentArtwork) {
    return <div>No artworks found. Please add artworks in Sanity Studio.</div>;
  }

  return (
    <>
      {GallerySchema(artworks.length)}
      {currentArtwork && ArtworkSchema(currentArtwork)}

      <Header
        onMenuClick={() => setIsMobileNavOpen(true)}
        showMenuButton={true}
      />

      <MobileNav
        artworks={artworks}
        currentArtworkId={currentArtworkId}
        onSelectArtwork={(id) => handleArtworkChange(id, true)}
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />

      <div className="page-container">
        <Sidebar
          artworks={artworks}
          currentArtworkId={currentArtworkId}
          onSelectArtwork={(id) => handleArtworkChange(id, true)}
        />

        <main className="main-content">
          <div className="artwork-wrapper" {...swipeHandlers}>
            <div
              className="artwork-display"
              onClick={handleImageClick}
              style={{ cursor: 'pointer' }}
              role="button"
              tabIndex={0}
              aria-label="Click to view next artwork"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleImageClick();
                }
              }}
            >
              {/* Dual-layer background system for crossfade transitions */}
              <div className="background-image-container">
                <div
                  className={`bg-image ${activeLayer === 1 ? 'visible animated' : ''}`}
                  id="bgImage1"
                  role="img"
                  aria-label={activeLayer === 1 ? currentArtwork.title : ''}
                  style={{ backgroundImage: `url(${layer1Image})` }}
                />
                <div
                  className={`bg-image ${activeLayer === 2 ? 'visible animated' : ''}`}
                  id="bgImage2"
                  role="img"
                  aria-label={activeLayer === 2 ? currentArtwork.title : ''}
                  style={{ backgroundImage: `url(${layer2Image})` }}
                />
              </div>

              {/* Preload next and previous images for instant transitions */}
              <link rel="preload" as="image" href={nextArtwork.image} />
              <link rel="preload" as="image" href={prevArtwork.image} />
            </div>

            {/* Artwork Info Overlay - Mobile Only */}
            <div className={`artwork-info-overlay-mobile ${!isInfoVisible ? 'hidden' : ''}`}>
              <button
                className="toggle-info-btn-mobile"
                onClick={() => setIsInfoVisible(!isInfoVisible)}
                aria-label={isInfoVisible ? 'Hide artwork info' : 'Show artwork info'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points={isInfoVisible ? '18 15 12 9 6 15' : '6 9 12 15 18 9'}></polyline>
                </svg>
              </button>

              <h2 className="mobile-artwork-title">{currentArtwork.title}</h2>
              <p className="mobile-artwork-meta">{currentArtwork.medium}, {currentArtwork.dimensions}</p>
            </div>
          </div>

          {/* Social Links Section */}
          <section className="contact-section-light" aria-label="Social media links">
            <div className="contact-content">
              <div className="social-links-light">
                <a href="https://www.instagram.com/anjelhelix/" target="_blank" rel="noopener noreferrer" className="social-icon-light">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="18" cy="6" r="1" fill="currentColor"/>
                  </svg>
                  <span className="social-label-light">Instagram</span>
                </a>
                <a href="mailto:linahouston9@gmail.com" className="social-icon-light">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="social-label-light">Email</span>
                </a>
              </div>
            </div>
          </section>

        </main>
      </div>
    </>
  );
}
