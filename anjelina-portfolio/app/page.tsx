// Homepage - Two-column layout with sidebar navigation
// Based on design.html

'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';
import { artworks } from '@/lib/mockData';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import MobileNav from '@/components/MobileNav';
import { GallerySchema, ArtworkSchema } from '@/components/StructuredData';

function HomePageContent() {
  const [currentArtworkId, setCurrentArtworkId] = useState(artworks[0].id);
  const [fadeOut, setFadeOut] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(true);

  const currentArtwork = artworks.find(a => a.id === currentArtworkId) || artworks[0];
  const currentIndex = artworks.findIndex(a => a.id === currentArtworkId);

  // Handle artwork change with fade transition
  const handleArtworkChange = (newId: number) => {
    if (newId === currentArtworkId) return;

    setFadeOut(true);
    setTimeout(() => {
      setCurrentArtworkId(newId);
      setFadeOut(false);
    }, 200);
  };

  // Handle clicking the painting - go to next artwork
  const handleImageClick = () => {
    const currentIndex = artworks.findIndex(a => a.id === currentArtworkId);
    const nextIndex = (currentIndex + 1) % artworks.length;
    handleArtworkChange(artworks[nextIndex].id);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = artworks.findIndex(a => a.id === currentArtworkId);

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % artworks.length;
        handleArtworkChange(artworks[nextIndex].id);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = currentIndex === 0 ? artworks.length - 1 : currentIndex - 1;
        handleArtworkChange(artworks[prevIndex].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentArtworkId]);

  // Swipe handlers for mobile
  const handleSwipe = (direction: 'left' | 'right') => {
    const currentIndex = artworks.findIndex(a => a.id === currentArtworkId);

    if (direction === 'left') {
      // Swipe left = next artwork
      const nextIndex = (currentIndex + 1) % artworks.length;
      handleArtworkChange(artworks[nextIndex].id);
    } else {
      // Swipe right = previous artwork
      const prevIndex = currentIndex === 0 ? artworks.length - 1 : currentIndex - 1;
      handleArtworkChange(artworks[prevIndex].id);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    trackMouse: false,
    trackTouch: true,
    preventScrollOnSwipe: true,
  });

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
        onSelectArtwork={handleArtworkChange}
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />

      <div className="page-container">
        <Sidebar
          artworks={artworks}
          currentArtworkId={currentArtworkId}
          onSelectArtwork={handleArtworkChange}
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
              <Image
                key={currentArtwork.id}
                src={currentArtwork.image}
                alt={currentArtwork.title}
                width={1920}
                height={1280}
                priority
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  opacity: fadeOut ? 0 : 1,
                  transition: 'opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
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
                <a href="https://instagram.com/anjelinavillalobos" target="_blank" rel="noopener noreferrer" className="social-icon-light">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="18" cy="6" r="1" fill="currentColor"/>
                  </svg>
                  <span className="social-label-light">Instagram</span>
                </a>
                <a href="mailto:contact@anjelinavillalobos.com" className="social-icon-light">
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

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent />
    </Suspense>
  );
}
