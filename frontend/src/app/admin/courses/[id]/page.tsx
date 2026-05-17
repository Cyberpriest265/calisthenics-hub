'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';

interface Lesson {
  id: string;
  title: string;
  position: number;
  videoUrl: string;
}

interface Course {
  id: string;
  title: string;
  isPublished: boolean;
  lessons: Lesson[];
}

export default function ManageCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessonForm, setLessonForm] = useState({ title: '', videoUrl: '', position: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [addingLesson, setAddingLesson] = useState(false);
  const [courseId, setCourseId] = useState('');

  const getToken = () => localStorage.getItem('access_token') || '';

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user || JSON.parse(user).role !== 'ADMIN') { router.push('/login'); return; }

    params.then(({ id }) => {
      setCourseId(id);
      fetchCourse(id);
    });
  }, [router, params]);

  const fetchCourse = async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const data = await res.json();
    setCourse(data);
    setLoading(false);
    // Pre-fill next position
    setLessonForm(f => ({ ...f, position: String((data.lessons?.length || 0) + 1) }));
  };

  const handleAddLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess('');
    setAddingLesson(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/lessons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({ ...lessonForm, position: parseInt(lessonForm.position) }),
      });

      const data = await res.json();
      if (!res.ok) {
        const msg = Array.isArray(data.message) ? data.message[0] : data.message;
        setError(msg || 'Failed to add lesson.');
        return;
      }

      setSuccess(`✅ "${data.title}" added successfully!`);
      setLessonForm({ title: '', videoUrl: '', position: String((course?.lessons.length || 0) + 2) });
      fetchCourse(courseId);
    } catch {
      setError('Something went wrong.');
    } finally {
      setAddingLesson(false);
    }
  };

  const deleteLesson = async (lessonId: string) => {
    if (!confirm('Delete this lesson?')) return;
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/lessons/${lessonId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    fetchCourse(courseId);
  };

  const togglePublish = async () => {
    if (!course) return;
    const endpoint = course.isPublished ? 'unpublish' : 'publish';
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/${endpoint}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    fetchCourse(courseId);
  };

  if (loading || !course) return <><Navbar /><div className="spinner" /></>;

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 5%' }}>

        {/* Back + Header */}
        <Link href="/admin" style={{ color: 'var(--text-muted)', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '28px' }}>
          ← Back to Admin Panel
        </Link>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '40px', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: '8px' }}>
              {course.title}
            </h1>
            <span style={{
              padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700,
              background: course.isPublished ? 'rgba(34,197,94,0.12)' : 'rgba(107,114,128,0.15)',
              color: course.isPublished ? '#86efac' : '#9ca3af',
              border: `1px solid ${course.isPublished ? 'rgba(34,197,94,0.25)' : 'rgba(107,114,128,0.2)'}`,
            }}>
              {course.isPublished ? '✅ Published' : '📝 Draft'}
            </span>
          </div>
          <button
            onClick={togglePublish}
            className="btn-outline"
            style={{ color: course.isPublished ? '#f87171' : '#86efac', borderColor: course.isPublished ? 'rgba(248,113,113,0.3)' : 'rgba(134,239,172,0.3)' }}
          >
            {course.isPublished ? '⬇️ Unpublish Course' : '⬆️ Publish Course'}
          </button>
        </div>

        {/* Lessons List */}
        <h2 className="section-title" style={{ marginBottom: '20px' }}>
          Lessons <span>({course.lessons.length})</span>
        </h2>

        {course.lessons.length === 0 ? (
          <div style={{ background: 'var(--bg-card)', border: '1px dashed var(--border)', borderRadius: '16px', padding: '32px', textAlign: 'center', color: 'var(--text-muted)', marginBottom: '32px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📭</div>
            <p>No lessons yet. Add your first lesson below!</p>
          </div>
        ) : (
          <div className="lessons-list" style={{ marginBottom: '32px' }}>
            {course.lessons.map((lesson) => (
              <div key={lesson.id} className="lesson-item">
                <div className="lesson-number">{lesson.position}</div>
                <div style={{ flex: 1 }}>
                  <div className="lesson-title">{lesson.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '2px' }}>{lesson.videoUrl}</div>
                </div>
                <button
                  onClick={() => deleteLesson(lesson.id)}
                  style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', color: '#fca5a5', padding: '6px 12px', fontSize: '0.78rem', cursor: 'pointer' }}
                >
                  🗑️ Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add Lesson Form */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '28px' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '20px', fontSize: '1rem' }}>➕ Add New Lesson</h3>

          {error && <div className="alert alert-error">⚠️ {error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleAddLesson}>
            <div className="form-group">
              <label className="form-label">Lesson Title</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Introduction to Pull-ups"
                value={lessonForm.title}
                onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Video URL</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://youtube.com/watch?v=..."
                value={lessonForm.videoUrl}
                onChange={(e) => setLessonForm({ ...lessonForm, videoUrl: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Position</label>
              <input
                type="number"
                className="form-input"
                value={lessonForm.position}
                onChange={(e) => setLessonForm({ ...lessonForm, position: e.target.value })}
                min="1"
                required
              />
            </div>

            <button type="submit" className="btn-full" disabled={addingLesson}>
              {addingLesson ? 'Adding...' : '+ Add Lesson'}
            </button>
          </form>
        </div>
      </div>

      <footer className="footer">
        <p>Built with ❤️ by <span>CalisthenicsHub</span> — © {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}
