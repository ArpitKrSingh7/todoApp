# Todo App

A RESTful Todo application built with **Express.js**, **TypeScript**, and **Prisma ORM** using **PostgreSQL** as the database.

## Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js v5
- **ORM:** Prisma v7
- **Database:** PostgreSQL
- **DB Adapter:** @prisma/adapter-pg

## Project Structure

```
├── prisma/
│   ├── schema.prisma          # Database schema definition
│   └── migrations/            # Database migration files
├── src/
│   ├── index.ts               # Express server entry point
│   ├── controllers/
│   │   ├── addUser.controller.ts   # User creation handler
│   │   ├── addTodo.controller.ts   # Todo creation handler
│   │   └── getTodos.controller.ts  # Fetch todos handler
│   ├── generated/prisma/      # Prisma generated client
│   └── lib/
│       └── prisma.ts          # Prisma client instance
├── prisma.config.ts           # Prisma configuration
├── tsconfig.json
└── package.json
```

## Database Schema

### User

| Column    | Type     | Constraints                 |
| --------- | -------- | --------------------------- |
| id        | Int      | Primary Key, Auto-increment |
| email     | String   | Unique                      |
| password  | String   |                             |
| createdAt | DateTime | Default: now()              |
| updatedAt | DateTime | Auto-updated                |

### Todo

| Column    | Type     | Constraints                 |
| --------- | -------- | --------------------------- |
| id        | Int      | Primary Key, Auto-increment |
| userId    | Int      | Foreign Key → User.id       |
| todo      | String   |                             |
| status    | Boolean  | Default: false              |
| createdAt | DateTime | Default: now()              |
| updatedAt | DateTime | Auto-updated                |

A **User** can have many **Todos**. Deleting a user cascades to their todos.

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL database

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd todoApp
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>"
   ```

4. **Run database migrations**

   ```bash
   npx prisma migrate dev
   ```

5. **Generate Prisma client**

   ```bash
   npx prisma generate
   ```

6. **Start the development server**

   ```bash
   npm run dev
   ```

   The server will start on **http://localhost:3000**.

## API Endpoints

### Create User

```
POST /adduser
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Response:**

```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "password": "yourpassword",
    "createdAt": "2026-02-26T00:00:00.000Z",
    "updatedAt": "2026-02-26T00:00:00.000Z"
  }
}
```

---

### Create Todo

```
POST /addtodo
```

**Request Body:**

```json
{
  "id": 1,
  "todo": "Buy groceries",
  "status": false
}
```

| Field  | Type    | Required | Description                        |
| ------ | ------- | -------- | ---------------------------------- |
| id     | number  | Yes      | User ID to associate the todo      |
| todo   | string  | Yes      | The todo text                      |
| status | boolean | No       | Completion status (default: false) |

**Response:**

```json
{
  "addedTodo": {
    "id": 1,
    "userId": 1,
    "todo": "Buy groceries",
    "status": false,
    "createdAt": "2026-02-26T00:00:00.000Z",
    "updatedAt": "2026-02-26T00:00:00.000Z"
  }
}
```

---

### Get Todos

```
GET /gettodos
```

**Request Body:**

```json
{
  "id": 1
}
```

| Field | Type   | Required | Description                |
| ----- | ------ | -------- | -------------------------- |
| id    | number | Yes      | User ID to fetch todos for |

**Response:**

```json
{
  "todos": [
    {
      "id": 1,
      "userId": 1,
      "todo": "Buy groceries",
      "status": false,
      "createdAt": "2026-02-26T00:00:00.000Z",
      "updatedAt": "2026-02-26T00:00:00.000Z"
    }
  ]
}
```

## Scripts

| Script        | Command                          | Description                             |
| ------------- | -------------------------------- | --------------------------------------- |
| `npm run dev` | `tsc -b && node ./dist/index.js` | Compiles TypeScript and runs the server |

## License

ISC
