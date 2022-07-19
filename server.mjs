import { createServer } from "http";
import fetch from "node-fetch";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});

// createServer((req, res) => {
//   fetch("https://api.coingecko.com/api/v3/search?query=btc");
//   res.write("Hello World!");
//   res.end();
// }).listen();
