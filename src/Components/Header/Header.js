import React from "react";
import "./styles/header.css";

function Header() {
  function getDate() {
    const today = new Date();

    const date = `${
      today.getMonth() + 1
    }/${today.getDate()}/${today.getFullYear()}`;

    return date;
  }
  return (
    <header>
      <h1>Currency Exchange</h1>
      <h1>{getDate()}</h1>
    </header>
  );
}

export default Header;
