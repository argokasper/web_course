// See fail hakkab serveeerima endpoint'e nagu:
// 1. POST /api/auth/logout - logib välja kasutaja (kustutab ära cookoe)
import Cookies from 'cookies';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const cookies = new Cookies(req, res);
    cookies.set('auth_session');
    res.status(200).end();
  } else {
    // HTTP status 405 METHOD_NOT_SUPPORTED
    res.status(405).end();
  }
}
