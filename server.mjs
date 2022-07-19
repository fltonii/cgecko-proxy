import fetch from "node-fetch";
import express from "express";

const app = express();

const port = process.env.PORT || 3000;

const apiURL = "https://api.coingecko.com/api/v3/";

const getInfo = async (id) => {
  const url =
    apiURL +
    `coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
  const apiResponse = await fetch(url);
  const json = await apiResponse.json();
  const {
    price_change_24h,
    price_change_percentage_24h,
    current_price: { usd },
  } = json.market_data;
  return { price_change_24h, price_change_percentage_24h, price: usd };
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/daang/:symbol/:action", async (req, res) => {
  console.log(req.params);
  // const { symbol, action } = req.params;
  const symbol = "enj";
  const action = "price";

  try {
    const apiResponse = await fetch(apiURL + "search?query=" + symbol);
    const json = await apiResponse.json();

    const selectedTokenArray = json.coins.filter(
      (token) => token.symbol.toUpperCase() === (symbol || "").toUpperCase()
    );

    const selectedToken = selectedTokenArray[0];

    const id = selectedToken.id;
    console.log(id, selectedToken);

    const info = await getInfo(id);

    res.send(JSON.stringify(info[action]));
  } catch (error) {
    console.log(error);
    res.send("broken");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
