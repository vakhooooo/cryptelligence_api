const axios = require("axios");
const config = require("../config/index");

async function getLiquidity() {
  const url = `${config.dexscreenerApiUrl}${config.tokenAddress}`;
  const response = await axios.get(url);
  const pair = response.data.pairs.find(
    (pair) =>
      pair.baseToken.symbol === "JUP" || pair.quoteToken.symbol === "JUP"
  );
  if (!pair) {
    throw new Error("Liquidity data not found for JUP token");
  }
  const usdLiquidity = pair.liquidity.usd;
  return usdLiquidity;
}

module.exports = {
  getLiquidity,
};
