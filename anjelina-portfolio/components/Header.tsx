// Header component - Minimal & Elegant
// Based on portfolio_first_anjie.html lines 44-68

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

interface HeaderProps {
  children?: ReactNode;
}

export default function Header({ children }: HeaderProps = {}) {
  const pathname = usePathname();

  return (
    <header className="minimal-header">
      <Link href="/" className="artist-name">
        Anjelina Villalobos
      </Link>
      <div className="header-right">
        {children}
        <nav className="main-nav">
          <Link
            href="/about"
            className={pathname === '/about' ? 'active' : ''}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={pathname === '/contact' ? 'active' : ''}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
