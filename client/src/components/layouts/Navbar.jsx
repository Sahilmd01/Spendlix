import React from "react";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import AppLogo from "../AppLogo";

const Navbar = ({ activeMenu }) => {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "var(--card)",
        borderBottom: "1px solid var(--border-subtle)",
        padding: "0 16px",
        height: "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <AppLogo size={34} />
        <div>
          <span
            style={{
              fontSize: "17px",
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

      {/* Right Actions: Direct Email Support Link */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <a
          href="mailto:codewithkinu@gmail.com?subject=Spendix%20Support%20Request"
          className="btn btn-secondary"
          style={{
            padding: "7px 14px",
            fontSize: "12px",
            borderRadius: "var(--radius-pill)",
            gap: "6px",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <HiOutlineQuestionMarkCircle size={16} />
          <span>Support</span>
        </a>
      </div>
    </header>
  );
};

export default Navbar;
