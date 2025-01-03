
import pool from '../db';

export default async function getListByType(req, res) {
  const { type } = req.query;
  const query = `SELECT * FROM article_list WHERE type = ?`;
  console.log('query: ', query);
  const values = [type];
  console.log('values: ', values);

  try {
    const [rows] = await pool.query(query,values);
    console.log('await pool.query(query,values): ', await pool.query(query,values));
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }

}