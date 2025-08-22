# User API Spec

Ini adalah spesifikasi untuk endpoint yang berkaitan dengan manajemen pengguna, seperti autentikasi.

---

## Login User
Endpoint ini digunakan untuk autentikasi pengguna dan mendapatkan token.

- **Endpoint**: `POST /api/users/login`
- **Description**: Mengautentikasi pengguna dengan email dan password.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "strong-password"
  }
- **Response Body (success, 200, OK)**:
```json
{
  "status": 200,
  "message": "Login successful.",
  "data": {
    "id": "user-id-123",
    "firstName": "Budi",
    "lastName": "Santoso",
    "email": "user@example.com",
    "role": "PATIENT",
    "status": "ACTIVE"
  }
}
```
- **Response Body (fail, 401, UNAUTHORIZED)**:
```json
{
  "status": 401,
  "message": "Invalid email or password.",
  "data": null
}
```

## 3. Get Doctor by ID

- **Endpoint**: ```GET /api/patients/{patientId}```

- **Description**: Mengambil data pasien berdasarkan ID.

- **Response Body (Success, HTTP 200 OK)**:
```json
{
  "status": 200,
  "message": "Doctor retrieved successfully.",
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
- **Response Body (Failed, HTTP 404 NOT FOUND)**:
```json
{
  "status": 404,
  "message": "Doctor with ID doctor-id-456 not found.",
  "data": null
}
```