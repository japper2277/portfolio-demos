// Header component - Minimal & Elegant

'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="minimal-header">
      <Link href="/" className="artist-name-link">
        <h1 className="artist-name">Anjelina Villalobos</h1>
      </Link>
      <nav className="main-nav">
        <Link href="/about">About</Link>
        <a href="mailto:contact@anjelinavillalobos.com">Contact</a>
      </nav>
    </header>
  );
}
