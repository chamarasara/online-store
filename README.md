# Online Store Application

This is a full-stack e-commerce application built using **Next.js**, **PostgreSQL**, **Sequelize ORM**, **Redux Toolkit**, and **Tailwind CSS**.  
The application supports product listing, cart management, checkout with transaction safety, and basic admin features.

---

## Technology Stack

### Frontend
- Next.js (App Router)
- React
- Redux Toolkit (state management)
- Tailwind CSS (styling)

### Backend
- Next.js API Routes
- PostgreSQL (relational database)
- Sequelize ORM
- Database transactions & row locking

---

## Prerequisites

Make sure the following are installed on your machine:

- Node.js (v18 or later)
- PostgreSQL
- Yarn
- Docker & Docker Compose (optional)

---

## Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/chamarasara/online-store
cd online-store
```

---

### 2️⃣ Install Dependencies

```bash
yarn install
```

---

### 3️⃣ Environment Configuration

Create a `.env` file in the project root:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_NAME=online_store
DB_USER=postgres
DB_PASSWORD=casper@buster
```

---

### 4️⃣ Database Setup

```bash
psql -U postgres -c "CREATE DATABASE online_store;"
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

---

## ▶️ Running the Application

```bash
yarn dev
```

Visit: http://localhost:3000

---

## Author

**Chamara Sarathchandra**  
Senior Full-Stack Developer
