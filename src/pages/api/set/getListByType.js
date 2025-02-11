
import pool from '../db';

export default async function getListByType(req, res) {
  const { type } = req.query;
  const query = `SELECT * FROM article_list WHERE type = ?`;
  const values = [type];

  try {
    const [rows] = await pool.query(query,values);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}