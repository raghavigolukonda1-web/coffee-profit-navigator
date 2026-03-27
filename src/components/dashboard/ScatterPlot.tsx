import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ZAxis,
} from "recharts";
import { ProductMetrics } from "@/data/coffeeData";

interface Props {
  data: ProductMetrics[];
}

const ScatterPlot = ({ data }: Props) => {
  const chartData = data.map(m => ({
    x: m.total_qty,
    y: m.total_revenue,
    name: m.product_detail,
    category: m.product_category,
    z: m.unit_price,
  }));

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h3 className="font-display text-lg font-semibold text-card-foreground mb-1">
        Popularity vs Revenue
      </h3>
      <p className="text-xs text-muted-foreground mb-4">Bubble size = unit price</p>
      <ResponsiveContainer width="100%" height={320}>
        <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(30,12%,90%)" />
          <XAxis
            dataKey="x"
            name="Units Sold"
            tick={{ fontSize: 11, fontFamily: "Source Sans 3" }}
            label={{ value: "Units Sold", position: "insideBottom", offset: -5, fontSize: 12 }}
          />
          <YAxis
            dataKey="y"
            name="Revenue"
            tick={{ fontSize: 11, fontFamily: "Source Sans 3" }}
            tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
          />
          <ZAxis dataKey="z" range={[80, 400]} />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid hsl(30, 15%, 88%)",
              fontFamily: "Source Sans 3",
              fontSize: "12px",
            }}
            formatter={(value: number, name: string) => {
              if (name === "Revenue") return [`$${value.toLocaleString()}`, name];
              return [value.toLocaleString(), name];
            }}
            labelFormatter={(_, payload) => payload[0]?.payload?.name || ""}
          />
          <Scatter data={chartData} fill="hsl(25,65%,28%)" fillOpacity={0.7} stroke="hsl(25,65%,20%)" strokeWidth={1} />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScatterPlot;
