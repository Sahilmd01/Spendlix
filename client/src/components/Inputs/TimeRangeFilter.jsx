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

const TimeRangeFilter = ({ activeFilter, onChange, options = FILTER_OPTIONS, className = "" }) => {
  return (
    <div className={`time-range-filter-bar ${className}`}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          paddingLeft: "8px",
          paddingRight: "4px",
          color: "var(--text-muted)",
          fontSize: "12px",
          flexShrink: 0,
        }}
        className="time-range-calendar-icon"
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
            className={`time-range-filter-btn ${isActive ? "active" : "inactive"}`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};

export default TimeRangeFilter;
