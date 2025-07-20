import dotenv from 'dotenv'
dotenv.config();

module.exports = {
    migrationTable: 'pgmigrations',
    dir: 'migrations',
    direction: 'up',
    databaseUrl: process.env.DATABASE_URL
}