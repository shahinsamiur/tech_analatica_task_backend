# Project Name

A backend API built using **NestJS**, **Prisma**, and **JWT Authentication**.

---

## Tech Stack

- **Framework:** NestJS
- **Language:** TypeScript
- **Database:** PostgreSQL (Prisma ORM)
- **Authentication:** JWT (JSON Web Token)
- **Validation:** class-validator
- **Security:** Helmet, Rate Limiting

---

## Installation

```bash
git clone <your-repo-link>
cd <project-folder>
npm install
```

⚙️ Environment Setup

Create a .env file in the root:
PORT=3000

DATABASE_URL="your_database_connection_string"

JWT_SECRET="your_secret_key"
Database Setup (Prisma)

1. Generate Prisma Client
   npx prisma generate
2. Run Migrations
   npx prisma migrate dev
3. (Optional) Open Prisma Studio
   npx prisma studio
   Run the Project
   npm run start:dev
   npm run build
   npm run start:prod
