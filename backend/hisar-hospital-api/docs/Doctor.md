### `doctor.md`
# Doctor API Spec

Spesifikasi ini mencakup endpoint untuk mengelola data dokter, terutama untuk penggunaan oleh admin.

---

## 1. Register Doctor
- **Endpoint**: `POST /api/doctors/register`
- **Description**: Mendaftarkan dokter baru ke sistem. Endpoint ini biasanya hanya dapat diakses oleh admin.
- **Request Body**:
  ```json
  {
    "firstName": "Dr. Siti",
    "lastName": "Aminah",
    "email": "siti.aminah@email.com",
    "password": "password-aman",
    "phone": "0876543210",
    "specialization": "Kardiologi",
    "experienceYears": 10,
    "qualification": "Sp.JP",
    "photoUrl": "[http://example.com/photo/siti.png](http://example.com/photo/siti.png)"
  }


- **Response Body**:
    ```json
    {
  "status": 201,
  "message": "Doctor registered successfully.",
  "data": {
    "id": "doctor-id-456",
    "identityNumber": "D-00456",
    "firstName": "Dr. Siti",
    "lastName": "Aminah",
    "email": "siti.aminah@email.com",
    "role": "DOCTOR",
    "status": "ACTIVE",
    "createdAt": "2025-08-11T09:00:00Z",
    "specialization": "Kardiologi",
    "experienceYear": 10,
    "qualification": "Sp.JP",
    "photoUrl": "[http://example.com/photo/siti.png](http://example.com/photo/siti.png)"
    }
  }
    ```

## 2. Get All Doctors

- **Endpoint** : ```GET /api/doctors```

- **Description** : Mengambil daftar semua pasien.

- **Response Body (Success, HTTP 200 OK)**:
```json
{
  "status": 200,
  "message": "Doctors retrieved successfully.",
  "data": [
    {
      "id": "doctor-id-456",
      "firstName": "Dr. Siti",
      "lastName": "Aminah",
      "specialization": "Kardiologi",
      "photoUrl": "[http://example.com/photo/siti.png](http://example.com/photo/siti.png)"
    }
  ]
}
```