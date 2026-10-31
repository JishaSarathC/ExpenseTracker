import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import "./TinyBarChart.css";

export default function TinyBarChart({ expenses }) {

  const data = {
    Food: { name: "Food", amount: 0 },
    Entertainment: { name: "Entertainment", amount: 0 },
    Travel: { name: "Travel", amount: 0 }
  };

  const barData = Object.values(
    expenses.reduce((acc, curr) => {
      acc[curr.category] ??= {
        name: curr.category,
        amount: 0
      };

      acc[curr.category].amount += Number(curr.amount);
      return acc;
    }, structuredClone(data))
  );

  return (
    <div className="tiny-bar-chart">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={barData}
          layout="vertical"
          margin={{ right: 10 }}
        >
          <XAxis
            type="number"
            axisLine={false}
            tick={false}
          />

          <YAxis
            dataKey="name"
            type="category"
            axisLine={false}
            width={100}
          />

          <Tooltip />

          <Bar
            dataKey="amount"
            fill="#8784D2"
            barSize={26}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}