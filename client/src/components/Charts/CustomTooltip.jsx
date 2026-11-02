import React from "react";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const categoryColor = payload[0].payload?.fill || "var(--primary)";

    return (
      <div
        className="chart-tooltip"
        style={{
          minWidth: "140px",
          backgroundColor: "#10101B",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "var(--radius-md)",
          padding: "10px 14px",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: categoryColor,
            }}
          />
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF" }}>
            {payload[0].name}
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px" }}>
          <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Amount:</span>
          <span style={{ fontSize: "13px", fontWeight: 700, color: categoryColor }}>
            ₹{payload[0].value?.toLocaleString()}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;