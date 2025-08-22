### `patient.md`
```markdown ```
# Patient API Spec

Endpoints to handle CRUD operations

---

## 1. Register Patient
- **Endpoint**: `POST /api/patients/register`
- **Description**: Register new user (patient) to system.
- **Request Body**:
  ```json
  {
    "firstName": "Budi",
    "lastName": "Santoso",
    "email": "budi.santoso@email.com",
    "password": "password-yang-aman",
    "phone": "08123456789",
    "birthDate": "1990-05-20",
    "gender": "MALE",
    "address": "Jl. Merdeka No. 10"
  } 
  ```
- **Response Body (success, 201, CREATED)**:
```json
{
  "status": 201,
  "message": "Patient registered successfully.",
  "data": {
    "id": "patient-id-123",
    "identityNumber": "P-00123",
    "firstName": "Budi",
    "lastName": "Santoso",
    "email": "budi.santoso@email.com",
    "role": "PATIENT",
    "status": "ACTIVE",
    "createdAt": "2025-08-11T09:00:00Z",
    "birthDate": "1990-05-20",
    "gender": "MALE",
    "address": "Jl. Merdeka No. 10"
  }
}
```
- **Response Body (fail, 400, BAD REQUEST)**:
```json
{
  "status": 400,
  "message": "Error message",
  "data": null
}
```

## 2. Get All Patients

- **Endpoint** : ```GET /api/patients```

- **Description** : Mengambil daftar semua pasien.

- **Response Body (Success, HTTP 200 OK)**:
```json
{
  "status": 200,
  "message": "Patients retrieved successfully.",
  "data": [
    {
      "id": "patient-id-123",
      "firstName": "Budi",
      "lastName": "Santoso",
      "email": "budi.santoso@email.com",
      "role": "PATIENT",
      "status": "ACTIVE"
    }
  ]
}
```
## 3. Get Patient by ID

- **Endpoint**: ```GET /api/patients/{patientId}```

- **Description**: Mengambil data pasien berdasarkan ID.

- **Response Body (Success, HTTP 200 OK)**:
```json
{
  "status": 200,
  "message": "Patient retrieved successfully.",
  "data": {
    "id": "patient-id-123",
    "identityNumber": "P-00123",
    "firstName": "Budi",
    "lastName": "Santoso",
    "email": "budi.santoso@email.com",
    "role": "PATIENT",
    "status": "ACTIVE",
    "createdAt": "2025-08-11T09:00:00Z",
    "birthDate": "1990-05-20",
    "gender": "MALE",
    "address": "Jl. Merdeka No. 10"
  }
}
```
- **Response Body (Failed, HTTP 404 NOT FOUND)**:
```json
{
  "status": 404,
  "message": "Patient with ID patient-id-123 not found.",
  "data": null
}
```
## 4. Update Patient

- **Endpoint**: ```PUT /api/patients/{patientId}```

- **Description**: Memperbarui data pasien.

- **Request Body**:
```json
{
  "firstName": "Budi",
  "lastName": "Susanto",
  "phone": "081122334455"
}
```
- **Response Body (Success, HTTP 200 OK)**:
```json
{
  "status": 200,
  "message": "Patient updated successfully.",
  "data": {
    "id": "patient-id-123",
    "firstName": "Budi",
    "lastName": "Susanto",
    "phone": "081122334455",
    "updatedAt": "2025-08-11T10:30:00Z"
  }
}
```
## 5. Delete Patient

- **Endpoint**: ```DELETE /api/patients/{patientId}```

- **Description**: Menghapus pasien dari sistem.

- **Response Body (Success, HTTP 200 OK)**:
```json
{
  "status": 200,
  "message": "Patient deleted successfully.",
  "data": null
}
```