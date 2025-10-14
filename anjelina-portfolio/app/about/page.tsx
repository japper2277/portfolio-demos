import Image from 'next/image';
import Header from '@/components/Header';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <Header />

      <section className="about-section" aria-labelledby="about-heading">
        {/* Hero Image Block */}
        <div className="about-hero">
          <div className="about-hero-image">
            <Image
              src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1400&fm=webp"
              alt="Artist at work in their studio, surrounded by paintings, brushes, and creative materials"
              className="artist-photo-large"
              loading="lazy"
              width={1400}
              height={900}
            />
            <div className="image-caption">
              <span className="caption-text">Studio, Brooklyn — 2024</span>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="about-content-grid">
          {/* Main Bio Column */}
          <div className="bio-main">
            <h2 id="about-heading" className="about-main-heading">Anjelina Villalobos</h2>

            <div className="about-intro">
              <p className="lead-text">
                Working at the volatile intersection of chaos and control, Anjelina Villalobos
                constructs visceral narratives through layered abstraction—where digital
                precision collides with gestural abandon.
              </p>
            </div>

            <div className="bio-body">
              <p>
                Born in Los Angeles in 1989, Villalobos emerged from the early 2010s street
                art scene before pivoting to studio practice. Her work interrogates the
                tension between analog mark-making and computational systems, often building
                paintings through dozens of translucent layers that suggest depth, memory,
                and digital glitch artifacts.
              </p>

              <p>
                Rather than depicting technology, she <em>performs</em> it—using painting as
                a slow, deliberate response to the speed and compression of digital life.
                Each canvas becomes an archaeological site: traces of previous iterations
                bleed through, creating what she calls &quot;temporal collisions.&quot;
              </p>

              <blockquote className="pull-quote">
                &quot;I&apos;m not interested in making paintings about screens. I&apos;m interested
                in making paintings that feel like what it&apos;s like to live with screens—fragmented,
                layered, haunted by what came before.&quot;
              </blockquote>

              <p>
                Her process is ritualistic. She begins each work digitally, generating
                algorithmic color palettes and compositional scaffolds, then abandons the
                screen entirely. The paintings emerge through weeks of additive and
                subtractive mark-making: pouring, scraping, sanding back to earlier layers,
                building up again. What remains is neither purely digital nor analog, but
                exists in productive tension between both.
              </p>
            </div>

            {/* CV Link */}
            <div className="about-cta">
              <Link href="/contact" className="cv-link-primary">
                Commission & Inquiry
              </Link>
            </div>
          </div>

          {/* Sidebar Details */}
          <aside className="bio-sidebar">
            <div className="sidebar-block">
              <h3 className="sidebar-heading">Education</h3>
              <p className="sidebar-text">
                <strong>MFA Painting</strong><br />
                Yale School of Art, 2015
              </p>
              <p className="sidebar-text">
                <strong>BFA Studio Art</strong><br />
                UCLA, 2011
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

export const metadata = {
  title: 'About | Anjelina Villalobos',
  description: 'Learn about contemporary artist Anjelina Villalobos and her artistic practice working at the intersection of digital and analog mark-making.',
};
