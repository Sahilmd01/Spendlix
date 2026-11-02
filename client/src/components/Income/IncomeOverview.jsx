import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";

import { prepareIncomeBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
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
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <div>
          <h5
            style={{
              margin: 0,
              fontSize: "17px",
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            Income Overview
          </h5>
          <p
            style={{
              margin: "4px 0 0",
              fontSize: "12px",
              color: "var(--text-muted)",
            }}
          >
            Track your earnings over time and analyze your income trends.
          </p>
        </div>

        <button
          onClick={onAddIncome}
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
          <span>Add Income</span>
        </button>
      </div>

      <CustomBarChart
        data={chartData}
        emptyTitle="No income data recorded"
        emptySubtitle="Track earnings over time and analyze your revenue patterns"
        onAdd={onAddIncome}
        addButtonText="Add Income"
      />
    </div>
  );
};

export default IncomeOverview;
