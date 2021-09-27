import React, { useState, useEffect, useContext } from "react";
import { CardsContext } from "../../Context/CardsContext";
import "./styles/card.css";

function Card({ currency }) {
  const { setCards, cards } = useContext(CardsContext);
  const [base, setBase] = useState("EUR");
  const [rates, setRates] = useState({});

  function removeCard(curr) {
    setCards((prevItems) => prevItems.filter((item) => item[0] !== curr[0]));
  }

  function selectBaseCurrency() {
    setBase(currency[0]);
    console.log(`base: ${base}`);
  }

  useEffect(() => {
    const url = `http://api.exchangeratesapi.io/v1/latest?access_key=ec7c12ccdfee679ebb35f7f4681c64dc&base=${base}`;

    const fetchRates = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setRates(json);
        console.log(rates);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchRates();
  }, [base]);

  return (
    <div className="card-container">
      <div className="card" onClick={selectBaseCurrency}>
        <div className="card__nav" onClick={() => removeCard(currency)}>
          X
        </div>
        <div className="card__currency">
          <img src="./American.png" alt="Currency" />
        </div>
        <div className="card__symbol">
          <h3>$</h3>
        </div>
        <div className="card__info">
          <input
            className="card__input"
            type="text"
            name="currency"
            id="currency"
          />
          <h3>{`${currency[0]} - ${currency[1]}`}</h3>
          <p>1EUR = 1.2323 currency</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
