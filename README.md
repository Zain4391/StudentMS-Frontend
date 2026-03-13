# Student Management System (StudentMS) - Frontend

This project is the frontend client for the Student Management System (StudentMS), built using [Angular](https://angular.dev/) (version 21.1.1). It provides a comprehensive interface for managing students, teachers, courses, and enrollments.

## Features

- **Authentication:** Secure login and session management (Auth Guards & Interceptors).
- **Dashboard:** Overview and quick links to various management sections.
- **Student Management:** Add, edit, list, and view student records.
- **Teacher Management:** Add, edit, list, and view teacher personnel data.
- **Course Management:** Create, assign, and manage courses.
- **Enrollments & Grading:** Enroll students in courses and assign grades.

## Project Structure

The project follows a modular Architecture:

- `core/`: Application-wide singletons (Guards, Interceptors, Services, main Layout).
- `features/`: Domain-specific modules (Auth, Dashboard, Students, Teachers, Courses, Enrollment).
- `shared/`: Reusable, generic UI components (Toast, Confirm Dialog) and TS Interfaces/Models.

## Getting Started

### Prerequisites

- Node.js and npm installed.

### Development server

To start a local development server, run:

```bash
npm install
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Testing

To execute unit tests with [Vitest](https://vitest.dev/), use the following command:

```bash
ng test
```
