import React from "react";
import { LuArrowRight, LuReceipt } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import { Skeleton } from "../Cards/Skeleton";

const RecentTransactions = ({ transactions, onSeeMore, loading }) => {
  if (loading) {
    return (
      <div className="card">
        <div className="flex items-center justify-between">
          <Skeleton width="160px" height="20px" />
          <Skeleton width="70px" height="20px" borderRadius="var(--radius-pill)" />
        </div>
        <div className="mt-4" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {Array.from({ length: 5 }).map((_, i) => (
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
                  <Skeleton width="110px" height="13px" />
                  <Skeleton width="75px" height="11px" />
                </div>
              </div>
              <Skeleton width="65px" height="16px" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Recent Transactions</h5>

        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-4">
        {transactions && transactions.length > 0 ? (
          transactions.slice(0, 5).map((item) => (
            <TransactionInfoCard
              key={item._id}
              title={item.type === "expense" ? item.category : item.source}
              icon={item.icon}
              date={moment(item.date).format("DD MMM YYYY")}
              amount={item.amount}
              type={item.type}
              hideDeleteBtn
            />
          ))
        ) : (
          <div
            style={{
              padding: "48px 20px",
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
              <LuReceipt size={20} />
            </div>
            <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)" }}>
              No recent transactions
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              Add an income or expense to see activity here
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
