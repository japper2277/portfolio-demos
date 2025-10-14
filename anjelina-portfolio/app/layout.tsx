import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Anjelina Villalobos | Contemporary Artist',
    template: '%s | Anjelina Villalobos'
  },
  description: 'Contemporary artist portfolio showcasing original paintings and artwork. Exploring the intersection of digital and analog mark-making.',
  keywords: ['artist', 'contemporary art', 'paintings', 'abstract art', 'portfolio'],
  authors: [{ name: 'Anjelina Villalobos' }],
  openGraph: {
    title: 'Anjelina Villalobos | Contemporary Artist',
    description: 'Contemporary artist portfolio showcasing original paintings and artwork.',
    type: 'website',
    siteName: 'Anjelina Villalobos Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anjelina Villalobos | Contemporary Artist',
    description: 'Contemporary artist portfolio showcasing original paintings and artwork.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
