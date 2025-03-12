# Remix Classic Chat

## Description

This project is a simple chat between two users, built using:

- ![Remix](https://img.shields.io/badge/Remix-v2.15.2-000?logo=remix&logoColor=white)
- ![Drizzle ORM](https://img.shields.io/badge/Drizzle%20ORM-v0.39.3-8B5CF6?logo=drizzle&logoColor=white)
- ![Express](https://img.shields.io/badge/Express-v4.19.2-000?logo=express&logoColor=white)
- ![React](https://img.shields.io/badge/React-v18.2.0-61DAFB?logo=react&logoColor=black)
- ![TypeScript](https://img.shields.io/badge/TypeScript-v5.7.3-3178C6?logo=typescript&logoColor=white)
- ![Node.js](https://img.shields.io/badge/node.js-v5.7.3-3178C6?logo=Node.js&logoColor=white)

## Requirements
- [Node.js >=18.0.0](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (if using Docker for PostgreSQL)

## Installation
```sh
npm install
# or
yarn install
```

## Setup Before Running
Before running (building) the project, you need to:
1. Copy the `.env.example` file to `.env` and set the environment variables.
2. (Optional) If you want to run PostgreSQL via Docker, start the PostgreSQL service with Docker Compose:
   ```sh
   docker compose --env-file .env up -d
   ```
3. Generate migrations if they do not exist:
   ```sh
   npm run migration:generate
   ```
4. Apply migrations:
   ```sh
   npm run migration:run
   ```

## Scripts

- **Build the project:**
  ```sh
  npm run build
  ```
  Compiles the project using Remix Vite.

- **Run in development mode:**
  ```sh
  npm run dev
  ```
  Starts the development server via `tsx server/index.ts`.

- **Run the server in production:**
  ```sh
  npm run start
  ```
  Runs the compiled server with `NODE_ENV=production`.

- **TypeScript type checking:**
  ```sh
  npm run typecheck
  ```
  Runs `tsc` to check TypeScript types.

- **Code linting:**
  ```sh
  npm run lint
  ```
  Checks code with ESLint, ignoring files from `.gitignore`.

- **Generate migrations:**
  ```sh
  npm run migration:generate
  ```
  Generates database migrations using Drizzle ORM.

- **Apply migrations:**
  ```sh
  npm run migration:run
  ```
  Applies database migrations.

- **Run seed scripts:**
  ```sh
  npm run seed:run
  ```
  Executes the database seeding script with initial data.

