const pool = require('../utils/pool');

class Restaurant {
  id;
  name;
  flavor;
  city;
  state;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.flavor = row.flavor;
    this.city = row.city;
    this.state = row.state;
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM restaurants;');
    return rows.map((row) => new Restaurant(row));
  }
}

module.exports = { Restaurant };
