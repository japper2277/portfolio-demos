// Homepage - Two-column layout with sidebar navigation
// Based on design.html

'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { artworks } from '@/lib/mockData';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { GallerySchema, ArtworkSchema } from '@/components/StructuredData';

function HomePageContent() {
  const [currentArtworkId, setCurrentArtworkId] = useState(artworks[0].id);
  const [fadeOut, setFadeOut] = useState(false);

  const currentArtwork = artworks.find(a => a.id === currentArtworkId) || artworks[0];

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

  return (
    <>
      {GallerySchema(artworks.length)}
      {currentArtwork && ArtworkSchema(currentArtwork)}

      <Header />

      <div className="page-container">
        <Sidebar
          artworks={artworks}
          currentArtworkId={currentArtworkId}
          onSelectArtwork={handleArtworkChange}
        />

        <main className="main-content">
          <div className="artwork-wrapper">
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
          </div>

          {/* Contact Section */}
          <section id="contact" className="contact-section-light" aria-labelledby="contact-heading">
            <div className="contact-content">
              <h2 id="contact-heading" className="contact-heading">Get In Touch</h2>

              <p className="contact-intro">
                For commissions, press inquiries, or to be added to the private mailing list for upcoming shows and available work, please reach out directly.
              </p>

              <a href="mailto:contact@anjelinavillalobos.com" className="email-link-light">
                contact@anjelinavillalobos.com
              </a>

              <div className="social-links-light">
                <a href="https://instagram.com/anjelinavillalobos" target="_blank" rel="noopener noreferrer" className="social-icon-light">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="18" cy="6" r="1" fill="currentColor"/>
                  </svg>
                  <span className="social-label-light">Instagram</span>
                </a>
                <a href="#" className="social-icon-light">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 21L12 3L21 21H3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                    <line x1="7" y1="16" x2="17" y2="16" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  <span className="social-label-light">Artsy</span>
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
