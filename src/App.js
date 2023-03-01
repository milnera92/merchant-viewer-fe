import React, { useState, useEffect } from "react";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px;
`;

const MerchantContainer = styled.div`
  background-color: #f5f5f5;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  flex: 1 1 300px;
`;

const MerchantTitle = styled.h2`
  margin: 0;
  font-size: 24px;
`;

const TerminalContainer = styled.div`
  background-color: #fff;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 10px;
`;

const TerminalTitle = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const TransactionContainer = styled.div`
  background-color: #f5f5f5;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 10px;
`;

const TransactionTitle = styled.h4`
  margin: 0;
  font-size: 16px;
`;

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://merchant-viewer.herokuapp.com"
      );
      const jsonData = await response.json();
      setData(jsonData);
    };
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <AppContainer>
      {data.merchants.map((merchant) => (
        <MerchantContainer key={merchant.id}>
          <MerchantTitle>{merchant.name}</MerchantTitle>
          {data.terminals
            .filter((terminal) => terminal.merchant_id === merchant.merchant_id)
            .map((terminal) => (
              <TerminalContainer key={terminal.id}>
                <TerminalTitle>Terminal {terminal.terminal_id}</TerminalTitle>
                {data.transactions
                  .filter((transaction) => transaction.terminal_id === terminal.terminal_id)
                  .map((transaction) => (
                    <TransactionContainer key={transaction.id}>
                      <TransactionTitle>Transaction {transaction.transaction_id}</TransactionTitle>
                      <div>Merchant ID: {transaction.merchant_id}</div>
                      <div>Terminal ID: {transaction.terminal_id}</div>
                      <div>Amount: ${transaction.amount}</div>
                    </TransactionContainer>
                  ))}
              </TerminalContainer>
            ))}
        </MerchantContainer>
      ))}
    </AppContainer>
  );
};

export default App;