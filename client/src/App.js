import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  th,
  td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
`;

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/index.php");
      const jsonData = await response.json();
      setData(jsonData);
    };
    fetchData();
  }, []);

console.log(data);

  return (
    <div>
      <h1>Merchant Transactions</h1>
      {data ? (
        <Table>
          <thead>
            <tr>
              <th>Merchant ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {data.merchants.map((merchant) => (
              <tr key={merchant.merchant_id}>
                <td>{merchant.merchant_id}</td>
                <td>{merchant.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default App;
