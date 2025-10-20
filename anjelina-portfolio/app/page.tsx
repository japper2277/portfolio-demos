// Homepage - Two-column layout with sidebar navigation
// Fetches artwork data from Sanity CMS

import { Suspense } from 'react';
import { getArtworks, urlFor } from '@/lib/sanity';
import HomePageClient from '@/components/HomePageClient';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const revalidate = 60; // Revalidate every 60 seconds

interface SanityArtwork {
  title: string;
  year: number;
  medium: string;
  dimensions: string;
  mainImage: SanityImageSource;
  thumbnail?: SanityImageSource;
  price?: number;
  currency?: string;
  availability: string;
  inquireForPrice: boolean;
}

export default async function HomePage() {
  // Fetch artworks from Sanity
  const sanityArtworks = await getArtworks();

  // Transform Sanity data to match the expected format
  const artworks = sanityArtworks.map((artwork: SanityArtwork, index: number) => ({
    id: index + 1,
    title: artwork.title,
    year: artwork.year,
    medium: artwork.medium,
    dimensions: artwork.dimensions,
    image: urlFor(artwork.mainImage)
      .width(1920)
      .fit('max')
      .format('webp')
      .quality(85)
      .url(),
    thumbnail: artwork.thumbnail
      ? urlFor(artwork.thumbnail).width(100).fit('max').format('webp').quality(80).url()
      : urlFor(artwork.mainImage).width(100).fit('max').format('webp').quality(80).url(),
    price: artwork.price,
    currency: artwork.currency || 'USD',
    availability: artwork.availability,
    inquireForPrice: artwork.inquireForPrice,
  }));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageClient artworks={artworks} />
    </Suspense>
  );
}
