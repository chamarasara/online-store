🛒 Online Store Application

This is a full-stack e-commerce application built using Next.js, PostgreSQL, Sequelize ORM, Redux Toolkit, and Tailwind CSS.
The application supports product listing, cart management, checkout with transaction safety, and basic admin features.

🧰 Technology Stack

Frontend

Next.js (App Router)

React

Redux Toolkit (state management)

Tailwind CSS (styling)

Backend

Next.js API Routes

PostgreSQL (relational database)

Sequelize ORM

Database transactions & row locking

📋 Prerequisites

Make sure the following are installed on your machine:

Node.js (v18 or later)

PostgreSQL

yarn

Docker & Docker Compose (if running via Docker)

⚙️ Setup Instructions

1️⃣ Clone the Repository
``bash git clone https://github.com/chamarasara/online-store
cd online-store

2️⃣ Install Dependencies
yarn install

3️⃣ Environment Configuration

Create a .env file in the project root:

DB_HOST=localhost
DB_PORT=5432
DB_NAME=online_store
DB_USER=postgres
DB_PASSWORD=casper@buster


Update the values based on your PostgreSQL configuration.

4️⃣ Database Setup

Create the PostgreSQL database:

CREATE DATABASE online_store;


Run Sequelize sync (if auto-sync is enabled) or migrations if configured:

npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

▶️ Running the Application
Option 1: Development Server
yarn dev


The application will be available at:

http://localhost:3000

Option 2: Using Docker

Build Docker images

docker-compose build


Run Docker containers

docker-compose up


Stop containers

docker-compose down

🔗 Available Routes

User

/ – Product listing

/checkout – Checkout page

/order-confirmation – Order success page

Admin

/admin – Dashboard

/admin/orders – Order list

🔐 Key Technical Highlights

Concurrency-safe checkout using database transactions

Row-level locking to prevent overselling

Redux Toolkit for predictable state management

Paginated admin order list

Responsive UI using Tailwind CSS

🧪 API Overview
Method	Endpoint	Description
GET	/api/products	Get all products
POST	/api/orders	Place an order
GET	/api/admin/orders	Get paginated orders
GET	/api/admin/dashboard	Admin dashboard metrics
👨‍💻 Author

Chamara Sarathchandra
Senior Full-Stack Developer
