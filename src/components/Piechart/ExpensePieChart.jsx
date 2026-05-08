import { Pie, PieChart,ResponsiveContainer,Cell,Legend } from 'recharts';


// #region Sample data


// #endregion
const RADIAN = Math.PI / 180;
const COLORS = ["#A000FF", "#FF9304", "#FDE006"];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (!cx || !cy || !innerRadius || !outerRadius ) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
 
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  
  const y = cy + radius * Math.sin(-midAngle  * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
     
       {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};



export default function ExpensePieChart({food,entertainment,travel}){
  const data = [
  { name: 'Food', value: food },
  { name: 'Entertainment', value: entertainment },
  { name: 'Travel', value: travel },
 
];
  return (
    <ResponsiveContainer width="100%" height={200}>
    <PieChart  >
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={80}
        labelLine={false}
        label={renderCustomizedLabel}
        
        dataKey="value"
        
      >
      {data.map((entry,index) => (
        <Cell key={index} fill={COLORS[index % COLORS.length]}/>))}
       </Pie> 
      <Legend/>
      
    </PieChart>
    </ResponsiveContainer>
  );
}