"use client";

import { useState } from "react";
import { transferToken } from "@/lib/contract";

export default function TransferForm() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await transferToken(recipient, Number(amount));
    alert("Token sent!");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow space-y-4"
    >
      <h2 className="text-xl font-bold">Transfer Token</h2>
      <input
        type="text"
        placeholder="Recipient Address"
        className="border p-2 w-full"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        className="border p-2 w-full"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Send
      </button>
    </form>
  );
}
