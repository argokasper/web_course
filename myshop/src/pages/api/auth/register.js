// See fail hakkab serveeerima endpoint'e nagu:
// 1. POST /api/auth/register - loob uue kasutaja
import bcrypt from 'bcrypt';
import { query } from '../../../lib/db';

const salt = '$2b$10$EqqC.fLoh1nfZtfSQPssJe';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, password_confirm } = req.body;

    if (!email) return res.status(422).json({ message: '`email` is not set' });
    if (password !== password_confirm) {
      return res.status(422).json({ message: 'Passwords do not match' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, salt);
      const response = await query('INSERT INTO users (email, password) VALUES(?, ?)', [
        email,
        hashedPassword,
      ]);

      if (response.affectedRows == 1) {
        const userResponse = await query('SELECT * FROM users WHERE id=?', [response.insertId]);
        return res.status(200).json({ user: userResponse[0] });
      }
      res.status(400).json({ message: 'Something went wrong' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    // HTTP status 405 METHOD_NOT_SUPPORTED
    res.status(405).end();
  }
}
