import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, type, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={{ marginBottom: "16px" }}>
      {label && (
        <label
          style={{
            display: "block",
            fontSize: "12px",
            fontWeight: 500,
            color: "var(--text-muted)",
            marginBottom: "6px",
            textTransform: "uppercase",
            letterSpacing: "0.4px",
          }}
        >
          {label}
        </label>
      )}

      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="input"
          style={{
            height: "44px",
            fontSize: "14px",
            paddingRight: type === "password" ? "42px" : "14px",
          }}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "12px",
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
            }}
          >
            {showPassword ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
