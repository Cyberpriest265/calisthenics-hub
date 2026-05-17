'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

interface User {
  userId: string;
  email: string;
  role: string;
  name?: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  isPublished: boolean;
}

const courseEmojis = ['🏋️', '💪', '🤸', '🧗', '🏃', '⚡', '🔥', '🎯'];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if logged in
    const token = localStorage.getItem('access_token');
    const storedUser = localStorage.getItem('user');

    if (!token || !storedUser) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(storedUser));

    // Fetch available courses
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [router]);

  if (!user || loading) {
    return (
      <>
        <Navbar />
        <div className="spinner" />
      </>
    );
  }

  const isAdmin = user.role === 'ADMIN';

  return (
    <>
      <Navbar />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 5%' }}>

        {/* Welcome Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(108,99,255,0.15), rgba(167,139,250,0.08))',
          border: '1px solid rgba(108,99,255,0.25)',
          borderRadius: '20px',
          padding: '36px 40px',
          marginBottom: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
        }}>
          <div>
            <p style={{ color: '#a78bfa', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              Welcome back 👋
            </p>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: '8px' }}>
              {user.email.split('@')[0]}
            </h1>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '12px' }}>
              <span style={{
                padding: '4px 12px',
                borderRadius: '100px',
                fontSize: '0.75rem',
                fontWeight: 700,
                background: isAdmin ? 'rgba(245,158,11,0.15)' : 'rgba(108,99,255,0.15)',
                color: isAdmin ? '#fbbf24' : '#a78bfa',
                border: `1px solid ${isAdmin ? 'rgba(245,158,11,0.3)' : 'rgba(108,99,255,0.3)'}`,
              }}>
                {isAdmin ? '👑 Admin' : '🎓 Student'}
              </span>
              <span style={{ padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600, background: 'rgba(34,197,94,0.1)', color: '#86efac', border: '1px solid rgba(34,197,94,0.2)' }}>
                ✅ Active
              </span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Account</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>{user.email}</div>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginBottom: '48px' }}>
          {[
            { label: 'Available Courses', value: courses.length, icon: '📚' },
            { label: 'Lessons Available', value: '1+', icon: '🎬' },
            { label: 'Your Role', value: isAdmin ? 'Admin' : 'Student', icon: '🎯' },
            { label: 'Status', value: 'Active', icon: '✅' },
          ].map((stat) => (
            <div key={stat.label} style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '24px',
            }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{stat.icon}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '4px' }}>{stat.value}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Admin Quick Actions */}
        {isAdmin && (
          <div style={{
            background: 'rgba(245,158,11,0.05)',
            border: '1px solid rgba(245,158,11,0.2)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '40px',
          }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#fbbf24', marginBottom: '16px' }}>
              👑 Admin Quick Actions
            </h2>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="http://localhost:5555" target="_blank" rel="noreferrer">
                <button className="btn-outline" style={{ fontSize: '0.85rem', padding: '10px 20px' }}>
                  🗄️ Open Prisma Studio
                </button>
              </a>
              <button className="btn-outline" style={{ fontSize: '0.85rem', padding: '10px 20px', cursor: 'not-allowed', opacity: 0.6 }}>
                ➕ Create Course (API)
              </button>
            </div>
          </div>
        )}

        {/* Available Courses */}
        <div>
          <h2 className="section-title" style={{ marginBottom: '24px' }}>
            {isAdmin ? 'All ' : 'Browse '}<span>Courses</span>
          </h2>

          {courses.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📚</div>
              <h3>No courses available yet</h3>
              <p>Check back soon — new courses are being added!</p>
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
                        <span className="course-badge">View Course →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <footer className="footer">
        <p>Built with ❤️ by <span>CalisthenicsHub</span> — © {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}
