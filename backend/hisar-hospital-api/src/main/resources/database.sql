CREATE TABLE user_table (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(50) NOT NULL,
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE doctor_table (
    user_id BIGINT PRIMARY KEY,
    specialization VARCHAR(255),
    experience_years INT,
    qualification VARCHAR(255),
    photo_url VARCHAR(512),
    CONSTRAINT fk_doctor_user FOREIGN KEY (user_id) REFERENCES user_table(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE patient_table (
    user_id BIGINT PRIMARY KEY,
    birth_date DATE,
    gender VARCHAR(50),
    blood_type VARCHAR(10),
    medical_history TEXT,
    insurance_number VARCHAR(100),
    address TEXT,
    CONSTRAINT fk_patient_user FOREIGN KEY (user_id) REFERENCES user_table(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE schedule_table (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    doctor_id BIGINT NOT NULL,
    day_of_week VARCHAR(20) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    available BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_schedule_doctor FOREIGN KEY (doctor_id) REFERENCES doctor_table(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;
