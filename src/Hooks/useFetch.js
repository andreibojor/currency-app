import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        // console.log(json.symbols);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [url]);

  return { data };
};

export default useFetch;
