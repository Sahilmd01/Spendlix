import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

const DeleteAlert = ({
  content,
  confirmText = "Delete",
  cancelText = "Cancel",
  onDelete,
  onCancel,
}) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "14px",
          padding: "14px 16px",
          borderRadius: "var(--radius-md)",
          backgroundColor: "var(--error-bg)",
          border: "1px solid rgba(248, 113, 113, 0.25)",
          color: "var(--text-primary)",
        }}
      >
        <div style={{ color: "var(--error)", marginTop: "2px" }}>
          <FiAlertTriangle size={22} />
        </div>
        <p style={{ margin: 0, fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
          {content}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
          marginTop: "24px",
        }}
      >
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            style={{ padding: "8px 18px", fontSize: "13px" }}
          >
            {cancelText}
          </button>
        )}
        <button
          type="button"
          onClick={onDelete}
          style={{
            backgroundColor: "var(--error)",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "var(--radius-pill)",
            padding: "8px 20px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "opacity 0.2s",
          }}
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
