import React, { useState, useEffect, createContext } from "react";
import Countries from "../Utils/countries.json";

const CardsContext = createContext({});

function ContextProvider({ children }) {
  const [cards, setCards] = useState([]);
  const [allCurrencies, setAllCurrencies] = useState([]);

  // get all currencies
  useEffect(() => {
    const url = `http://api.exchangeratesapi.io/v1/symbols?access_key=ec7c12ccdfee679ebb35f7f4681c64dc`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setAllCurrencies(json.symbols);
        console.log(json.symbols);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  // infoArray = infoArray.filter(curr => names.hasProperty(curr.currency.code))
  // const results = Countries.filter((item) =>
  //   Object.keys(allCurrencies).indexOf(item.currency.code)
  // );

  return (
    <CardsContext.Provider
      value={{
        allCurrencies,
        setAllCurrencies,
        cards,
        setCards,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
}

export { ContextProvider, CardsContext };
