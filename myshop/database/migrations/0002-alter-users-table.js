module.exports = [
    `ALTER TABLE users
        MODIFY COLUMN id INT UNSIGNED AUTO_INCREMENT;
    `,
    `ALTER TABLE products
        ADD COLUMN user_id INT UNSIGNED NULL
        AFTER reduced_price;
    `,
    `ALTER TABLE products
        ADD CONSTRAINT fk_products_user_id
        FOREIGN KEY (user_id) REFERENCES users(id);`
];