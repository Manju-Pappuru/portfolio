import { useState } from 'react';
import { sendContactMessage } from '../services/api';
import { portfolioData } from '../data/portfolioData';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', text: string }
  const [sending, setSending] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setSending(true);
    setStatus(null);

    let delivered = false;

    // 1. Try sending to Spring Boot Backend (Persists in Database + Triggers JavaMail if SMTP set)
    try {
      await sendContactMessage(form);
      delivered = true;
    } catch {
      // Backend may be offline, will try direct web mail service next
    }

    // 2. Dispatch via Web3Forms directly to manju.pappuru678@gmail.com (Instant email notification on mobile)
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '64d4b1a4-96c2-4a0b-9df0-bcf5c3639a58', // Free Web3Forms key for instant inbox forwarding
          to: portfolioData.personal.email,
          subject: `📬 Portfolio Message from ${form.name}`,
          from_name: form.name,
          email: form.email,
          message: form.message
        })
      });

      if (response.ok) {
        delivered = true;
      }
    } catch {
      // Non-blocking fallback
    }

    setSending(false);

    if (delivered) {
      setStatus({ 
        type: 'success', 
        text: 'Thank you! Your message has been sent. Manju will receive an email notification shortly.' 
      });
      setForm({ name: '', email: '', message: '' });
    } else {
      // If both network routes were blocked, open mailto directly
      const mailtoUrl = `mailto:${portfolioData.personal.email}?subject=${encodeURIComponent('Portfolio Contact: ' + form.name)}&body=${encodeURIComponent(form.message + '\n\nFrom: ' + form.name + ' (' + form.email + ')')}`;
      window.location.href = mailtoUrl;
      setStatus({ 
        type: 'success', 
        text: 'Opening your email client to send message to ' + portfolioData.personal.email 
      });
    }
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span className="tag-dot"></span>
            <span>07 // Get In Touch</span>
          </div>
          <h2 className="section-title">
            Let's build something <span className="gradient-text">exceptional together.</span>
          </h2>
          <p className="section-subtitle">
            Whether you have an opportunity, a project to collaborate on, or just want to discuss software engineering, my inbox is always open.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info-panel">
            <a href={`mailto:${portfolioData.personal.email}`} className="contact-item-card">
              <div className="contact-item-left">
                <div className="contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <div className="contact-label">Email</div>
                  <div className="contact-val">{portfolioData.personal.email}</div>
                </div>
              </div>
              <span style={{ color: 'var(--accent-secondary)' }}>↗</span>
            </a>

            <a href={`tel:${portfolioData.personal.phone.replace(/\s+/g, '')}`} className="contact-item-card">
              <div className="contact-item-left">
                <div className="contact-icon" style={{ background: 'rgba(16, 185, 129, 0.12)', borderColor: 'rgba(16, 185, 129, 0.25)', color: '#34d399' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <div className="contact-label">Phone</div>
                  <div className="contact-val">{portfolioData.personal.phone}</div>
                </div>
              </div>
              <span style={{ color: '#34d399' }}>↗</span>
            </a>

            <div className="contact-item-card">
              <div className="contact-item-left">
                <div className="contact-icon" style={{ background: 'rgba(99, 102, 241, 0.12)', borderColor: 'rgba(99, 102, 241, 0.25)', color: '#818cf8' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <div className="contact-label">Location</div>
                  <div className="contact-val">{portfolioData.personal.location}</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', marginTop: '6px' }}>
              <a href={portfolioData.personal.github} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ flex: 1 }}>
                <span>GitHub Profile</span>
                <span style={{ color: 'var(--accent-secondary)' }}>↗</span>
              </a>
              <a href={portfolioData.personal.linkedin} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ flex: 1 }}>
                <span>LinkedIn Profile</span>
                <span style={{ color: 'var(--accent-secondary)' }}>↗</span>
              </a>
            </div>
          </div>

          <div className="contact-form-card">
            <form onSubmit={submit} className="contact-form">
              <div className="form-group">
                <label className="form-label" htmlFor="name">Your Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="e.g. Jane Doe"
                  className="form-input"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Your Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="e.g. jane@example.com"
                  className="form-input"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  required
                  rows="4"
                  placeholder="Tell me about your project, role, or idea..."
                  className="form-textarea"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>

              <button className="btn btn-primary" type="submit" disabled={sending} style={{ width: '100%', marginTop: '8px' }}>
                {sending ? (
                  <>
                    <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25"></circle>
                      <path d="M12 2a10 10 0 0 1 10 10" strokeOpacity="1"></path>
                    </svg>
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </>
                )}
              </button>

              {status && (
                <div className={`form-status ${status.type}`}>
                  {status.type === 'success' ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  )}
                  <span>{status.text}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
