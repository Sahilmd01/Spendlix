import React, { useState } from "react";
import {
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineQuestionMarkCircle,
  HiOutlineCheckCircle,
  HiOutlinePaperAirplane,
} from "react-icons/hi";
import { LuLayers } from "react-icons/lu";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [openSupport, setOpenSupport] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", issue: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    setReportSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", issue: "" });
      setReportSubmitted(false);
      setOpenSupport(false);
    }, 2500);
  };

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          backgroundColor: "var(--card)",
          borderBottom: "1px solid var(--border-subtle)",
          padding: "0 28px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "var(--radius-md)",
              background: "var(--gradient-blue)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFF",
              boxShadow: "var(--shadow-glow)",
            }}
          >
            <LuLayers size={20} />
          </div>
          <div>
            <span
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "var(--text-primary)",
                letterSpacing: "-0.3px",
              }}
            >
              Spendix
            </span>
            <span
              style={{
                marginLeft: "8px",
                fontSize: "11px",
                padding: "2px 8px",
                borderRadius: "var(--radius-pill)",
                backgroundColor: "var(--surface)",
                color: "var(--text-muted)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              Pro
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={() => setOpenSupport(true)}
            className="btn btn-secondary"
            style={{
              padding: "7px 14px",
              fontSize: "12px",
              borderRadius: "var(--radius-pill)",
              gap: "6px",
            }}
          >
            <HiOutlineQuestionMarkCircle size={16} />
            <span className="hidden sm:inline">Support</span>
          </button>

          <button
            onClick={() => setOpenSideMenu(!openSideMenu)}
            className="btn btn-secondary lg:hidden"
            style={{ padding: "8px", borderRadius: "var(--radius-pill)" }}
            aria-label="Toggle menu"
          >
            {openSideMenu ? <HiOutlineX size={18} /> : <HiOutlineMenu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {openSideMenu && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            display: "flex",
          }}
        >
          <div
            onClick={() => setOpenSideMenu(false)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(4px)",
            }}
          />
          <div
            style={{
              position: "relative",
              marginLeft: "auto",
              width: "280px",
              height: "100%",
              backgroundColor: "var(--card)",
              borderLeft: "1px solid var(--border-subtle)",
              zIndex: 1000,
            }}
          >
            <SideMenu activeMenu={activeMenu} onClose={() => setOpenSideMenu(false)} />
          </div>
        </div>
      )}

      {/* Support Modal */}
      {openSupport && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            className="card card-elevated"
            style={{
              maxWidth: "440px",
              width: "100%",
              padding: "28px",
              borderRadius: "var(--radius-card)",
              border: "1px solid var(--border-default)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "18px", color: "var(--text-primary)" }}>
                Spendix Support
              </h3>
              <button
                onClick={() => setOpenSupport(false)}
                className="btn btn-secondary"
                style={{ padding: "6px", borderRadius: "50%" }}
              >
                <HiOutlineX size={16} />
              </button>
            </div>

            {reportSubmitted ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "28px 0",
                  color: "var(--success)",
                }}
              >
                <HiOutlineCheckCircle size={44} style={{ margin: "0 auto 10px" }} />
                <p style={{ margin: 0, fontSize: "14px", fontWeight: 600 }}>
                  Report submitted successfully!
                </p>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>
                  Our team will follow up shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit}>
                <div style={{ marginBottom: "14px" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "12px",
                      color: "var(--text-muted)",
                      marginBottom: "6px",
                    }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input"
                    required
                    placeholder="Sahil"
                  />
                </div>
                <div style={{ marginBottom: "14px" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "12px",
                      color: "var(--text-muted)",
                      marginBottom: "6px",
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input"
                    required
                    placeholder="name@company.com"
                  />
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "12px",
                      color: "var(--text-muted)",
                      marginBottom: "6px",
                    }}
                  >
                    Issue or Feedback
                  </label>
                  <textarea
                    name="issue"
                    value={formData.issue}
                    onChange={handleInputChange}
                    className="input"
                    rows={4}
                    required
                    placeholder="Describe your query..."
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-brand"
                  style={{ width: "100%", padding: "10px", borderRadius: "var(--radius-pill)" }}
                >
                  <HiOutlinePaperAirplane size={16} />
                  Submit Report
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
