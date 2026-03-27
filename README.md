# Afficionado Coffee Roasters — Product Optimization & Revenue Contribution Analysis

A React-based analytics dashboard for **Afficionado Coffee Roasters** that delivers actionable product intelligence to support menu optimization and merchandising strategy.

![Dashboard](https://img.shields.io/badge/Status-Active-green) ![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Vite](https://img.shields.io/badge/Vite-5-purple)

---

## Table of Contents

- [Background & Context](#background--context)
- [Problem Statement](#problem-statement)
- [Objectives](#objectives)
- [Dataset Description](#dataset-description)
- [Analytical Methodology](#analytical-methodology)
- [Key Performance Indicators (KPIs)](#key-performance-indicators-kpis)
- [Dashboard Features](#dashboard-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)

---

## Background & Context

In specialty coffee retail, not all products contribute equally to revenue. Common challenges include:

- High-volume products with low revenue contribution
- High-priced products with low sales frequency
- Overcrowded menus that slow service and confuse customers

This project provides **product-centric intelligence** to understand:

- Which products customers prefer
- Which products generate the most revenue
- How revenue is distributed across categories and variants

---

## Problem Statement

Although transaction-level product data is available, Afficionado Coffee Roasters lacks:

- Clear visibility into **product popularity vs. profitability**
- **Category-level revenue dependency** insights
- Identification of **low-impact or underperforming** menu items

Without structured product analytics, menu decisions are often intuition-driven, leading to inefficiencies and missed revenue opportunities.

---

## Objectives

### Primary

- Identify top-selling and least-selling products
- Quantify revenue contribution by product and category
- Measure revenue concentration across the menu

### Secondary

- Support menu simplification and optimization
- Identify high-impact "hero" products
- Highlight low-performing products for review or redesign

---

## Dataset Description

The dashboard uses a mock dataset of **4,200 transactions** across **18 products** and **3 store locations**.

| Column             | Description                                      |
| ------------------ | ------------------------------------------------ |
| `transaction_id`   | Unique identifier per transaction                |
| `year`             | Transaction year (2025)                          |
| `transaction_time` | Time of transaction (HH:MM:SS)                   |
| `transaction_qty`  | Quantity purchased                               |
| `unit_price`       | Price per unit                                   |
| `store_id`         | Store identifier                                 |
| `store_location`   | Physical store location                          |
| `balance`          | Account balance                                  |
| `product_id`       | Unique identifier for each product               |
| `product_category` | Broad product group (Coffee, Tea, Chocolate)     |
| `product_type`     | Product variant within the category              |
| `product_detail`   | Detailed attributes such as flavor or blend      |

### Store Locations

- **S1** — Lower Manhattan
- **S2** — Hell's Kitchen
- **S3** — Astoria

### Product Categories

- **Coffee** (10 products): Espresso, Latte, Cappuccino, Cold Brew, Pour Over, Americano
- **Tea** (5 products): Green Tea, Herbal Tea, Chai
- **Chocolate** (3 products): Hot Chocolate, Iced Chocolate

---

## Analytical Methodology

### 1. Data Ingestion & Validation

- Load transaction-level data
- Validate product identifiers and prices
- Ensure quantities are positive and realistic

### 2. Revenue Computation

- Revenue at transaction level: `Revenue = transaction_qty × unit_price`
- Aggregation by Product, Product Type, and Product Category

### 3. Product Popularity Analysis

- Total units sold per product
- Ranking products by sales volume
- Identify top and bottom performers

### 4. Revenue Contribution Analysis

- Total revenue per product
- Revenue share (%) of each product
- Comparison between volume rank and revenue rank

### 5. Category & Product-Type Performance

- Revenue share by category (Coffee, Tea, Chocolate)
- Product-type contribution within each category
- Dependence analysis on core categories

### 6. Revenue Concentration & Menu Balance (Pareto / 80-20 Analysis)

- Identify **revenue anchors** (few products driving most revenue)
- Identify **long-tail products** with minimal impact
- Evaluate menu diversification risk

---

## Key Performance Indicators (KPIs)

| KPI Name                         | Description               |
| -------------------------------- | ------------------------- |
| Product Revenue Contribution (%) | Share of total revenue     |
| Product Sales Volume             | Popularity indicator       |
| Category Revenue Share           | Business dependency        |
| Revenue Concentration Ratio      | Menu risk exposure         |
| Product Efficiency Score         | Revenue per SKU            |

---

## Dashboard Features

### Core Modules

| Module                        | Description                                                    |
| ----------------------------- | -------------------------------------------------------------- |
| **KPI Cards**                 | Revenue, Units Sold, Top Category, Revenue per SKU             |
| **Category Revenue Chart**    | Bar chart showing revenue distribution across categories       |
| **Scatter Plot**              | Popularity vs. Revenue with bubble size = unit price           |
| **Pareto Chart**              | Revenue concentration analysis with 80% reference line         |
| **Category Breakdown**        | Horizontal bar charts for product-type performance per category|
| **Product Ranking Table**     | Detailed table with volume rank vs. revenue rank comparison    |

### Interactive Filters

- **Category filter** — Filter by Coffee, Tea, or Chocolate
- **Store location selector** — Filter by store (Lower Manhattan, Hell's Kitchen, Astoria)
- **Top-N slider** — Control how many products appear in the ranking table

---

## Tech Stack

| Technology        | Purpose                        |
| ----------------- | ------------------------------ |
| **React 18**      | UI framework                   |
| **TypeScript 5**  | Type safety                    |
| **Vite 5**        | Build tool & dev server        |
| **Tailwind CSS**  | Utility-first styling          |
| **Recharts**      | Data visualization (charts)    |
| **Framer Motion** | Animations & transitions       |
| **shadcn/ui**     | UI component library           |
| **Lucide React**  | Icon set                       |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** or **bun**

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd <project-directory>

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

### Run Tests

```bash
npm run test
```

---

## Project Structure

```
src/
├── components/
│   ├── dashboard/
│   │   ├── CategoryBreakdownChart.tsx   # Product-type performance per category
│   │   ├── CategoryRevenueChart.tsx     # Category revenue distribution
│   │   ├── DashboardFilters.tsx         # Interactive filter controls
│   │   ├── KPICards.tsx                 # Key performance indicator cards
│   │   ├── ParetoChart.tsx             # 80/20 revenue concentration chart
│   │   ├── ProductRankingTable.tsx      # Product ranking comparison table
│   │   └── ScatterPlot.tsx             # Popularity vs Revenue scatter plot
│   └── ui/                             # shadcn/ui components
├── data/
│   └── coffeeData.ts                   # Mock dataset & analytics engine
├── pages/
│   └── Index.tsx                       # Main dashboard page
├── index.css                           # Design system & theme tokens
└── main.tsx                            # App entry point
```

---

## Conclusion

This project delivers actionable product intelligence by shifting focus from *when* customers buy to **what they buy** and **what drives revenue**. By uncovering product-level performance and revenue concentration patterns, Afficionado Coffee Roasters can optimize its menu, improve operational efficiency, and strengthen long-term profitability.

---

© 2025 Afficionado Coffee Roasters · Product Intelligence Dashboard
