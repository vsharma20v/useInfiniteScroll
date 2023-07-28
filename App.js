import {useEffect, useState } from "react";
import useInfiniteScroll from "./hooks/useInfiniteScroll";

export default function App() {
  const [quotes, setQuotes] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchData = async () => {
    const response = await fetch(
      `https://api.javascripttutorial.net/v1/quotes/?page=${pageNumber}&limit=10`
    );
    setPageNumber((prevValue) => prevValue + 1);
    const result = await response.json();
    setQuotes(result?.data);
  };

  const fetchMoreData = async () => {
    const response = await fetch(
      `https://api.javascripttutorial.net/v1/quotes/?page=${pageNumber}&limit=10`
    );
    const result = await response.json();
    setQuotes((prevValue) => [...prevValue, ...result.data]);
    setPageNumber((prevValue) => prevValue + 1);
    setIsFetching(false);
  };
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreData);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <section>
        {quotes.map((q, index) => (
          <p key={index}>
            {q.id} - {q.quote}
          </p>
        ))}
      </section>
      {isFetching ? <h2>Fetching More...</h2> : null}
    </div>
  );
}
