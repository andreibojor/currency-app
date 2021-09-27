import { CardsContext } from "../Context/CardsContext";

export const Currencies = () => {
  const url = `http://api.exchangeratesapi.io/v1/symbols?access_key=ec7c12ccdfee679ebb35f7f4681c64dc`;

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      const data = json.rates;
      console.log(json.rates);
      console.log(json);
    } catch (error) {
      console.log("error", error);
    }
  };

  fetchData();
};
