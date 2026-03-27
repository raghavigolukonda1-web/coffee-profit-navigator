import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Transaction, allProducts } from "@/data/coffeeData";

interface Props {
  data: Transaction[];
  category: string;
}

const CategoryBreakdownChart = ({ data, category }: Props) => {
  const filtered = data.filter(t => t.product_category === category);
  const typeMap = new Map<string, number>();

  filtered.forEach(t => {
    const rev = t.transaction_qty * t.unit_price;
    typeMap.set(t.product_type, (typeMap.get(t.product_type) || 0) + rev);
  });

  const chartData = Array.from(typeMap.entries())
    .map(([type, revenue]) => ({ type, revenue: Math.round(revenue) }))
    .sort((a, b) => b.revenue - a.revenue);

  if (chartData.length === 0) return null;

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h3 className="font-display text-lg font-semibold text-card-foreground mb-1">
        {category} — Product Type Breakdown
      </h3>
      <p className="text-xs text-muted-foreground mb-4">Revenue by product type within category</p>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 80 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(30,12%,90%)" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fontSize: 11, fontFamily: "Source Sans 3" }}
            tickFormatter={v => `$${(v / 1000).toFixed(1)}k`}
          />
          <YAxis
            type="category"
            dataKey="type"
            tick={{ fontSize: 12, fontFamily: "Source Sans 3" }}
            width={75}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid hsl(30, 15%, 88%)",
              fontFamily: "Source Sans 3",
              fontSize: "12px",
            }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
          />
          <Bar dataKey="revenue" fill="hsl(18,70%,42%)" radius={[0, 6, 6, 0]} barSize={24} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryBreakdownChart;
