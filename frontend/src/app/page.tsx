import Link from 'next/link';
import Navbar from './components/Navbar';
import NewsletterForm from './components/NewsletterForm';

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  link: string;
  tag: string;
}

// Hardcoded courses instead of fetching from a backend database
const courses: Course[] = [
  {
    id: 'fundamentals',
    title: 'Calisthenics Fundamentals',
    description: 'Master the basic movements: pull-ups, push-ups, dips, and core compression.',
    price: 49,
    link: 'https://example.com/checkout/fundamentals',
    tag: 'Beginner'
  },
  {
    id: 'muscle-up',
    title: 'The Muscle-Up Blueprint',
    description: 'A 6-week progressive guide to achieving your first strict muscle-up.',
    price: 79,
    link: 'https://example.com/checkout/muscle-up',
    tag: 'Advanced'
  },
  {
    id: 'mobility',
    title: 'Bulletproof Joints',
    description: 'Mobility and pre-hab routines to keep you injury-free while training hard.',
    price: 39,
    link: 'https://example.com/checkout/mobility',
    tag: 'Mobility'
  }
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* HERO — ::before CSS stripe handles the red diagonal */}
      <section className="hero">
        <div className="container">

          {/* Eyebrow badge */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
            <span className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              Bodyweight · Precision · Results
            </span>
          </div>

          {/* Headline */}
          <h1 className="hero-title">
            Train smarter.<br />
            Move <span className="hero-title-accent">better.</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle">
            Expert-led calisthenics courses designed for progression.
            From your first pull-up to the muscle-up — structured, proven, yours.
          </p>

          {/* CTAs — use native <a> for hash scroll */}
          <div className="hero-actions">
            <a href="#courses">
              <button className="btn-cta">Start Training</button>
            </a>
            <a href="#about">
              <button className="btn-primary">Meet The Coach</button>
            </a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            {[
              { value: '12+',  label: 'Expert Courses' },
              { value: '2.4k', label: 'Active Students' },
              { value: '98%',  label: 'Completion Rate' },
              { value: '10+',  label: 'Years Experience' },
            ].map(s => (
              <div key={s.label} className="stat-item">
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COURSES */}
      <section className="section" id="courses">
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <div className="section-label">Curriculum</div>
            <h2 className="section-heading">Programs & Coaching</h2>
            <p className="section-body">
              Structured programs built around progressive overload, movement quality, and long-term results.
            </p>
          </div>

          <div className="courses-grid">
            {courses.map((course) => (
              <a key={course.id} href={course.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <div className="course-card">
                  <span className="course-tag">{course.tag}</span>
                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-description">{course.description}</p>
                  <div className="course-footer">
                    <span className="course-price">${course.price}</span>
                    <span className="course-badge">Enroll Now →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT INSTRUCTOR */}
      <section className="section" id="about" style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>The Coach</div>
            <h2 className="section-heading">Hi, I'm John Doe</h2>
            <p className="section-body" style={{ margin: '0 auto 32px' }}>
              I've spent the last decade mastering bodyweight training and helping thousands of athletes unlock skills they never thought possible. My philosophy is simple: master the basics, respect the progression, and train with intention.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
              <span style={{ fontSize: 14, color: 'var(--text-tertiary)' }}>✓ ISSA Certified</span>
              <span style={{ fontSize: 14, color: 'var(--text-tertiary)' }}>✓ 10+ Years Experience</span>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER CTA BAND */}
      <section className="section" id="newsletter" style={{ textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 600 }}>
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 20 }}>
            Stay Updated
          </p>
          <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', fontWeight: 600, letterSpacing: 0, lineHeight: 1.15, color: 'var(--fg)', marginBottom: 16 }}>
            Free Weekly Training Tips.
          </h2>
          <p style={{ fontSize: 16, fontWeight: 500, letterSpacing: '0.2px', color: 'var(--med-gray)', marginBottom: 40 }}>
            Join 5,000+ athletes receiving exclusive routines and mobility drills every Monday.
          </p>
          
          {/* Newsletter Placeholder Form */}
          <NewsletterForm />
          <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 16 }}>
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <span className="footer-brand">⚡ CalisthenicsHub</span>
        <span className="footer-copy">
          © {new Date().getFullYear()} CalisthenicsHub. Built with <span className="footer-accent">♥</span>
        </span>
      </footer>
    </>
  );
}
