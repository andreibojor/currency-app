import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { Header, Card, CurrencyList } from "./Components";
import { CardsContext } from "./Context/CardsContext";

function App() {
  //add cards
  const { cards, baseCurrency, setBaseCurrency } = useContext(CardsContext);

  const [rates, setRates] = useState([]);
  const [value, setValue] = useState();

  useEffect(() => {
    const url = `http://api.exchangeratesapi.io/v1/latest?access_key=ec7c12ccdfee679ebb35f7f4681c64dc&base=${baseCurrency}`;

    const fetchBase = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setRates(json.rates);
        console.log(rates);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchBase();
  }, [baseCurrency]);

  //select a base currency by clicking the card
  // function handleBaseCurrency(item) {
  //   setBaseCurrency(item);
  // }

  function calculateRate(e) {
    setValue(e.target.value);
  }

  return (
    <div className="main">
      <Header />

      <div className="cards-container">
        {cards ? (
          cards.map((item) => (
            <Card
              key={item[0]}
              currency={item}
              // onClick={() => handleBaseCurrency(item[0])}
              fromCurrency={baseCurrency}
              rate={rates[item[0]]}
              changeFunction={calculateRate}
              value={value}
            />
          ))
        ) : (
          <></>
        )}
      </div>
      <CurrencyList />
    </div>
  );
}

export default App;
