// Filmstrip component - Bottom carousel with thumbnails
// Based on portfolio_first_anjie.html lines 202-205, 270-287

'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import type { Artwork } from '@/lib/mockData';

interface FilmstripProps {
  artworks: Artwork[];
  currentIndex: number;
  onSelectArtwork: (index: number) => void;
  selectedYear?: number | 'all';
}

export default function Filmstrip({
  artworks,
  currentIndex,
  onSelectArtwork,
}: FilmstripProps) {
  const carouselRef = useRef<HTMLUListElement>(null);
  const activeItemRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll to active thumbnail only if out of view
  useEffect(() => {
    if (activeItemRef.current && carouselRef.current) {
      const thumbnail = activeItemRef.current;
      const container = carouselRef.current;

      const thumbnailRect = thumbnail.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // Check if thumbnail is out of visible area
      const isOutOfView =
        thumbnailRect.left < containerRect.left + 50 ||
        thumbnailRect.right > containerRect.right - 50;

      if (isOutOfView) {
        thumbnail.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      }
    }
  }, [currentIndex]);

  return (
    <div className="filmstrip-container">
      <ul className="filmstrip-carousel" ref={carouselRef}>
        {artworks.map((artwork, index) => {
          const isActive = index === currentIndex;

          return (
            <li
              key={artwork.id}
              style={{
                opacity: 1,
                animation: `fadeInThumbnail 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.03}s both`,
              }}
            >
              <button
                ref={isActive ? activeItemRef : null}
                className={`thumbnail-item ${isActive ? 'active' : ''}`}
                onClick={() => onSelectArtwork(index)}
                aria-label={`${artwork.title}, ${artwork.year}`}
              >
                <span className="thumbnail-item-inner">
                  <Image
                    src={artwork.thumbnail}
                    alt=""
                    width={100}
                    height={100}
                    loading={index < 6 ? 'eager' : 'lazy'}
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                  />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
