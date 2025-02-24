const express = require('express');
const path = require('path');
const bigqueryClient = require('./bigqueryClient');

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../ui/build')));

// Example route to fetch data from BigQuery
app.get('/bigquery-data', async (req, res) => {
  try {
    const query = "SELECT Name, Session, Apartment, Attendance FROM `steam-house-218614.MyDataSet.CalligraphySignUp`"; // Replace with your query
    const rows = await bigqueryClient.getDataFromBigQuery(query);
    res.json(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../ui/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});