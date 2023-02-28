import React, { useState, useEffect } from "react";
import styled from "styled-components";


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



if (!data) {
  return <div>Loading...</div>;
}
console.log(data);
// console.log(data.transactions[0]);
// console.log(data.terminals[0]);
// console.log(data.merchants[0]);

  return (
    <div>
    <div>
      <h1>Merchants:</h1>
      {data.merchants.map((merchant) => (
        <div key={merchant.id}>{merchant.name}</div>
      ))}
    </div>

    <div>
      <h1>Terminals:</h1>
      {data.terminals.map((terminal) => (
        <div key={terminal.id}>{terminal.location}</div>
      ))}
    </div>

    <div>
      <h1>Transactions:</h1>
      {data.transactions.map((transaction) => (
        <div key={transaction.id}>{transaction.terminal_id}</div>
      ))}
    </div>
    </div>
  );
};

export default App;
