import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  min-height: 100vh;
  background-color: #3b5998;
  color: black;
`;

const Card = styled.div`
  background-color: #fff;
  border: 4px solid #a6c8ff;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin: 10px auto;
  padding: 10px;
  width: 350px;
`;

const Header = styled.header`
  background-color: #3b5998;
  border-bottom: 2px solid black;
  color: #fff;
  padding: 20px;
  text-align: center;
`;

const Footer = styled.footer`
  background-color: #3b5998;
  color: #fff;
  padding: 20px;
  text-align: center;
  border-top: 2px solid black;
`;

const MerchantCard = styled(Card)`
  width: 100%;
`;

const MerchantName = styled.h2`
  color: #444;
`;

const TerminalCard = styled(Card)``;

const TerminalName = styled.h3`
  color: #777;
`;

const TransactionCard = styled(Card)`
  margin-top: 10px;
`;

const TransactionName = styled.h4`
  color: #999;
`;

const TotalSales = styled.div`
  color: #444;
  margin-top: auto;
`;

const Amount = styled.div`
  color: #777;
`;

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

  const getMerchantSalesTotal = (merchantId) => {
    return data.transactions
      .filter((transaction) => transaction.merchant_id === merchantId)
      .reduce((total, transaction) => total + parseFloat(transaction.amount), 0)
      .toFixed(2);
  };

  const getTerminalSalesTotal = (terminalId) => {
    return data.transactions
      .filter((transaction) => transaction.terminal_id === terminalId)
      .reduce((total, transaction) => total + parseFloat(transaction.amount), 0)
      .toFixed(2);
  };

  return (
    <Container>
            <Header>
        <h1>Merchant Portal</h1>
      </Header>
      {data.merchants.map((merchant) => (
        <MerchantCard key={merchant.id}>
          <MerchantName>{merchant.name}</MerchantName>
          <TotalSales>
            <strong>Total Sales:</strong> ${getMerchantSalesTotal(merchant.merchant_id)}
          </TotalSales>
          <div>
            {data.terminals
              .filter((terminal) => terminal.merchant_id === merchant.merchant_id)
              .map((terminal) => (
                <TerminalCard key={terminal.id}>
                  <TerminalName>Terminal {terminal.terminal_id}</TerminalName>
                  <Amount>
                    <strong>Total Sales:</strong> ${getTerminalSalesTotal(terminal.terminal_id)}
                  </Amount>
                  {data.transactions
                    .filter((transaction) => transaction.terminal_id === terminal.terminal_id)
                    .map((transaction) => (
                      <TransactionCard key={transaction.id}>
                        <TransactionName>Transaction {transaction.transaction_id}</TransactionName>
                        <div>Merchant ID: {transaction.merchant_id}</div>
                        <div>Terminal ID: {transaction.terminal_id}</div>
                        <div>Amount: ${transaction.amount}</div>
                      </TransactionCard>
                    ))}
                </TerminalCard>
              ))}
          </div>
        </MerchantCard>
      ))}
            <Footer>
        <p>&copy; 2023 Merchant Portal. All rights reserved.</p>
      </Footer>
    </Container>
    
  );
};

export default App;
