import pool from '../db';

export default async function updateArticle(req, res) {
  const  content  = req.body
  console.log('content: ', content);
  try {
    await pool.query('UPDATE article SET content = ? ', [content]);
    // console.log('article: ', article);
    res.status(200).json('success')
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
