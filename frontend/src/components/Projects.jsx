export default function Projects({ projects }) {
  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span className="tag-dot"></span>
            <span>04 // Portfolio</span>
          </div>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects.</span>
          </h2>
          <p className="section-subtitle">
            Full-stack web applications engineered with security, scalability, clean code, and intuitive user experiences.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <article className="project-card" key={project.id || project.name}>
              <div className="project-card-header">
                <span className="project-index">PROJ-0{index + 1}</span>
                
                <div className="project-links-top">
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="icon-link" 
                      title="View Source Code on GitHub"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                      </svg>
                    </a>
                  )}
                  {project.liveDemoUrl && (
                    <a 
                      href={project.liveDemoUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="icon-link" 
                      title="View Live Demo"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              <h3 className="project-title">{project.name}</h3>
              <p className="project-description">{project.description}</p>

              {project.features && (
                <ul className="project-features">
                  {project.features.map((feature) => (
                    <li className="project-feature-item" key={feature}>
                      <svg className="feature-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="project-card-footer">
                <div className="project-tech-stack">
                  {project.technologies?.map((tech) => (
                    <span className="tech-tag" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="btn btn-outline" 
                      style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                    >
                      <span>Source Code</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </a>
                  )}
                  {project.liveDemoUrl && (
                    <a 
                      href={project.liveDemoUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="btn btn-primary" 
                      style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                    >
                      <span>Live Demo</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
