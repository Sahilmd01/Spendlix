import React from "react";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import toast from "react-hot-toast";
import AppLogo from "../AppLogo";

const Navbar = ({ activeMenu }) => {
  const handleSupportClick = (e) => {
    e.preventDefault();
    const email = "codewithkinu@gmail.com";
    const subject = encodeURIComponent("Spendlix Support Request");
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}`;

    // Open web Gmail directly in new tab (works reliably on all browsers/devices)
    const opened = window.open(gmailUrl, "_blank", "noopener,noreferrer");

    // Copy email to clipboard and notify user
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).catch(() => { });
    }

    toast.success("Opening support email (copied to clipboard!)", {
      id: "support-toast",
      duration: 3500,
    });

    // Fallback attempt to open native mail client if popups blocked
    if (!opened) {
      window.location.href = `mailto:${email}?subject=${subject}`;
    }
  };

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
            Spendlix
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
          href="mailto:codewithkinu@gmail.com?subject=Spendlix%20Support%20Request"
          onClick={handleSupportClick}
          className="btn btn-secondary"
          style={{
            padding: "7px 14px",
            fontSize: "12px",
            borderRadius: "var(--radius-pill)",
            gap: "6px",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            cursor: "pointer",
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
