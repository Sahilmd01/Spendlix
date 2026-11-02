import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { LuTrendingDown, LuPlus } from "react-icons/lu";

const CustomLineChart = ({ data, onAddExpense }) => {
  const hasData = data && data.length > 0 && data.some((item) => Number(item.amount) > 0);

  if (!hasData) {
    return (
      <div
        style={{
          height: "260px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: "var(--surface)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--text-muted)",
          }}
        >
          <LuTrendingDown size={22} />
        </div>
        <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)" }}>
          No expense trend data yet
        </div>
        <div style={{ fontSize: "12px", color: "var(--text-muted)", maxWidth: "280px" }}>
          Add your first expense to visualize category spending trends over time
        </div>
        {onAddExpense && (
          <button
            onClick={onAddExpense}
            className="btn btn-secondary"
            style={{
              marginTop: "8px",
              padding: "7px 16px",
              fontSize: "12px",
              borderRadius: "var(--radius-pill)",
              gap: "6px",
            }}
          >
            <LuPlus size={14} />
            <span>Add Expense</span>
          </button>
        )}
      </div>
    );
  }

  const CustomToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "#10101B",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "var(--radius-md)",
            padding: "10px 14px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              color: "var(--text-muted)",
              marginBottom: "4px",
              textTransform: "uppercase",
            }}
          >
            {payload[0].payload.category}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "var(--primary-light)",
              }}
            />
            <span style={{ fontSize: "14px", fontWeight: 700, color: "#FFFFFF" }}>
              ₹{payload[0].payload.amount?.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ backgroundColor: "transparent", marginTop: "16px" }}>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 15, left: -20, bottom: 20 }}>
          <defs>
            <linearGradient id="expenseAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity={0.4} />
              <stop offset="80%" stopColor="#2563EB" stopOpacity={0.05} />
              <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="rgba(255, 255, 255, 0.04)"
          />
          <XAxis
            dataKey="category"
            tick={{ fill: "#9292A3", fontSize: 11 }}
            axisLine={{ stroke: "rgba(255, 255, 255, 0.08)" }}
            tickLine={false}
            angle={-20}
            textAnchor="end"
          />
          <YAxis
            tick={{ fill: "#9292A3", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
          />
          <Tooltip content={<CustomToolTip />} />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#3B82F6"
            strokeWidth={3}
            fill="url(#expenseAreaGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;