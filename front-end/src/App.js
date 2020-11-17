
import './App.css';
import React, { useState, useEffect } from "react";
import Search from './components/Search'


function App() {
  let valueInput = ""
  const [quotesData, setQuotesData] = useState([]);
  const [quoteNameImput, setQuoteNameImput] = useState("");
  const handleInputChange = (event) => {
    setQuoteNameImput(event.target.value);
  };
  const valueTosend = () => {
    valueInput = quoteNameImput;
  };

  const renderList = (term) => {
    return <Search value = {term}/>
  }

  useEffect(() => {
    fetch(
      `http://localhost:4000/quotes/random`
    )
      .then((res) => res.json())
      .then((data) => {
        setQuotesData(data);
      });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <p>{quotesData.quote}</p>
        <h5>{quotesData.author}</h5>
        <div >
          <input type="text" value={quoteNameImput} onChange={handleInputChange}></input>
          <button onClick={valueTosend} >Search</button>
        </div>
        {() => renderList(valueInput)}
      </header>
    </div>
  );
}

export default App;
