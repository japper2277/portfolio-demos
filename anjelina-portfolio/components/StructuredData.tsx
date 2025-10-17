// StructuredData component - JSON-LD for SEO
// Generates schema.org structured data for search engines

interface StructuredDataProps {
  type: 'Person' | 'VisualArtwork' | 'ImageGallery';
  data: Record<string, unknown>;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const generateSchema = () => {
    const baseSchema = {
      '@context': 'https://schema.org',
      '@type': type,
    };

    return { ...baseSchema, ...data };
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema()) }}
    />
  );
}

// Predefined schemas
export const ArtistSchema = () => (
  <StructuredData
    type="Person"
    data={{
      name: 'Anjelina Villalobos',
      jobTitle: 'Contemporary Artist',
      description: 'Contemporary artist working at the volatile intersection of chaos and control, constructing visceral narratives through layered abstraction.',
      url: 'https://anjelinavillalobos.com',
      sameAs: [
        'https://www.instagram.com/anjelhelix/',
        'https://artsy.net/artist/anjelina-villalobos',
      ],
      alumniOf: [
        {
          '@type': 'EducationalOrganization',
          name: 'Yale School of Art',
          url: 'https://www.art.yale.edu/',
        },
        {
          '@type': 'EducationalOrganization',
          name: 'UCLA',
          url: 'https://www.ucla.edu/',
        },
      ],
      knowsAbout: [
        'Abstract Art',
        'Contemporary Painting',
        'Mixed Media',
        'Digital Art',
        'Layered Abstraction',
      ],
    }}
  />
);

export const GallerySchema = (artworkCount: number) => (
  <StructuredData
    type="ImageGallery"
    data={{
      name: 'Anjelina Villalobos Portfolio',
      description: 'Collection of contemporary abstract paintings and artwork',
      url: 'https://anjelinavillalobos.com',
      numberOfItems: artworkCount,
      creator: {
        '@type': 'Person',
        name: 'Anjelina Villalobos',
      },
    }}
  />
);

export const ArtworkSchema = (artwork: {
  title: string;
  year: number;
  medium: string;
  dimensions: string;
  image: string;
  price?: number;
  currency: string;
  availability: string;
}) => (
  <StructuredData
    type="VisualArtwork"
    data={{
      name: artwork.title,
      creator: {
        '@type': 'Person',
        name: 'Anjelina Villalobos',
      },
      dateCreated: artwork.year.toString(),
      artMedium: artwork.medium,
      artform: 'Painting',
      image: artwork.image,
      width: artwork.dimensions.split('x')[0]?.trim() || '',
      height: artwork.dimensions.split('x')[1]?.trim() || '',
      ...(artwork.price && artwork.availability === 'available' && {
        offers: {
          '@type': 'Offer',
          price: artwork.price,
          priceCurrency: artwork.currency,
          availability:
            artwork.availability === 'available'
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
        },
      }),
    }}
  />
);
