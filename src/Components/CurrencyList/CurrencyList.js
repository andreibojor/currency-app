import React, { useState, useEffect, useContext } from "react";
import { CardsContext } from "../../Context/CardsContext";
import "./styles/currencyList.css";

function CurrencyList() {
  const { allCurrencies, setAllCurrencies, cards, setCards } =
    useContext(CardsContext);

  const [listToggler, setListToggler] = useState(false);

  function handleClick() {
    setListToggler(!listToggler);
  }

  function addCard(currency) {
    setCards((prevItems) => [...prevItems, currency]);
  }

  return (
    <>
      {listToggler ? (
        <div className="currency-list-container">
          {Object.entries(allCurrencies).map((item) => {
            const alreadyAdded = cards.some((curr) => curr[0] === item[0]);
            if (alreadyAdded) {
              return (
                <div className="currency-card added" key={item[0]}>
                  <img src="./American.png" alt="Currency" />
                  <h3>
                    {item[0]} - {item[1]}
                  </h3>
                </div>
              );
            } else {
              return (
                <div
                  className="currency-card"
                  key={item[0]}
                  onClick={() => addCard(item)}
                >
                  <img src="./American.png" alt="Currency" />
                  <h3>
                    {item[0]} - {item[1]}
                  </h3>
                </div>
              );
            }
          })}
        </div>
      ) : (
        <></>
      )}
      <div className="btn" onClick={handleClick}>
        Add Currency
      </div>
    </>
  );
}

export default CurrencyList;
