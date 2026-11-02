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

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
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

  const totalBalance = dashboardData?.totalBalance || 0;
  const totalIncome = dashboardData?.totalIncome || 0;
  const totalExpense = dashboardData?.totalExpense || 0;
  const netSavings = totalIncome - totalExpense;

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Top Section: Promo + Recurring Spend Hero + Payment Alert */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "18px",
          }}
        >
          {/* 1. Try Premium / Promo Banner (inspired by reference Apple Music card) */}
          <div
            className="promo-card"
            style={{
              padding: "26px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "180px",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    background: "#FA2D48",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFF",
                    fontSize: "16px",
                  }}
                >
                  ♫
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: "15px", fontWeight: 600 }}>
                    Try Spendix Pro
                  </h4>
                  <p
                    style={{
                      margin: "2px 0 0",
                      fontSize: "12px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Enjoy 3 months of automatic subscription tracking
                  </p>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginTop: "20px",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    letterSpacing: "-0.5px",
                  }}
                >
                  3 Months Free
                </div>
                <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>
                  Then ₹199/month · Cancel anytime
                </div>
              </div>
              <button
                className="btn btn-primary"
                style={{
                  padding: "8px 18px",
                  fontSize: "13px",
                  borderRadius: "var(--radius-pill)",
                }}
              >
                Start Now
              </button>
            </div>
          </div>

          {/* 2. Total Monthly Recurring Spend (Main Hero Metric) */}
          <div
            className="card card-elevated"
            style={{
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <LuCreditCard size={18} color="var(--primary-light)" />
                  <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                    Total Monthly Recurring Spend
                  </span>
                </div>
                <span className="badge badge-success">+8.5% increase</span>
              </div>

              <div
                className="heading-xl"
                style={{
                  fontSize: "42px",
                  color: "var(--text-primary)",
                  margin: "8px 0 0",
                }}
              >
                ₹{addThousandSeparator(totalExpense)}
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "10px",
                marginTop: "16px",
                paddingTop: "14px",
                borderTop: "1px solid var(--border-subtle)",
              }}
            >
              <div
                style={{
                  background: "var(--surface)",
                  padding: "8px 12px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>
                  Balance
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    marginTop: "2px",
                  }}
                >
                  ₹{addThousandSeparator(totalBalance)}
                </div>
              </div>
              <div
                style={{
                  background: "var(--surface)",
                  padding: "8px 12px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>
                  Income
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "var(--success)",
                    marginTop: "2px",
                  }}
                >
                  ₹{addThousandSeparator(totalIncome)}
                </div>
              </div>
              <div
                style={{
                  background: "var(--surface)",
                  padding: "8px 12px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>
                  Savings
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "var(--accent)",
                    marginTop: "2px",
                  }}
                >
                  ₹{addThousandSeparator(netSavings)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Alert Banner (inspired by reference image) */}
        <div
          className="alert-gradient"
          style={{
            padding: "14px 22px",
            borderRadius: "var(--radius-card)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <LuShieldAlert size={18} color="#FBBF24" />
            <span style={{ fontSize: "13px", color: "var(--text-primary)" }}>
              Your recurring expenses are synced. Review recent categories to avoid surprise overdrafts.
            </span>
          </div>
          <button
            onClick={() => navigate("/expense")}
            className="btn btn-secondary"
            style={{
              padding: "6px 16px",
              fontSize: "12px",
              borderRadius: "var(--radius-pill)",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            Review Now →
          </button>
        </div>

        {/* Middle Section: Visual Charts & Analytics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "18px",
          }}
        >
          {/* Finance Overview Pie Chart */}
          <div className="card card-elevated" style={{ padding: "22px" }}>
            <FinanceOverview
              totalBalance={totalBalance}
              totalIncome={totalIncome}
              totalExpense={totalExpense}
              loading={loading}
            />
          </div>

          {/* Recent Activity stream */}
          <div className="card card-elevated" style={{ padding: "22px" }}>
            <RecentTransactions
              transactions={dashboardData?.recentTransactions}
              onSeeMore={() => navigate("/expense")}
              loading={loading}
            />
          </div>
        </div>

        {/* Bottom Section: Trend Breakdown & Recent Income */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "18px",
          }}
        >
          <div className="card card-elevated" style={{ padding: "22px" }}>
            <Last30DaysExpenses
              data={dashboardData?.last30daysExpenses?.transactions || []}
              loading={loading}
            />
          </div>

          <div className="card card-elevated" style={{ padding: "22px" }}>
            <RecentIncomeWithChart
              data={
                dashboardData?.last60DaysIncome?.transaction?.slice(0, 6) || []
              }
              totalIncome={totalIncome}
              loading={loading}
            />
          </div>
        </div>

        {/* Detail lists */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "18px",
          }}
        >
          <div className="card card-elevated" style={{ padding: "22px" }}>
            <ExpenseTransactions
              transactions={dashboardData?.last30daysExpenses?.transactions || []}
              onSeeMore={() => navigate("/expense")}
              loading={loading}
            />
          </div>

          <div className="card card-elevated" style={{ padding: "22px" }}>
            <RecentIncome
              transactions={dashboardData?.last60DaysIncome?.transaction || []}
              onSeeMore={() => navigate("/income")}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;