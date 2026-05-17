import Link from 'next/link';
import Navbar from './components/Navbar';

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail?: string;
  isPublished: boolean;
}

const courseEmojis = ['🏋️', '💪', '🤸', '🧗', '🏃', '⚡', '🔥', '🎯'];

async function getCourses(): Promise<Course[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const courses = await getCourses();

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">🔥 New courses added weekly</div>
        <h1>
          Master Your Body,<br />
          <span>Master Calisthenics</span>
        </h1>
        <p>
          Expert-led bodyweight training courses. From zero to hero — 
          pull-ups, muscle-ups, handstands, and beyond.
        </p>
        <div className="hero-actions">
          <Link href="/register">
            <button className="btn-primary">
              Start Training Free →
            </button>
          </Link>
          <button className="btn-outline">Watch Preview</button>
        </div>
      </section>

      {/* Stats */}
      <div className="stats-bar">
        <div className="stat">
          <div className="stat-number">12+</div>
          <div className="stat-label">Expert Courses</div>
        </div>
        <div className="stat">
          <div className="stat-number">2.4k</div>
          <div className="stat-label">Active Students</div>
        </div>
        <div className="stat">
          <div className="stat-number">98%</div>
          <div className="stat-label">Satisfaction Rate</div>
        </div>
        <div className="stat">
          <div className="stat-number">50+</div>
          <div className="stat-label">Video Lessons</div>
        </div>
      </div>

      {/* Courses Section */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">
            Browse <span>Courses</span>
          </h2>
        </div>

        {courses.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🏋️</div>
            <h3>Courses Coming Soon</h3>
            <p>Our expert coaches are preparing world-class content. Check back soon!</p>
          </div>
        ) : (
          <div className="courses-grid">
            {courses.map((course, index) => (
              <Link key={course.id} href={`/courses/${course.id}`}>
                <div className="course-card">
                  <div className="course-thumbnail">
                    {courseEmojis[index % courseEmojis.length]}
                  </div>
                  <div className="course-body">
                    <h3 className="course-title">{course.title}</h3>
                    <p className="course-description">{course.description}</p>
                    <div className="course-footer">
                      <span className="course-price">${course.price}</span>
                      <span className="course-badge">🎓 Beginner Friendly</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Built with ❤️ by <span>CalisthenicsHub</span> — © {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}
