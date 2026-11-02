import React from "react";
import { LuArrowRight, LuHandCoins } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import { Skeleton } from "../Cards/Skeleton";

const ExpenseTransactions = ({ transactions, onSeeMore, loading }) => {
  if (loading) {
    return (
      <div className="card">
        <div className="flex items-center justify-between">
          <Skeleton width="130px" height="20px" />
          <Skeleton width="70px" height="20px" borderRadius="var(--radius-pill)" />
        </div>
        <div className="mt-4" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {Array.from({ length: 4 }).map((_, i) => (
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
                <Skeleton width="36px" height="36px" borderRadius="50%" />
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <Skeleton width="100px" height="13px" />
                  <Skeleton width="70px" height="11px" />
                </div>
              </div>
              <Skeleton width="60px" height="16px" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Expenses</h5>

        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-4">
        {transactions && transactions.length > 0 ? (
          transactions.slice(0, 5).map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format("DD MMM YYYY")}
              amount={expense.amount}
              type="expense"
              hideDeleteBtn
            />
          ))
        ) : (
          <div
            style={{
              padding: "44px 20px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                backgroundColor: "var(--surface)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-muted)",
              }}
            >
              <LuHandCoins size={20} />
            </div>
            <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)" }}>
              No expenses recorded
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              Start adding expenses to monitor your categories
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
