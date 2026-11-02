import moment from "moment";
import React from "react";
import { LuArrowRight, LuWalletMinimal } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const RecentIncome = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income</h5>

        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-4">
        {transactions && transactions.length > 0 ? (
          transactions.slice(0, 5).map((item) => (
            <TransactionInfoCard
              key={item._id}
              title={item.source}
              icon={item.icon}
              date={moment(item.date).format("DD MMM YYYY")}
              amount={item.amount}
              type="income"
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
              <LuWalletMinimal size={20} />
            </div>
            <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)" }}>
              No income entries recorded
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              Add an income source to start tracking your revenue
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentIncome;
