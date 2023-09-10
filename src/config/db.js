const { Pool } = require("pg");

let pool;
if (process.env.NODE_ENV === "production") {
  // Production database connection details from environment variables
  pool = new Pool({
    database: process.env.RDS_DB_NAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT,
    host: process.env.RDS_HOSTNAME,
  });
} else {
  // Development database connection details
  pool = new Pool({ database: process.env.PGDATABASE_DEV });
}

module.exports = pool;
