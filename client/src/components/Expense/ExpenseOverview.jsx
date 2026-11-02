import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";

import { prepareExpenseLineChartData } from "../../utils/helper";
import CustomLineChart from "../Charts/CustomLineChart";

const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <div>
          <h5 style={{ margin: 0, fontSize: "17px", fontWeight: 600, color: "var(--text-primary)" }}>
            Expense Overview
          </h5>
          <p style={{ margin: "4px 0 0", fontSize: "12px", color: "var(--text-muted)" }}>
            Track your spending trends over time and gain insights into where your money goes.
          </p>
        </div>

        <button
          onClick={onExpenseIncome}
          className="btn btn-primary"
          style={{
            padding: "8px 18px",
            fontSize: "13px",
            borderRadius: "var(--radius-pill)",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <LuPlus size={16} />
          <span>Add Expense</span>
        </button>
      </div>

      <CustomLineChart data={chartData} onAddExpense={onExpenseIncome} />
    </div>
  );
};

export default ExpenseOverview;
