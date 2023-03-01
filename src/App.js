import React, { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://merchant-viewer.herokuapp.com");
      const jsonData = await response.json();
      setData(jsonData);
    };
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <h1>Merchants:</h1>
        {data.merchants.map((merchant) => (
          <div key={merchant.id}>
            {merchant.name} ({merchant.id})
            <ul>
              {data.terminals.map((terminal) =>
                terminal.merchant_id === merchant.id ? (
                  <li key={terminal.id}>
                    {terminal.location} ({terminal.id})
                    <ul>
                      {data.transactions.map((transaction) =>
                        transaction.merchant_id === merchant.id &&
                        transaction.terminal_id === terminal.terminal_id ? (
                          <li key={transaction.id}>
                            ${transaction.amount}
                          </li>
                        ) : null
                      )}
                    </ul>
                  </li>
                ) : null
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;