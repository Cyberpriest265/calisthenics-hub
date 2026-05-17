import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '../../components/Navbar';

interface Lesson {
  id: string;
  title: string;
  position: number;
  videoUrl: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  isPublished: boolean;
  lessons: Lesson[];
  createdAt: string;
}

async function getCourse(id: string): Promise<Course | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await getCourse(id);

  if (!course) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <div className="course-detail">
        {/* Header */}
        <div className="course-detail-header">
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🏋️</div>
          <h1 className="course-detail-title">{course.title}</h1>
          <div className="course-detail-meta">
            <span className="meta-item">📚 {course.lessons?.length || 0} lessons</span>
            <span className="meta-item">⏱️ Self-paced</span>
            <span className="meta-item">🌐 Online</span>
            <span className="course-badge">Beginner Friendly</span>
          </div>
          <p className="course-detail-description">{course.description}</p>
        </div>

        {/* Price Box */}
        <div className="price-box">
          <div className="price-amount">${course.price}</div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.9rem' }}>
            One-time payment. Lifetime access to all lessons.
          </p>
          <Link href="/register">
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Enroll Now — ${course.price}
            </button>
          </Link>
          <p style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
            30-day money-back guarantee
          </p>
        </div>

        {/* Lessons */}
        <h2 className="section-title" style={{ marginBottom: '24px' }}>
          Course <span>Curriculum</span>
        </h2>

        {!course.lessons || course.lessons.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📹</div>
            <h3>Lessons Coming Soon</h3>
            <p>The instructor is uploading content. Enroll now to get notified!</p>
          </div>
        ) : (
          <div className="lessons-list">
            {course.lessons.map((lesson) => (
              <div key={lesson.id} className="lesson-item">
                <div className="lesson-number">{lesson.position}</div>
                <span className="lesson-title">{lesson.title}</span>
                <span style={{ marginLeft: 'auto', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
                  🔒 Preview
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="footer">
        <p>Built with ❤️ by <span>CalisthenicsHub</span> — © {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}
