package com.manjup.portfolio.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.Locale;

@Service
public class AIService {

    @Value("${google.ai.api-key:}")
    private String geminiApiKey;

    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(6))
            .build();

    private static final String RESUME_CONTEXT = """
            You are a helpful and professional AI assistant for Manju Pappuru's developer portfolio.
            Manju's Profile Details:
            - Name: Manju Pappuru (She/Her)
            - Role: Software Engineer | Full Stack Developer | Java Developer
            - Location: Tadipatri, Andhra Pradesh, India
            - Education:
              * B.Tech in Computer Science and Engineering at Srinivasa Ramanujan Institute of Technology (2023 - Present) - CGPA: 9.06 / 10.00
              * Intermediate at Sri C.V. Raman Jr College (2021 - 2023) - 98.30%
              * SSC at J.H.R. M.P Girls High School (2020 - 2021) - 99.33%
            - Technical Skills:
              * Programming Languages: Core Java, JavaScript
              * Java & Core Concepts: OOP, Collections, Exception Handling, Data Structures, Algorithms, Recursion, Backtracking, Dynamic Programming, Linked Lists
              * Frontend: HTML5, CSS3, JavaScript, React.js
              * Backend: Node.js, Express.js, Spring Boot, REST APIs, JWT, Bcrypt
              * Databases: MySQL, MongoDB, H2
              * Tools: Git, GitHub, VS Code, Postman
            - Projects:
              1. Freelance Finder Application: Full-stack platform connecting freelancers and clients with role-based dashboards, secure JWT authentication, CRUD operations, and responsive UI (MongoDB, Express, React, Node.js).
              2. Anonymous Mental Health and Stress Support Portal: Anonymous student & counselor platform with real-time chat, JWT auth, Bcrypt encryption, issue tracking, and Gemini AI integration.
            - Certifications:
              * Full Stack Development (MERN) - SmartBridge Educational Services Pvt. Ltd.
              * ServiceNow Certified System Administrator (CSA)
              * ServiceNow Certified Application Developer (CAD)
            - Key Achievements:
              * Solved 360+ Data Structures & Algorithms problems on LeetCode.
              * State-level Hackathon Runner-up organized by GATTS Institute of Technology, Gooty.
              * Elite Academic Excellence Award at Sri C.V. Raman Jr College.
            - Contact:
              * Email: manju.pappuru678@gmail.com
              * Phone: +91 6305987268
              * GitHub: https://github.com/Manju-Pappuru
              * LinkedIn: https://www.linkedin.com/in/manju-pappuru-3698762bb/
            - Availability: Open to Software Engineering, Full Stack, and Java developer roles.
            
            Always refer to Manju with female pronouns (she/her/hers). Answer concisely, friendly, and accurately based on Manju's background.
            """;

    public String answer(String message) {
        if (message == null || message.trim().isEmpty()) {
            return "Hello! I am Manju's AI assistant. Ask me anything about her projects, skills, education, or experience!";
        }

        // 1. Try Gemini API if key is provided
        if (geminiApiKey != null && !geminiApiKey.isBlank()) {
            try {
                String geminiResponse = callGeminiApi(message);
                if (geminiResponse != null && !geminiResponse.isBlank()) {
                    return geminiResponse;
                }
            } catch (Exception ignored) {
                // Smooth fallback to local semantic knowledge engine on network/key issue
            }
        }

        // 2. Intelligent Grounded Semantic Matcher
        return generateGroundedResponse(message.trim());
    }

    private String callGeminiApi(String userPrompt) throws Exception {
        String endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + geminiApiKey;

        String combinedPrompt = RESUME_CONTEXT + "\n\nUser Question: " + userPrompt;
        String escapedPrompt = combinedPrompt.replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "");

        String requestBody = "{\"contents\":[{\"parts\":[{\"text\":\"" + escapedPrompt + "\"}]}]}";

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(endpoint))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .timeout(Duration.ofSeconds(6))
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() == 200) {
            String body = response.body();
            // Extract text from JSON response
            int textIndex = body.indexOf("\"text\": \"");
            if (textIndex != -1) {
                int start = textIndex + 9;
                int end = body.indexOf("\"", start);
                if (end != -1) {
                    return body.substring(start, end)
                            .replace("\\n", "\n")
                            .replace("\\\"", "\"")
                            .replace("\\\\", "\\");
                }
            }
        }
        return null;
    }

    private String generateGroundedResponse(String query) {
        String q = query.toLowerCase(Locale.ROOT);

        // Greetings & Introductions
        if (matches(q, "hi", "hello", "hey", "who are you", "what can you do", "help")) {
            return "Hi there! 👋 I am Manju's AI Assistant. You can ask me about her tech stack, 360+ LeetCode problems, full-stack projects, education & CGPA, certifications, or how to contact her.";
        }

        // Contact & Availability
        if (matches(q, "contact", "email", "phone", "call", "reach", "hire", "available", "opportunity", "github", "linkedin")) {
            return "You can contact Manju directly via email at manju.pappuru678@gmail.com or phone at +91 6305987268. You can also explore her GitHub (https://github.com/Manju-Pappuru) and LinkedIn (https://www.linkedin.com/in/manju-pappuru-3698762bb/). She is available for Software Engineering opportunities!";
        }

        // Projects
        if (matches(q, "project", "work", "built", "portfolio", "freelance", "mental health", "portal")) {
            return "Manju has built two flagship full-stack projects:\n" +
                    "1. Freelance Finder Application: A MERN stack platform for freelancer/client collaboration with role-based dashboards, JWT auth, and CRUD operations.\n" +
                    "2. Anonymous Mental Health Support Portal: A secure support system featuring real-time chat, Bcrypt encryption, issue tracking, and Gemini AI integration.";
        }

        // LeetCode / DSA / Problem Solving
        if (matches(q, "leetcode", "dsa", "data structure", "algorithm", "problem", "solve", "competitive")) {
            return "Manju has solved over 360+ Data Structures & Algorithms problems on LeetCode covering Linked Lists, Dynamic Programming, Recursion, Backtracking, Trees, Graphs, Sorting, and Searching.";
        }

        // Core Java & Backend
        if (matches(q, "java", "spring", "backend", "node", "express", "api", "rest", "jwt", "oop")) {
            return "In backend engineering, Manju is proficient in Core Java (OOP, Collections, Exception Handling, Data Structures) as well as Node.js, Express.js, Spring Boot, RESTful API design, and secure JWT authentication.";
        }

        // Frontend & UI
        if (matches(q, "react", "frontend", "ui", "ux", "html", "css", "javascript", "web")) {
            return "On the frontend, Manju specializes in React.js, modern JavaScript (ES6+), HTML5, CSS3, responsive design systems, and seamless REST API integrations.";
        }

        // Databases
        if (matches(q, "database", "sql", "mysql", "mongodb", "h2", "db", "nosql")) {
            return "Manju has hands-on database experience with relational databases (MySQL, H2) and document-oriented NoSQL databases (MongoDB), designing normalized schemas and efficient queries.";
        }

        // Education & Academics
        if (matches(q, "education", "degree", "college", "school", "cgpa", "marks", "percentage", "srit", "btech", "b.tech", "study")) {
            return "Manju is pursuing B.Tech in Computer Science and Engineering at Srinivasa Ramanujan Institute of Technology (CGPA: 9.06/10.00). She completed Intermediate with 98.30% and SSC with 99.33%.";
        }

        // Certifications
        if (matches(q, "certification", "certificate", "servicenow", "csa", "cad", "smartbridge", "mern")) {
            return "Manju holds three recognized certifications:\n" +
                    "1. Full Stack Development (MERN) from SmartBridge Educational Services\n" +
                    "2. ServiceNow Certified System Administrator (CSA)\n" +
                    "3. ServiceNow Certified Application Developer (CAD).";
        }

        // Hackathon & Awards
        if (matches(q, "hackathon", "achievement", "award", "honor", "gatts", "prize")) {
            return "Manju's achievements include being the Runner-up at a state-level Hackathon organized by GATTS Institute of Technology, Gooty, solving 360+ DSA problems on LeetCode, and winning an Elite Academic Excellence Award.";
        }

        // Skills / Stack general
        if (matches(q, "skill", "tech", "technology", "stack", "tool", "know", "language")) {
            return "Manju's technical skillset includes Core Java, JavaScript, React.js, Node.js, Express.js, REST APIs, JWT, MySQL, MongoDB, Git, GitHub, VS Code, Postman, and Data Structures & Algorithms.";
        }

        // Location
        if (matches(q, "location", "live", "where", "city", "state", "place", "address")) {
            return "Manju is based in Tadipatri, Andhra Pradesh, India.";
        }

        // Default Comprehensive Profile Summary
        return "Manju Pappuru is a Software Engineer and Full Stack Developer with strong foundations in Core Java, React.js, Node.js, REST APIs, SQL, and 360+ LeetCode DSA problems solved. Feel free to ask specifically about her projects, skills, education, or contact info!";
    }

    private boolean matches(String query, String... keywords) {
        for (String kw : keywords) {
            if (query.contains(kw)) {
                return true;
            }
        }
        return false;
    }
}
