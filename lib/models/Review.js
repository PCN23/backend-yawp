const pool = require('../utils/pool');

class Review {
  id;
  detail;
  restaurant_id;
  stars;

  constructor(row) {
    this.id = row.user_id;
    this.detail = row.detail;
    this.restaurant_id = row.restaurant_id;
    this.stars = row.stars;
  }

  static async count() {
    const { rows } = await pool.query('SELECT COUNT(*) FROM review');
    return Number(rows[0].count);
  }

  static async insert({ detail, restaurant_id, stars, user_id }) {
    const { rows } = await pool.query(
      'INSERT INTO reviews(detail, restaurant_id, stars, user_id) VALUES ($1, $2, $3, $4) returning *;',
      [detail, restaurant_id, stars, user_id]
    );
    return new Review(rows[0]);
  }
}

module.exports = { Review };
