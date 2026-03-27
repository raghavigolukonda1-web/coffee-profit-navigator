import { motion } from "framer-motion";
import { TrendingUp, ShoppingCart, Coffee, BarChart3 } from "lucide-react";
import { ProductMetrics, CategoryMetrics } from "@/data/coffeeData";

interface KPICardsProps {
  productMetrics: ProductMetrics[];
  categoryMetrics: CategoryMetrics[];
  totalTransactions: number;
}

const KPICards = ({ productMetrics, categoryMetrics, totalTransactions }: KPICardsProps) => {
  const totalRevenue = productMetrics.reduce((s, m) => s + m.total_revenue, 0);
  const totalUnits = productMetrics.reduce((s, m) => s + m.total_qty, 0);
  const topCategory = categoryMetrics[0];
  const revenuePerSKU = totalRevenue / productMetrics.length;

  const cards = [
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
      sub: `${totalTransactions.toLocaleString()} transactions`,
      icon: TrendingUp,
    },
    {
      label: "Units Sold",
      value: totalUnits.toLocaleString(),
      sub: `${productMetrics.length} SKUs`,
      icon: ShoppingCart,
    },
    {
      label: "Top Category",
      value: topCategory?.category || "—",
      sub: `${topCategory?.revenue_share.toFixed(1)}% of revenue`,
      icon: Coffee,
    },
    {
      label: "Revenue per SKU",
      value: `$${revenuePerSKU.toFixed(0)}`,
      sub: "Avg efficiency score",
      icon: BarChart3,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className="rounded-xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{card.label}</p>
              <p className="mt-1 text-2xl font-bold font-display text-card-foreground">{card.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{card.sub}</p>
            </div>
            <div className="rounded-lg bg-primary/10 p-2.5">
              <card.icon className="h-5 w-5 text-primary" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default KPICards;
