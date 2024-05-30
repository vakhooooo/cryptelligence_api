require("dotenv").config({ config: "../../.env" });

module.exports = {
  port: +process.env.PORT || 3000,
  tokenAddress: process.env.TOKEN_ADDRESS,
  solanaRpcUrl: process.env.SOLANA_RPC_URL,
  dexscreenerApiUrl: process.env.DEXSCREENER_API_URL,
};
