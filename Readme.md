# Medium Poor Copy

A simplified clone of Medium.

## Tech Stack

- **TypeScript** – For type-safe code.
- **NodeJS** – Server-side JavaScript runtime.
- **Hono** – Fast, minimal web framework.
- **PostgreSQL** – Relational database for storage.
- **Prisma** – Database ORM for TypeScript and NodeJS.
- **Cloudflare** – For serverless deployment.

## Final Project URL

You can access the live version of the project at: [_here_](https://medium-poor-copy.cloudflare.app)

## Features

- User authentication (Sign-up, login)
- Post articles
- View and browse articles
- Edit existing articles

## Installation

Follow these steps to run the project locally:

### Prerequisites

- **NodeJS** (v16 or above)
- **PostgreSQL** (v13 or above)
- **Prisma** CLI

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/pantharshit007/medium-poor-copy.git
   cd medium-poor-copy
   ```

2. **Install dependencies**:

   ```bash
   cd ./backend
   npm install
   ```

   ```bash
   cd ./frontend
   npm install
   ```

3. **Set up environment variables**:

   - Create a `.env`and `wrangler.toml` file and add your configuration for backend:

   > wrangle.toml

   ```env
    DATABASE_URL=<accelerate URL>
    JWT_SECRET = "secret"
    CORS_ORIGIN = <FE URL>
   ```

   > .env

   ```env
   DATABASE_URL = <DB URL>
   ```

   - For Frontend

   ```env
   VITE_BASE_URL = http://localhost:5173/ || <YOUR BACKEND URL>
   ```

4. **Set up the database**:

   Initialize Prisma and run the migrations to create the necessary tables:

   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**:

   ```bash
   npm run dev
   ```

6. **Access the app**:

   Open your browser and go to:

   ```
   http://localhost:5173
   ```

## Deployment

This project can be deployed on **Cloudflare Workers** or any serverless platform compatible with Hono.

---
