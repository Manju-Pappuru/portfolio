export default function Certifications({ certifications }) {
  return (
    <section className="section" id="certifications">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span className="tag-dot"></span>
            <span>05 // Credentials</span>
          </div>
          <h2 className="section-title">
            Certifications & <span className="gradient-text">Badges.</span>
          </h2>
          <p className="section-subtitle">
            Industry credentials validating full-stack engineering principles, ServiceNow enterprise workflows, and application development.
          </p>
        </div>

        <div className="badge-cards-grid">
          {certifications.map((item, index) => (
            <div className="badge-card" key={item}>
              <div className="badge-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 15l-2 5l9-9l-9-9l2 5l-8 4l8 4z"></path>
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
              </div>

              <div className="badge-card-content">
                <strong>{item}</strong>
                <span>VERIFIED CERTIFICATE #{index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
