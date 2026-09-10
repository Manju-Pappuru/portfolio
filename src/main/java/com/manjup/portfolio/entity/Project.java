package com.manjup.portfolio.entity;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String githubUrl;
    private String liveDemoUrl;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "project_technologies", joinColumns = @JoinColumn(name = "project_id"))
    private List<String> technologies = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "project_features", joinColumns = @JoinColumn(name = "project_id"))
    private List<String> features = new ArrayList<>();

    protected Project() {
    }

    public Project(String name, String description, List<String> technologies, List<String> features,
                   String githubUrl, String liveDemoUrl) {
        this.name = name;
        this.description = description;
        this.technologies = technologies;
        this.features = features;
        this.githubUrl = githubUrl;
        this.liveDemoUrl = liveDemoUrl;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public List<String> getTechnologies() { return technologies; }
    public List<String> getFeatures() { return features; }
    public String getGithubUrl() { return githubUrl; }
    public String getLiveDemoUrl() { return liveDemoUrl; }
}
