// useFetch.js
import { useState, useEffect } from "react";

const useFetch = (url, localJsonFile) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (url) {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const jsonData = await response.json();
          if (Array.isArray(jsonData)) {
            setData(jsonData);
          } else {
            throw new Error("Fetched data is not an array");
          }
        } else if (localJsonFile) {
          const jsonData = require(localJsonFile);
          setData(jsonData);
        } else {
          throw new Error("No URL or local JSON file provided");
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, localJsonFile]);

  return { data, loading, error };
};

export default useFetch;
