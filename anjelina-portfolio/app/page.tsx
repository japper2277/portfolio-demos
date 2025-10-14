// Homepage - Immersive filmstrip portfolio viewer
// Based on portfolio_first_anjie.html

'use client';

import { useState } from 'react';
import { artworks } from '@/lib/mockData';
import ImageViewer from '@/components/ImageViewer';
import Header from '@/components/Header';
import YearFilter from '@/components/YearFilter';

export default function HomePage() {
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');

  return (
    <main className="immersive-showcase">
      <Header />
      <YearFilter
        artworks={artworks}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
      />
      <ImageViewer
        artworks={artworks}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
      />
    </main>
  );
}
