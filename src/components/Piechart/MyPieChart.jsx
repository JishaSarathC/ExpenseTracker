import { PieChart, Pie, Cell, ResponsiveContainer,Legend} from "recharts";


const COLORS = ["#A000FF", "#FF9304", "#FDE006"];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  if (!cx || !cy || !innerRadius || !outerRadius) return null;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-(midAngle || 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle || 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      style={{ fontSize: "12px" }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function MyPieChart({expenses}) {
  const pieData=Object.values(
    expenses.reduce((acc,curr) =>{
      acc[curr.category]??={name:curr.category,value:0};
      acc[curr.category].value+=Number(curr.amount);
      return acc;
    },{})
  );
  return (
    
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer >
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={50}
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
            <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
