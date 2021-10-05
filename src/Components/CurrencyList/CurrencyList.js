import React, { useState, useContext } from "react";
import { CardsContext } from "../../Context/CardsContext";
import "./styles/currencyList.css";
import CurrencyFlag from "react-currency-flags";

function CurrencyList() {
  const { allCurrencies, cards, addCard } = useContext(CardsContext);

  const [listToggler, setListToggler] = useState(false);
  function handleClick() {
    setListToggler(!listToggler);
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
                  <CurrencyFlag currency={`${item[0]}`} size="xl" />
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
                  <CurrencyFlag currency={`${item[0]}`} size="xl" />
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
