import React from "react";
import { LuDownload, LuWalletMinimal } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

const IncomeList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income Source</h5>

        <button className="card-btn" onClick={onDownload}>
          <LuDownload className="text-base" /> Download
        </button>
      </div>

      <div className="mt-4">
        {transactions && transactions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {transactions.map((income) => (
              <TransactionInfoCard
                key={income._id}
                title={income.source}
                icon={income.icon}
                date={moment(income.date).format("DD MMM YYYY")}
                amount={income.amount}
                type="income"
                onDelete={() => onDelete(income._id)}
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
              <LuWalletMinimal size={20} />
            </div>
            <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)" }}>
              No income entries
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              Added income records will be listed here
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomeList;
