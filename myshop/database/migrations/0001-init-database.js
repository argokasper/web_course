module.exports = [
    // `CREATE TABLE IF NOT EXISTS products (
    //     id INT AUTO_INCREMENT PRIMARY KEY,
    //     title TEXT NOT NULL,
    //     price DECIMAL NOT NULL,
    //     reduced_price DECIMAL NOT NULL,
    //     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    //     updated_at
    //     TIMESTAMP
    //     NOT NULL
    //     DEFAULT CURRENT_TIMESTAMP
    //     ON UPDATE CURRENT_TIMESTAMP
    // )`,
    // `CREATE TABLE IF NOT EXISTS categories (
    //     id INT AUTO_INCREMENT PRIMARY KEY,
    //     name TEXT NOT NULL,
    //     description TEXT NOT NULL,
    //     parent_id INT UNSIGNED NOT NULL,
    //     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    //     updated_at
    //     TIMESTAMP
    //     NOT NULL
    //     DEFAULT CURRENT_TIMESTAMP
    //     ON UPDATE CURRENT_TIMESTAMP
    // )`,
    // `CREATE TABLE IF NOT EXISTS products_categories (
    //     product_id INT,
    //     category_id INT,
    //     PRIMARY KEY (product_id, category_id),
    //     CONSTRAINT fk_pc_product_id FOREIGN KEY (product_id) REFERENCES products(id),
    //     CONSTRAINT fk_pc_category_id FOREIGN KEY (category_id) REFERENCES categories(id)
    // )`,
    // `CREATE TABLE IF NOT EXISTS users (
    //     id INT AUTO_INCREMENT PRIMARY KEY,
    //     email VARCHAR(60) NOT NULL,
    //     password VARCHAR(40) NOT NULL,
    //     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    //     updated_at
    //     TIMESTAMP
    //     NOT NULL
    //     DEFAULT CURRENT_TIMESTAMP
    //     ON UPDATE CURRENT_TIMESTAMP
    // )`,
    // // Muudame 'product' tabelis 'reduced_price' tulba mittekohustuslikuks
    // `ALTER TABLE products
    //     MODIFY COLUMN reduced_price DECIMAL NULL;
    // `,
    // // Muudame 'categories' tabelis 'parent_id' tulba mittekohustuslikuks
    // `ALTER TABLE categories
    //     MODIFY COLUMN parent_id INT UNSIGNED NULL,
    //     MODIFY COLUMN description TEXT NULL;
    // `,
    // // Lisame 'categories' tabelisse uue välja: slug VARCHAR(255) NOT NULL
    // `ALTER TABLE categories
    //     ADD COLUMN slug VARCHAR(255) NOT NULL
    //     AFTER name;
    // `
];