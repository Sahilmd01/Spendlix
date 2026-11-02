import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { LuChartBar, LuPlus } from "react-icons/lu";

const CustomBarChart = ({
  data,
  emptyTitle = "No data recorded",
  emptySubtitle = "Transactions logged will appear as bar charts here",
  onAdd,
  addButtonText,
}) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const hasData =
    data && data.length > 0 && data.some((item) => Number(item.amount) > 0);

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
          <LuChartBar size={22} />
        </div>
        <div
          style={{
            fontSize: "14px",
            fontWeight: 500,
            color: "var(--text-primary)",
          }}
        >
          {emptyTitle}
        </div>
        <div
          style={{
            fontSize: "12px",
            color: "var(--text-muted)",
            maxWidth: "280px",
          }}
        >
          {emptySubtitle}
        </div>
        {onAdd && (
          <button
            onClick={onAdd}
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
            <span>{addButtonText || "Add Entry"}</span>
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
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
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
            {payload[0].payload.category || payload[0].payload.source}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              fontWeight: 700,
              color: "var(--primary-light)",
            }}
          >
            ₹{payload[0].payload.amount?.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      style={{
        backgroundColor: "transparent",
        marginTop: "16px",
        width: "100%",
        overflowX: data.length > 8 ? "auto" : "visible",
      }}
    >
      <div
        style={{
          width: data.length > 8 ? `${data.length * 48}px` : "100%",
          minWidth: "100%",
        }}
      >
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={data}
            margin={{ top: 15, right: 15, left: -20, bottom: 25 }}
            onMouseMove={(state) => {
              if (state.isTooltipActive) {
                setActiveIndex(state.activeTooltipIndex);
              } else {
                setActiveIndex(null);
              }
            }}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(255, 255, 255, 0.04)"
            />
            <XAxis
              dataKey={data[0]?.category ? "category" : "source"}
              tick={{ fill: "#9292A3", fontSize: 11 }}
              axisLine={{ stroke: "rgba(255, 255, 255, 0.08)" }}
              tickLine={false}
              interval={0}
              angle={-25}
              textAnchor="end"
            />
            <YAxis
              tick={{ fill: "#9292A3", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) =>
                `₹${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`
              }
            />
            <Tooltip
              content={<CustomToolTip />}
              cursor={{ fill: "rgba(255,255,255,0.02)" }}
            />
            <Bar dataKey="amount" radius={[8, 8, 4, 4]}>
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === activeIndex ? "#3B82F6" : "#1D3D79"}
                  style={{
                    filter:
                      index === activeIndex
                        ? "drop-shadow(0 0 8px rgba(37,99,235,0.4))"
                        : "none",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomBarChart;
