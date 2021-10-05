import React, { useContext } from "react";
import { CardsContext } from "../../Context/CardsContext";
import "./styles/card.css";
import getSymbolFromCurrency from "currency-symbol-map";
// import "currency-flags";
import "currency-symbol-map";

function Card({
  onClick,
  currency,
  fromCurrency,
  rate,
  changeFunction,
  value,
  flag,
}) {
  const { setCards, baseCurrency } = useContext(CardsContext);

  function removeCard(curr) {
    setCards((prevItems) => prevItems.filter((item) => item[0] !== curr[0]));
  }

  return (
    <div className="card-container">
      <div className="card__nav" onClick={() => removeCard(currency)}>
        X
      </div>
      <div
        className={currency[0] === baseCurrency ? "card base-currency" : "card"}
        onClick={onClick}
      >
        <div className="card__currency">
          <div className="currency-flag currency-flag-usd"></div>
          <img src={`src/flags/${currency[0]}.png`} alt="Currency" />
        </div>
        <div className="card__symbol">
          <h3>{getSymbolFromCurrency(currency[0])}</h3>
        </div>
        <div className="card__info">
          <input
            className="card__input"
            type="number"
            name={currency[0]}
            onChange={(e) => changeFunction(e)}
            value={value || ""}
          />
          <h3>{`${currency[0]} - ${currency[1]}`}</h3>
          <p>
            1 {fromCurrency} = {rate} {currency[0]}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
