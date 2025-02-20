Link báo cáo đồ án: https://docs.google.com/document/d/1vLZ_1sXBTeKcbMaW8-z6C1DIBSAPJaOAAU9ApaNVPdk/edit?usp=sharing
# Hired-hub Website

## Introduction
The Hired-hub Website is a web application that connects job seekers with employers. The backend is built using Spring Boot, while the frontend is developed using React.

## Features
- User authentication (Job Seekers & Employers)
- Job posting and management (Employers)
- Job search and application (Job Seekers)
- User profiles with resumes and skill sets
- Notifications for job applications
- Admin dashboard for managing users and job postings

## Tech Stack
### Backend (Spring Boot)
- Spring Boot
- Spring Security (JWT Authentication)
- Spring Data JPA
- MySQL (Database)
- Redis (Cache)
- MinIO (File Storage)
- Lombok
- MapStruct

### Frontend (React)
- React.js (Vite/CRA)
- Redux Toolkit (State Management)
- React Router (Navigation)
- Ant Design (Styling)
- Axios (API Calls)
- React Hook Form & Yup (Form Validation)

## Installation

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Ng-TTam/hired-hub.git
   cd /hired-hub-be
   ```
2. Configure the database in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/hired_hub?createDatabaseIfNotExist=true
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```
3. Run the backend:
   ```bash
   mvn spring-boot:run
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../hired-hub-fe
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm run dev
   ```