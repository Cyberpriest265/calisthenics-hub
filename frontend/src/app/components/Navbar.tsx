'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkStyle = {
    color: '#8e8e90',
    textDecoration: 'none' as const,
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: '0.2px',
    padding: '6px 10px',
    borderRadius: 6,
    transition: 'color 0.15s',
    lineHeight: 1.4,
    whiteSpace: 'nowrap' as const,
  };

  return (
    <>
      {/* Spacer so content doesn't hide under fixed nav */}
      <div style={{ height: 72 }} />

      <nav className="navbar-container" style={{
        position: 'fixed',
        top: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 200,
        width: 'calc(100% - 48px)',
        maxWidth: 1100,

        /* Glassmorphism */
        background: scrolled
          ? 'rgba(4, 5, 6, 0.82)'
          : 'rgba(4, 5, 6, 0.65)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',

        /* Glass edge — double border technique */
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: 14,
        boxShadow: scrolled
          ? 'rgb(22,23,25) 0px 0px 0px 1px, rgba(0,0,0,0.5) 0px 8px 32px, rgba(255,255,255,0.04) 0px 1px 0px 0px inset'
          : 'rgb(22,23,25) 0px 0px 0px 1px, rgba(0,0,0,0.3) 0px 4px 16px, rgba(255,255,255,0.03) 0px 1px 0px 0px inset',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 20px',
        transition: 'background 0.3s, box-shadow 0.3s, padding 0.3s, width 0.3s, top 0.3s',
      }}>

        {/* ── LEFT: Brand ── */}
        <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <span style={{
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: '0.2px',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: 7,
          }}>
            ⚡ CalisthenicsHub
          </span>
        </Link>

        {/* ── CENTER: Nav Links (Hidden on mobile) ── */}
        <ul className="nav-center-menu" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}>
          {[
            { label: 'Programs', href: '/#courses' },
            { label: 'About',    href: '/#about' },
            { label: 'Blog',     href: '/#blog' },
          ].map(link => (
            <li key={link.label}>
              <a
                href={link.href}
                style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                onMouseLeave={e => (e.currentTarget.style.color = '#8e8e90')}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* ── RIGHT: Newsletter / External CTA ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
          {/* Ghost Sign-in (Removed per simplified arch, replaced with subtle Contact or Newsletter link) */}
          <Link
            href="/#newsletter"
            className="nav-ghost-btn"
            style={{
              ...linkStyle,
              display: 'inline-block',
              padding: '7px 14px',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={e => (e.currentTarget.style.color = '#8e8e90')}
          >
            Subscribe
          </Link>

          {/* White pill CTA */}
          <Link href="/#courses" style={{ textDecoration: 'none' }}>
            <button
              style={{
                background: 'hsla(0,0%,100%,0.815)',
                color: '#121314',
                border: 'none',
                borderRadius: 86,
                padding: '7px 18px',
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: '0.2px',
                cursor: 'pointer',
                transition: 'background 0.2s',
                fontFamily: 'inherit',
                whiteSpace: 'nowrap',
                boxShadow: 'rgba(255,255,255,0.1) 0px 1px 0px 0px inset',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#ffffff')}
              onMouseLeave={e => (e.currentTarget.style.background = 'hsla(0,0%,100%,0.815)')}
            >
              Start Training
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
}
