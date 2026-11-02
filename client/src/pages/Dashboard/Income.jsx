import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FiDownload,
  FiPlus,
  FiTrendingUp,
  FiDollarSign,
  FiActivity,
  FiPieChart,
} from "react-icons/fi";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import IncomeList from "../../components/Income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert";
import { useUserAuth } from "../../hooks/useUserAuth";
import { addThousandSeparator } from "../../utils/helper";

const Income = () => {
  useUserAuth();

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      if (response.data) setIncomeData(response.data);
    } catch (error) {
      toast.error("Failed to load income data");
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;
    if (!source.trim()) return toast.error("Source is required.");
    if (!amount || isNaN(amount) || Number(amount) <= 0)
      return toast.error("Amount must be a number > 0");
    if (!date) return toast.error("Date is required.");

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });
      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      fetchIncomeDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add income");
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted successfully");
      fetchIncomeDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete income");
    }
  };

  const handleDownloadIncomeDetails = () => {
    toast.success("Exporting income report...");
  };

  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);
  const last30DaysIncome = incomeData
    .filter(
      (item) =>
        new Date(item.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    )
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <DashboardLayout activeMenu="Income">
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {/* Header Action Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <div>
            <h1
              className="heading-lg"
              style={{
                margin: 0,
                fontSize: "22px",
                color: "var(--text-primary)",
              }}
            >
              Income Streams
            </h1>
            <p
              style={{
                margin: "2px 0 0",
                fontSize: "12px",
                color: "var(--text-muted)",
              }}
            >
              Track and optimize all your earnings & revenue sources
            </p>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={handleDownloadIncomeDetails}
              className="btn btn-secondary"
              style={{ padding: "6px 14px", fontSize: "12px" }}
            >
              <FiDownload size={14} />
              <span>Export</span>
            </button>
            <button
              onClick={() => setOpenAddIncomeModal(true)}
              className="btn btn-primary"
              style={{ padding: "6px 16px", fontSize: "12px" }}
            >
              <FiPlus size={15} />
              <span>Add Income</span>
            </button>
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
                TOTAL INCOME
              </span>
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--success-bg)",
                  color: "var(--success)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FiDollarSign size={15} />
              </div>
            </div>
            <div
              className="heading-lg"
              style={{ fontSize: "24px", color: "var(--text-primary)", marginTop: "8px" }}
            >
              ₹{addThousandSeparator(totalIncome)}
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
                  background: "var(--info-bg)",
                  color: "var(--info)",
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
              ₹{addThousandSeparator(last30DaysIncome)}
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
                TOTAL TRANSACTIONS
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
              {incomeData.length} Entries
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
                AVERAGE / ENTRY
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
              ₹{incomeData.length > 0
                ? addThousandSeparator(Math.round(totalIncome / incomeData.length))
                : "0"}
            </div>
          </div>
        </div>

        {/* Overview Chart Card */}
        <IncomeOverview
          transactions={incomeData}
          onAddIncome={() => setOpenAddIncomeModal(true)}
        />

        {/* Detailed Stream List Card */}
        <IncomeList
          transactions={incomeData}
          loading={loading}
          onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
          onDownload={handleDownloadIncomeDetails}
        />

        {/* Modal: Add Income */}
        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add New Income Stream"
        >
          <AddIncomeForm
            onAddIncome={handleAddIncome}
            onCancel={() => setOpenAddIncomeModal(false)}
          />
        </Modal>

        {/* Modal: Delete Confirmation */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income Stream"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income entry? This cannot be undone."
            onDelete={() => deleteIncome(openDeleteAlert.data)}
            onCancel={() => setOpenDeleteAlert({ show: false, data: null })}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;