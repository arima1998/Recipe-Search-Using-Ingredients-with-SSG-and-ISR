import mysql from "mysql2/promise";

let connection;

const db = {
  async getConnection() {
    if (!connection) {
      connection = await mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
      console.log("Database connected");
    }
    return connection;
  },
};

export default db;
