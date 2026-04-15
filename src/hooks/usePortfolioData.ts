import { useState } from "react";
import { getStoredPortfolioData } from "../lib/storage";

export default function usePortfolioData() {
  const [data] = useState(getStoredPortfolioData);

  return data;
}
