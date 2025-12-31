/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  serverExternalPackages: ['pg', 'pg-hstore', 'sequelize', 'sequelize-typescript'],
};

module.exports = nextConfig;
