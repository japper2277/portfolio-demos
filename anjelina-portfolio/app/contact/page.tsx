import Header from '@/components/Header';

export default function ContactPage() {
  return (
    <>
      <Header />

      <section className="contact-section" aria-labelledby="contact-heading">
        <a
          href="mailto:linahouston9@gmail.com"
          className="email-link"
          aria-label="Email Anjelina Villalobos"
        >
          linahouston9@gmail.com
        </a>

        <nav className="social-links" aria-label="Social media links">
          <a
            href="https://www.instagram.com/anjelhelix/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow on Instagram"
            className="social-icon"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="18" cy="6" r="1" fill="currentColor"/>
            </svg>
            <span className="social-label">Instagram</span>
          </a>

          <a
            href="mailto:linahouston9@gmail.com"
            aria-label="Email Anjelina Villalobos"
            className="social-icon"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="social-label">Email</span>
          </a>

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow on Twitter"
            className="social-icon"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M23 3C22 3.5 20.5 4 19 4.5C18 3 16.5 2 14.5 2C11 2 8.5 4.5 8.5 8C8.5 8.5 8.5 9 8.5 9.5C5.5 9.5 3 7.5 1.5 5C1 6 1 7 1 8C1 10 2 11.5 3.5 12.5C2.5 12.5 2 12 1.5 11.5C1.5 14 3.5 16 6 16.5C5.5 16.5 5 17 4.5 17C5 19 7 20.5 9.5 20.5C7.5 22 5 23 2 23C4.5 24.5 7.5 25 10.5 25C17.5 25 21.5 19 21.5 13.5V12.5C22.5 12 23.5 11 24 10C23.5 10 23 10.5 22.5 10.5C23 10 23.5 9.5 24 9C23.5 9.5 22.5 10 21.5 10C21 9 20 8.5 19 8.5L23 3Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            <span className="social-label">Twitter</span>
          </a>
        </nav>
      </section>
    </>
  );
}

export const metadata = {
  title: 'Contact | Anjelina Villalobos',
  description: 'Get in touch with Anjelina Villalobos for commissions, press inquiries, and information about available artwork.',
};
