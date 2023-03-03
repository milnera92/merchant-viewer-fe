import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #3b5998;
  color: black;
  gap: 20px;
`;

const Card = styled.div`
  background-color: #fff;
  border: 4px solid #a6c8ff;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  width: 100%;
  max-width: 800px;
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
  border-top: 2px solid black;
  color: #fff;
  padding: 20px;
  text-align: center;
`;

const MerchantCard = styled(Card)`
  max-width: 500px;
`;

const MerchantName = styled.h2`
  color: #444;
`;

const TerminalCard = styled(Card)`
  display: flex;
  flex-direction: column;
  max-width: 400px;
`;

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
`;

const Amount = styled.div`
  color: #777;
`;

const App = () => {
  const [data, setData] = useState(null);
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [selectedTerminal, setSelectedTerminal] = useState(null);
  const [saleAmount, setSaleAmount] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://merchant-viewer.herokuapp.com");
      const jsonData = await response.json();
      setData(jsonData);
    };
    fetchData();
  }, []);

  const handleMerchantChange = (event) => {
    setSelectedMerchant(event.target.value);
    setSelectedTerminal(null);
  };

  const handleTerminalChange = (event) => {
    setSelectedTerminal(event.target.value);
  };

  const handleSaleAmountChange = (event) => {
    setSaleAmount(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(`Merchant: ${selectedMerchant}, Terminal: ${selectedTerminal}, Sale Amount: ${saleAmount}`);
  
    // Send data to server
    const formData = new FormData();
    formData.append('merchant_id', selectedMerchant);
    formData.append('terminal_id', selectedTerminal);
    formData.append('amount', saleAmount);
  
    try {
      const response = await fetch('https://merchant-viewer.herokuapp.com', {
        // headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: formData
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Handle response from server
      const responseData = await response.json();
      console.log(responseData);
      console.log(formData);
      console.log(selectedMerchant);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  const getMerchantSalesTotal = (merchantId) => {
    const merchantTerminals = data.terminals.filter(
      (terminal) => terminal.merchant_id === merchantId
    );
    const batchTotals = merchantTerminals.map((terminal) =>
      data.transactions
        .filter((transaction) => transaction.terminal_id === terminal.terminal_id)
        .reduce((total, transaction) => total + parseFloat(transaction.amount), 0)
    );
    return batchTotals.reduce((total, batchTotal) => total + batchTotal, 0).toFixed(2);
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
      {data && (
      <form onSubmit={handleSubmit}>
        <label>
          Select a Merchant:
          <select value={selectedMerchant} onChange={handleMerchantChange}>
            <option value="">Please select a merchant</option>
            {data.merchants.map((merchant) => (
              <option key={merchant.id} value={merchant.id}>{merchant.name}</option>
            ))}
          </select>
        </label>
        {selectedMerchant && (
          <label>
            Select a Terminal:
            <select value={selectedTerminal} onChange={handleTerminalChange}>
              <option value="">Please select a terminal</option>
              {data.terminals
                .filter((terminal) => terminal.merchant_id === selectedMerchant)
                .map((terminal) => (
                  <option key={terminal.id} value={terminal.terminal_id}>{terminal.location}</option>
                ))}
            </select>
          </label>
        )}
        {selectedTerminal && (
          <label>
            Sale Amount:
            <input type="number" value={saleAmount} onChange={handleSaleAmountChange} />
          </label>
        )}
        <button type="submit" disabled={!selectedTerminal || !saleAmount}>Submit</button>
      </form>
      )}
      {data.merchants.map((merchant) => (
        <MerchantCard key={merchant.id}>
          <MerchantName>{merchant.name}</MerchantName>
          <TotalSales>
            <strong>Total Sales:</strong> ${getMerchantSalesTotal(merchant.id)}
          </TotalSales>
          <div>-</div>
          <div>{merchant.address}</div>
          <div>{merchant.phone}</div>
          <div>{merchant.email}</div>
          <div>
            {data.terminals
              .filter((terminal) => terminal.merchant_id === merchant.merchant_id)
              .map((terminal) => (
                <TerminalCard key={terminal.id}>
                  <TerminalName>{terminal.location}</TerminalName>
                  
                  <div>Terminal ID {terminal.id}</div>
                  
                  <Amount>
                    <strong>Total Sales:</strong> ${getTerminalSalesTotal(terminal.terminal_id)}
                  </Amount>
                  
                  {data.transactions
                    .filter((transaction) => transaction.terminal_id === terminal.terminal_id)
                    .map((transaction) => (
                      <TransactionCard key={transaction.id}>
                        <TransactionName>Amount: ${transaction.amount}</TransactionName>
                      
                        <div>Merchant ID: {transaction.merchant_id}</div>
                        <div>Transaction ID: {transaction.transaction_id}</div>
                        <div>Terminal ID: {transaction.terminal_id}</div>
                      
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
