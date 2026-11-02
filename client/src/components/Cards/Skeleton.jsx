import React from "react";

export const Skeleton = ({
  width = "100%",
  height = "16px",
  borderRadius = "var(--radius-sm)",
  className = "",
  style = {},
}) => {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        width,
        height,
        borderRadius,
        ...style,
      }}
    />
  );
};

export const StatCardSkeleton = () => {
  return (
    <div
      style={{
        padding: "14px 18px",
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-md)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Skeleton width="90px" height="12px" />
        <Skeleton width="45px" height="18px" borderRadius="var(--radius-pill)" />
      </div>
      <Skeleton width="130px" height="32px" style={{ margin: "4px 0" }} />
      <Skeleton width="110px" height="12px" />
    </div>
  );
};

export const ChartCardSkeleton = ({ height = 300 }) => {
  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <Skeleton width="150px" height="18px" />
          <Skeleton width="220px" height="12px" />
        </div>
        <Skeleton width="90px" height="28px" borderRadius="var(--radius-pill)" />
      </div>
      <Skeleton width="100%" height={`${height}px`} borderRadius="var(--radius-md)" />
    </div>
  );
};

export const TransactionListSkeleton = ({ count = 4 }) => {
  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Skeleton width="130px" height="18px" />
        <Skeleton width="80px" height="26px" borderRadius="var(--radius-md)" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3" style={{ marginTop: "4px" }}>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 14px",
              backgroundColor: "var(--surface-muted)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-default)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Skeleton width="38px" height="38px" borderRadius="50%" />
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <Skeleton width="90px" height="14px" />
                <Skeleton width="70px" height="11px" />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
              <Skeleton width="65px" height="15px" />
              <Skeleton width="18px" height="18px" borderRadius="4px" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skeleton;
