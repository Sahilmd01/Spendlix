import React from "react";
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  const isIncome = type === "income";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 12px",
        borderRadius: "var(--radius-md)",
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border-subtle)",
        marginTop: "8px",
        transition: "background 0.2s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "var(--surface-hover)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--text-secondary)",
            fontSize: "16px",
          }}
        >
          {icon ? (
            <img
              src={icon}
              alt={title}
              style={{ width: "20px", height: "20px", objectFit: "contain" }}
            />
          ) : (
            <LuUtensils size={16} />
          )}
        </div>

        <div>
          <div
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: "var(--text-primary)",
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
            {date}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {!hideDeleteBtn && (
          <button
            onClick={onDelete}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <LuTrash2 size={16} />
          </button>
        )}

        <div
          style={{
            padding: "4px 10px",
            borderRadius: "var(--radius-pill)",
            fontSize: "12px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "5px",
            backgroundColor: isIncome ? "var(--success-bg)" : "var(--error-bg)",
            color: isIncome ? "var(--success)" : "var(--error)",
          }}
        >
          <span>
            {isIncome ? "+" : "-"} ₹{amount}
          </span>
          {isIncome ? <LuTrendingUp size={12} /> : <LuTrendingDown size={12} />}
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
