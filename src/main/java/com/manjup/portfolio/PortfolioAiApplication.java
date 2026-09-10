package com.manjup.portfolio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class PortfolioAiApplication {

	public static void main(String[] args) {
		SpringApplication.run(PortfolioAiApplication.class, args);
	}

}
