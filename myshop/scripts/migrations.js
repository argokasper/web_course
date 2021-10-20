const path = require('path');
const fs = require('fs');

const MIGRATIONS_DIR = path.resolve(process.cwd(), 'migrations');

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

const initMigrations = async (tableName = 'migrations') => {
  try {
    const results = await db.query(`
      CREATE TABLE IF NOT EXISTS ${tableName} (
        name VARCHAR(255) PRIMARY KEY
      )
    `);
    await db.end();
    return results;
  } catch (err) {
    throw Error(e.message);
  }
};

const notMigrated = async (file) => {
  try {
    const results = await db.query('SELECT COUNT(name) AS count FROM migrations WHERE name=?', [file]);
    await db.end();
    const count = results[0] ? results[0].count : 0;
    return !count;
  } catch (err) {
    throw Error(err.message);
  }
};

const markAsMigrated = async (file) => {
  try {
    const results = await db.query('INSERT INTO migrations (name) VALUES (?)', [file]);
    await db.end();
    return results;
  } catch (err) {
    throw Error(err.message);
  }
}

// Create "entries" table if doesn't exist
async function migrate() {
  try {
    await initMigrations();
    const files = fs.readdirSync(MIGRATIONS_DIR);
    for (const file of files) {
      if (await notMigrated(file)) {
        const queries = require(`${MIGRATIONS_DIR}/${file}`);
        console.log(`Migrating ${file}...`);
        for (const q of queries) {
          await query(q);
        }
        await markAsMigrated(file);
        console.log(`${file} successfully migrated`);
      }
    }
    db.quit();
    console.log('Successful migration');
  } catch (e) {
    console.log(e);
    console.error('could not run migration, double check your credentials.');
    process.exit(1);
  }
}

migrate().then(() => process.exit());