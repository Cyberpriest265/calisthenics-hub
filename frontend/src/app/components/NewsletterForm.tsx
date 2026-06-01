'use client';

export default function NewsletterForm() {
  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        alert("Newsletter integration coming soon!");
      }}
      style={{ display: 'flex', gap: 8, maxWidth: 400, margin: '0 auto' }}
    >
      <input 
        type="email" 
        placeholder="Enter your email" 
        required
        style={{
          flex: 1,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid var(--border)',
          borderRadius: 8,
          padding: '12px 16px',
          color: 'var(--fg)',
          fontSize: 14,
          outline: 'none'
        }}
      />
      <button type="submit" className="btn-cta" style={{ padding: '0 24px' }}>
        Subscribe
      </button>
    </form>
  );
}
