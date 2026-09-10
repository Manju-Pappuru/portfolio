package com.manjup.portfolio.service;

import com.manjup.portfolio.dto.ContactRequest;
import com.manjup.portfolio.entity.ContactMessage;
import com.manjup.portfolio.repository.ContactRepository;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private final ContactRepository contactRepository;
    private final EmailNotificationService emailNotificationService;

    public ContactService(ContactRepository contactRepository, EmailNotificationService emailNotificationService) {
        this.contactRepository = contactRepository;
        this.emailNotificationService = emailNotificationService;
    }

    public void saveMessage(ContactRequest request) {
        contactRepository.save(new ContactMessage(request.name(), request.email(), request.message()));
        emailNotificationService.sendContactNotification(request.name(), request.email(), request.message());
    }
}
