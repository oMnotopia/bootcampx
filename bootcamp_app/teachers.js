const { Pool } = require('pg');

const pool = new Pool({
  user: 'clayton',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const query = `
  SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
  FROM teachers
  JOIN assistance_requests ON assistance_requests.teacher_id = teachers.id
  JOIN students ON students.id  = assistance_requests.student_id
  JOIN cohorts ON cohorts.id = students.cohort_id
  WHERE cohorts.name = $1
  ORDER BY teacher;
`;

const values = [`${process.argv[2]}`];

pool.query(query, values)
  .then(res => {
  
    res.rows.forEach(user => {
      console.log(`${user.cohort}: ${user.teacher}`);
    });
  })
  .catch(err => console.error('query error', err.stack));