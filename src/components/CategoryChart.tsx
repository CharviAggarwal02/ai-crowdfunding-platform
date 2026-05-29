import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#06b6d4","#3b82f6","#8b5cf6","#22c55e","#f59e0b"];

export default function CategoryChart({ data }: any) {

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>

        <Pie
          data={data}
          dataKey="value"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={90}
          label
        >

          {data.map((entry: any, index: number) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}

        </Pie>

        <Tooltip />

      </PieChart>
    </ResponsiveContainer>
  );
}