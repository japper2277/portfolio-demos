import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Anjelina Villalobos | Contemporary Artist',
    template: '%s | Anjelina Villalobos'
  },
  description: 'Contemporary artist working at the volatile intersection of chaos and control. Visceral narratives through layered abstraction where digital precision collides with gestural abandon.',
  keywords: ['artist', 'contemporary art', 'paintings', 'abstract art', 'portfolio', 'layered abstraction', 'digital analog art'],
  authors: [{ name: 'Anjelina Villalobos' }],
  creator: 'Anjelina Villalobos',
  openGraph: {
    title: 'Anjelina Villalobos - Contemporary Abstract Artist',
    description: 'Visceral narratives through layered abstraction where digital precision collides with gestural abandon. Explore original paintings and artwork.',
    type: 'website',
    locale: 'en_US',
    url: 'https://anjelinavillalobos.com',
    siteName: 'Anjelina Villalobos Portfolio',
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Anjelina Villalobos - Contemporary Abstract Artist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anjelina Villalobos - Contemporary Abstract Artist',
    description: 'Visceral narratives through layered abstraction. Explore original paintings and artwork.',
    creator: '@anjelinavillalobos',
    images: ['/opengraph-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
      </head>
      <body>{children}</body>
    </html>
  );
}
