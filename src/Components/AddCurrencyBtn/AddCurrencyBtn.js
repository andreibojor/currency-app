import React from "react";
import "./styles/addCurrencyBtn.css";

function AddCurrencyBtn({ onClick }) {
  return (
    <div className="btn" onClick={onClick}>
      Add Currency
    </div>
  );
}

export default AddCurrencyBtn;
