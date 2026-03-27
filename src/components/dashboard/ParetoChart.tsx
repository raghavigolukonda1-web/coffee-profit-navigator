import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from "recharts";

interface ParetoItem {
  product: string;
  revenue: number;
  cumulative_pct: number;
  index: number;
}

interface Props {
  data: ParetoItem[];
}

const ParetoChart = ({ data }: Props) => {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h3 className="font-display text-lg font-semibold text-card-foreground mb-1">
        Revenue Concentration (Pareto)
      </h3>
      <p className="text-xs text-muted-foreground mb-4">80/20 analysis — identifying revenue anchors</p>
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={data} margin={{ top: 5, right: 20, bottom: 50, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(30,12%,90%)" />
          <XAxis
            dataKey="product"
            angle={-40}
            textAnchor="end"
            tick={{ fontSize: 10, fontFamily: "Source Sans 3" }}
            interval={0}
            height={70}
          />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 11, fontFamily: "Source Sans 3" }}
            tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, 100]}
            tick={{ fontSize: 11, fontFamily: "Source Sans 3" }}
            tickFormatter={v => `${v}%`}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid hsl(30, 15%, 88%)",
              fontFamily: "Source Sans 3",
              fontSize: "12px",
            }}
            formatter={(value: number, name: string) =>
              name === "cumulative_pct"
                ? [`${value.toFixed(1)}%`, "Cumulative %"]
                : [`$${value.toLocaleString()}`, "Revenue"]
            }
          />
          <ReferenceLine yAxisId="right" y={80} stroke="hsl(18,70%,42%)" strokeDasharray="5 3" label={{ value: "80%", fontSize: 11, fill: "hsl(18,70%,42%)" }} />
          <Bar yAxisId="left" dataKey="revenue" fill="hsl(25,65%,28%)" radius={[4, 4, 0, 0]} />
          <Line yAxisId="right" dataKey="cumulative_pct" stroke="hsl(40,80%,55%)" strokeWidth={2.5} dot={{ r: 3, fill: "hsl(40,80%,55%)" }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ParetoChart;
