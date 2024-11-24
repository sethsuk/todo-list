import { Pool } from "pg";

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'task', 
  password: 'password',
  port: 5432,
});

module.exports = pool;
