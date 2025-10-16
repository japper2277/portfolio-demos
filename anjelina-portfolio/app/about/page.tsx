'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import { ArtistSchema } from '@/components/StructuredData';

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Close modal on escape key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  return (
    <>
      <ArtistSchema />
      <Header />

      <div className="about-page-container">
        <main className="about-page-grid">

          {/* Visual Column: Image of the artist */}
          <aside className="about-image-column">
            <div className="about-image-wrapper">
              <Image
                src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&fm=webp"
                alt="A portrait of the artist, Anjelina Villalobos"
                width={600}
                height={800}
                className="about-artist-image"
                priority
              />
            </div>
          </aside>

          {/* Content Column: Bio, Details, and Connect */}
          <div className="about-content-column">

            {/* Name and Bio Section */}
            <div>
              <h1 className="about-page-title">Anjelina Villalobos</h1>
              <p className="about-page-text">
                Originally from Miami, I now work as a painter and teacher based in New York City. My art explores the space between introspection and dreamscapes, using acrylics to create self-portraits that delve into personal narratives.
              </p>
              <p className="about-page-text">
                Alongside these, I produce nonrepresentational works that use vivid color and soft imagery to capture fleeting moods and the textures of memory. My goal is to invite viewers into a contemplative space where emotion and color intertwine.
              </p>
            </div>

            {/* Connect / Call to Action Section */}
            <div className="about-connect-section">
              <h2 className="about-connect-heading">Connect</h2>
              <div className="about-connect-buttons">
                <a
                  onClick={openModal}
                  className="about-social-link"
                  style={{ cursor: 'pointer' }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openModal();
                    }
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  <span>View Résumé</span>
                </a>
                <a href="https://instagram.com/anjelinavillalobos" target="_blank" rel="noopener noreferrer" className="about-social-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span>Instagram</span>
                </a>
                <a href="mailto:contact@anjelinavillalobos.com" className="about-social-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <path d="M22 6l-10 7L2 6"></path>
                  </svg>
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Résumé Modal */}
      {isModalOpen && (
        <div
          className="resume-modal-overlay"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-title"
        >
          <div
            className="resume-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="resume-modal-close"
              aria-label="Close modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <h2 id="resume-title" className="resume-modal-title">Anjelina Villalobos</h2>
            <p className="resume-modal-subtitle">Painter & Teacher</p>

            <div className="resume-modal-body">
              <div className="resume-section">
                <h3 className="resume-section-heading">Contact</h3>
                <p>New York, NY</p>
                <p>hello@anjelinavillalobos.art</p>
              </div>

              <div className="resume-section">
                <h3 className="resume-section-heading">Education</h3>
                <p className="resume-item-title">Parsons School of Design, New York, NY</p>
                <p>Bachelor of Fine Arts (BFA), 2024</p>
              </div>

              <div className="resume-section">
                <h3 className="resume-section-heading">Experience</h3>
                <p className="resume-item-title">Art Teacher, NYC Public Schools</p>
                <p className="resume-item-date">2024 - Present</p>
                <ul className="resume-list">
                  <li>Developed and taught acrylic painting curriculum for high school students.</li>
                  <li>Organized and curated the annual student art exhibition.</li>
                </ul>
              </div>

              <div className="resume-section">
                <h3 className="resume-section-heading">Skills</h3>
                <p>Acrylic Painting, Portraiture, Nonrepresentational Art, Art Curation, Curriculum Development.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
