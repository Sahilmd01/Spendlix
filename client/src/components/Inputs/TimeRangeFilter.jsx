import React from "react";
import { LuCalendar } from "react-icons/lu";

export const FILTER_OPTIONS = [
  { label: "All Time", value: "all" },
  { label: "This Week", value: "weekly" },
  { label: "This Month", value: "monthly" },
  { label: "This Year", value: "yearly" },
];

export const isWithinTimeRange = (dateString, filter) => {
  if (!dateString || filter === "all") return true;

  const targetDate = new Date(dateString);
  if (isNaN(targetDate.getTime())) return false;

  const now = new Date();

  if (filter === "weekly") {
    // Current week (last 7 days or start of week)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);
    return targetDate >= sevenDaysAgo;
  }

  if (filter === "monthly") {
    // Current calendar month or last 30 days
    return (
      targetDate.getMonth() === now.getMonth() &&
      targetDate.getFullYear() === now.getFullYear()
    );
  }

  if (filter === "yearly") {
    // Current calendar year
    return targetDate.getFullYear() === now.getFullYear();
  }

  return true;
};

const TimeRangeFilter = ({ activeFilter, onChange, options = FILTER_OPTIONS }) => {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        backgroundColor: "var(--surface)",
        padding: "3px 4px",
        borderRadius: "var(--radius-pill)",
        border: "1px solid var(--border-default)",
        gap: "4px",
        overflowX: "auto",
        maxWidth: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          paddingLeft: "8px",
          paddingRight: "4px",
          color: "var(--text-muted)",
          fontSize: "12px",
        }}
      >
        <LuCalendar size={13} />
      </div>

      {options.map((opt) => {
        const isActive = activeFilter === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            type="button"
            style={{
              padding: "5px 12px",
              fontSize: "12px",
              fontWeight: isActive ? 600 : 500,
              borderRadius: "var(--radius-pill)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
              backgroundColor: isActive ? "var(--primary)" : "transparent",
              color: isActive ? "#FFFFFF" : "var(--text-muted)",
              boxShadow: isActive ? "0 2px 8px rgba(37, 99, 235, 0.4)" : "none",
              whiteSpace: "nowrap",
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};

export default TimeRangeFilter;
