// See fail hakkab serveeerima endpoint'e nagu:
// 1. POST /api/auth/login - logib sisse kasutaja emaili ning parooli järgi
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import Cookies from 'cookies';

import { query } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email) return res.status(422).json({ message: '`email` is not set' });
    if (!password) {
      return res.status(422).json({ message: '`password` is not set' });
    }

    try {
      const userResponse = await query('SELECT * FROM users WHERE email=?', [
        email,
      ]);
      const user = userResponse[0];
      if (user) {
        const passwordOk = await bcrypt.compare(password, user.password);
        if (passwordOk) {
          delete user.password;
          const token = crypto.randomBytes(16).toString('hex');
          const cookies = new Cookies(req, res);
          cookies.set('auth_session', token, {
            maxAge: 60 * 60 * 24 * 10, // 10 päeva
            httpOnly: true,
          });
          return res.status(200).json({ user, token });
        }
      }
      res.status(401).end();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    // HTTP status 405 METHOD_NOT_SUPPORTED
    res.status(405).end();
  }
}
