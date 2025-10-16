// Mock artwork data from portfolio_first_anjie.html
// This will be replaced with Sanity CMS later

export interface Artwork {
  id: number;
  title: string;
  year: number;
  medium: string;
  dimensions: string;
  image: string;
  thumbnail: string;
  price?: number;
  currency: 'USD' | 'EUR';
  availability: 'available' | 'sold' | 'on-loan' | 'private-collection';
  inquireForPrice?: boolean;
}

export const artworks: Artwork[] = [
  {
    id: 1,
    title: "Echoes in Ochre",
    year: 2024,
    medium: "Oil on canvas",
    dimensions: "48x36 in",
    image: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?crop=entropy&fit=crop&w=200&h=200&q=70",
    price: 4500,
    currency: 'USD',
    availability: 'available'
  },
  {
    id: 2,
    title: "Cobalt Transference",
    year: 2024,
    medium: "Acrylic on wood panel",
    dimensions: "24x24 in",
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?crop=entropy&fit=crop&w=200&h=200&q=70",
    price: 2800,
    currency: 'USD',
    availability: 'available'
  },
  {
    id: 3,
    title: "Vestige",
    year: 2023,
    medium: "Mixed media on paper",
    dimensions: "18x24 in",
    image: "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?crop=entropy&fit=crop&w=200&h=200&q=70",
    currency: 'USD',
    availability: 'sold'
  },
  {
    id: 4,
    title: "Temporal Shift",
    year: 2023,
    medium: "Oil and cold wax",
    dimensions: "30x30 in",
    image: "https://images.unsplash.com/photo-1556139943-4bdca53adf1e?w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1556139943-4bdca53adf1e?crop=entropy&fit=crop&w=200&h=200&q=70",
    currency: 'USD',
    availability: 'private-collection'
  },
  {
    id: 5,
    title: "First Light",
    year: 2022,
    medium: "Acrylic on canvas",
    dimensions: "60x48 in",
    image: "https://images.unsplash.com/photo-1561998338-13ad7883b20f?w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1561998338-13ad7883b20f?crop=entropy&fit=crop&w=200&h=200&q=70",
    currency: 'USD',
    availability: 'on-loan',
    inquireForPrice: true
  },
  {
    id: 6,
    title: "Subterranean",
    year: 2022,
    medium: "Ink and gesso on board",
    dimensions: "20x20 in",
    image: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?crop=entropy&fit=crop&w=200&h=200&q=70",
    price: 1200,
    currency: 'USD',
    availability: 'available'
  }
];
