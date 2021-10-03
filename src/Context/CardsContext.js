import React, { useState, useEffect, createContext } from "react";

const CardsContext = createContext({});

function ContextProvider({ children }) {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allCurrencies, setAllCurrencies] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState("EUR");

  // get all currencies
  useEffect(() => {
    const url = `http://api.exchangeratesapi.io/v1/symbols?access_key=ec7c12ccdfee679ebb35f7f4681c64dc`;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setAllCurrencies(json.symbols);
        setIsLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

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

        if (item[0] === "GBP") {
          setCards((prevItems) => [...prevItems, item]);
        }

        if (item[0] === "JPY") {
          setCards((prevItems) => [...prevItems, item]);
        }

        if (item[0] === "AUD") {
          setCards((prevItems) => [...prevItems, item]);
        }
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
      }}
    >
      {children}
    </CardsContext.Provider>
  );
}

export { ContextProvider, CardsContext };
