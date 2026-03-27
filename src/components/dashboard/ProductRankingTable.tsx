import { ProductMetrics } from "@/data/coffeeData";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

interface Props {
  data: ProductMetrics[];
  topN: number;
}

const ProductRankingTable = ({ data, topN }: Props) => {
  const sorted = [...data].sort((a, b) => b.total_revenue - a.total_revenue).slice(0, topN);

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm overflow-auto">
      <h3 className="font-display text-lg font-semibold text-card-foreground mb-4">
        Product Performance Rankings
      </h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-muted-foreground">
            <th className="text-left pb-3 font-medium">#</th>
            <th className="text-left pb-3 font-medium">Product</th>
            <th className="text-left pb-3 font-medium hidden sm:table-cell">Category</th>
            <th className="text-right pb-3 font-medium">Units</th>
            <th className="text-right pb-3 font-medium">Revenue</th>
            <th className="text-right pb-3 font-medium">Share</th>
            <th className="text-center pb-3 font-medium hidden md:table-cell">Vol vs Rev</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((m, i) => {
            const diff = m.volume_rank - m.revenue_rank;
            return (
              <tr key={m.product_id} className="border-b border-border/50 hover:bg-muted/40 transition-colors">
                <td className="py-3 font-semibold text-muted-foreground">{i + 1}</td>
                <td className="py-3">
                  <div className="font-medium text-card-foreground">{m.product_detail}</div>
                  <div className="text-xs text-muted-foreground">{m.product_type}</div>
                </td>
                <td className="py-3 hidden sm:table-cell">
                  <span className="inline-block rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                    {m.product_category}
                  </span>
                </td>
                <td className="py-3 text-right tabular-nums">{m.total_qty.toLocaleString()}</td>
                <td className="py-3 text-right tabular-nums font-medium">${m.total_revenue.toLocaleString()}</td>
                <td className="py-3 text-right tabular-nums">{m.revenue_share.toFixed(1)}%</td>
                <td className="py-3 text-center hidden md:table-cell">
                  {diff > 0 ? (
                    <span className="inline-flex items-center gap-0.5 text-green-600 text-xs">
                      <ArrowUp className="h-3 w-3" /> {diff}
                    </span>
                  ) : diff < 0 ? (
                    <span className="inline-flex items-center gap-0.5 text-accent text-xs">
                      <ArrowDown className="h-3 w-3" /> {Math.abs(diff)}
                    </span>
                  ) : (
                    <Minus className="h-3 w-3 text-muted-foreground mx-auto" />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductRankingTable;
