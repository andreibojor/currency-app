import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { Header, Card, CurrencyList } from "./Components";
import { CardsContext } from "./Context/CardsContext";

function App() {
  //add cards
  const { cards, baseCurrency, setBaseCurrency, allCurrencies } =
    useContext(CardsContext);

  const [rates, setRates] = useState([]);

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

  function handleBaseCurrency(item) {
    setBaseCurrency(item);
  }

  return (
    <>
      <Header />

      <div className="cards-container">
        {cards ? (
          cards.map((item) => (
            <Card
              key={item[0]}
              currency={item}
              onClick={() => handleBaseCurrency(item[0])}
              fromCurrency={baseCurrency}
              rate={rates[item[0]]}
            />
          ))
        ) : (
          <></>
        )}
      </div>
      <CurrencyList />
    </>
  );
}

export default App;
