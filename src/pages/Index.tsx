import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Coffee } from "lucide-react";
import {
  transactions,
  computeProductMetrics,
  computeCategoryMetrics,
  computeParetoData,
} from "@/data/coffeeData";
import KPICards from "@/components/dashboard/KPICards";
import CategoryRevenueChart from "@/components/dashboard/CategoryRevenueChart";
import ProductRankingTable from "@/components/dashboard/ProductRankingTable";
import ParetoChart from "@/components/dashboard/ParetoChart";
import ScatterPlot from "@/components/dashboard/ScatterPlot";
import DashboardFilters from "@/components/dashboard/DashboardFilters";
import CategoryBreakdownChart from "@/components/dashboard/CategoryBreakdownChart";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStore, setSelectedStore] = useState("All");
  const [topN, setTopN] = useState(10);

  const filteredData = useMemo(() => {
    let data = transactions;
    if (selectedCategory !== "All") data = data.filter(t => t.product_category === selectedCategory);
    if (selectedStore !== "All") data = data.filter(t => t.store_id === selectedStore);
    return data;
  }, [selectedCategory, selectedStore]);

  const productMetrics = useMemo(() => computeProductMetrics(filteredData), [filteredData]);
  const categoryMetrics = useMemo(() => computeCategoryMetrics(filteredData), [filteredData]);
  const paretoData = useMemo(() => computeParetoData(productMetrics), [productMetrics]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto flex items-center gap-3 px-4 py-4">
          <div className="rounded-lg bg-primary p-2">
            <Coffee className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-foreground leading-tight">
              Afficionado Coffee Roasters
            </h1>
            <p className="text-xs text-muted-foreground">Product Optimization & Revenue Contribution Analysis</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Filters */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <DashboardFilters
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedStore={selectedStore}
            setSelectedStore={setSelectedStore}
            topN={topN}
            setTopN={setTopN}
          />
        </motion.div>

        {/* KPIs */}
        <KPICards
          productMetrics={productMetrics}
          categoryMetrics={categoryMetrics}
          totalTransactions={filteredData.length}
        />

        {/* Charts row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CategoryRevenueChart data={categoryMetrics} />
          <ScatterPlot data={productMetrics} />
        </div>

        {/* Pareto */}
        <ParetoChart data={paretoData} />

        {/* Category breakdown */}
        {selectedCategory !== "All" ? (
          <CategoryBreakdownChart data={filteredData} category={selectedCategory} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {["Coffee", "Tea", "Chocolate"].map(cat => (
              <CategoryBreakdownChart key={cat} data={filteredData} category={cat} />
            ))}
          </div>
        )}

        {/* Product Table */}
        <ProductRankingTable data={productMetrics} topN={topN} />
      </main>

      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © 2025 Afficionado Coffee Roasters · Product Intelligence Dashboard
      </footer>
    </div>
  );
};

export default Index;
