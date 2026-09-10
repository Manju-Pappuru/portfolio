package com.manjup.portfolio.dto;

import jakarta.validation.constraints.NotBlank;

public record ChatRequest(@NotBlank(message = "Message is required") String message) {
}
