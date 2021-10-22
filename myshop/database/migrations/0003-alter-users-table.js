module.exports = [
    `ALTER TABLE users
        MODIFY COLUMN password VARCHAR(60) NOT NULL,
        MODIFY COLUMN email VARCHAR(60) NOT NULL UNIQUE;
    `,
];