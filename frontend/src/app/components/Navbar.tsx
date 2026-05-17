'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  return (
    <nav className="navbar">
      <Link href="/" className="navbar-logo">⚡ CalisthenicsHub</Link>
      <div className="navbar-links">
        <Link href="/" className="nav-link">Courses</Link>
        {user ? (
          <>
            <Link href="/dashboard" className="nav-link">Dashboard</Link>
            {user.role === 'ADMIN' && (
              <Link href="/admin" className="nav-link" style={{ color: '#fbbf24' }}>👑 Admin</Link>
            )}
            <button className="nav-btn" onClick={handleLogout} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--text-muted)' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="nav-link">Login</Link>
            <Link href="/register">
              <button className="nav-btn">Get Started</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
