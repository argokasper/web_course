const path = require('path');
const fs = require('fs');

const envLocalPath = path.resolve(process.cwd(), '.env.local');
const envPath = path.resolve(process.cwd(), '.env');

var env = envPath;


if (fs.existsSync(envLocalPath)) {
  env = envLocalPath;
  require('dotenv').config({ path: envLocalPath });
} else if (fs.existsSync(envPath)) {
  env = envPath;
  require('dotenv').config({ path: envPath });
  console.log('.env.local does not exist, using .env as fallback');
} else {
  console.log('.env does not exits. Please create before continuing.');
  process.exit(1);
}


console.log({ envPath: env });

const mysql = require('serverless-mysql');

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
  },
});

async function query(q) {
  try {
    const results = await db.query(q);
    await db.end();
    return results;
  } catch (e) {
    throw Error(e.message);
  }
}

// Create "entries" table if doesn't exist
async function migrate() {
  try {
    await query(`
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title TEXT NOT NULL,
      price DECIMAL NOT NULL,
      reduced_price DECIMAL NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at
        TIMESTAMP
        NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
    )
    `);

    await query(`
    CREATE TABLE IF NOT EXISTS categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      parent_id INT UNSIGNED NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at
        TIMESTAMP
        NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
    )
    `);

    await query(`
    CREATE TABLE IF NOT EXISTS products_categories (
      product_id INT,
      category_id INT,
      PRIMARY KEY (product_id, category_id),
      CONSTRAINT fk_pc_product_id FOREIGN KEY (product_id) REFERENCES products(id),
      CONSTRAINT fk_pc_category_id FOREIGN KEY (category_id) REFERENCES categories(id)
    )
    `);

    await query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(60) NOT NULL,
      password VARCHAR(40) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at
        TIMESTAMP
        NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
    )
    `);

    // Muudame 'product' tabelis 'reduced_price' tulba mittekohustuslikuks
    await query(`
    ALTER TABLE products
      MODIFY COLUMN reduced_price DECIMAL NULL;
    `);

    // Muudame 'categories' tabelis 'parent_id' tulba mittekohustuslikuks
    await query(`
    ALTER TABLE categories
      MODIFY COLUMN parent_id INT UNSIGNED NULL,
      MODIFY COLUMN description TEXT NULL;
    `);

    // Lisame 'categories' tabelisse uue välja: slug VARCHAR(255) NOT NULL
    await query(`
    ALTER TABLE categories
      ADD COLUMN slug VARCHAR(255) NOT NULL
      AFTER name;
    `);


    console.log('migration ran successfully');
  } catch (e) {
    console.log(e);
    console.error('could not run migration, double check your credentials.');
    process.exit(1);
  }
}

migrate().then(() => process.exit());