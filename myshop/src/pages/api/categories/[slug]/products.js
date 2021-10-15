// See fail hakkab serveeerima endpoint'e nagu:
// 1. GET /api/categories/[slug]/products - Väljastab kõik tooted, mis on kategooria küljes

import { query } from '../../../../lib/db';

export default async function handler(req, res) {
    const { slug } = req.query;
    if (req.method === 'GET') {
        try {
            const categoryResponse = await query('SELECT * FROM categories WHERE slug = ?', [slug]);
            const category = categoryResponse[0];
            if (category) {
                const products = await query(`
                    SELECT products.* FROM products
                        INNER JOIN products_categories ON products_categories.product_id = products.id
                        WHERE products_categories.category_id = ?;
                `, [category.id]);
                return res.status(200).json({ category, products });
            }
            return res.status(404).end();
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    } else {
        // HTTP status 405 METHOD_NOT_SUPPORTED
        res.status(405).end();
    }
}
