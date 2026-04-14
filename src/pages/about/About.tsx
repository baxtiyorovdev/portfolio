import { useEffect, useState } from "react";
import type { PortfolioData } from "../../types";

export default function About() {
  const [data, setData] = useState<PortfolioData | null>(null);
  useEffect(() => {
    fetch("/api/data.json")
      .then((res) => res.json())
      .then((portfolioData) => setData(portfolioData));
  }, []);
  return (
    <div className="text-white2">
      <h1 className="text-3xl font-bold mb-4">About Me</h1>
      <p>{data?.about?.description || "Loading..."}</p>
    </div>
  );
}
