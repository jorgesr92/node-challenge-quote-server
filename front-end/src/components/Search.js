import React, { useState, useEffect } from "react";


const Search = (props) => {
  const [quotesData1, setQuotesData1] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:4000/quotes/search?value=${props.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        setQuotesData1(data);
      });
  }, []);

  return (
        <ul>
            {quotesData1.map((quote, index) => {
            return  <li key={index}>
                        <p>{quote.quote}</p>
                        <h5>{quote.author}</h5>
                    </li>;
            })}
        </ul>
  );
}

export default Search;
