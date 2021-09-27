import React, { useState, useContext } from "react";
import "./App.css";
import { Header, Card, CurrencyList } from "./Components";
import { CardsContext } from "./Context/CardsContext";

function App() {
  //add cards
  const { cards } = useContext(CardsContext);

  return (
    <>
      <Header />

      <div className="cards-container">
        {cards ? (
          cards.map((item) => <Card key={item} currency={item} />)
        ) : (
          <></>
        )}
      </div>
      <CurrencyList />
    </>
  );
}

export default App;
