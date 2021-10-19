import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
        setError(null);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        console.log(error);
        setData([]);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  // returns an object with data property in it
  return { data, error, isLoading };
};

export default useFetch;
