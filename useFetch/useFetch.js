import React from "react";

export const useFetch = (url) => {
  const isMounted = React.useRef(true);
  const [fetchData, setFetchData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const getData = async (url) => {
    setFetchData(null);
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (isMounted.current) {
        setFetchData(data);
        setLoading(false);
        setError(null);
      }
    } catch (error) {
      setFetchData(null);
      setLoading(false);
      setError(error);
    }
  };

  React.useEffect(() => {
    getData(url);
  
    return () => {
      isMounted.current = false;
    };
  }, [url]);

  return { data: fetchData, loading, error };
};
