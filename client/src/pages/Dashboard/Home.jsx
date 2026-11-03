import React, { useEffect, useState } from "react";
import {
  LuWalletMinimal,
  LuHandCoins,
  LuTrendingUp,
  LuCreditCard,
  LuArrowUpRight,
  LuShieldAlert,
} from "react-icons/lu";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { addThousandSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";
import { StatCardSkeleton } from "../../components/Cards/Skeleton";
import TimeRangeFilter, { isWithinTimeRange } from "../../components/Inputs/TimeRangeFilter";

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      setDashboardData(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Filter transactions according to selected range
  const filteredRecentTransactions = (dashboardData?.recentTransactions || []).filter(
    (item) => isWithinTimeRange(item.date, filter)
  );

  const filteredExpenseList = (
    dashboardData?.last30daysExpenses?.transactions || []
  ).filter((item) => isWithinTimeRange(item.date, filter));

  const filteredIncomeList = (
    dashboardData?.last60DaysIncome?.transaction || []
  ).filter((item) => isWithinTimeRange(item.date, filter));

  // Dynamically compute totals if filter is applied, fallback to backend aggregate for 'all'
  const totalIncome =
    filter === "all"
      ? dashboardData?.totalIncome || 0
      : filteredIncomeList.reduce((sum, item) => sum + item.amount, 0);

  const totalExpense =
    filter === "all"
      ? dashboardData?.totalExpense || 0
      : filteredExpenseList.reduce((sum, item) => sum + item.amount, 0);

  const totalBalance =
    filter === "all"
      ? dashboardData?.totalBalance || 0
      : totalIncome - totalExpense;

  const netSavings = totalIncome - totalExpense;

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {/* Dashboard Title & Time Range Filter Bar */}
        <div className="header-action-container">
          <div>
            <h1
              className="heading-lg"
              style={{
                margin: 0,
                fontSize: "22px",
                color: "var(--text-primary)",
              }}
            >
              Overview & Analytics
            </h1>
            <p
              style={{
                margin: "2px 0 0",
                fontSize: "12px",
                color: "var(--text-muted)",
              }}
            >
              Real-time summary of your financial health & activity
            </p>
          </div>

          <TimeRangeFilter activeFilter={filter} onChange={setFilter} />
        </div>

        {/* Top Summary Stat Panels */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(145px, 1fr))",
            gap: "10px",
          }}
        >

          {loading ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
              {/* Spend / Total Expenses Panel */}

          <div
            style={{
              padding: "14px 18px",
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-md)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Total Expenses
              </span>
              <span className="badge badge-error">Spend</span>
            </div>
            <div
              className="heading-xl"
              style={{
                fontSize: "32px",
                color: "var(--text-primary)",
                margin: "12px 0 4px",
              }}
            >
              ₹{addThousandSeparator(totalExpense)}
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              Monthly recurring outflow
            </div>
          </div>

          {/* Income Panel */}
          <div
            style={{
              padding: "14px 18px",
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-md)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Total Income
              </span>
              <span className="badge badge-success">+Inflow</span>
            </div>
            <div
              className="heading-xl"
              style={{
                fontSize: "28px",
                color: "var(--success)",
                margin: "8px 0 2px",
              }}
            >
              ₹{addThousandSeparator(totalIncome)}
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              Recorded revenue streams
            </div>
          </div>

          {/* Net Balance Panel */}
          <div
            style={{
              padding: "14px 18px",
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-md)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Net Balance
              </span>
              <span className="badge badge-info">Liquid</span>
            </div>
            <div
              className="heading-xl"
              style={{
                fontSize: "28px",
                color: "var(--text-primary)",
                margin: "8px 0 2px",
              }}
            >
              ₹{addThousandSeparator(totalBalance)}
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              Available account liquidity
            </div>
          </div>

          {/* Savings Panel */}
          <div
            style={{
              padding: "14px 18px",
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-md)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Net Savings
              </span>
              <span className="badge badge-warning">Surplus</span>
            </div>
            <div
              className="heading-xl"
              style={{
                fontSize: "28px",
                color: "var(--accent)",
                margin: "8px 0 2px",
              }}
            >
              ₹{addThousandSeparator(netSavings)}
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              Income minus expenses
            </div>
          </div>
            </>
          )}
        </div>


        {/* Sync Info Banner (Flat, minimal) */}
        <div
          style={{
            padding: "10px 16px",
            borderRadius: "var(--radius-md)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "10px",
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border-default)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <LuShieldAlert size={16} color="#FBBF24" />
            <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
              Your financial records are up to date. Review recent transactions and category trends below.
            </span>
          </div>
          <button
            onClick={() => navigate("/expense")}
            className="btn btn-secondary"
            style={{
              padding: "5px 12px",
              fontSize: "12px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-default)",
            }}
          >
            Review Expenses →
          </button>
        </div>

        {/* Middle Section: Visual Charts & Analytics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "12px",
          }}
        >
          <FinanceOverview
            totalBalance={totalBalance}
            totalIncome={totalIncome}
            totalExpense={totalExpense}
            loading={loading}
          />

          <RecentTransactions
            transactions={filteredRecentTransactions}
            onSeeMore={() => navigate("/expense")}
            loading={loading}
          />
        </div>

        {/* Bottom Section: Trend Breakdown & Recent Income */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "12px",
          }}
        >
          <Last30DaysExpenses
            data={filteredExpenseList}
            loading={loading}
          />

          <RecentIncomeWithChart
            data={filteredIncomeList.slice(0, 6)}
            totalIncome={totalIncome}
            loading={loading}
          />
        </div>

        {/* Detail lists */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "12px",
          }}
        >
          <ExpenseTransactions
            transactions={filteredExpenseList}
            onSeeMore={() => navigate("/expense")}
            loading={loading}
          />

          <RecentIncome
            transactions={filteredIncomeList}
            onSeeMore={() => navigate("/income")}
            loading={loading}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};


export default Home;