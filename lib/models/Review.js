const pool = require('../utils/pool');

class Review {
  id;
  detail;
  restaurant_id;

  constructor(row) {
    this.id = row.id;
    this.detail = row.detail;
    this.restaurant_id = row.restaurant_id;
  }

  static async count() {
    const { rows } = await pool.query('SELECT COUNT(*) FROM review');
    return Number(rows[0].count);
  }
    
  static async insert() {}
}

module.exports = { Review };
