const { Pool } = require('pg');

const pool = new Pool({
  user: 'clayton',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const intake = process.argv[2];
const limit = process.argv[3];

const queryString = `
  SELECT students.id, students.name AS student_name, cohorts.name AS cohorts_name
  FROM students
  JOIN cohorts ON cohorts.id = students.cohort_id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
  `;
const values = [`${intake}%`, limit];

pool.query(queryString, values)
  .then(res => {
    console.log(res.rows);
  })
  .catch(err => console.error('query error', err.stack));