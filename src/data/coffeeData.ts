// Mock dataset for Afficionado Coffee Roasters
export interface Transaction {
  transaction_id: string;
  year: number;
  transaction_time: string;
  transaction_qty: number;
  unit_price: number;
  store_id: string;
  store_location: string;
  balance: number;
  product_id: string;
  product_category: string;
  product_type: string;
  product_detail: string;
}

const storeLocations = [
  { id: "S1", location: "Lower Manhattan" },
  { id: "S2", location: "Hell's Kitchen" },
  { id: "S3", location: "Astoria" },
];

const products = [
  { id: "P01", category: "Coffee", type: "Espresso", detail: "House Blend", price: 3.5 },
  { id: "P02", category: "Coffee", type: "Espresso", detail: "Single Origin Ethiopian", price: 4.5 },
  { id: "P03", category: "Coffee", type: "Latte", detail: "Classic Latte", price: 5.0 },
  { id: "P04", category: "Coffee", type: "Latte", detail: "Vanilla Latte", price: 5.5 },
  { id: "P05", category: "Coffee", type: "Latte", detail: "Caramel Latte", price: 5.75 },
  { id: "P06", category: "Coffee", type: "Cappuccino", detail: "Traditional Cappuccino", price: 4.75 },
  { id: "P07", category: "Coffee", type: "Cold Brew", detail: "Nitro Cold Brew", price: 5.25 },
  { id: "P08", category: "Coffee", type: "Cold Brew", detail: "Classic Cold Brew", price: 4.25 },
  { id: "P09", category: "Coffee", type: "Pour Over", detail: "Colombian Pour Over", price: 4.0 },
  { id: "P10", category: "Coffee", type: "Americano", detail: "Iced Americano", price: 3.75 },
  { id: "P11", category: "Tea", type: "Green Tea", detail: "Matcha Latte", price: 5.5 },
  { id: "P12", category: "Tea", type: "Green Tea", detail: "Sencha", price: 3.25 },
  { id: "P13", category: "Tea", type: "Herbal Tea", detail: "Chamomile", price: 3.0 },
  { id: "P14", category: "Tea", type: "Herbal Tea", detail: "Peppermint", price: 3.0 },
  { id: "P15", category: "Tea", type: "Chai", detail: "Spiced Chai Latte", price: 5.25 },
  { id: "P16", category: "Chocolate", type: "Hot Chocolate", detail: "Belgian Dark", price: 4.75 },
  { id: "P17", category: "Chocolate", type: "Hot Chocolate", detail: "White Chocolate Mocha", price: 5.5 },
  { id: "P18", category: "Chocolate", type: "Iced Chocolate", detail: "Iced Mocha", price: 5.0 },
];

// Seeded random for consistency
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

function generateTransactions(): Transaction[] {
  const rand = seededRandom(42);
  const txns: Transaction[] = [];

  // Weight products differently for realistic distribution
  const weights: Record<string, number> = {
    P01: 18, P02: 8, P03: 22, P04: 15, P05: 14, P06: 12, P07: 16,
    P08: 10, P09: 5, P10: 9, P11: 11, P12: 4, P13: 3, P14: 2,
    P15: 10, P16: 7, P17: 6, P18: 5,
  };

  const weightedProducts: typeof products[0][] = [];
  products.forEach(p => {
    const w = weights[p.id] || 5;
    for (let i = 0; i < w; i++) weightedProducts.push(p);
  });

  for (let i = 0; i < 4200; i++) {
    const product = weightedProducts[Math.floor(rand() * weightedProducts.length)];
    const store = storeLocations[Math.floor(rand() * storeLocations.length)];
    const qty = Math.floor(rand() * 3) + 1;
    const hour = Math.floor(rand() * 14) + 6;
    const min = Math.floor(rand() * 60);

    txns.push({
      transaction_id: `TXN-${String(i + 1).padStart(5, "0")}`,
      year: 2025,
      transaction_time: `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}:00`,
      transaction_qty: qty,
      unit_price: product.price,
      store_id: store.id,
      store_location: store.location,
      balance: Math.round((50 + rand() * 950) * 100) / 100,
      product_id: product.id,
      product_category: product.category,
      product_type: product.type,
      product_detail: product.detail,
    });
  }

  return txns;
}

