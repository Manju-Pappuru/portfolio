export default function Achievements({ achievements }) {
  return (
    <section className="section" id="achievements">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span className="tag-dot"></span>
            <span>06 // Milestones</span>
          </div>
          <h2 className="section-title">
            Honors & <span className="gradient-text">Achievements.</span>
          </h2>
          <p className="section-subtitle">
            Notable competitive programming milestones, hackathons, and academic recognition.
          </p>
        </div>

        <div className="badge-cards-grid">
          {achievements.map((item, index) => (
            <div className="badge-card" key={item}>
              <div className="badge-icon-box" style={{ background: 'rgba(245, 158, 11, 0.12)', borderColor: 'rgba(245, 158, 11, 0.25)', color: '#fbbf24' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                  <path d="M4 22h16"></path>
                  <path d="M10 14.66V17c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-2.34"></path>
                  <path d="M14 14.66V17c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2.34"></path>
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path>
                </svg>
              </div>

              <div className="badge-card-content">
                <strong>{item}</strong>
                <span style={{ color: '#fbbf24' }}>HONOR #{index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
