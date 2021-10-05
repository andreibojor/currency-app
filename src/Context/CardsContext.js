import React, { useState, useEffect, createContext } from "react";

const CardsContext = createContext({});

function ContextProvider({ children }) {
  const [cards, setCards] = useState([]);
  const [allCurrencies, setAllCurrencies] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState("EUR");
  const [rates, setRates] = useState([]);

  // get all currencies
  useEffect(() => {
    const url = `http://api.exchangeratesapi.io/v1/symbols?access_key=ec7c12ccdfee679ebb35f7f4681c64dc`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        // console.log(json);
        setAllCurrencies(json.symbols);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

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

  // After the currencies are fetched, we select a few currencies as default cards
  useEffect(() => {
    function addDefaultCards() {
      Object.entries(allCurrencies).map((item) => {
        if (item[0] === "EUR") {
          setCards((prevItems) => [...prevItems, item]);
        }

        if (item[0] === "USD") {
          setCards((prevItems) => [...prevItems, item]);
        }

        if (item[0] === "RUB") {
          setCards((prevItems) => [...prevItems, item]);
        }

        if (item[0] === "INR") {
          setCards((prevItems) => [...prevItems, item]);
        }

        // if (item[0] === "JPY") {
        //   setCards((prevItems) => [...prevItems, item]);
        // }

        // if (item[0] === "AUD") {
        //   setCards((prevItems) => [...prevItems, item]);
        // }
      });
      return cards;
    }
    addDefaultCards();
  }, [allCurrencies]);

  function addCard(currency) {
    setCards((prevItems) => [...prevItems, currency]);
  }

  function removeCard(curr) {
    setCards((prevItems) => prevItems.filter((item) => item[0] !== curr[0]));
  }

  return (
    <CardsContext.Provider
      value={{
        allCurrencies,
        setAllCurrencies,
        cards,
        setCards,
        baseCurrency,
        setBaseCurrency,
        addCard,
        removeCard,
        rates,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
}

export { ContextProvider, CardsContext };
