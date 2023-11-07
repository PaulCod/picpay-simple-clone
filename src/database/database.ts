import mysql from 'mysql2/promise';

class Database {
  private pool: mysql.Pool

  constructor() {
    this.pool = mysql.createPool({
      host: process.env.HOST,
      user: process.env.USER_DB,
      password: process.env.PASSWORD_DB,
      database: process.env.DATABASE,
    });
  }

  async getConnection() {
    return await this.pool.getConnection();
  }
}

const db = new Database();

export default db;