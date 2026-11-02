import React from "react";
import { Link } from "react-router-dom";
import { LuCompass, LuArrowLeft, LuLayers } from "react-icons/lu";

const NotFound = () => {
  const token = localStorage.getItem("token");
  const destination = token ? "/dashboard" : "/login";
  const buttonText = token ? "Back to Dashboard" : "Back to Sign In";

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "var(--background)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          maxWidth: "520px",
          width: "100%",
          padding: "44px 36px",
          textAlign: "center",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--border-default)",
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Brand Icon */}
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "var(--radius-md)",
            background: "var(--gradient-blue)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFF",
            boxShadow: "var(--shadow-glow)",
            marginBottom: "24px",
          }}
        >
          <LuCompass size={28} />
        </div>

        {/* 404 Large Display */}
        <div
          className="heading-xl"
          style={{
            fontSize: "64px",
            letterSpacing: "-2px",
            margin: "0 0 8px 0",
            background: "var(--gradient-blue)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 800,
          }}
        >
          404
        </div>

        <h2
          style={{
            margin: "0 0 10px 0",
            fontSize: "22px",
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          Page Not Found
        </h2>

        <p
          style={{
            margin: "0 0 28px 0",
            fontSize: "14px",
            color: "var(--text-muted)",
            lineHeight: 1.6,
            maxWidth: "380px",
          }}
        >
          The page or transaction route you are looking for doesn't exist or has
          been moved.
        </p>

        <Link
          to={destination}
          className="btn btn-primary"
          style={{
            padding: "12px 28px",
            fontSize: "14px",
            borderRadius: "var(--radius-pill)",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <LuArrowLeft size={16} />
          <span>{buttonText}</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
