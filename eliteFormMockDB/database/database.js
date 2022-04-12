import pkg from 'pg';
const { Pool } = pkg;

// Link to ElephantSQL DB
const PG_URI =
  'postgres://auaglbfd:eMhTSjozk2dFLrGJhO8uH6XZcjxG1U4z@heffalump.db.elephantsql.com/auaglbfd';

// Establish connection to DB
const pool = new Pool({
  connectionString: PG_URI,
});

export default {
  query: (text, params, callback) => {
    console.log('Executed query', text);
    return pool.query(text, params, callback);
  },
};
