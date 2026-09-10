package com.manjup.portfolio.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class EmailNotificationService {

    private static final Logger log = LoggerFactory.getLogger(EmailNotificationService.class);

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Value("${app.notification-email:manju.pappuru678@gmail.com}")
    private String recipientEmail;

    @Value("${spring.mail.username:}")
    private String mailUsername;

    @Async
    public void sendContactNotification(String name, String email, String message) {
        log.info("Incoming contact message from: {} <{}>", name, email);

        if (mailSender == null || mailUsername == null || mailUsername.isBlank()) {
            log.info("Email notification skipped: SMTP not configured yet. (Set MAIL_USERNAME and MAIL_PASSWORD in .env)");
            return;
        }

        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(mailUsername);
            mailMessage.setTo(recipientEmail);
            mailMessage.setSubject("📬 New Portfolio Contact from " + name);
            mailMessage.setText("""
                    Hello Manju,
                    
                    You have received a new message from your portfolio website!
                    
                    ------------------------------------------
                    👤 Sender Name: %s
                    📧 Sender Email: %s
                    ⏰ Time: %s
                    ------------------------------------------
                    💬 Message:
                    %s
                    ------------------------------------------
                    
                    You can reply directly to %s.
                    """.formatted(
                    name,
                    email,
                    LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")),
                    message,
                    email
            ));

            mailSender.send(mailMessage);
            log.info("Email notification successfully dispatched to {}", recipientEmail);
        } catch (Exception e) {
            log.warn("Failed to send email notification to {}: {}", recipientEmail, e.getMessage());
        }
    }
}
