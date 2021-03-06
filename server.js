// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();

//load the quotes JSON
const quotes = require("./quotes.json");
const quotesId = require("./quotes-with-id.json");

const lodash = require('lodash');

var cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(cors());
app.use(bodyParser.json())

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", (req, res) => {
  req.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

//START OF YOUR CODE...

app.get("/quotes", (req, res)=> {
  res.json(quotes);
});

/* const getQuoteRandom = () => {
  const randomNumber = Math.floor(Math.random()* quotes.length);
  return quotes[randomNumber];
}; */

app.get("/quotes/random", (req, res)=> {
  const quote = lodash.sample(quotes);
  res.json(quote);
});

//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

const searchQuotes = (term) =>{
  const newArr = [];
  quotes.forEach(el => {
    if (el.quote.includes(term)) newArr.push(el);
  });
  return newArr;
};

app.get("/quotes/search", (req, res) => {
  const term = req.query.value;
  const newQuotes = searchQuotes(term);
  res.json(newQuotes);
});

app.get("/quotes/:id", (req,res) => {
  const id = req.params.id;
  const quote = quotesId.filter(el => el.id === Number(id));
  res.json(quote);

});

app.post("/quotes/addquotes", (req, res) => {
  const data= req.body;
  console.log(data);
  data.id = quotesId[quotesId.length - 1].id + 1;
  let newQuotesJson = quotesId;
  newQuotesJson.push(data);
  fs.writeFile("./quotes-with-id.json", JSON.stringify(newQuotesJson), ()=>{});
  console.log(newQuotesJson);
  res.send("POST your qoute");
});

app.delete("/quotes/:id", (req,res) => {
  const id = req.params.id;
  const quote = quotesId.filter(el => el.id === Number(id));
  let newQuotesJson = quotesId;
  let index = newQuotesJson.indexOf(quote[0]);
  newQuotesJson.splice(index, 1);
  fs.writeFile("./quotes-with-id.json", JSON.stringify(newQuotesJson), ()=>{});
  res.send("DELETE your quote!");
});


//Start our server so that it listens for HTTP requests!
const listener = app.listen(4000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
