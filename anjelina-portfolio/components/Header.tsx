// Header component - Minimal & Elegant with Mobile Menu

'use client';

import Link from 'next/link';

interface HeaderProps {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

export default function Header({ onMenuClick, showMenuButton = false }: HeaderProps) {
  return (
    <header className="minimal-header">
      <div className="header-left">
        {showMenuButton && (
          <button
            onClick={onMenuClick}
            className="hamburger-menu"
            aria-label="Open navigation menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        )}
        <Link href="/" className="artist-name-link">
          <h1 className="artist-name">Anjelina Villalobos</h1>
        </Link>
      </div>
      <nav className="main-nav">
        <Link href="/about">About</Link>
        <a href="mailto:linahouston9@gmail.com">Contact</a>
      </nav>
    </header>
  );
}
