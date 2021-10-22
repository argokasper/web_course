const path = require('path');
const fs = require('fs');

const SEEDS_DIR = path.resolve(process.cwd(), 'database/seeds');

const envLocalPath = path.resolve(process.cwd(), '.env.local');
const envPath = path.resolve(process.cwd(), '.env');

if (fs.existsSync(envLocalPath)) {
  require('dotenv').config({ path: envLocalPath });
} else if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
} else {
  console.log('.env does not exits. Please create before continuing.');
  process.exit(1);
}

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

async function seed() {
  try {
    const files = fs.readdirSync(SEEDS_DIR);
    for (const file of files) {
      const queries = require(`${SEEDS_DIR}/${file}`);
      console.log(`Seeding ${file}...`);
      for (const q of queries) {
        await query(q);
      }
      console.log(`${file} successfully seeded`);
    }
    db.quit();
    console.log('Successful seed');
  } catch (e) {
    console.log(e);
    console.error('could not run seeders, double check your credentials.');
    process.exit(1);
  }
}

seed().then(() => process.exit());
