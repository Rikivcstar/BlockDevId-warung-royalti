"use client";

import { useState } from "react";
import { rewardCustomer } from "@/lib/contract";

export default function RewardForm() {
  const [customer, setCustomer] = useState("");
  const [points, setPoints] = useState("");

  async function handleReward(e: React.FormEvent) {
    e.preventDefault();
    await rewardCustomer(customer, Number(points));
    alert("Customer rewarded!");
  }

  return (
    <form
      onSubmit={handleReward}
      className="bg-white p-4 rounded-lg shadow space-y-4"
    >
      <h2 className="text-xl font-bold">Reward Customer</h2>
      <input
        type="text"
        placeholder="Customer Address"
        className="border p-2 w-full"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
      />
      <input
        type="number"
        placeholder="Points"
        className="border p-2 w-full"
        value={points}
        onChange={(e) => setPoints(e.target.value)}
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Reward
      </button>
    </form>
  );
}
