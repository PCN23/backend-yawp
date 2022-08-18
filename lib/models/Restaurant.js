const pool = require('../utils/pool');

class Restaurant {
  id;
  name;
  flavor;
  city;
  state;
  reviews;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.flavor = row.flavor;
    this.city = row.city;
    this.state = row.state;
    this.reviews = row.reviews || [];
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM restaurants;');
    return rows.map((row) => new Restaurant(row));
  }
  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT restaurants.*, 
      COALESCE (
        json_agg(to_jsonb(reviews))
        FILTER (WHERE reviews.id IS NOT NULL), '[]'
      ) AS reviews
      FROM restaurants
      LEFT JOIN reviews
      ON reviews.restaurant_id = restaurants.id
      WHERE restaurants.id = $1
      GROUP BY restaurants.id`, [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Restaurant(rows[0]);
  }
  
}

module.exports = { Restaurant };
