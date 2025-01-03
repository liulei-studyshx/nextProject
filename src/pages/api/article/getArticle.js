import pool from '../db';

export default async function getArticle(req, res) {
  const { id } = req.query
  try {
    const [article] = await pool.query('SELECT * FROM article WHERE id = 1;', [id]);
    res.status(200).json(article)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}