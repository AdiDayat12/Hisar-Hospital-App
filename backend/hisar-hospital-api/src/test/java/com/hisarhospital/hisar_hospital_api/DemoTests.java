package com.hisarhospital.hisar_hospital_api;

import org.junit.jupiter.api.Test;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class DemoTests {

	public static void main(String[] args) {
		SpringApplication.run(Demo.class, args);
	}

}
