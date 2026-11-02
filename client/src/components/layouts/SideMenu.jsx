import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { CharAvatar } from "../Cards/CharAvatar";
import { FiLogOut } from "react-icons/fi";

const SideMenu = ({ activeMenu, onClose }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (onClose) onClose();
    if (route === "logout") {
      handleLogout();
    } else {
      navigate(route);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <aside
      style={{
        width: "250px",
        height: "calc(100vh - 64px)",
        position: "sticky",
        top: "64px",
        backgroundColor: "var(--card)",
        borderRight: "1px solid var(--border-subtle)",
        padding: "24px 18px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        {/* User Card */}
        <div
          style={{
            padding: "16px",
            backgroundColor: "var(--surface)",
            borderRadius: "var(--radius-card)",
            border: "1px solid var(--border-subtle)",
            marginBottom: "24px",
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
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid var(--border-default)",
              }}
            />
          ) : (
            <CharAvatar
              fullName={user?.fullName || "User"}
              width="w-11"
              height="h-11"
              style="text-base font-semibold"
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

      {/* Logout button */}
      <button
        onClick={handleLogout}
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
    </aside>
  );
};

export default SideMenu;
