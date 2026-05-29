import { useEffect, useState } from "react";
import { getAnalytics } from "../services/analyticsService";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadData() {
      const res = await getAnalytics();
      setData(res);
    }

    loadData();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>Investment Analytics</h2>

      <p>Total Investments: {data.total_investments}</p>
      <p>Total Amount Invested: ₹{data.total_amount}</p>
    </div>
  );
}