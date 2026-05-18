import Link from 'next/link';
import Navbar from './components/Navbar';

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  isPublished: boolean;
}

async function getCourses(): Promise<Course[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch { return []; }
}

export default async function HomePage() {
  const courses = await getCourses();

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

          {/* CTAs — use native <a> for hash scroll, Link for route navigation */}
          <div className="hero-actions">
            <Link href="/register">
              <button className="btn-cta">Start Training Free</button>
            </Link>
            <a href="#courses">
              <button className="btn-primary">Browse Courses</button>
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
              { value: '50+',  label: 'Video Lessons' },
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
            <h2 className="section-heading">
              {courses.length > 0 ? 'Available Courses' : 'Courses Coming Soon'}
            </h2>
            <p className="section-body">
              Structured programs built around progressive overload, movement quality, and long-term results.
            </p>
          </div>

          {courses.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🏋️</div>
              <h3>World-class content in preparation</h3>
              <p>Our coaches are curating the curriculum. Register now to get early access.</p>
              <Link href="/register">
                <button className="btn-cta" style={{ marginTop: 24 }}>Get Early Access</button>
              </Link>
            </div>
          ) : (
            <div className="courses-grid">
              {courses.map((course, i) => {
                const tags = ['Beginner', 'Strength', 'Mobility', 'Advanced', 'Core', 'Endurance', 'Skills', 'Foundations'];
                return (
                  <Link key={course.id} href={`/courses/${course.id}`}>
                    <div className="course-card">
                      <span className="course-tag">{tags[i % tags.length]}</span>
                      <h3 className="course-title">{course.title}</h3>
                      <p className="course-description">{course.description}</p>
                      <div className="course-footer">
                        <span className="course-price">${course.price}</span>
                        <span className="course-badge">View →</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA BAND */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
        <div className="container">
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 20 }}>
            Ready to start?
          </p>
          <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 600, letterSpacing: 0, lineHeight: 1.15, color: 'var(--fg)', marginBottom: 16 }}>
            Your first lesson is free.
          </h2>
          <p style={{ fontSize: 16, fontWeight: 500, letterSpacing: '0.2px', color: 'var(--med-gray)', marginBottom: 40 }}>
            No credit card required. Cancel anytime.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/register"><button className="btn-cta">Create Free Account</button></Link>
            <Link href="/login"><button className="btn-primary">Sign In</button></Link>
          </div>
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
