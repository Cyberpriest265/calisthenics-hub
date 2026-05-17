'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';

export default function NewCoursePage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: '', description: '', price: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user || JSON.parse(user).role !== 'ADMIN') router.push('/login');
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...form, price: parseFloat(form.price) }),
      });

      const data = await res.json();
      if (!res.ok) {
        const msg = Array.isArray(data.message) ? data.message[0] : data.message;
        setError(msg || 'Failed to create course.');
        return;
      }

      // Go to the manage page for the new course
      router.push(`/admin/courses/${data.id}`);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '60px 5%' }}>

        {/* Header */}
        <Link href="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '32px' }}>
          ← Back to Admin Panel
        </Link>

        <h1 style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: '8px' }}>
          Create New Course
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>
          Fill in the details below. You can add lessons after creating the course.
        </p>

        {error && <div className="alert alert-error">⚠️ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="title">Course Title</label>
            <input
              id="title"
              type="text"
              className="form-input"
              placeholder="e.g. Beginner Calisthenics Mastery"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="description">Description</label>
            <textarea
              id="description"
              className="form-input"
              placeholder="What will students learn from this course?"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
              required
              style={{ resize: 'vertical' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="price">
              Price <span style={{ color: 'var(--text-dim)', fontWeight: 400 }}>(USD)</span>
            </label>
            <input
              id="price"
              type="number"
              className="form-input"
              placeholder="29.99"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button type="submit" className="btn-full" disabled={loading} style={{ flex: 1 }}>
              {loading ? 'Creating...' : 'Create Course →'}
            </button>
            <Link href="/admin" style={{ flex: 0 }}>
              <button type="button" className="btn-outline" style={{ padding: '14px 24px', whiteSpace: 'nowrap' }}>
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>

      <footer className="footer">
        <p>Built with ❤️ by <span>CalisthenicsHub</span> — © {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}
