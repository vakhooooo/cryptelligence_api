const liquidityService = require("../services/liquidityService");
const transactionService = require("../services/transactionService");

async function getTokenInfo(_, res) {
  try {
    const usdLiquidity = await liquidityService.getLiquidity();
    const lastTransaction = await transactionService.getLastTransaction();

    res.json({
      usdLiquidity,
      ...lastTransaction,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getTokenInfo,
};
