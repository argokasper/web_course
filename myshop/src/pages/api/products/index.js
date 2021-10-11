// See fail hakkab serveeerima endpoint'e nagu:
// 1. GET /api/products - Väljastab kõik tooted
// 2. POST /api/products - Loob ühe toote andmebaasi

import { query } from '../../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const products = await query('SELECT * FROM products;');
            res.status(200).json({ products });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    } else if (req.method === 'POST') {
        res.status(200).json({ message: 'Uus toode listud' });
    } else {
        // HTTP status 405 METHOD_NOT_SUPPORTED
        res.status(405).end();
    }
}
