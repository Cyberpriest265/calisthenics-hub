'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  isPublished: boolean;
  createdAt: string;
  _count: { lessons: number };
}

export default function AdminPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const getToken = () => localStorage.getItem('access_token') || '';

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) { router.push('/login'); return; }
    const parsed = JSON.parse(user);
    if (parsed.role !== 'ADMIN') { router.push('/dashboard'); return; }
    fetchCourses();
  }, [router]);

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/admin`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      setCourses(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  };

  const togglePublish = async (course: Course) => {
    setActionLoading(course.id);
    const endpoint = course.isPublished ? 'unpublish' : 'publish';
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${course.id}/${endpoint}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    await fetchCourses();
    setActionLoading(null);
  };

  const deleteCourse = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course? This cannot be undone.')) return;
    setActionLoading(id);
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    await fetchCourses();
    setActionLoading(null);
  };

  if (loading) return <><Navbar /><div className="spinner" /></>;

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 5%' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <p style={{ color: '#fbbf24', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
              👑 Admin Panel
            </p>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.5px' }}>Course Management</h1>
          </div>
          <Link href="/admin/courses/new">
            <button className="btn-primary">+ Create New Course</button>
          </Link>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px', marginBottom: '40px' }}>
          {[
            { label: 'Total Courses', value: courses.length, icon: '📚' },
            { label: 'Published', value: courses.filter(c => c.isPublished).length, icon: '✅' },
            { label: 'Drafts', value: courses.filter(c => !c.isPublished).length, icon: '📝' },
            { label: 'Total Lessons', value: courses.reduce((sum, c) => sum + c._count.lessons, 0), icon: '🎬' },
          ].map((s) => (
            <div key={s.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px' }}>
              <div style={{ fontSize: '1.6rem', marginBottom: '6px' }}>{s.icon}</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)' }}>{s.value}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Course Table */}
        {courses.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <h3>No courses yet</h3>
            <p>Create your first course to get started.</p>
            <Link href="/admin/courses/new">
              <button className="btn-primary" style={{ marginTop: '20px' }}>+ Create Course</button>
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {courses.map((course) => (
              <div key={course.id} style={{
                background: 'var(--bg-card)',
                border: `1px solid ${course.isPublished ? 'rgba(34,197,94,0.2)' : 'var(--border)'}`,
                borderRadius: '16px',
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                flexWrap: 'wrap',
              }}>
                {/* Status dot */}
                <div style={{
                  width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0,
                  background: course.isPublished ? '#22c55e' : '#6b7280',
                  boxShadow: course.isPublished ? '0 0 8px rgba(34,197,94,0.5)' : 'none',
                }} />

                {/* Info */}
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '4px' }}>{course.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <span>💰 ${course.price}</span>
                    <span>🎬 {course._count.lessons} lessons</span>
                    <span>{course.isPublished ? '✅ Published' : '📝 Draft'}</span>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <Link href={`/admin/courses/${course.id}`}>
                    <button className="btn-outline" style={{ fontSize: '0.8rem', padding: '8px 14px' }}>
                      📚 Manage Lessons
                    </button>
                  </Link>
                  <button
                    onClick={() => togglePublish(course)}
                    disabled={actionLoading === course.id}
                    className="btn-outline"
                    style={{ fontSize: '0.8rem', padding: '8px 14px', color: course.isPublished ? '#f87171' : '#86efac', borderColor: course.isPublished ? 'rgba(248,113,113,0.3)' : 'rgba(134,239,172,0.3)' }}
                  >
                    {actionLoading === course.id ? '...' : course.isPublished ? '⬇️ Unpublish' : '⬆️ Publish'}
                  </button>
                  <button
                    onClick={() => deleteCourse(course.id)}
                    disabled={actionLoading === course.id}
                    style={{ fontSize: '0.8rem', padding: '8px 14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '8px', color: '#fca5a5', cursor: 'pointer', transition: 'all 0.2s' }}
                  >
                    🗑️ Delete
                  </button>
                </div>
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
