const fs = require('fs');
const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env')  
});
const pool = require('../config/db');

const migrate = async() =>{
    await pool.query(`
        CREATE TABLE IF NOT EXISTS schema_migrations(
        filename VARCHAR(255) PRIMARY KEY,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
        
    `);

const dir= path.join(__dirname, 'migrations');
const files = fs.readdirSync(dir).sort();

for(const file of files){
    const { rows } = await pool.query(
        'SELECT 1 FROM schema_migrations WHERE filename = $1',[file]
    );
    if(rows.length)continue;

    const sql = fs.readFileSync(path.join(dir,file),'utf8');
    console.log(`Applying ${file}...`);
    const client = await pool.connect();
    try{
        await client.query('BEGIN');
        await client.query(sql);
        await client.query('INSERT INTO schema_migrations (filename) VALUES ($1)', [file]);
        await client.query('COMMIT');
    } catch(err) {
        await client.query('ROLLBACK');
        throw err;
    }
}
console.log('Migrations Complete.');
process.exit(0);
}
migrate().catch((err) => {console.error(err);process.exit(1);});
