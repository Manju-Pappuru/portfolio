package com.manjup.portfolio.service;

import com.manjup.portfolio.entity.Project;
import com.manjup.portfolio.repository.ProjectRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<Project> getAllProjects() {
        seedProjectsIfEmpty();
        return projectRepository.findAll();
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found"));
    }

    private void seedProjectsIfEmpty() {
        if (projectRepository.count() > 0) {
            return;
        }
        projectRepository.saveAll(List.of(
                new Project(
                        "Freelance Finder Application",
                        "A full-stack platform connecting freelancers and clients for project collaboration.",
                        List.of("MongoDB", "Express.js", "React.js", "Node.js", "JWT", "REST APIs"),
                        List.of("Secure authentication", "Role-based dashboards", "RESTful APIs", "CRUD operations", "100+ user/project records", "Responsive interface"),
                        "https://github.com/Manju-Pappuru",
                        ""
                ),
                new Project(
                        "Anonymous Mental Health and Stress Support Portal",
                        "An anonymous student and counselor support platform with secure, real-time communication and a Gemini-powered AI assistant.",
                        List.of("MongoDB", "Express.js", "React.js", "Node.js", "JWT", "REST APIs", "Gemini API"),
                        List.of("Anonymous communication", "JWT authentication", "Bcrypt encryption", "Real-time chat", "Gemini-powered AI assistant", "Issue tracking", "Severity-based and role-based access", "100+ user records"),
                        "https://github.com/Manju-Pappuru",
                        ""
                )
        ));
    }
}
