import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { CategoryMetrics } from "@/data/coffeeData";

const COLORS = [
  "hsl(25, 65%, 28%)",
  "hsl(18, 70%, 42%)",
  "hsl(40, 80%, 55%)",
  "hsl(30, 55%, 55%)",
  "hsl(20, 50%, 35%)",
];

interface Props {
  data: CategoryMetrics[];
}

const CategoryRevenueChart = ({ data }: Props) => {
  const chartData = data.map(d => ({
    name: d.category,
    value: Math.round(d.total_revenue),
    share: d.revenue_share.toFixed(1),
  }));

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h3 className="font-display text-lg font-semibold text-card-foreground mb-4">
        Category Revenue Distribution
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={110}
            paddingAngle={3}
            dataKey="value"
            stroke="none"
          >
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid hsl(30, 15%, 88%)",
              fontFamily: "Source Sans 3",
              fontSize: "13px",
            }}
          />
          <Legend
            wrapperStyle={{ fontFamily: "Source Sans 3", fontSize: "13px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryRevenueChart;
