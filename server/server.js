const express = require('express');
const oracledb = require('oracledb');
const ejs = require('ejs');

const app = express();
const port = 3000;

// Set up the view engine to use EJS
app.set('view engine', 'ejs');

// Set up the connection to the Oracle database
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const connection = {
  user: 'your_username',
  password: 'your_password',
  connectString: 'your_connection_string'
};

// Define a route to fetch and display data
app.get('/', async (req, res) => {
  let conn;

  try {
    // Connect to the Oracle database
    conn = await oracledb.getConnection(connection);

    // Define the SQL query to retrieve data
    const sql = 'SELECT * FROM your_table_name';

    // Execute the query
    const result = await conn.execute(sql);

    // Render the data using EJS
    res.render('index', { data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while fetching data from the database.');
  } finally {
    // Close the database connection
    if (conn) {
      try {
        await conn.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});