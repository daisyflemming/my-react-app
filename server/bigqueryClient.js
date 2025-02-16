const { BigQuery } = require('@google-cloud/bigquery');
const path = require('path');
const keyFilename = '/Users/daisyflemming/.local/GoogleCloud/steam-house-218614-bd8782114913.json';

// Create a client
const bigquery = new BigQuery({
  keyFilename: keyFilename
});

// Define a function to retrieve data from BigQuery
async function getDataFromBigQuery(query) {
  // Run a query
  const options = {
    query: query,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'US',
  };

  // Execute the query
  const [rows] = await bigquery.query(options);

  return rows;
}

module.exports = {
  getDataFromBigQuery,
};