export const transactions = generateTransactions();
export const allProducts = products;
export const allStores = storeLocations;
export const categories = ["Coffee", "Tea", "Chocolate"] as const;

// Derived analytics
export interface ProductMetrics {
  product_id: string;
  product_detail: string;
  product_type: string;
  product_category: string;
  unit_price: number;
  total_qty: number;
  total_revenue: number;
  revenue_share: number;
  volume_rank: number;
  revenue_rank: number;
}

export interface CategoryMetrics {
  category: string;
  total_revenue: number;
  revenue_share: number;
  total_qty: number;
  product_count: number;
}

export function computeProductMetrics(data: Transaction[]): ProductMetrics[] {
  const map = new Map<string, { qty: number; revenue: number }>();

  data.forEach(t => {
    const existing = map.get(t.product_id) || { qty: 0, revenue: 0 };
    existing.qty += t.transaction_qty;
    existing.revenue += t.transaction_qty * t.unit_price;
    map.set(t.product_id, existing);
  });

  const totalRevenue = Array.from(map.values()).reduce((s, v) => s + v.revenue, 0);

  const metrics: ProductMetrics[] = allProducts.map(p => {
    const m = map.get(p.id) || { qty: 0, revenue: 0 };
    return {
      product_id: p.id,
      product_detail: p.detail,
      product_type: p.type,
      product_category: p.category,
      unit_price: p.price,
      total_qty: m.qty,
      total_revenue: Math.round(m.revenue * 100) / 100,
      revenue_share: totalRevenue > 0 ? (m.revenue / totalRevenue) * 100 : 0,
      volume_rank: 0,
      revenue_rank: 0,
    };
  });

  metrics.sort((a, b) => b.total_qty - a.total_qty);
  metrics.forEach((m, i) => (m.volume_rank = i + 1));
  metrics.sort((a, b) => b.total_revenue - a.total_revenue);
  metrics.forEach((m, i) => (m.revenue_rank = i + 1));

  return metrics;
}

export function computeCategoryMetrics(data: Transaction[]): CategoryMetrics[] {
  const map = new Map<string, { revenue: number; qty: number; products: Set<string> }>();

  data.forEach(t => {
    const existing = map.get(t.product_category) || { revenue: 0, qty: 0, products: new Set<string>() };
    existing.revenue += t.transaction_qty * t.unit_price;
    existing.qty += t.transaction_qty;
    existing.products.add(t.product_id);
    map.set(t.product_category, existing);
  });

  const totalRevenue = Array.from(map.values()).reduce((s, v) => s + v.revenue, 0);

  return Array.from(map.entries()).map(([cat, v]) => ({
    category: cat,
    total_revenue: Math.round(v.revenue * 100) / 100,
    revenue_share: totalRevenue > 0 ? (v.revenue / totalRevenue) * 100 : 0,
    total_qty: v.qty,
    product_count: v.products.size,
  })).sort((a, b) => b.total_revenue - a.total_revenue);
}

export function computeParetoData(metrics: ProductMetrics[]) {
  const sorted = [...metrics].sort((a, b) => b.total_revenue - a.total_revenue);
  const totalRevenue = sorted.reduce((s, m) => s + m.total_revenue, 0);
  let cumulative = 0;

  return sorted.map((m, i) => {
    cumulative += m.total_revenue;
    return {
      product: m.product_detail,
      revenue: m.total_revenue,
      cumulative_pct: (cumulative / totalRevenue) * 100,
      index: i + 1,
    };
  });
}
