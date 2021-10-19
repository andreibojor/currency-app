import React, { useState, useContext } from "react";
import "./App.css";
import { Header, Card, CurrencyList } from "./Components";
import { CardsContext } from "./Context/CardsContext";

function App() {
  const { cards, baseCurrency, rates } = useContext(CardsContext);
  const [value, setValue] = useState([]);

  function calculateRate(e) {
    e.target.name === "EUR" && setValue(e.target.value);
  }

  return (
    <div className="main">
      <Header />

      <div className="cards-container">
        {cards &&
          cards.map((item) => (
            <Card
              key={item[0]}
              currency={item}
              // onClick={() => handleBaseCurrency(item[0])}
              fromCurrency={baseCurrency}
              rate={rates[item[0]]}
              changeFunction={calculateRate}
              value={Math.round(value * rates[item[0]] * 1000) / 1000}
            />
          ))}
      </div>
      <CurrencyList />
    </div>
  );
}

export default App;
