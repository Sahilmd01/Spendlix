import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LuLayoutDashboard,
  LuWalletMinimal,
  LuHandCoins,
  LuPlus,
  LuLogOut,
} from "react-icons/lu";
import { UserContext } from "../../context/userContext";

const MobileBottomNav = ({ onOpenAddModal }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearUser } = useContext(UserContext);
  const [showSignOutPrompt, setShowSignOutPrompt] = useState(false);

  const navItems = [
    { label: "Dashboard", icon: LuLayoutDashboard, path: "/dashboard" },
    { label: "Income", icon: LuWalletMinimal, path: "/income" },
    { label: "Expense", icon: LuHandCoins, path: "/expense" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <>
      {/* Sign Out Confirmation Sheet on Mobile */}
      {showSignOutPrompt && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1100,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
          onClick={() => setShowSignOutPrompt(false)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "500px",
              backgroundColor: "var(--surface)",
              borderTop: "1px solid var(--border-default)",
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
              padding: "20px 20px 28px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              animation: "slideUp 0.2s ease",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: "36px",
                height: "4px",
                backgroundColor: "var(--border-strong)",
                borderRadius: "999px",
                alignSelf: "center",
                marginBottom: "4px",
              }}
            />
            <div style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)" }}>
              Sign Out of Spendix?
            </div>
            <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
              Are you sure you want to end your current session?
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
              <button
                type="button"
                onClick={() => setShowSignOutPrompt(false)}
                className="btn btn-secondary"
                style={{
                  flex: 1,
                  padding: "11px",
                  fontSize: "13px",
                  borderRadius: "var(--radius-md)",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="btn"
                style={{
                  flex: 1,
                  padding: "11px",
                  fontSize: "13px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--error)",
                  color: "#FFFFFF",
                  border: "none",
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Liquid Glassmorphic Bottom Navigation Bar */}
      <div
        className="mobile-bottom-nav-container"
        style={{
          position: "fixed",
          bottom: "calc(16px + env(safe-area-inset-bottom, 0px))",
          left: "50%",
          transform: "translateX(-50%)",
          width: "calc(100% - 28px)",
          maxWidth: "420px",
          zIndex: 900,
          pointerEvents: "none",
        }}
      >
        <nav
          className="mobile-bottom-nav"
          style={{
            pointerEvents: "auto",
            height: "64px",
            backgroundColor: "rgba(16, 16, 27, 0.72)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            padding: "0 12px",
            boxShadow:
              "0 20px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                style={{
                  background: isActive
                    ? "rgba(37, 99, 235, 0.22)"
                    : "transparent",
                  border: isActive
                    ? "1px solid rgba(59, 130, 246, 0.35)"
                    : "1px solid transparent",
                  borderRadius: "18px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "2px",
                  padding: "6px 14px",
                  color: isActive ? "#FFFFFF" : "var(--text-muted)",
                  cursor: "pointer",
                  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                }}
              >
                <Icon size={19} color={isActive ? "var(--primary-light)" : "var(--text-muted)"} />
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: isActive ? 600 : 500,
                    letterSpacing: "0.2px",
                  }}
                >
                  {item.label}
                </span>
                {isActive && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: "-2px",
                      width: "12px",
                      height: "2px",
                      borderRadius: "999px",
                      backgroundColor: "var(--primary-light)",
                      boxShadow: "0 0 8px var(--primary-light)",
                    }}
                  />
                )}
              </button>
            );
          })}

          {/* Sign Out Action */}
          <button
            onClick={() => setShowSignOutPrompt(true)}
            style={{
              background: "transparent",
              border: "1px solid transparent",
              borderRadius: "18px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2px",
              padding: "6px 14px",
              color: "var(--text-muted)",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <LuLogOut size={19} />
            <span style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.2px" }}>
              Exit
            </span>
          </button>
        </nav>
      </div>
    </>
  );
};

export default MobileBottomNav;
