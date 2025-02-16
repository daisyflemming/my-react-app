import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';

function BigQueryTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/bigquery-data');
        const rows = await response.json();
        setData(rows);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ReactTable
      data={data}
      columns={[
        { Header: 'Name', accessor: 'Name' },
        { Header: 'Session', accessor: 'Session' },
        { Header: 'Apartment', accessor: 'Apartment' },
        { Header: 'Attendance', accessor: 'Attendance' },
      ]}
      defaultPageSize={10}
      pageSizeOptions={[10, 20, 30, 40, 50]}
    />
  );
}

export default BigQueryTable;