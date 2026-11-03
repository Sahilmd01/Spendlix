import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FiDownload,
  FiPlus,
  FiTrendingUp,
  FiCreditCard,
  FiPieChart,
  FiActivity,
} from "react-icons/fi";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import ExpenseList from "../../components/Expense/ExpenseList";
import DeleteAlert from "../../components/DeleteAlert";
import { useUserAuth } from "../../hooks/useUserAuth";
import { addThousandSeparator } from "../../utils/helper";
import { StatCardSkeleton } from "../../components/Cards/Skeleton";
import TimeRangeFilter, { isWithinTimeRange } from "../../components/Inputs/TimeRangeFilter";

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  const fetchExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      if (response.data) setExpenseData(response.data);
    } catch (error) {
      toast.error("Failed to load expense data");
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;
    if (!category.trim()) return toast.error("Category is required.");
    if (!amount || isNaN(amount) || Number(amount) <= 0)
      return toast.error("Amount must be a number > 0");
    if (!date) return toast.error("Date is required.");

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });
      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchExpenseDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add expense");
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_INCOME(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully");
      fetchExpenseDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete expense");
    }
  };

  const handleDownloadExpenseDetails = () => {
    toast.success("Exporting expense report...");
  };

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  const filteredExpenseData = expenseData.filter((item) =>
    isWithinTimeRange(item.date, filter)
  );

  const totalExpense = filteredExpenseData.reduce((sum, item) => sum + item.amount, 0);
  const last30DaysExpense = filteredExpenseData
    .filter(
      (item) =>
        new Date(item.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    )
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <DashboardLayout activeMenu="Expense">
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {/* Header Action Bar */}
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
              Expense Tracker
            </h1>
            <p
              style={{
                margin: "2px 0 0",
                fontSize: "12px",
                color: "var(--text-muted)",
              }}
            >
              Monitor recurring subscriptions, discretionary spend, and outgoings
            </p>
          </div>

          <div className="header-actions-group">
            <TimeRangeFilter activeFilter={filter} onChange={setFilter} />
            <div className="header-action-btns">
              <button
                onClick={handleDownloadExpenseDetails}
                className="btn btn-secondary"
                style={{ padding: "6px 14px", fontSize: "12px" }}
              >
                <FiDownload size={14} />
                <span>Export</span>
              </button>
              <button
                onClick={() => setOpenAddExpenseModal(true)}
                className="btn btn-primary"
                style={{ padding: "6px 16px", fontSize: "12px" }}
              >
                <FiPlus size={15} />
                <span>Add Expense</span>
              </button>
            </div>
          </div>
        </div>


        {/* 4 Stat Metric Panels (2x2 Mobile App Grid) */}
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
              <div
                style={{
                  padding: "14px 18px",
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-md)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    TOTAL EXPENSES
                  </span>
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "var(--radius-sm)",
                      background: "var(--error-bg)",
                      color: "var(--error)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FiCreditCard size={15} />
                  </div>
                </div>
                <div
                  className="heading-lg"
                  style={{ fontSize: "24px", color: "var(--text-primary)", marginTop: "8px" }}
                >
                  ₹{addThousandSeparator(totalExpense)}
                </div>
              </div>

              <div
                style={{
                  padding: "14px 18px",
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-md)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    LAST 30 DAYS
                  </span>
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "var(--radius-sm)",
                      background: "var(--warning-bg)",
                      color: "var(--warning)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FiTrendingUp size={15} />
                  </div>
                </div>
                <div
                  className="heading-lg"
                  style={{ fontSize: "24px", color: "var(--text-primary)", marginTop: "8px" }}
                >
                  ₹{addThousandSeparator(last30DaysExpense)}
                </div>
              </div>

              <div
                style={{
                  padding: "14px 18px",
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-md)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    EXPENSE ENTRIES
                  </span>
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "var(--radius-sm)",
                      background: "var(--surface-hover)",
                      color: "var(--text-muted)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FiPieChart size={15} />
                  </div>
                </div>
                <div
                  className="heading-lg"
                  style={{ fontSize: "24px", color: "var(--text-primary)", marginTop: "8px" }}
                >
                  {filteredExpenseData.length} Entries
                </div>
              </div>

              <div
                style={{
                  padding: "14px 18px",
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-md)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    AVERAGE / EXPENSE
                  </span>
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "var(--radius-sm)",
                      background: "rgba(37, 99, 235, 0.15)",
                      color: "var(--accent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FiActivity size={15} />
                  </div>
                </div>
                <div
                  className="heading-lg"
                  style={{ fontSize: "24px", color: "var(--text-primary)", marginTop: "8px" }}
                >
                  ₹{filteredExpenseData.length > 0
                    ? addThousandSeparator(Math.round(totalExpense / filteredExpenseData.length))
                    : "0"}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Expense Overview Line Trend Card */}
        <ExpenseOverview
          transactions={filteredExpenseData}
          loading={loading}
          onExpenseIncome={() => setOpenAddExpenseModal(true)}
        />

        {/* Detailed Expenses List Card */}
        <ExpenseList
          transactions={filteredExpenseData}
          loading={loading}
          onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
          onDownload={handleDownloadExpenseDetails}
        />


        {/* Modal: Add Expense */}
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add New Expense"
        >
          <AddExpenseForm
            onAddExpense={handleAddExpense}
            onCancel={() => setOpenAddExpenseModal(false)}
          />
        </Modal>

        {/* Modal: Delete Confirmation */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense record? This action cannot be reversed."
            onDelete={() => deleteExpense(openDeleteAlert.data)}
            onCancel={() => setOpenDeleteAlert({ show: false, data: null })}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;