import { categories, allStores } from "@/data/coffeeData";

interface Props {
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  selectedStore: string;
  setSelectedStore: (v: string) => void;
  topN: number;
  setTopN: (v: number) => void;
}

const DashboardFilters = ({
  selectedCategory, setSelectedCategory,
  selectedStore, setSelectedStore,
  topN, setTopN,
}: Props) => {
  return (
    <div className="flex flex-wrap items-end gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</label>
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="rounded-lg border border-input bg-card px-3 py-2 text-sm text-card-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="All">All Categories</option>
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Store</label>
        <select
          value={selectedStore}
          onChange={e => setSelectedStore(e.target.value)}
          className="rounded-lg border border-input bg-card px-3 py-2 text-sm text-card-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="All">All Stores</option>
          {allStores.map(s => (
            <option key={s.id} value={s.id}>{s.location}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Top N Products: {topN}
        </label>
        <input
          type="range"
          min={5}
          max={18}
          value={topN}
          onChange={e => setTopN(Number(e.target.value))}
          className="w-32 accent-primary"
        />
      </div>
    </div>
  );
};

export default DashboardFilters;
