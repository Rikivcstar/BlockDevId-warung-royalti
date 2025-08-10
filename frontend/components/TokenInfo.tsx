"use client";

import { useEffect, useState } from "react";
import { getTokenName, getTokenSymbol, getTokenBalance } from "@/lib/contract";

export default function TokenInfo() {
  const [name, setName] = useState("...");
  const [symbol, setSymbol] = useState("...");
  const [balance, setBalance] = useState("...");

  useEffect(() => {
    (async () => {
      setName(await getTokenName());
      setSymbol(await getTokenSymbol());
      setBalance(
        await getTokenBalance("ST2JRM6B3WZQH7M4WJGKJ1KFY3KH7DJKQ5X8JH3RR")
      );
    })();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">Token Info</h2>
      <p>Name: {name}</p>
      <p>Symbol: {symbol}</p>
      <p>Balance: {balance}</p>
    </div>
  );
}
