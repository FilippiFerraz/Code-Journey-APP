// db.js (Verifique se as credenciais estão corretas!)
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'CodeJourney', 
    password: '36225213',
    port: 5432,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};