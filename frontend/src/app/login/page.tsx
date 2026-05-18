'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || 'Invalid email or password.'); return; }
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/dashboard');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      background: 'var(--bg)',
    }}>

      {/* Brand */}
      <Link href="/" style={{ marginBottom: 40, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: '0.2px', color: 'var(--fg)' }}>
          ⚡ CalisthenicsHub
        </span>
      </Link>

      {/* Card */}
      <div style={{
        width: '100%',
        maxWidth: 400,
        background: 'var(--bg-100)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 16,
        padding: '36px 32px',
        boxShadow: 'var(--shadow-ring)',
      }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '0px', lineHeight: 1.2, color: 'var(--fg)', marginBottom: 6 }}>
            Welcome back
          </h1>
          <p style={{ fontSize: 14, fontWeight: 500, letterSpacing: '0.2px', color: 'var(--med-gray)', lineHeight: 1.5 }}>
            Sign in to continue your training
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="alert alert-error" style={{ marginBottom: 20 }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <label className="form-label" htmlFor="password" style={{ margin: 0 }}>Password</label>
              <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--blue)', letterSpacing: '0.2px', cursor: 'pointer' }}>
                Forgot password?
              </span>
            </div>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 8,
              width: '100%',
              padding: '12px',
              background: 'hsla(0,0%,100%,0.815)',
              color: '#121314',
              border: 'none',
              borderRadius: 86,
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: '0.2px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.5 : 1,
              transition: 'background 0.2s, opacity 0.2s',
              fontFamily: 'inherit',
            }}
            onMouseEnter={e => { if (!loading) (e.target as HTMLButtonElement).style.background = '#fff'; }}
            onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = 'hsla(0,0%,100%,0.815)'; }}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
          <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-tertiary)', letterSpacing: '0.2px' }}>or</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
        </div>

        {/* Footer link */}
        <p style={{ textAlign: 'center', fontSize: 13, fontWeight: 500, letterSpacing: '0.2px', color: 'var(--med-gray)' }}>
          Don&apos;t have an account?{' '}
          <Link href="/register" style={{ color: 'var(--fg)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 3 }}>
            Create one free
          </Link>
        </p>
      </div>

      {/* Bottom note */}
      <p style={{ marginTop: 28, fontSize: 12, fontWeight: 400, letterSpacing: '0.4px', color: 'var(--text-tertiary)', textAlign: 'center' }}>
        By signing in you agree to our{' '}
        <span style={{ color: 'var(--med-gray)', cursor: 'pointer' }}>Terms</span>
        {' '}&amp;{' '}
        <span style={{ color: 'var(--med-gray)', cursor: 'pointer' }}>Privacy Policy</span>
      </p>
    </div>
  );
}
