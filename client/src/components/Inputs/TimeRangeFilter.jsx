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
    // Current week: Start from Monday 00:00:00 of the current week up to end of today
    const day = now.getDay();
    const diffToMonday = (day === 0 ? -6 : 1) - day; // Adjust when Sunday (0)
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + diffToMonday);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);
    endOfWeek.setMilliseconds(-1);

    return targetDate >= startOfWeek && targetDate <= endOfWeek;
  }

  if (filter === "monthly") {
    // Current calendar month: 1st day of month 00:00:00 to last day 23:59:59
    return (
      targetDate.getMonth() === now.getMonth() &&
      targetDate.getFullYear() === now.getFullYear()
    );
  }

  if (filter === "yearly") {
    // Current calendar year: Jan 1st 00:00:00 to Dec 31st 23:59:59
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
