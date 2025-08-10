import TokenInfo from "../components/TokenInfo";

export default function Home() {
  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Workshop Token Dashboard</h1>
      <TokenInfo />
    </main>
  );
}
