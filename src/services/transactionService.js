const { Connection, PublicKey } = require("@solana/web3.js");
const config = require("../config/index");

async function getLastTransaction() {
  const connection = new Connection(config.solanaRpcUrl);
  const publicKey = new PublicKey(config.tokenAddress);
  const signatures = await connection.getSignaturesForAddress(publicKey, {
    limit: 1,
  });
  const lastSignature = signatures[0].signature;
  const transaction = await connection.getTransaction(lastSignature, {
    maxSupportedTransactionVersion: 0,
  });

  const {
    slot,
    meta: { preTokenBalances, postTokenBalances },
  } = transaction;

  let from,
    to,
    amount = 0;

  if (preTokenBalances.length > 0 && postTokenBalances.length > 0) {
    const preBalance = preTokenBalances.find(
      (balance) => balance.mint === config.tokenAddress
    );
    const postBalance = postTokenBalances.find(
      (balance) => balance.mint === config.tokenAddress
    );

    if (preBalance && postBalance) {
      from = preBalance.owner;
      to = postBalance.owner;
      amount =
        postBalance.uiTokenAmount.uiAmount - preBalance.uiTokenAmount.uiAmount;
    }
  }

  from = from || "unknown";
  to = to || "unknown";

  return {
    lastSignature,
    slot,
    from,
    to,
    amount: Math.abs(amount),
  };
}

module.exports = {
  getLastTransaction,
};
