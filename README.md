# Mi Patito Store

![screenshot](https://i.ibb.co/HT6CMZw1/573-1x-shots-so.png)

## Project Description
Mi Patito Store is a full-stack e-commerce application designed to manage and sell duck-related products. The project is divided into two main parts:

- **Backend**: Handles server-side logic, database interactions, and APIs.
- **Frontend**: Provides a user-friendly interface for managing inventory and interacting with the application.

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime for building the server-side application.
- **TypeScript**: Strongly typed programming language for better code quality.
- **Prisma**: ORM for database management and migrations.
- **Express.js**: Web framework for building RESTful APIs.
- **Docker**: Containerization for consistent development and deployment environments.

### Frontend
- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Strongly typed programming language for better code quality.
- **Vite**: Fast build tool for modern web projects.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Zod**: Schema validation for form inputs.

## Features
- Inventory management for ducks (add, edit, delete, and list).
- Dynamic price calculation based on quantity, package type, and shipping method.
- Responsive user interface built with React, Tailwind CSS, and Vite.
- Form validation using react-hook-form and Zod.
- Full integration between backend and frontend.

## Installation Guide

### Backend

1. **Navigate to the backend directory**:
   ```bash
   cd mi-patito-store/backend
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the database**:
   - Ensure Docker is installed and running.
   - Start the database using Docker Compose:
     ```bash
     docker-compose up -d
     ```

4. **Run database migrations**:
   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

### Frontend
1. **Navigate to the frontend directory**:
   ```bash
   cd mi-patito-store/frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open your browser and navigate to `http://localhost:5173`.