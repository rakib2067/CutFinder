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
    ssl: {
      // Enable SSL/TLS encryption
      rejectUnauthorized: false, // Set to true to reject self-signed certificates
    },
  });
} else {
  // Development database connection details
  pool = new Pool({ database: process.env.PGDATABASE_DEV });
}

async function connectToPg() {
  try {
    const client = await pool.connect();
    await client.query("SELECT * FROM users;");
    client.release();
  } catch (err) {
    console.log("Error connecting to PG: ", err);
  }
}

connectToPg();
module.exports = pool;
