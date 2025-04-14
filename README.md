# Mi Patito Store

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

## Project Structure

### Backend
The backend handles server-side logic, database interactions, and API endpoints. It is built with Node.js, TypeScript, Prisma, and Express.js. The structure includes:
- **Controllers**: Manage request handling.
- **Lib**: Shared libraries or utilities.
- **Models**: Define database models.
- **Repositories**: Handle database queries.
- **Routes**: Define API endpoints.
- **Services**: Contain business logic, organized into submodules like `packaging` and `pricing`.
- **Utils**: General-purpose utility functions.

Below is the file structure:

```
/backend
├── prisma
├── src
│   ├── controllers
│   ├── lib
│   ├── models
│   ├── repositories
│   ├── routes
│   ├── services
│   │   ├── packaging
│   │   │   ├── interfaces
│   │   │   └── strategies
│   │   └── pricing
│   │       ├── interfaces
│   │       ├── rules
│   │       └── strategies
│   └── utils
```

### Frontend
The frontend provides a user-friendly interface for managing inventory and interacting with the application. It is built with React, TypeScript, Vite, and Tailwind CSS. The structure includes:
- **Components**: Reusable UI components, such as `ducks-table` and `ui`.
- **Constants**: Application-wide constants.
- **Hooks**: Custom React hooks.
- **Interfaces**: TypeScript interfaces for type definitions.
- **Lib**: Shared libraries or utilities.
- **Models**: Data models for the frontend.
- **Pages**: Application pages.
- **Schemas**: Validation schemas using Zod.
- **Services**: Handle API calls.
- **Utils**: General-purpose utility functions.

Below is the file structure:

```
/frontend
├── public
│   └── vite.svg
└── src
    ├── index.css
    ├── components
    │   ├── ducks-table
    │   └── ui
    ├── constants
    ├── hooks
    ├── interfaces
    ├── lib
    ├── models
    ├── pages
    ├── schemas
    ├── services
    └── utils
```

## Installation Guide

### Backend
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
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