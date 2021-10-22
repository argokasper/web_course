module.exports = [
    `ALTER TABLE categories
        MODIFY COLUMN description TEXT NULL,
        MODIFY COLUMN parent_id INT UNSIGNED NULL,
        MODIFY COLUMN name VARCHAR(255) NOT NULL UNIQUE;
    `,
];
