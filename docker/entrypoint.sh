#!/bin/sh
set -e

# Wait for DB to be ready
echo "Waiting for database..."
until nc -z $DB_HOST $DB_PORT; do
  sleep 1
done

echo "Database ready! Running migrations and seeders..."

# Run migrations
npx npx sequelize-cli db:migrate --config ./sequelize.config.cjs --env production

# Run seeders
npx sequelize-cli db:seed:all --config ./sequelize.config.cjs --env production

# Start app
echo "Starting Next.js app..."
yarn start
