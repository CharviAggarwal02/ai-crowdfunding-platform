import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function PortfolioChart({ data }: any) {

  return (
    <ResponsiveContainer width="100%" height={250}>

      <LineChart data={data}>

        <CartesianGrid strokeDasharray="3 3" stroke="#334155"/>

        <XAxis dataKey="month" stroke="#94a3b8"/>

        <YAxis stroke="#94a3b8"/>

        <Tooltip />

        <Line
          type="monotone"
          dataKey="value"
          stroke="#06b6d4"
          strokeWidth={3}
        />

      </LineChart>

    </ResponsiveContainer>
  );
}