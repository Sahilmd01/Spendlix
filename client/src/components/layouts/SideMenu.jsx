import React, { useContext, useState, useRef, useEffect } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { CharAvatar } from "../Cards/CharAvatar";
import { FiLogOut, FiAlertCircle } from "react-icons/fi";

const SideMenu = ({ activeMenu, onClose }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setShowConfirmLogout(false);
      }
    };
    if (showConfirmLogout) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showConfirmLogout]);

  const handleClick = (route) => {
    if (route === "logout") {
      setShowConfirmLogout((prev) => !prev);
    } else {
      if (onClose) onClose();
      navigate(route);
    }
  };

  const handleConfirmLogout = () => {
    if (onClose) onClose();
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <aside
      style={{
        width: "220px",
        height: "100%",
        backgroundColor: "var(--card)",
        borderRight: "1px solid var(--border-subtle)",
        padding: "14px 12px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflowY: "auto",
      }}
    >
      <div>
        {/* User Info Panel */}
        <div
          style={{
            padding: "10px 12px",
            backgroundColor: "var(--surface)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-default)",
            marginBottom: "12px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="Profile"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "6px",
                objectFit: "cover",
                border: "1px solid var(--border-default)",
                flexShrink: 0,
              }}
            />
          ) : (
            <CharAvatar
              fullName={user?.fullName || "User"}
              email={user?.email}
            />
          )}

          <div style={{ overflow: "hidden" }}>
            <div
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--text-primary)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {user?.fullName || "Sahil"}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "var(--text-muted)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {user?.email || "Personal Plan"}
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {SIDE_MENU_DATA.map((item, index) => {
            const isActive = activeMenu === item.label;
            const Icon = item.icon;
            return (
              <button
                key={`menu_${index}`}
                onClick={() => handleClick(item.path)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "11px 16px",
                  borderRadius: "var(--radius-pill)",
                  border: "none",
                  backgroundColor: isActive
                    ? "var(--surface-hover)"
                    : "transparent",
                  color: isActive ? "#FFFFFF" : "var(--text-secondary)",
                  fontSize: "14px",
                  fontWeight: isActive ? 600 : 500,
                  transition: "all 0.2s ease",
                  textAlign: "left",
                  width: "100%",
                }}
              >
                <span
                  style={{
                    color: isActive ? "var(--primary-light)" : "var(--text-muted)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Icon size={18} />
                </span>
                <span>{item.label}</span>
                {isActive && (
                  <span
                    style={{
                      marginLeft: "auto",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "var(--primary)",
                      boxShadow: "var(--shadow-glow)",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Container with Sign Out Button & Anchored Top Dropdown */}
      <div ref={popoverRef} style={{ position: "relative", width: "100%" }}>
        {/* Small Top Dropdown Confirmation */}
        {showConfirmLogout && (
          <div
            style={{
              position: "absolute",
              bottom: "calc(100% + 8px)",
              left: 0,
              right: 0,
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-md)",
              padding: "12px 14px",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.45)",
              zIndex: 100,
              animation: "fadeIn 0.15s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <FiAlertCircle size={15} color="var(--error)" />
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                }}
              >
                Sign out?
              </span>
            </div>

            <p
              style={{
                margin: "0 0 10px 0",
                fontSize: "12px",
                color: "var(--text-muted)",
                lineHeight: 1.4,
              }}
            >
              Are you sure you want to exit?
            </p>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                type="button"
                onClick={() => setShowConfirmLogout(false)}
                className="btn btn-secondary"
                style={{
                  flex: 1,
                  padding: "6px 10px",
                  fontSize: "12px",
                  borderRadius: "var(--radius-md)",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmLogout}
                className="btn"
                style={{
                  flex: 1,
                  padding: "6px 10px",
                  fontSize: "12px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--error)",
                  color: "#FFFFFF",
                  border: "none",
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        )}

        {/* Logout button */}
        <button
          onClick={() => setShowConfirmLogout((prev) => !prev)}
          className="btn btn-secondary"
          style={{
            width: "100%",
            padding: "10px 16px",
            borderRadius: "var(--radius-pill)",
            justifyContent: "flex-start",
            color: "var(--error)",
            gap: "10px",
            fontSize: "13px",
          }}
        >
          <FiLogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default SideMenu;
