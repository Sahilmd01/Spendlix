import React from "react";

export const AppLogo = ({ size = 36, className = "" }) => {
  return (
    <div
      className={className}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: `${Math.round(size * 0.28)}px`,
        backgroundColor: "#181822",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
      }}
    >
      <svg
        viewBox="0 0 100 100"
        width={`${Math.round(size * 0.65)}px`}
        height={`${Math.round(size * 0.65)}px`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Metric Bar 1 */}
        <rect x="16" y="44" width="10" height="34" rx="5" fill="#FFFFFF" opacity="0.85" />
        {/* Metric Bar 2 */}
        <rect x="34" y="32" width="10" height="46" rx="5" fill="#FFFFFF" opacity="0.95" />
        {/* Metric Bar 3 (Peak) */}
        <rect x="52" y="18" width="10" height="60" rx="5" fill="#FFFFFF" />
        {/* Metric Bar 4 */}
        <rect x="70" y="38" width="10" height="40" rx="5" fill="#FFFFFF" opacity="0.9" />
        {/* Tracking Dot */}
        <circle cx="75" cy="24" r="3.5" fill="#FFFFFF" />
      </svg>
    </div>
  );
};

export default AppLogo;
