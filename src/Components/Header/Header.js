import React from "react";
import "./styles/header.css";

function Header() {
  const todaysDate = () => {
    const today = new Date();

    const date = `${
      today.getMonth() + 1
    }/${today.getDate()}/${today.getFullYear()}`;

    return date;
  };

  return (
    <header>
      <h1 className="header-title">Curr€ncy Cards</h1>
      <h1 className="header-date">{todaysDate()}</h1>
    </header>
  );
}

export default Header;
