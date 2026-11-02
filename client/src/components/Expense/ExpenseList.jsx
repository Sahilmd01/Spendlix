import React from "react";
import { LuDownload, LuCreditCard } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import { TransactionListSkeleton } from "../Cards/Skeleton";
import moment from "moment";

const ExpenseList = ({ transactions, onDelete, onDownload, loading }) => {
  if (loading) {
    return <TransactionListSkeleton count={4} />;
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">All Expenses</h5>


        <button className="card-btn" onClick={onDownload}>
          <LuDownload className="text-base" /> Download
        </button>
      </div>

      <div className="mt-4">
        {transactions && transactions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {transactions.map((expense) => (
              <TransactionInfoCard
                key={expense._id}
                title={expense.category}
                icon={expense.icon}
                date={moment(expense.date).format("DD MMM YYYY")}
                amount={expense.amount}
                type="expense"
                onDelete={() => onDelete(expense._id)}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              padding: "40px 20px",
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
              <LuCreditCard size={20} />
            </div>
            <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)" }}>
              No expenses found
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              Added expenses will appear in this list
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
