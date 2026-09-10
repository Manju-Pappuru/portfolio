import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-wrapper" style={{ boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.5)' : 'none' }}>
      <div className="navbar-container">
        <div className="navbar">
          <a className="brand-logo" href="#home">
            <span className="brand-icon">MP</span>
            <span>Manju<span style={{ color: 'var(--accent-secondary)' }}>.dev</span></span>
          </a>

          <nav>
            <ul className="nav-links">
              {links.map((link) => (
                <li key={link.label}>
                  <a className="nav-link" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav-cta">
            <a href="#contact" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
              Let's Talk
            </a>
          </div>

          <button 
            className="mobile-menu-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span style={{ transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ opacity: mobileMenuOpen ? 0 : 1 }} />
            <span style={{ transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          {links.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              className="nav-link"
              onClick={handleLinkClick}
            >
              {link.label}
            </a>
          ))}
          <a 
            href="#contact" 
            className="btn btn-primary" 
            onClick={handleLinkClick}
            style={{ textAlign: 'center', marginTop: '10px' }}
          >
            Let's Talk
          </a>
        </div>
      )}
    </header>
  );
}
