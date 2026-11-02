import React from "react";
import { getInitials } from "../../utils/helper";
import classNames from "classnames";

export const CharAvatar = ({ 
  fullName, 
  email,
  width = "w-12", 
  height = "h-12", 
  style = "",
  className = "",
  size = "md",
  shadow = false,
  border = false,
  hoverEffect = false
}) => {
  // Size presets
  const sizeClasses = {
    xs: "w-8 h-8 text-xs",
    sm: "w-10 h-10 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-14 h-14 text-lg",
    xl: "w-16 h-16 text-xl"
  };

  // Color generation based on email or name hash (consistent colors)
  const hashSource = email || fullName || "User";
  const nameHash = hashSource.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  const hue = Math.abs(nameHash) % 360;
  const bgColor = `hsl(${hue}, 65%, 45%)`;
  const textColor = "#FFFFFF";

  return (
    <div
      style={{
        width: "38px",
        height: "38px",
        borderRadius: "6px",
        backgroundColor: bgColor,
        color: textColor,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        flexShrink: 0,
        userSelect: "none",
        ...(style && typeof style === "object" ? style : {}),
      }}
      title={fullName || email || "User"}
    >
      <span
        style={{
          fontSize: "13px",
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: "0.5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "translateY(0.5px)",
        }}
      >
        {getInitials(fullName || "?", email)}
      </span>
    </div>
  );
};

// Default props for the component
CharAvatar.defaultProps = {
  fullName: "",
  size: "md",
  shadow: true,
  border: false,
  hoverEffect: true
};