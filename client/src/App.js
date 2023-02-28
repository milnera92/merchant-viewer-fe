import React, { useState, useEffect } from "react";
// import styled from "styled-components";

// const Table = styled.table`
//   border-collapse: collapse;
//   width: 100%;
//   th,
//   td {
//     border: 1px solid black;
//     padding: 8px;
//     text-align: left;
//   }
//   th {
//     background-color: #f2f2f2;
//   }
// `;

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

  console.log(data.merchants[0].name);

if (!data) {
  return <div>Loading...</div>;
}

  return (
    <div>
      <h1>Merchants:</h1>
      {data.merchants.map((merchant) => (
        <div key={merchant.id}>{merchant.name}</div>
      ))}
    </div>
  );
};

export default App;
