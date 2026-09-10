export default function About({ personal }) {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span className="tag-dot"></span>
            <span>01 // About Me</span>
          </div>
          <h2 className="section-title">
            Grounded in fundamentals, <span className="gradient-text">driven by innovation.</span>
          </h2>
          <p className="section-subtitle">
            A software engineer passionate about clean architectures, algorithmic problem solving, and building intuitive user experiences.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-card">
            <div>
              <h3>My Background & Vision</h3>
              <p>
                {personal.objective}
              </p>
              <p>
                Currently pursuing my B.Tech in Computer Science and Engineering with a 9.06 CGPA, I focus on transforming abstract ideas into high-performing, maintainable software. Whether it's architecting backend REST APIs, optimizing SQL/NoSQL databases, or building responsive frontend interfaces, I prioritize reliability and code craftsmanship.
              </p>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <span className="timeline-badge">🎓 SRIT (2023 - Present)</span>
              <span className="timeline-badge" style={{ color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)', borderColor: 'rgba(56, 189, 248, 0.25)' }}>
                ⚡ Full Stack & Java
              </span>
            </div>
          </div>

          <div className="about-highlights">
            <div className="highlight-item">
              <div className="highlight-icon">🧠</div>
              <div className="highlight-title">Algorithmic Mindset</div>
              <div className="highlight-desc">
                Over 360+ LeetCode problems solved across Data Structures, Algorithms, Dynamic Programming, and Recursion.
              </div>
            </div>

            <div className="highlight-item">
              <div className="highlight-icon">⚡</div>
              <div className="highlight-title">Full Stack Mastery</div>
              <div className="highlight-desc">
                End-to-end expertise spanning React.js frontend interfaces to robust Node.js, Express, and Java backends.
              </div>
            </div>

            <div className="highlight-item">
              <div className="highlight-icon">🛡️</div>
              <div className="highlight-title">Secure & Scalable</div>
              <div className="highlight-desc">
                Hands-on experience with JWT authentication, role-based access control, Bcrypt encryption, and RESTful APIs.
              </div>
            </div>

            <div className="highlight-item">
              <div className="highlight-icon">🚀</div>
              <div className="highlight-title">Fast Learner</div>
              <div className="highlight-desc">
                Certified in MERN stack development and ServiceNow CSA/CAD with proven state-level hackathon achievements.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
