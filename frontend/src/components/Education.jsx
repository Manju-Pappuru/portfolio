export default function Education({ education }) {
  return (
    <section className="section" id="education">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span className="tag-dot"></span>
            <span>03 // Academic Journey</span>
          </div>
          <h2 className="section-title">
            Education & <span className="gradient-text">Qualifications.</span>
          </h2>
          <p className="section-subtitle">
            Consistent academic excellence and structured learning in Computer Science and Engineering.
          </p>
        </div>

        <div className="timeline-container">
          {education.map((item) => (
            <div className="timeline-card" key={item.degree}>
              <div className="timeline-node"></div>

              <div className="timeline-header-row">
                <h3 className="timeline-degree">{item.degree}</h3>
                <span className="timeline-period">{item.period}</span>
              </div>

              <p className="timeline-school">{item.school}</p>

              <div>
                <span className="timeline-badge">
                  🎯 {item.result}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
